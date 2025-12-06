---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-11-28T09:13:00+08:00'
title: MATH1205H HW17
categories:
- course-note
---
## Exercise 1

设 {{< imath >}}A{{< /imath >}} 的特征多项式为 {{< imath >}}P(\lambda) = \det(A-\lambda I){{< /imath >}}。由于特征值 {{< imath >}}\lambda_{1},\lambda_{2},\dots,\lambda_{n}{{< /imath >}} 是 {{< imath >}}P(\lambda){{< /imath >}} 的根，因此
{{< math >}}

P(\lambda) = (-1)^{n}(\lambda-\lambda_{1})(\lambda-\lambda_{2})\dots(\lambda-\lambda_{n})

{{< /math >}}
我们首先证明 {{< imath >}}\prod_{i=1}^{n}\lambda_{i}=\det(A){{< /imath >}}。首先直接带入
{{< math >}}

P(0)=\det(A-0\cdot I)=\det A

{{< /math >}}
又有
{{< math >}}

P(0) = (-1)^{n}(0-\lambda_{1})(0-\lambda_{2})\dots(0-\lambda_{n})=\prod_{i=1}^{n} \lambda_{i}

{{< /math >}}
这样就得到了 {{< imath >}}\prod_{i=1}^{n}\lambda_{i}=\det(A){{< /imath >}}。

接着证明 {{< imath >}}\sum_{i=1}^{n}\lambda_{i}=\mathrm{trace}(A){{< /imath >}}。展开 {{< imath >}}P(\lambda){{< /imath >}} 考察 {{< imath >}}\lambda^{n-1}{{< /imath >}} 的系数，为
{{< math >}}

(-1)^{n}\cdot \sum_{i=1}^{n} (-\lambda_{i}) = (-1)^{n+1}\sum_{i=1}^{n} \lambda_{i}

{{< /math >}}
同时对于矩阵 {{< imath >}}M=A-\lambda I{{< /imath >}}，利用行列式定义，有
{{< math >}}

\det(A-\lambda I)=\sum_{\sigma \in S_{n}}\text{sgn}(n)\prod_{i=1}^{n} (A-\lambda I)_{i,\sigma(i)}

{{< /math >}}
其中 {{< imath >}}S_{n}{{< /imath >}} 表示 {{< imath >}}[n]{{< /imath >}} 中所有置换的集合。

考虑其中 {{< imath >}}\lambda^{n-1}{{< /imath >}} 的系数。矩阵 {{< imath >}}A-\lambda I{{< /imath >}} 中包含 {{< imath >}}\lambda{{< /imath >}} 的元素都在对角线上。由于只要 {{< imath >}}\sigma{{< /imath >}} 不是恒等置换，那么乘积中至少包含两个非对角线元素，从而最多只包含 {{< imath >}}n-2{{< /imath >}} 个 {{< imath >}}\lambda{{< /imath >}}，乘积不可能含有 {{< imath >}}\lambda^{n-1}{{< /imath >}}。从而只有在 {{< imath >}}\sigma{{< /imath >}} 为恒等置换时乘积才有可能包含 {{< imath >}}\lambda^{n-1}{{< /imath >}} 的项。从而展开
{{< math >}}

\begin{align*}
\prod_{i=1}^{n} (A-\lambda I)_{i,i} & = \prod_{i=1}^{n} (a_{i,i}-\lambda) \\
 & = (-1)^{n}\lambda^{n}+(-1)^{n-1}\left( \sum_{i=1}^{n} a_{i,i} \right)\lambda^{n-1}+\dots \\
\end{align*}

{{< /math >}}
得到其中 {{< imath >}}\lambda^{n-1}{{< /imath >}} 的系数为 {{< imath >}}\sum_{i=1}^{n}a_{i,i}{{< /imath >}} 也就是 {{< imath >}}(-1)^{n-1}\mathrm{trace}(A){{< /imath >}}。比较系数，就得到了
{{< math >}}

(-1)^{n+1}\sum_{i=1}^{n} \lambda_{i} = (-1)^{n-1}\sum_{i=1}^{n}\mathrm{trace}(A)\implies \sum_{i=1}^{n} \lambda_{i}=\mathrm{trace}(A) 

{{< /math >}}
证毕。

## Exercise 2

设 {{< imath >}}\{ e_{1},e_{2},\dots,e_{n} \}{{< /imath >}} 是 {{< imath >}}\mathbb{R}^{n}{{< /imath >}} 的标准基。构造矩阵 {{< imath >}}A{{< /imath >}}，它的第 {{< imath >}}j{{< /imath >}} 列为 {{< imath >}}T(e_{j}){{< /imath >}}，也就是
{{< math >}}

A = (T(e_{1}),T(e_{2}),\dots,T(e_{n}))

{{< /math >}}
对于任意 {{< imath >}}x \in \mathbb{R}^{n}{{< /imath >}}，都有 {{< imath >}}x=\sum_{j=1}^{n}x_{j}e_{j}{{< /imath >}}，从而
{{< math >}}

T(x) = T\left( \sum_{j=1}^{n} x_{j}e_{j} \right) = \sum_{j=1}^{n} x_{j}T(e_{j})

{{< /math >}}
其中 {{< imath >}}T(e_{j}){{< /imath >}} 也是矩阵 {{< imath >}}A{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列，从而就有
{{< math >}}

T(x) = \sum_{j=1}^{n} x_{j}a_{j} = Ax

{{< /math >}}
## Exercise 3

要证明这是一个线性变换，我们需要证明 {{< imath >}}T_{A}(M)=AM{{< /imath >}} 满足加法和数乘的封闭性。设 {{< imath >}}M_{1},M_{2}\in M_{m\times n}(\mathbb{R}){{< /imath >}} 为任意矩阵，{{< imath >}}c\in \mathbb{R}{{< /imath >}} 为任意标量。

**加法**：根据矩阵乘法的分配律
{{< math >}}

T_{A}(M_{1}+M_{2}) = A(M_{1}+M_{2}) = AM_{1}+AM_{2} = T_{A}(M_{1}) + T_{A}(M_{2})

{{< /math >}}
**数乘**：根据乘法结合律
{{< math >}}

T_{A}(cM_{1}) = A(cM_{1}) = c(AM_{1}) = cT_{A}(M_{1})

{{< /math >}}
从而 {{< imath >}}T_{A}{{< /imath >}} 是 {{< imath >}}M_{m\times n}(\mathbb{R}){{< /imath >}} 到 {{< imath >}}M_{l\times n}(\mathbb{R}){{< /imath >}} 的线性变换。

## Exercise 4

记行向量组 {{< imath >}}V = [v_1 \dots v_n]{{< /imath >}}。

**加法**：需证 {{< imath >}}[v_1 \dots v_n](A+A') = [v_1 \dots v_n]A + [v_1 \dots v_n]A'{{< /imath >}}。考虑结果向量的第 {{< imath >}}j{{< /imath >}} 个分量，左边第 {{< imath >}}j{{< /imath >}} 项为
{{< math >}}

= \sum_{i=1}^n v_i (A+A')_{ij} = \sum_{i=1}^n v_i (A_{ij} + A'_{ij}) = \sum_{i=1}^n v_i A_{ij} + \sum_{i=1}^n v_i A'_{ij}

{{< /math >}}
这正是右边 {{< imath >}}(VA)_j + (VA')_j{{< /imath >}} 的定义。

**乘法**：需证 {{< imath >}}[v_1 \dots v_n](AB) = ([v_1 \dots v_n]A)B{{< /imath >}}。考虑结果向量的第 {{< imath >}}k{{< /imath >}} 个分量。 左边第 {{< imath >}}k{{< /imath >}} 项为
{{< math >}}

\sum_{i=1}^n v_i (AB)_{ik} = \sum_{i=1}^n v_i (\sum_{j=1}^m A_{ij} B_{jk})

{{< /math >}}
交换求和顺序得到
{{< math >}}

\sum_{j=1}^{m} \left( \sum_{i=1}^{n} v_{i}A_{ij} \right)B_{jk}

{{< /math >}}
括号内是 {{< imath >}}VA{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 个分量，从而就说明了上式等于 {{< imath >}}((VA)B){{< /imath >}} 的第 {{< imath >}}k{{< /imath >}} 项。

## Exercise 5

设旧基矩阵 {{< imath >}}V = \begin{bmatrix} 1 & 2 \\ 1 & 3 \end{bmatrix}{{< /imath >}}，新基矩阵 {{< imath >}}U = \begin{bmatrix} 4 & 6 \\ 5 & 7 \end{bmatrix}{{< /imath >}}。

**(1)**

我们需要找到 {{< imath >}}c_1, c_2{{< /imath >}} 使得 {{< imath >}}c_1 \begin{bmatrix} 1 \\ 1 \end{bmatrix} + c_2 \begin{bmatrix} 2 \\ 3 \end{bmatrix} = \begin{bmatrix} x \\ y \end{bmatrix}{{< /imath >}}。即求解 {{< imath >}}V \mathbf{c} = \mathbf{x}{{< /imath >}}，故 {{< imath >}}\mathbf{c} = V^{-1} \mathbf{x}{{< /imath >}}。
{{< math >}}

V^{-1} = \frac{1}{3-2} \begin{bmatrix} 3 & -2 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 3 & -2 \\ -1 & 1 \end{bmatrix}

{{< /math >}}
因此坐标向量为
{{< math >}}

[\mathbf{x}]_{\bar{v}} = \begin{bmatrix} 3x - 2y \\ -x + y \end{bmatrix}

{{< /math >}}
**(2)**

从基 {{< imath >}}V{{< /imath >}} 变到基 {{< imath >}}U{{< /imath >}} 的过渡矩阵 {{< imath >}}P{{< /imath >}} 满足 {{< imath >}}UP=V{{< /imath >}} ，从而 {{< imath >}}P = U^{-1}V{{< /imath >}}。

首先求解 {{< imath >}}U^{-1}{{< /imath >}}
{{< math >}}

U^{-1} = \frac{1}{28-30} \begin{bmatrix} 7 & -6 \\ -5 & 4 \end{bmatrix} = -\frac{1}{2} \begin{bmatrix} 7 & -6 \\ -5 & 4 \end{bmatrix}

{{< /math >}}
从而计算 {{< imath >}}P = U^{-1}V{{< /imath >}} 得到
{{< math >}}

P = -\frac{1}{2} \begin{bmatrix} 7 & -6 \\ -5 & 4 \end{bmatrix} \begin{bmatrix} 1 & 2 \\ 1 & 3 \end{bmatrix} = -\frac{1}{2} \begin{bmatrix} 1 & -4 \\ -1 & 2 \end{bmatrix} = \begin{bmatrix} -0.5 & 2 \\ 0.5 & -1 \end{bmatrix}

{{< /math >}}
