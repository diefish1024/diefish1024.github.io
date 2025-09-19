---
tags:
- learning
- math
- combinatorics
discipline: mathematics
publish: true
date: '2025-09-16T13:22:00+08:00'
title: Lect1-Counting
categories:
- course-note
---
## Product and Sum Principles

- **加法原理（分类计数）**
  若一个任务可分解为若干个互斥的子类，第 {{< imath >}}i{{< /imath >}} 类有 {{< imath >}}a_i{{< /imath >}} 种方案，则总数为 {{< imath >}}\sum_i a_i{{< /imath >}}。
  解释：互斥保证不重不漏，求和即“或”的计数。

- **乘法原理（分步计数）**
  若一个任务分为若干个有序步骤，步骤 {{< imath >}}i{{< /imath >}} 有 {{< imath >}}b_i{{< /imath >}} 种选择且相互独立，则总数为 {{< imath >}}\prod_i b_i{{< /imath >}}。
  解释：有序步骤逐个做决定，“且”的计数对应乘法。

## Constructing Maps

有些组合证明可以依赖于构造映射：
- **单射**：不同原像映到不同像，用于证明下界或“可嵌入性”。
- **满射**：像覆盖全体，用于证明上界可达或构造覆盖。
- **双射**：建立集合 {{< imath >}}A{{< /imath >}} 与 {{< imath >}}B{{< /imath >}} 的一一对应，从而数 {{< imath >}}|A|=|B|{{< /imath >}}；这是“数某一个量 ⇒ 构造双射”的核心思想。

## [Twelvefoldway](https://en.wikipedia.org/wiki/Twelvefold_way)

将 {{< imath >}}n{{< /imath >}} 个球放入 {{< imath >}}m{{< /imath >}} 个盒子，球与盒子可“可区分/不可区分”，以及盒子容量约束“任意/至多 1/至少 1”。

| {{< imath >}}n{{< /imath >}} | {{< imath >}}m{{< /imath >}} | 任意                                                    | {{< imath >}}\leq 1{{< /imath >}}            | {{< imath >}}\geq 1{{< /imath >}}                         |
| --- | --- | ----------------------------------------------------- | ------------------- | -------------------------------- |
| 不同  | 不同  | {{< imath >}}m^{n}{{< /imath >}}                                               | {{< imath >}}m^{\underline{n}}{{< /imath >}} | {{< imath >}}m!\left\{ {n \atop m} \right\}{{< /imath >}} |
| 同   | 不同  | {{< imath >}}\binom{ n+m-1 }{ m-1 }{{< /imath >}}                              | {{< imath >}}\binom{ m }{ n }{{< /imath >}}  | {{< imath >}}\binom{ n-1 }{ m-1 }{{< /imath >}}           |
| 不同  | 同   | {{< imath >}}\sum_{k=0}^{\min(n,m)} \left\{ {n \atop k} \right\}{{< /imath >}} | {{< imath >}}[n \leq m]{{< /imath >}}        | {{< imath >}}\left\{ {n \atop m} \right\}{{< /imath >}}   |
| 同   | 同   | {{< imath >}}p_{\leq m}(n){{< /imath >}}                                       | {{< imath >}}[n \leq m]{{< /imath >}}        | {{< imath >}}p(n,m){{< /imath >}}                         |

“把 {{< imath >}}n{{< /imath >}} 个不同球分成 {{< imath >}}k{{< /imath >}} 个非空无序盒”对应第二类斯特林数 {{< imath >}}\left\{ {n \atop k} \right\}{{< /imath >}}。

## Stirling Numbers of the Second Kind

- 定义：{{< imath >}}\left\{ {n \atop k} \right\}{{< /imath >}} 表示“将 {{< imath >}}n{{< /imath >}} 个不同元素分成 {{< imath >}}k{{< /imath >}} 个非空无序块”的方案数。
- 基本递推：{{< math >}}
 \left\{ {n \atop k} \right\} = \left\{ {n-1 \atop k-1} \right\} + k \left\{ {n-1 \atop k} \right\}, \quad \left\{ {0 \atop 0} \right\}=1 
{{< /math >}} 从组合意义上理解，元素 {{< imath >}}n{{< /imath >}} 要么独自成新块（{{< imath >}}\left\{ {n-1 \atop k-1} \right\}{{< /imath >}}），要么加入已有 {{< imath >}}k{{< /imath >}} 个块之一（{{< imath >}}k \left\{ {n-1 \atop k} \right\}{{< /imath >}}）。

- 与降阶阶乘的分层展开：{{< math >}}
 m^{n} = \sum_{k=1}^{n} \left\{ {n \atop k} \right\} m^{\underline{k}} 
{{< /math >}}
  组合证明：
  1. 将 {{< imath >}}n{{< /imath >}} 个不同球先“分组”为 {{< imath >}}k{{< /imath >}} 个非空无序块： {{< imath >}}\left\{ {n \atop k} \right\}{{< /imath >}}。
  2. 从 {{< imath >}}m{{< /imath >}} 个可区分盒中选出并按顺序对应这 {{< imath >}}k{{< /imath >}} 个块： {{< imath >}}m^{\underline{k}}{{< /imath >}}。
  按 {{< imath >}}k{{< /imath >}} 分层求和即得全部映射 {{< imath >}}[n] \to [m]{{< /imath >}} 的总数 {{< imath >}}m^n{{< /imath >}}。

- 另一恒等式：{{< math >}}
 \left\{ {n \atop m} \right\} = \sum_{k=0}^{n-1} \binom{ n-1 }{ k } \left\{ {n-k-1 \atop k-1} \right\} 
{{< /math >}}

## Vandermonde’s Convolution

- 范德蒙卷积：
  {{< math >}}

  \binom{ r+s }{ n } = \sum_{k=0}^{n} \binom{ r }{ k } \binom{ s }{ n-k }
  
{{< /math >}}
- 组合证明：从 {{< imath >}}r+s{{< /imath >}} 个元素中选 {{< imath >}}n{{< /imath >}} 个。分类：从前 {{< imath >}}r{{< /imath >}} 个元素选 {{< imath >}}k{{< /imath >}} 个、从后 {{< imath >}}s{{< /imath >}} 个元素选 {{< imath >}}n-k{{< /imath >}} 个，{{< imath >}}k{{< /imath >}} 遍历 {{< imath >}}0{{< /imath >}} 至 {{< imath >}}n{{< /imath >}}，互斥且完备，故求和。

- 代数证明：用二项式定理展开 {{< imath >}}(1+x)^{r+s} = (1+x)^r (1+x)^s{{< /imath >}}，比对 {{< imath >}}x^n{{< /imath >}} 的系数即得。


## Binomial Coefficients: Basic Identities and Proofs

- 对称性： {{< imath >}}\binom{ n }{ k } = \binom{ n }{ n-k }{{< /imath >}}
  组合：选 {{< imath >}}k{{< /imath >}} 个等价于弃 {{< imath >}}n-k{{< /imath >}} 个。

- Pascal 恒等式： {{< imath >}}\binom{ n }{ k } = \binom{ n-1 }{ k } + \binom{ n-1 }{ k-1 }{{< /imath >}}
  组合：考虑是否包含元素 {{< imath >}}n{{< /imath >}}。

- 总和： {{< imath >}}\sum_{k=0}^{n} \binom{ n }{ k } = 2^{n}{{< /imath >}}
  组合：每元素选/不选两种，乘法原理；或代数用 {{< imath >}}(1+1)^n{{< /imath >}}。

- “曲棍球杆”恒等式： {{< imath >}}\sum_{i=r}^{n} \binom{ i }{ r } = \binom{ n+1 }{ r+1 }{{< /imath >}}
  组合：给定最大元素，按其值分类累加；或用 Pascal 叠加。

- 一阶矩： {{< imath >}}\sum_{k=0}^{n} k \binom{ n }{ k } = n 2^{n-1}{{< /imath >}}
  组合：双计数“选出子集并指定一个已选标记元素”；或代数对 {{< imath >}} (1+x)^n {{< /imath >}} 求导令 {{< imath >}}x=1{{< /imath >}}。

- 二项式定理： {{< imath >}}(x+y)^{n} = \sum_{k=0}^{n} \binom{ n }{ k } x^{k} y^{n-k}{{< /imath >}}
  代数：展开乘法；组合：从 {{< imath >}}n{{< /imath >}} 个因子中选 {{< imath >}}k{{< /imath >}} 次取 {{< imath >}}x{{< /imath >}}。

- 范德蒙卷积：见上一节。

- 凸性与对数凹性：
	- 对于固定 {{< imath >}}n{{< /imath >}}，序列 {{< imath >}}\left( \binom{ n }{ 0 }, \binom{ n }{ 1 }, \dots, \binom{ n }{ n } \right){{< /imath >}} 是对称、单峰且对数凹：对所有可行 {{< imath >}}k{{< /imath >}}，有 {{< math >}}
 \binom{ n }{ k }^{2} \ge \binom{ n }{ k-1 } \binom{ n }{ k+1 } 
{{< /math >}}
	- 计算比值 {{< math >}}
 \frac{ \binom{ n }{ k } }{ \binom{ n }{ k-1 } } = \frac{ n-k+1 }{ k }, \quad \frac{ \binom{ n }{ k+1 } }{ \binom{ n }{ k } } = \frac{ n-k }{ k+1 } 
{{< /math >}} 由此得 {{< math >}}
 \frac{ \binom{ n }{ k }^{2} }{ \binom{ n }{ k-1 } \binom{ n }{ k+1 } } = \frac{ k (k+1) }{ (n-k+1)(n-k) } \cdot \frac{ (n-k+1)(n-k) }{ k (k+1) } = 1 
{{< /math >}}

## Catalan Numbers

- 第 {{< imath >}}n{{< /imath >}} 个卡特兰数 {{< math >}}
 C_n = \frac{ 1 }{ n+1 } \binom{ 2n }{ n } 
{{< /math >}}
- 网格路径模型：从点 {{< imath >}}(0,0){{< /imath >}} 到 {{< imath >}}(n,n){{< /imath >}}，每步向右 {{< imath >}}R{{< /imath >}} 或向上 {{< imath >}}U{{< /imath >}}，要求路径始终不越过主对角线 {{< imath >}}y=x{{< /imath >}}。这等价于计数长度 {{< imath >}}2n{{< /imath >}} 的序列，任意前缀中 {{< imath >}}U{{< /imath >}} 的数量不小于 {{< imath >}}R{{< /imath >}} 的数量。

- 经典反射法证明（Ballot/Reflection）：
  1. 总路径数：不加限制，从 {{< imath >}}2n{{< /imath >}} 步中选出 {{< imath >}}n{{< /imath >}} 步为 {{< imath >}}U{{< /imath >}}，共 {{< imath >}}\binom{ 2n }{ n }{{< /imath >}} 条。
  2. 计“坏”路径：越界的路径。设首次越界的时刻为第 {{< imath >}}t{{< /imath >}} 步，此时 {{< imath >}}R{{< /imath >}} 比 {{< imath >}}U{{< /imath >}} 多一。将前 {{< imath >}}t{{< /imath >}} 步关于直线 {{< imath >}}y=x{{< /imath >}} 反射（交换 {{< imath >}}U{{< /imath >}} 与 {{< imath >}}R{{< /imath >}}），得到一条从 {{< imath >}}(0,0){{< /imath >}} 到 {{< imath >}}(n+1,n-1){{< /imath >}} 的路径；此构造是坏路径与“从 {{< imath >}}(0,0){{< /imath >}} 到 {{< imath >}}(n+1,n-1){{< /imath >}} 的任意路径”之间的双射。因此坏路径数为 {{< imath >}}\binom{ 2n }{ n-1 }{{< /imath >}}。
  3. 好路径数： {{< imath >}}\binom{ 2n }{ n } - \binom{ 2n }{ n-1 } = \frac{ 1 }{ n+1 } \binom{ 2n }{ n }{{< /imath >}}，即 {{< imath >}}C_n{{< /imath >}}。

- 本质抽象：两类操作 {{< imath >}}U{{< /imath >}} 与 {{< imath >}}R{{< /imath >}} 总数相等，且任意时刻“{{< imath >}}U{{< /imath >}} 的累计数 ≥ {{< imath >}}R{{< /imath >}} 的累计数”。同构到投票/括号配对/堆栈可行序等大量模型。



