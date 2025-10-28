---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-10-27T13:21:00+08:00'
title: MATH1205H HW10
categories:
- course-note
---
## Exercise 1

**(1)**
{{< math >}}

u\cdot v = v\cdot u = \sum_{i=1}^{m} v_{i}w_{i}

{{< /math >}}
**(2)**
{{< math >}}

(u+v)\cdot w = u\cdot w + v\cdot w = \sum_{i=1}^{m} (v_{i}+u_{i})w_{i}

{{< /math >}}
**(3)**
{{< math >}}

cu\cdot v = c(u\cdot v) = \sum_{i=1}^{m} (c\cdot u_{i}v_{i})

{{< /math >}}
**(4)**
{{< math >}}

u\cdot u = \sum_{i=1}^{m} u_{i}^{2} \geq  0

{{< /math >}}
若 {{< imath >}}u\cdot u = 0{{< /imath >}}，可以得到 {{< imath >}}u_{i}=0{{< /imath >}}，从而 {{< imath >}}u=\mathbf{0}{{< /imath >}}。

## Exercise 2
{{< math >}}

u\perp v \implies u\cdot v = \sum_{i=1}^{m} u_{i}v_{i} = 0

{{< /math >}}
从而
{{< math >}}

\begin{align*}
\| u+v \| ^{2} & = \sum_{i=1}^{m} (u_{i}+v_{i})^{2} \\
 & = \sum_{i=1}^{m} u_{i}^{2} + \sum_{i=1}^{m} v_{i}^{2} + 2\sum_{i=1}^{m} u_{i}v_{i} \\
 & = \sum_{i=1}^{m} u_{i}^{2} + \sum_{i=1}^{m} v_{i}^{2} \\
 & = \| u \| ^{2} + \| v \| ^{2}
\end{align*}

{{< /math >}}

## Exercise 3

**(1)**

我们取 {{< imath >}}V{{< /imath >}} 的一组基向量（共有 {{< imath >}}\text{dim}V=n{{< /imath >}} 个）{{< imath >}}\{ v_{n} \}{{< /imath >}}。将这些向量拼起来，从而就得到了一个 {{< imath >}}m\times n{{< /imath >}} 的矩阵
{{< math >}}

A = \begin{pmatrix}
v_{1} & v_{2} & v_{3} & \dots & v_{n}
\end{pmatrix}

{{< /math >}}
由于 {{< imath >}}\{ v_{n} \}{{< /imath >}} 是一组线性无关的基向量，因此满足 {{< imath >}}V=C(A){{< /imath >}}。


**(2**)

{{< imath >}}e{{< /imath >}} 垂直于 {{< imath >}}V{{< /imath >}} 说明 {{< imath >}}e{{< /imath >}} 和 {{< imath >}}V{{< /imath >}} 中的每一个向量都垂直。我们取 {{< imath >}}(1){{< /imath >}} 中取出的基 {{< imath >}}\{ v_{n} \}{{< /imath >}}，从而 {{< imath >}}v_{i}^{T}e=0{{< /imath >}}，带入所有的 {{< imath >}}v_{i}{{< /imath >}}，就有
{{< math >}}

A^{T}e = \mathbf{0} \implies A^{T}(v-p) = \mathbf{0}

{{< /math >}}
由于 {{< imath >}}p \in V=C(A){{< /imath >}}，就有 {{< imath >}}p=Ax{{< /imath >}}，从而
{{< math >}}

A^{T}v = A^{T}Ax \implies x = (A^{T}A)^{-1}A^{T}v

{{< /math >}}
其中由于 {{< imath >}}\text{rank}(A)=n{{< /imath >}}，从而 {{< imath >}}\text{rank}(A^{T}A)=n{{< /imath >}}，得到这是一定一个可逆矩阵。因此
{{< math >}}

p = Ax = A(A^{T}A)^{-1}A^{T}v

{{< /math >}}
一定存在。

**(3)**

我们带入 {{< imath >}}v=p+e{{< /imath >}}，那么只需要证明
{{< math >}}

\| p+e-u \| = \| e + (p-u) \| \geq  \| e \| 

{{< /math >}}
由于 {{< imath >}}e\perp V{{< /imath >}}，并且 {{< imath >}}p-u\in V{{< /imath >}}，因此
{{< math >}}

\| e+(p-u) \| ^{2} = \| e \| ^{2} + \| p-u \| ^{2} \geq  \| e \| ^{2}

{{< /math >}}
等号当且仅当 {{< imath >}}u=p{{< /imath >}}。两边再开平方即可得到目标式子，得证。

**(4)**

我们带入 {{< imath >}}\text{dist}{{< /imath >}} 的定义，有
{{< math >}}

\text{dist}(v,V) = \min_{u\in V}\| u-v \| \geq  \| e \| 

{{< /math >}}
并且在 {{< imath >}}u=p{{< /imath >}} 时就有 {{< imath >}}\| u-v \|=\| e \|{{< /imath >}}。因此
{{< math >}}

\text{dist}(v,V) = \| e \| 

{{< /math >}}

## Exercise 4

**(1)**
{{< math >}}

e = b - \dfrac{a\cdot b}{\| a \|^{2} }\cdot a = \begin{bmatrix}
1 \\ 2 \\ 2
\end{bmatrix} - \dfrac{5}{3}\cdot \begin{bmatrix}
1 \\ 1 \\ 1
\end{bmatrix} = \begin{bmatrix}
-2 / 3 \\ 1 / 3 \\ 1 / 3
\end{bmatrix}

{{< /math >}}
**(2)**
{{< math >}}

e = b - \dfrac{a\cdot b}{\| a \|^{2} }\cdot a = \begin{bmatrix}
1 \\ 3 \\ 1
\end{bmatrix} - \dfrac{-11}{11}\cdot \begin{bmatrix}
-1 \\ -3 \\ -1
\end{bmatrix} = \mathbf{0}

{{< /math >}}
## Exercise 5

**(1)**

首先计算 {{< imath >}}A^T A{{< /imath >}}
{{< math >}}

A^T A = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix} \implies (A^T A)^{-1} = \begin{pmatrix} 2 & -1 \\ -1 & 1 \end{pmatrix}

{{< /math >}}
{{< math >}}



{{< /math >}}
得到
{{< math >}}

A^T b = \begin{pmatrix} 2 \\ 5 \end{pmatrix}

{{< /math >}}

投影向量 {{< imath >}}p{{< /imath >}} 为
{{< math >}}

p = A (A^T A)^{-1} A^T b = \begin{pmatrix} 2 \\ 3 \\ 0 \end{pmatrix}

{{< /math >}}

误差向量 {{< imath >}}e{{< /imath >}} 为
{{< math >}}

e = b - p = \begin{pmatrix} 0 \\ 0 \\ 4 \end{pmatrix}

{{< /math >}}

**(2)**

首先计算 {{< imath >}}A^T A{{< /imath >}}
{{< math >}}

A^T A = \begin{pmatrix} 2 & 2 \\ 2 & 3 \end{pmatrix} \implies (A^T A)^{-1} = \begin{pmatrix} 3/2 & -1 \\ -1 & 1 \end{pmatrix}

{{< /math >}}

得到
{{< math >}}

A^T b = \begin{pmatrix} 8 \\ 14 \end{pmatrix}

{{< /math >}}

投影向量 {{< imath >}}p{{< /imath >}} 为
{{< math >}}

p = A (A^T A)^{-1} A^T b = \begin{pmatrix} 4 \\ 4 \\ 6 \end{pmatrix}

{{< /math >}}

误差向量 {{< imath >}}e{{< /imath >}} 为
{{< math >}}

e = b - p = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}

{{< /math >}}
