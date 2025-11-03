---
tags:
- learning
- math
- homework
- probability-theory
discipline: mathematics
publish: true
date: '2025-10-30T18:45:00+08:00'
title: MATH2701 HW4
categories:
- course-note
---
[题目](https://notes.sjtu.edu.cn/s/pu3AkRu9g)
## Problem 1

**(1)**

不正确。

**反例**

设离散概率空间 {{< imath >}}(\Omega,\mathcal{F},\mathbb{P}){{< /imath >}}，其中 {{< imath >}}\Omega=\mathbb{N}^{+}{{< /imath >}}，{{< imath >}}\mathcal{F}{{< /imath >}} 是 {{< imath >}}\Omega{{< /imath >}} 的幂集，概率测度定义为 {{< imath >}}\mathbb{P}(\{ k \})=\dfrac{1}{2^{k}}{{< /imath >}}。我们定义随机变量 {{< imath >}}X_{n}:\Omega\to \mathbb{R}{{< /imath >}} 为
{{< math >}}

X_{n}(k) = \begin{cases}
2^{n} & k = n \\
-2^{n+1} & k = n+1\\
0 & \text{o.w.}
\end{cases}

{{< /math >}}
此时显然每个 {{< imath >}}X_{n}{{< /imath >}} 都可积，并且
{{< math >}}

\mathbb{E}[X_{n}] = X_{n}(n)\mathbb{P}(\{ n \}) + X_{n}(n+1)\mathbb{P}(\{ n+1 \}) = 0 \implies \sum_{n=1}^{\infty} \mathbb{E}[X_{n}] = 0

{{< /math >}}
但是
{{< math >}}

\sum_{n=1}^{\infty} X_{n}(k) = \begin{cases}
2 & k=1 \\
0 & \text{o.w.}
\end{cases}

{{< /math >}}
从而
{{< math >}}

\mathbb{E}\left[ \sum_{n=1}^{\infty} X_{n} \right] = 2 \times \mathbb{P}(\{ 1 \}) + 0 \times (1 - \mathbb{P}(\{ 1 \})) = 1

{{< /math >}}
所以此时
{{< math >}}

\sum_{n=1}^{\infty} \mathbb{E}[X_{n}] \neq \mathbb{E}\left[ \sum_{n=1}^{\infty} X_{n} \right]

{{< /math >}}
不成立的原因在于我们需要级数绝对可积才能交换求和和期望。

**(2)**

不正确。

**反例**

我们构造 {{< imath >}}X_{n}{{< /imath >}} 序列不可积即可。

定义概率空间 {{< imath >}}(\Omega,\mathcal{F},\mathbb{P}){{< /imath >}}，其中 {{< imath >}}\Omega=(0,1],\mathcal{F}=\mathcal{B}(0,1],\mathbb{P}=\lambda{{< /imath >}}。定义随机变量序列 {{< imath >}}X_{n}:(0,1]\to \mathbb{R}{{< /imath >}} 为
{{< math >}}

X_{n}(\omega) = -\dfrac{1}{\omega}\mathbb{I}_{(0,1 / n]}(\omega)

{{< /math >}}
显然此时 {{< imath >}}\{ X_{n} \}{{< /imath >}} 满足递增并且
{{< math >}}

\lim_{ n \to \infty } X_{n} = X = 0 \implies \mathbb{E}[X] = 0

{{< /math >}}
然而
{{< math >}}

\mathbb{E}[X_{n}] = \int_{0}^{1} X_{n}(\omega) \mathrm{d}\lambda(\omega) = \int_{0}^{1 / n} -\dfrac{1}{\omega} \mathrm{d}\omega = -\infty

{{< /math >}}
从而
{{< math >}}

\lim_{ n \to \infty } \mathbb{E}[X_{n}] = -\infty \neq \mathbb{E}[X] = 0

{{< /math >}}

**(3)**

正确。

**证**

我们构造随机变量序列 {{< imath >}}Y_{n}=X_{n}-X_{1}{{< /imath >}}。显然 {{< imath >}}Y_{n}{{< /imath >}} 满足单调并且非负。并且
{{< math >}}

\lim_{ n \to \infty } Y_{n} = \lim_{ n \to \infty } (X_{n}-X_{1}) = X - X_{1} := Y

{{< /math >}}
根据 MCT，我们得到
{{< math >}}

\lim_{ n \to \infty } \mathbb{E}[Y_{n}] = \mathbb{E}[Y]

{{< /math >}}
也就是
{{< math >}}

\lim_{ n \to \infty } \mathbb{E}[X_{n}-X_{1}] = \mathbb{E}[X-X_{1}]

{{< /math >}}
由于可积，{{< imath >}}\mathbb{E}[X_{n}]{{< /imath >}} 有限，因此根据期望的可加性，得到
{{< math >}}

(\lim_{ n \to \infty } \mathbb{E}[X_{n}]) - \mathbb{E}[X_{1}] = \mathbb{E}[X] - \mathbb{E}[X_{1}]

{{< /math >}}
从而
{{< math >}}

\lim_{ n \to \infty } \mathbb{E}[X_{n}] = \mathbb{E}[X]

{{< /math >}}
证毕。

**(4)**

不正确。

**证**

取 {{< imath >}}\text{sup}{{< /imath >}} 的操作不同于 {{< imath >}}\text{inf}{{< /imath >}}，可能会改变可积性。

定义概率空间 {{< imath >}}(\Omega,\mathcal{F},\mathbb{P}){{< /imath >}}，其中 {{< imath >}}\Omega=(0,1],\mathcal{F}=\mathcal{B}(0,1],\mathbb{P}=\lambda{{< /imath >}}。定义随机变量序列 {{< imath >}}X_{n}:(0,1]\to \mathbb{R}{{< /imath >}} 为
{{< math >}}

X_{n}(\omega) = n\cdot \mathbb{I}_{(0, 1 / n]}(\omega)

{{< /math >}}
满足 {{< imath >}}X_{n}{{< /imath >}} 非负。

我们计算每个 {{< imath >}}X_{n}{{< /imath >}} 的期望
{{< math >}}

\mathbb{E}[X_{n}] = \int_{0}^{1} X_{n}(\omega) \mathrm{d}\lambda(x) = n\int_{0}^{1 / n}  \mathrm{d}x  = 1 

{{< /math >}}
从而
{{< math >}}

\underset{n\to \infty}{\text{lim sup }} \mathbb{E}[X_{n}] = 1

{{< /math >}}

然而
{{< math >}}

\underset{n\to \infty}{\text{lim sup }} X_{n} = \lim_{ n \to \infty } X_{n} = 0

{{< /math >}}
所以
{{< math >}}

\mathbb{E}[\underset{n\to \infty}{\text{lim sup }} X_{n}] = 0

{{< /math >}}
结论不成立。

## Problem 2

根据题设，每个 {{< imath >}}f_{n}{{< /imath >}} 都是在闭区间 {{< imath >}}[a,b]{{< /imath >}} 上的连续函数，从而在 Borel Set 中可测。并且一致收敛的连续函数序列的极限也是连续的，从而 {{< imath >}}f{{< /imath >}} 也是可测函数。符合 DCT 中对可测性的要求。

并且 {{< imath >}}f_{n}{{< /imath >}} 在 {{< imath >}}[a,b]{{< /imath >}} 上一致收敛到 {{< imath >}}f{{< /imath >}}，这是一个强于几乎处处收敛的条件，因此这也满足 DCT 中 {{< imath >}}X_{n}\to X{{< /imath >}} 几乎处处收敛的条件。

下面证明满足存在可积控制函数的条件。根据一致收敛的定义，对于任意 {{< imath >}}\varepsilon>0{{< /imath >}}，存在 {{< imath >}}N>0{{< /imath >}} 使得对于所有 {{< imath >}}x \in[a,b]{{< /imath >}} 有 {{< imath >}}\left| f_{n}(x)-f(x) \right|<\varepsilon{{< /imath >}}。

由于 {{< imath >}}f{{< /imath >}} 是闭区间上的连续函数，因此一定有 {{< imath >}}f{{< /imath >}} 有界，从而存在常数 {{< imath >}}M_{f}{{< /imath >}} 满足对于所有 {{< imath >}}x{{< /imath >}} 都有 {{< imath >}}\left| f(x) \right|<M_{f}{{< /imath >}}。我们再直接取 {{< imath >}}\varepsilon=1{{< /imath >}}，就可以得到
{{< math >}}

\left| f_{n}(x) \right| <M_{f}+1\quad n>N

{{< /math >}}
对于 {{< imath >}}n\leq N{{< /imath >}} 的函数 {{< imath >}}f_{n}{{< /imath >}}，每个也都是闭区间上的连续函数，必然存在 {{< imath >}}M_{n}{{< /imath >}} 满足 {{< imath >}}\left| f_{n}(x) \right|<M_{n}{{< /imath >}}。

因此我们直接构造出控制函数
{{< math >}}

g(x) = \max\{ M_{1},M_{2},\dots,M_{N},M_{f}+1 \}

{{< /math >}}
满足对于所有 {{< imath >}}n{{< /imath >}} 和 {{< imath >}}x \in[a,b]{{< /imath >}} 都有 {{< imath >}}\left| f_{n}(x) \right|\leq g(x){{< /imath >}}。并且由于 {{< imath >}}g{{< /imath >}} 是一个有限常数，显然是可积的。从而 {{< imath >}}g(x){{< /imath >}} 是一个合法的控制函数，我们这样就证明了满足 DCT 的条件。因此该定理确实是 DCT 的一个特例。

## Problem 3

**(1)**

构造 {{< imath >}}Z_{n}=X_{n}-Y\geq 0{{< /imath >}}。如果 {{< imath >}}X_{n},Y{{< /imath >}} 可测，那么 {{< imath >}}Z_{n}{{< /imath >}} 也可测。根据 Fatou 引理，有
{{< math >}}

\mathbb{E}[\underset{n\to \infty}{\text{lim inf }}Z_{n}] \leq  \underset{n\to \infty}{\text{lim inf }}\mathbb{E}[Z_{n}]

{{< /math >}}
带入 {{< imath >}}X_{n},Y{{< /imath >}} 得到
{{< math >}}

\mathbb{E}[\underset{n\to \infty}{\text{lim inf }}(X_{n}-Y)] \leq  \underset{n\to \infty}{\text{lim inf }}\mathbb{E}[X_{n}-Y]

{{< /math >}}
由于 {{< imath >}}Y{{< /imath >}} 可积并且几乎处处有限，左侧可以变为 {{< imath >}}\mathbb{E}[(\underset{n\to \infty}{\text{lim inf }}X_{n})-Y]{{< /imath >}}。再利用期望的线性性，变为 {{< imath >}}\mathbb{E}[(\underset{n\to \infty}{\text{lim inf }}X_{n})]-\mathbb{E}[Y]{{< /imath >}}。

同样对于右侧先利用期望的线性性变为 {{< imath >}}\underset{n\to \infty}{\text{lim inf }}(\mathbb{E}[X_{n}]-\mathbb{E}[Y]){{< /imath >}}，此时 {{< imath >}}\mathbb{E}[Y]{{< /imath >}} 是一个常数，所以化为 {{< imath >}}(\underset{n\to \infty}{\text{lim inf }}\mathbb{E}[X_{n}])-\mathbb{E}[Y]{{< /imath >}}。

由于 {{< imath >}}\mathbb{E}[Y]{{< /imath >}} 是有限值，等式两侧都消去 {{< imath >}}\mathbb{E}[Y]{{< /imath >}}，就得到了
{{< math >}}

\mathbb{E}[\underset{n\to \infty}{\text{lim inf }}X_{n}] \leq  \underset{n\to \infty}{\text{lim inf }}\mathbb{E}[X_{n}]

{{< /math >}}

**(2)**

首先，根据题设 {{< imath >}}|X_n| \le Y_n{{< /imath >}} 几乎处处成立，且已知 {{< imath >}}\lim_{n \to \infty} Y_n = Y{{< /imath >}} 几乎处处成立。对不等式两边取 almost sure 极限，我们得到 {{< imath >}}|X| \le Y{{< /imath >}} 几乎处处成立。又因为 {{< imath >}}\lim_{n \to \infty} \mathbb{E}[Y_n] = \mathbb{E}[Y] < \infty{{< /imath >}}，这意味着 {{< imath >}}Y{{< /imath >}} 是一个可积随机变量。由于 {{< imath >}}|X| \le Y{{< /imath >}} 且 {{< imath >}}Y{{< /imath >}} 可积，因此 {{< imath >}}X{{< /imath >}} 也是可积的，即 {{< imath >}}\mathbb{E}[X]{{< /imath >}} 为有限值。类似地，由于 {{< imath >}}|X_n| \le Y_n{{< /imath >}} 且 {{< imath >}}\mathbb{E}[Y_n]{{< /imath >}} 有限，所以每个 {{< imath >}}X_n{{< /imath >}} 也是可积的，即 {{< imath >}}\mathbb{E}[X_n]{{< /imath >}} 也为有限值。

现在，我们考虑**非负**的随机变量序列 {{< imath >}}Y_n - X_n{{< /imath >}}。由于 {{< imath >}}|X_n| \le Y_n{{< /imath >}} a.s. 意味着 {{< imath >}}X_n \le Y_n{{< /imath >}} a.s.，所以 {{< imath >}}Y_n - X_n \ge 0{{< /imath >}} a.s.。根据 Fatou 引理，我们有
{{< math >}}

\underset{n\to \infty}{\text{lim inf }} \mathbb{E}[Y_n - X_n] \ge \mathbb{E}\left[ \underset{n\to \infty}{\text{lim inf }} (Y_n - X_n) \right]

{{< /math >}}
由于 {{< imath >}}\lim_{n \to \infty} Y_n = Y{{< /imath >}} a.s. 且 {{< imath >}}\lim_{n \to \infty} X_n = X{{< /imath >}} a.s.，因此 {{< imath >}}\lim_{n \to \infty} (Y_n - X_n) = Y - X{{< /imath >}} a.s.。所以在期望内部的极限下限为 {{< imath >}}\underset{n\to \infty}{\text{lim inf }} (Y_n - X_n) = Y-X{{< /imath >}} a.s.。

因此，上述不等式右边为 {{< imath >}}\mathbb{E}[Y - X]{{< /imath >}}。由于 {{< imath >}}Y{{< /imath >}} 和 {{< imath >}}X{{< /imath >}} 均可积，根据期望的线性性， {{< imath >}}\mathbb{E}[Y - X] = \mathbb{E}[Y] - \mathbb{E}[X]{{< /imath >}}。

同时，考察不等式左边。由于 {{< imath >}}\mathbb{E}[Y_n]{{< /imath >}} 和 {{< imath >}}\mathbb{E}[X_n]{{< /imath >}} 都是有限值，根据期望的线性性， {{< imath >}}\mathbb{E}[Y_n - X_n] = \mathbb{E}[Y_n] - \mathbb{E}[X_n]{{< /imath >}}。因此
{{< math >}}

\underset{n\to \infty}{\text{lim inf }} \mathbb{E}[Y_n - X_n] = \underset{n\to \infty}{\text{lim inf }} (\mathbb{E}[Y_n] - \mathbb{E}[X_n])

{{< /math >}}
根据下极限的性质，由于题设给出 {{< imath >}}\lim_{n \to \infty} \mathbb{E}[Y_n] = \mathbb{E}[Y]{{< /imath >}} 存在，我们得到
{{< math >}}

\underset{n\to \infty}{\text{lim inf }} (\mathbb{E}[Y_n] - \mathbb{E}[X_n]) = \mathbb{E}[Y] - \underset{n\to \infty}{\text{lim sup }} \mathbb{E}[X_n]

{{< /math >}}
代回到 Fatou 引理的不等式中，我们得到
{{< math >}}

\mathbb{E}[Y] - \mathbb{E}[X] \le \mathbb{E}[Y] - \lim_{n \to \infty} \sup \mathbb{E}[X_n]

{{< /math >}}
由于 {{< imath >}}\mathbb{E}[Y] < \infty{{< /imath >}} 是一个有限值，我们可以从不等式两边同时减去 {{< imath >}}\mathbb{E}[Y]{{< /imath >}}，整理得到
{{< math >}}

\lim_{n \to \infty} \sup \mathbb{E}[X_n] \le \mathbb{E}[X]

{{< /math >}}

同样的，我们考察非负的随机变量序列 {{< imath >}}Y_n + X_n{{< /imath >}}。由于 {{< imath >}}|X_n| \le Y_n{{< /imath >}} a.s. 意味着 {{< imath >}}X_n \ge -Y_n{{< /imath >}} a.s.，所以 {{< imath >}}Y_n + X_n \ge 0{{< /imath >}} a.s.。根据 Fatou 引理，我们有
{{< math >}}

\underset{n\to \infty}{\text{lim inf }} \mathbb{E}[Y_n + X_n] \ge \mathbb{E}\left[ \lim_{n \to \infty} \inf (Y_n + X_n) \right]

{{< /math >}}
由于 {{< imath >}}\lim_{n \to \infty} Y_n = Y{{< /imath >}} a.s. 且 {{< imath >}}\lim_{n \to \infty} X_n = X{{< /imath >}} a.s.，因此 {{< imath >}}\lim_{n \to \infty} (Y_n + X_n) = Y + X{{< /imath >}} a.s.。所以在期望内部的极限下限为 {{< imath >}}\underset{n\to \infty}{\text{lim inf }} (Y_n + X_n) = Y+X{{< /imath >}} a.s.。

因此，上述不等式右边为 {{< imath >}}\mathbb{E}[Y + X]{{< /imath >}}。由于 {{< imath >}}Y{{< /imath >}} 和 {{< imath >}}X{{< /imath >}} 均可积，根据期望的线性性， {{< imath >}}\mathbb{E}[Y + X] = \mathbb{E}[Y] + \mathbb{E}[X]{{< /imath >}}。

同时，考察不等式左边。由于 {{< imath >}}\mathbb{E}[Y_n]{{< /imath >}} 和 {{< imath >}}\mathbb{E}[X_n]{{< /imath >}} 都是有限值，根据期望的线性性， {{< imath >}}\mathbb{E}[Y_n + X_n] = \mathbb{E}[Y_n] + \mathbb{E}[X_n]{{< /imath >}}。因此
{{< math >}}

\underset{n\to \infty}{\text{lim inf }} \mathbb{E}[Y_n + X_n] = \underset{n\to \infty}{\text{lim inf }} (\mathbb{E}[Y_n] + \mathbb{E}[X_n])

{{< /math >}}
根据下极限的性质，由于题设给出 {{< imath >}}\lim_{n \to \infty} \mathbb{E}[Y_n] = \mathbb{E}[Y]{{< /imath >}} 存在，我们得到
{{< math >}}

\underset{n\to \infty}{\text{lim inf }} (\mathbb{E}[Y_n] + \mathbb{E}[X_n]) = \mathbb{E}[Y] + \underset{n\to \infty}{\text{lim inf }} \mathbb{E}[X_n]

{{< /math >}}
代回到 Fatou 引理的不等式中，得到
{{< math >}}

\mathbb{E}[Y] + \mathbb{E}[X] \le \mathbb{E}[Y] + \underset{n\to \infty}{\text{lim inf }} \mathbb{E}[X_n]

{{< /math >}}
由于 {{< imath >}}\mathbb{E}[Y] < \infty{{< /imath >}} 是一个有限值，两边同时减去 {{< imath >}}\mathbb{E}[Y]{{< /imath >}}，并整理得到
{{< math >}}

\mathbb{E}[X] \le \underset{n\to \infty}{\text{lim inf }} \mathbb{E}[X_n]

{{< /math >}}

综上，我们得到了
{{< math >}}

\underset{n\to \infty}{\text{lim sup }} \mathbb{E}[X_n] \le \mathbb{E}[X] \le \underset{n\to \infty}{\text{lim inf }} \mathbb{E}[X_n].

{{< /math >}}
由于对于任何实数序列，其极限下限总是小于或等于其极限上限，即 {{< imath >}}\liminf_{n \to \infty} \mathbb{E}[X_n] \le \limsup_{n \to \infty} \mathbb{E}[X_n]{{< /imath >}}。为了使上述串联不等式链成立，唯一的可能性是所有项都相等，即
{{< math >}}

\lim_{n \to \infty} \sup \mathbb{E}[X_n] = \mathbb{E}[X] = \lim_{n \to \infty} \inf \mathbb{E}[X_n].

{{< /math >}}
这表明序列 {{< imath >}}\{\mathbb{E}[X_n]\}{{< /imath >}} 的极限存在，并且等于 {{< imath >}}\mathbb{E}[X]{{< /imath >}}。所以 {{< imath >}}\lim_{n \to \infty} \mathbb{E}[X_n] = \mathbb{E}[X]{{< /imath >}} 得证。