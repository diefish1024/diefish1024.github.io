---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-12-19T15:48:00+08:00'
title: MATH1205H HW23
categories:
- course-note
---
## Exercise 1

不唯一。只有奇异值 {{< imath >}}\Sigma{{< /imath >}} 是唯一的，而 {{< imath >}}U,V{{< /imath >}} 通常不唯一。首先我们改变 {{< imath >}}U,V{{< /imath >}} 中对应列的符号不会产生影响；其次相同的奇异值对应的奇异向量可以在保持正交的情况下任意变换，也不会对 SVD 分解产生影响；并且如果存在零奇异值，也可以任意选择。

## Exercise 2

我们需要证明对于所有 {{< imath >}}k\in \{ r+1,\dots, m\}{{< /imath >}} 满足 {{< imath >}}AA^{T}u_{k}=\mathbf{0}{{< /imath >}}。

首先根据正交矩阵，因此对于任意 {{< imath >}}j\in [r]{{< /imath >}} 和 {{< imath >}}k\in \{ r+1,\dots,m \}{{< /imath >}}，有 {{< imath >}}u_{j}^{T}u_{k}=0{{< /imath >}}。我们考虑 {{< imath >}}A{{< /imath >}} 的列空间，显然 {{< imath >}}\{ u_{j} \}_{j=1}^{r}{{< /imath >}} 是 {{< imath >}}AA^{T}{{< /imath >}} 的非零特征值对应的特征向量，构成了 {{< imath >}}\text{Col}(A){{< /imath >}} 的一组正交基，从而 {{< imath >}}\{ u_{k} \}_{k=r+1}^{m}{{< /imath >}} 属于 {{< imath >}}\text{Col}(A){{< /imath >}} 的正交补空间，也就属于 {{< imath >}}A^{T}{{< /imath >}} 的零空间，因此
{{< math >}}

A^{T}u_{k} = \mathbf{0},\quad k=r+1,\dots,m

{{< /math >}}
带入就有 {{< imath >}}AA^{T}u_{k}=\mathbf{0}{{< /imath >}}，证毕。

## Exercise 3

由于一般情况下的 SVD 分解满足 {{< imath >}}Av_{j}=\sigma_{j}u_{j}{{< /imath >}}，因此和题设对比，得到 {{< imath >}}\sigma_{j}=1{{< /imath >}}。从而 {{< imath >}}\Sigma=I{{< /imath >}}。带入就得到了
{{< math >}}

A = UV^{T}

{{< /math >}}
验证有
{{< math >}}

Av_{j}=(UV^{T})v_{j}=U(V^{T}v_{j})=Ue_{j} = u_{j}

{{< /math >}}
## Exercise 4

设 {{< imath >}}v_1, \dots, v_n{{< /imath >}} 是 {{< imath >}}A^TA{{< /imath >}} 的特征向量，它们构成 {{< imath >}}\mathbb{R}^n{{< /imath >}} 的一组标准正交基。 任意向量 {{< imath >}}x{{< /imath >}} 可以表示为 {{< imath >}}x = c_1 v_1 + \dots + c_n v_n{{< /imath >}}。 那么 {{< imath >}}||x||^2 = \sum_{i=1}^n c_i^2{{< /imath >}}。

那么根据 SVD 的性质，有
{{< math >}}

\begin{align*}
Ax & =\sum_{i=1}^{n}  c_i A v_i \\
 & = \sum_{i=1}^{n} c_{i}\sigma_{i}u_{i} \\
\implies \| Ax \| ^{2} & = \sum_{i=1}^{n} c_{i}^{2}\sigma_{i}^{2}
\end{align*}

{{< /math >}}
带入就有
{{< math >}}

\dfrac{\| Ax \| ^{2}}{\| x \| ^{2}} = \dfrac{\sum_{i=1}^{n} c_{i}^{2}\sigma_{i}^{2}}{\sum_{i=1}^{n} c_{i}^{2}} \leq  \sigma_{1}^{2}\cdot \dfrac{\sum_{i=1}^{n} c_{i}^{2}}{\sum_{i=1}^{n} c_{i}^{2}} = \sigma_{1}^{2}

{{< /math >}}
并且当 {{< imath >}}x=v_{1}{{< /imath >}} 时就有
{{< math >}}

\dfrac{\| Av_{1} \| }{\| v_{1} \| } = \dfrac{\| \sigma_{1} v_{1} \| }{1} = \sigma_{1}

{{< /math >}}
所以最大值可以取到 {{< imath >}}\sigma_{1}{{< /imath >}}，从而 {{< imath >}}\| A \|=\sigma_{1}{{< /imath >}}，得证。

## Exercise 5

**(1)**

根据定义，对于任意 {{< imath >}}x{{< /imath >}}，有
{{< math >}}

\| Mx \|  \leq  \| M \| \cdot \| x \| 

{{< /math >}}
因此对于任意 {{< imath >}}x \in \mathbb{R}^{n}{{< /imath >}}，有
{{< math >}}

\begin{align*}
\| (A+B)x \|  & = \| Ax+Bx \|  \\
 & \leq  \| Ax \| + \| Bx \|  \\
 & \leq  (\| A \| +\| B \| )\cdot \| x \| 
\end{align*}

{{< /math >}}
这等价于
{{< math >}}

\dfrac{\| (A+B)x \| }{\| x \| } \leq  \| A \| + \| B \| 

{{< /math >}}
从而
{{< math >}}

\| A+B \| = \max_{x \in \mathbb{R}^{n}} \dfrac{\| (A+B)x \| }{\| x \| } \leq  \| A \| + \| B \| 

{{< /math >}}
**(2)**

因此对于任意 {{< imath >}}x \in \mathbb{R}^{n}{{< /imath >}}，有
{{< math >}}

\begin{align*}
\| ABx \|  & = \| A(Bx) \|  \\
 & \leq  \| A \| \cdot \| Bx \|  \quad (y=Bx \in \mathbb{R}^{n}) \\
 & \leq  \| A \| \cdot \| B \| \cdot \| x \| 
\end{align*}

{{< /math >}}
这等价于
{{< math >}}

\dfrac{\| ABx \| }{\| x \| } \leq  \| A \| \cdot \| B \| 

{{< /math >}}
从而
{{< math >}}

\| AB \| = \max_{x \in \mathbb{R}^{n}} \dfrac{\| ABx \| }{\| x \| } \leq  \| A \| \cdot \| B \| 

{{< /math >}}