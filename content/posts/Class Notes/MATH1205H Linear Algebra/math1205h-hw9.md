---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-10-26T20:59:00+08:00'
title: MATH1205H HW9
categories:
- course-note
---
## Exercise 1

**(1)**

若 {{< imath >}}x \in \mathcal{N}(A){{< /imath >}}，说明 {{< imath >}}Ax=0{{< /imath >}}，从而一定有 {{< imath >}}BAx=0{{< /imath >}}，这就得到了 {{< imath >}}x \in \mathcal{N}(BA){{< /imath >}}，因此
{{< math >}}

\mathcal{N}(A) \subseteq \mathcal{N}(BA)

{{< /math >}}
**(2)**

当 {{< imath >}}\text{rank}(B)=n{{< /imath >}}，设 {{< imath >}}x \in \mathcal{N}(BA){{< /imath >}}，此时有 {{< imath >}}BAx=0{{< /imath >}}。由于 {{< imath >}}\text{rank}(B)=n{{< /imath >}}，因此我们可以得到 {{< imath >}}Ax=0{{< /imath >}}，从而
{{< math >}}

x \in \mathcal{N}(A)

{{< /math >}}
于是必然有 {{< imath >}}\mathcal{N}(A)=\mathcal{N}(BA){{< /imath >}}。

如果 {{< imath >}}\mathcal{N}(A)=\mathcal{N}(BA){{< /imath >}}，并不能推出 {{< imath >}}\text{rank}(B)=n{{< /imath >}}。我们可以构造出反例
{{< math >}}

A = \begin{pmatrix}
0 & 0 \\
0 & 0
\end{pmatrix},\quad B = \begin{pmatrix}
1 & 0 \\
0 & 0
\end{pmatrix}

{{< /math >}}
显然这时 {{< imath >}}A=BA{{< /imath >}}，结论成立，但是 {{< imath >}}B{{< /imath >}} 不满秩。

## Exercise 2

需要求解
{{< math >}}

\begin{pmatrix}
2 & 4 & 6 & 4 \\
2 & 5 & 7 & 6 \\
2 & 3 & 5 & 2
\end{pmatrix}\mathbf{x} = \begin{pmatrix}
4 \\ 3 \\ 5
\end{pmatrix}

{{< /math >}}
我们定义增广矩阵
{{< math >}}

A = \left( \begin{array}{cccc|c}
2 & 4 & 6 & 4 & 4 \\
2 & 5 & 7 & 6 & 3 \\
2 & 3 & 5 & 2 & 5
\end{array} \right)

{{< /math >}}
化简得到
{{< math >}}

A = \left( \begin{array}{cccc|c}
1 & 0 & 1 & -2 & 4 \\
0 & 1 & 1 & 2 & -1 \\
0 & 0 & 0 & 0 & 0
\end{array} \right)

{{< /math >}}
从而得到这个方程的解为
{{< math >}}

\mathbf{x} = \begin{pmatrix}
4 \\ -1 \\ 0 \\ 0
\end{pmatrix} + s\begin{pmatrix}
-1 \\ -1 \\ 1 \\ 0
\end{pmatrix} + t\begin{pmatrix}
2 \\ -2 \\ 0 \\ 1
\end{pmatrix}

{{< /math >}}
也就是
{{< math >}}

x_{1} = 4-s+2t,\,x_{2}=-1-s-2t,\,x_{3}=s,\,x_{4}=t

{{< /math >}}

## Exercise 3

如果 {{< imath >}}\{ v_{n} \}{{< /imath >}} 线性相关，那么不妨设
{{< math >}}

v_{n} = \begin{pmatrix}
v_{1} & v_{2} & \dots & v_{n-1}
\end{pmatrix} \begin{pmatrix}
a_{1} \\ a_{2} \\ \vdots \\ a_{n-1}
\end{pmatrix}

{{< /math >}}
其中 {{< imath >}}a_{i}\in \mathbb{R}{{< /imath >}}。

根据垂直，我们有 {{< imath >}}v_{1}\cdot v_{n}=0{{< /imath >}}，于是
{{< math >}}

v_{1}\cdot v_{n} = v_{1}^{T}\begin{pmatrix}
v_{1} & v_{2} & \dots & v_{n-1}
\end{pmatrix} \begin{pmatrix}
a_{1} \\ a_{2} \\ \vdots \\ a_{n-1}
\end{pmatrix} = \begin{pmatrix}
v_{1}^{T}v_{1} & 0 & 0 & \dots & 0
\end{pmatrix} \begin{pmatrix}
a_{1} \\ a_{2} \\ \vdots \\ a_{n-1}
\end{pmatrix} = a_{1}v_{1}^{T}v_{1} = 0

{{< /math >}}
根据 {{< imath >}}v_{1}^{T}v_{1}\neq 0{{< /imath >}}，我们可以得到 {{< imath >}}a_{1}=0{{< /imath >}}。同理取 {{< imath >}}i=1,2,3,\dots,n-1{{< /imath >}}，我们都能得到 {{< imath >}}a_{i}=0{{< /imath >}}。那么这就推出了 {{< imath >}}v_{n}=0{{< /imath >}}，与题目条件矛盾。所以 {{< imath >}}\{ v_{n} \}{{< /imath >}} 线性无关。

## Exercise 4

**(1)**

若 {{< imath >}}v\in V\cap W{{< /imath >}}，我们有 {{< imath >}}v^{T}v=0{{< /imath >}}，从而 {{< imath >}}v=\mathbf{0}{{< /imath >}}。因此 {{< imath >}}V\cap W=\{ \mathbf{0} \}{{< /imath >}}。

**(2)**

两边同乘 {{< imath >}}v_{1}^{T}{{< /imath >}}，我们得到
{{< math >}}

v_{1}^{T}(v_{1}+w_{1}) = v_{1}^{T}(v_{2}+w_{2}) \implies v_{1}^{T}(v_{1} - v_{2}) = \mathbf{0}

{{< /math >}}
同理也有 {{< imath >}}v_{2}^{T}(v_{1}-v_{2})=\mathbf{0}{{< /imath >}}。因此我们有 {{< imath >}}(v_{1}-v_{2})^{T}(v_{1}-v_{2})=\mathbf{0}{{< /imath >}}，即 {{< imath >}}\left| v_{1}-v_{2} \right|=0{{< /imath >}}，从而
{{< math >}}

v_{1}=v_{2}

{{< /math >}}
同理，一样能得到 {{< imath >}}w_{1}=w_{2}{{< /imath >}}。

**(3)**

我们验证 {{< imath >}}V+W{{< /imath >}} 满足 {{< imath >}}\mathbb{R}^{n}{{< /imath >}} 子空间的三个性质即可。

包含零向量：由于 {{< imath >}}\{ \mathbf{0} \}\in V\cap W{{< /imath >}}，因此 {{< imath >}}\{ \mathbf{0} \}\in V+W{{< /imath >}}。

对向量加法封闭：设 {{< imath >}}(v_{1}+w_{1}),(v_{2}+w_{2})\in V+W{{< /imath >}}，由于 {{< imath >}}V{{< /imath >}} 和 {{< imath >}}W{{< /imath >}} 本身都是 {{< imath >}}\mathbb{R}^{n}{{< /imath >}} 的子空间，因此 {{< imath >}}(v_{1}+v_{2})\in V,(w_{1}+w_{2})\in W{{< /imath >}}，所以
{{< math >}}

(v_{1}+w_{1})+(v_{2}+w_{2})=(v_{1}+v_{2})+(w_{1}+w_{2})\in V+W

{{< /math >}}
对标量乘法封闭：设 {{< imath >}}v\in V,w \in W{{< /imath >}}，那么对于 {{< imath >}}c\in \mathbb{R}{{< /imath >}}，有 {{< imath >}}cv\in V,cw\in W{{< /imath >}}，从而 {{< imath >}}c(v+w)\in V+W{{< /imath >}}。

综上，我们证明了 {{< imath >}}V+W{{< /imath >}} 是 {{< imath >}}\mathbb{R}^{n}{{< /imath >}} 的一个子空间。

**(4)**

我们设 {{< imath >}}v_{1},v_{2},\dots,v_{r}{{< /imath >}} 为 {{< imath >}}V{{< /imath >}} 的基，{{< imath >}}w_{1},w_{2},\dots,w_{s}{{< /imath >}} 为 {{< imath >}}W{{< /imath >}} 的基。我们证明 {{< imath >}}v_{1},\dots,v_{r},w_{1},\dots,w_{s}{{< /imath >}} 是 {{< imath >}}V+W{{< /imath >}} 的一个基。

首先证明用 {{< imath >}}v_{1},\dots,v_{r},w_{1},\dots,w_{s}{{< /imath >}} 可以线性表示 {{< imath >}}V+W{{< /imath >}} 中的元素。对于 {{< imath >}}v+w\in V+W{{< /imath >}}，我们可以用 {{< imath >}}v_{1},v_{2},\dots,v_{r}{{< /imath >}} 线性表示出 {{< imath >}}v{{< /imath >}}，用 {{< imath >}}w_{1},w_{2},\dots,w_{s}{{< /imath >}} 线性表示出 {{< imath >}}w{{< /imath >}}，所以用 {{< imath >}}v_{1},\dots,v_{r},w_{1},\dots,w_{s}{{< /imath >}} 可以线性表示出 {{< imath >}}v+w{{< /imath >}}。

接着证明 {{< imath >}}v_{1},\dots,v_{r},w_{1},\dots,w_{s}{{< /imath >}} 中的元素线性无关。不妨只证明不能用 {{< imath >}}v_{1},\dots,v_{r}{{< /imath >}} 线性表示 {{< imath >}}w_{1}{{< /imath >}}，其余完全同理。假设可以线性表示，我们就有
{{< math >}}

w_{1} = \begin{pmatrix}
v_{1} & v_{2} & \dots & v_{n}
\end{pmatrix} \begin{pmatrix}
a_{1} \\ a_{2} \\ \vdots \\ a_{n-1}
\end{pmatrix}

{{< /math >}}
于是我们考虑 {{< imath >}}v_{i}^{T}w_{1}=0{{< /imath >}}，可以推出 {{< imath >}}a_{i}=0{{< /imath >}}，从而得到 {{< imath >}}w_{1}=0{{< /imath >}}，矛盾。因此 {{< imath >}}v_{1},\dots,v_{r},w_{1},\dots,w_{s}{{< /imath >}} 线性无关。


