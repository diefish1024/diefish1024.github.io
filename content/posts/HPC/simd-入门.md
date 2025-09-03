---
tags:
- CS
- HPC
- CXX
discipline: computer-science
publish: true
date: '2025-09-02T16:13:00+08:00'
title: SIMD 入门
categories:
- concept
---
## 1. What is SIMD?

SIMD，即 **Single Instruction Multiple Data** ，是一种并行计算的模式。传统的单指令单数据模型，也就是一条指令 CPU 只能处理一份数据，这在科学计算和图像渲染等大量数据密集的任务中是非常低效的。

SIMD 的核心思想是**用一条指令同时对多个数据进行操作**，现代的 CPU 为此设计了特殊的硬件单元，包括宽位（比如 128、256 或 512 位）的**向量寄存器 (Vector Registers)** 和能够操作这些寄存器的**向量指令 (Vector Instructions)**。一个向量操作可以同时完成多个标量操作，从而实现**数据并行 (Data Parallelism)**，提高效率。假设一个 256 位的向量寄存器可以容纳 8 个 32 位浮点数，一条向量加法指令就可以一次性完成 8 个浮点数的加法，理论上将这部分计算的吞吐量提升至原来的 8 倍；并且相比于执行 8 条独立的标量加法指令，CPU 只需要获取并解码一条向量加法指令，这降低了指令流水线的压力。

## 2. How SIMD Works

要理解 SIMD 的工作原理，需要了解两个核心概念：向量寄存器和向量指令。

### 2.1. Vector Registers

向量寄存器是 CPU 内部的特殊存储单元，其宽度远大于通用寄存器。不同的 **Instruction Set Architecture (ISA, 指令集架构)** 提供了不同宽度和名称的向量寄存器。

- **SSE (Streaming SIMD Extensions)**：提供了 128 位的 `XMM` 寄存器。

- **AVX (Advanced Vector Extensions)**：提供了 256 位的 `YMM` 寄存器。

- **AVX-512**：提供了 512 位的 `ZMM` 寄存器。

- **ARM NEON**：主要用于移动设备，提供 128 位的向量寄存器。

比如一个 `YMM` 寄存器可以同时存放 8 个单精度浮点数（8 * 32 位 = 256 位）或 4 个双精度浮点数（4 * 64 位 = 256 位）。

### 2.2. Vector Instructions

向量指令是专门用来操作向量寄存器中数据的指令。这些指令通常与标量指令功能对应，但作用于整个向量。

- **算术运算**：向量加、减、乘、除。

- **逻辑运算**：向量与、或、异或。

- **数据加载/存储**：将内存中的连续数据块加载到向量寄存器，或将寄存器中的数据存回内存。

- **数据重排 (Shuffle/Permute)**：在向量寄存器内部重新排列数据元素，这是许多高级算法优化的关键。

## 3. SIMD Programming Models

实际编程中，主要通过两种凡是来利用 SIMD：自动向量化和手动向量化。

### 3.1 Automatic Vectorization

**Automatic Vectorization (自动向量化)** 是指编译器自动分析代码（通常是循环），并将其转换为 SIMD 指令的过程。这是最简单、最直接的优化方式。

要让编译器成功进行自动向量化，代码需要满足一些条件：

- **循环结构简单**: 循环体内部没有复杂的分支判断。

- **无数据依赖**: 循环的每次迭代之间没有依赖关系。例如，`a[i] = a[i-1] + 1` 这样的代码就存在数据依赖，无法被直接向量化。

- **内存访问连续**: 对数组的访问是连续的，例如 **row-major order (行主序)** 访问。

一个能被自动向量化的简单例子：
```c++
void vector_add(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; ++i) {
        // 每次迭代之间没有数据依赖
        // 内存访问也是连续的
        c[i] = a[i] + b[i];
    }
}
```

现代的编译器（比如 Clang, GCC）在开启优化选项时会默认尝试自动向量化。

### 3.2 Manual Vectorization with Intrinsics

当自动向量化不能满足性能要求，或者循环逻辑太复杂导致编译器无法分析时，就需要进行**手动向量化**。最常用的方法是使用 **Intrinsics (内建函数)**。

Intrinsics 是编译器提供的、与特定汇编指令一一对应的函数。我们可以和调用普通函数一样使用，而编译器会直接将其翻译成对应的 SIMD 指令。

这种方式的优点是：
- 可以精准控制使用哪条 SIMD 指令，实现最大程度的优化。
- 可以实现自动向量化无法完成的复杂逻辑。

缺点是：
- 代码可移植性差，和特定的架构强相关，基于特定 ISA 编写的代码不能在不支持该指令集的 CPU 上运行（除非使用 `qemu` ）。
- 需要学习特定指令集对应的函数，非常繁琐。

### 3.3 An Example

可以通过一个实例来对比普通实现和使用 AVX Intrinsics 的手动向量化实现。

**普通实现：**
```
// 传统的标量实现
void scalar_add(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; ++i) {
        c[i] = a[i] + b[i];
    }
}
```

**手动向量化**：
```c++
// 引入AVX头文件
#include <immintrin.h>

void avx_add(float* a, float* b, float* c, int n) {
    // 假设 n 是8的倍数，便于演示
    for (int i = 0; i < n; i += 8) {
        // 1. 从内存加载8个浮点数到 YMM 寄存器
        __m256 vec_a = _mm256_load_ps(&a[i]);
        __m256 vec_b = _mm256_load_ps(&b[i]);

        // 2. 执行向量加法，一条指令完成8个浮点数相加
        __m256 vec_c = _mm256_add_ps(vec_a, vec_b);

        // 3. 将计算结果从 YMM 寄存器存回内存
        _mm256_store_ps(&c[i], vec_c);
    }
}
```
- `__m256` 是 AVX 中的数据类型，代表一个 256 位的向量。
- `_mm256_load_ps` 从内存加载数据到向量寄存器。
- `_mm256_add_ps` 执行单精度浮点数的向量加法。
- `_mm256_store_ps` 将结果存回内存。

通过这种方式，循环迭代次数减少为原来的 1/8，并且每次迭代处理的数据量是原来的 8 倍，理论上性能提升巨大，但是由于这个入水平有限，写的 benchmark 没打过编译器自动优化✋😭🤚可能需要复杂一点的任务才能明显体现性能的优越性。

## Summary

- SIMD 是一种利用 **Data Parallelism (数据并行)** 提升性能的关键技术。

- 其核心是通过 **Vector Registers (向量寄存器)** 和 **Vector Instructions (向量指令)**，实现单指令处理多数据的目标。

- **Automatic Vectorization (自动向量化)** 是最便捷的 SIMD 优化方法，依赖于编译器的能力。

- 当需要极致性能和精确控制时，可以使用 **Intrinsics (内建函数)** 进行手动向量化。

## References

- [向量化 - HPC入门指南](https://xflops.sjtu.edu.cn/hpc-start-guide/parallel-computing/SIMD/)
- [lect19 - NJU OS 2025](https://jyywiki.cn/OS/2025/lect19.md)
