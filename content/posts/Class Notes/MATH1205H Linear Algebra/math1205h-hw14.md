---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-11-09T13:42:00+08:00'
title: MATH1205H HW14
categories:
- course-note
---
## Exercise 1

首先计算 {{< imath >}}A{{< /imath >}} 的特征值和特征向量。
{{< math >}}

\det(A-\lambda I) = (-1-\lambda)(-\lambda)-6 = 0 \implies \lambda^{2}+\lambda-6 = 0

{{< /math >}}
解得 {{< imath >}}\lambda_{1}=2,\lambda_{2}=-3{{< /imath >}}。

对于 {{< imath >}}\lambda_{1}=2{{< /imath >}}，我们求解 {{< imath >}}(A-2I)x=0{{< /imath >}}，特征向量为
{{< math >}}

x_{1} = k\begin{pmatrix}
1 \\ 1
\end{pmatrix}

{{< /math >}}
对于 {{< imath >}}\lambda_{2}=-3{{< /imath >}}，我们求解 {{< imath >}}(A+3I)x=0{{< /imath >}}，可以取特征向量为
{{< math >}}

x_{2} = k\begin{pmatrix}
3 \\ -2
\end{pmatrix}

{{< /math >}}

对于 {{< imath >}}A^{2}{{< /imath >}}，我们计算得到 {{< imath >}}\mu_{1}=4,\mu_{2}=9{{< /imath >}}。对于每个特征值，带入解出
{{< math >}}

x_{1} = k\begin{pmatrix}
1 \\ 1
\end{pmatrix},x_{2} = k\begin{pmatrix}
3 \\ -2
\end{pmatrix}

{{< /math >}}
## Exercise 2

根据定义，对于特征值 {{< imath >}}\lambda{{< /imath >}} 和特征向量 {{< imath >}}x_{0}{{< /imath >}}，我们有
{{< math >}}

Ax_{0}=\lambda x_{0}

{{< /math >}}
两边同时左乘 {{< imath >}}A{{< /imath >}}，得到
{{< math >}}

A^{2}x_{0} = A(\lambda x_{0}) = \lambda(Ax_{0}) = \lambda^{2}x_{0}

{{< /math >}}
从而说明 {{< imath >}}\lambda^{2}{{< /imath >}} 是 {{< imath >}}A^{2}{{< /imath >}} 的一个特征值，并且对应的特征向量还是 {{< imath >}}x_{0}{{< /imath >}}。

但是逆命题不一定成立。反例：考虑矩阵
{{< math >}}

A = \begin{pmatrix}
0 & 1 \\
0 & 0
\end{pmatrix}

{{< /math >}}
存在特征值 {{< imath >}}\lambda=0{{< /imath >}}，对应的特征向量为
{{< math >}}

x =k\begin{pmatrix}
1 \\ 0
\end{pmatrix}

{{< /math >}}
但是矩阵
{{< math >}}

A^{2} = \begin{pmatrix}
0 & 0 \\
0 & 0
\end{pmatrix}

{{< /math >}}
显然任何非零向量都是 {{< imath >}}A^{2}{{< /imath >}} 的特征向量。所以 {{< imath >}}A{{< /imath >}} 和 {{< imath >}}A^{2}{{< /imath >}} 的特征向量并不相等。

## Exercise 3

由于转置不改变一个矩阵的行列式，并且 {{< imath >}}(A-\lambda I)^{T}=A^{T}-\lambda I{{< /imath >}}，因此
{{< math >}}

\det(A-\lambda I) = \det(A^{T}-\lambda I)

{{< /math >}}
说明 {{< imath >}}A{{< /imath >}} 和 {{< imath >}}A^{T}{{< /imath >}} 的特征多项式完全相同，拥有一样的特征值。

但是特征向量则通常不相同。

## Exercise 4

首先证明 {{< imath >}}\lambda_{0}\neq 0{{< /imath >}}。如果 {{< imath >}}\lambda_{0} = 0{{< /imath >}}，那么 {{< imath >}}\det(A-0\cdot I)=\det A=0{{< /imath >}}，这与 {{< imath >}}A{{< /imath >}} 是可逆矩阵矛盾，说明 {{< imath >}}\lambda_{0}{{< /imath >}} 是非零特征值。

根据定义，我们有
{{< math >}}

Ax = \lambda_{0}x

{{< /math >}}
由于 {{< imath >}}A{{< /imath >}} 可逆，因此两侧同乘 {{< imath >}}A^{-1}{{< /imath >}}，得到
{{< math >}}

A^{-1}(Ax) = A^{-1}(\lambda_{0}x) \underset{\lambda_{0}\neq 0}{\implies} \dfrac{1}{\lambda_{0}}x = A^{-1}x

{{< /math >}}
从而得到 {{< imath >}}1 / \lambda_{0}{{< /imath >}} 是 {{< imath >}}A^{-1}{{< /imath >}} 的一个特征值，并且特征向量相同。

## Exercise 6

**加法**：设 {{< imath >}}u,v\in \mathbb{C}^{n}{{< /imath >}}，其中 {{< imath >}}u=(u_{1},u_{2},\dots,u_{n}),v=(v_{1},v_{2},\dots,v_{n}){{< /imath >}}，那么我们有
{{< math >}}

u+v=(u_{1}+v_{1},u_{2}+v_{2},\dots,u_{n}+v_{n})

{{< /math >}}
每个分量 {{< imath >}}u_{i}+c_{i}{{< /imath >}} 都是复数，从而 {{< imath >}}u+v\in \mathbb{C}^{n}{{< /imath >}}

**标量乘法**：{{< imath >}}cv=(cv_{1},cv_{2},\dots,cv_{n}){{< /imath >}}，每个分量 {{< imath >}}cv_{i}\in \mathbb{C}{{< /imath >}}，从而 {{< imath >}}cv\in \mathbb{C}^{n}{{< /imath >}}。

接着根据复数运算的性质，可以验证由于所有八个向量空间的公理都得到满足，因此 {{< imath >}}\mathbb{C}^n{{< /imath >}} 在通常的加法和数乘定义下是一个向量空间。

## Exercise 8

为了证明 {{< imath >}}\text{dim}(\mathbb{C}^n) = n{{< /imath >}}，我们需要找到一个由 {{< imath >}}n{{< /imath >}} 个向量组成的基。

考虑 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中的标准基向量集合 {{< imath >}}B = \{e_1, e_2, ..., e_n\}{{< /imath >}}，我们来证明它是一个基。

首先我们需要证明 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中的任意向量 {{< imath >}}v{{< /imath >}} 都可以表示为 {{< imath >}}B{{< /imath >}} 中向量的线性组合，也就是 {{< imath >}}B{{< /imath >}} 可以张成 {{< imath >}}\mathbb{C}^{n}{{< /imath >}}。设 {{< imath >}}v = (v_1, v_2, ..., v_n){{< /imath >}} 是 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中的任意一个向量，其中 {{< imath >}}v_i \in \mathbb{C}{{< /imath >}}。我们可以将 {{< imath >}}v{{< /imath >}} 写成
{{< math >}}

\begin{align*}
v & = (v_1, v_2, ..., v_n) \\
 & = v_1(1, 0, ..., 0) + v_2(0, 1, ..., 0) + ... + v_n(0, 0, ..., 1)  \\
 & = v_1e_1 + v_2e_2 + ... + v_ne_n 
\end{align*}

{{< /math >}}
由于标量 {{< imath >}}v_1, v_2, ..., v_n{{< /imath >}} 都是复数，这表明任意向量 {{< imath >}}v{{< /imath >}} 都可以表示为 {{< imath >}}B{{< /imath >}} 中向量的线性组合。因此，{{< imath >}}B{{< /imath >}} 张成 {{< imath >}}\mathbb{C}^n{{< /imath >}}。

接着我们证明 {{< imath >}}B{{< /imath >}} 中的向量线性无关。也就需要证明方程 {{< imath >}}c_1e_1 + c_2e_2 + ... + c_ne_n = 0{{< /imath >}}（其中 {{< imath >}}c_i \in \mathbb{C}{{< /imath >}}，{{< imath >}}0{{< /imath >}} 是零向量）的唯一解是 {{< imath >}}c_1=c_2=...=c_n=0{{< /imath >}}。这个方程可以写成
{{< math >}}

\begin{align*}
 & c_1(1, 0, ..., 0) + c_2(0, 1, ..., 0) + ... + c_n(0, 0, ..., 1) = (0, 0, ..., 0) \\
 & \implies (c_1, c_2, ..., c_n) = (0, 0, ..., 0) 
\end{align*}

{{< /math >}}
这直接意味着 {{< imath >}}c_1=0, c_2=0, ..., c_n=0{{< /imath >}}。因此，{{< imath >}}V{{< /imath >}} 中的向量是线性无关的。

因为集合 {{< imath >}}B{{< /imath >}} 既能张成 {{< imath >}}\mathbb{C}^n{{< /imath >}} 又是线性无关的，所以 {{< imath >}}B{{< /imath >}} 是 {{< imath >}}\mathbb{C}^n{{< /imath >}} 的一个基。由于其中包含 {{< imath >}}n{{< /imath >}} 个基向量，所以根据维数的定义，{{< imath >}}\text{dim}(\mathbb{C}^n) = n{{< /imath >}}。

## Exercise 9

要成为 {{< imath >}}\mathbb{C}^n{{< /imath >}} 的一个子空间，{{< imath >}}\mathbb{R}^n{{< /imath >}} 必须满足对向量加法封闭，并且对标量乘法封闭（其中标量来自域 {{< imath >}}\mathbb{C}{{< /imath >}}）。

对于第二个性质，我们需要检验对于任意 {{< imath >}}v \in \mathbb{R}^n{{< /imath >}} 和任意标量 {{< imath >}}c \in \mathbb{C}{{< /imath >}}，{{< imath >}}cv{{< /imath >}} 是否总是在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中。答案是否定的。我们只需举一个反例。

我们取一个非零向量 {{< imath >}}v \in \mathbb{R}^n{{< /imath >}}，例如 {{< imath >}}v = (1, 0, ..., 0){{< /imath >}}，显然 {{< imath >}}v \in \mathbb{R}^n{{< /imath >}}。我们再取 {{< imath >}}c = i{{< /imath >}}，那么
{{< math >}}

cv = i \cdot (1, 0, ..., 0) = (i \cdot 1, i \cdot 0, ..., i \cdot 0) = (i, 0, ..., 0)

{{< /math >}}
由于它的第一个分量 {{< imath >}}i{{< /imath >}} 不是一个实数，所以这个向量不属于 {{< imath >}}\mathbb{R}^n{{< /imath >}}。

所以由于 {{< imath >}}\mathbb{R}^n{{< /imath >}} 对与复数标量的乘法不是封闭的，它不满足子空间的定义，{{< imath >}}\mathbb{R}^n{{< /imath >}} 不是 {{< imath >}}\mathbb{C}^n{{< /imath >}} 的子空间。

## Exercise 10

({{< imath >}}\implies{{< /imath >}}) **假设 {{< imath >}}v_1, ..., v_m{{< /imath >}} 在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中线性无关，证明它们在 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中也线性无关。**

在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中线性无关意味着，对于方程
{{< math >}}
 c_1v_1 + c_2v_2 + ... + c_mv_m = 0 
{{< /math >}}
唯一的实数解是 {{< imath >}}c_1=c_2=...=c_m=0{{< /imath >}}。

现在，我们考虑在 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中的情况，即对于方程
{{< math >}}
 z_1v_1 + z_2v_2 + ... + z_mv_m = 0 
{{< /math >}}
其中 {{< imath >}}z_i \in \mathbb{C}{{< /imath >}} 是复数标量。

我们可以将每个复数 {{< imath >}}z_i{{< /imath >}} 写成实部和虚部的形式：{{< imath >}}z_i = a_i + i b_i{{< /imath >}}，其中 {{< imath >}}a_i, b_i \in \mathbb{R}{{< /imath >}}。代入方程中得到
{{< math >}}
 (a_1+ib_1)v_1 + (a_2+ib_2)v_2 + ... + (a_m+ib_m)v_m = 0 
{{< /math >}}
由于 {{< imath >}}v_i{{< /imath >}} 是实向量，我们可以将方程的实部和虚部分开
{{< math >}}
 (a_1v_1 + a_2v_2 + ... + a_mv_m) + i(b_1v_1 + b_2v_2 + ... + b_mv_m) = 0 
{{< /math >}}
一个复向量等于零向量，当且仅当它的实部向量和虚部向量都为零向量。因此我们得到两个独立的方程
{{< math >}}

\begin{cases}
a_1v_1 + a_2v_2 + ... + a_mv_m = 0 \\
b_1v_1 + b_2v_2 + ... + b_mv_m = 0
\end{cases}

{{< /math >}}
因为 {{< imath >}}v_1, ..., v_m{{< /imath >}} 在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中是线性无关的，且 {{< imath >}}a_i{{< /imath >}} 和 {{< imath >}}b_i{{< /imath >}} 都是实数，所以上述两个方程的唯一解是
{{< math >}}

a_1=a_2=...=a_m=0,\quad b_1=b_2=...=b_m=0

{{< /math >}}
这意味着 {{< imath >}}z_i = a_i + ib_i = 0{{< /imath >}} 对所有的 {{< imath >}}i{{< /imath >}} 都成立。

因此，复数方程的唯一解是 {{< imath >}}z_1=z_2=...=z_m=0{{< /imath >}}。这证明了 {{< imath >}}v_1, ..., v_m{{< /imath >}} 在 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中是线性无关的。

({{< imath >}}\impliedby{{< /imath >}}) **假设 {{< imath >}}v_1, ..., v_m{{< /imath >}} 在 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中线性无关，证明它们在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中也线性无关。**

在 {{< imath >}}\mathbb{C}^n{{< /imath >}} 中线性无关意味着，对于方程
{{< math >}}
 z_1v_1 + z_2v_2 + ... + z_mv_m = 0 
{{< /math >}}
唯一的复数解是 {{< imath >}}z_1=z_2=...=z_m=0{{< /imath >}}。

现在，我们考虑在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中的情况，即对于方程
{{< math >}}
 c_1v_1 + c_2v_2 + ... + c_mv_m = 0 
{{< /math >}}
其中 {{< imath >}}c_i \in \mathbb{R}{{< /imath >}} 是实数标量。

由于任何实数都是一个复数，这个方程可以看作是复数标量方程的一个特例，因此其唯一解也必然是所有标量都为零。因此 {{< imath >}}c_1=c_2=...=c_m=0{{< /imath >}}。这证明了 {{< imath >}}v_1, ..., v_m{{< /imath >}} 在 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中是线性无关的。

**推论**

我们接着证明在 {{< imath >}}\mathbb{R}{{< /imath >}} 和 {{< imath >}}\mathbb{C}{{< /imath >}} 上的秩是相同的。

设 {{< imath >}}A{{< /imath >}} 是一个 {{< imath >}}m \times n{{< /imath >}} 的实矩阵。它的列向量 {{< imath >}}v_1, ..., v_n{{< /imath >}} 都是 {{< imath >}}\mathbb{R}^m{{< /imath >}} 中的向量。

- {{< imath >}}A{{< /imath >}} 在域 {{< imath >}}\mathbb{R}{{< /imath >}} 上的秩，{{< imath >}}\text{rank}_{\mathbb{R}}(A){{< /imath >}}，是这组列向量在 {{< imath >}}\mathbb{R}^m{{< /imath >}} 中（使用实数标量）的最大线性无关子集的数量。
* {{< imath >}}A{{< /imath >}} 在域 {{< imath >}}\mathbb{C}{{< /imath >}} 上的秩，{{< imath >}}\text{rank}_{\mathbb{C}}(A){{< /imath >}}，是这组列向量在 {{< imath >}}\mathbb{C}^m{{< /imath >}} 中（使用复数标量）的最大线性无关子集的数量。

根据我们刚刚的证明，一个实向量的集合在 {{< imath >}}\mathbb{R}{{< /imath >}} 上是线性无关的，当且仅当它在 {{< imath >}}\mathbb{C}{{< /imath >}} 上是线性无关的。这意味着，如果我们从 {{< imath >}}A{{< /imath >}} 的列向量中选取一个子集，这个子集在 {{< imath >}}\mathbb{R}{{< /imath >}} 上是线性无关的，那么它在 {{< imath >}}\mathbb{C}{{< /imath >}} 上也一定是线性无关的，反之亦然。

因此，能够选出的最大线性无关子集的大小，无论我们是在 {{< imath >}}\mathbb{R}{{< /imath >}} 上还是在 {{< imath >}}\mathbb{C}{{< /imath >}} 上考虑，都是完全相同的。所以{{< imath >}}\text{rank}_{\mathbb{R}}(A) = \text{rank}_{\mathbb{C}}(A){{< /imath >}}。

