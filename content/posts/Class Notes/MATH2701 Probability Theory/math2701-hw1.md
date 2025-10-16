---
tags:
- math
- probability-theory
- homework
discipline: mathematics
publish: true
date: '2025-10-02T21:06:00+08:00'
title: MATH2701 HW1
categories:
- course-note
---
[题目](https://notes.sjtu.edu.cn/s/gHhl2fhcm)
## Problem 1.1

设 {{< imath >}}\mathcal{F}{{< /imath >}} 是一个有限的 {{< imath >}}\sigma{{< /imath >}}-代数。定义其中“最小"的元素为其包含于 {{< imath >}}\mathcal{F}{{< /imath >}} 中的子集仅为自身和空集，形式化地描述，若 {{< imath >}}A\in \mathcal{F}{{< /imath >}} 为“最小”的元素，那么如果 {{< imath >}}B\in \mathcal{F}{{< /imath >}} 并且 {{< imath >}}B\subseteq A{{< /imath >}}，那么一定有 {{< imath >}}B\in \{ \emptyset,A \}{{< /imath >}}。

可以证明这样的元素存在并且有限：如果不存在，那么我们每次任取一个 {{< imath >}}\mathcal{F}{{< /imath >}} 中的元素，都能找到属于它的一个更小的元素，但 {{< imath >}}\mathcal{F}{{< /imath >}} 是有限集，所以这样的过程不可能一直重复下去，因此“最小”元素必然存在并且有限。

我们设所有这些不同的“最小”元素为 {{< imath >}}S=\{ A_{1},A_{2},\dots,A_{n} \}{{< /imath >}}。我们先证明这构成了全空间的一个分划：

首先这些元素肯定两两不相交，否则不满足“最小”的定义。假设 {{< imath >}}A_{i}\cap A_{j}= C\neq\emptyset{{< /imath >}}，根据“最小”，非空的 {{< imath >}}C{{< /imath >}} 是 {{< imath >}}A_{i}{{< /imath >}} 的子集，一定有 {{< imath >}}C=A_{i}{{< /imath >}}，同样也有 {{< imath >}}C=A_{j}{{< /imath >}}，这就推出了 {{< imath >}}A_{i}=A_{j}{{< /imath >}}，从而矛盾。

其次证明这些元素的并集为全空间。设全空间为 {{< imath >}}X{{< /imath >}}，并且 {{< imath >}}A=\bigcup_{i=1}^{n}A_{i}{{< /imath >}}，令 {{< imath >}}A^{c}=X\setminus A{{< /imath >}}。如果 {{< imath >}}A^{c}{{< /imath >}} 不是空集，我们肯定能找出一个“最小元素” {{< imath >}}A'\subseteq A^{c}{{< /imath >}}，这与我们取出了所有“最小”元素的前题矛盾。因此 {{< imath >}}X=A{{< /imath >}}，所有“最小”元素的并集为全空间。结合两两不相交的性质，我们就证明了这构成了全空间的一个分划。

下面证明 {{< imath >}}\mathcal{F}{{< /imath >}} 的大小为 {{< imath >}}2^{n}{{< /imath >}}。我们考虑 {{< imath >}}S{{< /imath >}} 的所有子集的集合 {{< imath >}}2^{S}{{< /imath >}}。根据 {{< imath >}}\sigma{{< /imath >}}-代数的性质，由于 {{< imath >}}S{{< /imath >}} 的任意一个子集都是若干个 {{< imath >}}\mathcal{F}{{< /imath >}} 中元素的并，因此必然也是 {{< imath >}}\mathcal{F}{{< /imath >}} 中的元素，于是 {{< imath >}}\mathcal{F}{{< /imath >}} 中至少有 {{< imath >}}2^{\left| S \right|}=2^{n}{{< /imath >}} 个元素。如果除此之外 {{< imath >}}\mathcal{F}{{< /imath >}} 中还有别的元素，根据上面的证明，这违反了 {{< imath >}}S{{< /imath >}} 为全空间的分划的条件，因此 {{< imath >}}\mathcal{F}{{< /imath >}} 的大小为 {{< imath >}}2^{n}{{< /imath >}}。

综上我们证明了有限 {{< imath >}}\sigma{{< /imath >}}-代数 {{< imath >}}\mathcal{F}{{< /imath >}} 的大小为 {{< imath >}}2^{n}{{< /imath >}}，并且能找到一个恰有 {{< imath >}}n{{< /imath >}} 个元素的全空间的分划。

## Problem 1.2

**(1)**

设每个人的生日为 {{< imath >}}b_{k}{{< /imath >}}，那么样本空间 {{< imath >}}\Omega=\{ (b_{1},b_{2},\dots,b_{n})| b_{k}\in[m]\text{ for }k\in[n]\}{{< /imath >}}。对于事件 {{< imath >}}A_{i,j}{{< /imath >}} 表示 {{< imath >}}i{{< /imath >}} 和 {{< imath >}}j{{< /imath >}} 在同一天，我们有
{{< math >}}

A_{i,j} = \{ (b_{1},b_{2},\dots,b_{n})\in\Omega : b_{i} = b_{j} \}

{{< /math >}}
因此 {{< imath >}}\left| A_{i,j} \right|=m\cdot m^{n-2}{{< /imath >}}，可以得到 {{< imath >}}\mathbb{P}(A_{i,j})= \frac{\left| A_{i,j} \right|}{\left| \Omega \right|}=\frac{1}{m}{{< /imath >}}。

要证明两两独立性，我们需要证明对于任意两个不同事件 {{< imath >}}A_{i,j},A_{k,l}{{< /imath >}}（其中 {{< imath >}}i< j,k< l{{< /imath >}} 并且 {{< imath >}}\{ i,j \}\neq \{ k,l \}{{< /imath >}}），需要有
{{< math >}}

\mathbb{P}(A_{i,j}\cap A_{k,l})=\mathbb{P}(A_{i,j})\cdot \mathbb{P}(A_{k,l}) = \dfrac{1}{m^{2}}

{{< /math >}}
下面我们计算 {{< imath >}}\left| A_{i,j}\cap A_{k,l} \right|{{< /imath >}}。分类讨论。

如果 {{< imath >}}\{ i,j \}\cap \{ k,l \}\neq \emptyset{{< /imath >}}，也就是两个事件共享某一个学生，此时确定三个人的生日相同，有
{{< math >}}

|A_{i,j}\cap A_{k,l}| = m\cdot m^{n-3} = m^{n-2}

{{< /math >}}
如果 {{< imath >}}\{ i,j \}\cap \{ k,l \}=\emptyset{{< /imath >}}，此时
{{< math >}}

\left| A_{i,j}\cap A_{k,l} \right| = m^{2}\cdot m^{n-4}=m^{n-2} 

{{< /math >}}
因此无论那种情况，都有
{{< math >}}

\mathbb{P}(A_{i,j}\cap A_{k,l})=\dfrac{\left| A_{i,j}\cap A_{k,l} \right| }{\left| \Omega \right| }= \dfrac{1}{m^{2}}

{{< /math >}}
因此
{{< math >}}

\mathbb{P}(A_{i,j}\cap A_{k,l})=\mathbb{P}(A_{i,j})\cdot \mathbb{P}(A_{k,l})

{{< /math >}}

于是证明了 {{< imath >}}A_{i,j}{{< /imath >}} 两两独立。

**(2)**

我们直接考虑 {{< imath >}}A_{1,2}, A_{2,3}, A_{1,3}{{< /imath >}} 三个事件。事件 {{< imath >}}A_{1,2}\cap A_{2,3}\cap A_{1,3}{{< /imath >}} 说明 {{< imath >}}1,2,3{{< /imath >}} 三个人的生日在同一天，因此
{{< math >}}

\mathbb{P}(A_{1,2}\cap A_{2,3}\cap A_{1,3}) = \dfrac{m\cdot m^{n-3}}{m^{n}} = \dfrac{1}{m^{2}}

{{< /math >}}
然而
{{< math >}}

\mathbb{P}(A_{1,2})\cdot \mathbb{P}(A_{2,3})\cdot \mathbb{P}(A_{1,3}) = \left( \dfrac{1}{m} \right)^{3} = \dfrac{1}{m^{3}} \neq \mathbb{P}(A_{1,2}\cap A_{2,3}\cap A_{1,3})

{{< /math >}}
这就说明了它们并不相互独立。

**(3)**

首先不妨令 {{< imath >}}n\leq m{{< /imath >}}，否则必然有两个人生日相同，肯定不是满足条件的 {{< imath >}}n{{< /imath >}} 的最小值。我们直接考虑班上任意两个人的生日都不相同，设为事件 {{< imath >}}B{{< /imath >}}，我们需要 {{< imath >}}\mathbb{P}(B)\leq \frac{1}{2}{{< /imath >}}。下面计算 {{< imath >}}B{{< /imath >}} 中含有的样本数量
{{< math >}}

\left| B \right| = m^{\underline{n}}

{{< /math >}}
因此
{{< math >}}

\mathbb{P}(B) = \dfrac{m^{\underline{n}}}{m^{n}} = \dfrac{30^{\underline{n}}}{30^{n}}

{{< /math >}}
使用计算机依次计算 {{< imath >}}n=3,4,\dots{{< /imath >}} 我们可以发现
{{< math >}}

\mathbb{P}(B)|_{n=6} \approx 0.59,\quad \mathbb{P}(B)|_{n=7} \approx 0.47 < \dfrac{1}{2}

{{< /math >}}
这就得到了 {{< imath >}}n_{\min}=7{{< /imath >}}。

## Problem 1.3

**(1)**
{{< math >}}

\begin{align*} \\
F \searrow E \implies & \mathbb{P}(E|F) = \dfrac{\mathbb{P}(EF)}{\mathbb{P}(F)} \leq  \mathbb{P}(E) \\
 \implies  & \mathbb{P}(EF) \leq  \mathbb{P}(E)\cdot \mathbb{P}(F) \\
\implies & \mathbb{P}(F|E) = \dfrac{\mathbb{P}(EF)}{\mathbb{P}(E)} \leq  \mathbb{P}(F)  \\
\implies & E \searrow F
\end{align*}

{{< /math >}}
**(2)**

不正确，直接令 {{< imath >}}F,G{{< /imath >}} 为发生概率不为 {{< imath >}}1{{< /imath >}} 的同一个事件，显然这不会违背条件，但是有
{{< math >}}

\mathbb{P}(G|F) = 1 \not\le \mathbb{P}(G)

{{< /math >}}

**(3)**

不正确。考虑集合 {{< imath >}}\Omega=\{ 1,2,3,4 \}{{< /imath >}}，每个样本点的概率均为 {{< imath >}}\frac{1}{4}{{< /imath >}}，我们令 {{< imath >}}E=\{ 1,2 \},F=\{ 1,3 \},G=\{ 1,4 \}{{< /imath >}}，这时
{{< math >}}

\mathbb{P}(E|F) = \dfrac{1}{2} \leq  \mathbb{P}(E) = \dfrac{1}{2}, \mathbb{P}(E|G) = \dfrac{1}{2}\leq  \mathbb{P}(E) = \dfrac{1}{2}

{{< /math >}}
但是
{{< math >}}

\mathbb{P}(E|(F\cap G)) = 1 \not\leq \mathbb{P}(E)

{{< /math >}}
## Problem 2

**(1)**

**Case 1**：如果 {{< imath >}}j\leq K{{< /imath >}}，那么必然不会被录用，此时 {{< imath >}}\mathbb{P}(A|B_{j})=0{{< /imath >}}。

**Case 2**：如果 {{< imath >}}j=K+1{{< /imath >}}，那么必然被录用，此时 {{< imath >}}\mathbb{P}(A|B_{j})=1{{< /imath >}}。

**Case 3**：如果 {{< imath >}}j>K+1{{< /imath >}}，这是如果想要被录用，必须要有前 {{< imath >}}j-1{{< /imath >}} 个面试者中表现最好的人出现在前 {{< imath >}}K{{< /imath >}} 轮面试，否则就会先于第 {{< imath >}}j{{< /imath >}} 个人被录用。由于出现在每个位置的概率都相等，因此此时 {{< imath >}}\mathbb{P}(A|B_{j})=\frac{K}{j-1}{{< /imath >}}。

综上，
{{< math >}}

\mathbb{P}(A|B_{j}) = \begin{cases}
0 & ,j\leq K \\
\dfrac{K}{j-1} & ,j >K
\end{cases}

{{< /math >}}
**(2)**

由于 {{< imath >}}P(B_{j})=\dfrac{1}{n}\,\text{for }j\in[n]{{< /imath >}}，因此根据全概率公式，有
{{< math >}}

\mathbb{P}(A) = \sum_{j=1}^{n} \mathbb{P}(A|B_{j})\cdot \mathbb{P}(B_{j}) = \dfrac{1}{n}\sum_{j=K+1}^{n} \dfrac{K}{j-1} = \dfrac{K}{n}\sum_{j=K}^{n-1} \dfrac{1}{j}

{{< /math >}}

**(3)**

根据提示，在 {{< imath >}}n,K{{< /imath >}} 足够大时
{{< math >}}

\mathbb{P}(A)\approx \dfrac{K}{n}\cdot \ln \dfrac{n}{K} \xlongequal{p= \frac{K}{n}}-p\ln p = \varphi(p)

{{< /math >}}
对 {{< imath >}}\varphi(p){{< /imath >}} 求极值，容易得到在 {{< imath >}}p= \frac{1}{e}{{< /imath >}} 时 {{< imath >}}\varphi(p)_{\max}= \frac{1}{e}{{< /imath >}}。

因此我们取 {{< imath >}}K\approx \dfrac{n}{e}{{< /imath >}}，可以得到
{{< math >}}

\mathbb{P}(A)\approx \dfrac{1}{e} \approx 0.368

{{< /math >}}
## Problem 3

**(1)**

由于 {{< imath >}}A_{i,\sigma_{i}}\in \{ 0,1 \}{{< /imath >}}，因此 {{< imath >}}\prod_{i=1}^{n}A_{i,\sigma(i)}=[\forall i\in[n],A_{i,\sigma(i)}=1]=[\sigma \in T_{n}]{{< /imath >}}。因此 {{< imath >}}\sum_{\sigma \in S}\prod_{i=1}^{n}A_{i,\sigma(i)}{{< /imath >}} 表示 {{< imath >}}T_{n}{{< /imath >}} 中的置换的数量。

如果一个映射 {{< imath >}}f\in T_{n}{{< /imath >}} 是完美匹配，必然有 {{< imath >}}f{{< /imath >}} 是 {{< imath >}}[n]{{< /imath >}} 的一个置换，否则无法让 {{< imath >}}V_{1},V_{2}{{< /imath >}} 中的点两两匹配（反证法易证）；并且如果 {{< imath >}}f\in T_{n}{{< /imath >}} 是 {{< imath >}}[n]{{< /imath >}} 的一个置换，带入定义，同样容易证明这是一个完美匹配。因此 {{< imath >}}f{{< /imath >}} 是一个完美匹配和 {{< imath >}}f{{< /imath >}} 是一个置换为充要条件。因此 {{< imath >}}M{{< /imath >}} 成立当且仅当 {{< imath >}}f{{< /imath >}} 为一个置换，于是 {{< imath >}}\left| M \right|=\sum_{\sigma \in S}\prod_{i=1}^{n}A_{i,\sigma(i)}{{< /imath >}}。这就有
{{< math >}}

\mathbb{P}(M) = \dfrac{\left| M \right| }{\left| T_{n} \right|} = \dfrac{\sum_{\sigma \in S}\prod_{i=1}^{n}A_{i,\sigma(i)}}{\left| T_{n} \right| }

{{< /math >}}
**(2)**

首先根据上一问的分析，事件 {{< imath >}}E_{\emptyset}=M{{< /imath >}}（映射的值域刚好是 {{< imath >}}[n]{{< /imath >}} 等价于这是一个置换）。因此事件 {{< imath >}}E_{\emptyset}{{< /imath >}} 的补集 {{< imath >}}E_{\emptyset}^{c}{{< /imath >}} 表示 {{< imath >}}f{{< /imath >}} 不是满射，值域为 {{< imath >}}\{ 1 \}{{< /imath >}} 或 {{< imath >}}\{ 2 \}{{< /imath >}}，两种可能分别表示元素 {{< imath >}}2{{< /imath >}} 或元素 {{< imath >}}2{{< /imath >}} 不在值域中，对应事件 {{< imath >}}E_{2}{{< /imath >}} 和 {{< imath >}}E_{1}{{< /imath >}}，于是 {{< imath >}}E_{\emptyset}^{c}=E_{1}\cup E_{2}{{< /imath >}}。

根据容斥原理
{{< math >}}

\mathbb{P}(E_{1}\cup E_{2}) = \mathbb{P}(E_{1}) + \mathbb{P}(E_{2}) - \mathbb{P}(E_{1}E_{2})

{{< /math >}}
于是
{{< math >}}

\mathbb{P}(E_{\emptyset}) = 1-\mathbb{P}(E_{1}\cup E_{2}) = 1-\mathbb{P}(E_{1})-\mathbb{P}(E_{2}) + \mathbb{P}(E_{1}E_{2})

{{< /math >}}
下面我们带入 {{< imath >}}E^{+}_{*}{{< /imath >}}：
- {{< imath >}}E_{\emptyset}^{+}=T_{n}\implies\mathbb{P}(E_{\emptyset}^{+})=1{{< /imath >}}。
- {{< imath >}}E_{\{ 1 \}}^{+} = \bigcap_{j\in \{ 1 \}}E_{j}=E_{1}\implies \mathbb{P}(E_{\{ 1 \}}^{+})=\mathbb{P}(E_{1}){{< /imath >}}。
- {{< imath >}}E_{\{ 2 \}}^{+} = \bigcap_{j\in \{ 2 \}}E_{j}=E_{1}\implies \mathbb{P}(E_{\{ 2 \}}^{+})=\mathbb{P}(E_{2}){{< /imath >}}。
- {{< imath >}}E_{\{ 1,2 \}}^{+} = \bigcap_{j\in \{ 1,2 \}}E_{j}=E_{1}E_{2}\implies \mathbb{P}(E_{\{ 1 \}}^{+})=\mathbb{P}(E_{1}E_{2}){{< /imath >}}。
得到
{{< math >}}

\mathbb{P}(E_{\emptyset}) = \mathbb{P}(E_{\emptyset}^{+}) - \mathbb{P}(E_{\{ 1 \}}^{+}) - \mathbb{P}(E_{\{ 2 \}}^{+})+\mathbb{P}(E_{\{ 1,2 \}}^{+})

{{< /math >}}
**(3)**

同理 {{< imath >}}(2){{< /imath >}}，我们有 {{< imath >}}E_{\emptyset}^{c}=\bigcup_{i=1}^{n}E_{i}{{< /imath >}}，根据容斥原理
{{< math >}}

\mathbb{P}\left( \bigcup_{i=1}^{n}E_{i} \right) = \sum_{r=1}^{n} (-1)^{r-1}\sum_{J\subseteq[n],|J|=r}\mathbb{P}\left( \bigcap_{j\in J}E_{j} \right)

{{< /math >}}

{{< imath >}}E_{j}{{< /imath >}} 表示映射的值域是 {{< imath >}}[n]\setminus\{ j \}{{< /imath >}} 的子集。{{< imath >}}\forall J\subseteq[n]{{< /imath >}}，我们有 {{< imath >}}[n]\setminus J=\bigcap_{j\in J}([n]\setminus \{ j \}){{< /imath >}}，于是
{{< math >}}

E_{J}^{+} = \bigcap_{j\in J}E_{j} \implies \mathbb{P}(E_{J}^{+}) = \mathbb{P}\left( \bigcap_{j\in J}E_{j} \right) 

{{< /math >}}
因此
{{< math >}}

\sum_{r=1}^{n} (-1)^{r-1}\sum_{J\subseteq[n],|J|=r}\mathbb{P}\left( \bigcap_{j\in J}E_{j} \right) = \sum_{r=1}^{n} (-1)^{r-1}\sum_{J\subseteq[n],|J|=r}\mathbb{P}\left( E_{J}^{+} \right)

{{< /math >}}
带入得到
{{< math >}}

\begin{align*}
\mathbb{P}(M)=\mathbb{P}(E_{\emptyset}) & = 1-\mathbb{P}(E_{\emptyset}^{+}) \\
 & = 1 - \sum_{r=1}^{n} (-1)^{r-1}\sum_{J\subseteq[n],|J|=r}\mathbb{P}\left( E_{J}^{+} \right) \\
 & = \mathbb{P}(E_{\emptyset}^{+})- \sum_{r=1}^{n} (-1)^{r-1}\sum_{J\subseteq[n],|J|=r}\mathbb{P}\left( E_{J}^{+} \right) \\
 & = \sum_{r=0}^{n} (-1)^{r}\sum_{J\subseteq[n],|J|=r}\mathbb{P}\left( E_{J}^{+} \right) \\
 & = \sum_{J\subseteq[n]}(-1)^{\left| J \right| }\mathbb{P}(E_{J}^{+})
\end{align*}

{{< /math >}}
**(4)**

要证明 {{< imath >}}\mathbb{P}(E_{J}^{+})=\left( \prod_{i=1}^{n}\left( \sum_{j\in [n]\setminus J} A_{i,j}\right) \right) / \left| T_{n} \right|{{< /imath >}}，我们只需要证明 {{< imath >}}\left| E_{J}^{+} \right|=\prod_{i=1}^{n}\left( \sum_{j\in [n]\setminus J} A_{i,j}\right){{< /imath >}}。

我们需要找出所有在 {{< imath >}}T_{n}{{< /imath >}} 中并且值域为 {{< imath >}}[n]\setminus J{{< /imath >}} 的映射的数量。对于每个 {{< imath >}}i{{< /imath >}}，可能的 {{< imath >}}f(i){{< /imath >}} 的数量为 {{< imath >}}\sum_{j\in [n]\setminus J}A_{i,j}{{< /imath >}}（映射到 {{< imath >}}[n]\setminus J{{< /imath >}} 并且图中存在对应的边）。根据乘法原理，由于每个 {{< imath >}}i{{< /imath >}} 相互独立，因此总的映射数量为
{{< math >}}

\left| E_{J}^{+} \right|=\prod_{i=1}^{n}\left( \sum_{j\in [n]\setminus J} A_{i,j}\right)

{{< /math >}}
于是
{{< math >}}

\mathbb{P}(E_{J}^{+}) = \dfrac{\left| E_{J}^{+} \right| }{\left| T_{n} \right| } = \dfrac{\prod_{i=1}^{n}\left( \sum_{j\in [n]\setminus J} A_{i,j}\right)}{\left| T_{n} \right| }

{{< /math >}}
直接带入 {{< imath >}}(3){{< /imath >}} 中得到的容斥原理公式，即可得到
{{< math >}}

\begin{align*}
\mathbb{P}(M) & = \sum_{J\subseteq[n]}(-1)^{\left| J \right| }\mathbb{P}(E_{J}^{+}) \\
 & = \sum_{J\subseteq[n]}(-1)^{\left| J \right| }\dfrac{\prod_{i=1}^{n}\left( \sum_{j\in [n]\setminus J} A_{i,j}\right)}{\left| T_{n} \right| } \\
 & = \dfrac{\sum_{J\subseteq[n]}(-1)^{\left| J \right| }\prod_{i=1}^{n}\left( \sum_{j\in [n]\setminus J} A_{i,j}\right)}{\left| T_{n} \right| }
\end{align*}

{{< /math >}}
## Problem 4

**(1)**

我们定义 {{< imath >}}A_{k}{{< /imath >}} 为执行完 {{< imath >}}k{{< /imath >}} 次缩边操作以后，最小割 {{< imath >}}C{{< /imath >}} 中任意一条边都还没有被删掉的概率，那么 {{< imath >}}p(G,t)=\mathbb{P}(A_{n-t}){{< /imath >}}。

为了分析 {{< imath >}}A_{k}{{< /imath >}}，我们定义事件 {{< imath >}}B_{k}{{< /imath >}} 为第 {{< imath >}}k{{< /imath >}} 次缩边选择的不是 {{< imath >}}C{{< /imath >}} 中的点，于是 {{< imath >}}A_{k}=\bigcap_{i=1}^{k}B_{i}{{< /imath >}}。因此根据链式法则，得到
{{< math >}}

p(G,t)=\mathbb{P}(A_{n-t}) = \prod_{i=1}^{n-t}\mathbb{P}\left( B_{i}\bigg|\bigcap_{j=1}^{i-1}B_{i} \right) 

{{< /math >}}
我们关心这个概率的下界，需要说明在前 {{< imath >}}i-1{{< /imath >}} 轮都没有选到 {{< imath >}}C{{< /imath >}} 中的边的情况下，第 {{< imath >}}i{{< /imath >}} 轮时图中剩下的边足够多。设最小割的大小为 {{< imath >}}k{{< /imath >}}，注意到此时图中每个点的度数都不小于 {{< imath >}}k{{< /imath >}}，否则直接取这些边就能得到一个更小的割。因此我们可以知道在第 {{< imath >}}i-1{{< /imath >}} 轮结束，剩下 {{< imath >}}n-i+1{{< /imath >}} 个节点时，图中至少有 {{< imath >}}\frac{k}{2}(n-i+1){{< /imath >}} 条边，这就可以得到
{{< math >}}

\mathbb{P}\left( B_{i}\bigg|\bigcap_{j=1}^{i-1}B_{j} \right) \geq  1 - \dfrac{k}{\frac{k}{2}\cdot(n-i+1)} = \dfrac{n-i-1}{n-i+1}

{{< /math >}}
带入即可得到
{{< math >}}

\begin{align*}
p(G,t) & \geq  \prod_{i=1}^{n-t}  \frac{n-i-1}{n-i+1} = \dfrac{t(t-1)}{n(n-1)} \\
 & = \dfrac{\left\lceil  \frac{n}{\sqrt{ 2 }}  \right\rceil \left\lceil  1 + \frac{n}{\sqrt{ 2 }}  \right\rceil }{n(n-1)} \\
 & \geq  \dfrac{\left\lceil  n + \sqrt{ 2 }  \right\rceil }{2(n-1)} > \dfrac{1}{2}
\end{align*}

{{< /math >}}
**(2)**

我们定义事件 {{< imath >}}A_{1},A_{2}{{< /imath >}} 分别表示把图缩到 {{< imath >}}G_{1},G_{2}{{< /imath >}} 后没有删掉 {{< imath >}}C{{< /imath >}} 中的边，事件 {{< imath >}}B_{1},B_{2}{{< /imath >}} 分别表示 `KS` 算法以 {{< imath >}}G_{1},G_{2}{{< /imath >}} 为输入，正确输出了最小割。

根据第一问，{{< imath >}}\mathbb{P}(A_{i})=p(G,t)> \frac{1}{2}{{< /imath >}}。根据题目条件，{{< imath >}}\mathbb{P}(B_{i})=p(t)> \frac{c}{\log t}{{< /imath >}}。由于事件 {{< imath >}}A_{i},B_{i}{{< /imath >}} 独立（两个算法互不干扰），因此我们对于一个图先执行 `contract` 算法再执行 `KS` 算法能正确输出最小割的概率为
{{< math >}}

\mathbb{P}(A_{i}\cap B_{i})=\mathbb{P}(A_{i})\cdot\mathbb{P}(B_{i}) >  \dfrac{1}{2}\cdot \dfrac{c}{\log t} \xlongequal{c' = c / 2} \dfrac{c'}{\log t}

{{< /math >}}
由于我们最后选择的是较小的边集，因此 {{< imath >}}\text{KS}(G_{1}),\text{KS}(G_{2}){{< /imath >}} 中只要有一个正确输出了最小割，我们就可以成功找到最小割，因此正确输出最小割的概率为
{{< math >}}

\begin{align*}
p_{\text{success}} & = 1- (1-\mathbb{P}(A_{1}\cap B_{1}))(1-\mathbb{P}(A_{2}\cap B_{2}))  \\
 & >  1-\left( 1-\dfrac{c'}{\log t} \right)^{2} \\
 & = \dfrac{2c'}{\log t} - \dfrac{(c')^{2}}{(\log t)^{2}}
\end{align*}

{{< /math >}}

（经询问 ai 关于 {{< imath >}}\Omega{{< /imath >}} 定义后作出）根据 {{< imath >}}\Omega{{< /imath >}} 记号的定义，{{< imath >}}f(n)=\Omega(g(n)){{< /imath >}} 说明存在正常数 {{< imath >}}k{{< /imath >}} 和 {{< imath >}}n_{0}{{< /imath >}} 使得当 {{< imath >}}n\geq n_{0}{{< /imath >}} 时，{{< imath >}}f(n)\geq k\cdot g(n){{< /imath >}}。

对于 {{< imath >}}p_{\text{succsee}}{{< /imath >}}，我们有（在 {{< imath >}}n>3{{< /imath >}} 时显然有 {{< imath >}}t< n{{< /imath >}}）
{{< math >}}

p_{\text{success}} > \dfrac{1}{\log t}\left( 2c' - \dfrac{(c')^{2}}{\log t} \right) > \dfrac{1}{\log n}\left( 2c' - \dfrac{(c')^{2}}{\log t} \right)

{{< /math >}}

当 {{< imath >}}n{{< /imath >}} 足够大时，我们显然可以使得 {{< imath >}}\log t>c'{{< /imath >}}，此时 {{< imath >}}2c'-(c')^{2}/(\log t)>c'{{< /imath >}}，于是
{{< math >}}

p_{\text{success}} > \dfrac{1}{\log n}\cdot c'

{{< /math >}}
根据定义，这就证明了 {{< imath >}}p_{\text{success}}=\Omega\left( \frac{1}{\log n} \right){{< /imath >}}。

**(3)**

根据 {{< imath >}}(2){{< /imath >}} 的提示，我们考虑递归调用 `contract` 算法。下面给出递归算法 {{< imath >}}f{{< /imath >}} 的描述：

1. 输入：无向图 {{< imath >}}G{{< /imath >}}，规模为 {{< imath >}}n{{< /imath >}}。
2. 若 {{< imath >}}n\leq n_{0}{{< /imath >}}（{{< imath >}}n_{0}{{< /imath >}} 为一个比较小的边界值），直接暴力求出最小割。
3. 否则令 {{< imath >}}t=\lceil 1+n / \sqrt{ 2 } \rceil{{< /imath >}}，独立分别执行两次 `contract` 算法：
	- {{< imath >}}G_{1}\leftarrow\text{contract}(G,t){{< /imath >}}；
	- {{< imath >}}G_{2}\leftarrow\text{contract}(G,t){{< /imath >}}。
4. 分别对 {{< imath >}}G_{1},G_{2}{{< /imath >}} 执行递归，返回 {{< imath >}}\min\{ f(G_{1}),f(G_{2}) \}{{< /imath >}}。

我们设 {{< imath >}}p(n){{< /imath >}} 为单次执行算法 {{< imath >}}f{{< /imath >}} 在规模为 {{< imath >}}n{{< /imath >}} 的图 {{< imath >}}G{{< /imath >}} 上能达到的正确率，那么我们有
{{< math >}}

p(n) > 1-\left( 1-\dfrac{1}{2}p(t) \right)^{2} = p(t) - \dfrac{1}{4}p^{2}(t),\quad t = \left\lceil  1+\dfrac{n}{\sqrt{ 2 }}  \right\rceil 

{{< /math >}}
由于我们只用考虑 {{< imath >}}n{{< /imath >}} 较大的情形，因此可以近似地认为 {{< imath >}}t=\frac{n}{\sqrt{ 2 }}{{< /imath >}}，于是
{{< math >}}

p(n) > p\left( \dfrac{n}{\sqrt{ 2 }} \right) - \dfrac{1}{4}p^{2}\left( \dfrac{n}{\sqrt{ 2 }} \right)

{{< /math >}}
为了分析这个递推式，我们设递归层数为 {{< imath >}}r=\left\lfloor \log_{\sqrt{ 2 }} \frac{n}{n_{0}}  \right\rfloor=\Theta(\log n){{< /imath >}}，如果当前递归层数为 {{< imath >}}r-k{{< /imath >}}，令概率为 {{< imath >}}q_{k}{{< /imath >}}，于是
{{< math >}}

q_{k+1} > q_{k} - \dfrac{1}{4}q_{k}^{2}

{{< /math >}}
对这个式子进一步化简
{{< math >}}

\begin{align*}
\dfrac{1}{q_{k+1}}  & < \dfrac{1}{q_{k}\left( 1-\frac{1}{4}q_{k} \right)} \\
 & = \dfrac{1}{q_{k}}\cdot \dfrac{1}{1-\frac{1}{4}q_{k}} \\
 & < \dfrac{1}{q_{k}} \left( 1 + \dfrac{1}{4}q_{k} \right) \\
 & = \dfrac{1}{q_{k}} + \dfrac{1}{4}
\end{align*}

{{< /math >}}
因此
{{< math >}}

\dfrac{1}{q_{k}} < \dfrac{1}{q_{0}} + \dfrac{k}{4} = 1 + \dfrac{k}{4} \implies q_{k} > \dfrac{1}{1 + k / 4} = \Omega\left( \dfrac{1}{k} \right)

{{< /math >}}
（实际上我们并不是从 {{< imath >}}q_{0}{{< /imath >}} 开始迭代，不过这并不影响我们计算下界，为了计算方便，直接从 {{< imath >}}q_{0}{{< /imath >}} 开始计算，并且认为 {{< imath >}}q_{0}=1{{< /imath >}}）

回到 {{< imath >}}p(n){{< /imath >}}，我们这就推出了
{{< math >}}

p(n) > \dfrac{4}{r+4} \implies p(n) = \Omega\left( \dfrac{1}{\log n} \right)

{{< /math >}}
所以重复算法 {{< imath >}}O(\log n){{< /imath >}} 次可以以比较高的概率得到正确答案。下面我们证明这个概率大于 {{< imath >}}\dfrac{2}{3}{{< /imath >}}。

设重复算法 {{< imath >}}\lceil \log_{2} n \rceil{{< /imath >}} 次，能得到最小割的概率为 {{< imath >}}p_{\text{success}}{{< /imath >}}，那么
{{< math >}}

p_{\text{success}} = 1 - (1 - p(n))^{\lceil \log_{2} n \rceil } > 1 - e^{ -p(n) \cdot \lceil \log_{2} n \rceil  }

{{< /math >}}

由于递归层数 {{< imath >}}r=\left\lfloor  2\log_{2} \dfrac{n}{n_{0}}  \right\rfloor{{< /imath >}}，对于足够大的 {{< imath >}}n{{< /imath >}}，我们可以忽略小常数 {{< imath >}}n_{0}{{< /imath >}}，因此 {{< imath >}}r\approx 2\log_{2}n{{< /imath >}}。于是
{{< math >}}

p(n) > \dfrac{4}{r+4} \approx \dfrac{2}{\log_{2}n + 2}

{{< /math >}}
带入得到
{{< math >}}

p_{\text{success}} > 1 - e^{ - \frac{2\log_{2} n}{\log_{2}n + 2} }

{{< /math >}}

我们要证明 {{< imath >}}p_{\text{success}}>\frac{2}{3}{{< /imath >}}，只需要证明 {{< imath >}}\exp\left( - \frac{2\log_{2}n}{\log_{2}n + 2} \right) < \frac{1}{3}{{< /imath >}}，即
{{< math >}}

\dfrac{2\log_{2}n}{\log_{2}n + 2} > \ln 3 \approx 1.1

{{< /math >}}
对于比较大的 {{< imath >}}n{{< /imath >}}，这是显然成立的。因此我们重复 {{< imath >}}\lceil \log_{2}n \rceil{{< /imath >}} 次这个算法能得到正确答案的概率大于 {{< imath >}}\dfrac{2}{3}{{< /imath >}}。

接着求出这个算法的复杂度。设 {{< imath >}}T(n){{< /imath >}} 表示规模为 {{< imath >}}n{{< /imath >}} 的图需要的运算次数，那么我们可以得到递推式
{{< math >}}

T(n) = 2T\left( \dfrac{n}{\sqrt{ 2 }} \right) + O(m)

{{< /math >}}
如果 {{< imath >}}m=\Theta(n^{2}){{< /imath >}}，是稠密图，那么根据主定理，{{< imath >}}T(n)=\Theta(n^{2}\log n){{< /imath >}}。

如果为稀疏图，递归项的是主导，复杂度为 {{< imath >}}T(n)=\Theta(n^{2}){{< /imath >}}。

综上，算法复杂度为 {{< imath >}}O(n^{2}\log ^{2}n)=\tilde{O}(n^{2}){{< /imath >}}。优于原来的算法。
