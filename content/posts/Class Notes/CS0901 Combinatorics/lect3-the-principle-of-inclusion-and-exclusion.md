---
tags:
- learning
- math
- combinatorics
discipline: mathematics
publish: true
date: '2025-09-28T12:55:00+08:00'
title: Lect3-The Principle of Inclusion and Exclusion
categories:
- course-note
---
## Principle of Inclusion and Exclusion

对于任意有限集合 {{< imath >}}A_1, A_2, \dots, A_n{{< /imath >}}，容斥原理如下：
{{< math >}}
  
\left| \bigcup_{i=1}^{n} A_i \right| = \sum_{i=1}^{n} \left| A_i \right| - \sum_{1\leq i< j\leq n} \left| A_i \cap A_j \right| + \dots + (-1)^{n} \left| \bigcap_{i=1}^{n} A_i \right|  

{{< /math >}}  
可更紧凑地表示为
{{< math >}}
  
\left| \bigcup_{i=1}^{n} A_i \right| = \sum_{k=1}^{n} (-1)^{k-1} \sum_{S \subseteq [n], |S|=k} \left| \bigcap_{i \in S} A_i \right|  

{{< /math >}}
或 
{{< math >}}
  
\left| \bigcup_{i=1}^{n} A_i \right| = \sum_{\emptyset \neq S \subseteq [n]} (-1)^{|S|-1} \left| \bigcap_{i \in S} A_i \right|  

{{< /math >}}

**证**

我们通过观察每个元素 {{< imath >}}x{{< /imath >}} 对等式两边的贡献来证明。若 {{< imath >}}x{{< /imath >}} 不属于任何集合 {{< imath >}}A_i{{< /imath >}}，则其贡献为 {{< imath >}}0{{< /imath >}}。若 {{< imath >}}x{{< /imath >}} 属于恰好 {{< imath >}}m \geq 1{{< /imath >}} 个集合，则对左侧贡献 {{< imath >}}1{{< /imath >}}，对右侧贡献 {{< imath >}}\sum_{j=1}^m (-1)^{j-1} \binom{m}{j}{{< /imath >}}。由二项式定理，{{< imath >}}\sum_{j=0}^m (-1)^j \binom{m}{j} = 0{{< /imath >}}（当 {{< imath >}}m \geq 1{{< /imath >}}），故 {{< imath >}}\sum_{j=1}^m (-1)^{j-1} \binom{m}{j} = 1{{< /imath >}}，等式成立。

**补集形式**

在组合学中，常使用补集形式。给定全集 {{< imath >}}U{{< /imath >}} 和子集 {{< imath >}}B_1, B_2, \dots, B_n{{< /imath >}}（视为“坏事件”），不属于任何 {{< imath >}}B_i{{< /imath >}} 的元素数量为：
{{< math >}}
  
\left| U \setminus \bigcup_{i=1}^n B_i \right| = \sum_{S \subseteq [n]} (-1)^{|S|} \left| \bigcap_{i \in S} B_i \right|  

{{< /math >}}  
其中约定 {{< imath >}}\bigcap_{i \in \emptyset} B_i = U{{< /imath >}}。

## Derangements and Surjective Functions

### Surjective Counting

考虑从 {{< imath >}}[n]{{< /imath >}} 到 {{< imath >}}[m]{{< /imath >}} 的满射（surjective functions）。设全集 {{< imath >}}U{{< /imath >}} 为所有映射，{{< imath >}}|U| = m^n{{< /imath >}}。定义 {{< imath >}}B_i{{< /imath >}} 为没有元素映射到 {{< imath >}}i \in [m]{{< /imath >}} 的映射集合，则 {{< imath >}}\left| \bigcap_{k \in S} B_k \right| = (m - |S|)^n{{< /imath >}}。由补集形式，满射数量为：
{{< math >}}
  
m! \left\{ n \atop m \right\}  = \sum_{k=0}^m (-1)^k \binom{m}{k} (m-k)^n = \sum_{k=0}^m (-1)^{m-k} \binom{m}{k} k^n  

{{< /math >}}

### Derangement Counting

**错排**：一个置换 {{< imath >}}f: [n] \to [n]{{< /imath >}} 称为**错排**，若无固定点，即 {{< imath >}}\forall x \in [n], f(x) \neq x{{< /imath >}}。错排的循环分解不含大小为 {{< imath >}}1{{< /imath >}} 的循环。{{< imath >}}D_n{{< /imath >}} 表示 {{< imath >}}n{{< /imath >}} 个元素的错排数量。

**方法 1：容斥原理**

设 {{< imath >}}U{{< /imath >}} 为 {{< imath >}}[n]{{< /imath >}} 上的所有置换，{{< imath >}}|U| = n!{{< /imath >}}。定义 {{< imath >}}B_i{{< /imath >}} 为固定 {{< imath >}}i{{< /imath >}} 的置换集合（{{< imath >}}f(i) = i{{< /imath >}}）。则 {{< imath >}}\left| \bigcap_{i \in S} B_i \right| = (n - |S|)!{{< /imath >}}，错排数量为
{{< math >}}
  
D_n = \sum_{S \subseteq [n]} (-1)^{|S|} (n - |S|)! = n! \sum_{k=0}^n \frac{(-1)^k}{k!}  

{{< /math >}}
当 {{< imath >}}n \to \infty{{< /imath >}}，{{< imath >}}D_n / n! \approx 1/e{{< /imath >}}，表示随机置换为错排的概率趋于 {{< imath >}}1/e{{< /imath >}}。

**方法 2：循环分解**

分解成大小 {{< imath >}}\geq 2{{< /imath >}} 的循环。对于一个大小至少为 {{< imath >}}2{{< /imath >}} 的循环，它的 EGF 为
{{< math >}}

C(x) = \ln \dfrac{1}{1-x} - x

{{< /math >}}
错排看成一系列这样的循环的集合，所以
{{< math >}}

D(x) = \exp(C(x)) = \dfrac{1}{1-x}\cdot e^{ -x }

{{< /math >}}
从而
{{< math >}}

\begin{align*}
D_{n} = n![x^{n}]D(x) & = n!\sum_{k=0}^{n} ([x^{k}]e^{ -x })\left( [x^{n-k} ] \dfrac{1}{1-x} \right) \\
 & = n!\sum_{k=0}^{n} \dfrac{(-1)^{k}}{k!}\cdot 1
\end{align*}

{{< /math >}}

**方法 3：指数生成函数**

先求出递推式

**递推 1**：{{< imath >}}D_n = (n-1)(D_{n-1} + D_{n-2}){{< /imath >}}，初始条件 {{< imath >}}D_0 = 1{{< /imath >}}，{{< imath >}}D_1 = 0{{< /imath >}}。

**证**：考虑错排 {{< imath >}}f{{< /imath >}}，{{< imath >}}f(n) = k \neq n{{< /imath >}}。分两种情况：

- 若 {{< imath >}}f(k) = n{{< /imath >}}，移除 {{< imath >}}n{{< /imath >}} 和 {{< imath >}}k{{< /imath >}}，其余 {{< imath >}}n-2{{< /imath >}} 个元素形成错排，贡献 {{< imath >}}(n-1)D_{n-2}{{< /imath >}}。
- 若 {{< imath >}}f(k) \neq n{{< /imath >}}，构造 {{< imath >}}g: [n-1] \to [n-1]{{< /imath >}}，使 {{< imath >}}g(i) = f(i){{< /imath >}}（{{< imath >}}i \neq k{{< /imath >}}），{{< imath >}}g(k) = n{{< /imath >}}，{{< imath >}}g{{< /imath >}} 为 {{< imath >}}[n-1]{{< /imath >}} 上的错排，贡献 {{< imath >}}(n-1)D_{n-1}{{< /imath >}}。

**递推 2**：{{< imath >}}D_n = n D_{n-1} + (-1)^n{{< /imath >}}。

**证**：由第一种递推关系代数推导，或考虑若 {{< imath >}}\sigma(n) = n{{< /imath >}}，则其余 {{< imath >}}n-1{{< /imath >}} 个元素形成错排，贡献 {{< imath >}}D_{n-1}{{< /imath >}}。

定义 {{< imath >}}D(x) = \sum_{n=0}^\infty \frac{D_n}{n!} x^n{{< /imath >}}。由递推 {{< imath >}}D_n = n D_{n-1} + (-1)^n{{< /imath >}}，得微分方程 {{< imath >}}D(x) - x D'(x) = e^{-x}{{< /imath >}}，解得 {{< imath >}}D(x) = \frac{e^{-x}}{1-x}{{< /imath >}}。展开：
{{< math >}}
  
D(x) = \left( \sum_{k=0}^\infty \frac{(-1)^k}{k!} x^k \right) \left( \sum_{j=0}^\infty x^j \right)  

{{< /math >}}  
提取 {{< imath >}}x^n{{< /imath >}} 的系数，{{< imath >}}\frac{D_n}{n!} = \sum_{k=0}^n \frac{(-1)^k}{k!}{{< /imath >}}，即 {{< imath >}}D_n = n! \sum_{k=0}^n \frac{(-1)^k}{k!}{{< /imath >}}。

**方法 3：置换拆分**

把一个置换看成若干个环的组合，错排表示拆分中没有大小为 {{< imath >}}1{{< /imath >}} 的环。（后续过程待完成）

**方法 4：固定点计数**

恰有 {{< imath >}}k{{< /imath >}} 个固定点的置换数为 {{< imath >}}\binom{n}{k} D_{n-k}{{< /imath >}}。总置换数为
{{< math >}}
  
n! = \sum_{k=0}^n \binom{n}{k} D_{n-k}  

{{< /math >}}
 通过莫比乌斯反演，可推导 {{< imath >}}D_n{{< /imath >}} 的显式公式。

**积和式**

定义 {{< imath >}}n \times n{{< /imath >}} 矩阵 {{< imath >}}A = (a_{i,j}){{< /imath >}} 的积和式为
{{< math >}}
  
\text{perm } A = \sum_{\sigma \in S_n} \prod_{i=1}^n a_{i, \sigma(i)}  

{{< /math >}}  
若 {{< imath >}}A{{< /imath >}} 为 0-1 矩阵，perm {{< imath >}}A{{< /imath >}} 计数满足 {{< imath >}}a_{i, \sigma(i)} \neq 0{{< /imath >}} 的置换数。特别地，{{< imath >}}D_n = \text{perm}(1_n - I_n){{< /imath >}}。对于二分图的邻接矩阵，perm {{< imath >}}A{{< /imath >}} 计数完美匹配数量。

**容斥计算积和式**

设 {{< imath >}}U = S_n{{< /imath >}}，{{< imath >}}B_i = {\sigma \in S_n \mid a_{i, \sigma(i)} = 0}{{< /imath >}}。令 {{< imath >}}R = {(i,j) \mid a_{i,j} = 0}{{< /imath >}}，{{< imath >}}r_k{{< /imath >}} 为 {{< imath >}}R{{< /imath >}} 中 {{< imath >}}k{{< /imath >}} 个互不共享行或列的坐标对数量。则
{{< math >}}
  
\sum_{S: |S|=k} \left| \bigcap_{i \in S} B_i \right| = r_k (n-k)!  

{{< /math >}}  
积和式为
{{< math >}}
  
\text{perm } A = \sum_{k=0}^n (-1)^k r_k (n-k)!  

{{< /math >}}  
更优方法：设 {{< imath >}}U{{< /imath >}} 为满足 {{< imath >}}a_{i,f(i)} \neq 0{{< /imath >}} 的映射集合，{{< imath >}}B_i{{< /imath >}} 为 {{< imath >}}f^{-1}(i) = \emptyset{{< /imath >}} 的映射集合。则：
{{< math >}}
  
|U| = \prod_{i=1}^n \left( \sum_{j=1}^n a_{i,j} \right), \quad \left| \bigcap_{k \in S} B_k \right| = \prod_{i=1}^n \left( \sum_{j \in [n] \setminus S} a_{i,j} \right)  

{{< /math >}}  
Ryser 公式：
{{< math >}}
  
\text{perm } A = \sum_{S \subseteq [n]} (-1)^{|S|} \prod_{i=1}^n \left( \sum_{j \in [n] \setminus S} a_{i,j} \right)  

{{< /math >}}

## Möbius Inversion in Number Theory

**欧拉函数**

欧拉函数 {{< imath >}}\phi(n){{< /imath >}} 为 {{< imath >}}[n]{{< /imath >}} 中与 {{< imath >}}n{{< /imath >}} 互质的正整数数量：
{{< math >}}
  
\phi(n) = \sum_{k=1}^n [\gcd(n,k) = 1]  

{{< /math >}}
{{< imath >}}\phi(n){{< /imath >}} 是积性函数：若 {{< imath >}}\gcd(a,b) = 1{{< /imath >}}，则 {{< imath >}}\phi(ab) = \phi(a)\phi(b){{< /imath >}}。对于素数 {{< imath >}}p{{< /imath >}}，{{< imath >}}\phi(p) = p-1{{< /imath >}}，{{< imath >}}\phi(p^r) = (p-1)p^{r-1}{{< /imath >}}。

**性质**：{{< imath >}}\sum_{d|n} \phi(d) = n{{< /imath >}}。

**证**：对于 {{< imath >}}k \in [n]{{< /imath >}}，若 {{< imath >}}\gcd(n,k) = d{{< /imath >}}，则 {{< imath >}}\gcd(n/d, k/d) = 1{{< /imath >}}。故
{{< math >}}
  
n = \sum_{d|n} |{k \in [n] \mid \gcd(n,k) = d}| = \sum_{d|n} \phi(n/d) = \sum_{d|n} \phi(d)  

{{< /math >}}

**容斥计算 {{< imath >}}\phi(n){{< /imath >}}**

设 {{< imath >}}n = p_1^{r_1} \dots p_m^{r_m}{{< /imath >}}，{{< imath >}}U = [n]{{< /imath >}}，{{< imath >}}B_i = \{k \in [n] \mid p_i | k\}{{< /imath >}}。则 {{< imath >}}\phi(n) = \left| U \setminus \bigcup_{i=1}^m B_i \right|{{< /imath >}}，且 {{< imath >}}\left| \bigcap_{i \in S} B_i \right| = \frac{n}{\prod_{i \in S} p_i}{{< /imath >}}。由补集形式
{{< math >}}
  
\phi(n) = n \prod_{i=1}^m \left( 1 - \frac{1}{p_i} \right)  

{{< /math >}}
**莫比乌斯函数**
{{< math >}}
  
\mu(n) =  
\begin{cases}  
1 & \text{若 } n = 1 \\
0 & \text{若 } \exists p, p^2 | n \\  
(-1)^k & \text{若 } n = p_1 \dots p_k \text{（不同素数）}  
\end{cases}  

{{< /math >}}则
{{< math >}}
  
\phi(n) = \sum_{d|n} \mu(d) \frac{n}{d}  

{{< /math >}}

**莫比乌斯反演公式**

若 {{< imath >}}f = g * 1 = \sum_{d|n} g(d){{< /imath >}}，则
{{< math >}}
  
g = f * \mu = \sum_{d|n} f(d) \mu(n/d)  

{{< /math >}}

**证明**：设 {{< imath >}}n = p_1^{r_1} \dots p_m^{r_m}{{< /imath >}}，{{< imath >}}U = \bigcup_{d|n} T_d{{< /imath >}}，{{< imath >}}T_d = \{(d,j) \mid 1 \leq j \leq g(d)\}{{< /imath >}}，{{< imath >}}B_i = \{(d,j) \in U \mid p_i \mid d\}{{< /imath >}}。则 {{< imath >}}g(n) = \left| U \setminus \bigcup B_i \right|{{< /imath >}}，且 {{< imath >}}|U| = f(n){{< /imath >}}，{{< imath >}}\left| \bigcap_{i \in S} B_i \right| = f\left( n / \prod_{i \in S} p_i \right){{< /imath >}}。由补集形式：
{{< math >}}
  
g(n) = \sum_{S \subseteq [m]} (-1)^{|S|} f \left( n / \prod_{i \in S} p_i \right) = \sum_{d|n} \mu(d) f(n/d)  

{{< /math >}}

**集合函数反演**

若 {{< imath >}}f(S) = \sum_{T \subseteq S} g(T){{< /imath >}}，则
{{< math >}}
  
g(S) = \sum_{T \subseteq S} (-1)^{|S|-|T|} f(T)  

{{< /math >}}

**应用：有限域上不可约多项式**

在有限域 {{< imath >}}F_q{{< /imath >}}（{{< imath >}}q = p^t{{< /imath >}}）上，次数为 {{< imath >}}n{{< /imath >}} 的首一不可约多项式数量 {{< imath >}}N_n{{< /imath >}} 满足
{{< math >}}
  
q^n = \sum_{d|n} d N_d  

{{< /math >}}  
由莫比乌斯反演
{{< math >}}
  
N_n = \frac{1}{n} \sum_{d|n} \mu(n/d) q^d  

{{< /math >}}

**证**：设 {{< imath >}}F(x) = \sum_{n=0}^\infty q^n x^n = \frac{1}{1-qx}{{< /imath >}} 为首一多项式数量的 OGF。由唯一分解定理
{{< math >}}
  
F(x) = \prod_{d=1}^\infty \left( \frac{1}{1-x^d} \right)^{N_d}  

{{< /math >}}  
取对数并比较 {{< imath >}}x^n{{< /imath >}} 系数，得 {{< imath >}}q^n = \sum_{d|n} d N_d{{< /imath >}}，再反演得结果。