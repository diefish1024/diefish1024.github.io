---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-10-31T10:16:00+08:00'
title: MATH1205H HW11
categories:
- course-note
---
## Exercise 1

**(1)**

如果 {{< imath >}}A=B{{< /imath >}}，那么 {{< imath >}}Ax=Bx{{< /imath >}} 对于所有 {{< imath >}}x \in \mathbb{R}^{n\times 1}{{< /imath >}} 是显然的。

如果 {{< imath >}}\forall x \in \mathbb{R}^{n\times 1}{{< /imath >}}，都有 {{< imath >}}Ax=Bx{{< /imath >}}，那么我们有 {{< imath >}}(A-B)x=0{{< /imath >}}。由于 {{< imath >}}x{{< /imath >}} 是 {{< imath >}}\mathbb{R}^{n}{{< /imath >}} 中的任意一个向量，说明 {{< imath >}}A-B{{< /imath >}} 的零空间是 {{< imath >}}\mathbb{R}^{n}{{< /imath >}}，因此 {{< imath >}}\text{rank}(A-B)=0{{< /imath >}}，也就有 {{< imath >}}A-B=0{{< /imath >}}，从而 {{< imath >}}A=B{{< /imath >}}。

**(2)**

{{< imath >}}A(A^{T}A)^{-1}A^{T}{{< /imath >}} 和 {{< imath >}}B(B^{T}B)^{-1}B^{T}{{< /imath >}} 分别是 {{< imath >}}A{{< /imath >}} 和 {{< imath >}}B{{< /imath >}} 的投影矩阵，记为 {{< imath >}}P_{A},P_{B}{{< /imath >}}。

如果 {{< imath >}}P_{A}=P_{B}{{< /imath >}}，那么对于任意 {{< imath >}}x \in \mathbb{R}^{m}{{< /imath >}}，我们都有 {{< imath >}}P_{A}x=P_{B}x{{< /imath >}}，从而 {{< imath >}}x{{< /imath >}} 在 {{< imath >}}C(A),C(B){{< /imath >}} 上的投影相同。如果 {{< imath >}}C(A)\neq C(B){{< /imath >}}，就会存在一个向量使得它在 {{< imath >}}C(A),C(B){{< /imath >}} 上的投影结果不一致，矛盾。因此 {{< imath >}}C(A)=C(B){{< /imath >}}。

如果 {{< imath >}}C(A)=C(B){{< /imath >}}，说明 {{< imath >}}B{{< /imath >}} 可以经过线性变换得到 {{< imath >}}A{{< /imath >}}。从而存在可逆矩阵 {{< imath >}}P{{< /imath >}} 使得 {{< imath >}}A=BP{{< /imath >}}，于是
{{< math >}}

\begin{align*}
A(A^{T}A)^{-1}A^{T} & = (BP)[(BP)^{T}BP]^{-1}(BP)^{T} \\
 & = BP[P^{T}B^{T}BP]^{-1}P^{T}B^{T} \\
 & = BP P^{-1}(B^{T}B)^{-1}(P^{T})^{-1}P^{T}B^{T} \\
 & = B(B^{T}B)^{-1}B^{T}
\end{align*}

{{< /math >}}
## Exercise 2

首先我们证明 {{< imath >}}(V^{\perp})^{\perp}\subseteq V{{< /imath >}}。设 {{< imath >}}\omega \in(V^{\perp})^{\perp}{{< /imath >}}，那么 {{< imath >}}\omega{{< /imath >}} 和 {{< imath >}}V^{\perp}{{< /imath >}} 中的所有向量正交。由于 {{< imath >}}V^{\perp}{{< /imath >}} 中的所有向量都和 {{< imath >}}V{{< /imath >}} 中的向量正交，因此 {{< imath >}}\omega \in V{{< /imath >}}，从而 {{< imath >}}(V^{\perp})^{\perp}\subseteq V{{< /imath >}}。

接着证明 {{< imath >}}V\subseteq(V^{\perp})^{\perp}{{< /imath >}}。设 {{< imath >}}v\in V{{< /imath >}}，那么 {{< imath >}}\forall w\in V^{\perp}{{< /imath >}}，我们有 {{< imath >}}\langle v,w \rangle=0{{< /imath >}}，这也意味着 {{< imath >}}v\in(V^{\perp})^{\perp}{{< /imath >}}，从而 {{< imath >}}V\subseteq(V^{\perp})^{\perp}{{< /imath >}}。

综上，我们证明了 {{< imath >}}V=(V^{\perp})^{\perp}{{< /imath >}}。

## Exercise 3

**证**

根据命题 {{< imath >}}(1){{< /imath >}}，我们知道存在矩阵 {{< imath >}}A{{< /imath >}} 使得 {{< imath >}}V=C(A){{< /imath >}}。我们将命题 {{< imath >}}(3){{< /imath >}} 应用于 {{< imath >}}A^{T}{{< /imath >}}，得到
{{< math >}}

\text{rank}(A^{T}) + \text{dim}(N(A^{T})) = n

{{< /math >}}
由于 {{< imath >}}\text{rank}(A)=\text{dim}(C(A))=\text{dim}(V){{< /imath >}} 并且 {{< imath >}}\text{rank}(A)=\text{rank}(A^{T}){{< /imath >}}，我们得到
{{< math >}}

\text{dim}(V) + \text{dim}(N(A^{T})) = n

{{< /math >}}
再利用命题 {{< imath >}}(2){{< /imath >}} 的结论，我们得到 {{< imath >}}C(A)^{\perp}=N(A^{T}){{< /imath >}}，从而 {{< imath >}}V^{\perp}=N(A^{T}){{< /imath >}}，带入即可得到
{{< math >}}

\text{dim}(V) + \text{dim}(V^{\perp}) = n

{{< /math >}}
根据命题 {{< imath >}}(4){{< /imath >}}，我们得到 {{< imath >}}\text{dim}(V+V^{\perp})=\text{dim}(V)+\text{dim}(V^{\perp})=n{{< /imath >}}。

由于 {{< imath >}}V+V^{\perp}{{< /imath >}} 是 {{< imath >}}\mathbb{R}^{n}{{< /imath >}} 的一个子空间，并且维度为 {{< imath >}}n{{< /imath >}}。根据命题 {{< imath >}}(5){{< /imath >}}，我们可以推出 {{< imath >}}V+V^{\perp}=\mathbb{R}^{n}{{< /imath >}}，否则必然有 {{< imath >}}\text{dim}(V+V^{\perp})< \text{dim}(\mathbb{R}^{n})=n{{< /imath >}}。

证毕。

## Exercise 4

**证**

我们用极坐标表示 {{< imath >}}v\in \mathbb{R}^{2}{{< /imath >}}，令 {{< imath >}}v=(r\cos\alpha,r\sin\alpha)^{T}{{< /imath >}}，那么
{{< math >}}

Qv = (r\cos\theta \cos\alpha-r\sin\theta \sin\alpha,r\sin\theta \cos\alpha+r\cos\theta \sin\alpha)^{T}

{{< /math >}}
化简得到
{{< math >}}

Qv = (r\cos(\theta+\alpha),r\sin(\theta+\alpha))

{{< /math >}}
得到了一个单位圆旋转角为 {{< imath >}}\theta+\alpha{{< /imath >}} 的单位向量，可以看成 {{< imath >}}v{{< /imath >}} 逆时针旋转 {{< imath >}}\theta{{< /imath >}} 角度。证毕。

## Exercise 5

**解**

矩阵 {{< imath >}}A{{< /imath >}} 的列向量分别为 {{< imath >}}a_{1}=(1,2,-2)^{T},a_{2}=(1,-1,4)^{T}{{< /imath >}}。我们进行 G-S 正交化，首先 {{< imath >}}v_{1}=a_{1}=(1,2,-2)^{T}{{< /imath >}}，再得到与 {{< imath >}}v_{1}{{< /imath >}} 正交的向量
{{< math >}}

v_{2} = a_{2} - \dfrac{a_{2}\cdot v_{1}}{\| v_{1} \| ^{2}}\cdot v_{1} = \begin{pmatrix}
2 \\ 1 \\ 2
\end{pmatrix}

{{< /math >}}
标准化后得到
{{< math >}}

q_{1} = \begin{pmatrix}
1 / 3 \\ 2 / 3 \\ -2 / 3
\end{pmatrix}, q_{2} = \begin{pmatrix}
2 / 3 \\ 1 / 3 \\ 2 / 3
\end{pmatrix}

{{< /math >}}

接着我们用最小二乘法求解 {{< imath >}}Ax=(1,2,7)^{T}{{< /imath >}}。最小二乘解满足
{{< math >}}

A^{T}A\hat{x} = A^{T}b

{{< /math >}}
带入得到
{{< math >}}

A^{T}A = \begin{pmatrix}
9 & -9 \\
-9 & 18
\end{pmatrix},A^{T}b = \begin{pmatrix}
-9 \\ 27
\end{pmatrix}

{{< /math >}}
得到
{{< math >}}

\begin{pmatrix}
1 & -1 \\ -1  & 2
\end{pmatrix}\hat{x} = \begin{pmatrix}
-1 \\ 3
\end{pmatrix} \implies \hat{x} = \begin{pmatrix}
1 \\ 2
\end{pmatrix}

{{< /math >}}
## Exercise 6

对于给定向量，记
{{< math >}}

a_{1} = \begin{pmatrix}
1 \\ 1 \\ 2
\end{pmatrix},a_{2} = \begin{pmatrix}
1 \\ -1 \\ 0
\end{pmatrix}, a_{3} = \begin{pmatrix}
1 \\ 0 \\ 4
\end{pmatrix}

{{< /math >}}
首先得到
{{< math >}}

q_{1} = \dfrac{a_{1}}{\| a_{1} \| } = \begin{pmatrix}
\dfrac{1}{\sqrt{ 6 }} & \dfrac{1}{\sqrt{ 6 }} & \dfrac{2}{\sqrt{ 6 }}
\end{pmatrix}^{T}

{{< /math >}}
进一步得到（{{< imath >}}a_{1},a_{2}{{< /imath >}} 正交）
{{< math >}}

q_{2} = \dfrac{a_{2}}{\| a_{2} \| } = \begin{pmatrix}
\dfrac{1}{\sqrt{ 2 }} & -\dfrac{1}{\sqrt{ 2 }} & 0
\end{pmatrix}^{T}

{{< /math >}}
接着计算 {{< imath >}}q_{1},q_{2}{{< /imath >}} 的正交向量
{{< math >}}

v_{3} = a_{3} - (a_{3}\cdot q_{1})q_{1} - (a_{3}\cdot q_{2})q_{2} = \begin{pmatrix}
-1 \\ -1 \\ 1
\end{pmatrix}

{{< /math >}}
标准化得到
{{< math >}}

q_{3} = \begin{pmatrix}
-\dfrac{1}{\sqrt{ 3 }} & -\dfrac{1}{\sqrt{ 3 }} & \dfrac{1}{\sqrt{ 3 }}
\end{pmatrix}^{T}

{{< /math >}}
