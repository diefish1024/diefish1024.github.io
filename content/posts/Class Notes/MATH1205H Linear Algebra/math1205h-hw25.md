---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-12-24T20:02:00+08:00'
title: MATH1205H HW25
categories:
- course-note
---
## Exercise 1

不唯一。考虑有奇异值相等的情况，那么最优子空间不唯一。假设 {{< imath >}}\sigma_{k}=\sigma_{k+1}{{< /imath >}}，那么在由 {{< imath >}}v_{k}{{< /imath >}} 和 {{< imath >}}v_{k+1}{{< /imath >}} 张成的平面内进行任意旋转后得到的向量组也满足条件。

## Exercise 2

根据给定的分解，{{< imath >}}A{{< /imath >}} 有唯一的非零奇异值 {{< imath >}}\sigma_1=5{{< /imath >}}，对应的 {{< imath >}}u_1 = \begin{bmatrix} 0.6 \\ 0.8 \end{bmatrix}{{< /imath >}}，{{< imath >}}v_1 = [1]{{< /imath >}}。

首先计算伪逆 {{< imath >}}A^+ = \frac{1}{\sigma_1} v_1 u_1^T = \frac{1}{5} [1] \begin{bmatrix} 0.6 & 0.8 \end{bmatrix} = \begin{bmatrix} 0.12 & 0.16 \end{bmatrix}{{< /imath >}}。

接着计算 {{< imath >}}A^+ A = \begin{bmatrix} 0.12 & 0.16 \end{bmatrix} \begin{bmatrix} 3 \\ 4 \end{bmatrix} = 0.36 + 0.64 = 1{{< /imath >}}（即 {{< imath >}}I_1{{< /imath >}}）。

计算 {{< imath >}}AA^+ = \begin{bmatrix} 3 \\ 4 \end{bmatrix} \begin{bmatrix} 0.12 & 0.16 \end{bmatrix} = \begin{bmatrix} 0.36 & 0.48 \\ 0.48 & 0.64 \end{bmatrix}{{< /imath >}}。

最后计算 {{< imath >}}x^+ = A^+ b{{< /imath >}}：当 {{< imath >}}b = \begin{bmatrix} 3 \\ 4 \end{bmatrix}{{< /imath >}} 时，{{< imath >}}x^+ = 0.12(3) + 0.16(4) = 1{{< /imath >}}；当 {{< imath >}}b = \begin{bmatrix} -4 \\ 3 \end{bmatrix}{{< /imath >}} 时，{{< imath >}}x^+ = 0.12(-4) + 0.16(3) = 0{{< /imath >}}。

## Exercise 3

首先证明 {{< imath >}}A^+ A{{< /imath >}} 的表达式，{{< imath >}}A^+ A = \left(\sum_{i} \frac{v_i u_i^T}{\sigma_i}\right) \left( \sum_{j} \sigma_j u_j v_j^T \right){{< /imath >}}，利用 {{< imath >}}u_i{{< /imath >}} 的正交性 {{< imath >}}u_i^T u_j = \delta_{ij}{{< /imath >}}，中间项相消，得到 {{< imath >}}\sum_{i} v_i v_i^T{{< /imath >}}。

同理可证 {{< imath >}}A A^+ = \left( \sum_{i} \sigma_i u_i v_i^T \right)\left( \sum_{j} \frac{v_j u_j^T}{\sigma_j} \right) = \sum_{i} u_i u_i^T{{< /imath >}}。

最后证明投影性质，{{< imath >}}(A^+ A)^2 = \left( \sum_{i} v_i v_i^T \right)\left( \sum_{j} v_j v_j^T \right){{< /imath >}}，利用 {{< imath >}}v_i{{< /imath >}} 的正交性 {{< imath >}}v_i^T v_j = \delta_{ij}{{< /imath >}}，结果为 {{< imath >}}\sum_{i} v_i v_i^T{{< /imath >}}，即 {{< imath >}}(A^+ A)^2 = A^+ A{{< /imath >}}，说明它是投影矩阵。

## Exercise 4

将向量 {{< imath >}}v_1, \dots, v_n{{< /imath >}} 作为列向量构成矩阵 {{< imath >}}Q = [v_1 \dots v_n]{{< /imath >}}。因为 {{< imath >}}v_i{{< /imath >}} 是 {{< imath >}}\mathbb{R}^n{{< /imath >}} 中的标准正交基，所以 {{< imath >}}Q{{< /imath >}} 是正交矩阵，满足 {{< imath >}}Q^T Q = I{{< /imath >}} 和 {{< imath >}}Q Q^T = I{{< /imath >}}。我们要证明的求和式 {{< imath >}}\sum_{i=1}^n v_i v_i^T{{< /imath >}} 恰好等于矩阵乘法 {{< imath >}}Q Q^T{{< /imath >}}。由于 {{< imath >}}Q{{< /imath >}} 是满秩方阵，其左逆等于右逆，故 {{< imath >}}Q Q^T = I_n{{< /imath >}}，证毕。

## Exercise 5

**(1)**

{{< imath >}}A{{< /imath >}} 的秩等于其非零奇异值 {{< imath >}}\sigma_i{{< /imath >}} 的个数。根据 {{< imath >}}A^+{{< /imath >}} 的定义，{{< imath >}}A^+{{< /imath >}} 的奇异值为 {{< imath >}}1/\sigma_i{{< /imath >}}（对应 {{< imath >}}\sigma_i \neq 0{{< /imath >}}）和 {{< imath >}}0{{< /imath >}}（对应 {{< imath >}}\sigma_i = 0{{< /imath >}}）。因此，{{< imath >}}A^+{{< /imath >}} 的非零奇异值个数与 {{< imath >}}A{{< /imath >}} 相同，故 {{< imath >}}\text{rank}(A) = \text{rank}(A^+){{< /imath >}}。

**(2)**

若 {{< imath >}}A{{< /imath >}} 可逆，则 {{< imath >}}A{{< /imath >}} 是 {{< imath >}}n \times n{{< /imath >}} 方阵且满秩，所有 {{< imath >}}\sigma_i > 0{{< /imath >}}。此时 {{< imath >}}A^{-1} = (U \Sigma V^T)^{-1} = V \Sigma^{-1} U^T{{< /imath >}}，这与 {{< imath >}}A^+{{< /imath >}} 的定义完全一致，故 {{< imath >}}A^+ = A^{-1}{{< /imath >}}。

## Exercise 6

**(1)**

令 {{< imath >}}x = \sum c_i v_i{{< /imath >}}，则 {{< imath >}}||Ax||^2 = ||\sum \sigma_i c_i u_i||^2 = \sum \sigma_i^2 c_i^2{{< /imath >}}。因为 {{< imath >}}\sigma_1{{< /imath >}} 最大，所以 {{< imath >}}\sum \sigma_i^2 c_i^2 \le \sigma_1^2 \sum c_i^2 = \sigma_1^2 ||x||^2{{< /imath >}}，最大值在 {{< imath >}}x=v_1{{< /imath >}} 时取到，即 {{< imath >}}\sigma_1{{< /imath >}}。

**(2)**

设 {{< imath >}}V_{k+1} = \text{span}(v_1, \dots, v_{k+1}){{< /imath >}}，其维数为 {{< imath >}}k+1{{< /imath >}}。{{< imath >}}B{{< /imath >}} 的秩为 {{< imath >}}k{{< /imath >}}，根据秩-零化度定理，{{< imath >}}\dim(N(B)) = n-k{{< /imath >}}。根据维数公式，{{< imath >}}\dim(V_{k+1} \cap N(B)) \ge (k+1) + (n-k) - n = 1{{< /imath >}}，因此交集中存在非零向量 {{< imath >}}x{{< /imath >}}。对于此 {{< imath >}}x{{< /imath >}}，有 {{< imath >}}Bx=0{{< /imath >}} 且 {{< imath >}}x \in V_{k+1}{{< /imath >}}。于是 {{< imath >}}||(A-B)x|| = ||Ax||{{< /imath >}}。由于 {{< imath >}}x{{< /imath >}} 仅由前 {{< imath >}}k+1{{< /imath >}} 个奇异向量组成，且 {{< imath >}}||Ax|| \ge \sigma_{k+1}||x||{{< /imath >}}，故商 {{< imath >}}\ge \sigma_{k+1}{{< /imath >}}。

**(3)**

等号成立当且仅当 {{< imath >}}B{{< /imath >}} 是 {{< imath >}}A{{< /imath >}} 的截断 SVD 近似，即 {{< imath >}}B = A_k = \sum_{i=1}^k \sigma_i u_i v_i^T{{< /imath >}}。