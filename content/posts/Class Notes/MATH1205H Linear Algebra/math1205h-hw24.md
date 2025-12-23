---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-12-20T21:40:00+08:00'
title: MATH1205H HW24
categories:
- course-note
---
## Exercise 1

注意到
{{< math >}}
\begin{aligned} \left\| \sum_{i=1}^k c_i w_i \right\|^2 &= \left\langle \sum_{i=1}^k c_i w_i, \sum_{j=1}^k c_j w_j \right\rangle \\ &= \sum_{i=1}^k \sum_{j=1}^k c_i c_j \langle w_i, w_j \rangle \end{aligned}
{{< /math >}}
根据题设，我们知道当 {{< imath >}}i \neq j{{< /imath >}} 时 {{< imath >}}\langle w_i, w_j \rangle = 0{{< /imath >}}，当 {{< imath >}}i = j{{< /imath >}} 时 {{< imath >}}\langle w_i, w_j \rangle = 1{{< /imath >}}。因此，上述双重求和中仅保留 {{< imath >}}i=j{{< /imath >}} 的项
{{< math >}}
\sum_{i=1}^k c_i^2 \cdot 1 = \sum_{i=1}^k c_i^2
{{< /math >}}
得证。

## Exercise 2

根据定义，我们有
{{< math >}}

\sum_{i=1}^{m} \| a_{i} \| ^{2} = \mathrm{tr}(AA^{T}) = \mathrm{tr}(A^{T}A)

{{< /math >}}
由于 {{< imath >}}A^T A{{< /imath >}} 是对称半正定矩阵，其非零特征值恰好是 {{< imath >}}A{{< /imath >}} 的奇异值的平方，即 {{< imath >}}\lambda_j(A^T A) = \sigma_j^2{{< /imath >}}，那么
{{< math >}}
\text{tr}(A^T A) = \sum_{j=1}^r \lambda_j(A^T A) = \sum_{j=1}^r \sigma_j^2
{{< /math >}}
证毕。

## Exercise 3

设 {{< imath >}}A{{< /imath >}} 的 SVD 分解为 {{< imath >}}A=U\Sigma V^{T}{{< /imath >}}，其中 {{< imath >}}\Sigma=\text{diag}(\sigma_{1},\dots,\sigma_{n}){{< /imath >}} 且 {{< imath >}}\sigma_{i}>0{{< /imath >}}。那么 {{< imath >}}A{{< /imath >}} 的逆矩阵为
{{< math >}}

A^{-1} = (U\Sigma V^{T})^{-1} = (V^{T})^{-1}\Sigma ^{-1}U^{-1} = V\Sigma ^{-1}U^{T}

{{< /math >}}
其中根据对角矩阵的性质 {{< imath >}}A^{-1}=\text{diag}(1 / \sigma_{1},\dots,1 / \sigma_{n}){{< /imath >}}。从而 {{< imath >}}A^{-1}{{< /imath >}} 的奇异值是 {{< imath >}}A{{< /imath >}} 的奇异值的倒数。

## Exercise 4

由于 {{< imath >}}R{{< /imath >}} 是 {{< imath >}}\mathbb{R}^m{{< /imath >}} 的基矩阵，它是可逆的。我们有
{{< math >}}
A = R (R^{-1} A)
{{< /math >}}
由于 {{< imath >}}A{{< /imath >}} 的每个列向量都属于 {{< imath >}}\text{Col}(A)=\text{span}\{ r_{1},\dots,r_{r} \}{{< /imath >}}，在基地 {{< imath >}}R{{< /imath >}} 的坐标中只有前 {{< imath >}}r{{< /imath >}} 个分量非零，因此 {{< imath >}}R^{-1}A{{< /imath >}} 必然是 {{< imath >}}\left[ B\atop 0 \right]{{< /imath >}} 的形式，其中 {{< imath >}}B{{< /imath >}} 为 {{< imath >}}r \times n{{< /imath >}} 的矩阵。

因为 {{< imath >}}\text{rank}(A)=r{{< /imath >}} 且 {{< imath >}}R{{< /imath >}} 可逆，所以 {{< imath >}}\text{rank}(B)=r{{< /imath >}}。我们可以将 {{< imath >}}B{{< /imath >}} 的 {{< imath >}}r{{< /imath >}} 个行向量扩充为 {{< imath >}}\mathbb{R}^n{{< /imath >}} 的一组基，从而构造一个 {{< imath >}}n \times n{{< /imath >}} 的可逆矩阵
{{< math >}}
C = \begin{bmatrix} B \\ Y \end{bmatrix}
{{< /math >}}
我们计算 {{< imath >}}R\Sigma C{{< /imath >}} 为
{{< math >}}
R \Sigma C = R \begin{bmatrix} I_r & 0 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} B \\ Y \end{bmatrix} = R \begin{bmatrix} B \\ 0 \end{bmatrix} = R (R^{-1} A) = A
{{< /math >}}
设 {{< imath >}}c_k^T{{< /imath >}} 为矩阵 {{< imath >}}C{{< /imath >}} 的第 {{< imath >}}k{{< /imath >}} 行。利用矩阵乘法的行列展开
{{< math >}}
A = R \begin{bmatrix} c_1^T \\ \vdots \\ c_r^T \\ 0 \end{bmatrix} = \sum_{k=1}^r r_k c_k^T
{{< /math >}}
由于 {{< imath >}}C{{< /imath >}} 是满秩矩阵，其行向量 {{< imath >}}c_1, \dots, c_r{{< /imath >}} 必然线性无关。证毕。