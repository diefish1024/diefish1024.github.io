---
tags:
- learning
- math
- combinatorics
discipline: mathematics
publish: true
date: '2025-09-23T13:02:00+08:00'
title: Lect2-Generating Functions
categories:
- course-note
---
考虑上一节引入的二项式定理
{{< math >}}

(1+x)^{n} = \sum_{k=0}^{n} \binom{ n }{ k } x^{k}

{{< /math >}}
这可以理解成我们把二项系数转换成了一个函数，这使得我们能更有效地操作和分析序列，这个工具被成为**生成函数**。

## Ordinary Generating Functions

给定序列 {{< imath >}}\{ a_{n} \}_{n\geq 0}{{< /imath >}}，由 {{< imath >}}\{ a_{n} \}{{< /imath >}} 定义的**普通生成函数 (OGF)** 为：
{{< math >}}

G(x) = \sum_{n\geq  0} a_{n}x^{n}

{{< /math >}}
虽然看起来 OGF 并没有被很好的定义，对于和某些数列，这个形式不会收敛，但是实际上生成函数并不能被看成一个真正的函数，它是一个**形式幂级数**，并且不被要求收敛。

以下是一些生成函数的基础例子：
{{< math >}}

G(x) = 1+x+x^{2}+x^{3} +\dots = \dfrac{1}{1-x}

{{< /math >}}
{{< math >}}

G(x) = 1+ax+a^{2}x^{2} + a^{3}x^{3} + \dots = \dfrac{1}{1-ax}

{{< /math >}}

给定一个序列，写出他的生成函数是很容易的。尽管找到他的闭合形式不容易，但是我们一般不需要这样做。相反，我们需要考虑给定一个闭合形式，需要如何知道其对应的序列。

我们约定 {{< imath >}}[x^{n}]G(x){{< /imath >}} 表示生成函数中 {{< imath >}}x^{n}{{< /imath >}} 的系数。

理论上我们总可以使用泰勒级数来得到 {{< imath >}}[x^{n}]G(x){{< /imath >}}。

**Newton’s Generalized Binomial Theorem**

如果 {{< imath >}}x{{< /imath >}} 是任何实数并且 {{< imath >}}\left| x \right|<1{{< /imath >}}，并且 {{< imath >}}r{{< /imath >}} 是任何复数，我们有：
{{< math >}}

(1+x)^{r} = \sum_{n=0}^{\infty} \binom{ r }{ n } x^{n}

{{< /math >}}
其中
{{< math >}}

\binom{ r }{ n } = \dfrac{r^{\underline{n}}}{n!}

{{< /math >}}
例如
{{< math >}}

\dfrac{1}{1+x} = (1+x)^{-1} = \sum_{n=0}^{\infty} \binom{ -1 }{ n } x^{n} = 1-x+x^{2}-x^{3}+\dots

{{< /math >}}

## Operations on Generating Functions

### Convolution

多项式乘法（卷积）在某种意义上编码了乘法原理和加法原理。令 {{< imath >}}F(x)=\sum_{n=0}^{\infty}f_{n}x^{n},G(x)=\sum_{n=0}^{\infty}g_{n}x^{n}{{< /imath >}}，那么
{{< math >}}

[x^{n}](F(x)G(x)) = \sum_{n=0}^{\infty} f_{k}g_{n-k}

{{< /math >}}
我们称这为**卷积 (convolution)** 。这有清晰的组合意义，表示从 {{< imath >}}F\cup G{{< /imath >}} 中选择 {{< imath >}}n{{< /imath >}} 个元素。

### Examples

**Example 1**

假设有 {{< imath >}}5{{< /imath >}} 个相同蓝色球，{{< imath >}}3{{< /imath >}} 个相同绿色球，{{< imath >}}2{{< /imath >}} 个相同红色球，问有几种方式从几种选择 {{< imath >}}6{{< /imath >}} 个球？

**解**：

我们通过生成函数来解决这个问题，令 {{< imath >}}\{ b_{n} \},\{ g_{n} \},\{ r_{n} \}{{< /imath >}} 分别为选择蓝色、绿色、红色球的方案数，显然由于每种颜色的球相同，我们容易得到他们对应的生成函数分别为
{{< math >}}

\begin{align*}
B(x) & = 1+x+x^{2}+x^{3}+x^{4}+x^{5} \\
G(x) & = 1+x+x^{2}+x^{3} \\
R(x) & = 1+x+x^{2}
\end{align*}

{{< /math >}}
那么我们就能得到 {{< imath >}}F(x)=B(x)G(x)R(x){{< /imath >}} 为选择三种球方案的生成函数，选择 {{< imath >}}6{{< /imath >}} 个球的方案数为
{{< math >}}

[x^{6}]F(x) = \dots

{{< /math >}}

**Example 2 (Multiset Number)**

回顾十二重计数法中的多重集数 {{< imath >}}\left( \binom{ m }{ n } \right){{< /imath >}}，表示从 {{< imath >}}[m]{{< /imath >}} 中选择大小为 {{< imath >}}n{{< /imath >}} 的多重集（允许元素重复）的数量，我们可以用生成函数证明
{{< math >}}

\left( \binom{ m }{ n }  \right)  = \binom{ n+m-1 }{ n } = \binom{ n+m-1 }{ m-1 } 

{{< /math >}}
**证**：

设 {{< imath >}}\left( \binom{ m }{ n } \right){{< /imath >}} 的生成函数为
{{< math >}}

F(x) = \sum_{n=0}^{\infty} \left(\binom{ m }{ n }\right) x^{n}

{{< /math >}}
我们考虑对于单个元素 {{< imath >}}i{{< /imath >}} 的集合，其被选择 {{< imath >}}k{{< /imath >}} 次的方案数显然都为 {{< imath >}}1{{< /imath >}}，所以对应生成函数为
{{< math >}}

F_{i}(x) = \sum_{n=0}^{\infty} x^{n} = \dfrac{1}{1-x}

{{< /math >}}
于是
{{< math >}}

F(x) = F_{1}(x)F_{2}(x)\dots F_{m}(x) = \dfrac{1}{(1-x)^{m}}

{{< /math >}}
从而
{{< math >}}

\left( \binom{ m }{ n }  \right) = [x^{n}]F(x) = \binom{ -m }{ n } (-r)^{n} = \binom{ n+m-1 }{ n } 

{{< /math >}}
因此得证。

**Example 3**

对于每个正整数 {{< imath >}}n{{< /imath >}}，将 {{< imath >}}n{{< /imath >}} 分割成若干个奇数之和的方案数等于将 {{< imath >}}n{{< /imath >}} 分割成若干个不同的数之和的方案数。

**证**：

令 {{< imath >}}o_{n}{{< /imath >}} 为将 {{< imath >}}n{{< /imath >}} 分割成奇数的的方案数，{{< imath >}}d_{n}{{< /imath >}} 为分割成不同部分的方案数，并且令 {{< imath >}}O_{n}{{< /imath >}} 和 {{< imath >}}D_{n}{{< /imath >}} 分别为他们对应的生成函数。

对于奇数，我们有
{{< math >}}

\begin{align*}
O(x) & = (1+x+x^{2}+\dots)(1+x^{3}+(x^{3})^{2} + \dots)(1+x^{5}+(x^{5})^{2} + \dots)\dots \\
 & = \dfrac{1}{1-x}\cdot \dfrac{1}{1-x^{3}}\cdot \dfrac{1}{1-x^{5}}\cdot\dots \\
 & = \prod_{k\,\text{mod}\,2=1} \dfrac{1}{1-x^{k}}
\end{align*}

{{< /math >}}

对于不同部分，我们有
{{< math >}}

\begin{align*}
D(x) & = (1+x)(1+x^{2})(1+x^{3})\dots \\
 & = \dfrac{1-x^{2}}{1-x}\cdot \dfrac{1-x^{4}}{1-x^{2}}\cdot \dfrac{1-x^{6}}{1-x^{3}}\cdot \dots \\
 & = \prod_{k=1}^{\infty} \dfrac{1-x^{2k}}{1-x^{k}} \\
 & = \prod_{k\,\text{mod}\,2=1} \dfrac{1}{1-x^{k}}
\end{align*}

{{< /math >}}
因此 {{< imath >}}O(x)=D(x){{< /imath >}}，从而 {{< imath >}}o_{n}=d_{n}{{< /imath >}}，方案数相等。

### Operations

![](/images/lect2-generating-functions/pasted-image-20250928123308.png)

## Solving Recurrence

生成函数最重要的应用之一是解决递推关系并找到闭合形式，现在我们介绍一些例子。

一个经典例子是求解斐波那契数列，过程可以参考作业解答，此处不再重复。

另一个例子是卡特兰数。我们已知其递推关系是
{{< math >}}

C_{0}=1,\quad C_{n} = \sum_{k=0}^{n-1} C_{k}C_{n-1-k}\,,\forall n\geq 1

{{< /math >}}
我们令 {{< imath >}}G(x){{< /imath >}} 为卡特兰数的生成函数。递推关系表明我们应该考虑乘法。
{{< math >}}

\begin{align*}
G(x) & = C_{0} + \sum_{n=1}^{\infty} \sum_{k=0}^{n-1} C_{k}C_{n-1-l}x^{n} \\
G(x)^{2} & = \left( \sum_{n=0}^{\infty} C_{n}x^{n} \right)^{2} = \sum_{n=0}^{\infty} \left( \sum_{k=0}^{n} C_{k}C_{n-k} \right)x^{n} \\
\implies xG(x)^{2} & = \sum_{n=1}^{\infty}\left( \sum_{k=0}^{n-1} C_{k}C_{n-1-k} \right)x^{n} \\
\end{align*}

{{< /math >}}
因此我们有
{{< math >}}

G(x) = 1+ xG(x)^{2} \implies G(x) = \dfrac{1\pm \sqrt{ 1-4x }}{2x}

{{< /math >}}
这两个解中只有一个是我们需要的生成函数，注意到 {{< imath >}}\lim_{ x \to 0 }G(x)=C_{0}=1{{< /imath >}}，容易验证
{{< math >}}

G(x) = \dfrac{1-\sqrt{ 1-4x }}{2x}

{{< /math >}}
现在我们通过广义二项式定理展开 {{< imath >}}\sqrt{ 1-4x }=(1-4x)^{1 / 2}{{< /imath >}} ，再带入原式得到
{{< math >}}

G(x) = \sum_{n=0}^{\infty} \dfrac{1}{n+1}\binom{ 2n }{ n } x^{n}

{{< /math >}}
这就算出了
{{< math >}}

C_{n} = \dfrac{1}{n+1}\binom{ 2n }{ n } 

{{< /math >}}

最后一个例子是第二类斯特林数。其递推关系为
{{< math >}}

\left\{ 0 \atop 0 \right\} = 0,\quad \left\{ n\atop k \right\} = k\left\{ n-1 \atop k \right\} + \left\{ n-1 \atop k-1 \right\} \quad \text{for } (n,k) \neq (0,0)

{{< /math >}}
由于存在两个索引，所以此时有三个生成函数候选：
{{< math >}}

\begin{align*}
A(x,y) & = \sum_{n=0}^{\infty} \sum_{k=0}^{\infty} \left\{ n \atop k \right\} x^{n}y^{k} \\
B_{k}(x) & = \sum_{n=0}^{\infty} \left\{ n\atop k \right\} x^{n} \\
C_{n}(y) & = \sum_{k=0}^{\infty} \left\{ n \atop k \right\} y^{k}
\end{align*}

{{< /math >}}
然而由于我们并不知道如何处理多元生成函数，因此 {{< imath >}}A(x,y){{< /imath >}} 应该首先被排除。如果选择 {{< imath >}}C_{n}(y){{< /imath >}}，那么递推关系中的 {{< imath >}}k\left\{ n-1\atop k \right\}{{< /imath >}} 无疑会涉及到微分，这会使得操作更加复杂。因此我们使用 {{< imath >}}B_{k}(x){{< /imath >}} 作为生成函数。

注意到
{{< math >}}

B_{k}(x) = \sum_{n=k}^{\infty} \left\{ n \atop k \right\}x^{k} = kxB_{k}(x) + xB_{k-1}(x) \quad \text{for } k\geq 1

{{< /math >}}
并且 {{< imath >}}B_{0}(x)=1{{< /imath >}}。

于是
{{< math >}}

B_{k}(x) = \dfrac{x}{1-kx}B_{k-1}(x) = \dfrac{x^{k}}{(1-x)(1-2x)\dots(1-kx)} = \prod_{i=1}^{k} \dfrac{x}{1-ix}

{{< /math >}}
我们的目标是找到 {{< imath >}}[x^{n}]B_{k}(x){{< /imath >}} 的显式公式。一个很自然的思路是把 {{< imath >}}B_{k}(x){{< /imath >}} 写成
{{< math >}}

B_{k}(x) = \sum_{i=1}^{k} \dfrac{r_{i}x}{1-ix}

{{< /math >}}
为了找到 {{< imath >}}r_{i}{{< /imath >}}，我们固定某个 {{< imath >}}j\in[k]{{< /imath >}} 并将两边乘以 {{< imath >}}1-jx{{< /imath >}}。这就得到了
{{< math >}}

\dfrac{x^{k}}{\prod_{i\neq j}(1-ix)} = r_{j}x + \sum_{i\neq j} \dfrac{r_{i}x}{1-ix}(1-jx)

{{< /math >}}
再令 {{< imath >}}x=1 / j{{< /imath >}}，我们就得到了
{{< math >}}

\dfrac{(1 /j)^{k}}{\prod_{i\neq j}(1-i / j)} = \dfrac{r_{j}}{j}\implies r_{j} = \dfrac{(-1)^{k-j}}{(j-1)!(k-j)!}

{{< /math >}}
于是就得到了
{{< math >}}

\left\{ n\atop k \right\} = [x^{n}]B_{k}(x) = \sum_{i=1}^{k} r_{i}i^{n-1} = \sum_{i=1}^{k} \dfrac{(-1)^{k-i}}{(i-1)!(k-i)!}i^{n-1}

{{< /math >}}

## Exponential Generating Function

一般而言，OGF 对于计数**子集**的数量非常有用，然而它可能不适用于计数**置换**或者**带标签元素**。例如 {{< imath >}}[n]{{< /imath >}} 上的置换数量的 OGF 是什么，显然有
{{< math >}}

F(x) = 1+x+2x^{2}+6x^{3}+\dots=\sum_{n=0}^{\infty} n!x^{n}

{{< /math >}}
我们尝试找出它的闭合形式。由于 {{< imath >}}[x^{n}]F(x)=n[x^{n-1}]F(x){{< /imath >}}，这提示我们使用微分运算
{{< math >}}

F(x) = 1+x(xF(x))' = 1+xF(x) + x^{2}F'(x)

{{< /math >}}
然而这类微分方程通常没有闭合形式的解。

于是这就需要引入**指数生成函数 (EGF)**，它用于处理置换或者带标签元素的计数。

对于序列 {{< imath >}}\{ a_{n} \}_{n\geq 0}{{< /imath >}}，由 {{< imath >}}\{ a_{n} \}{{< /imath >}} 定义的 EGF 为
{{< math >}}

G(x) = \sum_{n=0}^{\infty} \dfrac{a_{n}}{n!}x^{n}

{{< /math >}}
**置换**：容易看出由 {{< imath >}}n!{{< /imath >}} 定义的 EGF 为 {{< imath >}}\dfrac{1}{1-x}{{< /imath >}}。

**循环置换**：圆排列数量为 {{< imath >}}(n-1)!{{< /imath >}}，容易得到其生成函数为 {{< imath >}}\sum_{n=1}^{\infty} \frac{1}{n}x^{n}=-\ln(1-x){{< /imath >}}。

为了更好的理解 EGF 的组合含义，我们考虑两个指数生成函数的乘积。设 {{< imath >}}\hat{F}(x) = \sum_{n=0}^{\infty} \frac{1}{n!}f_{n}x^{n}{{< /imath >}}，且 {{< imath >}}\hat{G}(x) = \sum_{n=0}^{\infty} \frac{1}{n!}g_{n}x^{n}{{< /imath >}} ，那么容易看出
{{< math >}}

[x^{n}](\hat{F}(x)\hat{G}(x)) = \sum_{k=0}^{n} \dfrac{f_{k}}{k!} \dfrac{g_{n-k}}{(n-k)!}

{{< /math >}}
于是 {{< imath >}}\hat{F}(x)\hat{G}(x){{< /imath >}} 对应序列的通项为
{{< math >}}

h_{n} = n![x^{n}](\hat{F}(x)\hat{G}(x)) = \sum_{k=0}^{n} \binom{ n }{ k } f_{k}g_{n-k}

{{< /math >}}
这表示我们不仅枚举元素的数量，还枚举他们的位置或者标签。

现在我们考虑指数生成函数的一个应用。假设有一个 {{< imath >}}1 \times n{{< /imath >}} 的棋盘，我们想用蓝色、绿色和红色为每个格子着色。要求红色格子的数量必须是偶数，并且至少有一个蓝色格子。我们的目标是确定棋盘着色的方式数量 {{< imath >}}f_n{{< /imath >}}。
令 {{< imath >}}\{b_n\}{{< /imath >}}、{{< imath >}}\{g_n\}{{< /imath >}}、{{< imath >}}\{r_n\}{{< /imath >}} 分别为用单一颜色蓝色、绿色和红色为 {{< imath >}}n{{< /imath >}} 个格子着色的方式数量序列。那么它们对应的指数生成函数是：
{{< math >}}

\begin{align*}
 & \hat{B}(x) = \sum_{n \ge 1} \frac{1}{n!} x^n = e^x - 1 \quad (\text{至少一个蓝色格子}) \\
 & \hat{G}(x) = \sum_{n \ge 0} \frac{1}{n!} x^n = e^x \quad (\text{任意数量的绿色格子}) \\
 & \hat{R}(x) = \sum_{n \ge 0, n \text{ 偶数}} \frac{1}{n!} x^n = 1 + \frac{x^2}{2!} + \frac{x^4}{4!} + \dots = \frac{e^x + e^{-x}}{2} \quad (\text{偶数个红色格子})
\end{align*}

{{< /math >}}
因此 {{< imath >}}\{f_n\}{{< /imath >}} 的指数生成函数是：
{{< math >}}

\begin{align*}
\hat{F}(x) & = \hat{B}(x) \cdot \hat{G}(x) \cdot \hat{R}(x) \\
 & = (e^x - 1)e^x \frac{e^x + e^{-x}}{2} \\
 & = \frac{e^{2x} - e^x}{2} (e^x + e^{-x}) \\
 & = \frac{e^{3x} + e^x - e^{2x} - 1}{2} \\
 & = \frac{1}{2} \left( \sum_{n \ge 0} \frac{3^n}{n!} x^n - \sum_{n \ge 0} \frac{2^n}{n!} x^n + \sum_{n \ge 0} \frac{1^n}{n!} x^n - 1 \right)
\end{align*}

{{< /math >}}
这给出了：
{{< math >}}

f_n = n! \cdot [x^n]\hat{F}(x) = \begin{cases}
0, & n = 0 \\
\frac{3^n - 2^n + 1}{2}, & n \ge 1
\end{cases}

{{< /math >}}

类似地，回想一下 {{< imath >}}\left\{\substack{n \\ k}\right\}{{< /imath >}} 计算将 {{< imath >}}[n]{{< /imath >}} 分割成 {{< imath >}}k{{< /imath >}} 个相同非空子集的方式数量，因此 {{< imath >}}k!\left\{\substack{n \\ k}\right\}{{< /imath >}} 具有指数生成函数：
{{< math >}}

\sum_{n \ge 0} k!\left\{\substack{n \\ k}\right\} \frac{x^n}{n!} = (e^x - 1)^k

{{< /math >}}