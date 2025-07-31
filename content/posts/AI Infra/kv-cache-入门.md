---
tags:
- learning
- CS
- ai-infra
discipline: computer-science
publish: true
created: 2025-07-30 22:21
title: KV Cache 入门
categories:
- concept
---
推理效率对于 llm 是一个至关重要的问题。当模型生成文本时，尤其是以自回归方式逐词生成时，效率瓶颈会变得非常明显。KV Cache 就是为了解决这一问题而诞生的技术。

### 1. What is KV Cache?

KV Cache，全称 **Key-Value Cache**，是一种优化技术，用于加速 Transformer 架构在自回归生成过程中的推理速度。它的核心思想是**缓存**并**重用**在注意力机制中计算得到的 **Key (K)** 和 **Value (V)** 向量。

### 2. Transformer Attention Mechanism Review

要理解 KV Cache，首先需要对 Transformer 架构中的自注意力机制有一个基本认识。自注意力机制允许模型在处理序列中的某个词时，考虑序列中所有其他词的重要性。

每个输入 token（词或子词）在进入注意力层时，都会被转换成三个不同的向量：
- Q 向量：代表当前 token 的“查询”信息
- K 向量：代表所有 token 的“键”信息，用于与 Query 进行匹配
- V 向量：代表所有 token 的“值”信息，用于加权求和，得到最终的输出

自注意力机制的计算过程为以下步骤：
1.  计算 Query 与所有 Key 的点积，得到**注意力分数**
2.  将注意力分数进行缩放，除以 {{< imath >}}\sqrt{d_k}{{< /imath >}}（{{< imath >}}d_k{{< /imath >}} 是 Key 向量的维度)
3.  对缩放后的分数进行 Softmax，将其转换为**注意力权重**，表示每个 token 对当前 token 的重要性
4.  将注意力权重与 Value 向量进行加权求和，得到当前 token 的注意力输出

公式为：
{{< math >}}

\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V

{{< /math >}}
其中矩阵 {{< imath >}}Q,K,V \in \mathbb{R}^{L \times d}{{< /imath >}} ，{{< imath >}}L{{< /imath >}} 为当前上下文长度

（处于简洁性的考虑，忽略了 Causal Mask ，实际上 {{< imath >}}QK^{T}{{< /imath >}} 应该 Mask 成下三角矩阵来强制不能看到序列未来的信息）

### 3. The Problem KV Cache Solves

在大型语言模型中，当模型以自回归方式生成文本时（每次生成一个新 token，并将其添加到输入序列中，然后根据整个序列生成下一个 token），会遇到一个效率问题：

假设我们要生成“中华人民”
1.  **输入**：“中”
    - 模型计算“中”的 {{< imath >}}Q, K, V{{< /imath >}} 
    - 计算 attention ，生成“华”
2.  **输入**：“中华”
    - 模型再次计算“中”和“华”的 {{< imath >}}Q, K, V{{< /imath >}} 
    - 计算 attention ，生成“人”
3.  **输入**：“中华人”
    - 模型再次计算“中”、“华”和“人”的 {{< imath >}}Q, K, V{{< /imath >}} 
    - 计算 attention ，生成“民”

可以看到，在每一步生成新 token 时，都需要重新计算**之前已经处理过的所有 token** 的 {{< imath >}}K{{< /imath >}} 和 {{< imath >}}V{{< /imath >}} 向量。这种重复计算在序列较长时会消耗大量的计算资源和时间，效率低下。

### 4. How KV Cache Works

根据上面分析得到的问题，很容易想到 KV Cache 的核心思想：**将已经计算过的 Key 和 Value 向量缓存起来，在后续的生成步骤中直接重用，而不是重新计算。**

以生成“中华人民”为例，使用 KV Cache 的流程如下：
1.  **输入**：“中”
    - 计算“中”的 {{< imath >}}K_1, V_1{{< /imath >}} 
    - 将 {{< imath >}}K_1, V_1{{< /imath >}} 存入 KV Cache
    - 使用 {{< imath >}}Q_1, K_1, V_1{{< /imath >}} 计算 attention ，生成“华”
2.  **输入**：“华”（当前 token 只有“华”，但注意力要关注整个序列“中华”）
    - 计算“华”的 {{< imath >}}K_2, V_2{{< /imath >}} 
    - 将 {{< imath >}}K_2, V_2{{< /imath >}} 添加到 KV Cache。此时 KV Cache 包含 {{< imath >}}[K_1, K_2]{{< /imath >}} 和 {{< imath >}}[V_1, V_2]{{< /imath >}} 
    - 使用当前 {{< imath >}}Q_2{{< /imath >}} 和缓存中的 {{< imath >}}[K_1, K_2], [V_1, V_2]{{< /imath >}} 计算 attention ，生成“人”
3.  **输入**：“人”
    - 计算“人”的 {{< imath >}}K_3, V_3{{< /imath >}} 
    - 将 {{< imath >}}K_3, V_3{{< /imath >}} 添加到 KV Cache。此时 KV Cache 包含 {{< imath >}}[K_1, K_2, K_3]{{< /imath >}} 和 {{< imath >}}[V_1, V_2, V_3]{{< /imath >}} 
    - 使用当前 {{< imath >}}Q_3{{< /imath >}} 和缓存中的 {{< imath >}}[K_1, K_2, K_3], [V_1, V_2, V_3]{{< /imath >}} 计算 attention ，生成“民”

通过这种方式，每一步只需要计算**当前新生成 token** 的 {{< imath >}}K, V{{< /imath >}} 向量，而无需重新计算之前所有 token 的 {{< imath >}}K, V{{< /imath >}}。

### 5. Why Not QKV Cache?

可能会好奇，既然 K 和 V 都需要缓存，为什么不也缓存 Q 呢？也就是说，为什么是 KV Cache 而不是 QKV Cache？

原因在于 Q 向量的性质：

- Q 向量是用来“查询”当前 token 与序列中其他 token 的相关性的。在自回归生成过程中，每一步生成一个新的 token，这个新 token 对应的 Query 向量是**新的**，它基于当前步的隐藏状态计算得出。换句话说，每次生成新 token 时，其对应的 {{< imath >}}Q{{< /imath >}} 向量都是独一无二的，并且需要重新计算以反映最新的生成上下文。
- K 和 V 向量则代表了序列中每个 token 的“内容”信息。对于已经处理过的 token，它们的 {{< imath >}}K{{< /imath >}} 和 {{< imath >}}V{{< /imath >}} 向量一旦计算出来，其内容信息就是**固定不变的**。因此，这些 {{< imath >}}K{{< /imath >}} 和 {{< imath >}}V{{< /imath >}} 向量可以直接被缓存并反复使用，而无需重新计算。

因此，不缓存 Q 是因为它在每一步都是一个新的计算结果；而缓存 K 和 V 则可以显著减少重复计算，从而提高效率。

### 6. KV Cache in Attention Mechanism

在数学上，当使用 KV Cache 进行自回归解码时，注意力公式中的 {{< imath >}}K{{< /imath >}} 和 {{< imath >}}V{{< /imath >}} 矩阵会随着生成过程的进行而不断增长。

假设我们正在生成第 {{< imath >}}t{{< /imath >}} 个 token。
- 当前 token 的 Q 向量是 {{< imath >}}Q_t{{< /imath >}} ，这是一个行向量，代表当前第 {{< imath >}}t{{< /imath >}} 个 token 的 Query ，维度为 {{< imath >}}1 \times d_k{{< /imath >}} 
- K 矩阵 {{< imath >}}K_{\text{cached}}{{< /imath >}} 将包含从第一个 token 到第 {{< imath >}}t{{< /imath >}} 个 token 的所有 K 向量： {{< imath >}}K_{\text{cached}} = [K_1^T, K_2^T, \dots, K_t^T]^T{{< /imath >}} ，维度为 {{< imath >}}t \times d_k{{< /imath >}} 
- V 矩阵 {{< imath >}}V_{\text{cached}}{{< /imath >}} 将包含从第一个 token 到第 {{< imath >}}t{{< /imath >}} 个 token 的所有 V 向量： {{< imath >}}V_{\text{cached}} = [V_1^T, V_2^T, \dots, V_t^T]^T{{< /imath >}} 。其维度为 {{< imath >}}t \times d_v{{< /imath >}} 

那么，第 {{< imath >}}t{{< /imath >}} 个 token 的注意力计算变为：
{{< math >}}

\text{Attention}_{t}(Q_t, K_{\text{cached}}, V_{\text{cached}}) = \text{softmax}\left(\frac{Q_t K_{\text{cached}}^T}{\sqrt{d_k}}\right)V_{\text{cached}}

{{< /math >}}
其中
- {{< imath >}}Q_t K_{\text{cached}}^T{{< /imath >}} 是一个 {{< imath >}}1 \times t{{< /imath >}} 的行向量，代表当前 Query 与所有历史 Key 的相关性分数
- {{< imath >}}\text{softmax}{{< /imath >}} 操作将这个 {{< imath >}}1 \times t{{< /imath >}} 的向量转化为注意力权重
- 这个 {{< imath >}}1 \times t{{< /imath >}} 的注意力权重向量再与 {{< imath >}}V_{\text{cached}}{{< /imath >}} 矩阵（维度 {{< imath >}}t \times d_v{{< /imath >}}）相乘，得到最终的注意力输出，维度是 {{< imath >}}1 \times d_v{{< /imath >}} 

每次生成新的 token {{< imath >}}t+1{{< /imath >}} 时，我们只需要计算新的 {{< imath >}}Q_{t+1}{{< /imath >}}，将新计算的 {{< imath >}}K_{t+1}{{< /imath >}} 和 {{< imath >}}V_{t+1}{{< /imath >}} 拼接到 {{< imath >}}K_{\text{cached}}{{< /imath >}} 和 {{< imath >}}V_{\text{cached}}{{< /imath >}} 末尾，形成 {{< imath >}}K'_{\text{cached}} = \text{concat}(K_{\text{cached}}, K_{t+1}){{< /imath >}} 和 {{< imath >}}V'_{\text{cached}} = \text{concat}(V_{\text{cached}}, V_{t+1}){{< /imath >}}

### 7. Limitations and Considerations

尽管 KV Cache 带来了巨大的性能提升，但也存在一些问题：

- **内存占用**：KV Cache 需要存储所有已处理 token 的 Key 和 Value 向量。对于大型模型和长上下文序列，这些缓存可能非常大，导致显存（GPU Memory）成为瓶颈。
- **上下文长度限制**：由于内存限制，KV Cache 会限制模型能够处理的最大上下文长度。一旦达到内存上限，就需要采取策略来管理缓存，例如丢弃最早的 Key/Value 对（类似于循环缓冲区），但这可能会影响模型对长距离依赖的理解。

### Summary

KV Cache 是 Transformer 模型在自回归推理过程中非常重要的一种优化技术。通过缓存并重用已经计算过的 Key 和 Value 向量，它极大地减少了重复计算，从而显著提升了大型语言模型的生成速度。

### References

- [KV Cache 原理讲解 ](https://www.bilibili.com/video/BV17CPkeEEzk)（Bilibili）
	- *注意：此视频内容存在部分错误*
- [看图学KV Cache](https://zhuanlan.zhihu.com/p/662498827)（知乎）
- [为什么没有Q Cache](https://www.zhihu.com/question/653658936/answer/3545520807)（知乎）
