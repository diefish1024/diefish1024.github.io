---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-11-15T15:11:00+08:00'
title: MATH1205H HW16
categories:
- course-note
---
## Exercise 1

设 {{< imath >}}A{{< /imath >}} 是一个 {{< imath >}}n\times n{{< /imath >}} 的矩阵，记 {{< imath >}}A{{< /imath >}} 的不同特征值为 {{< imath >}}\lambda_{1},\lambda_{2},\dots,\lambda_{k}{{< /imath >}}，代数重数分别为 {{< imath >}}a_{i}{{< /imath >}}，几何重数为 {{< imath >}}g_{i}=\text{dim ker}(A-\lambda_{i}I){{< /imath >}}。

**(⇒)** 若 {{< imath >}}A{{< /imath >}} 可对角化，则存在可逆矩阵 {{< imath >}}P{{< /imath >}} 使得 {{< imath >}}P^{-1}AP=D{{< /imath >}} 为对角阵。由于
{{< math >}}

\begin{align*}
\det(A - \lambda I) & = \det(P^{-1}DP-\lambda I) \\
 & = \det(P^{-1}(D-\lambda I)P) \\
 & = \det(D-\lambda I)
\end{align*}

{{< /math >}}
说 {{< imath >}}A{{< /imath >}} 和 {{< imath >}}D{{< /imath >}} 的特征多项式相同，从而有一样的特征值和代数重数。

由于 {{< imath >}}A{{< /imath >}} 可对角化，这意味着存在 {{< imath >}}n{{< /imath >}} 个线性无关的特征向量构成的基 {{< imath >}}B=\{ v_{1},v_{2},\dots,v_{n} \}{{< /imath >}} 构成了矩阵 {{< imath >}}P{{< /imath >}} 的列空间，每个特征向量都属于某个特征值 {{< imath >}}\lambda{{< /imath >}} 的特征空间 {{< imath >}}E_{\lambda}{{< /imath >}}，并且该特征值的几何重数 {{< imath >}}g_{\lambda}=\text{dim }E_{\lambda}{{< /imath >}}。由于 {{< imath >}}B{{< /imath >}} 是一个 {{< imath >}}n{{< /imath >}} 维线性空间，因此这些特征向量构成了一个 {{< imath >}}n{{< /imath >}} 维线性空间的一个基，于是
{{< math >}}

\sum_{i=1}^{k} g_{i}=n

{{< /math >}}
我们又知道任何特征值的几何重数总是小于等于代数重数，也就是 {{< imath >}}g_{k}\leq a_{k}{{< /imath >}}，但是我们又有
{{< math >}}

\sum_{i=1}^{k} a_{i}=n

{{< /math >}}
这就得到了 {{< imath >}}a_{i}=g_{i}{{< /imath >}}，每个特征值的代数重数等于几何重数。

**(⇐)** 反过来，若对每个 {{< imath >}}i{{< /imath >}} 有 {{< imath >}}g_i=a_i{{< /imath >}}。注意代数重数之和等于矩阵阶数：
{{< math >}}

\sum_{i=1}^k a_i = n

{{< /math >}}
由假设得 {{< imath >}}\sum_{i=1}^k g_i=\sum_{i=1}^k a_i=n{{< /imath >}}。而不同特征值对应的特征向量属于不同的特征子空间，这些特征子空间两两交为 {{< imath >}}{0}{{< /imath >}}，所以可以从每个特征子空间中取一组基向量，合并得到 {{< imath >}}n{{< /imath >}} 个线性无关的特征向量，从而构成 {{< imath >}}\mathbb{C}^n{{< /imath >}} 的基。于是存在由特征向量构成的可逆矩阵 {{< imath >}}P{{< /imath >}}，使得 {{< imath >}}P^{-1}AP{{< /imath >}} 为对角矩阵——即 {{< imath >}}A{{< /imath >}} 可对角化。

综上，{{< imath >}}A{{< /imath >}} 可对角化当且仅当对每个特征值 {{< imath >}}\lambda{{< /imath >}}，代数重数等于几何重数。

## Exercise 2

首先根据特征值的性质，我们得到方差
{{< math >}}

\lambda^{2}=\lambda

{{< /math >}}
其中 {{< imath >}}\lambda{{< /imath >}} 是 {{< imath >}}A{{< /imath >}} 的特征值。因此我们得到 {{< imath >}}\lambda=0,1{{< /imath >}}。从而证明了特征值只可能是 {{< imath >}}0{{< /imath >}} 或 {{< imath >}}1{{< /imath >}}。

**(1)**

我们构造 {{< imath >}}A{{< /imath >}} 为所有元素全为 {{< imath >}}0{{< /imath >}} 的矩阵，显然满足 {{< imath >}}A^{2}=A{{< /imath >}} 并且 {{< imath >}}A{{< /imath >}} 的特征值均为 {{< imath >}}0{{< /imath >}}。

**(2)**

我们构造 {{< imath >}}A=I{{< /imath >}}，显然满足 {{< imath >}}A^{2}=A=I{{< /imath >}}，并且 {{< imath >}}A{{< /imath >}} 的特征值均为 {{< imath >}}1{{< /imath >}}。

**(3)**

我们构造
{{< math >}}

A = \begin{pmatrix}
I_{n} & \mathbf{0} \\
\mathbf{0} & \mathbf{0}
\end{pmatrix}

{{< /math >}}
此时有
{{< math >}}

A^{2} = \begin{pmatrix}
I_{n}+\mathbf{0} & \mathbf{0} \\
\mathbf{0} & \mathbf{0}
\end{pmatrix} = A

{{< /math >}}
并且 {{< imath >}}A{{< /imath >}} 的特征值为 {{< imath >}}0{{< /imath >}} 和 {{< imath >}}1{{< /imath >}}。

## Exercise 3

我们首先计算 {{< imath >}}A{{< /imath >}} 的特征值
{{< math >}}

\det(A-\lambda I) = \begin{vmatrix}
-3-\lambda & 2 \\
-2 & 2-\lambda
\end{vmatrix} = \lambda^{2}+\lambda-2 = 0

{{< /math >}}
解得 {{< imath >}}\lambda = 1,-2{{< /imath >}}。

分别计算 {{< imath >}}\lambda_{1}=1,\lambda_{2}=-2{{< /imath >}} 时的特征值
{{< math >}}

(A-\lambda_{1}I)v_{1} = 0,(A-\lambda_{2}I)v_{2} = 0

{{< /math >}}
得到
{{< math >}}

v_{1} = \begin{pmatrix}
2 \\ 1
\end{pmatrix},\quad v_{2} = \begin{pmatrix}
1 \\ 2
\end{pmatrix}

{{< /math >}}
从而有
{{< math >}}

P = \begin{pmatrix}
2 & 1 \\
1 & 2
\end{pmatrix},\quad P^{-1}AP = \begin{pmatrix}
1 &  \\
 & -2
\end{pmatrix}

{{< /math >}}
## Exercise 4

我们将 {{< imath >}}A{{< /imath >}} 对角化即可。

首先计算 {{< imath >}}A{{< /imath >}} 的特征值，有
{{< math >}}

\det(A-\lambda I) = \begin{vmatrix}
1-\lambda & 2 & 2 \\
2 & 1-\lambda & 2 \\
2 & 2 & 1-\lambda
\end{vmatrix} = -(\lambda+1)^{2}(\lambda-5)

{{< /math >}}
分别计算 {{< imath >}}\lambda_{1}=-1,\lambda_{2}=5{{< /imath >}} 时的特征向量。

当 {{< imath >}}\lambda=-1{{< /imath >}}，我们计算
{{< math >}}

(A+I)v = 0

{{< /math >}}
得到
{{< math >}}

v_{1} = \begin{pmatrix}
-1 \\ 1 \\ 0
\end{pmatrix},\quad v_{2} = \begin{pmatrix}
-1 \\ 0 \\ 1
\end{pmatrix}

{{< /math >}}
当 {{< imath >}}\lambda=5{{< /imath >}}，计算
{{< math >}}

(A-5I)v = 0

{{< /math >}}
得到
{{< math >}}

v_{3} = \begin{pmatrix}
1 \\ 1 \\ 1
\end{pmatrix}

{{< /math >}}
从而我们取
{{< math >}}

P = \begin{pmatrix}
-1 & -1 & 1 \\
1 & 0 & 1 \\
0 & 1 & 1
\end{pmatrix} \implies P^{-1}AP = D = \begin{pmatrix}
-1 &  &  \\
 & -1 &  \\
 &  & 5
\end{pmatrix}

{{< /math >}}
就有
{{< math >}}

A = PDP^{-1} \implies A^{100} = PD^{100}P^{-1}

{{< /math >}}
计算得到
{{< math >}}

\begin{align*}
A^{100} & = \begin{pmatrix}
-1 & -1 & 1 \\
1 & 0 & 1 \\
0 & 1 & 1
\end{pmatrix}\begin{pmatrix}
1 &  &  \\
 & 1 &  \\
 &  & 5^{100}
\end{pmatrix} \dfrac{1}{3} \begin{pmatrix}
-1 & 2 & -1 \\
-1 & -1 & 2 \\
1 & 1 & 1
\end{pmatrix} \\
 & = \dfrac{1}{3} \begin{pmatrix}
2+5^{100} & -1+5^{100} & -1+5^{100} \\
-1+5^{100} & 2+5^{100} & -1+5^{100} \\
-1+5^{100} & -1+5^{100} & 2+5^{100}
\end{pmatrix}
\end{align*}

{{< /math >}}
## Exercise 5

**(1)**

根据系数可以直接得到
{{< math >}}

S = \begin{pmatrix}
2 & -2 & 3 \\
-2 & -1 & 0 \\
3 & 0 & 3
\end{pmatrix}

{{< /math >}}
由于
{{< math >}}

\det \begin{pmatrix}
2 & -2 \\
-2 & -1
\end{pmatrix} < 0

{{< /math >}}
我们知道 {{< imath >}}S{{< /imath >}} 不是正定的。

**(2)**

根据系数得到
{{< math >}}

S = \begin{pmatrix}
2 & 1 & 1 \\
1 & 2 & -1 \\
1 & -1 & 2
\end{pmatrix}

{{< /math >}}
由于
{{< math >}}

x^{T}Sx \geq  0

{{< /math >}}
根据定义，我们知道 {{< imath >}}S{{< /imath >}} 是正定的。