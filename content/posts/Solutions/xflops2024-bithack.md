---
tags:
- CS
- HPC
- solution
discipline: computer-science
publish: true
date: '2025-09-02T16:15:00+08:00'
title: Xflops2024-Bithack
categories:
- solution
---
去年超算队招新唯一没有解决的一道题，今在 Gemini 老师的帮助下成功解决，决定重写一份题解报告。

## Description

[题目传送门](https://github.com/HPC-SJTU/Xflops2024_1st_exam/tree/main/Bithack)

题目要求参赛者优化一个 C 语言函数 `rotate_the_bit_vector`，函数功能是对一个 bit vector 中的一个指定子区间进行**循环旋转**操作。

具体而言，题目给的 `bit_vector` 是一种内存紧凑的数据结构，将 8 个 bit 打包存储到一个字节中。参赛者需要在只修改 `submit_func.c` 一个文件的前提下重写其中的 `rotate_the_bit_vector` 函数，使其在大规模数据时尽可能快。

最后评分程序会通过三个不同的 benchmark (`-s`, `-m`, `-l`) 来衡量，每个测试中的数据规模会随着层数的增加而几何级增长，最终的得分取决于规定时间内能到达的“层数”，层数越高。说明性能越好，最终分数也越高。

## Analysis

### Three-Reversal Algorithm

假设要移动的区间长度为 {{< imath >}}n{{< /imath >}} ，需要移动 {{< imath >}}k{{< /imath >}} 位；由于向右旋转 {{< imath >}}k{{< /imath >}} 位可以等效于向左旋转 {{< imath >}}n-k{{< /imath >}} 位，因此只讨论向左的移动。

题目提供了一个初始的性能极差的实现，通过逐位移动 {{< imath >}}k{{< /imath >}} 次来实现 {{< imath >}}k{{< /imath >}} 位循环旋转，复杂度为 {{< imath >}}O(n^{2}){{< /imath >}}。根据这个原始实现很容易想到一个初步的优化方案：

问题的核心是把数组 `[A|B]` 变成 `[B|A]` ，一个经典的算法是**三步翻转法**：如果我们把翻转操作记为 `'` ，`A'` 表示数组 `A` 前后反转，那么可以发现原问题的操作实际上等价于三次翻转操作：`[A'|B']' = [B|A]` ，复杂度为 {{< imath >}}O(n){{< /imath >}} ，代码如下：
```c++
#include "./bit_vector.h"
#include <assert.h>
#include <stdbool.h>
#include <sys/types.h>

static void reverse_bits(bit_vector_t* const bit_vector, size_t start, size_t end) {
    while (start < end) {
        bool temp = bit_vector_get(bit_vector, start);
        bit_vector_set(bit_vector, start, bit_vector_get(bit_vector, end));
        bit_vector_set(bit_vector, end, temp);
        start++;
        end--;
    }
}

static size_t modulo(const ssize_t n, const size_t m) {
  const ssize_t signed_m = (ssize_t)m;
  assert(signed_m > 0);
  const ssize_t result = ((n % signed_m) + signed_m) % signed_m;
  assert(result >= 0);
  return (size_t)result;
}

void rotate_the_bit_vector(bit_vector_t* const bit_vector,
                     const size_t bit_offset,
                     const size_t bit_length,
                     const ssize_t bit_right_amount) {
    assert(bit_offset + bit_length <= bit_vector_get_bit_sz(bit_vector));

    if (bit_length <= 1) {
        return;
    }

    size_t left_shift = modulo(-bit_right_amount, bit_length);

    if (left_shift == 0) {
        return;
    }

    // 1. reverse [0, left_shift - 1]
    reverse_bits(bit_vector, bit_offset, bit_offset + left_shift - 1);
    
    // 2. reverse [left_shift, bit_length - 1]
    reverse_bits(bit_vector, bit_offset + left_shift, bit_offset + bit_length - 1);

    // 3. reverse [0, bit_length - 1]
    reverse_bits(bit_vector, bit_offset, bit_offset + bit_length - 1);
}
```

运行测试程序发现只能得到 72 pts
```
check result: PASSED
performance of -s: 26
performance of -m: 32
performance of -l: 37
------score--------
-s : 60.00 /100
-m : 72.73 /100
-l : 76.00 /100
total score: 71.82 /100
```

### Performance Analysis with `perf`

根据题目的提示，我们应该使用 `perf` 工具来分析性能的瓶颈：
```bash
perf record ./everybit -s
```

运行结束之后生成了一个名为 `perf.data` 的文件，之后再运行指令分析报告
```bash
perf report
```

输出的交互式界面显示
```
Overhead  Command   Shared Object         Symbol
  47.99%  everybit  everybit              [.] bit_vector_set
  20.29%  everybit  everybit              [.] bit_vector_get
  16.12%  everybit  everybit              [.] bitmask
  11.66%  everybit  everybit              [.] reverse_bits
   3.26%  everybit  libc.so.6             [.] __random
   0.15%  everybit  libc.so.6             [.] rand
   0.08%  everybit  [vdso]                [.] __vdso_clock_gettime
   0.08%  everybit  everybit              [.] bit_vector_randfill
   0.08%  everybit  ld-linux-x86-64.so.2  [.] _dl_init_paths
   0.08%  everybit  ld-linux-x86-64.so.2  [.] handle_intel.constprop.0
   0.08%  everybit  libc.so.6             [.] __random_r
   0.08%  everybit  libc.so.6             [.] _int_free
   0.08%  everybit  libc.so.6             [.] memmove
```

发现主要的性能瓶颈在 `bit_vector_set` 和 `bit_vector_get` 两个操作，这表明虽然我们的算法本身高效，但是其性能严重依赖这两个效率低下的 API ，这指出了我们的下一步优化方向就是这两个操作本身，任何不绕开这两个函数的优化都是治标不治本。

### Space-for-Time

既然瓶颈在于逐位操作，那么优化的核心思想必然是**用块级操作替代位级操作**。因此我们需要放弃之前翻转的做法，因为这必然会涉及到位级操作。

作为替代，我们很自然有**用空间换时间**的想法：
1. 在堆上用 `malloc` 开辟一块足够大的临时缓冲区 `temp_buffer`。
2. 将原数组需要旋转的 `B` 和 `A` 两部分，依次拷贝到 `temp_buffer` 中，使其内容直接变成旋转后的 `[B|A]` 顺序。
3. 将 `temp_buffer` 的内容一次性拷贝回原数组。

由于操作区间是非字节对齐的，我们不能直接使用 `memcpy`。因此，问题的关键就变成了实现一个高性能、支持任意比特偏移的 `bithack_memcpy` 函数。

按照这个思路优化后的代码如下：
```c++
#include "./bit_vector.h"
#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
// alloca.h is no longer needed for the final version
// #include <alloca.h> 
#include <stdint.h>

/**
 * @brief A highly optimized bit-level memcpy.
 *
 * Copies 'bit_len' bits from a source buffer at a given bit offset to a
 * destination buffer at another bit offset. This function is the core of the
 * performance optimization, using 64-bit word operations for the bulk of the copy.
 *
 * @param dst_buf The destination memory buffer.
 * @param dst_offset The starting bit offset in the destination buffer.
 * @param src_buf The source memory buffer.
 * @param src_offset The starting bit offset in the source buffer.
 * @param bit_len The number of bits to copy.
 */
static void bithack_memcpy(char* dst_buf, size_t dst_offset,
                           const char* src_buf, size_t src_offset,
                           size_t bit_len) {
    if (bit_len == 0) {
        return;
    }

    size_t bits_copied = 0;

    // Handle the head: copy bit by bit until the destination is byte-aligned.
    int head_bits = (8 - (dst_offset % 8)) % 8;
    if (head_bits > bit_len) {
        head_bits = bit_len;
    }
    for (int i = 0; i < head_bits; i++) {
        if ((src_buf[(src_offset + i) / 8] >> ((src_offset + i) % 8)) & 1)
            dst_buf[(dst_offset + i) / 8] |= (1 << ((dst_offset + i) % 8));
        else
            dst_buf[(dst_offset + i) / 8] &= ~(1 << ((dst_offset + i) % 8));
    }
    bits_copied += head_bits;

    // Handle the middle: use 64-bit word operations for maximum speed.
    while (bit_len - bits_copied >= 64) {
        size_t current_src_offset = src_offset + bits_copied;
        size_t current_dst_offset = dst_offset + bits_copied;
        
        uint64_t src_word;
        memcpy(&src_word, src_buf + current_src_offset / 8, sizeof(src_word));

        int bit_shift = current_src_offset % 8;
        
        if (bit_shift != 0) {
            uint8_t next_byte = src_buf[current_src_offset / 8 + 8];
            src_word = (src_word >> bit_shift) | (((uint64_t)next_byte) << (64 - bit_shift));
        }
        
        memcpy(dst_buf + current_dst_offset / 8, &src_word, sizeof(src_word));
        
        bits_copied += 64;
    }

    // Handle the tail: copy the remaining bits one by one.
    for (size_t i = bits_copied; i < bit_len; i++) {
        if ((src_buf[(src_offset + i) / 8] >> ((src_offset + i) % 8)) & 1)
            dst_buf[(dst_offset + i) / 8] |= (1 << ((dst_offset + i) % 8));
        else
            dst_buf[(dst_offset + i) / 8] &= ~(1 << ((dst_offset + i) % 8));
    }
}


static size_t modulo(const ssize_t n, const size_t m) {
  const ssize_t signed_m = (ssize_t)m;
  assert(signed_m > 0);
  const ssize_t result = ((n % signed_m) + signed_m) % signed_m;
  assert(result >= 0);
  return (size_t)result;
}

void rotate_the_bit_vector(bit_vector_t* const bit_vector,
                     const size_t bit_offset,
                     const size_t bit_length,
                     const ssize_t bit_right_amount) {
    assert(bit_offset + bit_length <= bit_vector_get_bit_sz(bit_vector));

    if (bit_length <= 1) {
        return;
    }

    size_t left_shift = modulo(-bit_right_amount, bit_length);

    if (left_shift == 0) {
        return;
    }

    size_t buf_byte_size = (bit_length + 7) / 8;

    char* temp_buffer = (char*)malloc(buf_byte_size);
    if (temp_buffer == NULL) {
        exit(1);
    }


    size_t first_part_len = bit_length - left_shift;
    size_t second_part_len = left_shift;

    bithack_memcpy(temp_buffer, 0,
                   bit_vector->buf, bit_offset + left_shift,
                   first_part_len);

    bithack_memcpy(temp_buffer, first_part_len,
                   bit_vector->buf, bit_offset,
                   second_part_len);

    bithack_memcpy(bit_vector->buf, bit_offset,
                   temp_buffer, 0,
                   bit_length);

    free(temp_buffer);
}
```

现在可以完美获得满分：
```
check result: PASSED
performance of -s: 37
performance of -m: 40
performance of -l: 44
------score--------
-s : 100.00 /100
-m : 100.00 /100
-l : 100.00 /100
total score: 100.00 /100
```

250918 upd: 稍微优化一下 middle 循环中的除法和取模操作，可以再提高一些性能。

## Details

最终的满分代码完全围绕 `bithack_memcpy` 函数构建。其工作原理的关键在于**分块处理**和对底层硬件原理的理解。

函数将任意拷贝任务拆分为三段：`Head` , `Middle` 和 `Tail`。`Head` 部分通过逐位拷贝，其唯一目的是让接下来的**目标地址实现字节对齐**。`Tail` 部分则处理最后剩下的、不足一个块的零散比特。

性能优化的核心在 `Middle` 部分，它以 64 位（8 字节）为单位进行块拷贝。其中处理非对齐源数据的逻辑是精髓所在：

```c
uint64_t src_word;
// 1. 预读取：从源地址的字节边界开始，安全地读取8个字节。
// 这导致我们拿到的数据相对于真正的起始点有一个偏移。
memcpy(&src_word, src_buf + current_src_offset / 8, sizeof(src_word));

int bit_shift = current_src_offset % 8;

if (bit_shift != 0) {
    // 2. 抓取：读取紧邻的下一个字节，它包含了我们缺失的数据。
    uint8_t next_byte = src_buf[current_src_offset / 8 + 8];
    // 3. 移位与拼接：
    //    a. (src_word >> bit_shift): 将预读取的数据右移，丢弃头部多余的比特。
    //    b. (((uint64_t)next_byte) << (64 - bit_shift)): 
    //       将下一个字节左移，使其恰好能填充右移后在高位留下的空缺。
    //    c. | : 通过或运算，将两部分拼接，重组出我们真正需要的64个比特。
    src_word = (src_word >> bit_shift) | (((uint64_t)next_byte) << (64 - bit_shift));
}

// 4. 写入：因为目标地址已对齐，所以可以高效地将重组好的 64 位数据写入。
memcpy(dst_buf + current_dst_offset / 8, &src_word, sizeof(src_word));
```

其高性能的根源在于两个核心的底层原理：**内存对齐 (Data Alignment)** 与 **数据局部性 (Data Locality)**。

- **Data Alignment**：CPU 访问内存以“字”（Word，64 位 CPU 即 8 字节）为单位。如果数据地址是其大小的倍数，CPU 就能**一次内存事务**完成读写，这叫**对齐访问**。非对齐访问则可能需要两次内存事务和内部拼接，性能大幅下降。`bithack_memcpy` 的“头部处理”阶段，其唯一目的就是**实现目标地址的字节对齐**，确保占主导地位的中部循环可以执行最高效的对齐写入操作。

- **Memory Locality & Caching**：CPU 内部有多级 Cache，速度远快于 RAM。当 CPU 访问某块内存时，会把其邻近的一整个 **Cache Line** 都预加载到缓存中。这就是**空间局部性原理 (Principle of Spatial Locality)**。我们的 `bithack_memcpy` 函数利用了这一点，无论是从原数组读，还是在临时缓冲区里读写，操作的都是**连续的大块内存**。当循环处理第一个 64 位字时，CPU 很可能已经将后面几百个字节的数据预加载到了的 L1 Cache 中，后续迭代无需访问慢速的内存，**缓存命中率 (Cache Hit Rate)** 极高。相比之下，最初的三步翻转法在内存中“来回跳跃”地访问单个比特，破坏了空间局部性，导致缓存命中率极低，性能自然不佳。

在开辟缓冲区的选择上面，笔者一开始选择了 `alloc` ，相比于堆内存，栈内存更快且不需要手动释放，但是发现在测试到一定的层数之后就会由于数据量过大而出现 Segment Falut ，因此最后还是选择了使用 `malloc` 来分配缓冲区。