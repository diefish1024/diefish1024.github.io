---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-10-19T22:04:00+08:00'
title: MATH1205H HW7
categories:
- course-note
---
## Exercise 1

首先初等行变换保持了行向量之间的线性关系，因此保证了矩阵的行空间不会改变，从而它的行秩自然也不便。同时对于列秩，这等价于左乘一个一个初等矩阵，此时显然 {{< imath >}}Ax=0{{< /imath >}} 与 {{< imath >}}EAx=0{{< /imath >}} 等价，说明两者有相同的零空间，因此列秩也不边。

对于列变换，和行变换完全同理，也可以证明行秩和列秩都不变。

下面证明矩阵 {{< imath >}}A{{< /imath >}} 可以通过初等操作化为 {{< imath >}}\begin{pmatrix}I & 0 \\ 0 & 0\end{pmatrix}{{< /imath >}}。设 {{< imath >}}\mathrm{rank}(A)=r{{< /imath >}}，那么我们先通过初等行变换将 {{< imath >}}A{{< /imath >}} 化成阶梯矩阵的形式，得到 {{< imath >}}\begin{pmatrix}I_{r} & R \\ 0 & 0\end{pmatrix}{{< /imath >}}。再对这个结果进行初等列变换，可以直接消除掉 {{< imath >}}R{{< /imath >}} 部分中的所有非零元素，并且不影响其他部分。最终就可以化简为 {{< imath >}}\begin{pmatrix}I & 0 \\ 0 & 0\end{pmatrix}{{< /imath >}}。

## Exercise 2

我们需要证明通过任意执行步骤的高斯消元得到的行阶梯矩阵，其主元数量是相同的，从而说明矩阵的秩是一个唯一的值，和消元过程无关。

由于高斯消元本质上就是一系列初等矩阵变换操作，根据第一问我们已经证明了这些操作不会改变矩阵的秩，因此最后得到的阶梯矩阵的秩也不变，最终主元数量就是秩的数量必然相同，等于原来的秩。

## Exercise 3

若 {{< imath >}}c=0{{< /imath >}}，那么显然有
{{< math >}}

A\cdot \begin{pmatrix}
1 \\ 1 \\ \vdots \\ 1
\end{pmatrix} = \mathbf{0}

{{< /math >}}
说明 {{< imath >}}\text{rank}(A)\neq n{{< /imath >}}，因此 {{< imath >}}A{{< /imath >}} 不可逆，矛盾，所以 {{< imath >}}c\neq 0{{< /imath >}}。

此时
{{< math >}}

A\cdot \begin{pmatrix}
1 \\ 1 \\ \vdots \\ 1
\end{pmatrix} = \begin{pmatrix}
c \\ c \\ \vdots \\ c
\end{pmatrix}

{{< /math >}}
左右同左乘 {{< imath >}}A^{-1}{{< /imath >}}，得到
{{< math >}}

A^{-1}\cdot\begin{pmatrix}
1 \\ 1 \\ \vdots \\ 1
\end{pmatrix}  = \begin{pmatrix}
\frac{1}{c} \\ \frac{1}{c} \\ \vdots \\ \frac{1}{c}
\end{pmatrix}

{{< /math >}}
等价于
{{< math >}}

\sum_{j\in[n]}A^{-1}(i,j) = \dfrac{1}{c}

{{< /math >}}
## Exercise 4

我们设 {{< imath >}}A{{< /imath >}} 的列向量为 {{< imath >}}a_{1},a_{2},\dots,a_{n}{{< /imath >}}，{{< imath >}}C(A)=\text{span}\{ a_{1},a_{2},\dots,a_{n} \}{{< /imath >}} 表示 {{< imath >}}A{{< /imath >}} 的列空间，同理 {{< imath >}}C(B)=\text{span}\{ b_{1},b_{2},\dots,b_{n} \}{{< /imath >}} 表示 {{< imath >}}B{{< /imath >}} 的列空间，那么 {{< imath >}}C(A+B)=\text{span}\{ a_{1}+b_{1},a_{2}+b_{2},\dots,a_{n}+b_{n} \}{{< /imath >}}。

现在考虑 {{< imath >}}C(A)+C(B){{< /imath >}}，定义为 {{< imath >}}C(A){{< /imath >}} 和 {{< imath >}}C(B){{< /imath >}} 中向量之和的集合
{{< math >}}

C(A)+C(B) = \{ u+v\mid u\in C(A),v\in C(B) \}

{{< /math >}}
显然我们可以取 {{< imath >}}u,v{{< /imath >}} 为编号相同的列向量，就能得到 {{< imath >}}C(A+B){{< /imath >}}，说明 {{< imath >}}C(A+B){{< /imath >}} 是 {{< imath >}}C(A)+C(B){{< /imath >}} 的一个子空间，所以它的维数小于 {{< imath >}}C(A)+C(B){{< /imath >}} 的维数，即
{{< math >}}

\text{dim}(C(A+B)) \leq  \text{dim}(C(A)+C(B)) < \text{dim}(C(A)) + \text{dim}(C(B))

{{< /math >}}
这实际上也就是
{{< math >}}

\text{rank}(A+B) < \text{rank}(A) + \text{rank}(B)

{{< /math >}}

## Exercise 5

**(a)**

我们对矩阵 {{< imath >}}A{{< /imath >}} 施行初等行变换：

{{< math >}}

\begin{align*}
 & \begin{pmatrix}
5 & 2 & 3 \\
-4 & 5 & 0 \\
0 & 1 & -5 \\
3 & 7 & 6
\end{pmatrix} \to \begin{pmatrix}
1 & 2/5 & 3/5 \\
-4 & 5 & 0 \\
0 & 1 & -5 \\
3 & 7 & 6
\end{pmatrix} \to \begin{pmatrix}
1 & 2/5 & 3/5 \\
0 & 33/5 & 12/5 \\
0 & 1 & -5 \\
0 & 29/5 & 21/5
\end{pmatrix} \\ \\
 & \to \begin{pmatrix}
1 & 2/5 & 3/5 \\
0 & 1 & -5 \\
0 & 33/5 & 12/5 \\
0 & 29/5 & 21/5
\end{pmatrix} \to 
\begin{pmatrix}
1 & 0 & 3 \\
0 & 1 & -5 \\
0 & 0 & 33 \\
0 & 0 & 30
\end{pmatrix} \to \begin{pmatrix}
1 & 0 & 3 \\
0 & 1 & -5 \\
0 & 0 & 1 \\
0 & 0 & 30
\end{pmatrix} \\  \\
 & \to \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
0 & 0 & 0
\end{pmatrix}
\end{align*}

{{< /math >}}


简化行阶梯形矩阵 {{< imath >}}A'{{< /imath >}} 有 3 个主元，因此
{{< math >}}

\text{rank}(A) = 3

{{< /math >}}
{{< imath >}}A{{< /imath >}} 的简化行阶梯形 {{< imath >}}A'{{< /imath >}} 为
{{< math >}}

A' = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
0 & 0 & 0
\end{pmatrix}

{{< /math >}}

要找到 {{< imath >}}N(A){{< /imath >}}，我们要求解 {{< imath >}}Ax=0{{< /imath >}}，这等价于求解 {{< imath >}}A'x=0{{< /imath >}}。将 {{< imath >}}A'{{< /imath >}} 写回方程组形式：
{{< math >}}

\begin{cases}
1x_1 + 0x_2 + 0x_3 = 0 &  \implies x_1 = 0 \\
0x_1 + 1x_2 + 0x_3 = 0 &  \implies x_2 = 0 \\
0x_1 + 0x_2 + 1x_3 = 0 &  \implies x_3 = 0 \\
0x_1 + 0x_2 + 0x_3 = 0 &  \implies 0 = 0
\end{cases}

{{< /math >}}
解为 {{< imath >}}x_1=0, x_2=0, x_3=0{{< /imath >}}。这意味着
{{< math >}}

N(A) = \left\{ \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} \right\}

{{< /math >}}
**(b)**

我们对矩阵 {{< imath >}}A{{< /imath >}} 施行初等行变换：

{{< math >}}

\begin{align*}
 & \begin{pmatrix}
2 & 2 & 0 & 1 & 0 \\
0 & 5 & 1 & -1 & 1 \\
11 & -2 & 7 & 1 & 0
\end{pmatrix} \to \begin{pmatrix}
1 & 1 & 0 & \frac{1}{2} & 0 \\
0 & 1 & \frac{1}{5} & - \frac{1}{5} & \frac{1}{5} \\
1 & -\frac{2}{11} & \frac{7}{11} & \frac{1}{11} & 0 \\
\end{pmatrix} \to \begin{pmatrix}
1 & 1 & 0 & \frac{1}{2} & 0 \\
0 & 1 & \frac{1}{5} & - \frac{1}{5} & \frac{1}{5} \\
0 & -\frac{13}{11} & \frac{7}{11} & -\frac{9}{22} & 0 \\
\end{pmatrix} \\
 & \to \begin{pmatrix}
1 & 1 & 0 & \frac{1}{2} & 0 \\
0 & 1 & \frac{1}{5} & - \frac{1}{5} & \frac{1}{5} \\
0 & 1 & -\frac{7}{13} & \frac{9}{26} & 0 \\
\end{pmatrix} \to \begin{pmatrix}
1 & 1 & 0 & \frac{1}{2} & 0 \\
0 & 1 & \frac{1}{5} & - \frac{1}{5} & \frac{1}{5} \\
0 & 0 & -\frac{48}{65} & \frac{71}{130} & -\frac{1}{5} \\
\end{pmatrix} \to \begin{pmatrix}
1 & 1 & 0 & \frac{1}{2} & 0 \\
0 & 1 & \frac{1}{5} & - \frac{1}{5} & \frac{1}{5} \\
0 & 0 & 1 & -\frac{71}{96} & \frac{13}{48} \\
\end{pmatrix} \\
 & \to \begin{pmatrix}
1 & 1 & 0 & \frac{1}{2} & 0 \\
0 & 1 & 0 & - \frac{5}{96} & \frac{7}{48} \\
0 & 0 & 1 & -\frac{71}{96} & \frac{13}{48} \\
\end{pmatrix} \to \begin{pmatrix}
1 & 0 & 0 & \frac{53}{96} & -\frac{7}{48} \\
0 & 1 & 0 & - \frac{5}{96} & \frac{7}{48} \\
0 & 0 & 1 & -\frac{71}{96} & \frac{13}{48} \\
\end{pmatrix}
\end{align*}

{{< /math >}}
此为矩阵 {{< imath >}}A{{< /imath >}} 的简化行阶梯形 {{< imath >}}A'{{< /imath >}}。

简化行阶梯形矩阵 {{< imath >}}A'{{< /imath >}} 有 3 个主元，因此 {{< imath >}}A{{< /imath >}} 的秩是 {{< imath >}}3{{< /imath >}}。
{{< math >}}

\text{rank}(A) = 3

{{< /math >}}
由上述步骤得到： {{< math >}}
 A' = \begin{pmatrix} 1 & 0 & 0 & \frac{53}{96} & -\frac{7}{48} \\ 0 & 1 & 0 & - \frac{5}{96} & \frac{7}{48} \\ 0 & 0 & 1 & -\frac{71}{96} & \frac{13}{48} \ \end{pmatrix} 
{{< /math >}} 我们要求解 {{< imath >}}Ax=0{{< /imath >}}，这等价于求解 {{< imath >}}A'x=0{{< /imath >}}。将 {{< imath >}}A'{{< /imath >}} 写回方程组形式： {{< math >}}
 \begin{cases} x_1 = -\frac{53}{96}x_4 + \frac{7}{48}x_5 \\ x_2 = \frac{5}{96}x_4 - \frac{7}{48}x_5 \\ x_3 = \frac{71}{96}x_4 - \frac{13}{48}x_5 \end{cases} 
{{< /math >}} 解向量 {{< imath >}}x{{< /imath >}} 可以写为： {{< math >}}
 x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5 \end{pmatrix} = x_4 \begin{pmatrix} -53/96 \\ 5/96 \\ 71/96 \\ 1 \\ 0 \end{pmatrix} + x_5 \begin{pmatrix} 7/48 \\ -7/48 \\ -13/48 \\ 0 \\ 1 \end{pmatrix} 
{{< /math >}} 零空间 {{< imath >}}N(A){{< /imath >}} 的基是： 
{{< math >}}

\left\{
\begin{pmatrix} -53/96 \\ 5/96 \\ 71/96 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 7/48 \\ -7/48 \\ -13/48 \\ 0 \\ 1 \end{pmatrix}
\right\}

{{< /math >}}

**(c)**

我们对矩阵 {{< imath >}}A{{< /imath >}} 施行初等行变换：

{{< math >}}

\begin{align*}
 & \begin{pmatrix}
1 & 2 & 3 & 4 \\
5 & 6 & 7 & 8 \\
9 & 10 & 11 & 12 \\
13 & 14 & 15 & 16
\end{pmatrix} \xrightarrow{\begin{smallmatrix} R_2 \to R_2 - 5R_1 \\ R_3 \to R_3 - 9R_1 \\ R_4 \to R_4 - 13R_1 \end{smallmatrix}} \begin{pmatrix}
1 & 2 & 3 & 4 \\
0 & -4 & -8 & -12 \\
0 & -8 & -16 & -24 \\
0 & -12 & -24 & -36
\end{pmatrix} \\ \\
 & \xrightarrow{R_2 \to -\frac{1}{4}R_2} \begin{pmatrix}
1 & 2 & 3 & 4 \\
0 & 1 & 2 & 3 \\
0 & -8 & -16 & -24 \\
0 & -12 & -24 & -36
\end{pmatrix} \xrightarrow{\begin{smallmatrix} R_1 \to R_1 - 2R_2 \\ R_3 \to R_3 + 8R_2 \\ R_4 \to R_4 + 12R_2 \end{smallmatrix}} \begin{pmatrix}
1 & 0 & -1 & -2 \\
0 & 1 & 2 & 3 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{pmatrix}
\end{align*}

{{< /math >}}
此为矩阵 {{< imath >}}A{{< /imath >}} 的简化行阶梯形 {{< imath >}}A'{{< /imath >}}。

简化行阶梯形矩阵 {{< imath >}}A'{{< /imath >}} 有 2 个主元，因此 {{< imath >}}A{{< /imath >}} 的秩是 {{< imath >}}2{{< /imath >}}。
{{< math >}}

\text{rank}(A) = 2

{{< /math >}}

由上述步骤得到：
{{< math >}}

A' = \begin{pmatrix}
1 & 0 & -1 & -2 \\
0 & 1 & 2 & 3 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{pmatrix}

{{< /math >}}

我们要求解 {{< imath >}}Ax=0{{< /imath >}}，这等价于求解 {{< imath >}}A'x=0{{< /imath >}}。将 {{< imath >}}A'{{< /imath >}} 写回方程组形式：
{{< math >}}

\begin{cases}
x_1 - x_3 - 2x_4 = 0 & \implies x_1 = x_3 + 2x_4 \\
x_2 + 2x_3 + 3x_4 = 0 & \implies x_2 = -2x_3 - 3x_4\
\end{cases}

{{< /math >}}
解向量 {{< imath >}}x{{< /imath >}} 可以写为：
{{< math >}}

x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} x_3 + 2x_4 \\ -2x_3 - 3x_4 \\ x_3 \\ x_4 \end{pmatrix} = x_3 \begin{pmatrix} 1 \\ -2 \\ 1 \\ 0 \end{pmatrix} + x_4 \begin{pmatrix} 2 \\ -3 \\ 0 \\ 1 \end{pmatrix}

{{< /math >}}
零空间 {{< imath >}}N(A){{< /imath >}} 的基是：
{{< math >}}

\left\{ \begin{pmatrix} 1 \\ -2 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 2 \\ -3 \\ 0 \\ 1 \end{pmatrix} \right\}

{{< /math >}}
**唯一性**：

简化行阶梯形是唯一的。无论通过何种初等行变换序列，任何矩阵的简化行阶梯形都是唯一的。

## Exercise 6

**(1)**

设 {{< imath >}}r = \text{column-rank}(A){{< /imath >}}。这意味着 {{< imath >}}A{{< /imath >}} 的**列空间** {{< imath >}}C(A){{< /imath >}} 具有维数 {{< imath >}}r{{< /imath >}}。因此存在 {{< imath >}}r{{< /imath >}} 个**线性无关**的列向量 {{< imath >}}a_{i_1}, \dots, a_{i_r}{{< /imath >}}，它们构成 {{< imath >}}C(A){{< /imath >}} 的一组**基**。于是令 {{< imath >}}A_{\text{basis}} = [a_{i_1} \dots a_{i_r}]{{< /imath >}} 是一个 {{< imath >}}m \times r{{< /imath >}} 矩阵。

由于 {{< imath >}}A{{< /imath >}} 的每列 {{< imath >}}a_j{{< /imath >}} 都可以表示为这组基的线性组合，即 {{< imath >}}a_j = A_{\text{basis}} b_j{{< /imath >}}（其中 {{< imath >}}b_j \in \mathbb{R}^r{{< /imath >}}）。我们将这些向量 {{< imath >}}b_j{{< /imath >}} 拼接起来形成一个 {{< imath >}}r \times n{{< /imath >}} 矩阵 {{< imath >}}B = [b_1 \dots b_n]{{< /imath >}}。这样，我们就有 {{< imath >}}A = A_{\text{basis}} B{{< /imath >}}，即 {{< imath >}}A=[a_{i_1} \dots a_{i_r}]B{{< /imath >}}。

**(2)**

根据 (i) 的结果，我们有 {{< imath >}}A = A_{\text{basis}} B{{< /imath >}}，其中 {{< imath >}}A_{\text{basis}}{{< /imath >}} 是 {{< imath >}}m \times r{{< /imath >}} 矩阵，{{< imath >}}B{{< /imath >}} 是 {{< imath >}}r \times n{{< /imath >}} 矩阵。

根据提示，我们从行向量的观点来看矩阵乘法，矩阵 {{< imath >}}A{{< /imath >}} 的每一行都是矩阵 {{< imath >}}B{{< /imath >}} 的行的线性组合。具体来说，如果 {{< imath >}}A{{< /imath >}} 的第 {{< imath >}}k{{< /imath >}} 行是 {{< imath >}}A_k{{< /imath >}}，{{< imath >}}A_{\text{basis}}{{< /imath >}} 的第 {{< imath >}}k{{< /imath >}} 行是 {{< imath >}}(A_{\text{basis}})_k{{< /imath >}}，则 {{< imath >}}A_k = (A_{\text{basis}})_k B{{< /imath >}}。这表明 {{< imath >}}A_k{{< /imath >}} 位于 {{< imath >}}B{{< /imath >}} 的行空间 {{< imath >}}R(B){{< /imath >}} 之内。

因此，{{< imath >}}A{{< /imath >}} 的所有行都位于 {{< imath >}}R(B){{< /imath >}} 中。这意味着 {{< imath >}}A{{< /imath >}} 的行空间 {{< imath >}}R(A){{< /imath >}} 是 {{< imath >}}B{{< /imath >}} 的行空间 {{< imath >}}R(B){{< /imath >}} 的一个子空间。
所以，{{< imath >}}\text{dim}(R(A)) \le \text{dim}(R(B)){{< /imath >}}，即 {{< imath >}}\text{row-rank}(A) \le \text{row-rank}(B){{< /imath >}}。由于 {{< imath >}}B{{< /imath >}} 是一个 {{< imath >}}r \times n{{< /imath >}} 矩阵，其行空间最多有 {{< imath >}}r{{< /imath >}} 个线性无关的行，所以 {{< imath >}}\text{row-rank}(B) \le r{{< /imath >}}，因此
{{< math >}}

\text{row-rank}(A) \le r = \text{column-rank}(A)

{{< /math >}}

**(3)**

对称地，我们直接可以将 {{< imath >}}(2){{< /imath >}} 的结果应用于矩阵 {{< imath >}}A{{< /imath >}} 的转置 {{< imath >}}A^T{{< /imath >}}。矩阵 {{< imath >}}A^T{{< /imath >}} 是一个 {{< imath >}}n \times m{{< /imath >}} 矩阵，根据 {{< imath >}}(2){{< /imath >}} 的结论，我们对 {{< imath >}}A^T{{< /imath >}} 施加这个结论：
{{< math >}}

\text{row-rank}(A^T) \le \text{column-rank}(A^T)

{{< /math >}}
同时我们又有 {{< imath >}}\text{row-rank}(A^T) = \text{column-rank}(A),\text{column-rank}(A^T) = \text{row-rank}(A){{< /imath >}}，因此可以得到
{{< math >}}

\text{column-rank}(A) \le \text{row-rank}(A)

{{< /math >}}
