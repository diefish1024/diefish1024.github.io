---
tags:
- learning
- math
discipline: mathematics
publish: true
date: '2025-09-17T09:45:00+08:00'
title: Combinatorics HW1
categories:
- course-note
---
## Problem 1

**(1)**

求
{{< math >}}

\sum_{k=0}^{n} \binom{ 2n }{ 2k } 

{{< /math >}}

**解**


{{< math >}}

\begin{align}
 & \sum_{k=0}^{n} (-1)^{k}\binom{ n }{ k } = 0 \\
\implies & \sum_{k=0}^{2n} (-1)^{k}\binom{ 2n }{ k } =0 \\
\implies & \sum_{k=0}^{2n} \binom{ 2n }{ 2k } = \sum_{k=1}^{2n} \binom{ 2n }{ 2k - 1 } 
\end{align}

{{< /math >}}
同时由于
{{< math >}}

\sum_{k=0}^{2n} \binom{ 2n }{ 2k } + \sum_{k=1}^{2n} \binom{ 2n }{ 2k - 1 } = \sum_{k=0}^{2n} \binom{ 2n }{ k } = 2^{2n}

{{< /math >}}
得到
{{< math >}}

\sum_{k=0}^{2n} \binom{ 2n }{ 2k } = 2^{2n-1}

{{< /math >}}

**(2)**

求
{{< math >}}

\sum_{k=0}^{3n} \binom{ 3n }{ 3k } 

{{< /math >}}

**解**

同理 (1) 的解法，设 {{< imath >}}z{{< /imath >}} 为一个三次单位根，那么根据二项式定理有
{{< math >}}

\sum_{k=0}^{n} z^{k}\binom{ n }{ k } = (1 + z)^{n}

{{< /math >}}
那么设 {{< imath >}}\sum_{k=0}^{3n}\binom{ 3n }{ 3k }=A,\,\sum_{k=0}^{3n-1}\binom{ 3n }{ 3k+1 }=B,\,\sum_{k=0}^{3n-1}\binom{ 3n }{ 3k+2 }=C{{< /imath >}}，就能得到
{{< math >}}

A + z\cdot B + z^{2}\cdot C = (1 + z)^{3n}

{{< /math >}}

设 {{< imath >}}\omega=e^{ \frac{2\pi i}{3} }{{< /imath >}} ，则有 {{< imath >}}1+\omega+\omega^{2}=0,\omega^{3}=1{{< /imath >}}. 分别令 {{< imath >}}z \in \{ 1,\omega,\omega^{2} \}{{< /imath >}} 带入上式，得到
{{< math >}}

\begin{cases}
A + B + C  & = (1+1)^{3n} \\
A + \omega B + \omega^{2}C  & = (1+\omega)^{3n} \\
A + \omega^{2}B + \omega C &  = (1 + \omega^{2})^{3n}
\end{cases}

{{< /math >}}
将三式相加并利用 {{< imath >}}1+\omega+\omega^{2}=0{{< /imath >}} 的性质，移项即可得到
{{< math >}}

A = \dfrac{2^{3n} + (1+\omega)^{3n} + (1+\omega^{2})^{3n}}{3}

{{< /math >}}
带入 {{< imath >}}\omega=-\dfrac{1}{2}+\dfrac{\sqrt{ 3 }}{2}\cdot i{{< /imath >}} 得到 {{< imath >}}1+\omega=e^{ \frac{\pi i}{3} },1+\omega^{2}=e^{ - \frac{\pi i}{3} }{{< /imath >}} ，带入上式并化简可得
{{< math >}}

\sum_{k=0}^{n} \binom{ 3n }{ 3k } = \dfrac{2^{3n} + 2(-1)^{n}}{3}

{{< /math >}}

## Problem 2

**(1)**
{{< math >}}

\binom{ n }{ m } \binom{ m }{ k } = \binom{ n }{ k } \binom{ n-k }{ m-k } 

{{< /math >}}
**证 1**

考虑左右两边组合意义：

{{< imath >}}\binom{ n }{ m }\binom{ m }{ k }{{< /imath >}} 可以表示在 {{< imath >}}n{{< /imath >}} 个人中先选出 {{< imath >}}m{{< /imath >}} 个人，再在这 {{< imath >}}m{{< /imath >}} 个人中选出 {{< imath >}}k{{< /imath >}} 个人的概率，本质上是把 {{< imath >}}n{{< /imath >}} 个人分成了 {{< imath >}}3{{< /imath >}} 类，每类分别有 {{< imath >}}n-m,\,m-k,\,k{{< /imath >}} 个人。

{{< imath >}}\binom{ n }{ k }\binom{ n-k }{ m-k }{{< /imath >}} 可以看成在 {{< imath >}}n{{< /imath >}} 个人里面选出 {{< imath >}}k{{< /imath >}} 个人，再在剩下 {{< imath >}}n-k{{< /imath >}} 个人中选出 {{< imath >}}m-k{{< /imath >}} 个人，同样也可以看成是分成了分别有 {{< imath >}}n-m,\,m-k,\,k{{< /imath >}} 个人的三类。

因此左右表示同一个组合意义，值必然相同。

**证 2**
{{< math >}}

\binom{ n }{ m } \binom{ m }{ k } = \dfrac{n^{\underline{m}}}{m!}\cdot \dfrac{m^{\underline{k}}}{k!} = \dfrac{n^{\underline{k}}}{k!}\cdot \dfrac{n^{\underline{m}}}{n^{\underline{k}}}\cdot \dfrac{m^{\underline{k}}}{m!} = \dfrac{n^{\underline{k}}}{k!}\cdot \dfrac{(n-k)^{\underline{m-k}}}{(m-k)!} = \binom{ n }{ k } \binom{ n-k }{ m-k } 

{{< /math >}}

**(2)**
{{< math >}}

\sum_{k=0}^{r} \binom{ n+k }{ k } = \binom{ n+r+1 }{ r } 

{{< /math >}}
**证 1**

考虑组合意义。

右式变形为 {{< imath >}}\binom{ n+r+1 }{ n+1 }{{< /imath >}} 可以表示为在 {{< imath >}}n+r+1{{< /imath >}} 个人中选出 {{< imath >}}n+1{{< /imath >}} 个人的方案数。

左侧变形为 {{< imath >}}\sum \binom{ n+k }{ n }{{< /imath >}} 可以看成枚举要选的最后一个人是第 {{< imath >}}n+k+1{{< /imath >}} 个人，在前 {{< imath >}}n+k{{< /imath >}} 个人中选择 {{< imath >}}n{{< /imath >}} 个人，所有情况的和恰好也是在 {{< imath >}}n+r+1{{< /imath >}} 个人中选出 {{< imath >}}n+1{{< /imath >}} 个人的方案数。

因此左右两次可以表达同一个组合意义，值相同。

**证 2**

考虑等式
{{< math >}}

\binom{ n+k }{ k } + \binom{ n+k }{ k-1 } = \binom{ n+k+1 }{ k } 

{{< /math >}}
移项得到
{{< math >}}

\binom{ n+k }{ k } = \binom{ n+k+1 }{ k } - \binom{ n+k }{ k-1 } 

{{< /math >}}
在求和可得
{{< math >}}

\sum_{k=0}^{r} \binom{ n+k }{ k } = \sum_{k=0}^{r} \left[ \binom{ n+k+1 }{ k } - \binom{ n+k }{ k-1 }  \right] = \binom{ n+r+1 }{ r } - \binom{ n }{ -1 } 

{{< /math >}}
认为 {{< imath >}}\binom{ n }{ k }{{< /imath >}} 在 {{< imath >}}k>n{{< /imath >}} 或者 {{< imath >}}k<0{{< /imath >}} 时 {{< imath >}}\binom{ n }{ k }=0{{< /imath >}} ，则可得到
{{< math >}}

\sum_{k=0}^{r} \binom{ n+k }{ k } = \binom{ n+r+1 }{ r } 

{{< /math >}}

**(3)**
{{< math >}}

\sum_{k=0}^{n} \binom{ n }{ k } ^{2}k = n\binom{ 2n-1 }{ n-1 } 

{{< /math >}}
**证 1**

考虑组合意义，同样以在班级中选人举例。

由于 {{< imath >}}2\binom{ 2n-1 }{ n-1 }=\binom{ 2n }{ n }{{< /imath >}}，右侧变形为 {{< imath >}}\frac{n}{2}\binom{ 2n }{ n }{{< /imath >}} ，可以表示在 {{< imath >}}2n{{< /imath >}} 个人（男女各一半）的班级中选出 {{< imath >}}n{{< /imath >}} 个人当班委，再在这 {{< imath >}}n{{< /imath >}} 个人中选出一个男生当班长的方案数。

左侧变成 {{< imath >}}\sum_{k=0}^{n}\binom{ n }{ k }\binom{ n }{ n-k }k{{< /imath >}} ，对于每个 {{< imath >}}k{{< /imath >}} 表示 {{< imath >}}n{{< /imath >}} 个男生 {{< imath >}}n{{< /imath >}} 个女生的班级中，男生选出 {{< imath >}}k{{< /imath >}} 个人，女生选出 {{< imath >}}n-k{{< /imath >}} 个人，共 {{< imath >}}n{{< /imath >}} 个人当班委，再从 {{< imath >}}k{{< /imath >}} 个男生班委中选出一个人当班长的方案数。把所有 {{< imath >}}k{{< /imath >}} 的情况合起来，同样可以得到在男女各半的 {{< imath >}}2n{{< /imath >}} 个人中选出 {{< imath >}}n{{< /imath >}} 个班委和一个男生班长的方案数。

因此左右两式可以表达同一个组合意义，值相同。

**证 2**

将恒等式
{{< math >}}

k\binom{ n }{ k } = n\binom{ n-1 }{ k-1 } = n\binom{ n-1 }{ n-k } 

{{< /math >}}
带入左式，左右两侧消去 {{< imath >}}n{{< /imath >}} 后，只需证
{{< math >}}

\sum_{k=0}^{n} \binom{ n }{ k } \binom{ n-1 }{ n-k } = \binom{ 2n-1 }{ n-1 } 

{{< /math >}}
根据 Vandermonde 卷积
{{< math >}}

\sum_{k=0}^{n} \binom{ n }{ k } \binom{ n-1 }{ n-k } = \binom{ n + n - 1 }{ n } = \binom{ 2n-1 }{ n } 

{{< /math >}}
因此原式得证！

**(4)**
{{< math >}}

\sum_{i=0}^{a} \binom{ a }{ i } \binom{ b+i }{ a } = \sum_{i=0}^{a} \binom{ a }{ i } \binom{ b }{ i } 2^{i}

{{< /math >}}
**证 1**

从组合意义证明，同样以班级选班委举例。考虑一个班级有 {{< imath >}}a{{< /imath >}} 个班委和 {{< imath >}}b{{< /imath >}} 个非班委，现进行班委换届。

左式对于每个 {{< imath >}}i{{< /imath >}} ，{{< imath >}}\binom{ a }{ i }\binom{ b+i }{ a }{{< /imath >}} 表示 {{< imath >}}a{{< /imath >}} 个班委中有 {{< imath >}}i{{< /imath >}} 个人有意愿再参与下一届的班委选举，在 {{< imath >}}b+i{{< /imath >}} 个人中选举产生新的 {{< imath >}}a{{< /imath >}} 个班委。每种情况加起来，表示 {{< imath >}}a{{< /imath >}} 个原班委自由选择是否参加选举的前提下班委换届的所有方案数。

右式对于每个 {{< imath >}}i{{< /imath >}} ，将 {{< imath >}}\binom{ a }{ i }{{< /imath >}} 变换为 {{< imath >}}\binom{ a }{ a-i }{{< /imath >}} ，{{< imath >}}\binom{ a }{ a-i }\binom{ b }{ i }{{< /imath >}} 表示新一届班委中有 {{< imath >}}i{{< /imath >}} 个来自原先 {{< imath >}}b{{< /imath >}} 个非班委的方案数，{{< imath >}}2^{i}{{< /imath >}} 表示剩下没选上、未知竞选意愿的 {{< imath >}}i{{< /imath >}} 个原班委所有竞选意愿的可能。将每种情况加起来，也同样可以得到 {{< imath >}}a{{< /imath >}} 个原班委自由选择是否参选的前提下班委换届的方案数。

因此左右两式可以表示相同的组合意义，值相同。

**证 2**

根据 Vandermonde 卷积
{{< math >}}

\binom{ b+i }{ a } = \sum_{j=0}^{i} \binom{ i }{ j } \binom{ b }{ a-j } 

{{< /math >}}
带入左式得到
{{< math >}}

\begin{align}
\sum_{i=0}^{a} \binom{ a }{ i } \binom{ b+i }{ a } & = \sum_{i=0}^{a} \sum_{j=0}^{i} \binom{ b }{ a-j } \binom{ a }{ i } \binom{ i }{ j } \\
 & = \sum_{i=0}^{a} \sum_{j=0}^{i} \binom{ b }{ a-j } \binom{ a }{ j } \binom{ a-j }{ i-j }  \\
 & = \sum_{j=0}^{a} \binom{ b }{ a-j } \binom{ a }{ j } \sum_{i=j}^{a} \binom{ a-j }{ i-j }  \\
 & = \sum_{j=0}^{a} \binom{ b }{ a-j } \binom{ a }{ a-j } 2^{a-j} \\
 & \xlongequal{i=a-j} \sum_{i=0}^{a} \binom{ b }{ i } \binom{ a }{ i } 2^{i}
\end{align}

{{< /math >}}

## Problem 3

给定集合 {{< imath >}}A=\{1,2,\ldots,n\}{{< /imath >}} 与正整数 {{< imath >}}k{{< /imath >}}，从 {{< imath >}}A{{< /imath >}} 中选出一组按三角阵排列的 {{< imath >}}\binom{k+1}{2}{{< /imath >}} 个子集
{{< math >}}

\begin{matrix}
S_{1,1} \\
S_{2,1} & S_{2,2} \\
\vdots & \vdots & \ddots \\
S_{k,1} & S_{k,2} & \dots & S_{k,k}
\end{matrix}

{{< /math >}}
满足每个集合是它左边和上方的集合（如果存在）的子集。需要求出满足这个要求的选择方案数。

**解**

由于每个元素相互独立，具体方案和元素无关，因此可以考虑一个元素的合法出现方式（在哪些集合会包含这个元素）的总数，设为 {{< imath >}}f(k){{< /imath >}} ，那么最后答案即为 {{< imath >}}[f(k)]^{n}{{< /imath >}} 。

现在考虑 {{< imath >}}x\in A{{< /imath >}} ，根据包含关系，不难看出如果 {{< imath >}}x\in S{{< /imath >}} ，那么 {{< imath >}}S{{< /imath >}} 左侧和上方（如果存在）必有一个集合包含 {{< imath >}}x{{< /imath >}}。因此出现 {{< imath >}}x{{< /imath >}} 的集合在 {{< imath >}}k{{< /imath >}} 阶三角形中可以形成一个从 {{< imath >}}(1,1){{< /imath >}} 出发，每次可以向右或者下方通行的有向图。

考虑某个合法方案，设元素最后一次出现在对角线（{{< imath >}}S_{1,1},\dots,S_{k,k}{{< /imath >}}）的位置为 {{< imath >}}S_{r,r}{{< /imath >}} ，那么根据包含关系，此时显然 {{< imath >}}x{{< /imath >}} 包含于上方的 {{< imath >}}r{{< /imath >}} 阶小三角阵中的每一个元素，并且不会出现在下方的 {{< imath >}}k-r{{< /imath >}} 阶小三角方阵中（否则必然会再次出现在对角线中）。因此只需要考虑 {{< imath >}}x{{< /imath >}} 在余下部分，也就是四个顶点分别为为 {{< imath >}}(r+1,1),(r+1,r),(k,1),(k,r){{< /imath >}} 的长方形区域中的合法方案数即可。

对于这样的长方形区域，我们可以按行考虑，显然根据包含的规则， {{< imath >}}x{{< /imath >}} 在每一行出现的形式必定是从最左侧开始连续的一段，并且上到下每一行 {{< imath >}}x{{< /imath >}} 出现的次数是不降的。因此我们可以把这个问题转化为求一个长度为 {{< imath >}}k-r{{< /imath >}} ，每个数范围为 {{< imath >}}0\sim r{{< /imath >}} 的单调不降序列的方案数。设第 {{< imath >}}i{{< /imath >}} 个数的值为 {{< imath >}}t_{i}{{< /imath >}} ，那么方案数为
{{< math >}}

\begin{align}
\sum_{t_{1}=0}^{r} \sum_{t_{2}=0}^{t_{1}} \dots \sum_{t_{k-r}=0}^{t_{k-r-1}} 1 & = \sum_{t_{1}=0}^{r} \dots \sum_{t_{k-r-1}=0}^{t_{k-r-2}} (t_{k-r-1} + 1) \\
 & = \sum_{t_{1}=0}^{r} \dots \sum_{t_{k-r-1}=0}^{t_{k-r-2}} \binom{ t_{k-r-1} + 1 }{ 1 } \\
 & = \sum_{t_{1}=0}^{r} \dots \sum_{t_{k-r-2}=1}^{t_{k-r-3}} \binom{ t_{k-r-2}+2 }{ 2 }  \\
 & \dots \\
 & = \sum_{t_{1}=0}^{r} \binom{ t_{1} + k-r-1 }{ k-r-1 } = \binom{ k }{ k-r } 
 \end{align}

{{< /math >}}
因此
{{< math >}}

f(k) = \sum_{r=0}^{k} \binom{ k }{ k-r } = \sum_{r=0}^{k} \binom{ k }{ r } = 2^{k}

{{< /math >}}
所以方案数为
{{< math >}}

[f(k)]^{n} = 2^{nk}

{{< /math >}}

## Problem 4

给定一个长度为 {{< imath >}}mn+1{{< /imath >}} 的序列 {{< imath >}}a_{0},a_{1},\ldots,a_{mn}{{< /imath >}}，其中每一项只可能取 {{< imath >}}1{{< /imath >}} 或 {{< imath >}}1-m{{< /imath >}}，并且满足总和
{{< math >}}

\sum_{i=0}^{mn} a_i = 1 .

{{< /math >}}
在此条件下：

**(1)**

证明：在该序列里，取值为 {{< imath >}}1{{< /imath >}} 的项共有 {{< imath >}}mn-n+1{{< /imath >}} 个，而取值为 {{< imath >}}1-m{{< /imath >}} 的项共有 {{< imath >}}n{{< /imath >}} 个。

**证**

设 {{< imath >}}1{{< /imath >}} 有 {{< imath >}}a{{< /imath >}} 个，{{< imath >}}1-m{{< /imath >}} 有 {{< imath >}}b{{< /imath >}} 个，那么得到方程
{{< math >}}

\begin{cases}
a + b = mn+1 \\
a + (1-m)b = 1
\end{cases}

{{< /math >}}
直接可以解得
{{< math >}}

\begin{cases}
a = mn-n+1 \\
b=n
\end{cases}

{{< /math >}}

**(2)**

把序列首尾相接排成一个圆环。考虑所有可能的“起点”选择（即对序列做循环移位）。

证明：恰好存在唯一一个起点 {{< imath >}}k{{< /imath >}}，使得从该位置开始依次相加得到的所有部分和都为正，即
{{< math >}}

a_k,\ a_k+a_{k+1},\ \ldots,\ a_k+a_{k+1}+\cdots+a_{k-1}

{{< /math >}}
全部大于 {{< imath >}}0{{< /imath >}}（下标按模 {{< imath >}}mn+1{{< /imath >}} 计算）。

**证**

考虑序列前缀和 {{< imath >}}S_{t} = \sum_{i=0}^{t}a_{i}{{< /imath >}} ，并且 {{< imath >}}S_{-1}=0{{< /imath >}}。在序列 {{< imath >}}\{ S_{-1},S_{0},\dots,S_{mn} \}{{< /imath >}} 中存在最小值，不妨设为 {{< imath >}}S_{k}{{< /imath >}}。

先证明最小值 {{< imath >}}S_{k}{{< /imath >}} 唯一，假设序列中还存在 {{< imath >}}S_{k'}=S_{k}{{< /imath >}} ，不妨设 {{< imath >}}k'>k{{< /imath >}} ，那么 {{< imath >}}k\sim k'-1{{< /imath >}} 的子段和为零，由于这一段的元素非零，因此必然存在从 {{< imath >}}k{{< /imath >}} 开始或者在 {{< imath >}}k'{{< /imath >}} 结束的一段数的和小于零（否则可以证明这一段数之和必然为正），假设 {{< imath >}}\sum_{k\leq i\leq t}a_{i}<0{{< /imath >}} ，于是 {{< imath >}}S_{t}<S_{k}{{< /imath >}} ，与 {{< imath >}}S_{k}{{< /imath >}} 为最小值矛盾，因此最小值唯一！

于是 {{< imath >}}\forall r\in \{ k+1,\dots,mn \}{{< /imath >}} ，有 {{< imath >}}S_{r}>S_{k}{{< /imath >}} ，因此从 {{< imath >}}k+1{{< /imath >}} 到 {{< imath >}}r{{< /imath >}} 的子段和为 {{< imath >}}\sum_{i=k+1}^{r}a_{i}=S_{r}-S_{k}>0{{< /imath >}}

并且 {{< imath >}}\forall l\in \{ 0,\dots,k \}: S_{l-1}<S_{k}{{< /imath >}} ，因此从 {{< imath >}}k+1{{< /imath >}} 开始的一段循环序列中的和为（考虑在原序列中这一段的补集）：
{{< math >}}

\sum_{i=k+1}^{mn+1+l}a_{i}=\sum_{i=0}^{mn}a_{i} - \sum_{i=l}^{k}a_{i}=1-(S_{k}-S_{l-1}) = 1+S_{l-1}-S_{k}>0

{{< /math >}}

综上，我们找出了唯一满足从该位置开始左右的部分和都为正的一个位置，证毕。

**(3)**

求满足“所有前缀部分和都为正”的序列 {{< imath >}}a_{0},a_{1},\ldots,a_{mn}{{< /imath >}} 的总数。

**证**

首先必然有 {{< imath >}}a_{0}=1{{< /imath >}} ，否则 {{< imath >}}a_{0}=1-m<0{{< /imath >}} 已经不满足条件。因此可以在原序列去掉 {{< imath >}}a_{0}{{< /imath >}}，问题的约束转化为 {{< imath >}}\sum_{i=1}^{mn}a_{i}=0{{< /imath >}} ，保证从 {{< imath >}}a_{1}{{< /imath >}} 开始的前缀和非负即可。

将问题转化为在一个二维网格上路径计数的模型：从起点 {{< imath >}}S:(0,0){{< /imath >}} 出发，每一步会向上走 {{< imath >}}1{{< /imath >}} 格或者向右走 {{< imath >}}1{{< /imath >}} 格，目标走到 {{< imath >}}D:(n,n(m-1)){{< /imath >}}，其中前缀和非负的约束转化为不能越过直线 {{< imath >}}l:y=(m-1)x{{< /imath >}} 。

对于一个不合法的路径，考虑其第一次越过 {{< imath >}}l{{< /imath >}} 时的交点 {{< imath >}}(t,(m-1)t){{< /imath >}} ，之后必然向右走经过 {{< imath >}}P:(t+1,(m-1)t){{< /imath >}} ，因此一条路径不合法，当且仅当它碰到了直线 {{< imath >}}l':y=(m-1)(x-1){{< /imath >}}。同理 Catalan 数的证明方法，我们考虑一个广义的“反射”方式来构造出一个 {{< imath >}}PD{{< /imath >}} 段到无约束路径的双射。

将向上走记为 {{< imath >}}U{{< /imath >}} 操作，向右走记为 {{< imath >}}R{{< /imath >}} 操作，显然最终每个 {{< imath >}}R{{< /imath >}} 操作都会对应 {{< imath >}}m-1{{< /imath >}} 个 {{< imath >}}U{{< /imath >}} 操作。从 {{< imath >}}P{{< /imath >}} 到 {{< imath >}}D{{< /imath >}} 还需要经过 {{< imath >}}(n-t-1){{< /imath >}} 个 {{< imath >}}R{{< /imath >}} 操作和 {{< imath >}}(m-1)(n-t){{< /imath >}} 个 {{< imath >}}U{{< /imath >}} 操作，我们将 {{< imath >}}(m-1){{< /imath >}} 个 {{< imath >}}U{{< /imath >}} 操作替换为一个 {{< imath >}}R{{< /imath >}} 操作，将一个 {{< imath >}}R{{< /imath >}} 操作替换为 {{< imath >}}(m-1){{< /imath >}} 个 {{< imath >}}U{{< /imath >}} 操作，即可将 {{< imath >}}\vec{PD}=(n-t-1,(m-1)(n-t)){{< /imath >}} 替换为 {{< imath >}}\vec{PR'}=(n-t,(m-1)(n-t-1)){{< /imath >}} ，得到一个新的目标 {{< imath >}}D':(n+1,(m-1)(n-1)){{< /imath >}}。此时可以发现，每一条从 {{< imath >}}S{{< /imath >}} 到 {{< imath >}}D{{< /imath >}} 的非法路径，都变成了一条从 {{< imath >}}S{{< /imath >}} 到 {{< imath >}}D'{{< /imath >}} 的路径。

由于从 {{< imath >}}S{{< /imath >}} 到 {{< imath >}}D'{{< /imath >}} 必然要穿过直线 {{< imath >}}l'{{< /imath >}} ，因此每一条这样的路径都对应一条 {{< imath >}}S{{< /imath >}} 到 {{< imath >}}D{{< /imath >}} 的非法路径。这样我们就构造了一个非法路径的双射。因此合法的路径总数，也就是合法序列总数为
{{< math >}}

\binom{ mn }{ n } - \binom{ mn-m+2 }{ n+1 } 

{{< /math >}}
带入 {{< imath >}}m=2{{< /imath >}} ，发现答案为
{{< math >}}

\binom{ 2n }{ n } -\binom{ 2n }{ n+1 } =C_{n}

{{< /math >}}
确实为卡特兰数。