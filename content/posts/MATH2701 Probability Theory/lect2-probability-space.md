---
tags:
- learning
- math
- probability-theory
discipline: mathematics
publish: true
date: '2025-09-17T09:53:00+08:00'
title: Lect2-Probability Space
categories:
- course-note
---
## Motivation

例题：在圆上“随机”选一段弧，问弧长大于圆周的 {{< imath >}}\frac{1}{3}{{< /imath >}} 的概率？（[Bertrand paradox](https://en.wikipedia.org/wiki/Bertrand_paradox_(probability))）

至少三种自然的“均匀化”模型会给出不同答案：
1. 对弧长参数均匀（在 {{< imath >}}[0, 2\pi){{< /imath >}} 上均匀取长度，再随机起点）。
2. 对端点在圆上独立均匀（等价于随机两点确定弧，需指定取较短或较长弧）。
3. 对中心角或几何构造的中间量均匀（如均匀选角度后裁剪）。

核心问题：如何定义“随机”？不同“随机化”方案导致不同答案。

讨论概率问题必须先明确概率空间（样本空间、事件族与概率测度），否则“概率”无从谈起。

## Probability Space

- 一个概率空间由三元组 {{< imath >}}(\Omega, \mathcal{F}, \mathbb{P}){{< /imath >}} 构成：
	- {{< imath >}}\Omega{{< /imath >}}：样本空间（一次随机试验所有可能结果）。
	- {{< imath >}}\mathcal{F} \subseteq 2^{\Omega}{{< /imath >}}：事件族（允许讨论与运算的集合）。
	- {{< imath >}}\mathbb{P} : \mathcal{F} \to [0,1]{{< /imath >}}：概率测度（赋予事件概率）。

- 记号说明：
	- {{< imath >}}\Omega{{< /imath >}}：样本空间。
	- {{< imath >}}2^{\Omega}{{< /imath >}}：{{< imath >}}\Omega{{< /imath >}} 的幂集（所有子集的集合）。

- 为什么 {{< imath >}}\mathbb{P}{{< /imath >}} 要定义在 {{< imath >}}\mathcal{F}{{< /imath >}} 上而非直接在 {{< imath >}}\Omega{{< /imath >}} 上？
	- 离散可数时，取 {{< imath >}}\mathcal{F} = 2^{\Omega}{{< /imath >}} 可行，且对单点赋值即可确定所有事件的概率。
	- 连续时不同：单点的概率通常为 {{< imath >}}0{{< /imath >}}，但不可数并可有正概率；且 {{< imath >}}2^{\Omega}{{< /imath >}} 中存在不可测集合，无法一致赋值（见下文 Vitali set 与 Axiom of Choice）。因此需选择一个**足够大又可控**的 {{< imath >}}\sigma{{< /imath >}}- 代数作为事件族。

## Sigma-Algebra

- 要求 {{< imath >}}\mathcal{F}{{< /imath >}} 构成一个 {{< imath >}}\sigma{{< /imath >}}- 代数（域）：
	1. {{< imath >}}\emptyset \in \mathcal{F},\ \Omega \in \mathcal{F}{{< /imath >}}。
	2. 若 {{< imath >}}A \in \mathcal{F}{{< /imath >}}，则其补集 {{< imath >}}A^{c} \in \mathcal{F}{{< /imath >}}。
	3. 若 {{< imath >}}A_{1}, A_{2}, \dots \in \mathcal{F}{{< /imath >}}，则可数并 {{< imath >}}\bigcup_{n \ge 1} A_{n} \in \mathcal{F}{{< /imath >}}。

- 注：由德摩根律得可数交封闭。 “{{< imath >}}\sigma{{< /imath >}}”表示对可数并封闭。

- 直觉：这些封闭性保证我们做常见的事件运算不“跑出”可测范围。

## Probability Measure

- 概率测度 {{< imath >}}\mathbb{P} : \mathcal{F} \to [0,1]{{< /imath >}} 满足：
	1. 规范化：{{< imath >}}\mathbb{P}(\emptyset) = 0,\ \mathbb{P}(\Omega) = 1{{< /imath >}}。
	2. 补集关系：对任意 {{< imath >}}A \in \mathcal{F}{{< /imath >}}，{{< imath >}}\mathbb{P}(A) = 1 - \mathbb{P}(A^{c}){{< /imath >}}。
	3. 可数可加性（对两两不交）：若 {{< imath >}}A_{i} \cap A_{j} = \emptyset{{< /imath >}}（{{< imath >}}i \neq j{{< /imath >}}），则 {{< math >}}
 \mathbb{P}\Big( \bigcup_{n \ge 1} A_{n} \Big) = \sum_{n \ge 1} \mathbb{P}(A_{n}) 
{{< /math >}}

若 {{< imath >}}\Omega{{< /imath >}} 可数且 {{< imath >}}\mathcal{F} = 2^{\Omega}{{< /imath >}}，记 {{< imath >}}p_{\omega} := \mathbb{P}(\{\omega\}){{< /imath >}}，则任意 {{< imath >}}A \subseteq \Omega{{< /imath >}} 满足 {{< math >}}
 \mathbb{P}(A) = \sum_{\omega \in A} p_{\omega} 
{{< /math >}}
## Set Operations and Event Semantics

- 集合—事件对应：
	- {{< imath >}}A{{< /imath >}}：事件 {{< imath >}}A{{< /imath >}} 发生。
	- {{< imath >}}A \cup B{{< /imath >}}：至少一个发生。
	- {{< imath >}}A \cap B{{< /imath >}}：同时发生。
	- {{< imath >}}A \setminus B{{< /imath >}}：{{< imath >}}A{{< /imath >}} 且不 {{< imath >}}B{{< /imath >}}。
	- {{< imath >}}A \subseteq B{{< /imath >}}：{{< imath >}}A{{< /imath >}} 蕴含 {{< imath >}}B{{< /imath >}}。
	- {{< imath >}}A \cap B = \emptyset{{< /imath >}}：不能同时发生。
	- {{< imath >}}A \cup B = \Omega{{< /imath >}}：必有一个发生。

- 这些操作在 {{< imath >}}\mathcal{F}{{< /imath >}} 内封闭（由 {{< imath >}}\sigma{{< /imath >}}- 代数性质和德摩根律）。

## Inclusion–Exclusion and Union Bound

- 单调性：若 {{< imath >}}A \subseteq B{{< /imath >}}，则 {{< imath >}}\mathbb{P}(A) \le \mathbb{P}(B){{< /imath >}}。
  证：写 {{< imath >}}B = A \cup (B \setminus A){{< /imath >}}，并为不交，故 {{< imath >}}\mathbb{P}(B) = \mathbb{P}(A) + \mathbb{P}(B \setminus A) \ge \mathbb{P}(A){{< /imath >}}.

- 二集合容斥：
 {{< math >}}

  \mathbb{P}(A \cup B) = \mathbb{P}(A) + \mathbb{P}(B) - \mathbb{P}(A \cap B)
 
{{< /math >}}

- 并界（union bound, Boole 不等式）：
 {{< math >}}

  \mathbb{P}\Big( \bigcup_{n} A_{n} \Big) \le \sum_{n} \mathbb{P}(A_{n})
 
{{< /math >}}

## Limits of Events

- 集合序列的极限：
	- 若 {{< imath >}}A_{1} \subseteq A_{2} \subseteq \cdots{{< /imath >}}，则 {{< math >}}
 \lim_{n \to \infty} A_{n} = \bigcup_{n \ge 1} A_{n} 
{{< /math >}}
	- 若 {{< imath >}}A_{1} \supseteq A_{2} \supseteq \cdots{{< /imath >}}，则 {{< math >}}
 \lim_{n \to \infty} A_{n} = \bigcap_{n \ge 1} A_{n} 
{{< /math >}}
- 测度的“连续性”（极限与测度交换）：
	- 若 {{< imath >}}A_{n} \uparrow{{< /imath >}}，则 {{< imath >}}\mathbb{P}(\lim A_{n}) = \lim\limits_{n \to \infty} \mathbb{P}(A_{n}){{< /imath >}}。
	- 若 {{< imath >}}A_{n} \downarrow{{< /imath >}}，则 {{< imath >}}\mathbb{P}(\lim A_{n}) = \lim\limits_{n \to \infty} \mathbb{P}(A_{n}){{< /imath >}}。
	- 递增情形用不交分解与可数可加性；递减情形用德摩根律转化。

**证**：

只证明递增（非降）的情形。

使用极限的定义，有（类比裂项）
{{< math >}}

\mathbb{P}(\lim_{ n \to \infty } A_{n}) = \mathbb{P}\left( \bigcup_{n\geq 1}A_{n} \right) = \mathbb{P}\left( A_{1} \cup \bigcup_{n\geq	2}(A_{n}\setminus A_{n-1}) \right)

{{< /math >}}
于是就把 {{< imath >}}\lim_{ n \to \infty }A_{n}{{< /imath >}} 写成了一堆不交集合的并，那么根据 {{< imath >}}\mathbb{P}{{< /imath >}} 的第三条公理，可以得到
{{< math >}}

\mathbb{P}(\lim_{ n \to \infty } A_{n}) = \mathbb{P}(A_{1}) + \sum_{n\geq 2}\mathbb{P}(A_{n}\setminus A_{n-1}) = \mathbb{P}(A_{1}) + \lim_{ N \to \infty } \sum_{n=2}^{N} (\mathbb{P}(A_{n})- \mathbb{P}(A_{n-1})) = \lim_{ n \to \infty } \mathbb{P}(A_{n})

{{< /math >}}

## Why Not Take All Subsets?

关于前面提到的为什么事件集 {{< imath >}}\mathcal{F}{{< /imath >}} 不能直接等于 {{< imath >}}2^{\Omega}{{< /imath >}} 的问题，在这里给出一个证明。

考虑问题，如何在 {{< imath >}}\Omega = [0,1){{< /imath >}} 上定义“均匀分布” {{< imath >}}\mathbb{P}{{< /imath >}} ？

- 直觉要求：
	1. 长度一致性：对区间 {{< imath >}}(a,b) \subset [0,1){{< /imath >}}，{{< imath >}}\mathbb{P}((a,b)) = b - a{{< /imath >}}。
	2. 平移不变性：对任意 {{< imath >}}I \subset [0,1){{< /imath >}} 与 {{< imath >}}r \in [0,1){{< /imath >}}，有 {{< imath >}}\mathbb{P}(I) = \mathbb{P}(I + r){{< /imath >}}，其中 {{< imath >}}I + r = \{ (x + r) \bmod 1 : x \in I \}{{< /imath >}}。

- [Vitali set](https://en.wikipedia.org/wiki/Vitali_set)（使用 [Axiom of Choice](https://en.wikipedia.org/wiki/Axiom_of_choice)）表明：若令 {{< imath >}}\mathcal{F} = 2^{[0,1)}{{< /imath >}}，并要求上面两条与 {{< imath >}}\sigma{{< /imath >}}- 可加性，则产生矛盾：（证明用到有理数集的什么性质？为什么一定要通过有理数？）
	1. 定义等价关系 {{< imath >}}x \sim y \iff x - y \in \mathbb{Q}{{< /imath >}}，将 {{< imath >}}[0,1){{< /imath >}} 划分为等价类。
	2. 用 Axiom of Choice 从每个等价类选一代表，得集合 {{< imath >}}N{{< /imath >}}。
	3. 对每个 {{< imath >}}r \in \mathbb{Q} \cap [0,1){{< /imath >}}，令 {{< imath >}}N_{r} := N + r = \{ (x+r) \bmod 1: x \in N\}{{< /imath >}}，可证 {{< imath >}}\{ N_{r} \}{{< /imath >}} 两两不交（反证法）且并为 {{< imath >}}[0,1){{< /imath >}} 的平移副本覆盖。
	4. 可数可加性与平移不变性给出 {{< math >}}
 1 = \mathbb{P}([0,1)) = \sum_{r} \mathbb{P}(N_{r}) = \sum_{r} \mathbb{P}(N) 
{{< /math >}}
     若 {{< imath >}}\mathbb{P}(N) = 0{{< /imath >}}，右端为 {{< imath >}}0{{< /imath >}}；若 {{< imath >}}\mathbb{P}(N) > 0{{< /imath >}}，右端为 {{< imath >}}+\infty{{< /imath >}}，均矛盾。
     结论：{{< imath >}}2^{[0,1)}{{< /imath >}} 中存在不可测集合，无法一致赋予概率。

- 正确做法：取**最小且足够**的 {{< imath >}}\sigma{{< /imath >}}- 代数（Borel {{< imath >}}\sigma{{< /imath >}}- 代数）
	- 令 {{< imath >}}\mathcal{F}{{< /imath >}} 为包含所有开区间的最小 {{< imath >}}\sigma{{< /imath >}}- 代数（Borel）。
	- 在该 {{< imath >}}\mathcal{F}{{< /imath >}} 上存在与长度一致且平移不变的测度（勒贝格测度在 {{< imath >}}[0,1){{< /imath >}} 的限制），从而得到期望的“均匀分布”。

## Discrete vs Continuous

- 离散可数：
	- 可取 {{< imath >}}\mathcal{F} = 2^{\Omega}{{< /imath >}}，对单点赋值（质量函数）即可决定所有事件的概率。
- 连续不可数：
	- 单点概率常为 {{< imath >}}0{{< /imath >}}，但不可数并可得正概率；不可测集合阻止我们将 {{< imath >}}\mathcal{F}{{< /imath >}} 取为 {{< imath >}}2^{\Omega}{{< /imath >}}。必须选取如 Borel（或其完备化）这样的“可测”结构。

## Summary

- 概率论以 {{< imath >}}(\Omega, \mathcal{F}, \mathbb{P}){{< /imath >}} 为基础对象。“随机”的语义由此三元组精确定义。
- {{< imath >}}\sigma{{< /imath >}}- 代数的可数封闭性与测度的可数可加性是技术与直觉的统一；它们保证常见事件运算与极限操作的可用性。
- 并界与容斥是估算复杂事件概率的常用工具。
- 在不可数空间，Axiom of Choice 导致不可测集合的存在，解释了为何不能取 {{< imath >}}\mathcal{F} = 2^{\Omega}{{< /imath >}}.