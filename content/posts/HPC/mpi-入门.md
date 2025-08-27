---
tags:
- learning
- CS
discipline: computer-science
publish: true
date: '2025-08-26T17:15:00+08:00'
title: MPI 入门
categories:
- concept
---
HPC 领域中，除了基于共享内存的 OpenMP, 还有一种更广泛应用于**分布式内存**系统的并行编程范式——**消息传递接口 (MPI)**。MPI 不依赖于共享内存，而是通过进程间的显式消息传递来实现数据交换和同步，从而能支持更大规模的集群计算，是构建大规模 HPC 集群不可或缺的工具。

### 1. What is MPI?

MPI (Message Passing Interface) 是一种用于**分布式内存**系统并行编程的标准化通信协议和库函数规范。它定义了一套可移植的函数接口，允许在并行计算环境中独立运行的进程之间进行**消息传递**，从而实现数据交换和协同工作。MPI 不指定如何启动进程，也不要求所有进程在同一台机器上，这使得它非常适合用于**集群或多节点环境**中的大规模并行计算。

### 2. The MPI Programming Model

**分布式内存模型**

> 在分布式内存模型中，各个处理节点可以独立运行自己的进程，使用自己的本地内存来存储和处理数据。每个进程的内存是私有的，其他进程无法直接访问它们。如果一个进程需要访问另一个进程的数据，就必须通过显式的消息传递机制将数据从一个进程发送到另一个进程。同一个节点（服务器）内部需要借助高速数据总线等硬件实现，而跨节点的通信通常由网络连接来实现，比如通过高速以太网、IB（InfiniBand）等。

**核心概念**

- **进程 (Process)**：一个 MPI 程序由一个或多个独立的进程组成。这些进程通过调用 MPI 库函数来进行通信。

- **通信子 (Communicator)**：一个通信子（`MPI_Comm`）定义了一个可以互相通信的进程组。最常用的通信子是 `MPI_COMM_WORLD`，它包含了程序启动时的所有进程。

- **秩 (Rank)**：在同一个通信子内，每个进程都被赋予一个唯一的整数标识，称为秩。秩的范围是从 `0` 到 `进程总数 - 1`。

- **消息传递 (Message Passing)**：进程间通信的核心机制，分为两大类：
    - **点对点通信 (Point-to-Point)**：在两个指定的进程之间进行。
    - **集体通信 (Collective)**：在一个通信子内的所有进程共同参与的通信。

- **通信协议**：MPI 提供了多种通信协议，如阻塞通信（Blocking）、非阻塞通信（Non-blocking）、同步通信（Synchronous）等。

### 3. Basic Functions and Concepts

一个基础的 MPI 程序总是包含初始化、执行并行代码和结束这几个部分。

```c
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv) {
    // 1. 初始化 MPI 环境
    MPI_Init(&argc, &argv);

    int world_size;
    int world_rank;
    char processor_name[MPI_MAX_PROCESSOR_NAME];
    int name_len;

    // 2. 获取通信子信息
    MPI_Comm_size(MPI_COMM_WORLD, &world_size); // 获取总进程数
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank); // 获取当前进程的秩

    // 获取处理器名称 (可选)
    MPI_Get_processor_name(processor_name, &name_len);

    // 3. 基于秩执行不同的代码
    printf("Hello world from processor %s, rank %d out of %d processors\n",
           processor_name, world_rank, world_size);

    // 4. 结束 MPI 环境
    MPI_Finalize();

    return 0;
}
```

- **`MPI_Init()`**：初始化 MPI 执行环境，必须是第一个被调用的 MPI 函数。
- **`MPI_Comm_size()`**：获取指定通信子（这里是 `MPI_COMM_WORLD`）中的总进程数。
- **`MPI_Comm_rank()`**：获取当前进程在指定通信子中的秩。
- **`MPI_Finalize()`**：清理并结束 MPI 环境，必须是最后一个被调用的 MPI 函数。

### 4. Point-to-Point Communication

点对点通信是 MPI 中最基本的通信模式，用于在一个进程向另一个进程发送数据。核心操作是 `Send` 和 `Recv`。

```c
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);
    int world_rank, world_size;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    if (world_size < 2) {
        if (world_rank == 0) printf("This program requires at least 2 processes.\n");
        MPI_Finalize();
        return 1;
    }

    int number;
    if (world_rank == 0) {
        // 进程 0 发送数据给进程 1
        number = 42;
        MPI_Send(&number, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
        printf("Process 0 sent number %d to process 1\n", number);
    } else if (world_rank == 1) {
        // 进程 1 接收来自进程 0 的数据
        MPI_Recv(&number, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("Process 1 received number %d from process 0\n", number);
    }
    
    MPI_Finalize();
    return 0;
}
```

- **`MPI_Send(void* data, int count, MPI_Datatype datatype, int dest, int tag, MPI_Comm comm)`**:
    - `data`：发送缓冲区指针。
    - `count`：发送的数据元素个数。
    - `datatype`：发送的数据类型 (如 `MPI_INT`, `MPI_FLOAT`)。
    - `dest`：目标进程的秩。
    - `tag`：消息标签，用于区分不同的消息。
    - `comm`：使用的通信子。

- **`MPI_Recv(void* data, int count, MPI_Datatype datatype, int source, int tag, MPI_Comm comm, MPI_Status* status)`**:
    - `data`：接收缓冲区指针。
    - `source`：源进程的秩。
    - `status`：返回消息的状态信息 (可填 `MPI_STATUS_IGNORE` 忽略)。

### 5. Collective Communication

集体通信是涉及一个通信子中所有进程的通信操作，常用于实现数据分发、结果收集和同步等复杂操作。

- **广播 (`MPI_Bcast`)**：将一个进程（根进程）的数据发送给通信子中的所有其他进程。
```c
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) {
MPI_Init(&argc, &argv);

    int world_size;
    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    int* data = NULL;
    int data_size;

    if (world_rank == 0) {
        // 主进程初始化数据
        data_size = 5;
        data = (int*)malloc(data_size * sizeof(int));
        for (int i = 0; i < data_size; i++) data[i] = i + 1;

        printf("进程 0 广播数据：");
        for (int i = 0; i < data_size; i++) printf("%d ", data[i]);
        printf("\n");
    }

    MPI_Bcast(&data_size, 1, MPI_INT, 0, MPI_COMM_WORLD);

    // 分配缓冲区
    if (world_rank != 0) {
        data = (int*)malloc(data_size * sizeof(int));
    }

    MPI_Bcast(data, data_size, MPI_INT, 0, MPI_COMM_WORLD);

    printf("进程 %d 接收到的数据：", world_rank);
    for (int i = 0; i < data_size; i++) {
        printf("%d ", data[i]);
    }
    printf("\n");

    free(data);

    MPI_Finalize();

    return 0;
}
```

- **分发 (`MPI_Scatter`)**：将根进程中的一个数组，切分成若干块，然后分发给通信子中的所有进程（包括根进程自己）。

- **归约 (`MPI_Reduce`)**：从所有进程中收集数据，并通过指定的操作（如求和、最大值）将它们合并到根进程的变量中。

下面的例子通过 `Scatter` 和 `Reduce` 高效地并行计算了两个向量的点积：

```c
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    const int vector_size = 1000000;
    const int local_size = vector_size / size;

    float *full_A = NULL;
    float *full_B = NULL;

    if (rank == 0) {
        full_A = (float*)malloc(vector_size * sizeof(float));
        full_B = (float*)malloc(vector_size * sizeof(float));

        // 使用固定种子初始化完整向量（保证可重复性）
        srand(12345);
        for (int i = 0; i < vector_size; i++) {
            full_A[i] = (float)rand() / RAND_MAX;
            full_B[i] = (float)rand() / RAND_MAX;
        }
    }

    float *local_A = (float*)malloc(local_size * sizeof(float));
    float *local_B = (float*)malloc(local_size * sizeof(float));

    //============ 并行计算 ============
    float global_dot = 0.0;

    MPI_Scatter(full_A, local_size, MPI_FLOAT, 
                local_A, local_size, MPI_FLOAT, 0, MPI_COMM_WORLD);
    MPI_Scatter(full_B, local_size, MPI_FLOAT, 
                local_B, local_size, MPI_FLOAT, 0, MPI_COMM_WORLD);

    float local_dot = 0.0;
    for (int i = 0; i < local_size; ++i) {
        local_dot += (double)local_A[i] * (double)local_B[i];
    }

    MPI_Reduce(&local_dot, &global_dot, 1, MPI_FLOAT, MPI_SUM, 0, MPI_COMM_WORLD);

    //============串行计算============
    if (rank == 0) {
        double serial_dot = 0.0;
        for (int i = 0; i < vector_size; i++) {
            serial_dot += (double)full_A[i] * (double)full_B[i];
        }

        double abs_error = fabs(global_dot - serial_dot);

        printf("并行点积：%.16f\n", global_dot);
        printf("串行点积：%.16f\n", serial_dot);
        printf("绝对误差：%.6e\n", abs_error);

        free(full_A);
        free(full_B);
    }

    free(local_A);
    free(local_B);

    MPI_Finalize();
    return 0;
}
```

### 6. Communication Modes: Blocking vs. Non-blocking

MPI 提供了不同的通信模式，以应对不同的性能需求。

- **阻塞通信 (Blocking)**：`MPI_Send` 和 `MPI_Recv` 都是阻塞的。
    - `MPI_Send` 会一直等待，直到发送缓冲区的数据可以被安全地重用（通常是数据已被拷贝到系统缓冲区或已发送到接收方）。
    - `MPI_Recv` 会一直等待，直到消息完全接收到接收缓冲区。
    - **优点**：编程简单，逻辑清晰。
    - **缺点**：可能导致进程长时间等待，造成性能瓶颈。

- **非阻塞通信 (Non-blocking)**：`MPI_Isend` 和 `MPI_Irecv` 是非阻塞的。
    - 函数会立即返回，允许程序在通信进行的同时执行其他计算任务。
    - 需要配合 `MPI_Wait` 或 `MPI_Test` 来检查通信是否完成。
    - **优点**：可以实现 **计算和通信的重叠**，是 MPI 性能优化的关键。
    - **缺点**：编程复杂度更高。
    - **核心函数**：
        - `MPI_Isend`: 非阻塞发送。
        - `MPI_Irecv`: 非阻塞接收。
        - `MPI_Wait`: 等待一个非阻塞操作完成。

### 7. How to Compile and Run

通常 HPC 集群会预装 MPI 环境。在 Ubuntu/Debian 系统上，可以这样安装：

```bash
sudo apt-get install openmpi-bin libopenmpi-dev
```

- **编译**：使用 `mpicc` 编译器包装器，它会自动链接 MPI 库。

```bash
mpicc my_program.c -o my_program
```

- **运行**：使用 `mpirun` 或 `mpiexec` 命令启动程序。`-np` 参数指定要启动的进程总数。

```bash
# 启动 4 个进程来运行程序
mpirun -np 4 ./my_program
```
### Summary

MPI 是分布式内存并行编程的基石，它通过一套标准化的函数接口，实现了进程间的显式消息传递。其核心思想是将一个大任务分解给多个独立进程，通过 **点对点通信** 和 **集体通信** 协同工作。虽然编程模型比 OpenMP 更复杂，但它摆脱了单机内存的限制，能够扩展到数千个计算节点，是解决超大规模计算问题的首选工具。

### References

- [MPI - HPC入门指南](https://xflops.sjtu.edu.cn/hpc-start-guide/parallel-computing/mpi/)
- [Open MPI 入门笔记 | JinBridge](https://jinbridger.github.io/docs/hpc/openmpi-programming-101/)
