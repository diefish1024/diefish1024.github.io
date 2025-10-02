---
tags:
- learning
- math
- probability-theory
discipline: mathematics
publish: true
date: '2025-09-22T10:09:00+08:00'
title: Lect3-Conditional Probability
categories:
- course-note
---
## Introduction

条件概率指一个事件在另一个事件发生的条件下发生的概率，用记号 {{< imath >}}\mathbb{P}(A|B){{< /imath >}} 表示，仅在 {{< imath >}}\mathbb{P}(B)>0{{< /imath >}}
时有定义：
{{< math >}}

\mathbb{P}(A|B) = \dfrac{\mathbb{P}(A \cap B)}{P(B)}

{{< /math >}}
可以写成
{{< math >}}

\mathbb{P}(A \cap B) = \mathbb{P}(B)\cdot \mathbb{P}(A|B)

{{< /math >}}

对于 {{< imath >}}n{{< /imath >}} 个事件，连续使用上式，即可得到
{{< math >}}

\mathbb{P}\left( \bigcap_{i=1}^{n}A_{i} \right) = \prod_{k=1}^{n} \mathbb{P}\left( A_{k}\bigg|\bigcap_{i=1}^{k-1}A_{i} \right)

{{< /math >}}
这个式子被称为 [链式法则](https://en.wikipedia.org/wiki/Chain_rule_(probability))。

## Independence

对于事件 {{< imath >}}A,B{{< /imath >}}，如果 {{< imath >}}\mathbb{P}(A\cap B)=\mathbb{P}(A)\mathbb{P}(B){{< /imath >}}，或者等价地 {{< imath >}}\mathbb{P}(A|B)=\mathbb{P}(A){{< /imath >}}，那么我们称 {{< imath >}}A{{< /imath >}} 和 {{< imath >}}B{{< /imath >}} 是独立的。这表明 {{< imath >}}A{{< /imath >}} 或 {{< imath >}}B{{< /imath >}} 自己是否发生对对方是否发生没有影响。

推广到 {{< imath >}}n{{< /imath >}} 个事件上有：对于事件 {{< imath >}}A_{1},\dots,A_{n}{{< /imath >}}，如果他们是**相互独立**的，说明对于任意的 {{< imath >}}I\subseteq[n]{{< /imath >}} ，有
{{< math >}}

\mathbb{P}\left( \bigcap_{i\in I}A_{i} \right) = \prod_{i\in I}\mathbb{P}(A)_{i}

{{< /math >}}
这个定义非常强，因为它要求对于所有的 {{< imath >}}I\subseteq[n]{{< /imath >}} 都成立。

如果把定义改成只要求 {{< imath >}}I\in \binom{ [n] }{ 2 }{{< /imath >}}，可以得到**两两独立**的定义。

目前这都是关于有限集的定义，对于无穷多个事件 {{< imath >}}\{ A_{j} \}_{j\in J}{{< /imath >}}（这要求 {{< imath >}}J{{< /imath >}} 是可数集，否则概率没有定义），我们说它们是互相独立的，当且仅当对于 {{< imath >}}J{{< /imath >}} 的任意一个有限子集 {{< imath >}}I{{< /imath >}}，{{< imath >}}\{ A_{i} \}_{i\in I}{{< /imath >}} 相互独立。

## Law of Total Probability

假设事件 {{< imath >}}B_{1},B_{2},\dots,B_{n}\in \mathcal{F}{{< /imath >}} 构成了样本空间的一个划分，即 {{< imath >}}\Omega=\bigcup_{i=1}^{n}B_{i}{{< /imath >}} 并且对于 {{< imath >}}i\neq j{{< /imath >}}，有 {{< imath >}}B_{i}\cap B_{j}=\emptyset{{< /imath >}}。根据集合论的知识，我们可以推导出对于任意集合 {{< imath >}}A{{< /imath >}}，{{< imath >}}A\cap B_{i}{{< /imath >}} 也构成了 {{< imath >}}A{{< /imath >}} 的一个划分。如果我们取 {{< imath >}}A\in\mathcal{F}{{< /imath >}}，根据概率论公理，我们有
{{< math >}}

\mathbb{P}(A) = \mathbb{P}\left( \bigcup_{n\geq 1}(A\cap B_{n}) \right) = \sum_{n\geq 1} \mathbb{P}(A\cap B_{i})

{{< /math >}}
这就得到了 [全概率公式](https://en.wikipedia.org/wiki/Law_of_total_probability)。写成条件概率的形式，可以得到
{{< math >}}

\mathbb{P}(A) = \sum_{n\geq 1}\mathbb{P}(B_{n})\mathbb{P}(A|B_{n})

{{< /math >}}

## Some Examples

### 无限悖论

假设有无穷个球，用 {{< imath >}}k=1,2,\dots{{< /imath >}} 来编号，并有一个无穷大的箱子。考察“放球”和“拿球”的过程。

放球过程表述为：对于 {{< imath >}}n=0,1,2,\dots{{< /imath >}}，在 12 点前的 {{< imath >}}2^{-n}{{< /imath >}} 分钟放入编号为 {{< imath >}}10n+1,10n+2,\dots,10(n+1){{< /imath >}} 的球。

我们再使用不同的方式把球拿出来（假设拿和放都在瞬间完成）：

> 12 点前 {{< imath >}}2^{-n}{{< /imath >}} 分钟放完球后，从箱子里拿出 {{< imath >}}10(n+1){{< /imath >}} 号球。

这种情况下 12 点时箱子里会有无穷的球，因为编号不是 10 的倍数的球都没有被拿出来。

> 12 点前 {{< imath >}}2^{-n}{{< /imath >}} 分钟放完球后，从箱子里拿出 {{< imath >}}(n+1){{< /imath >}} 号球。

此时 12 点时箱子里一个球都没有，因为每个球都能找到一个对应的时刻被拿出来。

我们可以发现同样是拿一个球，最后的效果居然完全不同。我们现在考虑，如果随机拿出一个球又会怎么样？

> 12 点前 {{< imath >}}2^{-n}{{< /imath >}} 分钟放完球后，从箱子里均匀随机地拿出一个球。

我们计算每个球在 12 点的时候留在箱子里的概率。以 1 号球为例，其余类似。对于每个 {{< imath >}}n{{< /imath >}}，用事件 {{< imath >}}A_{n}{{< /imath >}} 表示在 {{< imath >}}n{{< /imath >}} 轮操作后 1 号球还在箱子里这个事件。我们需要关注的是
{{< math >}}

A_{\infty} := \bigcap_{n\geq 0}A_{n} = \lim_{ n \to \infty } A_{n}

{{< /math >}}
根据上一节中概率测度的连续性，我们有 {{< imath >}}\mathbb{P}(\lim_{ n \to \infty }A_{n})=\lim_{ n \to \infty }\mathbb{P}(A_{n}){{< /imath >}}。因此只需要计算 {{< imath >}}\mathbb{P}(A_{n}){{< /imath >}} 即可。我们再定义一个事件 {{< imath >}}B_{n}{{< /imath >}} 表示第 {{< imath >}}n{{< /imath >}} 轮拿出来的**不是** 1 号球，则有 {{< imath >}}A_{n}=B_{0}\cap B_{1}\cap\dots \cap B_{n}{{< /imath >}}。使用链式法则，就可以得到
{{< math >}}

\mathbb{P}(A_{n}) = \mathbb{P}\left( \bigcap_{i=1}^{n}B_{i} \right) = \prod_{k=0}^{n}\mathbb{P}\left( B_{k}\bigg|\bigcap_{i< k}B_{i} \right) 

{{< /math >}}
其中事件 {{< imath >}}B_{k}|\bigcap_{i< k}B_{i}{{< /imath >}} 有非常明显的组合意义，显然这个概率是 {{< imath >}}1- \dfrac{1}{9(k+1)+1}{{< /imath >}}。

因此
{{< math >}}

\mathbb{P}(A_{n}) = \prod_{k=0}^{n} \left( 1 - \dfrac{1}{9(k+1)+1} \right) \leq  e^{ -\sum_{k=0}^{n} 1/(9k+10) }

{{< /math >}}
由于级数 {{< imath >}}\sum_{k=0}^{n} \frac{1}{9k+10}{{< /imath >}} 发散，所以 {{< imath >}}\lim_{ n \to \infty }\mathbb{P}(A_{n})=0{{< /imath >}}，所以 12 点时 1 号球还在箱子里的概率 {{< imath >}}\mathbb{P}(S_{1}){{< /imath >}} 为 0。类似地，还能得到其他球的概率 {{< imath >}}\mathbb{P}(S_{n})=0{{< /imath >}}。我们现在需要知道 12 点时箱子里还有球的概率，即 {{< imath >}}\mathbb{P}(\exists n \subset \mathbb{N},S_{n}){{< /imath >}}，利用上一届的 union-bound，可以得到
{{< math >}}

\mathbb{P}(\exists n \subset \mathbb{N},S_{n}) \leq \sum_{n\geq 1}\mathbb{P}(S_{n})=0

{{< /math >}}

### Karger 最小割算法

一个经典的问题是求图上的最小割。给定一个连通无向图 {{< imath >}}G(V,E){{< /imath >}}，我们说边集 {{< imath >}}C \subseteq E{{< /imath >}} 是一个割，当且仅当删掉 {{< imath >}}C{{< /imath >}} 以后剩下的 {{< imath >}}G(V,E\setminus C){{< /imath >}} 是不连通的。我们需要寻找图上最小的一个割。

我们在此处考虑用一个随机算法求解这个问题。

定义图上的缩边操作：给定 {{< imath >}}e=\{ u,v \}\in E{{< /imath >}}，我们将 {{< imath >}}u,v{{< /imath >}} 合并成一个点，并删掉这条边，把缩完之后的图记为 {{< imath >}}G / e{{< /imath >}}。
![](/images/lect3-conditional-probability/pasted-image-20251002185631.png)

Kager 算法的原理非常简单，从 {{< imath >}}G{{< /imath >}} 出发，每次随机选择一条边，把它缩掉，重复执行 {{< imath >}}n-2{{< /imath >}} 之后图里面就会只剩下两个点，这时我们再输出所有剩下的边。

这个算法“有可能”输出省却答案的原理是，由于我们关心的是”最小”的割，那么我们每一步选到割中的边的概率就不会太大。为了谈论这个概率，我们需要选择合适的概率空间。一个自然的想法是选择算法执行过程中所有删除的边的序列作为样本空间。

设 {{< imath >}}C{{< /imath >}} 是一个固定的最小割，并且其大小为 {{< imath >}}k{{< /imath >}}，我们需要计算最终输出 {{< imath >}}C{{< /imath >}} 的概率。这需要我们执行的过程中，每一次都没有选到 {{< imath >}}C{{< /imath >}} 中的边。我们用 {{< imath >}}A_{k}{{< /imath >}} 来表示第 {{< imath >}}k{{< /imath >}} 次执行完缩边操作后，{{< imath >}}C{{< /imath >}} 中的任意一条边还没有被删掉的概率。

为了分析 {{< imath >}}\mathbb{P}(A_{k}){{< /imath >}}，同理上一个例子中的想法，我们定义 {{< imath >}}B_{k}{{< /imath >}} 为第 {{< imath >}}k{{< /imath >}} 次缩边选择的不是 {{< imath >}}C{{< /imath >}} 中的边这一事件，那么显然有 {{< imath >}}A_{k}=\bigcap_{i=1}^{k}B_{i}{{< /imath >}}，因此根据链式法则，我们有
{{< math >}}

\mathbb{P}(\text{output}=C) = \mathbb{P}(A_{n-2}) = \prod_{i=1}^{n-2}\mathbb{P}\left(B_{i}\bigg| \bigcap_{j=1}^{i-1}B_{j}\right)

{{< /math >}}
我们需要找出一个这个概率的下界。我们想要说明每一轮都有比较大的概率选不到 {{< imath >}}C{{< /imath >}} 中的边，由于选取是均匀的，所以只需要证明在第 {{< imath >}}i{{< /imath >}} 轮，已知前 {{< imath >}}i-1{{< /imath >}} 轮都没有选到 {{< imath >}}C{{< /imath >}} 中的边的情况下，图中剩下的边足够多即可。

一个重要的观察是，此时图中每个点的度数都不小于 {{< imath >}}k{{< /imath >}}。原因是由于缩边这种操作不会破坏割的性质，如果有点的度数小于 {{< imath >}}k{{< /imath >}}，在原图中直接取这些边就得到了一个小于 {{< imath >}}k{{< /imath >}} 的割。

有了这个观察，我们就知道在第 {{< imath >}}i-1{{< /imath >}} 轮，剩下 {{< imath >}}n-i+1{{< /imath >}} 个顶点时，至少还有 {{< imath >}}\frac{k}{2}\cdot(n-i+1){{< /imath >}} 条边，所以我们就有
{{< math >}}

\mathbb{P}\left( B_{i}\bigg|\bigcap_{j=1}^{i-1}B_{j} \right) \geq  1 - \dfrac{k}{\frac{k}{2} \cdot (n-i+1)} = \dfrac{n-i-1}{n-i+1}

{{< /math >}}
这说明
{{< math >}}

\mathbb{P}(A_{n-2}) \geq  \prod_{i=1}^{n-2} \dfrac{n-i-1}{n-i+1} = \dfrac{2}{n(n-1)}

{{< /math >}}
因此我们的算法至少有 {{< imath >}}\frac{2}{n(n-1)}{{< /imath >}} 的概率可以输出 {{< imath >}}C{{< /imath >}}。如果我们重复这个算法 {{< imath >}}N=50n(n-1){{< /imath >}} 次，并且输出这么多次中找到的最小的割，那么这个割是最小割的概率至少有
{{< math >}}

1-\left( 1- \dfrac{2}{n(n-1)} \right)^{N} \geq  1 - e^{ -100 }

{{< /math >}}
使用并查集来维护的话，复杂度大约为 {{< imath >}}O(n^{2}m){{< /imath >}}，不过这可以进一步改进成 {{< imath >}}O(n^{2}){{< /imath >}}。