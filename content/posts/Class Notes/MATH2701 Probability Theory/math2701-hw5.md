---
tags:
- learning
- math
- homework
- probability-theory
discipline: mathematics
publish: true
date: '2025-11-19T09:20:00+08:00'
title: MATH2701 HW5
categories:
- course-note
---
## Problem 1

**(1)**

根据题设条件，我们知道最多抽取 {{< imath >}}m{{< /imath >}} 个黑球，最少抽取 {{< imath >}}0{{< /imath >}} 个黑球。设随机变量 {{< imath >}}X{{< /imath >}} 表示抽到黑球的个数，根据组合意义，我们得到 {{< imath >}}X{{< /imath >}} 的概率质量函数为
{{< math >}}

\mathbb{P}(X=x) = \dfrac{\binom{ m }{ x } \binom{ n-m }{ k-x } }{\binom{ n }{ k } },\quad x = 0,1,\dots,m

{{< /math >}}
**(2)**

矩生成函数定义为 {{< imath >}}M_{X}(\theta) = \mathbb{E}[e^{ \theta X }]{{< /imath >}}。我们带入得到
{{< math >}}

\begin{align*}
M_{X}(\theta) & = \sum_{x}e^{ \theta x }\mathbb{P}(X=x) \\
 & = \sum_{x=0}^{m} e^{ \theta x } \dfrac{\binom{ m }{ x } \binom{ n-m }{ k-x } }{\binom{ n }{ k } } \\
 & = \dfrac{1}{\binom{ n }{ k } }\sum_{x=0}^{m} e^{ \theta x }\binom{ m }{ x } \binom{ n-m }{ k-x } 
\end{align*}

{{< /math >}}
**(3)**

首先计算 {{< imath >}}\mathbb{E}[X]{{< /imath >}}。
{{< math >}}

\begin{align*}
\mathbb{E}[X] & = M'_{X}(0) = \dfrac{\mathrm{d} }{\mathrm{d}\theta} \left( \sum_{x}e^{ \theta x }\mathbb{P}(X=x) \right)\bigg|_{\theta=0} \\
 & = \sum_{x=0}^{m} x\mathbb{P}(X=x) \\
 & = \dfrac{1}{\binom{ n }{ k }} \sum_{x=0}^{m} x\binom{ m }{ x } \binom{ n-m }{ k-x }  \\
 & = \dfrac{1}{\binom{ n }{ k } }\sum_{x=0}^{m} m\binom{ m-1 }{ x-1 } \binom{ n-m }{ k-x }  \\
 & = \dfrac{m}{\binom{ n }{ k } } \sum_{y=0}^{m-1} \binom{ m-1 }{ y } \binom{ n-m }{ k-y-1 }  \\
 & = \dfrac{m}{\binom{ n }{ k } }\binom{ n-m+m-1 }{ k-1 }  = \dfrac{m}{\binom{ n }{ k } }\binom{ n-1 }{ k-1 } \\
 & = \dfrac{mk}{n}
\end{align*}

{{< /math >}}
接着计算 {{< imath >}}\mathbb{E}[X^{2}]{{< /imath >}}。由于 {{< imath >}}\mathbb{E}[X^{2}]{{< /imath >}} 的表达式化简较为困难，我们考虑求解 {{< imath >}}\mathbb{E}[X(X-1)]{{< /imath >}}。根据 LOTUS，我们有
{{< math >}}

\begin{align*}
\mathbb{E}[X(X-1)] & = \sum_{x=0}^{m} x(x-1)\mathbb{P}(X=x) \\
 & = \dfrac{1}{\binom{ n }{ k } }\sum_{x=0}^{m} x(x-1)\binom{ m }{ x } \binom{ n-m }{ k-x }  \\
 & = \dfrac{m}{\binom{ n }{ k } }\sum_{x=0}^{m} (x-1)\binom{ m-1 }{ x-1 } \binom{ n-m }{ k-x }  \\
 & = \dfrac{m(m-1)}{\binom{ m }{ k } }\sum_{x=0}^{m} \binom{ m-2 }{ x-2 } \binom{ n-m }{ k-x }  \\
 & = \dfrac{m(m-1)}{\binom{ m }{ k } }\binom{ n-2 }{ k-2 }  \\
 & = \dfrac{m(m-1)k(k-1)}{n(n-1)}
\end{align*}

{{< /math >}}
从而带入方差公式得到
{{< math >}}

\begin{align*}
\text{Var}[X] & = \mathbb{E}[X^{2}]-(\mathbb{E}[X])^{2} \\
 & = \mathbb{E}[X(X-1)] + \mathbb{E}[X] - (\mathbb{E}[X])^{2} \\
 & = \dfrac{m(m-1)k(k-1)}{n(n-1)} + \dfrac{mk}{n} - \left( \dfrac{mk}{n} \right)^{2} \\
 & = \dfrac{mk}{n}\left[ \dfrac{(m-1)(k-1)}{n-1}+1  - \dfrac{mk}{n}\right] \\
 & = \dfrac{mk}{n}\cdot \dfrac{n-m}{n}\cdot \dfrac{n-k}{n-1}
\end{align*}

{{< /math >}}
综上得到
{{< math >}}

\mathbb{E}[X] = \dfrac{mk}{n},\quad \text{Var}[X] = \dfrac{mk}{n}\cdot \dfrac{n-m}{n}\cdot \dfrac{n-k}{n-1}

{{< /math >}}
## Problem 2

**(1)**

首先我们计算 {{< imath >}}X{{< /imath >}} 的 pdf，记为 {{< imath >}}f_{X}(x){{< /imath >}}，那么
{{< math >}}

f_{X}(x) = \prod_{i=1}^{n} f_{X_{i}}(x_{i}) = \prod_{i=1}^{n} \dfrac{1}{\sqrt{ 2\pi }}e^{ -x_{i}^{2} / 2 } = \dfrac{1}{(2\pi)^{n / 2}}e^{ - \frac{1}{2}\sum_{i=1}^{n} x_{i}^{2} }

{{< /math >}}
由于 {{< imath >}}\| x \|^{2}=x^{T}x = \sum_{i=1}^{n}x_{i}^{2}{{< /imath >}}，我们可以化简为
{{< math >}}

f_{X}(x) = \dfrac{1}{(2\pi)^{n / 2}}e^{ - \frac{1}{2} x^{T}x }

{{< /math >}}

根据题设，我们知道
{{< math >}}

y = Qx \implies x = Q^{T}y

{{< /math >}}
从而计算该变换雅可比行列式的绝对值，有
{{< math >}}

J = \left| \det\left( \dfrac{ \partial x }{ \partial y }  \right) \right| = \left| \det(Q^{T}) \right| 

{{< /math >}}
根据正定矩阵的性质，我们知道 {{< imath >}}\det Q^{T}=\det Q=\pm 1{{< /imath >}}，因此 {{< imath >}}J=1{{< /imath >}}。

于是根据变量代换公式，我们得到
{{< math >}}

f_{Y}(y) = f_{X}(x(y))\cdot J = f_{X}(Q^{T}y)\cdot 1

{{< /math >}}
带入 {{< imath >}}Q^{T}y{{< /imath >}}，其中 {{< imath >}}x^{T}x{{< /imath >}} 变为 {{< imath >}}y^{T}Q Q^{T}y=y^{T}y{{< /imath >}} 即可得到
{{< math >}}

f_{Y}(y) = \dfrac{1}{(2\pi)^{n/2}}\exp\left( -\dfrac{1}{2}y^{T} y\right)

{{< /math >}}
从而 {{< imath >}}x{{< /imath >}} 与 {{< imath >}}y{{< /imath >}} 的分布一致。

**(2)**

对于单位球面上的两个向量 {{< imath >}}z_{1}{{< /imath >}} 和 {{< imath >}}z_{2}{{< /imath >}}，利用线性代数可以证明存在正交矩阵 {{< imath >}}Q{{< /imath >}} 使得
{{< math >}}

z_{2}=Qz_{1}

{{< /math >}}
我们考虑变换后的随机变量 {{< imath >}}QZ{{< /imath >}}，得到
{{< math >}}

QZ = Q\left( \dfrac{X}{\| X \| } \right)= \dfrac{QX}{\| X \| } \xlongequal{\| QX \| = \| X \| } \dfrac{QX}{\| QX \| }

{{< /math >}}
我们令 {{< imath >}}Y=QX{{< /imath >}}，就有 {{< imath >}}QZ=\dfrac{Y}{\| Y \|}{{< /imath >}}。利用 {{< imath >}}(1){{< /imath >}} 的结论，我们知道 {{< imath >}}X{{< /imath >}} 和 {{< imath >}}Y{{< /imath >}} 是同分布的，从而 {{< imath >}}Z{{< /imath >}} 和 {{< imath >}}QZ{{< /imath >}} 是同分布的。这就说明了 {{< imath >}}Z{{< /imath >}} 具有旋转不变性，也就有 {{< imath >}}Z{{< /imath >}} 在球面上取 {{< imath >}}z_{1}{{< /imath >}} 附近的概率密度，必须等于取 {{< imath >}}z_{2}=Qz_{1}{{< /imath >}} 附近的概率密度，也就是
{{< math >}}

f_{Z}(z) = f_{Z}(Qz)

{{< /math >}}
我们可以找到 {{< imath >}}Q{{< /imath >}} 将球面上的任意点 {{< imath >}}z_{1}{{< /imath >}} 映射到球面上的任意点 {{< imath >}}z_{2}{{< /imath >}}，从而说明了
{{< math >}}

\forall z_{1},z_{2}\in S^{n-1},\quad f_{Z}(z_{1})=f_{Z}(z_{2})

{{< /math >}}

## Problem 3

**(1)**

根据题设我们有
{{< math >}}

\begin{cases}
u = xy \\
v = \dfrac{x}{y}
\end{cases}

{{< /math >}}
从而得到 {{< imath >}}x=\sqrt{ uv },y=\sqrt{ u / v }{{< /imath >}}。我们计算变换的 Jacobi 行列式
{{< math >}}

J = \det\left( \dfrac{ \partial (x,y) }{ \partial (u,v) }  \right) = \det \begin{pmatrix}
\dfrac{1}{2}\sqrt{ \dfrac{v}{u} } & \dfrac{1}{2}\sqrt{ \dfrac{u}{v} } \\
\dfrac{1}{2\sqrt{ uv }} & -\dfrac{1}{2v}\sqrt{ \dfrac{u}{v} }
\end{pmatrix} = - \dfrac{1}{2v}

{{< /math >}}
从而 {{< imath >}}\left| J \right|= \dfrac{1}{2v}{{< /imath >}}。

于是我们就得到了联合密度函数为
{{< math >}}

f_{UV}(u,v) = f_{XY}(\sqrt{ uv },\sqrt{ u / v }) \cdot \left| J \right| = 1 \cdot\dfrac{1}{2v} = \dfrac{1}{2v}

{{< /math >}}
**(2)**

我们需要分区域讨论。将区域 {{< imath >}}[0,1]^{2}{{< /imath >}} 沿对角线分成两个区域
{{< math >}}

D_{1} =  \{ (x,y)\mid 0\leq x < y\leq 1 \},\quad D_{2} = [0,1]^{2}\setminus D_{1}

{{< /math >}}
我们知道在 {{< imath >}}D_{1}{{< /imath >}} 上有 {{< imath >}}U=X,V=Y{{< /imath >}}，在 {{< imath >}}D_{2}{{< /imath >}} 上有 {{< imath >}}U=Y,V=X{{< /imath >}}。

对于目标区域 {{< imath >}}0\leq u\leq v\leq 1{{< /imath >}}，我们分别考虑来着 {{< imath >}}D_{1}{{< /imath >}} 和 {{< imath >}}D_{2}{{< /imath >}} 的贡献。来自 {{< imath >}}D_{1}{{< /imath >}} 的映射满足 {{< imath >}}(x,y)=(u,v){{< /imath >}}，从而 Jacobi 行列式为 {{< imath >}}\left| J_{1} \right|=1{{< /imath >}}，产生的贡献为 {{< imath >}}f_{XY}(u,v)\cdot 1=1{{< /imath >}}。来自 {{< imath >}}D_{2}{{< /imath >}} 的映射满足 {{< imath >}}(x,y)=(v,u){{< /imath >}}，对应的 Jacobi 行列式为 {{< imath >}}\left| J_{2} \right|=1{{< /imath >}}，产生的贡献为 {{< imath >}}f_{XY}(u,v)\cdot 1=1{{< /imath >}}。

我们将两部分贡献相加，就得到了
{{< math >}}

f_{UV}(u,v)=1+1=2

{{< /math >}}
**(3)**

我们需要证明 {{< imath >}}f_{UV}(u,v){{< /imath >}} 是各分支逆映射密度函数乘以 Jacobi 行列式后的叠加。

设 {{< imath >}}A{{< /imath >}} 是 {{< imath >}}UV{{< /imath >}} 平面上任意的 Borel 可测集。我们需要计算 {{< imath >}}\mathbb{P}((U,V)\in A){{< /imath >}}。根据全概率公式，将事件分解到两个不相交的区域 {{< imath >}}D_{g}{{< /imath >}} 和 {{< imath >}}D_{h}{{< /imath >}} 上，有
{{< math >}}

\begin{align*}
\mathbb{P}((U,V)\in A) & = \mathbb{P}((X,Y)\in D_{g},g(X,Y)\in A)  +\mathbb{P}((X,Y)\in D_{h},h(X,Y)\in A) \\
 & = \underset{ \{ (x,y)\in D_{g}\mid g(x,y)\in A \} }{ \iint }  f_{XY}(x,y)\mathrm{d}x\mathrm{d}y + \underset{ \{ (x,y)\in D_{h}\mid h(x,y)\in A \} }{ \iint }  f_{XY}(x,y)\mathrm{d}x\mathrm{d}y
\end{align*}

{{< /math >}}
对于第一个积分进行变量代换，令 {{< imath >}}(u,v)=g(x,y){{< /imath >}}，则 {{< imath >}}(x,y)=g^{-1}(u,v){{< /imath >}}。此时积分区域变为 {{< imath >}}A\cap I_{g}{{< /imath >}}，面积元变为 {{< imath >}}\left| J_{g^{-1}} \right|\mathrm{d}u\mathrm{d}v{{< /imath >}}。同理对于第二个积分，令 {{< imath >}}(u,v)=h(x,y){{< /imath >}}，那么积分区域变为 {{< imath >}}A\cap I_{h}{{< /imath >}}，面积元变为 {{< imath >}}\left| J_{^{-1}h} \right|\mathrm{d}u\mathrm{d}v{{< /imath >}}。带入就得到了
{{< math >}}

\underset{ A\cap I_{g} }{ \iint }  f_{XY}(g^{-1}(u,v))\left| J_{g^{-1}} \right| \mathrm{d}u\mathrm{d}v + \underset{ A\cap I_{h} }{ \iint }  f_{XY}(h^{-1}(u,v))\left| J_{h^{-1}} \right| \mathrm{d}u\mathrm{d}v

{{< /math >}}
利用指示函数将积分区域统一为 {{< imath >}}A{{< /imath >}}，就有
{{< math >}}

\mathbb{P}((U,V)\in A) = \underset{ A }{ \iint } [f_{XY}(g^{-1}(u,v))\left| J_{g^{-1}} \right|\cdot \mathbb{I}_{(u,v)\in I_{g}} + f_{XY}(h^{-1}(u,v))\left| J_{h^{-1}} \right|\cdot \mathbb{I}_{(u,v)\in I_{h}}] \mathrm{d}u\mathrm{d}v

{{< /math >}}
根据 pdf 的定义，被积函数即为 {{< imath >}}f_{UV}(u,v){{< /imath >}}，从而得证。

**(4)**

由题设，{{< imath >}}X\sim U[0,1],Y\sim U[0,2]{{< /imath >}}，并且两者独立。我们知道 {{< imath >}}f_{XY}(x,y)=f_{X}\cdot f_{Y}=\frac{1}{2}{{< /imath >}}。

将矩形区域 {{< imath >}}R=[0,2]\times[0,1]{{< /imath >}} 按照直线 {{< imath >}}y=x{{< /imath >}} 切割成两部分，分别为 {{< imath >}}D_{g}{{< /imath >}} 满足 {{< imath >}}X< Y{{< /imath >}}，{{< imath >}}D_{h}{{< /imath >}} 满足 {{< imath >}}X>Y{{< /imath >}}。

其中 {{< imath >}}D_{g}{{< /imath >}} 区域 {{< imath >}}\left| J_{1} \right|=1{{< /imath >}}，满足 {{< imath >}}u=x,v=y{{< /imath >}}，贡献 {{< imath >}}f_{XY}(u,v)=\frac{1}{2}{{< /imath >}}，需要 {{< imath >}}0\leq u< v\leq 1{{< /imath >}}。{{< imath >}}D_{h}{{< /imath >}} 区域 {{< imath >}}\left| J_{2} \right|=1{{< /imath >}}，满足 {{< imath >}}u=y,v=x{{< /imath >}}，贡献 {{< imath >}}f_{XY}(v,u)= \frac{1}{2}{{< /imath >}},需要 {{< imath >}}0\leq u< v\leq 1{{< /imath >}} 或者 {{< imath >}}0\leq u\leq 1{{< /imath >}} 并且 {{< imath >}}1< v\leq 2{{< /imath >}}。我们考虑叠加两个区域的贡献，需要分两种情况，在 {{< imath >}}0\leq u\leq v\leq 1{{< /imath >}} 时同时被 {{< imath >}}D_{g}{{< /imath >}} 和 {{< imath >}}D_{h}{{< /imath >}} 覆盖，在 {{< imath >}}0\leq u\leq 1< v\leq 2{{< /imath >}} 时只被 {{< imath >}}D_{h}{{< /imath >}} 覆盖，因此
{{< math >}}

f_{UV}(u,v) = \begin{cases}
1, & 0\leq u\leq v\leq  1 \\
0.5, & 0\leq u\leq 1< v\leq 2 \\
0, & \text{o.w.}
\end{cases}

{{< /math >}}
## Problem 4

**(1)**

由于 {{< imath >}}q\in(0,1){{< /imath >}}，因此事件 {{< imath >}}\{ Y=t \}{{< /imath >}} 等价于 {{< imath >}}(0,1)\times \{ t \}{{< /imath >}}，所以
{{< math >}}

\mathbb{P}(Y=t)=\binom{ T }{ t } \int_{0}^{1} q^{t}(1-q)^{T-t} \mathrm{d}q = \binom{ T }{ t } \cdot \dfrac{t!(T-t)!}{(T+1)!} = \dfrac{1}{T+1}

{{< /math >}}
说明
{{< math >}}

\mathbb{P}(Y=t)=\dfrac{1}{T+1},\quad t\in[T]\cup \{ 0 \}

{{< /math >}}
这说明在先验分布均匀的情况下，正面次数也均匀分布。

**(2)**

为了计算 {{< imath >}}Q{{< /imath >}} 的概率密度，我们考虑 {{< imath >}}\mathbb{P}(Q\in[a,b]){{< /imath >}}。根据全概率公式，我们知道
{{< math >}}

\begin{align*}
\mathbb{P}(Q\in[a,b]) & = \sum_{t=0}^{T} \mathbb{P}(Q\in[a,b]\mid Y=t) \\
 & = \sum_{t=0}^{T} \int_{a}^{b} \binom{ T }{ t } q^{t}(1-q)^{T-t} \mathrm{d}q \\
 & = \int_{a}^{b} \sum_{t=0}^{T} q^{t}(1-q)^{T-t} \mathrm{d}q \\
 & = \int_{a}^{b} 1 \mathrm{d}q \\
 & = b-a
\end{align*}

{{< /math >}}
从而说明这是一个均匀分布。因此
{{< math >}}

p_{Q} = \begin{cases}
1, & q\in(0,1) \\
0, & \text{o.w.}
\end{cases}

{{< /math >}}
也就是 {{< imath >}}Q\sim U(0,1){{< /imath >}}。

下面我们计算条件概率密度函数。根据定义，我们先计算
{{< math >}}

\mathbb{P}(Q\in[q,q+h],Y=t) = \int_{q}^{q+h} \binom{ T }{ t } u^{t}(1-u)^{T-t} \mathrm{d}u

{{< /math >}}
根据微积分基本定理，我们知道
{{< math >}}

\lim_{ h \to 0 } \dfrac{1}{h}\cdot \mathbb{P}(Q\in[q,q+h],Y=t) = \binom{ T }{ t } q^{t}(1-q)^{T-t} 

{{< /math >}}
再根据第一问 {{< imath >}}\mathbb{P}(Y=t)= \frac{1}{T+1}{{< /imath >}}，我们知道
{{< math >}}

\begin{align*}
p_{Q|Y}(q|t) & = \binom{ T }{ t } q^{t}(1-q)^{T-t}\cdot \dfrac{1}{1 / (T+1)} \\
 & = \dfrac{(T+1)!}{t!(T-t)!}q^{t}(1-q)^{T-t}
\end{align*}

{{< /math >}}
**(3)**

根据定义，有
{{< math >}}

M_{X}(\theta) = \mathbb{E}\left[ 1 + \sum_{n=1}^{\infty} \dfrac{\theta^{n}}{n!}X^{n} \right] = 1+\sum_{n=1}^{\infty} \dfrac{\theta^{n}}{n!}\mathbb{E}[X^{n}]

{{< /math >}}
我们考虑计算 {{< imath >}}\mathbb{E}[X^{n}]{{< /imath >}}。

根据 {{< imath >}}(1){{< /imath >}} 式，我们得到
{{< math >}}

\begin{align*}
\mathbb{E}[X^{n}] & = \int_{0}^{1} x^{n}p_{X}(x) \mathrm{d}x \\
 & = \int_{0}^{1} x^{n} \dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1} \mathrm{d}x  \\
 & = \dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)} \int_{0}^{1} x^{(n+\alpha)-1}(1-x)^{\beta-1} \mathrm{d}x  \\
 & = \dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)} \cdot \dfrac{\Gamma(n+\alpha)\Gamma(\beta)}{\Gamma(n+\alpha+\beta)} \\
 & = \dfrac{\Gamma(n+\alpha)}{\Gamma(\alpha)}\cdot \dfrac{\Gamma(\alpha+\beta)}{\Gamma(n+\alpha+\beta)} \\
 & = \prod_{k=0}^{n-1} \dfrac{\alpha+k}{\alpha+\beta+k}
\end{align*}

{{< /math >}}
其中最后一行利用了 {{< imath >}}\Gamma{{< /imath >}} 函数递推的性质。

带入就得到了
{{< math >}}

M_{X}(\theta) = 1 + \sum_{n=1}^{\infty} \dfrac{\theta^{n}}{n!}\cdot \left( \prod_{k=0}^{n-1} \dfrac{\alpha+k}{\alpha+\beta+k} \right)

{{< /math >}}
## Problem 5

**(1)**

设随机变量 {{< imath >}}X\sim\text{Exp}(\lambda){{< /imath >}}，它的 pdf 和 cdf 分别为
{{< math >}}

f(x) = \lambda e^{ -\lambda x }(x\geq  0),\quad F(x) = \int_{0}^{x} \lambda e^{ -\lambda x } \mathrm{d}x =1 - e^{ -\lambda x }

{{< /math >}}
若 {{< imath >}}Y{{< /imath >}} 是一个随机变量， CDF 为 {{< imath >}}F_{Y}{{< /imath >}}。那么利用 CDF 的单调性与定义可知，变换后的变量小于 {{< imath >}}u{{< /imath >}} 的概率 {{< imath >}}P(F_Y(Y) \le u){{< /imath >}} 等价于 {{< imath >}}P(Y \le F_Y^{-1}(u)){{< /imath >}}，而这恰好等于 {{< imath >}}F_Y(F_Y^{-1}(u)) = u{{< /imath >}}，这完全符合均匀分布的定义，因此我们知道 {{< imath >}}F_{Y}(Y){{< /imath >}} 服从 {{< imath >}}[0,1]{{< /imath >}} 上的均匀分布。

因此我们有 {{< imath >}}F(X)\sim U[0,1]{{< /imath >}}，设 {{< imath >}}F(X)=U\sim U[0,1]{{< /imath >}}，我们就可以得到 {{< imath >}}X=F^{-1}(U){{< /imath >}}，从而
{{< math >}}

\begin{align*}
1 - e^{ -\lambda X } & = U \\
e^{ -\lambda X } & = 1-U \\
  \implies X & = - \dfrac{1}{\lambda}\ln(1-U)
\end{align*}

{{< /math >}}
由于 {{< imath >}}1-U{{< /imath >}} 也服从 {{< imath >}}U[0,1]{{< /imath >}}，因此我们就得到了采样公式为
{{< math >}}

X = -\dfrac{1}{\lambda}\ln U

{{< /math >}}
**(2)**

根据题设，有
{{< math >}}

\begin{align*}
f_{X}(x) & = \dfrac{1}{\Gamma(\alpha)}x^{\alpha-1}e^{ -x },\quad x>0 \\
f_{Y}(y) & = \dfrac{1}{\Gamma(\beta)}y^{\beta-1}e^{ -y },\quad y>0
\end{align*}

{{< /math >}}
我们用 {{< imath >}}S,T{{< /imath >}} 表示 {{< imath >}}X,Y{{< /imath >}}，得到
{{< math >}}

X = ST, \quad Y = S(1-T)

{{< /math >}}
从而 Jacobi 行列式为
{{< math >}}

J = \begin{vmatrix}
t & s \\
1-t & -s
\end{vmatrix} = -s \implies \left| J \right| = s\quad (S>0)

{{< /math >}}
于是得到
{{< math >}}

f_{ST}(s,t) = f_{XY}(x(s,t),y(s,t))\cdot \left| J \right| = f_{XY}(st,s-st)\cdot s

{{< /math >}}
其中由于 {{< imath >}}X,Y{{< /imath >}} 独立
{{< math >}}

f_{XY}(x,y) = f_{X}(x)\cdot f_{Y}(y) = \dfrac{1}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha-1}y^{\beta-1}e^{ -(x+y) }

{{< /math >}}

带入就得到了
{{< math >}}

f_{ST}(s,t) = \dfrac{1}{\Gamma(\alpha)\Gamma(\beta)} s ^{\alpha+\beta - 1}e^{ -s }t ^{\alpha-1}(1-t)^{\beta-1}

{{< /math >}}
定义域为 {{< imath >}}s>0,0< t< 1{{< /imath >}}。

**(3)**

观察 {{< imath >}}f_{ST}{{< /imath >}}，发现可以拆分成关于 {{< imath >}}s{{< /imath >}} 和关于 {{< imath >}}t{{< /imath >}} 的函数的乘积：
{{< math >}}

\begin{align*}
f_{ST}(s,t) & = \dfrac{1}{\Gamma(\alpha)\Gamma(\beta)}(s^{\alpha+\beta-1}e^{ -s })(t ^{\alpha-1}(1-t)^{\beta-1}) \\
 & = \underbrace{ \left( \dfrac{1}{\Gamma(\alpha+\beta)}s ^{(\alpha+\beta)-1}e^{ -s } \right) }_{ g(s) }\underbrace{ \left( \dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}t ^{\alpha-1}(1-t)^{\beta-1} \right) }_{ h(t) }
\end{align*}

{{< /math >}}
从而 {{< imath >}}f_{ST}(s,t)=g(s)h(t){{< /imath >}}，并且 {{< imath >}}s{{< /imath >}} 和 {{< imath >}}t{{< /imath >}} 的范围相互不依赖，从而 {{< imath >}}S{{< /imath >}} 和 {{< imath >}}T{{< /imath >}} 相互独立。

我们接着讨论 {{< imath >}}T{{< /imath >}} 的分布。根据上面的拆分，我们知道
{{< math >}}

f_{T}(t)=h(t) = \dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}t ^{\alpha-1}(1-t)^{\beta-1}

{{< /math >}}
这正是 {{< imath >}}T\sim\text{Beta}(\alpha,\beta){{< /imath >}} 的定义。

## Problem 6

**(1)**

令 {{< imath >}}Z=X_{0} / \sigma{{< /imath >}}，于是
{{< math >}}

\mathbb{E}[Z] = \mathbb{E}\left[ \dfrac{X_{0}}{\sigma} \right] = \dfrac{\mathbb{E}[X_{0}]}{\sigma} = \dfrac{1}{\sigma}\cdot 0 = 0

{{< /math >}}
以及
{{< math >}}

\text{Var}[Z] = \text{Var}\left[ \dfrac{X_{0}}{\sigma} \right] = \dfrac{\text{Var}[X_{0}]}{\sigma^{2}} = 1

{{< /math >}}
并且由于 {{< imath >}}X_{0}{{< /imath >}} 符合正态分布，因此经过线性变换得到 {{< imath >}}Z{{< /imath >}} 以后依旧符合正态分布。

因此 {{< imath >}}Z{{< /imath >}} 服从期望为 {{< imath >}}0{{< /imath >}}，方差为 {{< imath >}}1{{< /imath >}} 的正态分布，即 {{< imath >}}Z\sim \mathcal{N}(0,1){{< /imath >}}。

**(2)**

我们展开 {{< imath >}}\sum_{i=1}^{n}(X_{i}-\hat{X}_{n})^{2}{{< /imath >}}，得到
{{< math >}}

\begin{align*}
\sum_{i=1}^{n} (X_{i}-\hat{X}_{n})^{2} & = \sum_{i=1}^{n} X_{i}^{2} - 2\hat{X}_{n}\sum_{i=1}^{n} X_{i} + n\hat{X}_{n}^{2} \\
 & = \sum_{i=1}^{n} X_{i}^{2} - n\hat{X}_{n}^{2}
\end{align*}

{{< /math >}}
因此我们需要计算 {{< imath >}}\mathbb{E}[\sum_{i=1}^{n} X_{i}^{2} - n\hat{X}_{n}^{2}]{{< /imath >}}。

对于 {{< imath >}}\mathbb{E}[X_{i}^{2}]{{< /imath >}} 项，我们利用方差公式，得到
{{< math >}}

\mathbb{E}[X_{i}^{2}] = \text{Var}[X_{i}] + (\mathbb{E}[X_{i}])^{2} = \sigma^{2} + 0 = \sigma^{2}

{{< /math >}}
所以 {{< imath >}}\mathbb{E}\left[ \sum_{i=1}^{n}X_{i}^{2} \right]=\sum_{i=1}^{n}\mathbb{E}[X_{i}^{2}]=n\sigma^{2}{{< /imath >}}。

对于 {{< imath >}}\mathbb{E}[\hat{X}_{n}^{2}]{{< /imath >}}，我们先计算 {{< imath >}}\mathbb{E}[\hat{X}_{n}]{{< /imath >}} 和 {{< imath >}}\text{Var}[\hat{X}_{n}]{{< /imath >}}，得到
{{< math >}}

\mathbb{E}[\hat{X}_{n}]=0,\quad \text{Var}[\hat{X}_{n}] = \text{Var}\left[ \dfrac{1}{n}\sum X_{i} \right] = \dfrac{\sigma^{2}}{n}

{{< /math >}}
从而
{{< math >}}

\mathbb{E}[\hat{X}_{n}^{2}] = \mathbb{E}[\hat{X}_{n}] + \text{Var}[\hat{X}_{n}] = \dfrac{\sigma^{2}}{n}

{{< /math >}}
于是
{{< math >}}

\mathbb{E}\left[ \sum_{i=1}^{n} (X_{i}-\hat{X}_{n})^{2} \right] = n\sigma^{2} - n\left( \dfrac{\sigma^{2}}{n} \right) = (n-1)\sigma^{2}

{{< /math >}}
这样就算出了
{{< math >}}

\mathbb{E}[S_{n}^{2}] = \mathbb{E}\left[ \dfrac{\sum_{i=1}^{n} (X_{i}-\hat{X}_{n})^{2}}{n-1} \right] = \sigma^{2}

{{< /math >}}
**(3)**

按照定义，
{{< math >}}

\hat{X}_{2} = \dfrac{X_{1}+X_{2}}{2}\implies S_{2}^{2}=\dfrac{1}{2-1}\sum_{i=1}^{2} (X_{i}-\hat{X}_{2})^{2} = \dfrac{(X_{1}-X_{2})^{2}}{2}

{{< /math >}}
从而得到
{{< math >}}

S_{2} = \dfrac{\left| X_{1}-X_{2} \right| }{\sqrt{ 2 }}

{{< /math >}}
进而得到
{{< math >}}

Y_{2} = \dfrac{X_{0}}{S_{2}} = \dfrac{\sqrt{ 2 }X_{0}}{\left| X_{1}-X_{2} \right| }

{{< /math >}}
我们直到 {{< imath >}}X_{0}\sim \mathcal{N}(0,\sigma^{2}){{< /imath >}}。令 {{< imath >}}D=X_{1}-X_{2}{{< /imath >}}，由于 {{< imath >}}X_{1},X_{2}{{< /imath >}} 独立且均服从 {{< imath >}}\mathcal{N}(0,\sigma^{2}){{< /imath >}} 分布，因此 {{< imath >}}D\sim \mathcal{N}(0,\sigma^{2}+\sigma^{2})=\mathcal{N}(0,2\sigma^{2}){{< /imath >}}。我们将它们写成标准正态分布，就有 {{< imath >}}\dfrac{X_{0}}{\sigma}=U\sim \mathcal{N}(0,1){{< /imath >}} 以及 {{< imath >}}\dfrac{D}{\sqrt{ 2 }\sigma}=V\sim \mathcal{N}(0,1){{< /imath >}}。带入就有
{{< math >}}

Y_{2} = \dfrac{\sqrt{ 2 }(\sigma U)}{\left| \sqrt{ 2\sigma V } \right| } = \dfrac{U}{\left| V \right| }

{{< /math >}}
我们设 {{< imath >}}W=\left| V \right|{{< /imath >}}，那么 {{< imath >}}W{{< /imath >}} 服从分布
{{< math >}}

p_{W}(w) = \dfrac{2}{\sqrt{ 2\pi }}e^{ -w^{2} / 2 },\quad w>0

{{< /math >}}
带入 {{< imath >}}Y=U / W{{< /imath >}}，计算 Jacobi 行列式并带入即可得到
{{< math >}}

\begin{align*}
p_{Y_{2}}(y) & = \int_{-\infty}^{\infty} p_{UW}(yw,w)\cdot \left| w \right|  \mathrm{d}w \\
 & = \int_{0}^{\infty} w\cdot p_{U}(yw)\cdot p_{W}(w) \mathrm{d}w \\
 & = \int_{0}^{\infty} w\cdot\left( \dfrac{1}{\sqrt{ 2\pi }}e^{ -(yw)^{2}/2 } \right)\cdot\left( \dfrac{2}{\sqrt{ 2\pi }}e^{ -\omega^{2}/2 } \right) \mathrm{d}w \\
 & = \dfrac{1}{\pi}\int_{0}^{\infty} we^{ -w^{2}(y^{2}+1)/2 } \mathrm{d}w \\
 & = \dfrac{1}{\pi(1+y^{2})}[e^{ -(y^{2}+1)w^{2}/2 }]_{0}^{\infty} \\
 & = \dfrac{1}{\pi(1+y^{2})}
\end{align*}

{{< /math >}}
说明了 pdf 为 {{< imath >}}p_{Y_{2}}(y)=1 / \pi(y^{2}+1){{< /imath >}}，就是标准柯西分布的 pdf。

**(4)**

我们需要证明在 {{< imath >}}\theta\neq 0{{< /imath >}} 时 {{< imath >}}\mathbb{E}[e^{ \theta Y_{2} }]{{< /imath >}} 发散。根据定义，我们有
{{< math >}}

\begin{align*}
\mathbb{E}[e^{ \theta Y_{2} }] & = \int_{-\infty}^{\infty} e^{ \theta y }\cdot p_{Y_{2}}(y) \mathrm{d}y \\
 & = \dfrac{1}{\pi}\int_{-\infty}^{\infty} \dfrac{e^{ \theta y }}{1+y^{2}} \mathrm{d}y \\
 & > \dfrac{1}{\pi}\int_{0}^{\infty} \dfrac{e^{ \theta y }}{1+y^{2}} \mathrm{d}y 
\end{align*}

{{< /math >}}
对于任意 {{< imath >}}\theta>0{{< /imath >}}，显然存在 {{< imath >}}M>0{{< /imath >}} 使得当 {{< imath >}}y>M{{< /imath >}} 时有
{{< math >}}

e^{ \theta y }>1+y^{2}

{{< /math >}}
从而
{{< math >}}

\begin{align*}
\int_{0}^{\infty} \dfrac{e^{ \theta y }}{1+y^{2}} \mathrm{d}y & > \int_{M}^{\infty} \dfrac{e^{ \theta y }}{1+y^{2}} \mathrm{d}y \\
 & > \int_{M}^{\infty} 1\cdot \mathrm{d}y \\
  & = \infty
\end{align*}

{{< /math >}}
从而得到了 {{< imath >}}\mathbb{E}[e^{ \theta Y_{2} }]{{< /imath >}} 发散。这意味着 {{< imath >}}Y_{2}{{< /imath >}} 的矩生成函数对于任意 {{< imath >}}\theta\neq 0{{< /imath >}} 均不存在。