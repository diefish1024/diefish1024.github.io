---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-12-12T09:40:00+08:00'
title: MATH1205H HW21
categories:
- course-note
---
## Exercise 2

根据定义，对于任意 {{< imath >}}\phi \in V'{{< /imath >}}，有
{{< math >}}
T_{\text{incl}}'(\phi) = \phi \circ T_{\text{incl}}
{{< /math >}}
由于 {{< imath >}}T_{\text{incl}}{{< /imath >}} 是包含映射，因此 {{< imath >}}T_{\text{incl}}'{{< /imath >}} 实际上将 {{< imath >}}\phi{{< /imath >}} 的定义域限制在了 {{< imath >}}U{{< /imath >}} 上，也就是 {{< imath >}}T_{\text{incl}}'(\phi)=\phi|_{U}{{< /imath >}}，因此 {{< imath >}}\mathrm{Im}(T_{\text{incl}}'){{< /imath >}} 由所有形式为 {{< imath >}}\phi|_{U}{{< /imath >}} 的线性泛函组成，从而 {{< imath >}}\mathrm{Im}(T_{\text{incl}}')\subseteq U'{{< /imath >}}。

证明满射。即证对于任意 {{< imath >}}\psi \in U'{{< /imath >}}，都存在 {{< imath >}}\phi \in V'{{< /imath >}} 使得 {{< imath >}}T_{\text{incl}}'(\phi)=\psi{{< /imath >}}。设 {{< imath >}}\{ u_{1},\dots,u_{m} \}{{< /imath >}} 是 {{< imath >}}U{{< /imath >}} 的一组基，将它扩充为 {{< imath >}}V{{< /imath >}} 的一组基 {{< imath >}}\{ u_{1},\dots,u_{m},v_{m+1},\dots,v_{n} \}{{< /imath >}}。那么对于给定的 {{< imath >}}\psi \in U'{{< /imath >}}，在 {{< imath >}}V{{< /imath >}} 的基上定义 {{< imath >}}\phi \in V'{{< /imath >}} 满足
{{< math >}}

\begin{cases}
\phi(u_{i}) = \psi(u_{i}), \\
\phi(v_{j}) = 0
\end{cases}

{{< /math >}}
根据线性扩展定理，{{< imath >}}\phi{{< /imath >}} 在 {{< imath >}}V{{< /imath >}} 上唯一确定。从而对于任意 {{< imath >}}u \in U{{< /imath >}}，{{< imath >}}\phi(u) = \psi(u){{< /imath >}}，即 {{< imath >}}\phi|_U = \psi{{< /imath >}}。因此就有 {{< imath >}}U'\subseteq \mathrm{Im}(T_{\text{incl}}'){{< /imath >}}。

综上就证明了
{{< math >}}

\mathrm{Im}(T_{\text{incl}}') = U'

{{< /math >}}
## Exercise 3

首先验证 {{< imath >}}\{ L_{m+1},\dots,L_{n} \}\subseteq U^{0}{{< /imath >}}。对偶基满足定义 {{< imath >}}L_{i}(v_{j})=\delta_{ij}{{< /imath >}}，对于任意 {{< imath >}}k\in \{ m+1,\dots,n \}{{< /imath >}} 和任意 {{< imath >}}u\in U{{< /imath >}}，将 {{< imath >}}u{{< /imath >}} 写成 {{< imath >}}u=\sum_{j=1}^{m}c_{j}v_{j}{{< /imath >}}。那么
{{< math >}}

L_{k}(u) = L_{k}\left( \sum_{j=1}^{m} c_{j}v_{j} \right) = \sum_{j=1}^{m} c_{j}L_{k}(v_{j})

{{< /math >}}
由于 {{< imath >}}k>m{{< /imath >}} 并且 {{< imath >}}j< m{{< /imath >}}，因此 {{< imath >}}L_{k}(u)=0{{< /imath >}}，从而 {{< imath >}}L_{k}\in U^{0}{{< /imath >}}。

由于 {{< imath >}}\{ L_{m+1},\dots,L_{n} \}{{< /imath >}} 是对偶基 {{< imath >}}\{ L_{1},\dots,L_{n} \}{{< /imath >}} 的子集，所以线性无关。

同时任取 {{< imath >}}\phi \in U^{0}{{< /imath >}}，由于 {{< imath >}}\{ L_{1},\dots,L_{n} \}{{< /imath >}} 是 {{< imath >}}V'{{< /imath >}} 的基，因此 {{< imath >}}\phi{{< /imath >}} 可以唯一地表示为 {{< imath >}}\phi=\sum_{i=1}^{n}a_{i}L_{i}{{< /imath >}}。利用对偶基的性质，{{< imath >}}a_{i}=\phi(v_{i}){{< /imath >}}。由于 {{< imath >}}\phi \in U^{0}{{< /imath >}}，所以对于 {{< imath >}}i\in[m]{{< /imath >}}，都有 {{< imath >}}a_{i}=0{{< /imath >}}。因此 {{< imath >}}\phi=\sum_{i=m+1}^{n}a_{i}L_{i}{{< /imath >}}，这说明 {{< imath >}}U^{0}{{< /imath >}} 中任意元素都可以由 {{< imath >}}\{ L_{m+1},\dots,L_{n} \}{{< /imath >}} 线性表示。

综上，{{< imath >}}\{ L_{m+1},\dots,L_{n} \}{{< /imath >}} 是 {{< imath >}}U^{0}{{< /imath >}} 的一组基，这也给出了 Lemma 1 的证明。

## Exercise 4

假设 {{< imath >}}A = uv^T{{< /imath >}}，其中 {{< imath >}}u \neq 0, v \neq 0{{< /imath >}}。

必要性：矩阵 {{< imath >}}A{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列可以表示为 {{< imath >}}A_j = u v_j{{< /imath >}}（其中 {{< imath >}}v_j{{< /imath >}} 是 {{< imath >}}v{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 个分量）。这意味着 {{< imath >}}A{{< /imath >}} 的每一列都是向量 {{< imath >}}u{{< /imath >}} 的标量倍数。因为 {{< imath >}}v \neq 0{{< /imath >}}，至少存在一个 {{< imath >}}j{{< /imath >}} 使得 {{< imath >}}v_j \neq 0{{< /imath >}}，故 {{< imath >}}A{{< /imath >}} 至少有一列非零，即 {{< imath >}}A \neq 0{{< /imath >}}。列空间 {{< imath >}}\text{Col}(A) = \text{span}(\{v_1 u, \dots, v_n u\}) = \text{span}(\{u\}){{< /imath >}}。由于 {{< imath >}}u \neq 0{{< /imath >}}，故 {{< imath >}}\text{dim}(\text{Col}(A)) = 1{{< /imath >}}。即 {{< imath >}}\text{rank}(A) = 1{{< /imath >}}。

充分性：假设 {{< imath >}}\text{rank}(A) = 1{{< /imath >}}，这意味着列空间 {{< imath >}}\text{Col}(A){{< /imath >}} 的维数为 {{< imath >}}1{{< /imath >}}。取 {{< imath >}}\text{Col}(A){{< /imath >}} 的一组基，记为向量 {{< imath >}}u \in \mathbb{R}^m{{< /imath >}}，显然 {{< imath >}}u \neq 0{{< /imath >}}。{{< imath >}}A{{< /imath >}} 的每一列 {{< imath >}}C_1, \dots, C_n{{< /imath >}} 都在 {{< imath >}}\text{Col}(A){{< /imath >}} 中，因此每一列都是 {{< imath >}}u{{< /imath >}} 的倍数。 即存在标量 {{< imath >}}k_1, \dots, k_n{{< /imath >}} 使得 {{< imath >}}C_j = k_j u{{< /imath >}}。定义向量 {{< imath >}}v = [k_1, k_2, \dots, k_n]^T \in \mathbb{R}^n{{< /imath >}}，由于 {{< imath >}}\text{rank}(A) \neq 0{{< /imath >}}，至少有一列不为零向量，因此至少有一个 {{< imath >}}k_j \neq 0{{< /imath >}}，即 {{< imath >}}v \neq 0{{< /imath >}}。由矩阵乘法定义，{{< imath >}}A{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列为 {{< imath >}}u v_j{{< /imath >}}，即 {{< imath >}}A = uv^T{{< /imath >}}。