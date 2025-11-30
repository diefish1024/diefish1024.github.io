---
tags:
- learning
- math
- probability-theory
- homework
discipline: mathematics
publish: true
date: '2025-11-25T10:18:00+08:00'
title: MATH2701 HW6
categories:
- course-note
---
## Problem 1

**(1)**

根据泊松分布的定义，我们有
{{< math >}}

\mathbb{P}[X=\lambda+k] = \dfrac{e^{ -\lambda }\lambda^{\lambda+k}}{(\lambda+k)!},\quad \mathbb{P}[X=\lambda-k-1] = \dfrac{e^{ -\lambda }\lambda^{\lambda-k-1}}{(\lambda-k-1)!}

{{< /math >}}
我们计算两者的比值，有
{{< math >}}

\dfrac{\mathbb{P}[X=\lambda+k]}{\mathbb{P}[X=\lambda-k-1]} = \dfrac{\lambda^{2k+1}\cdot(\lambda-k-1)!}{(\lambda+k)!} = \dfrac{\lambda^{2k+1}}{(\lambda+k)(\lambda+k-1)\dots(\lambda-k)}

{{< /math >}}
将分母的乘积左右两两配对，得到
{{< math >}}

(\lambda+k)\dots(\lambda-k) = \lambda \cdot \prod_{i=1}^{k} (\lambda^{2}-k^{2}) > \lambda \cdot \prod_{i=1}^{k} \lambda^{2} = \lambda^{2k+1}

{{< /math >}}
从而就有
{{< math >}}

\dfrac{\mathbb{P}[X=\lambda+1]}{\mathbb{P}[X=\lambda-k-1]} \geq  1 \implies \mathbb{P}[X=\lambda+1]\geq  \mathbb{P}[X=\lambda-k-1]

{{< /math >}}

接着证明 {{< imath >}}\mathbb{P}[X\geq\lambda]\geq \frac{1}{2}{{< /imath >}}，将事件展开并拆分可以得到
{{< math >}}

\begin{align*}
\mathbb{P}[X\geq \lambda] & =\sum_{k=0}^{\infty} \mathbb{P}[X=\lambda+k] \\
 & = \sum_{k=0}^{\lambda-1} \mathbb{P}[X=\lambda+k] + \mathbb{P}[X\geq  2\lambda] \\
 & \geq  \sum_{k=0}^{\lambda-1} \mathbb{P}[X=\lambda+k]
\end{align*}

{{< /math >}}
我们再考虑 {{< imath >}}\mathbb{P}[X< \lambda]{{< /imath >}}，也就是
{{< math >}}

\begin{align*}
\mathbb{P}[X< \lambda] & = \sum_{k=0}^{\lambda-1} \mathbb{P}[X=\lambda-k-1] \\
 & \leq  \sum_{k=0}^{\lambda-1} \mathbb{P}[X=\lambda+k]
\end{align*}

{{< /math >}}
又因为 {{< imath >}}\mathbb{P}[X\geq\lambda]+\mathbb{P}[X< \lambda]=1{{< /imath >}}，这样就得到了
{{< math >}}

1-\mathbb{P}[X\geq \lambda] \leq  \mathbb{P}[X\geq \lambda] \implies \mathbb{P}[X\geq  \lambda] = \dfrac{1}{2}

{{< /math >}}
**(2)**

对于 {{< imath >}}\{ Y \}{{< /imath >}}，我们直到所有球的总数 {{< imath >}}M{{< /imath >}} 是随机的，并且 {{< imath >}}M\sim\text{Pois}(m){{< /imath >}}。

根据全期望公式，我们有
{{< math >}}

\mathbb{E}[f(Y_{1},\dots,Y_{n})] = \sum_{k=0}^{\infty} \mathbb{P}[M=k]\cdot \mathbb{E}[f(Y_{1},\dots,Y_{n})\mid M=k]

{{< /math >}}
其中在固定 {{< imath >}}M=k{{< /imath >}} 时，由于球也是随机扔的，这和固定总数随机放球的情形相同，所以这时
{{< math >}}

\mathbb{E}[f(Y_{1},\dots,Y_{n})\mid M=k] = \mathbb{E}[f(\mathbf{X}^{(k)})]

{{< /math >}}
其中 {{< imath >}}\mathbf{X}^{(k)}{{< /imath >}} 表示固定总数为 {{< imath >}}k{{< /imath >}} 个球时的方案。

由于题设中可知 {{< imath >}}f{{< /imath >}} 关于球数是单增的，因此若 {{< imath >}}k\geq m{{< /imath >}}，我们就有 {{< imath >}}\mathbb{E}[f(\mathbf{X}^{(k)})]\geq \mathbb{E}[f(\mathbf{X}^{(m)})]{{< /imath >}}。

我们对 {{< imath >}}\mathbb{E}[f(\mathbf{Y})]{{< /imath >}} 放缩，只考虑 {{< imath >}}k\geq m{{< /imath >}} 的情形（因为根据第一问知道泊松分布在后一半的概率大于 {{< imath >}}\frac{1}{2}{{< /imath >}}），就有
{{< math >}}

\begin{align*}
\mathbb{E}[f(\mathbf{Y})] & \geq  \sum_{k=m}^{\infty} \mathbb{P}[M=k]\cdot \mathbb{E}[f(\mathbf{Y})\mid M=k] \\
 & = \sum_{k=m}^{\infty} \mathbb{P}[M=k] \cdot \mathbb{E}[f(\mathbf{X}^{(k)})] \\
 & \geq  \mathbb{E}[f(\mathbf{X}^{(m)})]\cdot \mathbb{P}[M\geq m] \\
 & \geq  \dfrac{1}{2}\mathbb{E}[f(\mathbf{X}^{(m)})]
\end{align*}

{{< /math >}}
换回题设中的记号，移项后我们就证明了
{{< math >}}

\mathbb{E}[f(X_{1},X_{2},\dots,X_{n})] \leq  2\cdot \mathbb{E}[f(Y_{1},Y_{2},\dots,Y_{n})]

{{< /math >}}
**(3)**

利用 {{< imath >}}(2){{< /imath >}} 的结论。我们定义函数
{{< math >}}

f(\mathbf{X}) = \mathbb{I}(\text{\textbf{X} 中存在 5 个学生生日在同一天})

{{< /math >}}
显然总人数越多，越容易达成这个条件，因此 {{< imath >}}\mathbb{E}[f]{{< /imath >}} 满足单调性。因此我们可以利用 {{< imath >}}(2){{< /imath >}} 的结论来估算概率。

我们假设某一天生日的学生数量独立服从泊松分布，即 {{< imath >}}Y_{i}\sim\text{Pois}(\lambda){{< /imath >}}，其中
{{< math >}}

\lambda = \dfrac{m}{n} = \dfrac{96}{365} \approx 0.263

{{< /math >}}
此时某一天有 {{< imath >}}\geq 5{{< /imath >}} 个人生日的概率为
{{< math >}}

\mathbb{P}[Y_{i}\geq  5] = \sum_{k=5}^{\infty} \dfrac{e^{ -\lambda }\lambda^{k}}{k!}

{{< /math >}}
采用等比级数放缩，就有
{{< math >}}

\begin{align*}
\mathbb{P}[Y_{i}\geq  5] & = \dfrac{e^{ -\lambda }\lambda^{5}}{5!}\left( 1 + \dfrac{\lambda}{6} + \dfrac{\lambda^{2}}{6\cdot 7} + \dots \right) \\
 & < \dfrac{e^{ -\lambda }\lambda^{5}}{5!}\left[ 1+\dfrac{\lambda}{6} + \left( \dfrac{\lambda}{6} \right)^{2} + \left( \dfrac{\lambda}{6} \right)^{3} + \dots \right] \\
 & = \dfrac{e^{ -\lambda }\lambda^{5}}{5!}\cdot \dfrac{1}{1-\frac{\lambda}{6}} \\
 & = \dfrac{e^{ -\lambda }\lambda^{5}}{20(6-\lambda)} \\
 & \approx 8.43 \times 10^{-6}
\end{align*}

{{< /math >}}
从而利用 Union Bound，得到至少有一天发生的概率的上界是
{{< math >}}

\mathbb{P}[\exists i,Y_{i}\geq  5] \leq  \sum_{i=1}^{365} \mathbb{P}[Y_{i}\geq  5] \approx 365\times 8.43\times 10^{-6}\approx 3.08 \times 10^{-3}

{{< /math >}}
利用 {{< imath >}}(2){{< /imath >}} 的结论，就有
{{< math >}}

\mathbb{P}[\mathbf{X}] \leq  2\cdot \mathbb{P}[\mathbf{Y}] \approx 0.616\% < 0.7\%

{{< /math >}}
证毕。

## Problem 2

**(1)**

令 {{< imath >}}Z=X^{3}{{< /imath >}}。由于 {{< imath >}}X\geq 0{{< /imath >}}，所以 {{< imath >}}Z\geq 0{{< /imath >}}。我们写出 {{< imath >}}Z{{< /imath >}} 的 CDF，
{{< math >}}

\begin{align*}
F_{Z}(z) & = \mathbb{P}[Z \leq z] = \mathbb{P}[X^{3} \leq  z] \\
 & = \mathbb{P}[X \leq  z^{1/3}] \\
 & = 1 - \exp( -\alpha z^{1/3} )
\end{align*}

{{< /math >}}
我们对 {{< imath >}}z{{< /imath >}} 求导即可得到 PDF，
{{< math >}}

\begin{align*}
f_{Z}(z) & = \dfrac{\mathrm{d} }{\mathrm{d}z} (1 - \exp(-\alpha z^{1/3})) \\
 & = - \exp(-\alpha z^{1/3})\cdot \dfrac{\mathrm{d} }{\mathrm{d}z} (-\alpha z^{1/3}) \\
 & = \dfrac{\alpha}{3}z^{-2/3}\exp(-\alpha z^{1/3}),\quad (z\geq  0)
\end{align*}

{{< /math >}}
**(2)**

令 {{< imath >}}Z=2X+3{{< /imath >}}。由于 {{< imath >}}X\geq 0{{< /imath >}}，因此 {{< imath >}}Z\geq 3{{< /imath >}}。写出 {{< imath >}}Z{{< /imath >}} 的 CDF，有
{{< math >}}

\begin{align*}
F_{Z}(z) & = \mathbb{P}[Z\leq z] = \mathbb{P}[2X+3\leq z] \\
 & = \mathbb{P}\left[ X \leq  \dfrac{z-3}{2} \right] \\
 & = 1-\exp\left( -\alpha\left( \dfrac{z-3}{2} \right) \right)
\end{align*}

{{< /math >}}
求导得到
{{< math >}}

\begin{align*}
f_{Z}(z) & = \dfrac{\mathrm{d} }{\mathrm{d}z} \left( 1-\exp\left( -\alpha\left( \dfrac{z-3}{2} \right) \right) \right) \\
 & = \dfrac{\alpha}{2}\exp\left( -\alpha\left( \dfrac{z-3}{2} \right) \right),\quad (z\geq  3)
\end{align*}

{{< /math >}}
**(3)**

令 {{< imath >}}Z=X-Y{{< /imath >}}。此时 {{< imath >}}Z{{< /imath >}} 的范围是 {{< imath >}}\mathbb{R}{{< /imath >}}。我们使用全概率公式，有
{{< math >}}

f_{Z}(z) = \int_{-\infty}^{\infty} f_{X}(x)f_{Y}(x-z) \mathrm{d}x 

{{< /math >}}
由于 {{< imath >}}x,y{{< /imath >}} 均需要非负，因此积分的区间需要满足 {{< imath >}}x\geq 0{{< /imath >}} 且 {{< imath >}}x\geq z{{< /imath >}}。

分类讨论。若 {{< imath >}}z\geq 0{{< /imath >}}，那么限制条件合并为 {{< imath >}}x\geq z{{< /imath >}}，从而
{{< math >}}

\begin{align*}
f_{Z}(z) & = \int_{z}^{\infty} (\alpha e^{ -\alpha x })(\alpha e^{ -\alpha(x-z) }) \mathrm{d}x  \\
 & = \alpha^{2}e^{ \alpha z }\int_{z}^{\infty} e^{ -2\alpha x } \mathrm{d}x  \\
 & = \alpha^{2}e^{ \alpha z }\left[ -\dfrac{1}{2\alpha}e^{ -2\alpha x } \right]_{z}^{\infty} \\
 & = \dfrac{\alpha}{2}e^{ -\alpha z }
\end{align*}

{{< /math >}}
若 {{< imath >}}z< 0{{< /imath >}}，由于对称性，{{< imath >}}X-Y{{< /imath >}} 和 {{< imath >}}Y-X{{< /imath >}} 同分布，也就是 {{< imath >}}f(z)=f(-z){{< /imath >}}，所以直接写出结果
{{< math >}}

f_{Z}(z) = \dfrac{\alpha}{2}e^{ \alpha z }

{{< /math >}}
合并就有
{{< math >}}

f_{Z}(z) = \dfrac{\alpha}{2}e^{ -\alpha \left| z \right|  },\quad z\in \mathbb{R}

{{< /math >}}
**(4)**

使用上一问的 {{< imath >}}Z{{< /imath >}}，令 {{< imath >}}W=\left| Z \right|{{< /imath >}}。我们有 {{< imath >}}W\in [0,+\infty){{< /imath >}}。

由于 {{< imath >}}\left| Z \right|=W{{< /imath >}} 的情况有 {{< imath >}}Z=W{{< /imath >}} 和 {{< imath >}}Z=-W{{< /imath >}} 两种可能，所以
{{< math >}}

f_{W}(w)=f_{Z}(w)+f_{Z}(-w) = \alpha e^{ -\alpha w },\quad (w\geq  0)

{{< /math >}}
**(5)**

令 {{< imath >}}W=Y^{3}{{< /imath >}}，利用第一问，我们有
{{< math >}}

\mathbb{P}[W>w] = \mathbb{P}[Y^{3}>w] = e^{ -\alpha w^{1/3} }

{{< /math >}}
令 {{< imath >}}Z=\min(X,W){{< /imath >}}，于是
{{< math >}}

\mathbb{P}(Z>z) = \mathbb{P}(\min(X,W)>z)

{{< /math >}}
{{< imath >}}\min(X,W)>z{{< /imath >}} 说明两者都同时大于 {{< imath >}}z{{< /imath >}}。因此利用独立性，就有
{{< math >}}

\begin{align*}
\mathbb{P}(Z>z) & = \mathbb{P}(X>z)\cdot \mathbb{P}(W>z) \\
 & = e^{ -\alpha z }\cdot e^{ -\alpha z^{1/3} } \\
 & = e^{ -\alpha(z+z^{1/3}) }
\end{align*}

{{< /math >}}
从而 {{< imath >}}Z{{< /imath >}} 的 CDF 为 {{< imath >}}1-e^{ -\alpha(z+z^{1/3}) }{{< /imath >}}。

接着我们求导得到 PDF，有
{{< math >}}

\begin{align*}
f_{Z}(z) & = \dfrac{\mathrm{d} }{\mathrm{d}z} (1-e^{ -\alpha(z+z^{1/3}) }) \\
 & = \alpha\left( 1+\dfrac{1}{3}z^{-2/3} \right)e^{ -\alpha(z+z^{1/3}) },\quad (z\geq  0)
\end{align*}

{{< /math >}}
**(6)**

同理 {{< imath >}}(5){{< /imath >}}，令 {{< imath >}}Z=\max(X,Y^{3}){{< /imath >}}，我们有
{{< math >}}

F_{Z}(z) = \mathbb{P}(Z\leq z) = \mathbb{P}(\max(X,W)\leq w)

{{< /math >}}
这说明两个数都同时小于等于 {{< imath >}}u{{< /imath >}}，于是
{{< math >}}

\begin{align*}
F_{Z}(z) & = \mathbb{P}(X\leq z)\cdot  \mathbb{P}(W\leq z) \\
 & = F_{X}(z)\cdot F_{W}(w) \\
 & = (1-e^{ -\alpha z })(1-e^{ -\alpha z^{1/3} })
\end{align*}

{{< /math >}}
求导可得
{{< math >}}

\begin{align*}
f_{Z}(z) & = (\alpha e^{ -\alpha z })(1-e^{ -\alpha z^{1/3} })+(1-e^{ -\alpha z })\left( \dfrac{\alpha}{3}z^{-2/3}e^{ -\alpha z^{1/3} } \right),\quad (z\geq  0)
\end{align*}

{{< /math >}}
## Problem 3

**(1)**

由于 {{< imath >}}T_{1},T_{2}{{< /imath >}} 独立，因此它们的联合概率密度函数为
{{< math >}}

f(x,y) = g_{m}(x)\cdot g_{n}(y)

{{< /math >}}
我们需要求在 {{< imath >}}y< x{{< /imath >}} 区域内的概率
{{< math >}}

\begin{align*}
\mathbb{P}(T_{2}< T_{1}) & = \underset{ 0< y< x }{ \iint }  g_{m}(x)g_{n}(y)\mathrm{d}x\mathrm{d}y \\
 & = \int_{0}^{\infty} g_{m}(x)\left( \int_{0}^{x} g_{n}(y) \mathrm{d}y  \right) \mathrm{d}x 
\end{align*}

{{< /math >}}
**(2)**

由于两个队列服从服从参数相同的指数分布 {{< imath >}}\text{Exp}(\lambda){{< /imath >}}，根据指数分布的性质，任意时刻下一次服务完成发生在 {{< imath >}}1{{< /imath >}} 或 {{< imath >}}2{{< /imath >}} 的概率是相等的。我们将整个服务过程视为一系列独立的伯努利试验，也就是抛硬币。如果硬币为正面，代表队列 {{< imath >}}2{{< /imath >}} 完成一次服务；如果硬币为反面，代表队列 {{< imath >}}1{{< /imath >}} 完成一次服务。

事件 {{< imath >}}T_{2}< T_{1}{{< /imath >}} 意味着队列 {{< imath >}}2{{< /imath >}} 的 {{< imath >}}n{{< /imath >}} 名顾客全部完成服务时，队列 {{< imath >}}1{{< /imath >}} 的 {{< imath >}}m{{< /imath >}} 个顾客还没有全部完成。对应到硬币模型，也就是累计出现 {{< imath >}}n{{< /imath >}} 次正面的时刻，反面出现的次数还没到 {{< imath >}}m{{< /imath >}} 次。因此 {{< imath >}}\mathbb{P}(T_{2}< T_{1}){{< /imath >}} 是在公平的抛硬币模型中，{{< imath >}}n{{< /imath >}} 个正面比 {{< imath >}}m{{< /imath >}} 个反面先出现的概率。

## Problem 4

**(1)**

我们知道随机变量 {{< imath >}}X_{1},X_{2},\dots,X_{n}{{< /imath >}} 独立且均服从指数分布 {{< imath >}}\text{Exp}(\lambda){{< /imath >}}，从而其 PDF 为
{{< math >}}

f(x) = \begin{cases}
\lambda e^{ -\lambda x }, & x\geq  0 \\
0, & x < 0
\end{cases}

{{< /math >}}
以及其 CDF 为
{{< math >}}

F(x) = \begin{cases}
1-e^{ -\lambda x }, & x\geq  0 \\
0, & x < 0
\end{cases}

{{< /math >}}
首先处理带证明公式中的组合系数，{{< imath >}}n\binom{ n-1 }{ k-1 }{{< /imath >}} 表示从 {{< imath >}}n{{< /imath >}} 个随机变量中选定 {{< imath >}}X_{(k)}{{< /imath >}} 后再从剩下 {{< imath >}}n-1{{< /imath >}} 个随机变量中选出前 {{< imath >}}k-1{{< /imath >}} 个发生的 {{< imath >}}X_{(1)},\dots,X_{(k-1)}{{< /imath >}} 的方案数。这样就表示所有可能发生的事件的组合数。

对于 {{< imath >}}X_{(1)},\dots,X_{(k-1)}{{< /imath >}}，它们在时刻 {{< imath >}}x{{< /imath >}} 之前已经坏掉的概率为
{{< math >}}

[F(x)]^{k-1} = (1-e^{ -\lambda x })^{k-1}

{{< /math >}}
对于 {{< imath >}}X_{(k)}{{< /imath >}}，它在时刻 {{< imath >}}x{{< /imath >}} 坏掉的概率密度为
{{< math >}}

\lambda e^{ -\lambda x }

{{< /math >}}
对于 {{< imath >}}X_{(k+1)},\dots,X_{(n)}{{< /imath >}}，它们再时刻 {{< imath >}}x{{< /imath >}} 还没有发生过的概率为
{{< math >}}

[1-F(x)]^{n-k} = e^{ -(n-k)\lambda }

{{< /math >}}
从而相乘后就得到了
{{< math >}}

f_{X_{(k)}}(x) = n\binom{ n-1 }{ k-1 } (1-e^{ -\lambda x })^{k-1}e^{ -(n-k)\lambda x }\cdot\lambda e^{ -\lambda x }

{{< /math >}}
**(2)**

首先考虑当 {{< imath >}}r=n{{< /imath >}}。由于所有 {{< imath >}}X_{1},\dots,X_{n}{{< /imath >}} 独立同分布，因此其概率联合密度为 {{< imath >}}\prod_{i=1}^{n}f(x_{i}){{< /imath >}}。我们要统计的 {{< imath >}}X_{(1)}< X_{(2)}< \dots< X_{(n)}{{< /imath >}} 对应原始样本 {{< imath >}}(X_{1},\dots,X_{n}){{< /imath >}} 的 {{< imath >}}n!{{< /imath >}} 种排序中的特定一种。

从而在定义域 {{< imath >}}0< x_{1}< x_{2}< \dots< x_{n}{{< /imath >}} 中，根据每个 {{< imath >}}X{{< /imath >}} 的对称性，联合概率密度函数为
{{< math >}}

f_{X_{(1)},\dots,X_{(n)}}(x_{1},\dots,x_{n})=n!\cdot \prod_{i=1}^{n} f(x_{i})

{{< /math >}}
带入就得到了
{{< math >}}

\begin{align*}
f_{X_{(1)},\dots,X_{(n)}}(x_{1},\dots,x_{n}) & = n!\prod_{i=1}^{n} (\lambda e^{ -\lambda x_{i} }) \\
 & = n!\lambda^{n}e^{ -\lambda \sum_{i=1}^{n} x_{i} }
\end{align*}

{{< /math >}}
在这个定义域之外，概率密度为 {{< imath >}}0{{< /imath >}}。从而引入指示函数作为定义域的限制，就得到了
{{< math >}}

f_{X_{(1)},\dots,X_{(n)}}(x_{1},\dots,x_{n}) = n!\lambda^{n}e^{ -\lambda \sum_{i=1}^{n} x_{i} }\cdot \mathbb{I}[x_{1}< x_{2}< \dots< x_{n}]

{{< /math >}}

对于一般情况，{{< imath >}}X_{(1)}< X_{(2)}< \dots< X_{(r)}{{< /imath >}} 对应原始样本中 {{< imath >}}\dfrac{n!}{(n-r)!}{{< /imath >}} 种排列（后 {{< imath >}}n-r{{< /imath >}} 个随机变量可以随意排列）。

此时对于 {{< imath >}}0< x_{1}< x_{2}< \dots< x_{r}{{< /imath >}}，我们首先要确保选出的 {{< imath >}}X_{(k)}{{< /imath >}} 在时刻 {{< imath >}}x_{k}{{< /imath >}} 发生，概率密度为 {{< imath >}}\prod_{i=1}^{r}f(x_{i})=\lambda^{r}e^{ -\lambda \sum_{i=1}^{r}x_{i} }{{< /imath >}}。接着要确保后未选中的 {{< imath >}}(n-r){{< /imath >}} 个随机事件不会在时刻 {{< imath >}}x_{r}{{< /imath >}} 之前发生，概率为 {{< imath >}}[1-F(x_{r})]^{n-r}=e^{ ^{-(n-r)}\lambda x_{r} }{{< /imath >}}。

带入就得到了
{{< math >}}

f_{X_{(1)},\dots,X_{(r)}}(x_{1},\dots,x_{r}) = \dfrac{n!}{(n-r)!}\cdot\lambda^{r}e^{ -\lambda \sum_{i=1}^{r} x_{i} }\cdot e^{ -(n-r)\lambda x_{r} }

{{< /math >}}
**(3)**

定义 {{< imath >}}Y_{1}=X_{(1)},Y_{k}=X_{(k)}-X_{(k-1)}\quad (k>1){{< /imath >}}，那么可以得到
{{< math >}}

X_{(k)}=\sum_{i=1}^{k} Y_{i}

{{< /math >}}
我们求出这个变换的 Jacobian 行列式。对于 {{< imath >}}n{{< /imath >}} 个变量，这个变换对应的矩阵是一个下三角矩阵，并且对角线元素全为 {{< imath >}}1{{< /imath >}}，因为 {{< imath >}}\frac{ \partial X_{(k)} }{ \partial Y_{k} }=1{{< /imath >}}，从而
{{< math >}}

\left| J \right| = \det\left( \dfrac{ \partial (x_{(1)},x_{(2)},\dots,x_{(n)}) }{ \partial (y_{1},y_{2},\dots,y_{n}) }  \right) = 1

{{< /math >}}
利用 {{< imath >}}(2){{< /imath >}} 中 {{< imath >}}r=n{{< /imath >}} 时的联合概率密度函数，再带入
{{< math >}}

\sum_{i=1}^{n} x_{i} = \sum_{i=1}^{n} \sum_{j=1}^{i} y_{j}  = \sum_{j=1}^{n} (n-j+1)y_{j}

{{< /math >}}
就得到了
{{< math >}}

\begin{align*}
f_{Y}(y_{1},y_{2},\dots,y_{n}) & = n!\lambda^{n}e^{ -\lambda \sum_{j=1}^{n} (n-j+1)y_{j}}\cdot \left| J \right|  \\
 & = \prod_{j=1}^{n} [(n-j+1)\lambda e^{ -(n-j+1)\lambda y_{j} }]
\end{align*}

{{< /math >}}
从而联合概率密度函数分解成了 {{< imath >}}n{{< /imath >}} 个独立的因子的乘积
{{< math >}}

f_{Y_{k}}=(n-k+1)\lambda e^{ -(n-k+1)\lambda y_{k} },f_{Y}=\prod_{k=1}^{n} f_{Y_{k}}

{{< /math >}}
其中 {{< imath >}}Y_{k}{{< /imath >}} 正对应着 {{< imath >}}n-k+1{{< /imath >}} 个还存活的指数分布的密度。

对应回题目中 {{< imath >}}Y_{k+1}=X_{(k+1)}-X_{(k)}{{< /imath >}} 的系数为 {{< imath >}}n-k{{< /imath >}}，从而说明间隔 {{< imath >}}X_{(k+1)}-X_{(k)}{{< /imath >}} 相互独立，并且服从 {{< imath >}}\text{Exp}((n-k)\lambda){{< /imath >}}。

**(4)**

由于 {{< imath >}}X_{(i)}{{< /imath >}} 之间不独立，难以计算，因此我们考虑将 {{< imath >}}U{{< /imath >}} 改写为 {{< imath >}}(3){{< /imath >}} 中用到的独立变量 {{< imath >}}Y_{i}\sim\text{Exp}((n-i+1)\lambda){{< /imath >}} 的线性组合。

首先每个 {{< imath >}}Y_{i}{{< /imath >}} 的期望与方差分别为
{{< math >}}

\mathbb{E}[Y_{i}]=\dfrac{1}{(n-i+1)\lambda},\quad \text{Var}[Y_{i}]= \dfrac{1}{(n-j+1)^{2}\lambda^{2}}

{{< /math >}}

将 {{< imath >}}U{{< /imath >}} 重写为 {{< imath >}}Y_{i}{{< /imath >}} 的线性组合
{{< math >}}

\begin{align*}
U & = \sum_{i=1}^{r} a_{i}X_{(i)} \\
 & = \sum_{i=1}^{r} a_{i}\left( \sum_{j=1}^{i} Y_{j} \right) \\
 & = \sum_{j=1}^{r} Y_{j}\sum_{i=j}^{r} a_{i}
\end{align*}

{{< /math >}}
令 {{< imath >}}b_{i}=\sum_{k=i}^{r}a_{k}{{< /imath >}}，就有
{{< math >}}

\begin{align*}
U = \sum_{i=1}^{r} b_{i}Y_{i}
\end{align*}

{{< /math >}}
题目要求 {{< imath >}}\mathbb{E}[U]=\lambda ^{-1}{{< /imath >}}，带入就得到
{{< math >}}

\mathbb{E}[U] = \mathbb{E}\left[ \sum_{i=1}^{r} b_{i}Y_{i} \right] = \sum_{i=1}^{r} b_{i}\mathbb{E}[Y_{i}] =\dfrac{1}{\lambda} \sum_{i=1}^{r} \dfrac{b_{i}}{n-i+1} = \dfrac{1}{\lambda}

{{< /math >}}
从而有约束条件
{{< math >}}

\sum_{i=1}^{r} \dfrac{b_{i}}{n-i+1}=1

{{< /math >}}
在这个约束条件下我们需要最小化 {{< imath >}}U{{< /imath >}} 的方差。利用 {{< imath >}}Y_{i}{{< /imath >}} 的独立性，有
{{< math >}}

\text{Var}[U] = \sum_{j=1}^{r} b_{i}^{2}\text{Var}[Y_{i}] = \dfrac{1}{\lambda^{2}}\sum_{i=1}^{r} \dfrac{b_{i}^{2}}{(n-i+1)^{2}}

{{< /math >}}
利用 Cauchy 不等式，容易求出在
{{< math >}}

\dfrac{b_{1}}{n} = \dfrac{b_{2}}{n-1}=\dots=\dfrac{b_{r}}{n-r+1}=\dfrac{1}{r}

{{< /math >}}
时 {{< imath >}}\text{Var}[U]{{< /imath >}} 取到最小值，由此解出最优的 {{< imath >}}b_{i}{{< /imath >}} 为
{{< math >}}

b_{i} = \dfrac{n-i+1}{r}

{{< /math >}}
对应系数 {{< imath >}}a_{i}{{< /imath >}} 为
{{< math >}}

a_{r} = b_{r} = \dfrac{n-r+1}{r},\quad a_{k} = b_{k}-b_{k+1} = \dfrac{1}{r}\quad (k< r)

{{< /math >}}
与题设一致。

带入最优的 {{< imath >}}b_{i}{{< /imath >}} 到 {{< imath >}}\text{Var}[U]{{< /imath >}} 的表达式中，得到
{{< math >}}

\text{Var}[U] = \dfrac{1}{\lambda^{2}}\sum_{i=1}^{r} \left( \dfrac{1}{r} \right)^{2} = \dfrac{1}{r\lambda^{2}}

{{< /math >}}
