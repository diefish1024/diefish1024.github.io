---
tags:
- math
- probability-theory
- homework
discipline: mathematics
publish: true
date: '2025-10-15T09:07:00+08:00'
title: MATH2701 HW2
categories:
- course-note
---
[题目](https://notes.sjtu.edu.cn/s/b5m_-jXDU)
## Problem 1

**(1)**

设每次合成仙丹为一次尝试。 在每次尝试中：

1. **合成成功**：概率为 {{< imath >}}p{{< /imath >}}。
    * 产生 {{< imath >}}1{{< /imath >}} 份仙丹。
    * 消耗 {{< imath >}}2{{< /imath >}} 份仙果。
2. **合成失败**：概率为 {{< imath >}}1-p{{< /imath >}}。
    * 产生 {{< imath >}}0{{< /imath >}} 份仙丹。
    * 消耗 {{< imath >}}1{{< /imath >}} 份仙果。

我们关注的是平均每份仙果可以得到多少仙丹。这可以理解为仙丹产出的期望值与仙果消耗的期望值之比。

每次尝试中，获得的仙丹数量的期望值 {{< imath >}}\mathbb{E}[\text{仙丹}]{{< /imath >}} 为：
{{< math >}}
\mathbb{E}[\text{仙丹}] = 1 \cdot p + 0 \cdot (1-p) = p
{{< /math >}}

每次尝试中，消耗的仙果数量的期望值 {{< imath >}}\mathbb{E}[\text{仙果}]{{< /imath >}} 为：
{{< math >}}
\mathbb{E}[\text{仙果}] = 2 \cdot p + 1 \cdot (1-p) = 2p + 1 - p = p + 1
{{< /math >}}

那么，平均每份仙果可以得到的仙丹数量为：
{{< math >}}

\frac{\mathbb{E}[\text{仙丹}]}{\mathbb{E}[\text{仙果}]}= \frac{p}{p+1}

{{< /math >}}

因此平均一份仙果可以得到 {{< imath >}}p / (p+1){{< /imath >}} 份仙丹。

**(2)**

商品价格 {{< imath >}}P_{现}=2\,\text{元/份}{{< /imath >}}，初始资金 {{< imath >}}C_{0}=1000\,\text{元}{{< /imath >}}。设现在购买 {{< imath >}}x{{< /imath >}} 份商品，则 {{< imath >}}0 \le x \le \dfrac{C_0}{P_{现}} = 1000 / 2 = 500{{< /imath >}}。
当前交易后，剩余现金为 {{< imath >}}1000 - 2x{{< /imath >}} 元，持有商品 {{< imath >}}x{{< /imath >}} 份。

**Case 1**：为了最大化最终金钱，最优策略是在一周后将所有商品卖出。共有两种情况，概率均为 {{< imath >}}\dfrac{1}{2}{{< /imath >}}：

- 一周后商品价格涨至 {{< imath >}}4{{< /imath >}} 元/份。 卖出 {{< imath >}}x{{< /imath >}} 份商品，获得 {{< imath >}}4x{{< /imath >}} 元。最终金钱为 {{< imath >}}1000+2x{{< /imath >}} 元。
* 一周后商品价格跌至 {{< imath >}}1{{< /imath >}} 元/份。卖出 {{< imath >}}x{{< /imath >}} 份商品，获得 {{< imath >}}x{{< /imath >}} 元。最终金钱为 {{< imath >}}1000 - x{{< /imath >}} 元。

最终金钱的期望值 {{< imath >}}\mathbb{E}[\text{金钱}]{{< /imath >}} 为：
{{< math >}}

\mathbb{E}[\text{金钱}] = \frac{1}{2}(1000 + 2x) + \frac{1}{2}(1000 - x) = \frac{1}{2}(2000 + x) = 1000 + \frac{x}{2}

{{< /math >}}
为了最大化 {{< imath >}}\mathbb{E}[\text{金钱}]{{< /imath >}}，我们需要最大化 {{< imath >}}x{{< /imath >}}。根据 {{< imath >}}0 \le x \le 500{{< /imath >}}， {{< imath >}}x{{< /imath >}} 的最大值为 {{< imath >}}500{{< /imath >}}。

因此，策略为：
1. **现在**：购买 {{< imath >}}500{{< /imath >}} 份商品。
2. **一周后**：无论商品价格涨跌，卖出所有 {{< imath >}}500{{< /imath >}} 份商品。
    * 若价格为 {{< imath >}}4{{< /imath >}} 元/份，最终得到 {{< imath >}}500 \times 4 = 2000{{< /imath >}} 元。
    * 若价格为 {{< imath >}}1{{< /imath >}} 元/份，最终得到 {{< imath >}}500 \times 1 = 500{{< /imath >}} 元。
    此时期望金钱为 {{< imath >}}1000 + 500/2 = 1250{{< /imath >}} 元。

**Case 2**：为了最大化最终商品数量，最优策略是在一周后将所有现金和商品都转换为商品。共有两种情况，概率均为 {{< imath >}}\dfrac{1}{2}{{< /imath >}}：

* 一周后商品价格涨至 {{< imath >}}4{{< /imath >}} 元/份 (概率 {{< imath >}}1/2{{< /imath >}})。此时拥有 {{< imath >}}(1000 - 2x){{< /imath >}} 现金和 {{< imath >}}x{{< /imath >}} 份商品。卖出 {{< imath >}}x{{< /imath >}} 份商品，获得 {{< imath >}}4x{{< /imath >}} 元。总现金为 {{< imath >}}(1000 - 2x) + 4x = 1000 + 2x{{< /imath >}} 元。用所有现金购买商品，可购买 {{< imath >}}(1000 + 2x) / 4 = 250 + x/2{{< /imath >}} 份商品。
* 一周后商品价格跌至 {{< imath >}}1{{< /imath >}} 元/份 (概率 {{< imath >}}1/2{{< /imath >}})。此时拥有 {{< imath >}}(1000 - 2x){{< /imath >}} 现金和 {{< imath >}}x{{< /imath >}} 份商品。卖出 {{< imath >}}x{{< /imath >}} 份商品，获得 {{< imath >}}x{{< /imath >}} 元。总现金为 {{< imath >}}(1000 - 2x) + x = 1000 - x{{< /imath >}} 元。用所有现金购买商品，可购买 {{< imath >}}(1000 - x) / 1 = 1000 - x{{< /imath >}} 份商品。

最终商品数量的期望值 {{< imath >}}\mathbb{E}[\text{商品}]{{< /imath >}} 为：
{{< math >}}

\mathbb{E}[\text{商品}] = \frac{1}{2}(250 + \frac{x}{2}) + \frac{1}{2}(1000 - x) = \frac{1}{2}(1250 - \frac{x}{2}) = 625 - \frac{x}{4}

{{< /math >}}
为了最大化 {{< imath >}}\mathbb{E}[\text{商品}]{{< /imath >}}，我们需要最小化 {{< imath >}}x{{< /imath >}}。根据 {{< imath >}}0 \le x \le 500{{< /imath >}}， {{< imath >}}x{{< /imath >}} 的最小值为 {{< imath >}}0{{< /imath >}}。

因此，策略为：
1. **现在**：不购买任何商品。此时现金为 {{< imath >}}1000{{< /imath >}} 元，持有 {{< imath >}}0{{< /imath >}} 份商品。
2. **一周后**：无论商品价格涨跌，用所有现金购买商品。
    * 若价格为 {{< imath >}}4{{< /imath >}} 元/份，用 {{< imath >}}1000{{< /imath >}} 元购买 {{< imath >}}1000 / 4 = 250{{< /imath >}} 份商品。
    * 若价格为 {{< imath >}}1{{< /imath >}} 元/份，用 {{< imath >}}1000{{< /imath >}} 元购买 {{< imath >}}1000 / 1 = 1000{{< /imath >}} 份商品。
    此时期望商品数量为 {{< imath >}}625 - 0/4 = 625{{< /imath >}} 份。

**(3)**

**马尔可夫不等式**：我们需要对于每个 {{< imath >}}a\in \mathbb{R}_{>0}{{< /imath >}} 找出对应的随机变量 {{< imath >}}X{{< /imath >}} 满足
{{< math >}}

\mathbb{P}[X\geq a] = \dfrac{\mathbb{E}[X]}{a}

{{< /math >}}
直接取 {{< imath >}}X=a{{< /imath >}} 即可，显然成立。

**切比雪夫不等式**：同样直接取 {{< imath >}}X=a{{< /imath >}}。那么 {{< imath >}}\mathbb{P}[\left| X-\mathbb{E}[X] \right|\geq a]=0{{< /imath >}}，同时 {{< imath >}}\mathrm{Var}(X)=0{{< /imath >}}（因为 {{< imath >}}X{{< /imath >}} 为常数），因此可以取到等号。或者更直接地由于这是马尔可夫不等式的直接推论，两者取等条件相同。

## Problem 2

冒泡排序一次操作减少一个逆序对，因此实际上我们需要分析的是一个随机排列中逆序对数量 {{< imath >}}X{{< /imath >}}。需要分别求出 {{< imath >}}\mathbb{E}[X]{{< /imath >}} 和 {{< imath >}}\mathrm{Var}[X]{{< /imath >}}。

**(1)**

求解 {{< imath >}}\mathbb{E}[X]{{< /imath >}}。我们直接定义指示变量 {{< imath >}}\mathbb{I}_{i,j}=[i< j\land a_{i}>a_{j}]{{< /imath >}}，表示 {{< imath >}}(a_{i},a_{j}){{< /imath >}} 构成一个逆序对。于是
{{< math >}}

X = \sum_{1\leq i< j\leq n}\mathbb{I}_{i,j}

{{< /math >}}
根据期望的可加性
{{< math >}}

\mathbb{E}[X] = E\left[ \sum_{1\leq i< j\leq n}\mathbb{I}_{i,j} \right] = \sum_{1\leq i< j\leq n}\mathbb{E}[\mathbb{I}_{i,j}]

{{< /math >}}
对于单个指示变量的期望，{{< imath >}}\mathbb{E}[\mathbb{I}_{i,j}]=\mathbb{P}(a_{i}>a_{j}){{< /imath >}}。由于排列随即均匀，对于任意一个数它出现在位置 {{< imath >}}i{{< /imath >}} 和 {{< imath >}}j{{< /imath >}} 的概率是相同的，所以 {{< imath >}}\mathbb{P}(a_{i}>a_{j})= \frac{1}{2}{{< /imath >}}，所以
{{< math >}}

\mathbb{E}[X] = \sum_{1\leq i< j\leq n} \dfrac{1}{2} = \dfrac{n(n-1)}{4}

{{< /math >}}

**(2)**

求解 {{< imath >}}\mathrm{Var}[X]{{< /imath >}}。由于 {{< imath >}}\mathrm{Var}[X]=\mathbb{E}[X^{2}]-(\mathbb{E}[X])^{2}{{< /imath >}}，因此我们求出 {{< imath >}}\mathbb{E}[X^{2}]{{< /imath >}} 即可。同理 {{< imath >}}(1){{< /imath >}}，我们得到
{{< math >}}

X^{2} = \left( \sum_{1\leq i< j\leq n}\mathbb{I}_{i,j} \right)^{2} = \sum_{1\leq i< j\leq n}\mathbb{I}_{i,j} + \sum_{(i,j)\neq(k,l)}\mathbb{I}_{i,j}\mathbb{I}_{k,l}

{{< /math >}}
根据期望的可加性，我们直接考虑计算 {{< imath >}}\mathbb{E}[\mathbb{I}_{i,j}\mathbb{I}_{k,l}]{{< /imath >}}。我们发现每对不同的 {{< imath >}}(i,j),(k,l){{< /imath >}} 会被重复计算两次，因此我们令 {{< imath >}}i< k{{< /imath >}}，最后计数乘以 {{< imath >}}2{{< /imath >}} 即可。分类讨论：

- 若 {{< imath >}}(i,j),(k,l){{< /imath >}} 没有重叠，那么共 {{< imath >}}\binom{ n }{ 4 }\times 3{{< /imath >}} 种选择，对期望贡献为 {{< imath >}}\frac{3\binom{ n }{ 4 }}{4}{{< /imath >}}。
- 若 {{< imath >}}\{ i,j \}\cap \{ k,l \}\neq \emptyset{{< /imath >}}，分别考虑 {{< imath >}}3{{< /imath >}} 种重合方式，每种有 {{< imath >}}\binom{ n }{ 3 }{{< /imath >}} 种选择，发现对期望的贡献为
{{< math >}}

\left( \dfrac{1}{3} + \dfrac{1}{6} + \dfrac{1}{3} \right) \cdot \binom{ n }{ 3 }  = \dfrac{5}{6}\binom{ n }{ 3 } 

{{< /math >}}
综上，得到
{{< math >}}

\mathbb{E}[\mathbb{I}_{i,j}\mathbb{I}_{k,l}] = 2\left[ \dfrac{3}{4}\binom{ n }{ 4 }  + \dfrac{5}{6}\binom{ n }{ 3 }  \right] = \dfrac{3}{2}\binom{ n }{ 4 } + \dfrac{5}{3}\binom{ n }{ 3 } 

{{< /math >}}
得到
{{< math >}}

\mathbb{E}[X^{2}] = \dfrac{n(n-1)}{4} + \dfrac{3}{2}\cdot \dfrac{n(n-1)(n-2)(n-3)}{24} + \dfrac{5}{3}\cdot \dfrac{n(n-1)(n-2)}{6} = \dfrac{n(n-1)(9n^{2}-5n+10)}{144}

{{< /math >}}
从而
{{< math >}}

\mathrm{Var}[X] = \mathbb{E}[X^{2}] - (\mathbb{E}[X])^{2} = \dfrac{n(n-1)(9n^{2}-5n+10)}{144} - \dfrac{n^{2}(n-1)^{2}}{16} = \dfrac{n(n-1)(2n+5)}{72}

{{< /math >}}

## Problem 3

**(1)**

要证明 {{< imath >}}\mathbb{E}[\hat{m}]=m{{< /imath >}}，我们只需要证明 {{< imath >}}\mathbb{E}[2^{X}-1]=m{{< /imath >}}，即 {{< imath >}}\mathbb{E}[2^{X}]=m+1{{< /imath >}}。我们设 {{< imath >}}X_{k}{{< /imath >}} 为接受第 {{< imath >}}k{{< /imath >}} 个输入后计数器的值，定义 {{< imath >}}T_{k}=\mathbb{E}[2^{X_{k}}]{{< /imath >}}，只需要证明 {{< imath >}}T_{m}=m+1{{< /imath >}} 即可。现在我们求 {{< imath >}}T_{k}{{< /imath >}} 的递推式。

考虑在第 {{< imath >}}k{{< /imath >}} 个输入时计数器的变化，{{< imath >}}k-1{{< /imath >}} 个输入之后计数器的值为 {{< imath >}}X_{k-1}{{< /imath >}}，那么第 {{< imath >}}k{{< /imath >}} 个输入到达时：
- 以 {{< imath >}}\mathbb{P}=2^{-X_{k-1}}{{< /imath >}} 的概率变为 {{< imath >}}X_{k}=X_{k-1}+1{{< /imath >}}。
- 以 {{< imath >}}\mathbb{P}=1-2^{-X_{k-1}}{{< /imath >}} 的概率还是 {{< imath >}}X_{k}=X_{k-1}{{< /imath >}}。

那么我们得到对于给定 {{< imath >}}X_{k-1}=x{{< /imath >}}，有
{{< math >}}

\mathbb{E}[2^{X_{k}}\mid X_{k-1}=x] = 2^{-x}\cdot 2^{x+1} + (1-2^{-x})\cdot 2^{x} = 1 + 2^{x}

{{< /math >}}
这就得到了
{{< math >}}

T_{k} = \mathbb{E}[2^{X_{k}}] = \mathbb{E}[1+2^{X_{k-1}}] = T_{k-1} + 1

{{< /math >}}
再带入 {{< imath >}}T_{1}=2{{< /imath >}}，显然就得到了 {{< imath >}}T_{m}=m+1{{< /imath >}}，于是我们就证明了输出的 {{< imath >}}\hat{m}{{< /imath >}} 是无偏的。

**(2)**

我们先考虑求出 {{< imath >}}\mathbb{E}[\hat{m}^{2}]=\mathbb{E}[(2^{X}-1)^{2}]{{< /imath >}}，核心在于求出 {{< imath >}}\mathbb{E}[2^{2X}]{{< /imath >}}。类似 {{< imath >}}(1){{< /imath >}}，令 {{< imath >}}S_{k}=\mathbb{E}[2^{2X_{k}}]{{< /imath >}}，考虑求出其递推式。

对于 {{< imath >}}X_{k-1}=x{{< /imath >}}，有
{{< math >}}

\mathbb{E}[2^{2X_{k}}\mid X_{k-1}=x] = 2^{-x}\cdot 2^{2x+2} + (1-2^{-x})\cdot 2^{2x} = 3\cdot 2^{x} + 2^{2x}

{{< /math >}}
从而
{{< math >}}

S_{k} = S_{k-1} + 3T_{k-1} = S_{k-1} + 3k

{{< /math >}}
带入 {{< imath >}}S_{1}=4{{< /imath >}}，得到
{{< math >}}

\mathbb{E}[2^{2X_{m}}] = S_{m} = \dfrac{3}{2}m^{2} + \dfrac{3}{2}m + 1

{{< /math >}}
于是
{{< math >}}

\mathbb{E}[\hat{m}^{2}] = \mathbb{E}[(2^{X}-1)^{2}] = S_{m} -  2T_{m} + 1 = \dfrac{3}{2}m^{2} - \dfrac{1}{2}m

{{< /math >}}
以及
{{< math >}}

\mathrm{Var}[\hat{m}] = \mathbb{E}[\hat{m}^{2}]-\mathbb{E}[\hat{m}]^{2} = \dfrac{1}{2}m^{2} - \dfrac{1}{2}m \leq  \dfrac{m^{2}}{2}

{{< /math >}}
带入切比雪夫不等式，得到
{{< math >}}

\mathbb{P}[\left| \hat{m}-m \right| \geq \varepsilon m] \leq  \dfrac{\mathrm{Var}[\hat{m}]}{(\varepsilon m)^{2}} = \dfrac{\dfrac{1}{2}m^{2} - \dfrac{1}{2}m}{(\varepsilon m)^{2}} < \dfrac{1}{2\varepsilon^{2}}

{{< /math >}}
因此上界为 {{< imath >}}\dfrac{1}{2\varepsilon^{2}}{{< /imath >}}。

**(3)**

显然 {{< imath >}}\mathbb{E}[\hat{m}^{*}]=m{{< /imath >}}，我们需要求出 {{< imath >}}\mathrm{Var}[\hat{m}^{*}]{{< /imath >}}。根据方差的性质，我们有
{{< math >}}

\begin{align*}
\mathrm{Var}[\hat{m}^{*}] & = \mathrm{Var}\left[ \dfrac{1}{t}\sum_{i=1}^{t}\hat{m}_{i} \right] \\
 & = \dfrac{1}{t^{2}}\mathrm{Var}\left[ \sum_{i=1}^{t} \hat{m}_{i} \right] \\
 & = \dfrac{1}{t^{2}}\sum_{i=1}^{t} \mathrm{Var}[\hat{m}_{i}] \\
 & = \dfrac{1}{t}\mathrm{Var}[\hat{m}]
\end{align*}

{{< /math >}}
重新带入切比雪夫不等式，就得到了
{{< math >}}

\mathbb{P}[\left| \hat{m}^{*}-m \right| \geq \varepsilon m] \leq  \dfrac{\mathrm{Var}[\hat{m}^{*}]}{(\varepsilon m)^{2}} < \dfrac{1}{2t\cdot\varepsilon^{2}}

{{< /math >}}
**(4)**

取 {{< imath >}}\varepsilon=0.1{{< /imath >}}，我们需要
{{< math >}}

\dfrac{1}{2\times 0.1^{2}\times t} < 1\% \implies t > 5000

{{< /math >}}
至少 {{< imath >}}5000{{< /imath >}} 次实验。

存储需要 {{< imath >}}5000\times\lceil \log_{2}\lceil \log_{2}m \rceil \rceil{{< /imath >}} 比特。

## Problem 4

**(1)**

根据提示，我们假设在 {{< imath >}}H_{0}=H^{*}{{< /imath >}} 时取到最大值，定义 {{< imath >}}\mathcal{P}'{{< /imath >}} 为包含 {{< imath >}}H^{*}{{< /imath >}} 作为子图。由于 {{< imath >}}H^{*}\subseteq H{{< /imath >}}，因此若 {{< imath >}}G{{< /imath >}} 满足 {{< imath >}}\mathcal{P}{{< /imath >}}，那么一定满足 {{< imath >}}\mathcal{P}'{{< /imath >}}，这就得到了
{{< math >}}

\mathbb{P}[G \text{ satisfies } \mathcal{P}] \leq \mathbb{P}[G \text{ satisfies } \mathcal{P}']

{{< /math >}}
我们接着考虑 {{< imath >}}G{{< /imath >}} 中包含的和 {{< imath >}}H^{*}{{< /imath >}} 同构的图的数量 {{< imath >}}X{{< /imath >}}，显然有 {{< imath >}}\mathbb{P}[G\text{ satisfies }\mathcal{P}']=\mathbb{P}[X\geq 1]{{< /imath >}}。

计算 {{< imath >}}X{{< /imath >}} 的期望，有
{{< math >}}

\mathbb{E} [X] = \binom{ n }{ \left| V(H^{*}) \right|  } p(n)^{\left| E(H^{*}) \right| }

{{< /math >}}
带入 {{< imath >}}p(n)< n^{-1 / r(H)}{{< /imath >}}，以及 {{< imath >}}r(H)= \frac{\left| E(H^{*}) \right|}{\left| V(H^{*}) \right|}{{< /imath >}}，得到
{{< math >}}

p(n)^{\left| E(H^{*}) \right| } < n^{- \left| E(H^{*}) \right|/{r(H)} } = n^{-\left| V(H^{*}) \right| }

{{< /math >}}
因此
{{< math >}}

\mathbb{E}[X] < \binom{ n }{ \left|  V(H^{*}) \right| } \cdot n^{-\left| V(H^{*}) \right| } = \dfrac{n^{\underline{\left| V(H^{*}) \right| }}}{\left| V(H^{*}) \right| !}\cdot n^{-\left| V(H^{*}) \right| } < \dfrac{1}{\left| V(H^{*}) \right| !}

{{< /math >}}
在 {{< imath >}}n\to \infty{{< /imath >}} 时显然也有 {{< imath >}}\dfrac{1}{\left| V(H^{*}) \right|!}\to 0{{< /imath >}}。

于是根据马尔可夫不等式，得到
{{< math >}}

\mathbb{P}[G\text{ satisfies }\mathcal{P}']=\mathbb{P}[X\geq 1] \leq  \mathbb{E}[X] \to 0

{{< /math >}}
从而得到了
{{< math >}}

\mathbb{P}[G\text{ satisfices }\mathcal{P}] \to 0

{{< /math >}}

**(2)**

首先同理第一问，计算 {{< imath >}}X{{< /imath >}} 的期望
{{< math >}}

\mathbb{E}[X] = \sum_{i=1}^{m} \mathbb{E}[X_{i}] = m\cdot p(n)^{\left| E(H) \right| }

{{< /math >}}
接着由于需要计算方差，我们考虑 {{< imath >}}\mathbb{E}[X^{2}]{{< /imath >}}，有
{{< math >}}

\mathbb{E}[X^{2}] = \mathbb{E}\left[ \left( \sum_{i=1}^{m}X_{i} \right)^{2} \right] = \sum_{i=1}^{m} \sum_{j=1}^{m} \mathbb{E}[X_{i}X_{j}]

{{< /math >}}
并且其中 {{< imath >}}X_{i}X_{j}=1{{< /imath >}} 代表 {{< imath >}}G\text{ contains }S_{i}\cup S_{j}{{< /imath >}}，因此 {{< imath >}}\mathbb{E}[X_{i}X_{j}]=\mathbb{P}[G\text{ contains }S_{i}\cup S_{j}]{{< /imath >}}。

带入方差表达式得到
{{< math >}}

\begin{align*}
\text{Var}[X] & = \mathbb{E}[X^{2}] - (\mathbb{E}[X])^{2} \\
 & = \sum_{i,j\in[m_{n}]}\mathbb{P}[G\text{ contains }S_{i}\cup S_{j}] - (\mathbb{E}[X])^{2} \\
 & < \sum_{i,j\in[m_{n}]}\mathbb{P}[G\text{ contains }S_{i}\cup S_{j}] \\
 & < \sum_{i,j\in[m_{n}]:E(S_{i}\cap S_{j})\neq \emptyset} \mathbb{P}[G\text{ contains }S_{i}\cup S_{j}]
\end{align*}

{{< /math >}}
**(3)**

首先根据容斥原理，{{< imath >}}S_{i}\cup S_{j}{{< /imath >}} 包含 {{< imath >}}2E(H)-e{{< /imath >}} 条边。那么根据定义，我们就有
{{< math >}}

\mathbb{P}[G\text{ contains }S_{i}\cup S_{j}] = p(n)^{2\left| E(H) \right| - e} = \Theta(p(n)^{2\left| E(H) \right| - e})

{{< /math >}}
并且 {{< imath >}}S_{i}\cup S_{j}{{< /imath >}} 有 {{< imath >}}2\left| V(H) \right|-v{{< /imath >}} 个点，因此从 {{< imath >}}n{{< /imath >}} 个点中分配 {{< imath >}}S_{i}\cup S_{j}{{< /imath >}} 中的点，有 {{< imath >}}\binom{ n }{ 2\left| V(H) \right|-v }{{< /imath >}} 种方案，再在这些点中分配 {{< imath >}}S_{i}\cap S_{j}{{< /imath >}} 中的点以及分别 {{< imath >}}S_{i},S_{j}{{< /imath >}} 的点，合计方案数为
{{< math >}}

\begin{align*} 
& \binom{ n }{ 2\left| V(H) \right| - v } \cdot \binom{ 2\left| V(H) \right| - v }{ v } \cdot \binom{ 2\left| V(H) \right| - 2v }{ \left| V(H) \right| - v } \\
 & < n^{2\left| V(H) \right| - v}\cdot \dfrac{(2\left| V(H) \right| -v)^{\underline{v}}\cdot (2\left| V(H)-2v \right|) ^{\underline{\left| V(H) \right| - v}}}{(2\left| V(H)-v \right| )!\cdot v!\cdot (\left| V(H)-v \right| )!} \\
 & = \mathcal{O}(n^{2\left| V(H) \right| - v})
\end{align*}

{{< /math >}}

**(4)**

我们只需证明 {{< imath >}}\text{Var}[X]=o((\mathbb{E}[X])^{2}){{< /imath >}} 即可。

首先，注意到 {{< imath >}}\mathbb{E}[X] = \Theta(n^{|V(H)|} p(n)^{|E(H)|}){{< /imath >}}。

对于方差，利用 {{< imath >}}(2){{< /imath >}} 的结论，当 {{< imath >}}i \neq j{{< /imath >}} 且 {{< imath >}}E(S_i \cap S_j) = \emptyset{{< /imath >}} 时，{{< imath >}}X_i{{< /imath >}} 和 {{< imath >}}X_j{{< /imath >}} 独立，因此
{{< math >}}
 \text{Var}[X] \leq \mathbb{E}[X] + \sum_{i,j \in [m_n]: E(S_i \cap S_j) \neq \emptyset} \mathbb{P}[G \text{ contains } S_i \cup S_j] 
{{< /math >}}
根据 {{< imath >}}(3){{< /imath >}} 的结论，对于每个固定的 {{< imath >}}(v, e){{< /imath >}}（其中 {{< imath >}}v{{< /imath >}} 和 {{< imath >}}e{{< /imath >}} 分别是 {{< imath >}}S_i \cap S_j{{< /imath >}} 的点数和边数，且 {{< imath >}}1 \leq e \leq 2|E(H)|-1{{< /imath >}}），有
- 满足条件的 {{< imath >}}(i,j){{< /imath >}} 对数为 {{< imath >}}\mathcal{O}(n^{2|V(H)|-v}){{< /imath >}}
- 每对的概率为 {{< imath >}}\Theta(p(n)^{2|E(H)|-e}){{< /imath >}}

因此
{{< math >}}

\begin{align*}
\text{Var}[X] &\leq \mathbb{E}[X] + \sum_{v,e} \mathcal{O}(n^{2|V(H)|-v} p(n)^{2|E(H)|-e}) \\
 &= \mathbb{E}[X] + \sum_{v,e} \mathcal{O}\left((n^{|V(H)|} p(n)^{|E(H)|})^2 \cdot n^{-v} p(n)^{-e}\right) \\
\end{align*}

{{< /math >}}

对于 {{< imath >}}H{{< /imath >}} 的任意子图 {{< imath >}}H_0{{< /imath >}}，若 {{< imath >}}|V(H_0)| = v{{< /imath >}}，{{< imath >}}|E(H_0)| = e{{< /imath >}}，则根据 {{< imath >}}r(H){{< /imath >}} 的定义 {{< math >}}
 \frac{e}{v} \leq r(H) \quad \Rightarrow \quad e \leq r(H) \cdot v 
{{< /math >}}
当 {{< imath >}}p(n) \gg n^{-1/r(H)}{{< /imath >}} 时，存在 {{< imath >}}\epsilon > 0{{< /imath >}} 使得 {{< imath >}}p(n) > n^{-1/r(H)+\epsilon}{{< /imath >}}（当 {{< imath >}}n{{< /imath >}} 充分大）。因此
{{< math >}}
 n^{-v} p(n)^{-e} < n^{-v} \cdot n^{e(1/r(H)-\epsilon)} = n^{e/r(H) - v - e\epsilon} 
{{< /math >}}

由于 {{< imath >}}e \leq r(H) \cdot v{{< /imath >}}，即 {{< imath >}}e/r(H) \leq v{{< /imath >}}，所以 {{< imath >}}e/r(H) - v - e\epsilon \leq -e\epsilon < 0{{< /imath >}}。因此 {{< imath >}}n^{-v} p(n)^{-e} \to 0{{< /imath >}}。

由于 {{< imath >}}(v,e){{< /imath >}} 的可能取值是有限的（{{< imath >}}\mathcal{O}(1){{< /imath >}} 种），我们得到 {{< math >}}
 \text{Var}[X] = o((\mathbb{E}[X])^2) 
{{< /math >}}
从而由切比雪夫不等式
{{< math >}}
 \mathbb{P}[X=0] \leq \mathbb{P}[|X - \mathbb{E}[X]| \geq \mathbb{E}[X]] \leq \frac{\text{Var}[X]}{(\mathbb{E}[X])^2} \to 0 
{{< /math >}}
因此
{{< math >}}
 \mathbb{P}[X \geq 1] = 1 - \mathbb{P}[X=0] \xrightarrow{n \to \infty} 1 
{{< /math >}}
这就完成了证明。