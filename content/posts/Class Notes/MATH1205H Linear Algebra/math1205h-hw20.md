---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-12-09T22:58:00+08:00'
title: MATH1205H HW20
categories:
- course-note
---
## Exercise 1

根据对偶变换的定义
{{< math >}}

(T'(L))(v) = L(T(v))

{{< /math >}}
带入 {{< imath >}}T(v)=v{{< /imath >}}，就有
{{< math >}}

(T'(L))(v) = L(v)

{{< /math >}}
由于这对所有 {{< imath >}}v \in V{{< /imath >}} 均成立，从而 {{< imath >}}T'(L){{< /imath >}} 和 {{< imath >}}L{{< /imath >}} 是一个函数，因为输入输出完全相同，因此 {{< imath >}}T'(L)=L{{< /imath >}}，是恒等变换。

## Exercise 2

先证充分性，如果 {{< imath >}}T=\mathbf{0}{{< /imath >}}，那么对于任意 {{< imath >}}v \in V{{< /imath >}}，都有 {{< imath >}}T(v)=\vec{0}{{< /imath >}}。根据定义
{{< math >}}

(T'(L))(v) = L(T(v)) = 0

{{< /math >}}
说明 {{< imath >}}T'(L){{< /imath >}} 是零泛函，从而 {{< imath >}}T'=\mathbf{0}{{< /imath >}}。

如果 {{< imath >}}T'=\mathbf{0}{{< /imath >}}，那么对于任意 {{< imath >}}L\in W'{{< /imath >}}，{{< imath >}}T'(L){{< /imath >}} 是 {{< imath >}}V{{< /imath >}} 上的零泛函。带入定义就有
{{< math >}}

L(T(v)) =(T'(L))(v) = 0

{{< /math >}}
由于对所有的线性泛函均成立，那么可以证明 {{< imath >}}T(v)=\vec{0}{{< /imath >}}。否则将 {{< imath >}}T(v)=w{{< /imath >}} 扩充为 {{< imath >}}W{{< /imath >}} 的一组基，定义 {{< imath >}}L{{< /imath >}} 只在 {{< imath >}}w{{< /imath >}} 上为 {{< imath >}}1{{< /imath >}}，否则为 {{< imath >}}0{{< /imath >}}，这样就构造出了一个不符合的 {{< imath >}}L{{< /imath >}}，因此矛盾。从而 {{< imath >}}T(v)=\vec{0}{{< /imath >}} 对所有 {{< imath >}}v{{< /imath >}} 均成立，也就有 {{< imath >}}T=\mathbf{0}{{< /imath >}}。

## Exercise 3

**(1)**

对于任意 {{< imath >}}L\in W'{{< /imath >}} 和 {{< imath >}}v\in V{{< /imath >}}，有
{{< math >}}

\begin{align*}
((S+T)'(L))(v) & = L((S+T)(v)) \\
 & = L(S(v) + T(v))  \\
 & = L(S(v)) + L(T(v)) \\
 & = (S'(L)(v)) + (T'(L))(v) \\
 & = ((S'+T')(L))(v)
\end{align*}

{{< /math >}}
**(2)**
{{< math >}}

\begin{align*}
((cT)'(L))(v) & = L((cT)(v)) \\
 & = L(c\cdot T(v)) \\
 & = c\cdot L(T(v)) \\
 & = c\cdot(T'(L))(v) \\
 & = (cT'(L))(v)
\end{align*}

{{< /math >}}
**(3)**

设 {{< imath >}}L\in W'{{< /imath >}} 和 {{< imath >}}u\in U{{< /imath >}}，有
{{< math >}}

\begin{align*}
((S'T')(L))(u) & = (S'(T'(L)))(u) \\
 & = (T'(L))(S(u)) \\
 & = L(T(S(u))) \\
 & = L((TS)(u)) \\
 & = ((TS)'(L))(u)
\end{align*}

{{< /math >}}
## Exercise 4

考虑采用 {{< imath >}}(\text{ii}){{< /imath >}} 中的思路。

构造 {{< imath >}}V''=(V')'{{< /imath >}} 为 {{< imath >}}V'{{< /imath >}} 的对偶空间。定义映射 {{< imath >}}\Phi:V\to V''{{< /imath >}}，对于任意 {{< imath >}}v\in V{{< /imath >}}，{{< imath >}}\Phi(v){{< /imath >}} 是 {{< imath >}}V'{{< /imath >}} 上的一个泛函，定义为
{{< math >}}

\forall L\in V',\quad (\Phi(v))(L) = L(v)

{{< /math >}}
由于对于任意 {{< imath >}}u,v\in V{{< /imath >}} 和标量 {{< imath >}}c\in \mathbb{F}{{< /imath >}}，以及任意 {{< imath >}}L\in V'{{< /imath >}}，有
{{< math >}}

\begin{align*}
\Phi(cu+v)(L) & = L(cu+v) \\
 & = cL(u)+L(v) \\
 & = c[\Phi(u)(L)] + \Phi(v)(L) \\
 & = (c\Phi(u)+\Phi(v))(L)
\end{align*}

{{< /math >}}
从而 {{< imath >}}\Phi{{< /imath >}} 是一个线性变换。

接着证明 {{< imath >}}\Phi{{< /imath >}} 是一个双射。假设 {{< imath >}}\Phi(v)=\mathbf{0}_{V''}{{< /imath >}}，为 {{< imath >}}V'{{< /imath >}} 上的零泛函，那么对于所有 {{< imath >}}L\in V'{{< /imath >}} 都有 {{< imath >}}L(v)=0{{< /imath >}}，从而必然有 {{< imath >}}v=\mathbf{0}_{V}{{< /imath >}}，否则取 {{< imath >}}V'{{< /imath >}} 的一组基即可推出矛盾。因此 {{< imath >}}\text{Ker}(\Phi)=\{ \mathbf{0}_{V} \}{{< /imath >}}，{{< imath >}}\Phi{{< /imath >}} 是一个单射。并且由于空间是有限维的，而且 {{< imath >}}\text{dim}(V'')=\text{dim}(V')=\text{dim}(V)=n{{< /imath >}}，一个映射前后维数相同的单射必然是一个双射。

综上证明了 {{< imath >}}\Phi{{< /imath >}} 是一个可逆线性变换。

我们已知 {{< imath >}}\{ L_{1},\dots,L_{n} \}{{< /imath >}} 是 {{< imath >}}V'{{< /imath >}} 的一组基。那么根据对偶基的存在性，{{< imath >}}V''{{< /imath >}} 中存在唯一的一组基 {{< imath >}}\{ \phi_{1},\dots,\phi_{n} \}{{< /imath >}} 满足
{{< math >}}

\phi_{i}(L_{j}) = \mathbb{I}[i=j],\quad (1\leq  i,j \leq  n)

{{< /math >}}
已知 {{< imath >}}\Phi{{< /imath >}} 的逆映射 {{< imath >}}\Phi ^{-1}{{< /imath >}} 存在，那么定义
{{< math >}}

v_{i} = \Phi ^{-1}(\phi_{i}),\quad i \in[n]

{{< /math >}}
由于 {{< imath >}}\Phi{{< /imath >}} 是线性双射，从而保持了基的性质，也就有 {{< imath >}}\{ v_{1},\dots,v_{n} \}{{< /imath >}} 仍然是 {{< imath >}}V{{< /imath >}} 的一组基。

我们接着验证 {{< imath >}}L_{i}(v_{j})=\mathbb{I}[i=j]{{< /imath >}} 即可。根据定义
{{< math >}}

\Phi(v_{i})(L_{j}) = L_{j}(v_{i}) = \phi_{i}(L_{j}) = \mathbb{I}[i=j]

{{< /math >}}
证毕。
