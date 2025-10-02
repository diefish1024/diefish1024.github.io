---
tags:
- learning
- math
- combinatorics
- homework
discipline: mathematics
publish: true
date: '2025-09-24T20:50:00+08:00'
title: Combinatorics HW2
categories:
- course-note
---
## Problem 1

用生成函数求解递推式
{{< math >}}

a_{n} = 4a_{n-1} - 5a_{n-2} + 2a_{n-3}

{{< /math >}}
初始值为 {{< imath >}}a_{0}=0,a_{1}=3,a_{2}=7{{< /imath >}}。

**解**：

设数列 {{< imath >}}\{ a_{n} \}{{< /imath >}} 的生成函数为 {{< imath >}}F(x){{< /imath >}}，那么根据递推式和初值 {{< imath >}}a_{0}=0,a_{1}=3,a_{2}=7{{< /imath >}} 得到
{{< math >}}

F(x) = 4xF(x) - 5x^{2}F(x) + 2x^{3}F(x) + 3x - 5x^{2}

{{< /math >}}
得到
{{< math >}}

F(x) = \dfrac{5x^{2}-3x}{2x^{3}-5x^{2}+4x-1} = \dfrac{3x-5x^{2}}{(1-x)^{2}(1-2x)}

{{< /math >}}
我们希望分解成
{{< math >}}

\dfrac{A}{1-x} + \dfrac{B}{(1-x)^{2}} + \dfrac{C}{1-2x}

{{< /math >}}
待定系数可以解得
{{< math >}}

F(x) = \dfrac{-3}{1-x} + \dfrac{2}{(1-x)^{2}} + \dfrac{1}{1-2x}

{{< /math >}}
展开得到
{{< math >}}

F(x) = \sum_{n=0}^{\infty} (-3+2(n+1)+2^{n})x^{n}

{{< /math >}}
因此
{{< math >}}

a_{n} = -3+2(n+1)+2^{n} = 2^{n} + 2n - 1

{{< /math >}}

## Problem 2

**(1)**

设 {{< imath >}}f(n){{< /imath >}} 为集合 {{< imath >}}[n]{{< /imath >}} 中不包含两个连续数字的子集数量，求 {{< imath >}}f(n){{< /imath >}} 的递推关系。

**解**：


容易得到 {{< imath >}}f(0)=1,f(1)=2,f(2)=3,f(3)=\dots{{< /imath >}}。考虑集合 {{< imath >}}[n]=\{ 1,2,\dots,n \}{{< /imath >}}，如果选择的子集中包含 {{< imath >}}n{{< /imath >}}，那么一定不包含 {{< imath >}}n-1{{< /imath >}}，等价于从 {{< imath >}}[n-2]{{< /imath >}} 中选择；如果不包含 {{< imath >}}n{{< /imath >}}，那么等价于从 {{< imath >}}[n-1]{{< /imath >}} 中选择，因此 {{< imath >}}f(n)=f(n-1)+f(n-2){{< /imath >}}。这样就找出了 {{< imath >}}f(n){{< /imath >}} 的递推关系，进一步同理斐波那契数列，我们考虑求出通项。

设生成函数 {{< imath >}}F(x)=\sum_{n=0}^{\infty}f(n)x^{n}{{< /imath >}}，满足 {{< imath >}}F(x)=xF(x-1)+x^{2}F(x-2)+1+x{{< /imath >}}，解出
{{< math >}}

F(x) = \dfrac{1+x}{1-x-x^{2}} \xlongequal{\phi= \frac{1+\sqrt{ 5 }}{2},\psi= \frac{1-\sqrt{ 5 }}{2}} \dfrac{\phi^{2} / \sqrt{ 5 }}{1 - \phi x} - \dfrac{\psi^{2} / \sqrt{ 5 }}{1 - \psi x}

{{< /math >}}
展开得到
{{< math >}}

F(x) = \sum_{n=0}^{\infty} \left( \dfrac{\phi^{n+2}- \psi^{n+2}}{\sqrt{ 5 }} \right)x^{n}

{{< /math >}}
于是
{{< math >}}

f(n) = \dfrac{\phi^{n+2} - \psi^{n+2}}{\sqrt{ 5 }} = \dfrac{1}{\sqrt{ 5 }}\left( \left( \dfrac{1+\sqrt{ 5 }}{2} \right)^{n+2} - \left( \dfrac{1-\sqrt{ 5 }}{2} \right)^{n+2} \right)

{{< /math >}}

**(2)**

设 {{< imath >}}f(n,k){{< /imath >}} 为集合 {{< imath >}}[n]{{< /imath >}} 中不包含两个连续数字的 {{< imath >}}k{{< /imath >}} - 子集（大小为 {{< imath >}}k{{< /imath >}} 的子集）的数量。求 {{< imath >}}f(n,k){{< /imath >}} 的递推关系，找到一个合适的生成函数，并求出这些数本身。

**解**：

同理先考虑 {{< imath >}}f(n,k){{< /imath >}} 的递推关系。从 {{< imath >}}[n]{{< /imath >}} 中选出不包含连续数字的大小为 {{< imath >}}k{{< /imath >}} 的子集，如果选出的子集包含 {{< imath >}}n{{< /imath >}}，那么可以看成从 {{< imath >}}[n-2]{{< /imath >}} 中选取有 {{< imath >}}k-1{{< /imath >}} 个元素的子集，否则看成从 {{< imath >}}[n-1]{{< /imath >}} 中选出 {{< imath >}}k{{< /imath >}} 个元素，得到递推式
{{< math >}}

f(n,k)=f(n-2,k-1) + f(n-1,k)

{{< /math >}}
边界条件有 {{< imath >}}f(n,0)=1,f(n,k< 0)=f(n,k>n)=0{{< /imath >}}。

于是我们定义
{{< math >}}

F_{k}(x) = \sum_{n=0}^{\infty} f(n,k)x^{n}

{{< /math >}}
对于 {{< imath >}}k=0{{< /imath >}}，
{{< math >}}

F_{0}(x) = \sum_{n=0}^{\infty} x^{n} = \dfrac{1}{1-x}

{{< /math >}}
{{< imath >}}k\geq 1{{< /imath >}} 时
{{< math >}}

F_{k}(x) = \sum_{n=k}^{\infty} f(n,k)x^{n} = \sum_{n=k}^{\infty} f(n-1,k)x^{n} + \sum_{n=k}^{\infty} f(n-2,k-1)x^{n} = xF_{k}(x) + x^{2}F_{k-1}(x)

{{< /math >}}
于是
{{< math >}}

F_{k}(x) = \dfrac{x^{2}}{1-x}F_{k-1}(x) = \left( \dfrac{x^{2}}{1-x} \right)^{k}F_{0}(x) = \dfrac{x^{2k}}{(1-x)^{k+1}}

{{< /math >}}
现在需要从这个形式中提取出 {{< imath >}}f(n,k){{< /imath >}}。

根据广义二项式定理
{{< math >}}

\dfrac{1}{(1-x)^{k+1}} = \sum_{n=0}^{\infty} \binom{ n+k+1 }{ k } x^{n}

{{< /math >}}
带入即可得到
{{< math >}}

F_{k} = \sum_{n=0}^{\infty} \binom{ n+k+1 }{ k } x^{2k+n} \xlongequal{m=n+2k} \sum_{m=2k}^{\infty} \binom{ m-k+1 }{ k } x^{m}

{{< /math >}}

于是
{{< math >}}

f(n,k)=\binom{ n-k+1 }{ k } \quad (n\geq 2k)

{{< /math >}}
（显然 {{< imath >}}n< 2k-1{{< /imath >}} 时不可能找出不含两个连续数字，大小为 {{< imath >}}k{{< /imath >}} 的子集，结果符合直觉）


**(3)**

设 {{< imath >}}F_{n}{{< /imath >}} 为斐波那契数列的第 {{< imath >}}n{{< /imath >}} 项，证明
{{< math >}}

F_{n+1} = \sum_{k\geq 0}\binom{ k }{ n-k } 

{{< /math >}}
**证**：

由于斐波那契数列，有 {{< imath >}}F_{n+1}=F_{n}+F_{n-1}{{< /imath >}}，容易推导出其生成函数为 {{< imath >}}G(x) = \dfrac{1}{1-x-x^{2}}{{< /imath >}}。

现在考虑 {{< imath >}}h_{n}=\sum_{k\geq 0}\binom{ k }{ n-k }{{< /imath >}}，生成函数为 {{< imath >}}H(x)=\sum_{n=0}^{\infty}h_{n}x^{n}{{< /imath >}}，得到
{{< math >}}

H(x) = \sum_{n=0}^{\infty} \sum_{k=0 }^{\infty} \binom{ k }{ n-k }x^{n} \xlongequal{i=n-k} \sum_{n=0}^{\infty} \sum_{i=0 }^{\infty} \binom{ n-i }{ i }x^{n}

{{< /math >}}
结合上一问算出的结果
{{< math >}}

H(x) = \sum_{n=0}^{\infty} \sum_{i=0 }^{\infty} f(n,i)x^{n} = \sum_{i=0}^{\infty} \sum_{n=0}^{\infty} f(n,i)x^{n} = \sum_{k=0}^{\infty} \dfrac{x^{2k}}{(1-x)^{k+1}}

{{< /math >}}
进一步化简
{{< math >}}

\begin{align*}
H(x) & = \dfrac{1}{1-x}\sum_{k=0}^{\infty} \dfrac{x^{2k}}{(1-x)^{k}} \\
 & = \dfrac{1}{1-x}\sum_{k=0}^{\infty} \left( \dfrac{x^{2}}{1-x} \right)^{k} \\
 & = \dfrac{1}{1-x}\cdot \dfrac{1}{1-\dfrac{x^{2}}{1-x}} \\
 & = \dfrac{1}{1-x-x^{2}}=G(x)
\end{align*}

{{< /math >}}
因此 {{< imath >}}F_{n+1}=h_{n}{{< /imath >}}，证毕！


## Problem 3

**(1)**

对于任意正整数 {{< imath >}}n{{< /imath >}} 和 {{< imath >}}k{{< /imath >}}，定义 {{< imath >}}f(n, k){{< /imath >}} 如下：对于将 {{< imath >}}n{{< /imath >}} 写成**有序**的 {{< imath >}}k{{< /imath >}} 个非负整数之和的每一种方式，设 {{< imath >}}S{{< /imath >}} 为这 {{< imath >}}k{{< /imath >}} 个整数的乘积。那么 {{< imath >}}f(n, k){{< /imath >}} 是通过这种方式获得的所有 {{< imath >}}S{{< /imath >}} 的总和。请找到 {{< imath >}}f(n, k){{< /imath >}} 的合适生成函数，并求出这些数本身。

**证 1**

设 {{< imath >}}x_{1}+x_{2}+\dots+x_{k}=n{{< /imath >}}，我们需要 {{< imath >}}\prod_{i=1}^{k}x_{i}{{< /imath >}}。

对于 {{< imath >}}x_{i}{{< /imath >}}，它对求和的贡献就是 {{< imath >}}x_{i}{{< /imath >}}，所以我们考虑生成函数 {{< imath >}}\sum_{x_{i}=0}^{\infty}x_{i}z^{x_{i}}=\frac{z}{(1-z)^{2}}{{< /imath >}}。{{< imath >}}k{{< /imath >}} 个这样的变量叠加可以表示为
{{< math >}}

\left( \sum_{x_{1}=0}^{\infty} x_{1}z^{x_{1}} \right)\left( \sum_{x_{2}=0}^{\infty} x_{2}z^{x_{2}} \right)\dots\left( \sum_{x_{k}=0}^{\infty} x_{k}z^{x_{k}} \right) = \dfrac{z^{k}}{(1-z)^{2k}}

{{< /math >}}
展开以后就可以得到
{{< math >}}

\sum_{x_{1},\dots,x_{n}} \prod_{i=1}^{k}x_{i}\cdot z^{\sum x_{i}} = \sum_{n=1}^{\infty} f(n,k)z^{n} = \dfrac{z^{k}}{(1-z)^{2k}}

{{< /math >}}
因此 {{< imath >}}f(n,k){{< /imath >}} 的生成函数为
{{< math >}}

H_{k}(x) = \dfrac{x^{k}}{(1-x)^{2k}}

{{< /math >}}
由于
{{< math >}}

\dfrac{1}{(1-x)^{2k}} = \sum_{n=0}^{\infty} \binom{ n+2k }{ 2k-1 } x^{n}

{{< /math >}}
于是
{{< math >}}

H_{k}(x) = \sum_{n=0}^{\infty} \binom{ n+2k }{ 2k-1 } x^{n+k} \xlongequal{m=n+k} \sum_{m=k}^{\infty} \binom{ m+k }{ 2k-1 } x^{m}

{{< /math >}}
于是
{{< math >}}

f(n,k) = \binom{ n+k }{ 2k-1 } 

{{< /math >}}

**证 2**

考虑递推关系
{{< math >}}

f(n,k) = \begin{cases}
0 & ,k\geq n+1 \\
n & ,k = 1 \\
\sum_{r=0}^{n} rf(n-r,k-1) & ,\text{others}
\end{cases}

{{< /math >}}
于是设对应的生成函数为 {{< imath >}}H_{k}(x){{< /imath >}}。

首先
{{< math >}}

H_{1}(x) = \sum_{n=0}^{\infty} nx^{n} = \dfrac{x}{(1-x)^{2}}

{{< /math >}}
之后我们需要对 {{< imath >}}H_{k}(x){{< /imath >}} 建立递推关系：
{{< math >}}

\begin{align*}
H_{k}(x) & = \sum_{n=0}^{\infty} f(n,k)x^{n} = \sum_{n=0}^{\infty} \sum_{r=0}^{n} rf(n-r,k-1)x^{n} \\
 & \xlongequal{i=r,j=n-r} \sum_{i=0}^{\infty} \sum_{j=0}^{\infty} if(j,k-1)x^{i+j} \\
 & = \sum_{j=0}^{\infty} f(j,k-1)x^{j}\left( \sum_{i=0}^{\infty} ix^{i} \right) \\
 & = H_{1}(x)\cdot H_{k-1}(x)
\end{align*}

{{< /math >}}
于是
{{< math >}}

H_{k}(x) = \dfrac{x}{(1-x)^{2}}H_{k-1}(x) = \dfrac{x^{k}}{(1-x)^{2k}}

{{< /math >}}
后续步骤相同。

**(2)**

设 {{< imath >}}f(n, k, c){{< /imath >}} 为将 {{< imath >}}n{{< /imath >}} 写成**有序**的 {{< imath >}}k{{< /imath >}} 个整数之和的方式数量，其中每个整数至少为 {{< imath >}}c{{< /imath >}}。请找到 {{< imath >}}f(n, k, c){{< /imath >}} 的合适生成函数，并求出这些数本身。

**证**：

同理 {{< imath >}}(1){{< /imath >}} ，由于此时需要的是计数，每个值的贡献都是 {{< imath >}}1{{< /imath >}}，因此对于 {{< imath >}}x_{i}{{< /imath >}} 的生成函数为 {{< imath >}}\sum_{x_{i}=c}^{\infty}z^{x_{i}} = \dfrac{z^{c}}{1-z}{{< /imath >}}
因此 {{< imath >}}k{{< /imath >}} 个变量叠加表示为
{{< math >}}

\left( \sum_{x_{1}=c}^{\infty} z^{x_{1}} \right)\left( \sum_{x_{2}=c}^{\infty} z^{x_{2}} \right)\dots\left( \sum_{x_{k}=c}^{\infty} z^{x_{k}} \right) = \dfrac{z^{ck}}{(1-z)^{k}}

{{< /math >}}
同时展开可以得到
{{< math >}}

H_{c,k}(z) = \sum_{n=ck}^{\infty} f(n,c,k)z^{n} = \dfrac{z^{ck}}{(1-z)^{k}}

{{< /math >}}
这就得到了 {{< imath >}}f(n,c,k){{< /imath >}} 的生成函数。

下面求出数列通项。根据广义二项式定理
{{< math >}}

\dfrac{1}{(1-z)^{k}} = \sum_{n=0}^{\infty} \binom{ n+k }{ k-1 } z^{n}

{{< /math >}}
于是
{{< math >}}

\begin{align*}
H_{c,k}(z) & = \sum_{n=0}^{\infty} \binom{ n+k }{ k-1 } z^{n+ck} \\
 & \xlongequal{m = n+ck} \sum_{m=ck}^{\infty} \binom{ m-ck+k }{ k-1 } z^{m}
\end{align*}

{{< /math >}}
得到
{{< math >}}

f(n,c,k) = \dbinom{ n-ck+k }{ k-1 }

{{< /math >}}

