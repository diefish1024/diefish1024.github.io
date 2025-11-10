---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-11-07T20:56:00+08:00'
title: MATH1205H HW13
categories:
- course-note
---
## Exercise 1

**证**

我们有 {{< imath >}}\det(A^{T})=\det(-A){{< /imath >}}，同时又有 {{< imath >}}\det(A^{T})=\det A{{< /imath >}} 以及 {{< imath >}}\det(-A)=(-1)^{n}\det A{{< /imath >}}。

如果 {{< imath >}}n{{< /imath >}} 是奇数，那么 {{< imath >}}(-1)^{n}=-1{{< /imath >}}，从而得到 {{< imath >}}\det A=-\det A\implies \det A=0{{< /imath >}}。如果 {{< imath >}}n{{< /imath >}} 是偶数，则无法说明，这个结论必然成立。

## Exercise 2

**解**

我们直接展开计算，就可以得到
{{< math >}}

\begin{align*}
\det & = \begin{vmatrix}
b & b^{2} \\
c & c^{2}
\end{vmatrix} - a\begin{vmatrix}
1 & b^{2} \\
1 & c^{2}
\end{vmatrix} + a^{2}\begin{vmatrix}
1 & b \\
1 & c
\end{vmatrix} \\
 & = (bc^{2}-b^{2}c) - a(c^{2}-b^{2}) + a^{2}(c-b) \\
 & = (b-a)(c-a)(c-b)
\end{align*}

{{< /math >}}
## Exercise 3

设矩阵 {{< imath >}}A{{< /imath >}} 为
{{< math >}}

A = \begin{pmatrix}
1 & 1 & \dots & 1 \\
1 & 1 & \dots & 1 \\
\vdots & \vdots & \ddots & \vdots \\
1 & 1 & \dots & 1
\end{pmatrix}

{{< /math >}}

首先矩阵 {{< imath >}}A{{< /imath >}} 是一个全为 {{< imath >}}1{{< /imath >}} 的矩阵，其行列式为 {{< imath >}}0{{< /imath >}}。

我们记所有的奇置换的集合为 {{< imath >}}S_{1}{{< /imath >}}，所有偶置换的集合为 {{< imath >}}S_{0}{{< /imath >}}。带入行列式的定义，由于所有元素都是 {{< imath >}}1{{< /imath >}}，因此我们可以得到
{{< math >}}

\det A = \sum_{\sigma \in S_{0}}1 - \sum_{\sigma \in S_{1}}1 = \left| S_{0} \right| -\left| S_{1} \right| = 0

{{< /math >}}
从而证明了奇偶置换的数量相同。

## Exercise 4

**(1)**

首先计算 {{< imath >}}\det A = -2{{< /imath >}}。接着计算 {{< imath >}}\text{adj}(A){{< /imath >}}，根据定义，我们有
{{< math >}}

\text{adj}(A) = \begin{bmatrix}
4 & -2 \\
-3 & 1
\end{bmatrix}

{{< /math >}}
从而
{{< math >}}

A^{-1} = \dfrac{1}{\det A}\text{adj}(A) = \begin{bmatrix}
-2 & 1 \\
\dfrac{3}{2} & - \dfrac{1}{2}
\end{bmatrix}

{{< /math >}}
**(2)**

行列式 {{< imath >}}\det A=13{{< /imath >}}。

伴随矩阵
{{< math >}}

\text{adj}(A) = \begin{bmatrix}
-2 & 17 \\
-3 & 19
\end{bmatrix}

{{< /math >}}
从而得到
{{< math >}}

A^{-1} = \begin{bmatrix}
-\dfrac{2}{13} & \dfrac{17}{13} \\
-\dfrac{3}{13} & \dfrac{19}{13}
\end{bmatrix}

{{< /math >}}
**(3)**

行列式 {{< imath >}}\det A=5{{< /imath >}}.

伴随矩阵
{{< math >}}

\text{adj}(A) = \begin{bmatrix}
5 & 0 \\
-3 & 1
\end{bmatrix}

{{< /math >}}
从而
{{< math >}}

A^{-1} = \begin{bmatrix}
1 & 0 \\
-\dfrac{3}{5} & \dfrac{1}{5}
\end{bmatrix}

{{< /math >}}
**(4)**

行列式 {{< imath >}}\det A=-1-2=-3{{< /imath >}}。

伴随矩阵
{{< math >}}

\text{adj}(A) = \begin{bmatrix}
-1 & -1 & 2 \\
-2 & 1 & -2 \\
2 & -1 & -1
\end{bmatrix}

{{< /math >}}
从而
{{< math >}}

A^{-1} = \begin{bmatrix}
\dfrac{1}{3}  & \dfrac{1}{3} & -\dfrac{2}{3} \\
\dfrac{2}{3} & -\dfrac{1}{3} & \dfrac{2}{3} \\
-\dfrac{2}{3} & \dfrac{1}{3} & \dfrac{1}{3}
\end{bmatrix}

{{< /math >}}
## Exercise 5

根据行列式的定义，我们得到
{{< math >}}

\det(A-\lambda I) = \sum_{\sigma \in\text{Perm}(n)}\text{sgn}(\sigma)\prod_{i=1}^{n} (a_{i,\sigma(i)}-\lambda[i=\sigma(i)])

{{< /math >}}
从而得到这是一个最高次项为 {{< imath >}}\lambda^{n}{{< /imath >}}，最高次项系数为 {{< imath >}}(-1)^{n}{{< /imath >}} 的关于 {{< imath >}}\lambda{{< /imath >}} 的多项式。

## Exercise 6

**(1)**

如果 {{< imath >}}A{{< /imath >}} 满秩，那么有 {{< imath >}}\det A\neq 0{{< /imath >}}。如果存在特征值 {{< imath >}}\lambda=0{{< /imath >}}，说明存在非零向量 {{< imath >}}x{{< /imath >}} 满足 {{< imath >}}Ax=0{{< /imath >}}，与 {{< imath >}}A{{< /imath >}} 满秩矛盾。

**(2)**

取
{{< math >}}

A = \begin{bmatrix}
1 & 1 \\
0 & 1
\end{bmatrix}

{{< /math >}}
此时 {{< imath >}}A{{< /imath >}} 满秩但是不可对角化。