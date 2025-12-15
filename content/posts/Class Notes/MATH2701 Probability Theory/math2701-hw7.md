---
tags:
- learning
- math
- probability-theory
- homework
discipline: mathematics
publish: true
date: '2025-12-06T20:14:00+08:00'
title: MATH2701 HW7
categories:
- course-note
---
## Problem 1

**(1)**

总共有 {{< imath >}}N=\binom{ n }{ 2 }{{< /imath >}} 对点。设 {{< imath >}}X_{ij}=\mathbb{I}[(i,j)\in E_{n}]{{< /imath >}}。那么 {{< imath >}}\mathbf{E}[X_{ij}]=p{{< /imath >}}。并且
{{< math >}}

\left| E_{n} \right| = \sum_{1\leq i< j\leq n} X_{i}

{{< /math >}}
由于边与边之间独立，因此 {{< imath >}}X_{i}{{< /imath >}} 是独立同分布，并且可积，那么根据强大数定律，就有
{{< math >}}

\dfrac{\sum X_{i}}{N} = \dfrac{\left| E_{n} \right| }{\binom{ n }{ 2 } } \xrightarrow{a.s.} \mathbf{E}[X_{i}]=p

{{< /math >}}
**(2)**

设 {{< imath >}}\mathcal{C}_n{{< /imath >}} 为 {{< imath >}}V_n{{< /imath >}} 中所有大小为 {{< imath >}}3{{< /imath >}} 的子集的集合，也就是所有无序三元组 {{< imath >}}\{i, j, k\}{{< /imath >}}。集合大小 {{< imath >}}|\mathcal{C}_n| = \binom{n}{3}{{< /imath >}}。

对于任意 {{< imath >}}\alpha = \{i, j, k\} \in \mathcal{C}_n{{< /imath >}}，定义指示变量 {{< imath >}}Y_\alpha{{< /imath >}}
{{< math >}}
Y_\alpha = X_{ij} X_{jk} X_{ki}
{{< /math >}}
由于 {{< imath >}}X{{< /imath >}} 相互独立，因此
{{< math >}}

\mathbf{E}[Y_{\alpha}] = \mathbf{E}[X_{ij}]\mathbf{E}[X_{jk}]\mathbf{E}[X_{ki}]=p^{3}

{{< /math >}}
由于三角形总数满足 {{< imath >}}\left| T_{n} \right|=\sum_{\alpha \in \mathcal{C}_{n}}Y_{\alpha}{{< /imath >}}，那么根据期望的线性性，有
{{< math >}}

\mathbf{E}[\left| T_{n} \right| ] = \sum_{\alpha \in \mathcal{C}_{n}} \mathbf{E}[Y_{\alpha}] = \binom{ n }{ 3 } p^{3}

{{< /math >}}
接着考虑 {{< imath >}}\left| T_{n} \right|{{< /imath >}} 的方差。分析两个不同三元组 {{< imath >}}\alpha{{< /imath >}} 和 {{< imath >}}\beta{{< /imath >}} 的协方差
{{< math >}}

\text{Conv}(Y_{\alpha},Y_{\beta}) = \mathbf{E}[Y_{\alpha}Y_{\beta}] - \mathbf{E}[Y_{\alpha}]\mathbf{E}[Y_{\beta}]

{{< /math >}}
假如 {{< imath >}}\alpha,\beta{{< /imath >}} 没有公共边，那么相互独立，协方差为零。如果 {{< imath >}}\left| \alpha \cap\beta\right|=2{{< /imath >}}，有公共边，那么一共涉及了五条不同的边，从而
{{< math >}}

\mathbf{E}[Y_{\alpha}Y_{\beta}]=p^{5} \implies \text{Conv}(Y_{\alpha},Y_{\beta}) = p^{5}-p^{6}

{{< /math >}}
并且存在公共边的 {{< imath >}}\alpha,\beta{{< /imath >}} 的数量是 {{< imath >}}O(n^{4}){{< /imath >}} 级别的，因为一共涉及到了 {{< imath >}}4{{< /imath >}} 个点的选择。

因此
{{< math >}}

\text{Var}(\left| T_{n} \right| ) = \binom{ n }{ 3 } \text{Var}(Y_{\alpha}) + O(n^{4})\cdot(p^{5}-p^{6}) \leq  C\cdot n^{4}

{{< /math >}}
考察随机变量 {{< imath >}}Z_{n}=\left| T_{n} \right| / \binom{ n }{ 3 }{{< /imath >}}。我们有
{{< math >}}

\text{Var}(Z_{n}) = \dfrac{1}{\binom{ n }{ 3 }^{2}} \text{Var}(\left| T_{n} \right| ) = \dfrac{O(n^{4})}{O(n^{6})} = O(n^{-2})

{{< /math >}}
从而对于任意 {{< imath >}}\varepsilon>0{{< /imath >}}，都有
{{< math >}}

\mathbb{P}(\left| Z_{n} - \varepsilon\right| \geq  \varepsilon) \leq  \dfrac{\text{Var}(Z_{n})}{\sigma^{2}} \leq  \dfrac{K}{n^{2}\varepsilon^{2}}

{{< /math >}}
从而
{{< math >}}
\lim_{n \to \infty} \mathbb{P}\left( \left| \frac{|T_n|}{\binom{n}{3}} - p^3 \right| \ge \varepsilon \right) = 0
{{< /math >}}
就证明了依概率收敛。

**(3)**

根据 {{< imath >}}(2){{< /imath >}} 我们得到了
{{< math >}}

\mathbb{P}\left( \left| \frac{|T_n|}{\binom{n}{3}} - p^3 \right| \ge \varepsilon \right) \leq  \dfrac{K}{\varepsilon^{2}n^{2}}

{{< /math >}}
其中 {{< imath >}}K{{< /imath >}} 是一个和 {{< imath >}}n{{< /imath >}} 无关的常数。

我们将这个概率对所有的 {{< imath >}}n{{< /imath >}} 求和，得到
{{< math >}}

\sum_{n=1}^{\infty} \mathbb{P}\left( \left| \frac{|T_n|}{\binom{n}{3}} - p^3 \right| \ge \varepsilon \right) \leq  \dfrac{K}{\varepsilon^{2}}\sum_{n=1}^{\infty} \dfrac{1}{n^{2}} < \infty

{{< /math >}}
利用 Borel-Cantelli Lemma，设事件 {{< imath >}}A_{n}=\left\{ \left| \frac{|T_n|}{\binom{n}{3}} - p^3 \right| \ge \varepsilon \right\}{{< /imath >}}，就得到了
{{< math >}}

\mathbb{P}(A_{n}\text{ i.o}) = 0

{{< /math >}}
从而说明存在 {{< imath >}}N_{0}{{< /imath >}} 使得当 {{< imath >}}n>N_{0}{{< /imath >}}，必然有
{{< math >}}

\left| \dfrac{\left| T_{n} \right| }{\binom{ n }{ 3 } }-p^{3} \right| < \varepsilon

{{< /math >}}
这正是几乎处处收敛的定义，因此
{{< math >}}

\dfrac{\left| T_{n} \right| }{\binom{ n }{ 3 } } \xrightarrow{a.s.} p^{3}

{{< /math >}}
## Problem 2

**(1)**

首先证明下界。由于 {{< imath >}}p(x)=\mathbb{P}(X=x){{< /imath >}} 是一个概率，因此 {{< imath >}}p(x)\in(0,1){{< /imath >}}，从而 {{< imath >}}-p(x)\log_{2}p(x)\geq0{{< /imath >}}，因此求和必定非负。

接着证明上界。将 {{< imath >}}H(X){{< /imath >}} 理解为期望，有
{{< math >}}

H(X) = \sum_{x \in A}p(x)\log_{2}\left( \dfrac{1}{p(x)} \right) = \mathbf{E}\left[ \log_{2}\left( \dfrac{1}{p(X)} \right) \right]

{{< /math >}}
其中 {{< imath >}}\dfrac{1}{p(X)}{{< /imath >}} 是一个随机变量。考虑函数 {{< imath >}}f(t)=\log_{2}t{{< /imath >}}，其二阶导 {{< imath >}}f''(t)=-\dfrac{1}{t^{2}\ln 2}< 0{{< /imath >}}，{{< imath >}}f(t){{< /imath >}} 是凹函数，从而根据琴生不等式，有
{{< math >}}

\mathbf{E}\left[ \log_{2}\left( \dfrac{1}{p(X)} \right) \right]\leq  \log_{2}\left( \mathbf{E}\left[ \dfrac{1}{p(X)} \right] \right)

{{< /math >}}
其中
{{< math >}}

\mathbf{E}\left[ \dfrac{1}{p(X)} \right] = \sum_{x \in A} \mathbb{P}(X=x)\cdot \dfrac{1}{\mathbb{P}(X=x)} = \left| A \right| 

{{< /math >}}
带入就得到了
{{< math >}}

H(X) \leq  \log_{2}\left| A \right| 

{{< /math >}}
在所有 {{< imath >}}p(x){{< /imath >}} 全都相等时取到等号。由于 {{< imath >}}\sum p(x)=1{{< /imath >}}，因此取等时 {{< imath >}}p(x)=\frac{1}{\left| A \right|}{{< /imath >}}。也就是 {{< imath >}}X{{< /imath >}} 服从均匀分布时熵最大。

**(2)**

根据定义，有
{{< math >}}

\log_{2}\mathbb{P}(X) = \log_{2}\left( \prod_{i=1}^{n} \mathbb{P}(X_{i}) \right) = \sum_{i=1}^{n} \log_{2}\mathbb{P}(X_{i})

{{< /math >}}
令 {{< imath >}}Z_{i}=-\log_{2}\mathbb{P}(X_{i}){{< /imath >}}。由于 {{< imath >}}X_{i}{{< /imath >}} 独立同分布，因此 {{< imath >}}Z_{i}{{< /imath >}} 也独立同分布。

注意到 {{< imath >}}Z_{i}{{< /imath >}} 的期望正是 {{< imath >}}H(X_{i}){{< /imath >}} 的定义：
{{< math >}}

\mathbf{E}[Z_{i}] = \sum_{x \in A}\mathbb{P}(X_{i}=x)\cdot (-\log_{2}\mathbb{P}(X_{i}=x)) = H(X_{i})

{{< /math >}}
由于 {{< imath >}}A{{< /imath >}} 是有限集，因此 {{< imath >}}\mathbf{E}[Z_{i}]{{< /imath >}} 存在上界，{{< imath >}}\mathbf{E}[|Z_{i}|]< \infty{{< /imath >}}。从而根据弱大数定律，有
{{< math >}}

\dfrac{1}{n}\sum_{i=1}^{n} Z_{i} \xrightarrow{P} \mathbf{E}[Z]

{{< /math >}}
带回就得到了
{{< math >}}

-\dfrac{1}{n}\log_{2}\mathbb{P}(\vec{X})\xrightarrow{P} H(X)

{{< /math >}}
**(3)**

如果 {{< imath >}}\vec{x}\in A_{\varepsilon}^{(n)}{{< /imath >}}，那么带入定义，化简可得
{{< math >}}

2^{-n(H(X)+\varepsilon)} \leq \mathbb{P}(\vec{X}=\vec{x}) \leq  2^{-n(H(X)-\varepsilon)}

{{< /math >}}
首先证明上界。考虑
{{< math >}}

\mathbb{P}(A_{\varepsilon}^{(n)}) = \sum_{\vec{x}\in A_{\varepsilon}^{(n)}}\mathbb{P}(\vec{X}=\vec{x}) \geq  \sum_{\vec{x}\in A_{\varepsilon}^{(n)}}2^{-n(H(X)+\varepsilon)} = \left| A_{\varepsilon}^{(n)} \right| \cdot 2^{-n(H(X)+\varepsilon)}

{{< /math >}}
由于 {{< imath >}}\mathbb{P}(A_{\varepsilon}^{(n)})\leq 1{{< /imath >}}，就得到了
{{< math >}}

\left| A_{\varepsilon}^{(n)} \right| \cdot 2^{-n(H(X)+\varepsilon)} \leq  1 \implies \left| A_{\varepsilon}^{(n)} \right| \leq  2^{n(H(X)+\varepsilon)}

{{< /math >}}
接着证明下界。根据 {{< imath >}}(2){{< /imath >}}，我们知道对于给定 {{< imath >}}\varepsilon>0{{< /imath >}}，存在 {{< imath >}}N\in \mathbb{N}{{< /imath >}} 使得当 {{< imath >}}n>N{{< /imath >}} 时
{{< math >}}

\mathbb{P}(A_{\varepsilon}^{(n)}) > 1-\varepsilon

{{< /math >}}
从而
{{< math >}}

\left| A_{\varepsilon}^{(n)} \right| \cdot 2^{-n(H(X)-\varepsilon)} > 1-\varepsilon \implies \left| A_{\varepsilon}^{(n)} \right| > (1-\varepsilon)\cdot 2^{n(H(X)-\varepsilon)}

{{< /math >}}
综上，证明了
{{< math >}}

(1-\varepsilon)\cdot 2^{n(H(X)-\varepsilon)} < \left| A_{\varepsilon}^{(n)} \right| \leq  2^{n(H(X)+\varepsilon)}

{{< /math >}}
## Problem 3

**(1)**

根据提示，设 {{< imath >}}X_{n}{{< /imath >}} 为从 {{< imath >}}(0,0){{< /imath >}} 出发，长度为 {{< imath >}}n{{< /imath >}} 的开放路径个数。当 {{< imath >}}\left| C_{0,0} \right|=\infty{{< /imath >}} 说明至少存在一条经过远点的无限长的路径，从而
{{< math >}}

\mathbb{P}(\left| C_{0,0} \right| =\infty) \leq  \lim_{ n \to \infty } \mathbb{P}(X_{n}\geq  1)

{{< /math >}}
根据马尔可夫不等式，就得到了
{{< math >}}

\mathbb{P}(\left| C_{0,0} \right| =\infty) \leq  \lim_{ n \to \infty } \mathbb{P}(X_{n}\geq  1) \leq  \lim_{ n \to \infty } \mathbf{E}[X_{n}]

{{< /math >}}
我们目标是证明 {{< imath >}}\lim_{ n \to \infty }\mathbf{E}[X_{n}]=0{{< /imath >}}。

考虑计算长度为 {{< imath >}}n{{< /imath >}} 的路径总数。除了第一步，剩下的每一步都不能走回头路，只有 {{< imath >}}3{{< /imath >}} 个方向可选，因此至多只能有 {{< imath >}}4\times 3^{n-1}{{< /imath >}} 条路径。由于每一段路相互独立，因此一条长度为 {{< imath >}}n{{< /imath >}} 的路径开放的概率为 {{< imath >}}p^{n}{{< /imath >}}，因此
{{< math >}}

\mathbf{E}[X_{n}] \leq  (4 \times 3^{n-1}) \cdot p^{n} = \dfrac{4}{3}(3p)^{n}

{{< /math >}}
由于 {{< imath >}}p < \frac{1}{3}{{< /imath >}}，从而
{{< math >}}

\lim_{ n \to \infty } \mathbf{E}[X_{n}] \leq  \lim_{ n \to \infty } \dfrac{4}{3}(3p)^{n} = 0

{{< /math >}}**(2)**

设一条路关闭的概率为 {{< imath >}}q=1-p{{< /imath >}}，那么根据题设，有 {{< imath >}}q<  \frac{1}{10}{{< /imath >}}。

设 {{< imath >}}N_{n}{{< /imath >}} 为对偶网络中长度为 {{< imath >}}n{{< /imath >}} 且包含原点的回路总数。对于任意一条长度为 {{< imath >}}n{{< /imath >}} 的回路，其关闭的概率均为 {{< imath >}}q^{n}{{< /imath >}}。

设事件 {{< imath >}}B=\{ \left| C_{0,0} \right|<\infty \}{{< /imath >}}。根据提示中的 Lemma，{{< imath >}}B{{< /imath >}} 发生等价于 {{< imath >}}\tilde{\mathbb{Z}}^{2}{{< /imath >}} 中存在一条闭合回路 {{< imath >}}\gamma{{< /imath >}} 满足 {{< imath >}}\gamma{{< /imath >}} 包围原点并且 {{< imath >}}\gamma{{< /imath >}} 上每一条边对应 {{< imath >}}\mathbb{Z}^{2}{{< /imath >}} 中的边均关闭。根据 Union Bound，事件 {{< imath >}}B{{< /imath >}} 发生的概率存在上界
{{< math >}}

\mathbb{P}(B) \leq  \sum_{n} N_{n}\cdot q^{n}

{{< /math >}}
我们考虑估计一个 {{< imath >}}N_{n}{{< /imath >}} 的上界。因为回路必然经过 {{< imath >}}x{{< /imath >}} 轴（指 {{< imath >}}\tilde{\mathbb{Z}}^{2}{{< /imath >}} 上的 {{< imath >}}x{{< /imath >}} 轴），所以不妨在 {{< imath >}}x{{< /imath >}} 轴上选择路径起点。因为总长度为 {{< imath >}}n{{< /imath >}}，所以到原点距离不能超过 {{< imath >}}n{{< /imath >}}，从而最多只有 {{< imath >}}2n{{< /imath >}} 种选择。同样第一步有 {{< imath >}}4{{< /imath >}} 个方向，往后每一步只有 {{< imath >}}3{{< /imath >}} 种方向，这样可以估计出 {{< imath >}}N_{n}{{< /imath >}} 的一个粗略的上界
{{< math >}}

N_{n} \leq  2n \cdot (4 \times 3^{n-1})

{{< /math >}}
从而由于一个环的长度至少为 {{< imath >}}4{{< /imath >}}，所以直接从 {{< imath >}}n=4{{< /imath >}} 开始求和即可
{{< math >}}

\begin{align*}
\mathbb{P}(B) & \leq \sum_{n=4}^{\infty} 2n \cdot(4 \times 3^{n-1})\cdot q^{n} \\
 & < \frac{8}{3}\sum_{n=4}^{\infty} n\cdot \left( \frac{3}{10} \right)^{n} < 1
\end{align*}

{{< /math >}}
因此
{{< math >}}

\mathbb{P}(\left| C_{0,0} \right| > \infty) = 1-\mathbb{P}(\left| C_{0,0} \right| < \infty) > 0

{{< /math >}}
**(3)**

首先当 {{< imath >}}p< p^{*}{{< /imath >}} 时，令事件 {{< imath >}}E=\{ \exists v\in \mathbb{Z}^{2},\left| C_{v} \right|=\infty \}{{< /imath >}}，那么 {{< imath >}}E=\bigcup_{v\in \mathbb{Z}^{2}}\{ \left| C_{v} \right|=\infty \}{{< /imath >}}。

由于二维网格具有平移不变性，所以此时 {{< imath >}}\mathbb{P}(\left| C_{v} \right|=\infty)=\mathbb{P}(\left| C_{0,0} \right|=\infty)=0{{< /imath >}}。那么根据 Union Bound，就有
{{< math >}}

\mathbb{P}(E) \leq  \sum_{v \in \mathbb{Z}^{2}} \mathbb{P}(\left| C_{v} \right| =\infty) = \sum_{v \in \mathbb{Z}^{2}} 0 = 0

{{< /math >}}
当 {{< imath >}}p>p^{*}{{< /imath >}} 时，我们证明事件 {{< imath >}}E{{< /imath >}} 是一个尾事件。{{< imath >}}E{{< /imath >}} 等价于网格中存在无穷多的点联通，根据图的性质，改变有限条边的状态并不会改变 {{< imath >}}E{{< /imath >}}。

形式化地描述，将 {{< imath >}}\mathbb{Z}^2{{< /imath >}} 中的边集进行可数编号，记为序列 {{< imath >}}\{X_n\}_{n \ge 1}{{< /imath >}}，其中 {{< imath >}}X_n{{< /imath >}} 为第 {{< imath >}}n{{< /imath >}} 条边的状态。{{< imath >}}\{X_n\}{{< /imath >}} 为独立同分布序列。事件 {{< imath >}}E{{< /imath >}} 的发生与否不依赖于任意有限条边的状态（修改有限条边不会改变是否存在无限连通分量这一性质）。因此对于任意 {{< imath >}}n{{< /imath >}}， {{< imath >}}E \in \sigma(X_{n+1}, X_{n+2}, \dots){{< /imath >}}，即 {{< imath >}}E{{< /imath >}} 是尾事件。

那么根据 Kolmogorov 0-1 律，有 {{< imath >}}\mathbb{P}(E)\in \{ 0,1 \}{{< /imath >}}。我们只需要验证 {{< imath >}}\mathbb{P}(E)\neq 0{{< /imath >}} 即可。显然 {{< imath >}}\{ \left| C_{0,0} \right|=\infty \}\subseteq E{{< /imath >}}，从而根据单调性
{{< math >}}

\mathbb{P}(E) \geq  \mathbb{P}(\left| C_{0,0} \right| =\infty) > 0

{{< /math >}}
从而 {{< imath >}}\mathbb{P}(E)=1{{< /imath >}}，证毕。

## Problem 4.1

**(1)**

首先由于 {{< imath >}}\mathbb{P}(\left| Y \right|\geq t)=\mathbb{P}(Y\geq t) + \mathbb{P}(Y \leq -t){{< /imath >}}，分别考虑这两个概率。

对于任意 {{< imath >}}\lambda >0{{< /imath >}}，根据单调性有
{{< math >}}

\{ Y\geq  t \} \iff \{ e^{ \lambda Y } \geq  e^{ \lambda t } \}

{{< /math >}}
利用马尔可夫不等式，有
{{< math >}}

\mathbb{P}(Y\geq  t) = \mathbb{P}(e^{ \lambda Y }\geq  e^{ \lambda t } ) \leq  \frac{\mathbf{E}[e^{ \lambda Y }]}{e^{ \lambda t }}

{{< /math >}}
带入次高斯条件就有
{{< math >}}

\mathbb{P}(Y\geq  t) \leq  \dfrac{\mathbf{E}[e^{ \lambda Y }]}{e^{ \lambda t }} \leq  e^{ \alpha^{2}\lambda^{2}-\lambda t }

{{< /math >}}
而指数中的二次函数存在最小值 {{< imath >}}\alpha^{2}\lambda^{2}-\lambda t\geq -\frac{t^{2}}{4\alpha^{2}}{{< /imath >}}，从而
{{< math >}}

\mathbb{P}(Y\geq  t) \leq  \exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\}

{{< /math >}}
对于 {{< imath >}}mk\mathbb{P}Y\leq-t{{< /imath >}}，考虑随机变量 {{< imath >}}-Y{{< /imath >}}，利用对称性同样有
{{< math >}}

\mathbb{P}(Y\leq -t)=\mathbb{P}(-Y\geq t) \leq  \exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\}

{{< /math >}}
因此
{{< math >}}

\mathbb{P}(\left| Y \right| \geq  t) \leq  2\exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\}

{{< /math >}}
**(2)**

由于直接带入积分只能得到 {{< imath >}}O(n){{< /imath >}} 量级的 {{< imath >}}\alpha{{< /imath >}} 的界，因此考虑使用截断法。

将积分区间分成 {{< imath >}}[0,\delta]{{< /imath >}} 和 {{< imath >}}(\delta,\infty){{< /imath >}} 两段。在 {{< imath >}}t{{< /imath >}} 比较大的时候再考虑使用 {{< imath >}}(2){{< /imath >}} 中给出的上界，{{< imath >}}t{{< /imath >}} 比较小的时候直接使用概率不超过 {{< imath >}}1{{< /imath >}} 的限制，那么就有
{{< math >}}

\begin{align*}
\mathbf{E}[\max_{i\in[n]}\left| Y_{i} \right|] & = \int_{0}^{\infty} \mathbb{P}(\max_{i\in[n]}\left| Y_{i} \right| 
>t) \mathrm{d}t  \\
 & = \int_{0}^{\delta} \mathbb{P}(\dots)\mathrm{d}t + \int_{\delta}^{\infty} \mathbb{P}(\dots)\mathrm{d}t \\
 & \leq  \int_{0}^{\delta} 1\cdot \mathrm{d}t  + \int_{\delta}^{\infty} \left( \sum_{i\in[n]} \mathbb{P}(\left| Y_{i} \right| > t)\right) \mathrm{d}t  \\
 & \leq \delta +  \int_{\delta}^{\infty} \left( \sum_{i\in[n]}2\exp \left\{  -\frac{t^{2}}{4\alpha_{i}^{2}}  \right\} \right) \mathrm{d}t \\
(\alpha=\max_{i\in[n]}\alpha_{i}) & \leq \delta + 2n\int_{\delta}^{\infty} \exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\} \mathrm{d}t 
\end{align*}

{{< /math >}}
我们需要估算 {{< imath >}}\int_{\delta}^{\infty} e^{ -t^{2}/4\alpha^{2} } \mathrm{d}t{{< /imath >}}。由于在积分区间上 {{< imath >}}t>\delta{{< /imath >}}，因此
{{< math >}}

\begin{align*}
\int_{\delta}^{\infty} \exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\} \mathrm{d}t & \leq \frac{1}{\delta} \int_{\delta}^{\infty} t\exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\} \mathrm{d}t \\
 & = \frac{1}{2\delta}\int_{\delta}^{\infty} \exp \left\{  -\frac{t^{2}}{4\alpha^{2}}  \right\} \mathrm{d}t^{2} \\
 & = \frac{2\alpha^{2}}{\delta} \exp \left\{  -\frac{\delta^{2}}{4\alpha^{2}}  \right\}
\end{align*}

{{< /math >}}
带回原式就有
{{< math >}}

\mathbf{E}[\max\left| Y_{i} \right| ] \leq  \delta + 2n\cdot \frac{2\alpha^{2}}{\delta}\cdot \exp \left\{  -\frac{\delta^{2}}{4\alpha^{2}}  \right\}

{{< /math >}}
我们选取 {{< imath >}}\delta{{< /imath >}} 使得 {{< imath >}}\exp \left\{  -\frac{\delta^{2}}{4\alpha^{2}}  \right\} = \frac{1}{2n}{{< /imath >}}，那么
{{< math >}}

\delta=\alpha \sqrt{ 4\ln(2n) } = 2\alpha \sqrt{ \ln(2n) }

{{< /math >}}
带入有
{{< math >}}

\mathbf{E}[\max\left| Y_{i} \right| ] \leq  2\alpha \sqrt{ \ln(2n) } + \frac{\alpha}{\sqrt{ \ln(2n) }} = \alpha \sqrt{ \ln(2n) } \left( 2 + \frac{1}{\ln(2n)} \right)

{{< /math >}}
由于 {{< imath >}}\ln(2n)>1{{< /imath >}}，因此括号内是有界常数；并且 {{< imath >}}\sqrt{ \ln(2n) } <2\sqrt{ \ln n }{{< /imath >}}。所以存在常数 {{< imath >}}C{{< /imath >}} 使得
{{< math >}}

\mathbf{E}[\max_{i \in[n]}\left| Y_{i} \right| ] \leq  C\sqrt{ \ln n }\cdot\max_{i} \alpha_{i}

{{< /math >}}
## Problem 4.2

**(1)**

根据定义，有
{{< math >}}

F(x) = \mathbb{P}(X\leq x) = \mathbf{E}[\mathbb{I}_{X\leq x}]

{{< /math >}}
引入 {{< imath >}}X_{1}',\dots,X_{n}'{{< /imath >}}，这时 {{< imath >}}F(x){{< /imath >}} 也可以看成新样本的经验分布函数 {{< imath >}}F_{n}'(x){{< /imath >}} 的期望。
{{< math >}}

F(x) = \mathbf{E}{F_{n}'(x)} = \mathbf{E}\left[ \frac{1}{n}\sum_{i=1}^{n} \mathbb{I}_{X'_{i}\leq x} \right]

{{< /math >}}
要处理的左式为
{{< math >}}

\begin{align*}
\text{LHS} & = \mathbf{E}\left[\sup_{x \in \mathbb{R}}\left| F_{n}(x)-F(x) \right| \right] \\
 & = \mathbf{E}\left[\sup_{x \in \mathbb{R}}\left| F_{n}(x)-\mathbf{E}[F'_{n}(x)] \right| \right] 
\end{align*}

{{< /math >}}
由于对 {{< imath >}}X'{{< /imath >}} 求期望时 {{< imath >}}X{{< /imath >}} 可以看作常数，因此 {{< imath >}}F_{n}(x)-\mathbf{E}[F'_{n}(x)]=\mathbf{E}[F_{n}(x)-F_{n}'(x)]|_{X'}{{< /imath >}}。由于函数 {{< imath >}}g(X)=\sup_{x}\left| X(x) \right|{{< /imath >}} 是一个凸函数，因此根据琴生不等式，就有
{{< math >}}
\mathbf{E} \left[ \sup_{x} |\mathbf{E}' [F_n(x) - F'_n(x)]| \right] \le \mathbf{E} \left[ \mathbf{E}' \left[ \sup_{x} |F_n(x) - F'_n(x)| \right] \right]
{{< /math >}}
其中 {{< imath >}}\mathbf{E}'{{< /imath >}} 表示对 {{< imath >}}X'{{< /imath >}} 求的期望。

现在我们只需要分析 {{< imath >}}\left| F_{n}(x)-F_{n}'(x) \right|{{< /imath >}}，带入得到
{{< math >}}
F_n(x) - F'_n(x) = \frac{1}{n} \sum_{i=1}^n \mathbb{I}_{X_i \le x} - \frac{1}{n} \sum_{i=1}^n \mathbb{I}_{X'_i \le x} = \frac{1}{n} \sum_{i=1}^n (\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x})
{{< /math >}}
带回不等式就得到了
{{< math >}}

\text{LHS} \leq  \mathbf{E}\left[ \sup_{x}\left| \frac{1}{n}\sum_{i=1}^{n} (\mathbb{I}_{X_{i}\leq  x} - \mathbb{I}_{X_{i}'\leq x}) \right|  \right] = \frac{1}{n} \mathbf{E} \left[ \sup_{x\in\mathbb{R}} \left| \sum_{i=1}^n (\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x}) \right| \right]

{{< /math >}}

**(2)**

设 {{< imath >}}Z_{i}=\mathbb{I}_{X_{i}\leq x}-\mathbb{I}_{X'_{i}\leq x},W_{i}=\varepsilon_{i}Z_{i}{{< /imath >}}。由于 {{< imath >}}X{{< /imath >}} 和 {{< imath >}}X'{{< /imath >}} 独立同分布，因此根据对称性，如果交换 {{< imath >}}X{{< /imath >}} 和 {{< imath >}}X'{{< /imath >}}，那么 {{< imath >}}Z_{i}{{< /imath >}} 就会变成 {{< imath >}}-Z_{i}{{< /imath >}}，这意味着 {{< imath >}}Z_{i}{{< /imath >}} 是一个关于 {{< imath >}}0{{< /imath >}} 对称的随机变量。

引入 {{< imath >}}\varepsilon_{i}{{< /imath >}} 后，若 {{< imath >}}\varepsilon_{i}=1{{< /imath >}}，那么 {{< imath >}}W_{i}=Z_{i}{{< /imath >}}；否则 {{< imath >}}W_{i}=-Z_{i}{{< /imath >}}，这时由于 {{< imath >}}Z_{i}{{< /imath >}} 和 {{< imath >}}-Z_{i}{{< /imath >}} 同分布，因此 {{< imath >}}Z_{i}{{< /imath >}} 和 {{< imath >}}W_{i}{{< /imath >}} 也同分布。所以乘以 {{< imath >}}\varepsilon_{i}{{< /imath >}} 不改变分布，因此 {{< imath >}}Z_{i}{{< /imath >}} 和 {{< imath >}}W_{i}{{< /imath >}} 具有相同的分布。

接着我们目标证明 {{< imath >}}\mathbf{E} \left[ \sup_{x} |F_n(x) - F(x)| \right] \le \frac{2}{n} \cdot \mathbf{E} \left[ \sup_{x} \left| \sum_{i=1}^n \varepsilon_i \cdot \mathbb{I}_{X_i \le x} \right| \right]{{< /imath >}}，根据第一小问，已经有
{{< math >}}

\text{LHS} \leq \frac{1}{n} \mathbf{E} \left[ \sup_{x\in\mathbb{R}} \left| \sum_{i=1}^n (\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x}) \right| \right]

{{< /math >}}
根据刚才的性质，我们可以将求和式中的 {{< imath >}}(\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x}){{< /imath >}} 替换为 {{< imath >}}\varepsilon_{i}(\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x}){{< /imath >}}，因为不仅同分布而且 {{< imath >}}i{{< /imath >}} 之间也相互独立。于是右侧就变为了
{{< math >}}

\frac{1}{n} \mathbf{E} \left[ \sup_{x\in\mathbb{R}} \left| \sum_{i=1}^n \varepsilon_{i}(\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x}) \right| \right]

{{< /math >}}
将内侧求和展开，得到了
{{< math >}}

\sum_{i=1}^{n} \varepsilon_{i}(\mathbb{I}_{X_{i}\leq x}-\mathbb{I}_{X'_{i}\leq x}) = \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} - \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}'\leq x}

{{< /math >}}
从而
{{< math >}}

\begin{align*}
\sup_{x\in\mathbb{R}} \left| \sum_{i=1}^n (\mathbb{I}_{X_i \le x} - \mathbb{I}_{X'_i \le x}) \right| & = \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} - \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}'\leq x} \right|  \\
 & \leq  \sup_{x \in \mathbb{R}} \left( \left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} \right| +\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}'\leq x} \right|  \right) \\
 & \leq  \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} \right| + \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X'_{i}\leq x} \right|
\end{align*}

{{< /math >}}
从而
{{< math >}}

\begin{align*}
\text{LHS} & \leq  \frac{1}{n}\mathbf{E}\left[ \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} \right| + \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X'_{i}\leq x} \right| \right] \\
 & = \frac{1}{n}\mathbf{E}\left[ \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} \right| \right] + \frac{1}{n}\mathbf{E}\left[ \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X'_{i}\leq x} \right| \right] \\
 & = \frac{2}{n}\mathbf{E}\left[ \sup_{x \in \mathbb{R}}\left| \sum_{i=1}^{n} \varepsilon_{i}\mathbb{I}_{X_{i}\leq x} \right| \right]
\end{align*}

{{< /math >}}
证毕。

## Problem 4.3

设 {{< imath >}}a_{i}=\mathbb{I}_{x_{i}\leq x}-\mathbb{I}_{x_{i}\leq y}{{< /imath >}}，那么 {{< imath >}}Z_{x}-Z_{y}=\sum_{i=1}^{n}\varepsilon_{i}a_{i}{{< /imath >}}。再令 {{< imath >}}\sigma=\sqrt{ \sum_{i=1}^{n}a_{i}^{2} }{{< /imath >}}，那么
{{< math >}}

Z=\dfrac{\sum_{i=1}^{n} \varepsilon_{i}a_{i}}{\sigma} = \sum_{i=1}^{n} \varepsilon_{i}\left( \frac{a_{i}}{\sigma} \right),\quad \sum_{i=1}^{n} \left( \frac{a_{i}}{\sigma} \right)^{2}=1

{{< /math >}}
计算 {{< imath >}}Z{{< /imath >}} 的矩生成函数，有
{{< math >}}
\mathbf{E}[e^{\lambda Z}] = \mathbf{E}\left[ \exp\left( \lambda \sum_{i=1}^n w_i \varepsilon_i \right) \right] = \mathbf{E}\left[ \prod_{i=1}^n \exp( \lambda w_i \varepsilon_i ) \right]
{{< /math >}}
其中 {{< imath >}}w_{i}=\frac{a_{i}}{\sigma}{{< /imath >}}。

利用提示中的式子进行放缩，得到
{{< math >}}

e^{ \lambda w_{i}\varepsilon_{i} } \leq  \lambda w_{i}\varepsilon_{i} + e^{ (\lambda w_{i}\varepsilon_{i})^{2} } \implies \mathbf{E}[e^{ \lambda w_{i}\varepsilon_{i} }] \leq  \mathbf{E}[\lambda w_{i}\varepsilon_{i}] + \mathbf{E}[e^{ (\lambda w_{i}\varepsilon_{i})^{2} }]

{{< /math >}}
其中 {{< imath >}}\mathbf{E}[\lambda w_{i}\varepsilon_{i}]=0{{< /imath >}} 并且 {{< imath >}}\mathbf{E}[e^{ (\lambda w_{i}\varepsilon_{i})^{2} }]=\mathbf{E}[e^{ \lambda^{2}w_{i}^{2} }]=e^{ \lambda^{2}w_{i}^{2} }{{< /imath >}}。带入就有
{{< math >}}
\mathbf{E}[e^{\lambda w_i \varepsilon_i}] \le e^{\lambda^2 w_i^2}
{{< /math >}}
带回就有
{{< math >}}

\begin{align*}
\mathbf{E}[e^{ \lambda Z }] & =\prod_{i=1}^{n} \mathbf{E}[e^{ \lambda w_{i}\varepsilon_{i} }] \\
 & \leq  \prod_{i=1}^{n} e^{ \lambda^{2}w_{i}^{2} }  \\
 & = \exp\left( \lambda^{2}\sum_{i=1}^{n} w_{i}^{2} \right) \\
 & = \exp(\lambda^{2})\quad \left( \sum_{i=1}^{n} w_{i}^{2}=1 \right)
\end{align*}

{{< /math >}}
证毕。

## Problem 4.4

**(1)**

定义映射 {{< imath >}}\Phi:\mathbb{R}\to \mathbb{R}^{n}{{< /imath >}}，对于任意 {{< imath >}}x \in \mathbb{R}{{< /imath >}}，有
{{< math >}}

\Phi(x) = \left( \frac{1}{\sqrt{ n }}\mathbb{I}_{x_{1}\leq x},\frac{1}{\sqrt{ n }}\mathbb{I}_{x_{2}\leq x}, \dots, \frac{1}{\sqrt{ n }}\mathbb{I}_{x_{n}\leq x}\right)

{{< /math >}}
从而题目中给的距离可以重写为
{{< math >}}

d(x,y) = \| \Phi(x)-\Phi(y) \|_{2} 

{{< /math >}}
根据三角不等式，对于任意向量 {{< imath >}}u,v,w\in \mathbb{R}^{n}{{< /imath >}}，都有
{{< math >}}

\| u-v \| \leq  \| u-w \|  + \| v-w \| 

{{< /math >}}
从而带入就有
{{< math >}}

d(x,y) \leq  d(x,z) + d(z,y)

{{< /math >}}
证毕。

**(2)**

设经验分布函数 {{< imath >}}F_{n}(x)=\frac{1}{n}\sum_{i=1}^{n}\mathbb{I}_{x_{i}\leq x}{{< /imath >}}。我们化简距离公式，不妨先假设 {{< imath >}}x\geq y{{< /imath >}}，那么 {{< imath >}}\mathbb{I}_{x_{i}\leq x}-\mathbb{I}_{x_{i}\leq y}=\mathbb{I}_{y< x_{i}\leq x}{{< /imath >}}，从而
{{< math >}}

[d(x,y)]^{2}=\frac{1}{n}\sum_{i=1}^{n} \mathbb{I}_{y< x_{i}\leq x} = F_{n}(x) - F_{n}(y)

{{< /math >}}
对于 {{< imath >}}x< y{{< /imath >}} 也同理，就得到了
{{< math >}}

d(x,y) = \sqrt{ \left| F_{n}(x)-F_{n}(y) \right|  }

{{< /math >}}
我们首先构造 {{< imath >}}n+1{{< /imath >}} 个点的集合 {{< imath >}}S_{0}{{< /imath >}}。由于 {{< imath >}}F_{n}(x){{< /imath >}} 是一个阶梯函数，只在 {{< imath >}}x_{1},\dots,x_{n}{{< /imath >}} 共 {{< imath >}}n{{< /imath >}} 个点处发生跳跃，值域为 {{< imath >}}\left\{  0,\frac{1}{n},\frac{2}{n},\dots,1  \right\}{{< /imath >}}。我们构造 {{< imath >}}S_{0}=\{ x_{1},\dots,x_{n} \}\cup \{ x_{\min}-1 \}{{< /imath >}}，大小为 {{< imath >}}n+1{{< /imath >}}。这样对于任意 {{< imath >}}x \in \mathbb{R}{{< /imath >}}，其 {{< imath >}}F_{n}{{< /imath >}} 值必然等于 {{< imath >}}S_{0}{{< /imath >}} 中某一点的 {{< imath >}}F_{n}{{< /imath >}} 值，也就是 {{< imath >}}\exists y\in S_{0}{{< /imath >}}，使得 {{< imath >}}F_{n}(x)=F_{n}(y)\implies d(x,y)=0< \varepsilon{{< /imath >}}。从而用 {{< imath >}}n+1{{< /imath >}} 个点实现 {{< imath >}}0{{< /imath >}} 误差覆盖。

针对 {{< imath >}}\frac{2}{\varepsilon^{2}}{{< /imath >}}，我们考虑分割值域，将 {{< imath >}}[0,1]{{< /imath >}} 分割成长度为 {{< imath >}}\varepsilon^{2}{{< /imath >}} 的小区间。令 {{< imath >}}m=\left\lceil  \frac{1}{\varepsilon^{2}}  \right\rceil{{< /imath >}}，构造区间 {{< imath >}}J_{k}=[(k-1)\varepsilon^{2},k\varepsilon^{2}],k\in[m]{{< /imath >}}。设 {{< imath >}}F_{n}(x){{< /imath >}} 的值域为 {{< imath >}}U{{< /imath >}}，对于每一个区间 {{< imath >}}J_{K}{{< /imath >}}，如果和 {{< imath >}}U{{< /imath >}} 存在交集，那么就从其中随机选择一个点加入 {{< imath >}}S_{\varepsilon}{{< /imath >}}，这样一共选出了 {{< imath >}}m{{< /imath >}} 个点。由于
{{< math >}}

\left| S_{\varepsilon} \right| \leq  \left\lceil  \frac{1}{\varepsilon^{2}}  \right\rceil <  \frac{1}{\varepsilon^{2}} + 1 \leq  \frac{2}{\varepsilon^{2}}

{{< /math >}}
因此这时集合大小不超过 {{< imath >}}\frac{2}{\varepsilon^{2}}{{< /imath >}}。

这时对于任意 {{< imath >}}x \in \mathbb{R}{{< /imath >}}，{{< imath >}}F_n(x){{< /imath >}} 必然落在某个区间 {{< imath >}}J_k{{< /imath >}} 中。因为 {{< imath >}}F_n(x){{< /imath >}} 存在，所以 {{< imath >}}J_k \cap U{{< /imath >}} 非空，我们在 {{< imath >}}S_\varepsilon{{< /imath >}} 中一定选了一个对应的代表 {{< imath >}}y_k{{< /imath >}}。 此时，{{< imath >}}F_n(x){{< /imath >}} 和 {{< imath >}}F_n(y_k){{< /imath >}} 都在长度为 {{< imath >}}\varepsilon^2{{< /imath >}} 的区间 {{< imath >}}J_k{{< /imath >}} 内，所以
{{< math >}}
|F_n(x) - F_n(y_k)| \le \varepsilon^2 \implies d(x,y_{k})=\sqrt{ \left| F_{n}(x)-F_{n}(y_{k}) \right|  }\leq  \sqrt{ \varepsilon^{2} }=\varepsilon
{{< /math >}}
综上，取 {{< imath >}}n+1{{< /imath >}} 和 {{< imath >}}\frac{2}{\varepsilon^{2}}{{< /imath >}} 无论哪个集合，均能满足条件，证毕。

**(3)**

根据定义，有 {{< imath >}}d(x,y_{k}(x))\leq \varepsilon_{k},d(x,y_{k-1}(x))\leq\varepsilon_{k-1}{{< /imath >}}。那么根据三角不等式，就有
{{< math >}}

d(y_{k-1}(x),y_{k}(x)) \leq  d(y_{k-1}(x),x) + d(x,y_{k}(x)) \leq  \varepsilon_{k-1}+\varepsilon_{k}

{{< /math >}}
其中 {{< imath >}}\varepsilon_{k-1}+\varepsilon_{k}=3\cdot 2^{-k}{{< /imath >}}。

确界 {{< imath >}}\sup_{x \in \mathbb{R}}{{< /imath >}} 实际上只需要在覆盖集 {{< imath >}}S_{\varepsilon_k}{{< /imath >}} 和 {{< imath >}}S_{\varepsilon_{k-1}}{{< /imath >}} 的元素对中寻找。定义集合 {{< imath >}}A = \{ (u, v) : u \in S_{\varepsilon_{k}}, v \in S_{\varepsilon_{k-1}}, d(u, v) \le 3 \cdot 2^{-k} \}{{< /imath >}}，根据包含关系，原式中的 {{< imath >}}\sup{{< /imath >}} 肯定被 {{< imath >}}A{{< /imath >}} 中的最大值控制，也就是
{{< math >}}

\sup_{x \in \mathbb{R}} \left| Z_{y_{k-1}(x)}-Z_{y_{k}(x)} \right| \leq  \max_{(u,v)\in A}\left| Z_{u}-Z_{v} \right|  

{{< /math >}}
我们考虑 {{< imath >}}A{{< /imath >}} 的集合大小。根据 {{< imath >}}4.(2){{< /imath >}} 中的结论，有
{{< math >}}

\left| A \right| \leq  \left| S_{\varepsilon_{k}} \right| \cdot \left| S_{\varepsilon_{k-1}} \right| \leq  \frac{2}{(2^{-k})^{2}}\cdot \frac{2}{(2^{-(k-1)})^{2}} = 2\cdot 4^{k}\cdot 2 \cdot 4^{k-1} = 4^{2k}

{{< /math >}}
根据第 {{< imath >}}3{{< /imath >}} 问的结论，化简得到 {{< imath >}}\frac{Z_{u}-Z_{v}}{\sqrt{ n }\cdot d(u,v)}{{< /imath >}} 是一个参数为 {{< imath >}}1{{< /imath >}} 的次高斯变量，从而 {{< imath >}}Z_{u}-Z_{v}{{< /imath >}} 是一个参数为 {{< imath >}}\sigma_{u,v}=\sqrt{ n }\cdot d(u,v){{< /imath >}} 的次高斯变量。根据条件就有 {{< imath >}}\sigma_{\max}\leq \sqrt{ n }\cdot 3 \cdot 2^{-k}{{< /imath >}}。共有 {{< imath >}}\left| A \right|{{< /imath >}} 个次高斯变量，那么根据 {{< imath >}}21(2){{< /imath >}}，就有
{{< math >}}

\begin{align*}
\mathbf{E}[\max_{(u,v)\in A}\left| Z_{u}-Z_{v} \right| ] & \leq  C\cdot \sqrt{ \ln \left| A \right|  }\cdot \sigma_{\max} \\
 & \leq  C\cdot \sqrt{ 2k\cdot \ln 4 } \cdot (3\sqrt{ n } \cdot 2^{-k}) \\
 & = (3\sqrt{ 2 \ln 4 }C)\cdot \sqrt{ n }\cdot \sqrt{ k }\cdot 2^{-k}
\end{align*}

{{< /math >}}
令 {{< imath >}}C'=3\sqrt{ 2 \ln 4 }C{{< /imath >}}，也是一个和 {{< imath >}}n,k{{< /imath >}} 无关的常数，从而就得到了
{{< math >}}
\mathbf{E} \left[ \frac{1}{\sqrt{n}} \sup_{x \in \mathbb{R}} |Z_{y_{k-1}(x)} - Z_{y_k(x)}| \right] \le \frac{1}{\sqrt{n}} \cdot C' \sqrt{n} \sqrt{k} 2^{-k} = C' \sqrt{k} 2^{-k}
{{< /math >}}

**(4)**

#TODO 

**(5)**

首先我们证明
{{< math >}}

\mathbf{E}\left[ \sup_{x \in \mathbb{R}}\left| \frac{1}{\sqrt{ n }} Z_{x} \right|  \right] \leq  2 + 2C'

{{< /math >}}
根据 {{< imath >}}4.(2){{< /imath >}}，对于 {{< imath >}}\varepsilon_{k}=2^{-k}{{< /imath >}}，存在集合 {{< imath >}}S_{\varepsilon_{k}}{{< /imath >}}。对于任意 {{< imath >}}x{{< /imath >}}，设 {{< imath >}}y_{k}(x){{< /imath >}} 为 {{< imath >}}S_{\varepsilon_{k}}{{< /imath >}} 中距离 {{< imath >}}x{{< /imath >}} 最近的点。

考虑截断法。令 {{< imath >}}k^{*}{{< /imath >}} 为满足 {{< imath >}}\varepsilon_{k}< \frac{1}{n}{{< /imath >}} 的最小的 {{< imath >}}k{{< /imath >}}。当 {{< imath >}}k \ge k^*{{< /imath >}} 时，由于 {{< imath >}}d(x, y_k(x)) < \frac{1}{n} < \frac{1}{\sqrt{n}}{{< /imath >}}，这意味着对于当前的固定样本，{{< imath >}}\mathbb{I}_{x_i \le x}{{< /imath >}} 与 {{< imath >}}\mathbb{I}_{x_i \le y_k(x)}{{< /imath >}} 完全一致，因此 {{< imath >}}Z_x = Z_{y_{k^*}(x)}{{< /imath >}}。 利用裂项求和
{{< math >}}
Z_{x} = Z_{y_{0}(x)} + \sum_{k=1}^{k^{*}} (Z_{y_{k}(x)} - Z_{y_{k-1}(x)})
{{< /math >}}
两边取绝对值，除以 {{< imath >}}\sqrt{n}{{< /imath >}}、取上确界并求期望
{{< math >}}
\mathbf{E}\left[ \sup_{x} \left| \frac{Z_{x}}{\sqrt{n}} \right| \right] \le \mathbf{E}\left[ \sup_{x} \frac{|Z_{y_{0}(x)}|}{\sqrt{n}} \right] + \sum_{k=1}^{\infty} \mathbf{E}\left[ \sup_{x} \frac{|Z_{y_{k}(x)} - Z_{y_{k-1}(x)}|}{\sqrt{n}} \right]
{{< /math >}}
对于 {{< imath >}}k=0{{< /imath >}}，根据 {{< imath >}}4.(4){{< /imath >}} 的结论 {{< imath >}}\mathbf{E}[|Z_x|] \le 2\sqrt{n}{{< /imath >}}。从而
{{< math >}}
 \mathbf{E}\left[ \sup_{x} \frac{|Z_{y_{0}(x)}|}{\sqrt{n}} \right] = \frac{1}{\sqrt{n}}\mathbf{E}[|Z_{y_{0}}|] \le \frac{2\sqrt{n}}{\sqrt{n}} = 2
{{< /math >}}
利用 {{< imath >}}4.(3){{< /imath >}} 的结论 {{< imath >}}\mathbf{E}[\dots]\leq C'\sqrt{ k }2^{-k}{{< /imath >}}，有
{{< math >}}
 \sum_{k=1}^{\infty} \mathbf{E}\left[ \sup_{x} \frac{|Z_{y_{k}(x)} - Z_{y_{k-1}(x)}|}{\sqrt{n}} \right] \le \sum_{k=1}^{\infty} C' \sqrt{k} 2^{-k} = C' \sum_{k=1}^{\infty} \sqrt{k} 2^{-k}
{{< /math >}}
由于级数 {{< imath >}}\sum_{k=1}^{\infty} \sqrt{k} 2^{-k}{{< /imath >}} 收敛且和小于 {{< imath >}}2{{< /imath >}}，故上式 {{< imath >}}\le 2C'{{< /imath >}}。

合并就得到了
{{< math >}}
\mathbf{E}\left[ \sup_{x \in \mathbb{R}}\left| \frac{1}{\sqrt{ n }} Z_{x} \right| \right] \le 2 + 2C'
{{< /math >}}
根据 {{< imath >}}2.(2){{< /imath >}} 的结论，有
{{< math >}}
\begin{aligned} \mathbf{E}\left[ \sup_{x}|F_{n}(x) - F(x)| \right] & \le \frac{2}{n} \mathbf{E}\left[ \sup_{x} \left| \sum_{i=1}^{n} \varepsilon_{i} \mathbb{I}_{X_{i} \le x} \right| \right] \\ & = \frac{2}{\sqrt{n}} \mathbf{E}\left[ \sup_{x} \left| \frac{1}{\sqrt{n}} Z_{x} \right| \right] \\ & \le \frac{2}{\sqrt{n}} (2 + 2C') = \frac{4 + 4C'}{\sqrt{n}} \end{aligned}
{{< /math >}}
令 {{< imath >}}C''=4+4C'{{< /imath >}}，与 {{< imath >}}n{{< /imath >}} 无关，即证
{{< math >}}
\mathbf{E}\left[ \sup_{x \in \mathbb{R}}|F_{n}(x) - F(x)| \right] \le \frac{C''}{\sqrt{n}}
{{< /math >}}
