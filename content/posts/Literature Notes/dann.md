---
tags:
- literature-note
- domain-adaptation
title: DANN
publish: true
created: 2025-07-30 10:59
categories:
- literature-note
---
## Introduction

类似 GAN 的对抗训练思想

## Domain Adaptation

给定源域 {{< imath >}}D_{S}{{< /imath >}} （有标签）和目标域 {{< imath >}}D_{T}{{< /imath >}} （无标签），目标是训练一个分类器 {{< imath >}}\eta: X\to Y{{< /imath >}} 使其在目标域上的目标风险
{{< math >}}

R_{D_{T}}(\eta) = \underset{(\mathbf{x},y)\sim D_{T}}{\mathrm{Pr}}(\eta(\mathbf{x}) \neq y)

{{< /math >}}
最小

#### Domain Divergence

需要量化两个领域的“相似度”，从而引出了 **H- 散度** 的概念：
{{< math >}}

d_{\mathcal{H}}(D_S, D_T) = 2 \sup_{\eta \in \mathcal{H}} \left| \Pr_{x \sim D_S}[\eta(x) = 1] - \Pr_{x \sim D_T}[\eta(x) = 1] \right|

{{< /math >}}
含义是最优的分类器将目标域和源域判定为 1 的可能性之差，当 H- 散度非常小时，说明两个领域很难被区分，也就说明学习的特征实现了领域不变性的效果

由于理论 H 散度是理想数据分布上的定义，实际中只有有限的样本集 {{< imath >}}S{{< /imath >}} 和 {{< imath >}}T{{< /imath >}} ，因此需要一定的近似，于是需要经验 H- 散度
{{< math >}}

\hat{d}_{\mathcal{H}}(S, T) = 2 \left(1 - \min_{\eta \in \mathcal{H}} \left[ \dfrac{1}{n}\sum_{i=1}^n \mathcal{I}[\eta(x_i) = 0] + \dfrac{1}{n'}\sum_{i=n+1}^N \mathcal{I}[\eta(x_i) = 1] \right] \right)

{{< /math >}}
其中 {{< imath >}}\mathcal{I}[\cdot]{{< /imath >}} 表示条件为真时为 1，否则为 0

#### Proxy Distance

经验 H- 散度也需要直接遍历所有的 {{< imath >}}\eta{{< /imath >}} ，在计算上不现实，需要一个进一步的近似方法，因此考虑 Proxy A-distance (PAD)

构造用于领域分类的数据集
{{< math >}}

U = \{ (\mathbf{x}_{i},0) \}_{i=1}^{n} \cup \{ (\mathbf{x}_{i},1) \}_{i=n+1}^{N}

{{< /math >}}
用这个数据集训练分类器，设 {{< imath >}}\epsilon{{< /imath >}} 为在数据集 {{< imath >}}U{{< /imath >}} 上训练出的最优领域分类器所达到的最小错误率，那么可以用
{{< math >}}

\hat{d}_{\mathcal{A}} = 2(1-2\epsilon)

{{< /math >}}
来近似 H- 散度

#### Generalization Bound on the Target Risk

有效性证明

理论研究说明模型的目标风险可以通过源风险和两个领域的散度来限制，主要思想是
{{< math >}}

R_{D_T}(\eta) \le R_S(\eta) + \text{Domain Divergence Terms} + \text{Complexity Terms} + \beta

{{< /math >}}
其中 {{< imath >}}\text{Domain Divergence Terms}\approx d_{\mathcal{H}}(S, T){{< /imath >}} ，可以用上面的 {{< imath >}}\hat{d}_{\mathcal{A}}{{< /imath >}} 近似；{{< imath >}}\text{Complexity Terms}{{< /imath >}} 是一个比较小的常数项，和模型本身训练有关（原公式没看懂。。）；{{< imath >}}\beta{{< /imath >}} 是一个理想化的项，表示最好情况下在目标域和源域上同时取得的最低错误率

## DANN

优化目标：
{{< math >}}

E(\theta_f, \theta_y, \theta_d) = \frac{1}{n} \sum_{i=1}^n \mathcal{L}_y(\theta_f, \theta_y) - \lambda \left( \frac{1}{n} \sum_{i=1}^n \mathcal{L}_d(\theta_f, \theta_d) + \frac{1}{n'} \sum_{i=n+1}^N \mathcal{L}_d(\theta_f, \theta_d) \right)

{{< /math >}}
核心是 Saddle Point Problem ，找到需要找到鞍点而非最小值

如何实现对抗：

- 标签预测参数：
{{< math >}}

\theta_{y} \leftarrow \theta_{y} - \mu \dfrac{ \partial \mathcal{L}_{y} }{ \partial \theta_{y} } 

{{< /math >}}
- 领域分类参数：
{{< math >}}

\theta_{d} \leftarrow \theta_{d} - \mu \lambda \dfrac{ \partial \mathcal{L}_{d} }{ \partial \theta_{d} } 

{{< /math >}}
- **特征提取参数**：
{{< math >}}

\theta_{f} \leftarrow \theta_{f} - \mu\left( \dfrac{ \partial \mathcal{L}_{y} }{ \partial \theta_{f} }  - \lambda \dfrac{ \partial \mathcal{L}_{d} }{ \partial \theta_{f} }  \right)

{{< /math >}}
核心需要最大化 {{< imath >}}\mathcal{L}_{d}{{< /imath >}} ，因此需要沿着梯度的正向优化

**Gradient Reversal Layer (GRL)** 是实现对抗的核心组件，具体原理是在前向传播时表现为 {{< imath >}}R(x)=x{{< /imath >}} ，但是反向传播时 {{< imath >}}\dfrac{\mathrm{d} R}{\mathrm{d}x}=-I{{< /imath >}} ，这样可以直接利用内置的自动微分优雅实现对抗