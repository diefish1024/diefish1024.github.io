---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-12-02T10:21:00+08:00'
title: MATH1205H HW18
categories:
- course-note
---
## Exercise 1

**(1)**

对于任意标量 {{< imath >}}c{{< /imath >}} 和向量 {{< imath >}}x,y\in U{{< /imath >}}，都有
{{< math >}}

\begin{align*}
TS(cx+y) & = T(S(cx+y)) \\
 & = T(cS(x)+S(y)) \\
 & = cT(S(x)) + T(S(y)) \\
 & = cTS(x) + TS(y)
\end{align*}

{{< /math >}}
从而证明了这是一个线性变换。

**(2)**

设 {{< imath >}}U,V,W{{< /imath >}} 的基为
{{< math >}}

\bar{u} = \{ u_{1},\dots,u_{p} \},\bar{v}=\{ v_{1},\dots,v_{n} \},\bar{w}=\{ w_{1},\dots,w_{m} \}

{{< /math >}}
根据线性变换矩阵的定义，有
{{< math >}}

S(u_{i}) = \sum_{k=1}^{n} (A_{S})_{k,i}v_{k},\quad T(v_{i})=\sum_{k=1}^{m} (A_{T})_{k,i}w_{k}

{{< /math >}}
计算 {{< imath >}}TS(u_{i}){{< /imath >}} 并观察系数
{{< math >}}

\begin{align*}
TS(u_{j}) & = T(S(u_{j})) \\
 & = T\left( \sum_{k=1}^{n} (A_{S})_{k,j}v_{k} \right) \\
 & = \sum_{k=1}^{n} (A_{S})_{k,j}T(v_{k}) \\
 & = \sum_{k=1}^{n} (A_{S})_{k,j}\left( \sum_{i=1}^{m} (A_{T})_{i,k}w_{i} \right) \\
 & = \sum_{i=1}^{m} \left( \sum_{k=1}^{n} (A_{T})_{i,k}(A_{S})_{k,j} \right)w_{i} \\
 & = \sum_{i=1}^{m} (A_{T}A_{S})_{i,j}w_{i}
\end{align*}

{{< /math >}}
再结合 {{< imath >}}A_{TS}{{< /imath >}} 的定义就证明了
{{< math >}}

A_{TS}=A_{T}A_{S}

{{< /math >}}

## Exercise 2

**(1)**

分别验证满足线性性
{{< math >}}

\begin{align*}
(T+T')(cx+y) & =T(cx+y)+T'(cx+y) \\
 & = T(cx)+T(y)+T'(cx)+T'(y) \\
& = cT(x)+T(y)+cT'(x)+T'(y) \\
 & =c(T+T')(x)+(T+T')(y)
\end{align*}

{{< /math >}}
以及
{{< math >}}

\begin{align*}
(cT)(dx+y) & = c(T(dx+y)) \\
 & = c(T(dx)+T(y)) \\
 & = c(dT(x)+T(y)) \\
 & = d(cT)(x) + (cT)(y)
\end{align*}

{{< /math >}}
从而对线性运算封闭，都是线性变换。

**(2)**

要证明 {{< imath >}}T(V,W){{< /imath >}} 构成向量空间，需验证其满足封闭性（已在 (1) 中得证）及 8 条公理。由于运算是逐点定义在目标空间 {{< imath >}}W{{< /imath >}} 上的，而 {{< imath >}}W{{< /imath >}} 本身是向量空间，因此结合律、交换律、分配律等性质自然继承。

我们需要证明**零元**和**逆元**的存在：

1. **零向量**：存在 {{< imath >}}T_0 \in T(V,W){{< /imath >}}，定义为对于任意 {{< imath >}}v \in V{{< /imath >}}，{{< imath >}}T_0(v) = \vec{0}_W{{< /imath >}}。显然 {{< imath >}}T + T_0 = T{{< /imath >}}。

2. **加法逆元**：对于任意 {{< imath >}}T{{< /imath >}}，定义 {{< imath >}}(-T)(v) = -(T(v)){{< /imath >}}。显然 {{< imath >}}T + (-T) = T_0{{< /imath >}}。

综上，结合 (1) 中的封闭性，{{< imath >}}T(V,W){{< /imath >}} 构成向量空间。

**(3)**

由线性变换的基本定理，线性变换 {{< imath >}}T{{< /imath >}} 由其在基向量上的作用唯一确定。 设 {{< imath >}}V{{< /imath >}} 的基为 {{< imath >}}v_1, \dots, v_n{{< /imath >}}， {{< imath >}}W{{< /imath >}} 的基为 {{< imath >}}w_1, \dots, w_m{{< /imath >}}。 对于每一个 {{< imath >}}v_j{{< /imath >}}，我们可以任意指定其像 {{< imath >}}T(v_j) \in W{{< /imath >}}。 由于 {{< imath >}}W{{< /imath >}} 是 {{< imath >}}m{{< /imath >}} 维的，选择一个 {{< imath >}}T(v_j){{< /imath >}} 相当于选择了 {{< imath >}}m{{< /imath >}} 个坐标标量。 共有 {{< imath >}}n{{< /imath >}} 个基向量 {{< imath >}}v_j{{< /imath >}} 需要确定，且它们的选择是独立的。 因此，总的自由度（即维数）为
{{< math >}}

\text{dim}(T(V,W))=m\times n

{{< /math >}}
**(4)**

定义映射 {{< imath >}}\Phi: T(V,W) \rightarrow M_{m\times n}(\mathbb{R}){{< /imath >}} 为 {{< imath >}}\Phi(T) = A_T{{< /imath >}}。设 {{< imath >}}T, S \in T(V,W){{< /imath >}}，{{< imath >}}c \in \mathbb{R}{{< /imath >}}。

1. 加法：考察矩阵 {{< imath >}}A_{T+S}{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列，其定义为 {{< imath >}}(T+S)(v_j){{< /imath >}} 在 {{< imath >}}W{{< /imath >}} 基下的坐标
{{< math >}}
[(T+S)(v_j)]_{\overline{w}} = [T(v_j) + S(v_j)]_{\overline{w}} = [T(v_j)]_{\overline{w}} + [S(v_j)]_{\overline{w}}
{{< /math >}}
	这表明 {{< imath >}}A_{T+S}{{< /imath >}} 的每一列都是 {{< imath >}}A_T{{< /imath >}} 和 {{< imath >}}A_S{{< /imath >}} 对应列的和。根据矩阵加法定义
{{< math >}}
A_{T+S} = A_T + A_S \implies \Phi(T+S) = \Phi(T) + \Phi(S)
{{< /math >}}

2. 数乘：考察矩阵 {{< imath >}}A_{cT}{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列：
{{< math >}}
[(cT)(v_j)]_{\overline{w}} = [c \cdot T(v_j)]_{\overline{w}} = c \cdot [T(v_j)]_{\overline{w}}
{{< /math >}}
	这表明 {{< imath >}}A_{cT}{{< /imath >}} 的每一列都是 {{< imath >}}A_T{{< /imath >}} 对应列的 {{< imath >}}c{{< /imath >}} 倍。根据矩阵数乘定义：
{{< math >}}
A_{cT} = c A_T \implies \Phi(cT) = c \Phi(T)
{{< /math >}}
故该映射为线性变换。

## Exercise 3

根据过渡矩阵定义，新基 {{< imath >}}v'{{< /imath >}} 是旧基 {{< imath >}}v{{< /imath >}} 的线性组合：{{< imath >}}v'_j = \sum_{i=1}^n M_{ij} v_i{{< /imath >}}。 对 {{< imath >}}v'_j{{< /imath >}} 施加 {{< imath >}}T{{< /imath >}}，就有
{{< math >}}
T(v'_j) = T(\sum_{i} M_{ij} v_i) = \sum_{i} M_{ij} T(v_i)
{{< /math >}}
这正是矩阵乘法 {{< imath >}}[T(v_1)\dots T(v_n)] \times M_{j}{{< /imath >}}。将所有结果合并即可，证毕。

## Exercise 4

我们需要计算 {{< imath >}}T_{id}{{< /imath >}} 作用在定义域基向量 {{< imath >}}v'_j{{< /imath >}} 上，并表示为值域基 {{< imath >}}v{{< /imath >}} 的坐标。
{{< math >}}
T_{id}(v'_j) = v'_j
{{< /math >}}
因为 {{< imath >}}M{{< /imath >}} 是 {{< imath >}}v \to v'{{< /imath >}} 的过渡矩阵，意味着 {{< imath >}}v'_j = \sum_{i} M_{ij} v_i{{< /imath >}}。

所以 {{< imath >}}v'_j{{< /imath >}} 在基 {{< imath >}}v{{< /imath >}} 下的坐标正是 {{< imath >}}M{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列。因此该矩阵就是 {{< imath >}}M{{< /imath >}}。

## Exercise 5

定义矩阵 {{< imath >}}V = [v_1, v_2, v_3]{{< /imath >}} 和 {{< imath >}}V' = [v'_1, v'_2, v'_3]{{< /imath >}}。

过渡矩阵 {{< imath >}}M{{< /imath >}} 满足 {{< imath >}}V' = VM{{< /imath >}}（即 {{< imath >}}v'_j{{< /imath >}} 在 {{< imath >}}v{{< /imath >}} 下的坐标），解得 {{< imath >}}M = V^{-1}V'{{< /imath >}}。

经过高斯消元得到

{{< math >}}
M = \begin{pmatrix} -2 & -1.5 & 1.5 \\ 1 & 1.5 & 1.5 \\ 1 & 0.5 & -2.5 \end{pmatrix}
{{< /math >}}

计算各情形下的矩阵 {{< imath >}}A_T{{< /imath >}}。

**Case 1**：基 {{< imath >}}\overline{v} \to \overline{v}{{< /imath >}}

第 {{< imath >}}j{{< /imath >}} 列为 {{< imath >}}[T(v_j)]_{\overline{v}}{{< /imath >}}。{{< imath >}}[T(v_j)]_{\overline{v}} = [v'_j]_{\overline{v}}{{< /imath >}}。这正是 {{< imath >}}M{{< /imath >}} 的定义。

{{< math >}}
A_1 = M = \begin{pmatrix} -2 & -1.5 & 1.5 \\ 1 & 1.5 & 1.5 \\ 1 & 0.5 & -2.5 \end{pmatrix}
{{< /math >}}

**Case 2**： 基 {{< imath >}}\overline{v} \to \overline{v}'{{< /imath >}}

第 {{< imath >}}j{{< /imath >}} 列为 {{< imath >}}[T(v_j)]_{\overline{v}'}{{< /imath >}}。{{< imath >}}[T(v_j)]_{\overline{v}'} = [v'_j]_{\overline{v}'}{{< /imath >}}。向量在自身基下的坐标为标准单位向量 {{< imath >}}e_j{{< /imath >}}。
{{< math >}}
A_2 = I = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}
{{< /math >}}

**Case 3**： 基 {{< imath >}}\overline{v}' \to \overline{v}{{< /imath >}}

第 {{< imath >}}j{{< /imath >}} 列为 {{< imath >}}[T(v'_j)]_{\overline{v}}{{< /imath >}}。由于 {{< imath >}}T(v_k)=v'_k{{< /imath >}}，且 {{< imath >}}T{{< /imath >}} 是线性的，则 {{< imath >}}T{{< /imath >}} 将 {{< imath >}}v{{< /imath >}} 空间的向量映射为 {{< imath >}}v'{{< /imath >}} 空间中具有相同系数的向量。
{{< math >}}
[T(v'_j)]_{\overline{v}} = [T(\sum_k M_{kj}v_k)]_{\overline{v}} = [\sum_k M_{kj}T(v_k)]_{\overline{v}} = [\sum_k M_{kj}v'_k]_{\overline{v}}
{{< /math >}}
这相当于用 {{< imath >}}M{{< /imath >}} 对 {{< imath >}}M{{< /imath >}} 的列再做一次线性组合，即 {{< imath >}}A_3 = M \cdot M = M^2{{< /imath >}}。

{{< math >}}
A_3 = M^2 = \begin{pmatrix} 4 & 1.5 & -9 \\ 1 & 1.5 & 0 \\ -4 & -2 & 8.5 \end{pmatrix}
{{< /math >}}

**Case 4**： 基 {{< imath >}}\overline{v}' \to \overline{v}'{{< /imath >}}

第 {{< imath >}}j{{< /imath >}} 列为 {{< imath >}}[T(v'_j)]_{\overline{v}'}{{< /imath >}}。{{< imath >}}[T(v'_j)]_{\overline{v}'} = [\sum_k M_{kj} v'_k]_{\overline{v}'}{{< /imath >}}。其坐标即为 {{< imath >}}M{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 列。

{{< math >}}
A_4 = M = \begin{pmatrix} -2 & -1.5 & 1.5 \\ 1 & 1.5 & 1.5 \\ 1 & 0.5 & -2.5 \end{pmatrix}
{{< /math >}}

## Exercise 6

设 {{< imath >}}x{{< /imath >}} 为 {{< imath >}}V{{< /imath >}} 中向量的坐标，{{< imath >}}y{{< /imath >}} 为 {{< imath >}}W{{< /imath >}} 中向量的坐标。

对于 {{< imath >}}x{{< /imath >}}，变换后的坐标 {{< imath >}}x'{{< /imath >}} 满足 {{< imath >}}x=Mx'{{< /imath >}}。对于 {{< imath >}}y{{< /imath >}}，变换后的坐标 {{< imath >}}y'{{< /imath >}} 满足 {{< imath >}}y=Ny'\implies y'=N^{-1}y{{< /imath >}}。根据线性变换关系，有
{{< math >}}

y=A_{1}x,y'=A_{2}x'

{{< /math >}}
带入就得到了
{{< math >}}

y'=N^{-1}y=N^{-1}(A_{1}x)=N^{-1}A_{1}Mx'

{{< /math >}}
从而证明了
{{< math >}}

A_{2}=N^{-1}A_{1}M

{{< /math >}}

