---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-11-04T10:48:00+08:00'
title: MATH1205H HW12
categories:
- course-note
---
## Exercise 1

**解**

根据题设，平面法向量为 {{< imath >}}\mathbf{n}=(1,1,2){{< /imath >}}。我们观察出一组解 {{< imath >}}v_{1}=(1,-1,0){{< /imath >}}，再取
{{< math >}}

v_{2} = \mathbf{n}\times v_{1} = (2,2,-2)

{{< /math >}}
单位化得到
{{< math >}}

e_{1} = \dfrac{1}{\sqrt{ 2 }}(1,-1,0),\quad e_{2} = \dfrac{1}{\sqrt{ 3 }}(1,1,-1)

{{< /math >}}
## Exercise 2

**(1)**

我们取 {{< imath >}}q_{1}=(1,3,4,5,7){{< /imath >}}，利用 G-S 正交化，得到
{{< math >}}

q_{2} = \mathbf{b} - \dfrac{q_{1}\cdot \mathbf{b}}{\| q_{1} \| ^{2}}q_{1} = (-7,3,4,-5,1)

{{< /math >}}
再单位化得到
{{< math >}}

\mathbf{e}_{1} = \dfrac{1}{10}(1,3,4,5,7),\quad \mathbf{e}_{2} = \dfrac{1}{10}(-7,3,4,-5,1)

{{< /math >}}

**(2)**

实际上只需要求 {{< imath >}}y{{< /imath >}} 到平面的投影。根据 {{< imath >}}(1){{< /imath >}} 我们得到的一组标准正交基，我们就有投影为
{{< math >}}

p = (y\cdot e_{1})e_{1} + (y\cdot e_{2})e_{2} = \dfrac{1}{10}e_{1} - \dfrac{7}{10}e_{2} = \left( \dfrac{1}{2},-\dfrac{9}{50},-\dfrac{6}{25},\dfrac{2}{5},0 \right)

{{< /math >}}

## Exercise 3

**证**

对于第一个式子，根据性质 1，有
{{< math >}}

\Delta(a_{1},\dots,a_{i}+ca_{j},\dots,a_{n}) = \Delta(a_{1},\dots,a_{i},\dots,a_{n}) + c\Delta(a_{1},\dots,a_{j},\dots,a_{j},\dots,a_{n})

{{< /math >}}
根据性质 2，其中
{{< math >}}

\Delta(a_{1},\dots,a_{j},\dots,a_{j},\dots,a_{n}) = 0

{{< /math >}}
这样就得到了
{{< math >}}

\Delta(a_{1},\dots,a_{i}+ca_{j},\dots,a_{n}) = \Delta(a_{1},\dots,a_{i},\dots,a_{n})

{{< /math >}}

对于第二个式子，我们构造
{{< math >}}

\begin{align*}
S =  & \Delta(a_{1},\dots,a_{i},\dots,a_{j},\dots,a_{n}) \\
 & + \Delta(a_{1},\dots,a_{i},\dots,a_{i},\dots,a_{n}) \quad  (= 0) \\
 & + \Delta(a_{1},\dots,a_{j},\dots,a_{j},\dots,a_{n}) \quad (= 0) \\
 & + \Delta(a_{1},\dots,a_{j},\dots,a_{i},\dots,a_{n}) \\
= & \Delta(a_{1},\dots,a_{i},\dots,a_{j},\dots,a_{n}) \\
 & + \Delta(a_{1},\dots,a_{j},\dots,a_{i},\dots,a_{n})
\end{align*}

{{< /math >}}
我们只需要证明 {{< imath >}}S=0{{< /imath >}} 即可。

注意到
{{< math >}}

\Delta(a_{1},\dots,a_{i},\dots,a_{i}+a_{j},\dots,a_{n}) = 
\Delta(a_{1},\dots,a_{i},\dots,a_{j},\dots,a_{n}) + \Delta(a_{1},\dots,a_{i},\dots,a_{i},\dots,a_{n})

{{< /math >}}
以及
{{< math >}}

\Delta(a_{1},\dots,a_{j},\dots,a_{i}+a_{j},\dots,a_{n}) = 
\Delta(a_{1},\dots,a_{j},\dots,a_{i},\dots,a_{n}) + \Delta(a_{1},\dots,a_{j},\dots,a_{j},\dots,a_{n})

{{< /math >}}
这样就得到了
{{< math >}}

\begin{align*}
S =  & [\Delta(a_{1},\dots,a_{i},\dots,a_{j},\dots,a_{n}) \\
 & + \Delta(a_{1},\dots,a_{i},\dots,a_{i},\dots,a_{n})] \\
 & + [\Delta(a_{1},\dots,a_{j},\dots,a_{j},\dots,a_{n})  \\
 & + \Delta(a_{1},\dots,a_{j},\dots,a_{i},\dots,a_{n})] \\
= & \Delta(a_{1},\dots,a_{i},\dots,a_{i}+a_{j},\dots,a_{n})\\
 & + \Delta(a_{1},\dots,a_{j},\dots,a_{i}+a_{j},\dots,a_{n})
\end{align*}

{{< /math >}}

同时还有
{{< math >}}

\begin{align*}
& \Delta(a_{1},\dots,a_{i},\dots,a_{i}+a_{j},\dots,a_{n}) + \Delta(a_{1},\dots,a_{j},\dots,a_{i}+a_{j},\dots,a_{n}) \\
= & \Delta(a_{1},\dots,a_{i}+a_{j},\dots,a_{i}+a_{j},\dots,a_{n}) \\
= & 0
\end{align*}

{{< /math >}}
于是就得到 {{< imath >}}S=0{{< /imath >}}。

## Exercise 4

**证**

首先我们证明任意一个 {{< imath >}}n{{< /imath >}} 的排列 {{< imath >}}\sigma{{< /imath >}}，如果满足 {{< imath >}}\tau(\sigma)>0{{< /imath >}}，那么必然存在一对两个数相邻的逆序对。否则反证法，任意相邻的两个数都递增，那么就推出这是一个递增序列，与 {{< imath >}}\tau(\sigma)>0{{< /imath >}} 矛盾，因此必然存在两个数相邻的逆序对。

因此假设当前序列存在 {{< imath >}}\sigma(i)>\sigma(i+1){{< /imath >}}，那么我们就交换 {{< imath >}}i,i+1{{< /imath >}} 两列，这样就减少了一个逆序对（由于两个数相邻，因此对除此之外的逆序对没有影响）。我们重复这样的操作 {{< imath >}}\tau(\sigma){{< /imath >}} 次，每次减少一个逆序对，最终逆序对数量为零，就得到了序列 {{< imath >}}1,2,\dots,n{{< /imath >}}。

把这个过程应用在矩阵 {{< imath >}}[e_{\sigma(1)},\dots,e_{\sigma(n)}]{{< /imath >}} 上，最终就得到了 {{< imath >}}I{{< /imath >}}。


## Exercise 5

**(1)**

我们令
{{< math >}}

S = \{ i\in[n]\mid \sigma_{1}(i)\neq\sigma_{2}(i) \}

{{< /math >}}
根据题设有 {{< imath >}}\left| S \right|=2{{< /imath >}}，于是我们设 {{< imath >}}S=\{ i_{1},i_{2} \}{{< /imath >}}。

由于 {{< imath >}}\{ \sigma_{1}(i)\mid i\in[n] \}=\{ \sigma_{2}(i)\mid i\in[n] \}=[n]{{< /imath >}}，我们从中去掉所有的 {{< imath >}}i\not\in S{{< /imath >}}，就得到了
{{< math >}}

\{ \sigma_{1}(i_{1}),\sigma_{1}(i_{2}) \}=\{ \sigma_{2}(i_{1}),\sigma_{2}(i_{2}) \}

{{< /math >}}
再根据 {{< imath >}}S{{< /imath >}} 的定义，我们又有 {{< imath >}}\sigma_{1}(i_{1})\neq\sigma_{2}(i_{1}),\sigma_{1}(i_{2})\neq\sigma_{2}(i_{2}){{< /imath >}}，这就得到了
{{< math >}}

\sigma_{1}(i_{1})=\sigma_{2}(i_{2}),\sigma_{1}(i_{2})=\sigma_{2}(i_{1})

{{< /math >}}
其余的 {{< imath >}}i{{< /imath >}} 均有 {{< imath >}}\sigma_{1}(i)=\sigma_{2}(i){{< /imath >}}。这就是要证明的式子。

**(2)**

根据 {{< imath >}}(1){{< /imath >}}，不妨设 {{< imath >}}i_{1}< i_{2}{{< /imath >}}。我们只需要证明交换 {{< imath >}}i_{1},i_{2}{{< /imath >}} 下标，会改变的逆序对数量是奇数即可。

我们不妨设 {{< imath >}}\sigma_{1}(i_{1})< \sigma_{1}(i_{2}){{< /imath >}}，否则交换 {{< imath >}}\sigma_{1},\sigma_{2}{{< /imath >}} 即可。此时设满足 {{< imath >}}k\in(i_{1},i_{2})\land\sigma_{1}(k)\in(\sigma_{1}(i_{1}),\sigma_{1}(i_{2})){{< /imath >}} 的 {{< imath >}}k{{< /imath >}} 有 {{< imath >}}m{{< /imath >}} 个。那么交换 {{< imath >}}i_{1},i_{2}{{< /imath >}} 得到 {{< imath >}}\sigma_{2}{{< /imath >}} 后改变的逆序对数量为 {{< imath >}}1+2m{{< /imath >}}，其中 {{< imath >}}1{{< /imath >}} 为 {{< imath >}}(i_{1},i_{2}){{< /imath >}}，两个 {{< imath >}}m{{< /imath >}} 分别表示 {{< imath >}}(i_{1},k){{< /imath >}} 和 {{< imath >}}(k,i_{2}){{< /imath >}}。

所以我们就得到了
{{< math >}}

\tau(\sigma_{1})+1 \equiv \tau(\sigma_{2})\mod 2

{{< /math >}}
从而
{{< math >}}

(-1)^{\tau(\sigma_{2})} = (-1)^{\tau(\sigma_{1})+1}

{{< /math >}}
## Exercise 6

**(1)**

如果 {{< imath >}}\sigma_{1}\neq\sigma_{2}{{< /imath >}}，那么我们每次都取最小的满足 {{< imath >}}\sigma_{1}(i)\neq\sigma_{2}(i){{< /imath >}} 的 {{< imath >}}i{{< /imath >}}，并且设 {{< imath >}}\sigma_{1}(j)=\sigma_{2}(i){{< /imath >}}，那么我们交换 {{< imath >}}i,j{{< /imath >}} 得到 {{< imath >}}\sigma_{1}'{{< /imath >}}，此时 {{< imath >}}\sigma_{1}'{{< /imath >}} 和 {{< imath >}}\sigma_{2}{{< /imath >}} 满足在 {{< imath >}}k\leq i{{< /imath >}} 时都有 {{< imath >}}\sigma_{1}'(k)=\sigma_{2}(k){{< /imath >}}，减少了一个不同的位置。

我们经过有限次这样的 swap 操作，直到 {{< imath >}}\sigma_{1}'=\sigma_{2}{{< /imath >}}，这样就从 {{< imath >}}\sigma_{1}{{< /imath >}} 得到了 {{< imath >}}\sigma_{2}{{< /imath >}}。

**(2)**

根据 Ex5 中 {{< imath >}}(2){{< /imath >}} 的结论，我们直到每次 swap 操作后都有 {{< imath >}}\tau(\sigma')\equiv \tau(\sigma)+1\pmod 2{{< /imath >}}，因此假设经过了 {{< imath >}}k{{< /imath >}} 次操作得到 {{< imath >}}\sigma_{2}{{< /imath >}}，那么我们就有
{{< math >}}

\tau(\sigma_{2})\equiv \tau(\sigma_{1})+k\mod 2

{{< /math >}}
从而就得到了
{{< math >}}

k\equiv \tau(\sigma_{1})+\tau(\sigma_{2})\mod 2

{{< /math >}}
## Exercise 7

根据 Ex3，我们设 {{< imath >}}A=(a_{1},a_{2},\dots,a_{n}){{< /imath >}}，利用 {{< imath >}}\det{{< /imath >}} 的定义，我们有
{{< math >}}

\begin{align*}
\det(a_{1},\dots,a_{i}+\lambda a_{i}',\dots,a_{n}) & = \sum_{\sigma \in \text{Perm}(n)}(-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots(\alpha_{\sigma(i),i} + \lambda\alpha'_{\sigma(i),i})\dots\alpha_{\sigma(n),n} \\
 & = \sum_{\sigma \in \text{Perm}(n)}(-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots\alpha_{\sigma(n),n} + \lambda\sum_{\sigma \in \text{Perm}(n)}(-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots \alpha'_{\sigma(i),i}\dots\alpha_{\sigma(n),n} \\
 & = \det(a_{1},\dots,a_{n}) + \lambda \det(a_{1},\dots,a_{i}',\dots,a_{n})
\end{align*}

{{< /math >}}
满足 Ex3 中的性质 {{< imath >}}1{{< /imath >}}。

我们接着证明满足性质 {{< imath >}}2{{< /imath >}}，也就是如果 {{< imath >}}a_{i}=a_{j}{{< /imath >}}，那么 {{< imath >}}\det A=0{{< /imath >}}。对于任意一个 {{< imath >}}\sigma \in\text{Perm}(n){{< /imath >}}，我们考虑交换其 {{< imath >}}i,j{{< /imath >}} 下标，得到 {{< imath >}}\text{swap}(\sigma)=\sigma'{{< /imath >}}，也就是 {{< imath >}}\sigma(i)=\sigma'(j),\sigma(j)=\sigma'(i){{< /imath >}}。根据 Ex5 的结论，我们有 {{< imath >}}(-1)^{\tau(\sigma)}+(-1)^{\tau(\sigma')}=0{{< /imath >}}。又因为 {{< imath >}}a_{i}=a_{j}{{< /imath >}}，我们带入求和中 {{< imath >}}\sigma{{< /imath >}} 对应的这一项，就得到了
{{< math >}}

\begin{align*}
 & (-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots \alpha_{\sigma(i),i}\dots \alpha_{\sigma(j),j}\dots\alpha_{\sigma(n),n} \\
 & +(-1)^{\tau(\sigma')}\alpha_{\sigma'(1),1}\dots \alpha_{\sigma'(i),i}\dots \alpha_{\sigma'(j),j}\dots\alpha_{\sigma'(n),n} \\
= & (-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots \alpha_{\sigma(i),i}\dots \alpha_{\sigma(j),j}\dots\alpha_{\sigma(n),n} \\
 & - (-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots \alpha_{\sigma(j),i}\dots \alpha_{\sigma(i),j}\dots\alpha_{\sigma(n),n} \\
= & (-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots \alpha_{\sigma(i),i}\dots \alpha_{\sigma(j),j}\dots\alpha_{\sigma(n),n} \\
 & +(-1)^{\tau(\sigma)}\alpha_{\sigma(1),1}\dots \alpha_{\sigma(j),j}\dots \alpha_{\sigma(i),i}\dots\alpha_{\sigma(n),n} \\
= & 0
\end{align*}

{{< /math >}}
也就是 {{< imath >}}\prod_{\sigma}+\prod_{\sigma'}=0{{< /imath >}}。

并且如果 {{< imath >}}\sigma_{1}\neq\sigma_{2}{{< /imath >}}，那么显然有 {{< imath >}}\text{swap}(\sigma_{1})\neq\text{swap}(\sigma_{2}){{< /imath >}}。进一步可以证明 {{< imath >}}\text{swap}{{< /imath >}} 操作是一个双射。

所以如果 {{< imath >}}a_{i}=a_{j}{{< /imath >}}，那么
{{< math >}}

\begin{align*}
\det A+\det A & = \sum_{\sigma \in\text{Perm(n)}} + \sum_{\sigma'\in\text{Perm}(n)} \\
 & = \sum_{\sigma \in\text{Perm}(n)}\left( \prod_{\sigma} + \prod_{\text{swap}(\sigma)} \right) \\
 & = 0
\end{align*}

{{< /math >}}
从而证明了 {{< imath >}}\det A=0{{< /imath >}}。

从而根据 Ex3，就证明了在列加法下保持不变性。

## Exercise 8

**证**

设 {{< imath >}}A=(a_{ij})\in M_n{{< /imath >}}。记余子式 {{< imath >}}M_{jk}{{< /imath >}} 为删去第 {{< imath >}}j{{< /imath >}} 行第 {{< imath >}}k{{< /imath >}} 列后的行列式，余因子
{{< math >}}

C_{jk}=(-1)^{j+k}M_{jk},\qquad 
A^*=\operatorname{adj}(A)=(C_{jk})^{\mathsf T}.

{{< /math >}}
我们证明 {{< imath >}}AA^*=\det(A)I{{< /imath >}}。

计算第 {{< imath >}}(i,j){{< /imath >}} 个元素
{{< math >}}

(AA^*)_{ij}=\sum_{k=1}^n a_{ik}\,A^*_{kj}
=\sum_{k=1}^n a_{ik}\,C_{jk}.

{{< /math >}}
**当 {{< imath >}}i=j{{< /imath >}} 时**，这正是按第 {{< imath >}}i{{< /imath >}} 行的拉普拉斯展开
{{< math >}}

\sum_{k=1}^n a_{ik}C_{ik}=\det(A).

{{< /math >}}

**当 {{< imath >}}i\ne j{{< /imath >}} 时**，将 {{< imath >}}A{{< /imath >}} 的第 {{< imath >}}j{{< /imath >}} 行用第 {{< imath >}}i{{< /imath >}} 行替换得矩阵 {{< imath >}}B{{< /imath >}}。此时 {{< imath >}}B{{< /imath >}} 有两行相同，{{< imath >}}\det(B)=0{{< /imath >}}。但按第 {{< imath >}}j{{< /imath >}} 行对 {{< imath >}}\det(B){{< /imath >}} 做拉普拉斯展开，
{{< math >}}

0=\det(B)=\sum_{k=1}^n a_{ik}\,C_{jk}.

{{< /math >}}
因而 {{< imath >}}(AA^*)_{ij}=0{{< /imath >}}。

综上，{{< imath >}}(AA^*)_{ij}=\det(A){{< /imath >}} 当 {{< imath >}}i=j{{< /imath >}}，否则为 {{< imath >}}0{{< /imath >}}，即
{{< math >}}

AA^*=\det(A)\,I.

{{< /math >}}
证毕。
