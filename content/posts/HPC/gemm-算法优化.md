---
tags:
- CS
- HPC
discipline: computer-science
publish: true
date: '2025-09-12T10:43:00+08:00'
title: GEMM 算法优化
categories:
- concept
---
本文简要介绍通用矩阵乘（[GEMM](https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms#Level_3)，General Matrix Multiplication）优化的基本概念和方法。GEMM 是 HPC 领域中最基础且计算密集型的工作负载之一。在人工智能、科学模拟和图像处理等领域，它的性能直接影响着整个应用程序的效率。虽然其数学概念简单，但高效的 GEMM 实现却需要对计算机体系结构有深刻的理解，包括缓存、SIMD 指令集和并行化技术。

## Naive GEMM

GEMM 通常定义为 {{< imath >}}C = A \times B{{< /imath >}}，对于矩阵 {{< imath >}}A \in \mathbb{R}^{M \times K}{{< /imath >}}，矩阵 {{< imath >}}B \in \mathbb{R}^{K \times N}{{< /imath >}}，其乘积矩阵 {{< imath >}}C\in \mathbb{R}^{M \times N}{{< /imath >}} 可以表示为
{{< math >}}

C_{i,j} = \sum_{k=0}^{K-1} A_{i,k}\times B_{k,j} 

{{< /math >}}
对应的朴素代码通常如下（默认行主序存储）：
```cpp
void gemm_naive(int M, int N, int K, const float* A, const float* B, float* C) {
    for (int i = 0; i < M; ++i) {
        for (int j = 0; j < N; ++j) {
            C[i][j] = 0.0f; // 初始化 C[i][j]
        }
    }
    for (int i = 0; i < M; ++i) {
        for (int j = 0; j < N; ++j) {
            for (int k = 0; k < K; ++k) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

```

**分析**：

- **浮点运算总数（FLOPs）**：
	- 对于每个 {{< imath >}}C_{i,j}{{< /imath >}} 元素，需要执行 {{< imath >}}K{{< /imath >}} 次乘法和 {{< imath >}}K{{< /imath >}} 次加法。
	- 总共有 {{< imath >}}M \times N{{< /imath >}} 个 {{< imath >}}C_{i,j}{{< /imath >}} 元素。
	- 总操作数约为 {{< imath >}}2 \times M \times N \times K{{< /imath >}} 次浮点运算。

- **内存访问总数**：忽略循环变量和指令的开销。
	- 矩阵 {{< imath >}}C{{< /imath >}} 的初始化需要 {{< imath >}}M \times N{{< /imath >}} 次写入；循环中矩阵 {{< imath >}}A{{< /imath >}} 和矩阵 {{< imath >}}B{{< /imath >}} 分别被读取 {{< imath >}}M \times N \times K{{< /imath >}} 次，矩阵 {{< imath >}}C{{< /imath >}} 被读取和写入共 {{< imath >}}2 \times M \times N \times K{{< /imath >}} 次。
	- 总内存访问次数约为 {{< imath >}}4 M N K + M N{{< /imath >}}。

### Why Slow?

尽管代码简洁，但这种实现方式存在严重的性能瓶颈：

- **缓存利用率低**：对 `B[k][j` 的访问大概率导致**缓存未命中**。由于 `B` 是行主序存储，每次迭代 `k` 都会跳到 `B` 矩阵的下一行，这导致巨大的内存跨越，破坏了空间局部性。

- **缺乏 SIMD 向量化潜力**：编译器很难将这种混合访问模式有效向量化，因为对 {{< imath >}}B{{< /imath >}} 的访问模式不佳。

- 算法本身时间复杂度为 {{< imath >}}O(N^{3}){{< /imath >}}。


对这样的矩阵乘的算法优化可分为两类：

- 基于算法分析的方法：根据矩阵乘计算特性，从数学角度优化，典型的算法包括 [Strassen 算法](https://en.wikipedia.org/wiki/Strassen_algorithm "Strassen 算法") 和 [Coppersmith–Winograd 算法](https://en.wikipedia.org/wiki/Coppersmith%E2%80%93Winograd_algorithm "Coppersmith–Winograd 算法")。
- 基于软件优化的方法：根据计算机存储系统的层次结构特性，选择性地调整计算顺序，主要有循环拆分向量化、内存重排等。

数学角度的优化暂且不在本文的讨论范围内，有机会将单独介绍，下面给出计算机体系结构角度的一些优化角度。

## `1 × 4` Register Blocking

参考 [how to optimize gemm](https://github.com/flame/how-to-optimize-gemm/wiki) 一文，我们把输出的计算按照列拆分成若干个 {{< imath >}}1 \times 4{{< /imath >}} 的小块，通过一次性处理 {{< imath >}}C{{< /imath >}} 的一小块内存来减少内存操作，最大化寄存器的利用率。

与其一次计算 {{< imath >}}C_{i,j}{{< /imath >}} 一个元素，不如一次性计算 {{< imath >}}C_{i, j\sim j+3}{{< /imath >}} 四个连续元素，这很好地利用了 {{< imath >}}C{{< /imath >}} 矩阵行内的空间局部性。把这四个元素加载到寄存器，可以大大减少对主存的访问次数。

![](/images/gemm-算法优化/pasted-image-20250914111750-png)

> 下文我们将最内层的循环称为**微内核（micro kernel）**，比如 `AddDot1x4` 就是一个微内核。

```cpp
// AddDot1x4: 计算 C 的一个 1x4 块（按行主序）
// Ai 指向 A 的第 i 行起始；Bj 指向 B 的第 j 列所在的起始位置；Cij 指向 C[i][j]
inline void AddDot1x4(int K, const float* Ai, const float* Bj, float* Cij, int N) {
    float c0 = 0.0f, c1 = 0.0f, c2 = 0.0f, c3 = 0.0f;
    for (int k = 0; k < K; ++k) {
        float a = Ai[k];
        const float* bk = Bj + k * N; // B[k][j..j+3]
        c0 += a * bk[0];
        c1 += a * bk[1];
        c2 += a * bk[2];
        c3 += a * bk[3];
    }
    Cij[0] = c0;
    Cij[1] = c1;
    Cij[2] = c2;
    Cij[3] = c3;
}

void gemm_1x4_blocked(int M, int N, int K, const float* A, const float* B, float* C) {
    for (int i = 0; i < M; ++i) {
        const float* Ai = &A[i * K];
        for (int j = 0; j < N; j += 4) {
            int w = std::min(4, N - j);
            if (w == 4) {
                AddDot1x4(K, Ai, &B[j], &C[i * N + j], N);
            } else { // 处理尾部 <4 列
                for (int jj = 0; jj < w; ++jj) {
                    float acc = 0.f;
                    for (int k = 0; k < K; ++k) acc += Ai[k] * B[k * N + (j + jj)];
                    C[i * N + j + jj] = acc;
                }
            }
        }
    }
}
```

**分析**：

- **FLOPs**：仍为 {{< imath >}}2 M N K{{< /imath >}}。
- **内存访问**：（以元素计，忽略缓存命中）
	- 读取 {{< imath >}}A{{< /imath >}}：对每个 {{< imath >}}1 \times 4{{< /imath >}} 块，每次 {{< imath >}}K{{< /imath >}} 次，共 {{< imath >}}\frac{M N}{4} \times K = \frac{M N K}{4}{{< /imath >}}。
	- 读取 {{< imath >}}B{{< /imath >}}：每次 {{< imath >}}4K{{< /imath >}}，共 {{< imath >}}\frac{M N}{4} \times 4K = M N K{{< /imath >}}。
	- 写入 {{< imath >}}C{{< /imath >}}：每块写 {{< imath >}}4{{< /imath >}} 次，共 {{< imath >}}M N{{< /imath >}}。无需读取 {{< imath >}}C{{< /imath >}}（寄存器累加后赋值）。
- **合计**：{{< imath >}}\frac{1}{4} M N K + 1 \cdot M N K + M N = 1.25\, M N K + M N{{< /imath >}}。

> 与 naive 相比，{{< imath >}}A{{< /imath >}} 的读取减少了 {{< imath >}}4 \times{{< /imath >}}（复用到 4 个连续列），{{< imath >}}B{{< /imath >}} 的读取次数相同但连续访问更友好，{{< imath >}}C{{< /imath >}} 的访存从每次迭代读写降为仅写一次。

**加速比**：

在内存带宽主导的 [Roofline 模型](https://en.wikipedia.org/wiki/Roofline_model) 下，性能与内存访问次数近似成反比，因此加速比为
{{< math >}}

S_{\text{1x4}} \approx \frac{4 M N K + M N}{1.25 M N K + M N} \approx \frac{4}{1.25} = 3.2 \quad (K \gg 1)

{{< /math >}}

## Loop Unrolling and Pointer Optimization

为了进一步优化，我们在 `AddDot1x4` 内部使用指针迭代与循环展开，减少地址计算和分支开销，提升指令级并行性与寄存器利用。

```cpp
inline void AddDot1x4_unroll4(int K, const float* Ai, const float* Bj, float* Cij, int N) {
    float c0 = 0.f, c1 = 0.f, c2 = 0.f, c3 = 0.f;
    const float* a = Ai;
    const float* b = Bj;
    int k = 0;
    for (; k + 3 < K; k += 4) {
        float a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];

        const float* b0 = b + 0 * N;
        const float* b1 = b + 1 * N;
        const float* b2 = b + 2 * N;
        const float* b3 = b + 3 * N;

        c0 += a0 * b0[0] + a1 * b1[0] + a2 * b2[0] + a3 * b3[0];
        c1 += a0 * b0[1] + a1 * b1[1] + a2 * b2[1] + a3 * b3[1];
        c2 += a0 * b0[2] + a1 * b1[2] + a2 * b2[2] + a3 * b3[2];
        c3 += a0 * b0[3] + a1 * b1[3] + a2 * b2[3] + a3 * b3[3];

        a += 4;
        b += 4 * N;
    }
    for (; k < K; ++k) {
        float av = *a++;
        const float* bk = b; b += N;
        c0 += av * bk[0]; c1 += av * bk[1]; c2 += av * bk[2]; c3 += av * bk[3];
    }
    Cij[0] = c0; Cij[1] = c1; Cij[2] = c2; Cij[3] = c3;
}
```

**分析**：
- **FLOPs**：仍为 {{< imath >}}2 M N K{{< /imath >}}。
- **内存访问**：与 {{< imath >}}1 \times 4{{< /imath >}} 相同（{{< imath >}}1.25\, M N K + M N{{< /imath >}}），仅减少了地址计算和分支开销。

**加速比**：
- **内存主导**：与 {{< imath >}}1 \times 4{{< /imath >}} 相同，约 {{< imath >}}3.2 \times{{< /imath >}}。
- **计算主导**：循环展开可进一步减少指令开销，常见提升在 {{< imath >}}5\% \sim 15\%{{< /imath >}} 范围（与编译器和微架构相关）。

## `4 × 4` Register Blocking

不难意识到，用一样的逻辑可以把上面的寄存器分块从 {{< imath >}}1 \times 4{{< /imath >}} 扩展到 {{< imath >}}4 \times 4{{< /imath >}}。这样可以进一步减少内存操作，提高效率。

![](/images/gemm-算法优化/pasted-image-20250914113809-png)

```cpp
// AddDot4x4: 计算 C 的一个 4x4 块（行主序，传入 C 的起始为 C[i][j]）
inline void AddDot4x4(int K, const float* Aij, const float* Bkj, float* Cij, int N, int Kstride) {
    float
        c00=0.f,c01=0.f,c02=0.f,c03=0.f,
        c10=0.f,c11=0.f,c12=0.f,c13=0.f,
        c20=0.f,c21=0.f,c22=0.f,c23=0.f,
        c30=0.f,c31=0.f,c32=0.f,c33=0.f;

    const float* a0 = Aij + 0 * Kstride;
    const float* a1 = Aij + 1 * Kstride;
    const float* a2 = Aij + 2 * Kstride;
    const float* a3 = Aij + 3 * Kstride;

    for (int k = 0; k < K; ++k) {
        float a0k = a0[k], a1k = a1[k], a2k = a2[k], a3k = a3[k];
        const float* bk = Bkj + k * N;

        float b0 = bk[0], b1 = bk[1], b2 = bk[2], b3 = bk[3];

        c00 += a0k * b0; c01 += a0k * b1; c02 += a0k * b2; c03 += a0k * b3;
        c10 += a1k * b0; c11 += a1k * b1; c12 += a1k * b2; c13 += a1k * b3;
        c20 += a2k * b0; c21 += a2k * b1; c22 += a2k * b2; c23 += a2k * b3;
        c30 += a3k * b0; c31 += a3k * b1; c32 += a3k * b2; c33 += a3k * b3;
    }

    Cij[0*N+0]=c00; Cij[0*N+1]=c01; Cij[0*N+2]=c02; Cij[0*N+3]=c03;
    Cij[1*N+0]=c10; Cij[1*N+1]=c11; Cij[1*N+2]=c12; Cij[1*N+3]=c13;
    Cij[2*N+0]=c20; Cij[2*N+1]=c21; Cij[2*N+2]=c22; Cij[2*N+3]=c23;
    Cij[3*N+0]=c30; Cij[3*N+1]=c31; Cij[3*N+2]=c32; Cij[3*N+3]=c33;
}
```

**分析**：
- FLOPs：仍为 {{< imath >}}2 M N K{{< /imath >}}。
- 内存访问（元素计）：
	- 读取 {{< imath >}}A{{< /imath >}}：每块 {{< imath >}}4K{{< /imath >}}，块数 {{< imath >}}\frac{M}{4}\times\frac{N}{4}{{< /imath >}}，合计 {{< imath >}}\frac{M N K}{4}{{< /imath >}}。
	- 读取 {{< imath >}}B{{< /imath >}}：每块 {{< imath >}}4K{{< /imath >}}，同上合计 {{< imath >}}\frac{M N K}{4}{{< /imath >}}。
	- 写入 {{< imath >}}C{{< /imath >}}：每块 {{< imath >}}16{{< /imath >}} 次，共 {{< imath >}}M{{< /imath >}}。
- 合计：{{< imath >}}0.5\, M N K + M N{{< /imath >}}。

> 与 {{< imath >}}1 \times 4{{< /imath >}} 相比，{{< imath >}}B{{< /imath >}} 的读取也减少了 {{< imath >}}4 \times{{< /imath >}}（同一批 {{< imath >}}B[k, j..j+3]{{< /imath >}} 复用到 4 行），因此总体内存访问显著下降。

**加速比**：
{{< math >}}

S_{\text{4x4}} \approx \frac{4 M N K + M N}{0.5 M N K + M N} \approx \frac{4}{0.5} = 8 \quad (K \gg 1)

{{< /math >}}

## SIMD Vectorization

现在我们引入 SIMD，以 Intel SSE 指令集为例（128-bit，单精度宽度 {{< imath >}}W = 4{{< /imath >}}）。下面给出与 `AddDot4x4` 对齐的简化向量化微内核。

```cpp
#include <immintrin.h>

inline void AddDot4x4_SSE(int K, const float* Aij, const float* Bkj, float* Cij, int N, int Kstride) {
    __m128 c0 = _mm_setzero_ps();
    __m128 c1 = _mm_setzero_ps();
    __m128 c2 = _mm_setzero_ps();
    __m128 c3 = _mm_setzero_ps();

    const float* a0 = Aij + 0 * Kstride;
    const float* a1 = Aij + 1 * Kstride;
    const float* a2 = Aij + 2 * Kstride;
    const float* a3 = Aij + 3 * Kstride;

    for (int k = 0; k < K; ++k) {
        __m128 b = _mm_loadu_ps(&Bkj[k * N]); // B[k][j..j+3]
        __m128 a0v = _mm_set1_ps(a0[k]);
        __m128 a1v = _mm_set1_ps(a1[k]);
        __m128 a2v = _mm_set1_ps(a2[k]);
        __m128 a3v = _mm_set1_ps(a3[k]);

        c0 = _mm_add_ps(c0, _mm_mul_ps(a0v, b));
        c1 = _mm_add_ps(c1, _mm_mul_ps(a1v, b));
        c2 = _mm_add_ps(c2, _mm_mul_ps(a2v, b));
        c3 = _mm_add_ps(c3, _mm_mul_ps(a3v, b));
    }

    _mm_storeu_ps(&Cij[0 * N], c0);
    _mm_storeu_ps(&Cij[1 * N], c1);
    _mm_storeu_ps(&Cij[2 * N], c2);
    _mm_storeu_ps(&Cij[3 * N], c3);
}
```

**分析**：
- **FLOPs**：仍为 {{< imath >}}2 M N K{{< /imath >}}。
- **内存访问**：与标量 `4×4` 相同（{{< imath >}}0.5\, M N K + M N{{< /imath >}}）。SIMD 仅改变算术吞吐，不改变 DRAM 访存量。
- 计算主导场景的理论加速：约等于向量宽度 {{< imath >}}W{{< /imath >}}（SSE 单精度为 {{< imath >}}4{{< /imath >}}；AVX2 为 {{< imath >}}8{{< /imath >}}；AVX-512 为 {{< imath >}}16{{< /imath >}}）。若支持 FMA（如 AVX2/FMA、AVX-512），每周期可进一步提升。

**加速比**：
- **内存主导**：约 {{< imath >}}8 \times{{< /imath >}}（同 `4×4`）。
- **计算主导**： `4×4` 与 SIMD 的收益不可直接相乘，约 {{< imath >}}8 \times W{{< /imath >}} 的上界不成立；更实际的估计是：在 `4×4` 将算术强度显著提升后，若仍处于计算主导，则 SIMD 可再带来 {{< imath >}}W \times{{< /imath >}} 左右的额外提升。

## Cache Blocking（Macro-kernel）

尽管 SIMD 和寄存器分块（微内核）带来了巨大的性能提升，但当矩阵尺寸超出 CPU 缓存容量时，性能仍会因高昂的内存访问延迟而下降。**缓存分块 (Cache Blocking)** 旨在将矩阵操作分解成一系列小块操作，使这些块的数据能够长时间驻留在不同级别的缓存中（例如 L1、L2、L3），从而实现数据重用最大化。

```cpp
// 缓存分块 + 4x4 微内核
void gemm_blocked_4x4(int M, int N, int K, const float* A, const float* B, float* C) {
    const int MR = 4, NR = 4;
    const int KC = 128; // 需按架构调优
    for (int kk = 0; kk < K; kk += KC) {
        int Kc = std::min(KC, K - kk);
        for (int i = 0; i < M; i += MR) {
            int Mb = std::min(MR, M - i);
            for (int j = 0; j < N; j += NR) {
                int Nb = std::min(NR, N - j);
                if (Mb == MR && Nb == NR) {
                    AddDot4x4(Kc, &A[i * K + kk], &B[kk * N + j], &C[i * N + j], N, K);
                } else { // 退化处理
                    for (int ii = 0; ii < Mb; ++ii)
                        for (int jj = 0; jj < Nb; ++jj) {
                            float acc = 0.f;
                            for (int k = 0; k < Kc; ++k)
                                acc += A[(i + ii) * K + (kk + k)] * B[(kk + k) * N + (j + jj)];
                            C[(i + ii) * N + (j + jj)] = acc + C[(i + ii) * N + (j + jj)];
                        }
                }
            }
        }
    }
}
```

**分析**：
- **FLOPs**：仍为 {{< imath >}}2 M N K{{< /imath >}}。
- **DRAM 级内存访问**：（理想分块并有良好复用时）
	- {{< imath >}}A{{< /imath >}}：每个元素从 DRAM 读入约 {{< imath >}}1{{< /imath >}} 次，{{< imath >}}M K{{< /imath >}}。
	- {{< imath >}}B{{< /imath >}}：每个元素从 DRAM 读入约 {{< imath >}}1{{< /imath >}} 次，{{< imath >}}K N{{< /imath >}}。
	- {{< imath >}}C{{< /imath >}}：每个元素从 DRAM 读写各 {{< imath >}}1{{< /imath >}} 次，{{< imath >}}2 M N{{< /imath >}}。
- 合计：{{< imath >}}M K + K N + 2 M N{{< /imath >}}。

> 通过按 {{< imath >}}K{{< /imath >}} 维度切块，{{< imath >}}A{{< /imath >}} 与 {{< imath >}}B{{< /imath >}} 的面板在较小的 {{< imath >}}K_c{{< /imath >}} 上反复被微内核复用；只要 {{< imath >}}K_c{{< /imath >}}、{{< imath >}}M_r{{< /imath >}}、{{< imath >}}N_r{{< /imath >}} 选取得当，就能使复用主要发生在 L1/L2/L3 中，从 DRAM 的视角看，{{< imath >}}A{{< /imath >}}/{{< imath >}}B{{< /imath >}} 基本只需读取一次。

**加速比**：
{{< math >}}

S_{\text{blocked}} \approx \frac{4 M N K + M N}{M K + K N + 2 M N}

{{< /math >}}

当 {{< imath >}}M = N = K = n{{< /imath >}} 时，有 {{< imath >}}S \approx \frac{4 n^3}{4 n^2} = n{{< /imath >}}，随问题规模线性增长，实际受缓存与带宽上限限制。

## Data Packing

即使有了缓存分块，如果原始矩阵的内存布局导致块内部的数据不连续（例如，行主序矩阵中的列访问），缓存效率仍然会受损。**数据打包 (Packing)** 通过将需要计算的矩阵块复制到临时的、内存**连续且对齐**的缓冲区中来解决这个问题。

- 将 {{< imath >}}A{{< /imath >}} 的 {{< imath >}}M_r \times K_c{{< /imath >}} 面板按“列优先、行紧凑”的形式打包，便于微内核顺序读取。
- 将 {{< imath >}}B{{< /imath >}} 的 {{< imath >}}K_c \times N_r{{< /imath >}} 面板按“行优先、列紧凑”的形式打包，使得每个 {{< imath >}}k{{< /imath >}} 的 {{< imath >}}B[k, j..j+N_r-1]{{< /imath >}} 连续、对齐。

示例打包代码（以 {{< imath >}}M_r=4, N_r=4{{< /imath >}} 为例）：

```cpp
// pack A: 从行主序 A 中取 4xKc，按列（k）主序、行（r）紧凑存放：Apack[k*4 + r]
void pack_A_4xKc(const float* A, int lda, float* Apack, int Kc) {
    for (int k = 0; k < Kc; ++k) {
        Apack[k * 4 + 0] = A[0 * lda + k];
        Apack[k * 4 + 1] = A[1 * lda + k];
        Apack[k * 4 + 2] = A[2 * lda + k];
        Apack[k * 4 + 3] = A[3 * lda + k];
    }
}

// pack B: 从行主序 B 中取 Kc x 4，按行（k）主序、列（c）紧凑存放：Bpack[k*4 + c]
void pack_B_Kc4(const float* B, int ldb, float* Bpack, int Kc) {
    for (int k = 0; k < Kc; ++k) {
        const float* bk = B + k * ldb;
        Bpack[k * 4 + 0] = bk[0];
        Bpack[k * 4 + 1] = bk[1];
        Bpack[k * 4 + 2] = bk[2];
        Bpack[k * 4 + 3] = bk[3];
    }
}
```

配合打包的 4×4 微内核（内层线性访问）：

```cpp
inline void AddDot4x4_packed(int Kc, const float* Ap, const float* Bp, float* Cij, int N) {
    __m128 c0 = _mm_setzero_ps();
    __m128 c1 = _mm_setzero_ps();
    __m128 c2 = _mm_setzero_ps();
    __m128 c3 = _mm_setzero_ps();

    for (int k = 0; k < Kc; ++k) {
        __m128 b = _mm_loadu_ps(&Bp[k * 4]);
        float a0 = Ap[k * 4 + 0];
        float a1 = Ap[k * 4 + 1];
        float a2 = Ap[k * 4 + 2];
        float a3 = Ap[k * 4 + 3];

        c0 = _mm_add_ps(c0, _mm_mul_ps(_mm_set1_ps(a0), b));
        c1 = _mm_add_ps(c1, _mm_mul_ps(_mm_set1_ps(a1), b));
        c2 = _mm_add_ps(c2, _mm_mul_ps(_mm_set1_ps(a2), b));
        c3 = _mm_add_ps(c3, _mm_mul_ps(_mm_set1_ps(a3), b));
    }

    _mm_storeu_ps(&Cij[0 * N], _mm_add_ps(c0, _mm_loadu_ps(&Cij[0 * N])));
    _mm_storeu_ps(&Cij[1 * N], _mm_add_ps(c1, _mm_loadu_ps(&Cij[1 * N])));
    _mm_storeu_ps(&Cij[2 * N], _mm_add_ps(c2, _mm_loadu_ps(&Cij[2 * N])));
    _mm_storeu_ps(&Cij[3 * N], _mm_add_ps(c3, _mm_loadu_ps(&Cij[3 * N])));
}
```

- **FLOPs**：不变。
- **DRAM 访存**：与“理想分块”一致（{{< imath >}}M K + K N + 2 M N{{< /imath >}}），但常数项更小（线性、对齐、可预取），SIMD 装载更高效。

## OpenMP Parallelization

在多核 CPU 上，使用 OpenMP 对外层块循环并行是提升性能的有效手段。推荐在线程之间划分 {{< imath >}}(i, j){{< /imath >}} 的宏块，避免对同一 {{< imath >}}C{{< /imath >}} 子块的写冲突。

```cpp
// OpenMP 并行的分块 GEMM（以 4x4 微内核 + K 分块为例）
void gemm_blocked_omp(int M, int N, int K, const float* A, const float* B, float* C, int num_threads) {
    const int MR = 4, NR = 4, KC = 256, MC = 256, NC = 256;

    #pragma omp parallel num_threads(num_threads)
    {
        // 线程私有的临时打包缓冲区
        std::vector<float> Ap(MR * KC), Bp(KC * NR);

        #pragma omp for collapse(2) schedule(static)
        for (int jc = 0; jc < N; jc += NC) {
            for (int ic = 0; ic < M; ic += MC) {
                int Nc = std::min(NC, N - jc);
                int Mc = std::min(MC, M - ic);
                for (int pc = 0; pc < K; pc += KC) {
                    int Kc = std::min(KC, K - pc);
                    for (int i = ic; i < ic + Mc; i += MR) {
                        int Mb = std::min(MR, ic + Mc - i);
                        for (int j = jc; j < jc + Nc; j += NR) {
                            int Nb = std::min(NR, jc + Nc - j);
                            if (Mb == MR && Nb == NR) {
                                pack_A_4xKc(&A[i * K + pc], K, Ap.data(), Kc);
                                pack_B_Kc4(&B[pc * N + j], N, Bp.data(), Kc);
                                AddDot4x4_packed(Kc, Ap.data(), Bp.data(), &C[i * N + j], N);
                            } else {
                                for (int ii = 0; ii < Mb; ++ii)
                                    for (int jj = 0; jj < Nb; ++jj) {
                                        float acc = 0.f;
                                        for (int k = 0; k < Kc; ++k)
                                            acc += A[(i + ii) * K + (pc + k)] * B[(pc + k) * N + (j + jj)];
                                        C[(i + ii) * N + (j + jj)] += acc;
                                    }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

**分析**：
- **FLOPs**：不变。
- **DRAM 访存**：与“分块 + 打包”的单线程相同（{{< imath >}}M K + K N + 2 M N{{< /imath >}}）。
- **加速上界**：
	- 计算主导：理想线性加速 {{< imath >}}\leq T{{< /imath >}}（线程数）。
	- 内存主导：受内存带宽限制，{{< imath >}}\leq \frac{\text{BW}_{\text{并行}}}{\text{BW}_{\text{单线程}}}{{< /imath >}}。当达到带宽饱和后继续加线程收益有限。

**加速比**：

- 在“分块 + 打包”基础上，OpenMP 将计算并行化。理想上界（计算主导）：{{< math >}}
 S_{\text{blocked+packed+OMP}} \approx \min\left(T,\ \frac{\text{PeakFLOPs}}{\text{单线程 FLOPs}}\right) \times \frac{4 M N K + M N}{M K + K N + 2 M N} 
{{< /math >}}
- 在带宽主导时，上式中 {{< imath >}}T{{< /imath >}} 替换为带宽扩展比。

## Method Comparison

为便于对比，下面给出各优化策略在“忽略缓存命中、以元素访问计”的内存访问与内存主导模型下的理论加速比（相对 naive）：

| 方法              | 微内核形状 | FLOPs  | 内存访问（元素数）       | 相对 naive 加速比（内存主导，{{< imath >}}K \gg 1{{< /imath >}}）          |
| --------------- | ----- | ------ | --------------- | ------------------------------------- |
| naive           | 无     | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}4MNK + MN{{< /imath >}}     | {{< imath >}}1.0{{< /imath >}}                                 |
| 1×4 寄存器分块       | 1×4   | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}1.25MNK + MN{{< /imath >}}  | {{< imath >}}\approx 3.2{{< /imath >}}                         |
| 1×4 + 展开        | 1×4   | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}1.25MNK + MN{{< /imath >}}  | {{< imath >}}\approx 3.2{{< /imath >}}（计算主导再 +5%~15%）          |
| 4×4 寄存器分块       | 4×4   | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}0.5MNK + MN{{< /imath >}}   | {{< imath >}}\approx 8.0{{< /imath >}}                         |
| 4×4 + SIMD（SSE） | 4×4   | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}0.5MNK + MN{{< /imath >}}   | 内存主导 {{< imath >}}\approx 8.0{{< /imath >}}；计算主导再 {{< imath >}}\times 4{{< /imath >}}   |
| 分块（{{< imath >}}K_{c}{{< /imath >}}）+ 打包 | 任意    | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}MK + KN + 2MN{{< /imath >}} | {{< imath >}}\frac{4MNK+MN}{MK+KN+2MN}{{< /imath >}}（方阵约为 {{< imath >}}n{{< /imath >}}） |
| 分块 + 打包 +OpenMP | 任意    | {{< imath >}}2MNK{{< /imath >}} | {{< imath >}}MK + KN + 2MN{{< /imath >}} | 上式 × 并行效率（受带宽与可伸缩性限制）                 |

- 上表的内存访问为“理想化、从 DRAM 角度”的估算，实际性能取决于缓存命中、预取、对齐、访存指令融合和前端/后端瓶颈等。

- 采用 `+=` 写回将引入对 {{< imath >}}C{{< /imath >}} 的读操作；若事先知道目标 {{< imath >}}C{{< /imath >}} 块为零，可进一步减少读流量。

## Comparing with BLAS Libraries

- 现代 BLAS（如 Intel MKL、OpenBLAS、BLIS）普遍采用“三级分块 + 数据打包 + 专用微内核（含 SIMD/FMA）”的体系：
	- 最外层：{{< imath >}}N_c{{< /imath >}}、{{< imath >}}M_c{{< /imath >}}、{{< imath >}}K_c{{< /imath >}} 级别的宏分块，匹配 L3/L2。
	- 中层：面板打包（AB-panel），顺序、对齐、预取友好。
	- 内层：手写/内联汇编微内核，固定 {{< imath >}}M_r \times N_r{{< /imath >}}，深度展开，寄存器阻塞，利用 FMA 与流水线。
- 对 x86：
	- SSE 场景常见微内核大小约 {{< imath >}}4 \times 4{{< /imath >}}。
	- AVX2/AVX-512 场景常见 {{< imath >}}M_r, N_r{{< /imath >}} 更大（如 {{< imath >}}6 \times 16{{< /imath >}}、{{< imath >}}8 \times 30{{< /imath >}} 等），并利用 FMA。
- 这些库还会进行：
	- 多级预取策略（硬件/软件结合）。
	- NUMA 感知的任务分配与内存归属（first-touch）。
	- 针对边界块的专门路径和对齐优化。

## Summary

- 从“寄存器分块（微内核）→ SIMD → 缓存分块（宏内核）→ 数据打包 → OpenMP 并行”的路径逐层优化了 GEMM 性能。

- 核心思想：
  1. 用寄存器保存部分和，显著减少对 {{< imath >}}C{{< /imath >}} 的读写。
  2. 通过 {{< imath >}}1 \times 4 \to 4 \times 4{{< /imath >}} 提高 {{< imath >}}A{{< /imath >}}/{{< imath >}}B{{< /imath >}} 的复用，降低 DRAM 访存。
  3. 用 SIMD/FMA 提高每条指令的 FLOPs。
  4. 宏分块与打包让复用在 L1/L2/L3 内生效，将 DRAM 流量降到 {{< imath >}}MK + KN + 2MN{{< /imath >}} 的量级。
  5. OpenMP 在多核扩展吞吐，但需注意带宽瓶颈与 NUMA。

- 在内存主导模型下的理论加速（相对 naive）：
	- {{< imath >}}1 \times 4{{< /imath >}}：约 {{< imath >}}3.2 \times{{< /imath >}}。
	- {{< imath >}}4 \times 4{{< /imath >}}：约 {{< imath >}}8 \times{{< /imath >}}。
	- 分块 + 打包：约 {{< imath >}}\frac{4MNK+MN}{MK+KN+2MN}{{< /imath >}}（方阵近似 {{< imath >}}n{{< /imath >}}）。
	- SIMD 与 OpenMP 的收益叠加取决于是否进入计算主导。

## References

- [How to optimize GEMM](https://github.com/flame/how-to-optimize-gemm/wiki)（FLAME wiki）
- [通用矩阵乘（GEMM）优化算法](https://zhenhuaw.me/blog/2019/gemm-optimization.html)
- [OpenBLAS](https://www.openblas.net)
