---
tags:
- learning
- math
- homework
- probability-theory
discipline: mathematics
publish: true
date: '2025-10-24T13:10:00+08:00'
title: MATH2701 HW3
categories:
- course-note
---
[题目](https://notes.sjtu.edu.cn/s/_-B0cVjkY)
## Problem 1.1

**(1)**

**证**：若 {{< imath >}}\sigma{{< /imath >}}-代数包含所有 {{< imath >}}(a,b){{< /imath >}}，则包含 {{< imath >}}[a,b]{{< /imath >}}。
{{< math >}}
[a,b] = \bigcap_{n=1}^{\infty} \left(a-\frac{1}{n}, b+\frac{1}{n}\right)
{{< /math >}}
由 {{< imath >}}\sigma{{< /imath >}}-代数对可数交封闭，故 {{< imath >}}[a,b]{{< /imath >}} 在其中。

**证**：若 {{< imath >}}\sigma{{< /imath >}}-代数包含所有 {{< imath >}}[a,b]{{< /imath >}}，则包含 {{< imath >}}(a,b){{< /imath >}}。
{{< math >}}
（a,b) = \bigcup_{n=1}^{\infty} \left[a+\frac{1}{n}, b-\frac{1}{n}\right]
{{< /math >}}
由 {{< imath >}}\sigma{{< /imath >}}-代数对可数并封闭，故 {{< imath >}}(a,b){{< /imath >}} 在其中。

**(2)**

**证**：若 σ-代数包含所有 {{< imath >}}(a,b){{< /imath >}}，则包含 {{< imath >}}[x,\infty){{< /imath >}}。
{{< math >}}
[x,\infty) = \bigcap_{n=1}^{\infty} \left(x-\frac{1}{n}, \infty\right) = \bigcap_{n=1}^{\infty} \bigcup_{m=1}^{\infty} \left(x-\frac{1}{n}, m\right)
{{< /math >}}
由 {{< imath >}}\sigma{{< /imath >}}-代数对可数并、可数交封闭，故 {{< imath >}}[x,\infty){{< /imath >}} 在其中。

**证**：若 {{< imath >}}\sigma{{< /imath >}}-代数包含所有 {{< imath >}}[x,\infty){{< /imath >}}，则包含 {{< imath >}}(a,b){{< /imath >}}。
{{< math >}}
(a,b) = [a,\infty) \cap (-\infty,b] = [a,\infty) \cap \mathbb{R}\setminus[b,\infty)
{{< /math >}}
由 {{< imath >}}\sigma{{< /imath >}}-代数对补集和交运算封闭，故 {{< imath >}}(a,b){{< /imath >}} 在其中。

## Problem 1.2

由于 {{< imath >}}\mathbb{Q}{{< /imath >}} 是可数集，因此我们设 {{< imath >}}\mathbb{Q}=\{ q_{1},q_{2},\dots, \}{{< /imath >}}。

对于任意 {{< imath >}}\varepsilon>0{{< /imath >}}，我们构造 {{< imath >}}\mathbb{Q}{{< /imath >}} 的一个开覆盖
{{< math >}}

I = \bigcup_{n\geq  1}\left( q_{n}-\dfrac{\varepsilon}{2^{n+1}},q_{n}+ \dfrac{\varepsilon}{2^{n+1}} \right)

{{< /math >}}
于是我们有 {{< imath >}}\mathbb{Q}\subset I_{n}{{< /imath >}}，从而
{{< math >}}

\lambda(\mathbb{Q}) \leq  \lambda(I) = \sum_{n=1}^{\infty} \dfrac{\varepsilon}{2^{n}} = \varepsilon

{{< /math >}}
这样我们就得到了 {{< imath >}}\lambda(\mathbb{Q})=0{{< /imath >}}。

## Problem 2

**(1)**

注意到每个 {{< imath >}}\omega = (\omega_1, \omega_2, \ldots) \in \Omega{{< /imath >}} 的前 {{< imath >}}n{{< /imath >}} 位 {{< imath >}}(\omega_1, \ldots, \omega_n){{< /imath >}} 唯一确定一个 {{< imath >}}s \in {0,1}^n{{< /imath >}}，使得 {{< imath >}}\omega \in C_s{{< /imath >}}。

因此满足
- **互不相交**：若 {{< imath >}}s \neq t{{< /imath >}}，则 {{< imath >}}C_s \cap C_t = \emptyset{{< /imath >}}（否则存在 {{< imath >}}\omega{{< /imath >}} 前 {{< imath >}}n{{< /imath >}} 位同时为 {{< imath >}}s{{< /imath >}} 和 {{< imath >}}t{{< /imath >}}，矛盾）
- **覆盖全集**：{{< imath >}}\bigcup_{s\in{0,1}^n} C_s = \Omega{{< /imath >}}（每个 {{< imath >}}\omega{{< /imath >}} 的前 {{< imath >}}n{{< /imath >}} 位必为某个 {{< imath >}}s{{< /imath >}}）

故 {{< imath >}}{C_s}_{s\in{0,1}^n}{{< /imath >}} 构成 {{< imath >}}\Omega{{< /imath >}} 的分划。

**(2)**

由于 {{< imath >}}\sigma{{< /imath >}}-代数的性质，我们知道 {{< imath >}}\mathcal{F}{{< /imath >}} 中的集合可以唯一的表示为一些 {{< imath >}}C_{s}{{< /imath >}} 的并。也就是对于 {{< imath >}}A\in \mathcal{F}{{< /imath >}}，必然有
{{< math >}}

A=\bigcup_{s \in S}C_{s}, \quad S = \{ s \in \{ 0,1 \}^{n}:C_{s}\subseteq A \}

{{< /math >}}
于是我们就可以构造映射
{{< math >}}

f:\mathcal{F}_{n} \to 2^{\{ 0,1 \}^{n}} ,f(A) = \{ s \in \{ 0,1 \}^{n}:C_{s}\subseteq A \}

{{< /math >}}
以及逆映射
{{< math >}}

f^{-1}: 2^{\{ 0,1 \}^{n}} \to \mathcal{F}_{n},f^{-1}(S) = \bigcup_{s \in S}C_{s}

{{< /math >}}
我们容易验证 {{< imath >}}f{{< /imath >}} 是单射和满射的性质，可以利用在 {{< imath >}}(1){{< /imath >}} 中证明的分划的性质。

**(3)**

根据 {{< imath >}}(2){{< /imath >}} 的性质，我们证明 {{< imath >}}\mathcal{F}_{i}\subset \mathcal{F}_{j}{{< /imath >}} 等价于证明 {{< imath >}}2^{\{ 0,1 \}^{i}}\subset 2^{\{ 0,1 \}^{j}}{{< /imath >}}。

我们设 {{< imath >}}T_{n}=\{ 0,1,2,\dots,2^{n-1} \}{{< /imath >}}，显然如果把集合 {{< imath >}}\{ 0,1 \}^{n}{{< /imath >}} 中的元素看成数的二进制，就能得到和 {{< imath >}}T_{n}{{< /imath >}} 的双射。对于 {{< imath >}}i< j{{< /imath >}}，显然 {{< imath >}}S_{i}\subset S_{j}{{< /imath >}} 成立，从而 {{< imath >}}2^{S_{i}}\subset 2^{S_{j}}{{< /imath >}} 成立。我们再把数字重新变成二进制表示，就得到了
{{< math >}}

2^{\{ 0,1 \}^{i}}\subset 2^{\{ 0,1 \}^{j}}

{{< /math >}}
**(4)**

我们依次验证 {{< imath >}}\mathcal{F}_{\infty}{{< /imath >}} 符合代数的三个性质。首先由于每个 {{< imath >}}\mathcal{F}_{i}{{< /imath >}} 都是代数，因此它们的并显然也会包含 {{< imath >}}\Omega{{< /imath >}}。

接着证明关于补集封闭。设 {{< imath >}}A\in \mathcal{F}_{\infty}{{< /imath >}}，那么存在 {{< imath >}}N{{< /imath >}} 使得 {{< imath >}}A\in \mathcal{F}_{N}{{< /imath >}}。由于 {{< imath >}}\mathcal{F}_{N}{{< /imath >}} 是代数，所以 {{< imath >}}A^{c}\in \mathcal{F}_{N}{{< /imath >}}，从而 {{< imath >}}A^{c}\in \mathcal{F}_{\infty}{{< /imath >}}。

接着证明对于有限并运算封闭。对于任意 {{< imath >}}A,B\in \mathcal{F}_{\infty}{{< /imath >}}，存在 {{< imath >}}N_{1},N_{2}{{< /imath >}} 使得 {{< imath >}}A\in \mathcal{F}_{N_{1}},B\in \mathcal{F}_{N_{2}}{{< /imath >}}。那么就有 {{< imath >}}A\cup B\in \mathcal{F}_{N_{1}}\cup \mathcal{F}_{N_{2}}{{< /imath >}}。从而就有
{{< math >}}

A\cup B \in \mathcal{F}_{\infty}

{{< /math >}}
**(5)**

我们需要证明得到 {{< imath >}}\omega{{< /imath >}} 需要可数无限次交，这样就可以说明属于 {{< imath >}}\sigma{{< /imath >}}-代数但是不属于代数。

我们依次取 {{< imath >}}\omega{{< /imath >}} 的前 {{< imath >}}n{{< /imath >}} 位 {{< imath >}}S_{n}{{< /imath >}}，那么所有 {{< imath >}}C_{S_{n}}{{< /imath >}} 的交集就是 {{< imath >}}\{ \omega \}{{< /imath >}}，也就是
{{< math >}}

\{ \omega \} = \bigcap_{n \geq  1} C_{S_{n}}

{{< /math >}}
由于 {{< imath >}}\sigma{{< /imath >}}-代数对可数交封闭，因此 {{< imath >}}\{ \omega \}\in \mathcal{B}(\Omega){{< /imath >}}。

接着我们证明 {{< imath >}}\{ \omega \} \not\in \mathcal{F}_{\infty}{{< /imath >}}。由于 {{< imath >}}\mathcal{F}_{n}{{< /imath >}} 的元素是 {{< imath >}}C_{s}{{< /imath >}} 的有限并，而每个 {{< imath >}}C_{s}{{< /imath >}} 都不可数，因此它们的非空有限并也是不可数的，这就可以说明 {{< imath >}}\mathcal{F}_{\infty}{{< /imath >}} 中的非空元素也是不可数的。然而 {{< imath >}}\{ \omega \}{{< /imath >}} 中只有可数个元素，所以显然不属于 {{< imath >}}\mathcal{F}_{\infty}{{< /imath >}}。

综上，我们得到了
{{< math >}}

\{ \omega \} \in \mathcal{B}(\Omega)\setminus \mathcal{F}_{\infty}

{{< /math >}}
**(6)**

我们先证明存在性。对于任何 {{< imath >}}A \in \mathcal{F}_{\infty}{{< /imath >}}，根据其定义，存在某个 {{< imath >}}n \ge 1{{< /imath >}} 使得 {{< imath >}}A \in \mathcal{F}_n{{< /imath >}}。由 {{< imath >}}(5){{< /imath >}} 可知， {{< imath >}}\mathcal{F}_n{{< /imath >}} 中的每个集合 {{< imath >}}A{{< /imath >}} 都能唯一表示为 {{< imath >}}A = \bigcup_{s \in S} C_s{{< /imath >}}，其中 {{< imath >}}S \subseteq \{0,1\}^n{{< /imath >}}。令 {{< imath >}}k = |S|{{< /imath >}}，则 {{< imath >}}A = C_{s_1} \cup \cdots \cup C_{s_k}{{< /imath >}}，其中 {{< imath >}}s_i \in \{0,1\}^n{{< /imath >}}。

接着证明比值的唯一性。设 {{< imath >}}A{{< /imath >}} 有两种表示：
1. {{< imath >}}A=\bigcup_{i=1}^{k} C_{s_i}{{< /imath >}}，其中 {{< imath >}}s_i \in \{0,1\}^n{{< /imath >}} 且互不相同。
2. {{< imath >}}A=\bigcup_{j=1}^{m} C_{t_j}{{< /imath >}}，其中 {{< imath >}}t_j \in \{0,1\}^p{{< /imath >}} 且互不相同。

取 {{< imath >}}L=\max(n,p){{< /imath >}}。每个 {{< imath >}}C_s{{< /imath >}} (其中 {{< imath >}}s \in \{0,1\}^N{{< /imath >}}) 可被分解为 {{< imath >}}2^{L-N}{{< /imath >}} 个互不相交的 {{< imath >}}C_u{{< /imath >}} (其中 {{< imath >}}u \in \{0,1\}^L{{< /imath >}}) 的并。

将两种表示都扩展到级别 {{< imath >}}L{{< /imath >}}：
- {{< imath >}}A{{< /imath >}} 可表示为 {{< imath >}}k \cdot 2^{L-n}{{< /imath >}} 个互不相交的 {{< imath >}}C_u{{< /imath >}} (其中 {{< imath >}}u \in \{0,1\}^L{{< /imath >}}) 的并。
- {{< imath >}}A{{< /imath >}} 也可表示为 {{< imath >}}m \cdot 2^{L-p}{{< /imath >}} 个互不相交的 {{< imath >}}C_u{{< /imath >}} (其中 {{< imath >}}u \in \{0,1\}^L{{< /imath >}}) 的并。

由于这种在固定级别 {{< imath >}}L{{< /imath >}} 下的分解是唯一的，这两个数量必须相等：
{{< math >}}

k \cdot 2^{L-n} = m \cdot 2^{L-p} \implies \dfrac{k}{2^{n}} = \dfrac{m}{2^{p}}

{{< /math >}}
因此，比值 {{< imath >}}k/2^n{{< /imath >}} 对于给定的集合 {{< imath >}}A{{< /imath >}} 是唯一确定的。

## Problem 3

**(1)**

**证 1**

我们只需要对于任意的 {{< imath >}}a \in \mathbb{R}{{< /imath >}}，说明 {{< imath >}}[X_{1}X_{2}>a]\in \mathcal{F}{{< /imath >}} 即可，进而根据 {{< imath >}}\sigma{{< /imath >}}-代数的性质即可用 {{< imath >}}(a,+\infty){{< /imath >}} 拼出其他的集合。

不妨设 {{< imath >}}a>0{{< /imath >}}，其余情况同理。于是我们有
{{< math >}}

[X_{1}X_{2}>a] = \left( \bigcup_{r\in \mathbb{Q}\land r>0}\left( [X_{1}>r]\cap\left[ X_{2}> \dfrac{a}{r} \right] \right) \right) \cup \left( \bigcup_{r\in \mathbb{Q}\land r< 0}\left( [X_{1}< r]\cap\left[ X_{2} < \dfrac{a}{r} \right] \right) \right)

{{< /math >}}
对于其他情况，我们改变不等号方向即可。

从而 {{< imath >}}[X_{1}X_{2}>a]{{< /imath >}} 被分解成了一系列可数的 {{< imath >}}\mathcal{F}{{< /imath >}} 中的集合的交集，因此 {{< imath >}}[X_{1}X_{2}>a]\in \mathcal{F}{{< /imath >}}，也就说明了 {{< imath >}}X_{1}X_{2}{{< /imath >}} 是随机变量。

**证 2**

我们可以直接考虑
{{< math >}}

X_{1}X_{2} = \dfrac{1}{4}[(X_{1}+X_{2})^{2} - (X_{1}-X_{2})^{2}]

{{< /math >}}
并且平方和加减操作都不会改变可测性，因此 {{< imath >}}X_{1}X_{2}{{< /imath >}} 可测。

平方可测：令 {{< imath >}}Z=X^{2}{{< /imath >}}，那么 {{< imath >}}[Z>a]=[X>\sqrt{ a }]\in \mathcal{F}\quad(a>0){{< /imath >}}。

**(2)**

由于分解子集对于除法操作过于繁琐，所以我们考虑先证明倒数的可测性，再直接利用 {{< imath >}}(1){{< /imath >}} 的结论即可。

我们下面证明对于 {{< imath >}}X\neq 0{{< /imath >}}，那么 {{< imath >}}Z = 1/X{{< /imath >}} 是可测函数。

对于任意 {{< imath >}}a\in \mathbb{R}{{< /imath >}}，我们考虑 {{< imath >}}[Z>a]{{< /imath >}}。

若 {{< imath >}}a=0{{< /imath >}}，那么 {{< imath >}}[Z>0]=[X>0]\in \mathcal{F}{{< /imath >}}。

若 {{< imath >}}a>0{{< /imath >}}，那么
{{< math >}}

[Z>a] = [X>0]\cap [X< 1 / a]

{{< /math >}}
显然有 {{< imath >}}[Z>a]\in \mathcal{F}{{< /imath >}}。

若 {{< imath >}}a< 0{{< /imath >}}，那么
{{< math >}}

[Z< a] = ([X< 0]\cap [X> 1 / a]) \cup [X>0] \in \mathcal{F}

{{< /math >}}
综上，我们有 {{< imath >}}[Z>a]\in \mathcal{F}{{< /imath >}}，于是倒数可测。

从而利用 {{< imath >}}(1){{< /imath >}}，我们得到除法也是可测的。

**(3)**

对于任意的 {{< imath >}}a\in \mathbb{R}{{< /imath >}}：
{{< math >}}

[ Z>a ] = [ \mathrm{inf}_{n\geq 1}X_{n}>a ] = \bigcap_{n=1}^{\infty}[ X_{n}>a ]

{{< /math >}}
**(4)**

我们有
{{< math >}}

\lim\mathrm{inf}_{n\to \infty} X_{n} = \mathrm{sup}_{m\geq 1} \mathrm{inf}_{n\geq m}X_{n}

{{< /math >}}
令 {{< imath >}}Y_{m}:=\mathrm{inf}_{n\geq m}X_{n}{{< /imath >}}。由 {{< imath >}}(3){{< /imath >}} 我们知道 {{< imath >}}Y_{m}{{< /imath >}} 是一个随机变量，因此
{{< math >}}

[\mathrm{sup}_{m}Y_{m}>a] = \bigcup_{m=1}^{\infty}\{ Y_{m}>a \}

{{< /math >}}
从而得证。