---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-10-21T09:54:00+08:00'
title: MATH1205H HW8
categories:
- course-note
---
## Exercise 1

先证明行阶梯矩阵中主元列的唯一性。由于初等行变换保持了列向量之间的线性关系，因此如果矩阵 {{< imath >}}A{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列是前 {{< imath >}}j-1{{< /imath >}} 列的线性组合，初等行变换之后也仍然成立。并且一个列为主元列，当且仅当它不能被前面的列线性表示，所以 {{< imath >}}A_{1}{{< /imath >}} 和 {{< imath >}}A_{2}{{< /imath >}} 中的主元列位置完全相同。

接着证明简化行阶梯矩阵的唯一性。对于每个主元列 {{< imath >}}j_{k}{{< /imath >}}，必须化简成单位向量 {{< imath >}}e_{k}{{< /imath >}}，满足主元为 {{< imath >}}1{{< /imath >}}，其余元素为 {{< imath >}}0{{< /imath >}}，具有唯一性；对于非主元列，可以表示为前面的列的线性组合，所以为 {{< imath >}}0{{< /imath >}}，也具有唯一性。因此简化行阶梯矩阵具有唯一性。

## Exercise 2

**(1)**

我们通过选择 {{< imath >}}W=\text{span}\{ v_{1},v_{2},\dots,v_{n} \}{{< /imath >}} 中的一个子集，可以构造出 {{< imath >}}W{{< /imath >}} 的一个基。我们依次考虑 {{< imath >}}i=1,2,\dots,n{{< /imath >}}，如果 {{< imath >}}i=1{{< /imath >}} 或者 {{< imath >}}v_{i}{{< /imath >}} 不是前 {{< imath >}}i-1{{< /imath >}} 个向量的线性组合，就选择 {{< imath >}}v_{i}{{< /imath >}}，这样最终就得到了 {{< imath >}}B=\{ v_{i_{1}},v_{i_{2}},\dots,v_{i_{r}} \}{{< /imath >}}。

下面验证这时 {{< imath >}}W{{< /imath >}} 的基：显然根据选择策略，{{< imath >}}B{{< /imath >}} 中的向量显然是线性无关的；并且 {{< imath >}}W\setminus B{{< /imath >}} 中的向量都可以被 {{< imath >}}B{{< /imath >}} 中的向量线性表示。这就说明了 {{< imath >}}B{{< /imath >}} 是 {{< imath >}}W{{< /imath >}} 的一个基。

**(2)**

显然根据定义，有
{{< math >}}

\text{dim}(\text{span}\{ v_{1},v_{2},\dots,v_{n} \}) = r

{{< /math >}}
其中 {{< imath >}}r{{< /imath >}} 为 {{< imath >}}(1){{< /imath >}} 中构造出的 {{< imath >}}B{{< /imath >}} 的大小，{{< imath >}}\left| B \right|=r{{< /imath >}}。

我们只需要证明若 {{< imath >}}v_{1},v_{2},\dots,v_{n}{{< /imath >}} 线性无关，就有 {{< imath >}}\left| B \right|=n{{< /imath >}}。根据 {{< imath >}}B{{< /imath >}} 的定义，这是显然的，不可能出现一个向量 {{< imath >}}v_{i}{{< /imath >}} 被前 {{< imath >}}i-1{{< /imath >}} 个向量线性表示的情况，所以构造 {{< imath >}}B{{< /imath >}} 过程会选择所有的向量，我们就得到了
{{< math >}}

W=B\implies \left| B \right| =r=n

{{< /math >}}
从而
{{< math >}}

\text{dim}(\text{span}\{ v_{1},v_{2},\dots,v_{n} \}) = n

{{< /math >}}

## Exercise 3

我们把 {{< imath >}}AB{{< /imath >}} 看成将 {{< imath >}}A{{< /imath >}} 中的列向量线性组合，于是 {{< imath >}}AB{{< /imath >}} 的列空间 {{< imath >}}C(AB){{< /imath >}} 是 {{< imath >}}A{{< /imath >}} 的列空间 {{< imath >}}C(A){{< /imath >}} 的子空间，即 {{< imath >}}C(AB)\subseteq C(A){{< /imath >}}，所以
{{< math >}}

\text{dim}(C(AB)) \leq  \text{dim}(C(A)) \implies \text{rank}(AB) \leq  \text{rank}(A)

{{< /math >}}
同理，考虑行空间，还可以得到 {{< imath >}}\text{rank}(AB) \leq\text{rank}(B){{< /imath >}}。

综上，我们可以得到
{{< math >}}

\text{rank}(AB) \leq  \min\{ \text{rank}(A),\text{rank}(B) \}

{{< /math >}}
## Exercise 4

**(1)**

将 {{< imath >}}A{{< /imath >}} 化为简化行阶梯形：
{{< math >}}

\begin{pmatrix}
-1 & 3 & 5 \\
-2 & 6 & 10
\end{pmatrix} \to \begin{pmatrix}
-1 & 3 & 5 \\
0 & 0 & 0
\end{pmatrix}

{{< /math >}}
从而得到方程 {{< imath >}}-x_{1}+3x_{2}+5x_{3}=0{{< /imath >}}。于是得到两组特解为
{{< math >}}

\begin{pmatrix}
3 \ \\ 1 \ \\ 0
\end{pmatrix}, \begin{pmatrix}
5 \ \\ 0 \ \\ 1
\end{pmatrix}

{{< /math >}}
**(2)**

将 {{< imath >}}A{{< /imath >}} 化为简化行阶梯形：
{{< math >}}

\begin{pmatrix}
-1 & 3 & 5 \\
-2 & 6 & 7
\end{pmatrix} \to \begin{pmatrix}
-1 & 3 & 5 \\
0 & 0 & -3
\end{pmatrix} \to \begin{pmatrix}
-1 & 3 & 0 \\
0 & 0 & 1
\end{pmatrix}

{{< /math >}}
从而得到方程
{{< math >}}

\begin{cases}
x_{1}-3x_{2}=0 \\
x_{3}=0
\end{cases}

{{< /math >}}
得到特解为
{{< math >}}

\begin{pmatrix}
3 \ \\ 1 \ \\ 0
\end{pmatrix}

{{< /math >}}
## Exercise 5

求以下 {{< imath >}}n \times n{{< /imath >}} 循环矩阵的逆矩阵：

{{< math >}}
A = \begin{pmatrix} 1 & 2 & 3 & \cdots & n-1 & n \ \\ n & 1 & 2 & \cdots & n-2 & n-1 \ \\ n-1 & n & 1 & \cdots & n-3 & n-2 \ \\ \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \ \\ 3 & 4 & 5 & \cdots & 1 & 2 \ \\ 2 & 3 & 4 & \cdots & n & 1 \end{pmatrix}
{{< /math >}}

其中 {{< imath >}}A_{ij} = ((j-i) \bmod n) + 1{{< /imath >}}，即每一行都是上一行循环左移一位的结果。

我们构造增广矩阵 {{< imath >}}[A \mid I_n]{{< /imath >}}：

{{< math >}}
[A \mid I_n] = \left[\begin{array}{cccccc|cccccc} 1 & 2 & 3 & \cdots & n-1 & n & 1 & 0 & 0 & \cdots & 0 & 0 \\ n & 1 & 2 & \cdots & n-2 & n-1 & 0 & 1 & 0 & \cdots & 0 & 0 \\ n-1 & n & 1 & \cdots & n-3 & n-2 & 0 & 0 & 1 & \cdots & 0 & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\ 3 & 4 & 5 & \cdots & 1 & 2 & 0 & 0 & 0 & \cdots & 1 & 0 \\ 2 & 3 & 4 & \cdots & n & 1 & 0 & 0 & 0 & \cdots & 0 & 1 \end{array}\right]
{{< /math >}}
接着对于 {{< imath >}}i = n, n-1, \ldots, 3, 2{{< /imath >}}（从下往上执行），进行 {{< imath >}}R_i \leftarrow R_i - R_{i-1}{{< /imath >}} 操作得到
{{< math >}}
\left[\begin{array}{cccccc|cccccc} 1 & 2 & 3 & \cdots & n-1 & n & 1 & 0 & 0 & \cdots & 0 & 0 \\ n-1 & -1 & -1 & \cdots & -1 & -1 & -1 & 1 & 0 & \cdots & 0 & 0 \\ -1 & n-1 & -1 & \cdots & -1 & -1 & 0 & -1 & 1 & \cdots & 0 & 0 \\ -1 & -1 & n-1 & \cdots & -1 & -1 & 0 & 0 & -1 & \cdots & 0 & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\ -1 & -1 & -1 & \cdots & -1 & n-1 & 0 & 0 & 0 & \cdots & -1 & 1 \end{array}\right]
{{< /math >}}
观察到第 2 到第 {{< imath >}}n{{< /imath >}} 行形成了一个特殊的模式，每行有一个 {{< imath >}}n-1{{< /imath >}} 和 {{< imath >}}(n-1){{< /imath >}} 个 {{< imath >}}-1{{< /imath >}}。

继续进行行化简操作，目标是将左侧矩阵化为单位矩阵 {{< imath >}}I_n{{< /imath >}}。具体流程为依次消去每一列的其余元素，再回代继续执行消元操作。由于具体的每一步会非常冗长，因此我们这里直接给出最终结果，

经过消元，增广矩阵化为 {{< imath >}}[I_n \mid A^{-1}]{{< /imath >}}，其中
{{< math >}}
A^{-1} = \frac{2}{n^2(n+1)} \begin{pmatrix} a & b & 1 & \cdots & 1 \ \\ 1 & a & b & \cdots & 1 \ \\ \vdots & \vdots & \ddots & \ddots & \vdots \ \\ b & 1 & \cdots & 1 & a \end{pmatrix}
{{< /math >}}
参数为
{{< math >}}
a = -\frac{n^2 + n - 2}{2}, \quad b = \frac{n^2 + n + 2}{2}
{{< /math >}}
