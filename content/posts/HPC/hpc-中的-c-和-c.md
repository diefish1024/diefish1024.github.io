---
tags:
- CS
- HPC
- CXX
discipline: computer-science
publish: true
date: '2025-08-30T16:44:00+08:00'
title: HPC 中的 C 和 C++
categories:
- concept
---
## 1. Why Memory Performance Matters in HPC?

在 HPC 领域，我们常常关注 CPU 的浮点运算能力 (FLOPS)，但真正的性能瓶颈往往不在于计算本身，而在于**数据访问**。现代 CPU 的计算速度远超于内存的访问速度，这种差距被称为**内存墙 (Memory Wall)**。程序的大部分时间可能都消耗在等待数据从内存加载到 CPU 寄存器的过程中。因此，优化内存访问模式，最大限度地利用 Cache，是提升 C/C++ 程序性能至关重要的一环。

## 2. Memory Alignment

内存对齐是指一个数据对象的内存地址是其自身大小或特定字节数（通常是 2 的幂）的整数倍。例如一个 4 字节的 `int` 类型变量，如果其内存地址是 4 的倍数（如 `0x...00`, `0x...04`, `0x...08`），那么它就是内存对齐的。

### 2.2 Why is Alignment Important?

CPU 并不是逐字节地从内存中读取数据，而是以块（通常是**缓存行 (Cache Line)**，例如 64 字节）为单位进行读取。

- **性能提升**：如果一个数据跨越了两个缓存行，CPU 就需要执行两次内存读取操作才能获取这一个数据，这会浪费一倍的时间。如果数据是对齐的，就可以保证它完整地落在一个缓存行内，CPU 只需一次读取操作。

- **硬件要求**：许多现代 CPU 指令集，尤其是用于并行计算的 **SIMD** 指令强制要求操作的数据必须是内存对齐的，对未对齐的数据执行这些指令可能会导致程序崩溃或性能急剧下降。

### 2.3 How to Achieve Alignment in C/C++?

- **C++11 `alignas`**：这是 Modern C++ 的标准方式，可以指定变量或类型的对齐要求。
```c++
// 声明一个按 64 字节对齐的数组
alignas(64) float aligned_array[1024];

// 定义一个结构体，使其每个实例都按 32 字节对齐
struct alignas(32) MyData {
    float a;
    int b;
};
```

- **GCC/Clang `__attribute__((aligned(N)))`**：特定于编译器的扩展。
```c
// 声明一个按 64 字节对齐的数组
float aligned_array[1024] __attribute__((aligned(64)));
```

- **动态内存对齐**：标准的 `malloc` 不保证特定的对齐方式（通常只保证基本类型的对齐）。需要使用专用函数。
```c
#include <stdlib.h>

// C11 标准
// 分配 1024 个 float，并按 64 字节对齐
float* dynamic_array = (float*)aligned_alloc(64, 1024 * sizeof(float));
free(dynamic_array); // 必须用 free 释放
```

## 3. Data Locality

数据局部性是缓存工作的基本原理，也是性能优化的核心。描述了 CPU 访问内存地址的集中程度。

### 3.1 Temporal and Spatial Locality

- **时间局部性 (Temporal Locality)**：如果一个数据项被访问，那么在不久的将来它很可能再次被访问。

- **空间局部性 (Spatial Locality)**：如果一个数据项被访问，那么与它地址相近的数据项很可能在不久的将来被访问。

当 CPU 访问一个内存地址时，它会将包含该地址的整个缓存行加载到缓存中。充分利用这两个局部性原则，可以极大地提高**缓存命中率 (Cache Hit Rate)**，减少访问主内存的次数。

### 3.2 Optimizing Storage Layout

数据在内存中的布局方式直接影响空间局部性，尤其是在处理大量对象时。

- **AoS (Array of Structures)**：结构体数组。这是最直观的存储方式。
```c++
struct Point {
    float x, y, z;
};
Point points[N];
```

内存布局：`[x0, y0, z0, x1, y1, z1, ...]`

在这种布局下当我们想要访问一个点的坐标时空间局部性较好；然后相对所有点的 `x` 坐标进行操作时，`y` 和 `z` 也会被一同加载到缓存中，污染了缓存，造成性能浪费。

- **SoA (Structure of Arrays)**：数组结构体。
```c++
struct Points {
    float x[N];
    float y[N];
    float z[N];
};
Points points;
```

内存布局：`[x0, x1, ..., xN-1, y0, y1, ..., yN-1, ...]`

在这种布局下当我们需要对所有点的 `x` 坐标进行操作时，因为所有 `x` 的数据在内存中是连续的，空间局部性好，有利于 SIMD 向量化；然而当需要访问一个点的所有坐标时，需要三次内存访问，导致局部性较差。

在 HPC 中，大量的计算通常是针对某一特定属性的，因此 **SoA 布局往往能带来更好的性能**，尤其是在需要向量化优化时。

### 3.3 Optimizing Access Patterns

一旦数据在内存中完成布局，程序访问它的顺序就成为影响性能的下一个关键因素。以符合其存储顺序并最大化缓存利用率的方式访问数据，是挖掘数据局部性潜力的基础。

- **遍历顺序 (Row-Major Order)**

C/C++ 中的多维数组默认是**行主序 (Row-Major)** 存储的。这意味着二维数组 `A[M][N]` 在内存中是按行连续存放的。

内存布局: `A[0][0], A[0][1], ..., A[0][N-1], A[1][0], ...`

为了保证最佳的空间局部性，内层循环应该遍历最右边的索引。

- **高效的访问方式 (cache-firendly)**：
```c++
for (int i = 0; i < M; i++) {
    for (int j = 0; j < N; j++) {
        A[i][j] = ...; // 访问模式与存储模式一致，顺序访问
    }
}
```

- **低效的访问方式 (cache-disaster)**：
```c++
for (int j = 0; j < N; j++) {
    for (int i = 0; i < M; i++) {
        A[i][j] = ...; // 跨行跳跃访问，每次访问都可能导致缓存未命中
    }
}
```

**循环分块 (Loop Tiling / Blocking)**

对于大型矩阵运算（如矩阵乘法），即使访问顺序正确，数据量太大也无法全部装入缓存。循环分块是一种将计算分解为适合缓存大小的子问题的方法，可以同时提升时间和空间局部性。

- **未优化的矩阵乘法**：
```c++
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        for (int k = 0; k < N; k++) {
            C[i][j] += A[i][k] * B[k][j];
        }
    }
}
// B[k][j] 的访问是列访问，效率低下。
```

- **使用循环分块优化**：
```c++
int block_size = 16; // 块大小需根据缓存大小调整
for (int i0 = 0; i0 < N; i0 += block_size) {
    for (int j0 = 0; j0 < N; j0 += block_size) {
        for (int k0 = 0; k0 < N; k0 += block_size) {
            // 在缓存中计算一个子矩阵块
            for (int i = i0; i < i0 + block_size; i++) {
                for (int j = j0; j < j0 + block_size; j++) {
                    for (int k = k0; k < k0 + block_size; k++) {
                        C[i][j] += A[i][k] * B[k][j];
                    }
                }
            }
        }
    }
}
```

通过分块，程序可以把一小块数据加载到缓存中并充分复用，然后再处理下一块，大大提高了缓存命中率。

## 4. False Sharing in Parallel Computing

在多核并行编程（如 OpenMP, pthreads）中，一个非常隐蔽的性能杀手是**伪共享**。

- **原理**：缓存不仅仅在 CPU 和主存之间工作，还在多个核心之间保持数据**一致性 (Coherence)**。当一个核心修改了其缓存中的数据，该缓存行会被标记为“dirty”，一致性协议会使其他核心中相同的缓存行失效。

- **伪共享**：如果两个核心上的线程频繁修改**不同的变量**，但这些变量碰巧位于**同一个缓存行**中，那么每次修改都会导致对方的缓存行失效并需要重新从主存加载。这种由不相关的变量共享同一个缓存行而导致的性能下降，就是伪共享。
```c++
int results[NUM_THREADS]; // 假设 NUM_THREADS=2
#pragma omp parallel
{
    int tid = omp_get_thread_num();
    results[tid] = some_calculation();
}
// 如果 results[0] 和 results[1] 在同一个缓存行，
// 线程 0 修改 results[0] 会使线程 1 的缓存行失效，反之亦然。
```

- **解决方案**：手动进行**内存填充 (Padding)**，确保每个线程操作的数据位于不同的缓存行。
```c++
struct PaddedResult {
    int value;
    char padding[64 - sizeof(int)]; // 假设缓存行大小为 64 字节
};
PaddedResult results[NUM_THREADS];
```

## Summary

- **内存对齐**是利用硬件特性的基础，确保单次操作的效率和 SIMD 的可行性。

- **数据局部性**是核心优化思想，通过**优化存储布局 (AoS vs SoA)** 和**访问模式 (遍历顺序、循环分块)** 来最大化缓存利用率。

- 在并行环境中，必须警惕**伪共享**等陷阱，通过合理的内存布局避免多核间的性能干扰。

## References

- [HPC 中的 C/C++ - HPC 入门指南](https://xflops.sjtu.edu.cn/hpc-start-guide/coding/cpp-of-HPC/)
