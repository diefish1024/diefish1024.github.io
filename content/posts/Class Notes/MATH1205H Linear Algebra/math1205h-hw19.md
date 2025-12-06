---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-12-05T16:35:00+08:00'
title: MATH1205H HW19
categories:
- course-note
---
## Exercise 1

根据分块对角矩阵的性质，秩等于对角线上各个子块的秩之和，因此
{{< math >}}

\text{rank}(AB)+n = \text{rank}\left(\begin{bmatrix}
AB & 0 \\ 0 & I
\end{bmatrix}\right)

{{< /math >}}
接着由于初等列变换不改变矩阵的秩，将第二列右乘 {{< imath >}}B{{< /imath >}} 加到第一列得到
{{< math >}}

\text{rank}\left(\begin{bmatrix}
AB & 0 \\ 0 & I
\end{bmatrix}\right) = \text{rank}\left(\begin{bmatrix}
AB & 0 \\ B & I
\end{bmatrix}\right)

{{< /math >}}
同样由于初等行变换也不改变矩阵的秩，将第二行左乘 {{< imath >}}A{{< /imath >}} 再和第一行相减，得到
{{< math >}}

\text{rank}\left(\begin{bmatrix}
AB & 0 \\ B & I
\end{bmatrix}\right) = \text{rank}\left(\begin{bmatrix}
0 & -A \\ B & I
\end{bmatrix}\right)

{{< /math >}}
交换上下两行，得到
{{< math >}}

\text{rank}\left(\begin{bmatrix}
0 & -A \\ B & I
\end{bmatrix}\right) = \text{rank}\left(\begin{bmatrix}
B & I \\ 0 & -A
\end{bmatrix}\right)

{{< /math >}}
第二行乘以 {{< imath >}}-1{{< /imath >}} 就得到了
{{< math >}}

\text{rank}\left(\begin{bmatrix}
B & I \\ 0 & -A
\end{bmatrix}\right) = \text{rank}\left(\begin{bmatrix}
B & -I \\ 0 & A
\end{bmatrix}\right)

{{< /math >}}
再根据上三角分块矩阵的性质，就有
{{< math >}}

\text{rank}\left(\begin{bmatrix}
B & -I \\ 0 & A
\end{bmatrix}\right) \geq  \text{rank}(A) + \text{rank}(B)

{{< /math >}}
## Exercise 2

设 {{< imath >}}\dim(U) = n{{< /imath >}}, {{< imath >}}\dim(V) = m{{< /imath >}}, {{< imath >}}\dim(W) = p{{< /imath >}}。 对应矩阵为 {{< imath >}}A{{< /imath >}} (代表 {{< imath >}}T{{< /imath >}}) 和 {{< imath >}}B{{< /imath >}} (代表 {{< imath >}}S{{< /imath >}})。那么我们有
{{< math >}}
\text{rank}(AB) \ge \text{rank}(A) + \text{rank}(B) - m
{{< /math >}}
对于 {{< imath >}}S{{< /imath >}}，有 {{< imath >}}\text{rank}(B)=n-\text{dim}(\text{Ker}(S)){{< /imath >}}。对于 {{< imath >}}T{{< /imath >}}，有 {{< imath >}}\text{rank}(A)=m-\text{dim}(\text{Ker}(T)){{< /imath >}}。对于 {{< imath >}}TS{{< /imath >}}，这是一个 {{< imath >}}U\to W{{< /imath >}} 的映射，对应矩阵为 {{< imath >}}AB{{< /imath >}}，那么 {{< imath >}}\text{rank}(AB)=n-\text{dim}(\text{Ker}(TS)){{< /imath >}}。带入就得到了
{{< math >}}

n-\text{dim}(\text{Ker}(TS)) \geq  n - \text{dim}(\text{Ker}(S)) + m - \text{dim}(\text{Ker}(T)) - m

{{< /math >}}
化简就得到了
{{< math >}}

\text{dim}(\text{Ker}(S)) + \text{dim}(\text{Ker}(T)) \leq \text{dim}(\text{Ker}(TS)) 

{{< /math >}}
## Exercise 3

**(1)**

设线性变换 {{< imath >}}\phi: W \to \mathbb{R}^m{{< /imath >}} 为关于基 {{< imath >}}\bar{w}{{< /imath >}} 的双射。由线性变换的性质可知，像空间 {{< imath >}}\text{Im}(T){{< /imath >}} 由 {{< imath >}}V{{< /imath >}} 中基向量的像 {{< imath >}}\{T(v_1), \dots, T(v_n)\}{{< /imath >}} 生成；而根据矩阵表示的定义，{{< imath >}}A_T{{< /imath >}} 的列空间 {{< imath >}}\text{Col}(A_T){{< /imath >}} 正是由这些像对应的坐标向量 {{< imath >}}\{\phi(T(v_1)), \dots, \phi(T(v_n))\}{{< /imath >}} 生成。

由于 {{< imath >}}\phi{{< /imath >}} 是线性同构，它将由一组向量张成的子空间 {{< imath >}}\text{Im}(T){{< /imath >}} 双射地映射为由其坐标向量张成的子空间 {{< imath >}}\text{Col}(A_T){{< /imath >}}，且在此过程中保持维数不变，即
{{< math >}}
\dim(\text{Im}(T)) = \dim(\phi(\text{Im}(T))) = \dim(\text{Col}(A_T))
{{< /math >}}
结合矩阵秩的定义 {{< imath >}}\text{rank}(A_T) = \dim(\text{Col}(A_T)){{< /imath >}}，即得 {{< imath >}}\dim(\text{Im}(T)) = \text{rank}(A_T){{< /imath >}}。

**(2)**

根据秩-零化度定理，有
{{< math >}}

\text{dim}(V) = \text{dim}(\text{Ker}(T)) + \text{dim}(\mathrm{Im}(T))

{{< /math >}}
如果 {{< imath >}}T{{< /imath >}} 是单射，那么 {{< imath >}}\text{Ker}(T)=\{ 0 \}{{< /imath >}}，从而 {{< imath >}}\text{dim}(\text{Ker}(T))=0{{< /imath >}}。带入就得到了
{{< math >}}

\text{dim(V)} = \text{dim}(\mathrm{Im}(T)) = \text{rank}(A_{T})

{{< /math >}}
如果 {{< imath >}}T{{< /imath >}} 是满射，那么 {{< imath >}}\mathrm{Im}(T)=W{{< /imath >}}，从而 {{< imath >}}\text{dim}(\mathrm{Im}(T))=\text{dim}(W){{< /imath >}}，带入 {{< imath >}}(1){{< /imath >}} 就得到了
{{< math >}}

\text{dim}(W) = \text{rank}(A_{T})

{{< /math >}}
## Exercise 4

设泛函 {{< imath >}}L\in V'{{< /imath >}} 为 {{< imath >}}L:V\to \mathbb{F}{{< /imath >}}，其中 {{< imath >}}\mathbb{F}{{< /imath >}} 是标量域。由于 {{< imath >}}\text{dim}(\mathbb{F})=1{{< /imath >}}，并且 {{< imath >}}\mathrm{Im}(L)\leq\text{dim}(\mathbb{F}){{< /imath >}}，那么就有 {{< imath >}}\text{dim}(\mathrm{Im}(L))=0{{< /imath >}} 或者 {{< imath >}}\text{dim}(\mathrm{Im}(L))=1{{< /imath >}}。

如果 {{< imath >}}\text{dim}(\mathrm{Im}(L))=0{{< /imath >}}，那么也就是只有 {{< imath >}}\{0\}{{< /imath >}}。这时 {{< imath >}}\text{Im}(L) = \{0\}{{< /imath >}}，意味着 {{< imath >}}L{{< /imath >}} 是零映射。

如果 {{< imath >}}\text{dim}(\mathrm{Im}(L))=1{{< /imath >}}，也就是 {{< imath >}}\mathbb{F}{{< /imath >}} 本身。这时 {{< imath >}}\text{Im}(L) = \mathbb{F}{{< /imath >}}，意味着 {{< imath >}}L{{< /imath >}} 是满射。