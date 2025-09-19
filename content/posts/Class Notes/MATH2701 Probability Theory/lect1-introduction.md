---
tags:
- learning
- math
- probability-theory
discipline: mathematics
publish: true
date: '2025-09-15T10:47:00+08:00'
title: Lect1-Introduction
categories:
- course-note
---
[课程讲义](https://chihaozhang.com/teaching/Prob2025/lectures/lec1/lec1.html)

> 在这门课里，我们会专注于所谓的 [科尔莫哥洛夫（Kolmogorov）的公理体系](https://en.wikipedia.org/wiki/Probability_axioms)，它使得我们能够使用数学分析的工具来研究概率。

## [St. Petersburg Paradox](https://en.wikipedia.org/wiki/St._Petersburg_paradox)

圣彼得堡悖论。假设一个基于抛硬币赌博的游戏，庄家会一直扔硬币直到结果是正面，如果扔了 {{< imath >}}k{{< /imath >}} 次，那么就会给玩家 {{< imath >}}2^{k}{{< /imath >}} 元的奖金。现在的问题是你愿意花多少钱来购买一次玩这个游戏的机会。

一个很自然的想法是计算游戏的期望，那么我们很容易发现期望收益是
{{< math >}}

\sum_{k \geq  1} 2^{k}\cdot 2^{-k} = 1 + 1 + \dots = +\infty

{{< /math >}}
这说明平均每一轮我们的收益是无穷大，然而在现实生活中你真的愿意花大价钱去玩这个游戏吗？或者可以写一个简单的程序模拟一下就会发现，在比如门票定为 {{< imath >}}100{{< /imath >}} 元，玩几百局，还是会轻易地输掉几万块钱。我们生活中一个常见的直觉是如果重复一个随机过程足够多次，平均收益就会逐渐趋近于期望收益，这在概率论中叫做**大数定律（[Law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers)）**，但是在现实生活中我们并没有能力重复足够多游戏轮数去达到这个期望值。那么现在的问题就是如果定价用 {{< imath >}}a\cdot n{{< /imath >}} 元来购买 {{< imath >}}n{{< /imath >}} 次游戏机会，{{< imath >}}a{{< /imath >}} 定为多少是合理的？

用这门课中后续会学习到的数学工具，我们可以得到答案为 {{< imath >}}\log n{{< /imath >}} （这个结果也符合我们实际的直觉）。

## 随机游走

对二维随机游走问题的一个简化的建模是在 {{< imath >}}\mathbb{Z}^{2}{{< /imath >}} 的网格上随机游走，从原点 {{< imath >}}(0,0){{< /imath >}} 出发，每次以 {{< imath >}}\dfrac{1}{4}{{< /imath >}} 的概率往上下左右四个方向移动。我们现在询问，这个随机游走的路径是否会无数次回到原点？用 {{< imath >}}T{{< /imath >}} 来表示第一次回到原点的时间，那么可以证明无数次回到原点等价于 {{< imath >}}\mathbb{P}[T < \infty] = 1{{< /imath >}} ，也就是 {{< imath >}}T{{< /imath >}} 以 {{< imath >}}1{{< /imath >}} 的概率是有限的，当然目前只能从直觉上去理解，这个写法需要在后续的课程中去严格定义。

关于这个问题的答案，波利亚证明了当考虑 {{< imath >}}n{{< /imath >}} 维格点 {{< imath >}}\mathbb{Z}^{n}{{< /imath >}} 的随机游走时，对于 {{< imath >}}n< 2{{< /imath >}} ，{{< imath >}}\mathbb{P}[T < \infty] = 1{{< /imath >}} ，对于 {{< imath >}}n\geq 2{{< /imath >}} ，{{< imath >}}\mathbb{P}[T < \infty] < 1{{< /imath >}}。

## 投资策略问题

考虑一个简化的投资模型，假设有两支股票，进行 {{< imath >}}T{{< /imath >}} 天的交易，每一天选择一支股票进行投资。假设当前是 {{< imath >}}t{{< /imath >}} 天，在这一天开始的时候，需要选定投资哪一只，在这一天结束的时候，可以看到收益。我们假设两只股票在第 {{< imath >}}t{{< /imath >}} 天的收益是 {{< imath >}}r_{1}^{(t)},r_{2}^{(t)}\in[0, 1]{{< /imath >}}。假设第 {{< imath >}}t{{< /imath >}} 天玩家选择了投资股票 {{< imath >}}a_{t}{{< /imath >}}，则玩家在 {{< imath >}}t{{< /imath >}} 天的总收益是
{{< math >}}

R(T):=\sum_{t=1}^{T} r_{a_{t}}^{(t)}

{{< /math >}}
那么我们如何选择一个好的投资策略？

首先我们需要明确如何衡量一个投资策略的好坏。一个很自然的假设是把 {{< imath >}}R(T){{< /imath >}} 看成关于 {{< imath >}}T{{< /imath >}} 的函数，希望 {{< imath >}}R(T){{< /imath >}} 能越大越好。但是我们的收益不仅仅和我们的策略有关，还和两只股票每天的收益挂钩，假设大环境不好，两只股票都亏钱，那不管投资策略怎么样都不能获得高收益。因此我们可以想到用我们的策略和表现**最好**的股票相比，这也就是**懊悔值 (Regret)** 的定义：对于给定投资策略，以及每天的收益情况 {{< imath >}}\vec{r} = \left(r_{1}^{(t)}, r_{2}^{(t)}\right)_{1 \leq t \leq T}{{< /imath >}}
{{< math >}}

\text{Regret}(T) := \left( \max_{a\in \{ 1, 2 \}} \sum_{t = 1}^{T}r_{a}^{(t)} \right) - R(T)

{{< /math >}}
朴素的理解就是，因为没有未卜先知而产生的懊悔程度。

我们希望一个好的投资策略是，不管股票收益如何，我们的 {{< imath >}}\text{Regret}(T){{< /imath >}} 都比较小。由于 {{< imath >}}\text{Regret}(T) \leq T{{< /imath >}} ，因此我们希望策略满足 {{< imath >}}\text{Regret}(T) = o(T){{< /imath >}} ，这表示当 {{< imath >}}T{{< /imath >}} 足够大时，我们的策略事实上找到了最好的股票。

我们可以证明，对于任何确定性的策略，都不可能达到 {{< imath >}}o(T){{< /imath >}} 的懊悔值。由于我们的策略是确定性的，第 {{< imath >}}t{{< /imath >}} 天的选择完全取决于前 {{< imath >}}t-1{{< /imath >}} 天的选择和收益，因此如果假设有一个坏人针对我们的策略控制了市场，那他就可以预测我们的选择，如果我们会选择股票 {{< imath >}}1{{< /imath >}} ，那他就让 {{< imath >}}r_{1}^{(t)}=0, r_{2}^{(t)}=1{{< /imath >}} ，反之亦然。计算这时候的懊悔值，很容易发现在这样针对性的设置下 {{< imath >}}R(T)=0{{< /imath >}}。并且由于每一天的收益之和都是 {{< imath >}}1{{< /imath >}} ，{{< imath >}}T{{< /imath >}} 天的累计收益之和为 {{< imath >}}T{{< /imath >}}，因此一定有一个股票的 {{< imath >}}T{{< /imath >}} 天累计收益之和 {{< imath >}}\geq T / 2{{< /imath >}} ，这是就有 {{< imath >}}\text{Regret}(T)\geq T / 2{{< /imath >}}。

### Online Mirror Descent

可以看出，确定性的算法效果之所以不好，是因为对手可以进行针对性的设置，对应的我们可以使用随机化的策略来避免这一点。

>这就是所谓的**在线镜像下降（Online Mirror Descent）** 算法，它是一个在计算机科学非常著名的算法，在多个领域被重新发现过，因此，它也有很多其他的名字，比如 [Multiplicative weight update method](https://en.wikipedia.org/wiki/Multiplicative_weight_update_method)，Hedge 算法，EXP3 算法等。

算法会每一轮维护一个分布 {{< imath >}}D_{t}{{< /imath >}}，玩家的决策来自于从这个分布中的采样，并且算法会根据每个回合的反馈来更新这个分布。

- 初始情况 {{< imath >}}D_{0}=\left( \dfrac{1}{2}, \dfrac{1}{2} \right){{< /imath >}}.
- 对于 {{< imath >}}t=1,2,\dots,T{{< /imath >}} 
	1. 选择股票 {{< imath >}}a_{t}\sim D_{t}{{< /imath >}}，并观察得到的 {{< imath >}}r_{1}^{(t)},r_{2}^{(t)}{{< /imath >}}.
	2. 更新 {{< imath >}}D_{t+1}{{< /imath >}}，使得 {{< imath >}}D_{t+1}(i) = \dfrac{D_{t}(i)\exp(-\eta \cdot(1 - r_{i}^{(t)}))}{\sum_{k=1,2}D_{t}(k)\exp(-\eta \cdot(1 - r_{k}^{(t)}))}{{< /imath >}}. 
其中的参数 {{< imath >}}\eta=\sqrt{ \dfrac{1}{T} }{{< /imath >}} 。

算法本身思想很简单：这一轮哪个股票表现好，就在下一轮增加它被选取的概率。然后为什么要像算法这样操作，能不能用别的方式计算，背后的道理就要复杂得多。

可以证明这个算法满足在期望上 {{< imath >}}\text{Regret}(T)=o(\sqrt{ T }){{< /imath >}}（这个结果并非最优）。这个结论表示，有些时候使用随机化，可以让算法的效果产生质变。
