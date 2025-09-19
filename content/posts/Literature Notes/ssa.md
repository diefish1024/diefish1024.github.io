---
tags:
- literature-note
- TTA
title: SSA
publish: true
date: '2025-07-30T11:00:00+08:00'
categories:
- literature-note
---
## Introduction

TTA 在回归任务上的局限：为分类任务设计，一般基于熵最小化和特征对齐；熵最小化不适用，回归模型产生单一值，不产生概率分布；简单特征对齐对回归模型效果不佳，可能反而会稀释需要学习的特征

## Problem Setting

考虑一个回归模型 {{< imath >}}f_\theta: \mathcal{X} \to \mathbb{R}{{< /imath >}}，可以进一步分解为**特征提取器** {{< imath >}}g_\phi: \mathcal{X} \to \mathbb{R}^D{{< /imath >}}（从输入 {{< imath >}}\mathcal{X}{{< /imath >}} 提取 {{< imath >}}D{{< /imath >}} 维特征 {{< imath >}}z{{< /imath >}}）和**线性回归器** {{< imath >}}h_\psi(z) = w^T z + b{{< /imath >}}（或者 {{< imath >}}h_{\psi}(z)=Wz+b{{< /imath >}}）

{{< imath >}}f_\theta{{< /imath >}} 首先在一个有标签的**源数据集** {{< imath >}}S = \{(x_i, y_i)\}_{i=1}^{N_s}{{< /imath >}} 上进行预训练，数据从源域分布 {{< imath >}}p_s{{< /imath >}} 中采样

目标是使用一个**无标签的**目标数据集 {{< imath >}}T = \{x_j\}_{j=1}^{N_t}{{< /imath >}} 来适应预训练好的模型 {{< imath >}}f_\theta{{< /imath >}} 到目标域

我们假设存在 **covariate shift** ，这意味着：
- 输入数据的分布在源域和目标域之间是不同的：{{< imath >}}p_s(x) \neq p_t(x){{< /imath >}} 
- 但给定输入后，输出的条件分布是相同的：{{< imath >}}p_s(y|x) = p_t(y|x){{< /imath >}} 

## Test-time Adaptation for Regression

### Basic Idea: Feature Alignment

**朴素实现**：

- **计算源域特征统计量**：在源域训练后，计算源域特征的**均值** {{< imath >}}\mu^s{{< /imath >}} 和**元素级方差** {{< imath >}}\sigma^{s2}{{< /imath >}} 
{{< math >}}
 \mu^s = \frac{1}{N_s} \sum_{i=1}^{N_s} z_i^s, \quad \sigma^{s2} = \frac{1}{N_s} \sum_{i=1}^{N_s} (z_i^s - \mu^s) \odot (z_i^s - \mu^s) \quad \text{(1)} 
{{< /math >}}
	其中 {{< imath >}}z_i^s = g_\phi(x_i){{< /imath >}} 是源特征，{{< imath >}}N_s{{< /imath >}} 是源数据样本数，{{< imath >}}\odot{{< /imath >}} 表示元素级乘积

- **目标域特征统计量**：在目标域，对每个迷你批次（mini-batch）{{< imath >}}B = \{x_j\}_{j=1}^{N_B}{{< /imath >}}，计算其特征均值 {{< imath >}}\hat{\mu}^t{{< /imath >}} 和方差 {{< imath >}}\hat{\sigma}^{t2}{{< /imath >}}，计算方式与公式 (1) 类似

- **对齐损失函数**：使用 KL 散度来衡量两个对角高斯分布 {{< imath >}}N(\mu^s, \sigma^{s2}){{< /imath >}} 和 {{< imath >}}N(\hat{\mu}^t, \hat{\sigma}^{t2}){{< /imath >}} 之间的差异，并最小化该差异。
{{< math >}}
 L_{TTA} (\phi) = \frac{1}{2} \sum_{d=1}^D \left\{ D_{KL} (N(\mu^s_d, \sigma^s_{d}{}^2)||N(\hat{\mu}^t_d, \hat{\sigma}^t_{d}{}^2)) + D_{KL} (N(\hat{\mu}^t_d, \hat{\sigma}^t_{d}{}^2)||N(\mu^s_d, \sigma^s_{d}{}^2)) \right\} \quad \text{(2)} 
{{< /math >}}
	这里的 {{< imath >}}d{{< /imath >}} 表示向量的第 {{< imath >}}d{{< /imath >}} 个元素。之所以使用双向的 KL 散度，是为了经验上获得更好的结果

- **一维高斯 KL 散度公式**：
{{< math >}}
 D_{KL} (N(\mu_1, \sigma_1^2)||N(\mu_2, \sigma_2^2)) = \dfrac{\left[ \log(\sigma_2^2/\sigma_1^2) + \dfrac{(\mu_1 - \mu_2)^2 + \sigma_1^2}{\sigma_2^2} - 1 \right]}{2} \quad \text{(3)} 
{{< /math >}}

- **朴素对齐的问题**：
	- 回归模型特征倾向于分布在一个小型的子空间中，许多特征维度方差为零或接近零
	- 公式 (3) 中涉及到方差在分母上，使得这种朴素对齐在面对零方差维度时变得不稳定
	- 对所有维度“一视同仁”地对齐不适用于回归任务的特性，因为许多维度对最终输出影响很小

## Significant-subspace Alignment

![](/images/ssa/pasted-image-20250706233003.png)

SSA 的三个步骤：

1. **子空间检测 (Subspace detection)**：
    - 在源数据集 {{< imath >}}S{{< /imath >}} 上进行训练后，检测源特征分布所在的子空间。不计算每个维度的方差，而是计算**协方差矩阵**：
        {{< math >}}
 \Sigma^s = \frac{1}{N_s} \sum_{i=1}^{N_s} (z_i^s - \mu^s) (z_i^s - \mu^s)^T \quad \text{(4)} 
{{< /math >}}
        其中 {{< imath >}}\mu^s{{< /imath >}} 是源特征的均值向量（同理 (1)）
    - 基于 PCA 的思想，通过对 {{< imath >}}\Sigma^s{{< /imath >}} 进行特征分解，得到特征向量 {{< imath >}}v_d^s{{< /imath >}} 和对应的特征值 {{< imath >}}\lambda_d^s{{< /imath >}} 
    - 选取**前 K 个最大的特征值** {{< imath >}}\lambda_1^s, \dots, \lambda_K^s{{< /imath >}} 及其对应的**源基向量** {{< imath >}}v_1^s, \dots, v_K^s{{< /imath >}} 来定义源子空间，这些基向量张成的子空间代表了源特征数据最有代表性和最重要的变化方向

2. **维度加权 (Dimension weighting)**：
    - 考虑到回归模型 {{< imath >}}h_\psi(z)=w^T z + b{{< /imath >}}，子空间维度 {{< imath >}}v_d^s{{< /imath >}} 对最终输出的影响由 {{< imath >}}w^T v_d^s{{< /imath >}} 决定（即特征向量与回归器权重向量的点积）
    - 为了优先对齐那些对输出影响更大的子空间维度，为每个子空间维度 {{< imath >}}d{{< /imath >}} 定义权重 {{< imath >}}a_d{{< /imath >}}：
        {{< math >}}
 a_d = 1 + |w^T v_d^s| \quad \text{(5)} 
{{< /math >}}
        这个权重 {{< imath >}}a_d{{< /imath >}} 会在对应的子空间基方向对输出有较大影响时值更大（最小为 1）。

3. **特征对齐 (Feature alignment)**：
    - 这一步在目标域进行。对于目标域的迷你批次 {{< imath >}}B{{< /imath >}}，首先将目标特征 {{< imath >}}z^t = g_\phi(x^t){{< /imath >}} **投影到源子空间**。
        {{< math >}}
 \tilde{z}^t = V_s^T (z^t - \mu^s) \quad \text{(6)} 
{{< /math >}}
        其中 {{< imath >}}V_s = [v_1^s, \dots, v_K^s] \in \mathbb{R}^{D \times K}{{< /imath >}} 是由前 K 个源基向量构成的矩阵，{{< imath >}}\tilde{z}^t \in \mathbb{R}^K{{< /imath >}} 是投影后的目标特征。
    - 然后，计算投影后目标特征的迷你批次均值 {{< imath >}}\tilde{\mu}^t{{< /imath >}} 和方差 {{< imath >}}\tilde{\sigma}^{t2}{{< /imath >}} （同理公式 (1) ）
    - 最后，使用结合子空间检测和维度加权的新损失函数来最小化目标特征分布与源特征分布在子空间中的差异。源域投影后的均值是 0，方差是其特征值 {{< imath >}}\Lambda^s = [\lambda_1^s, \dots, \lambda_K^s]{{< /imath >}}。
        {{< math >}}
 \begin{align}L_{TTA}(\phi) = & \frac{1}{2} \sum_{d=1}^K a_d \left\{ D_{KL} (N(0, \lambda^s_d)||N(\tilde{\mu}^t_d, \tilde{\sigma}^t_{d}{}^2)) + D_{KL} (N(\tilde{\mu}^t_d, \tilde{\sigma}^t_{d}{}^2)||N(0, \lambda^s_d)) \right\} \\ = & \sum_{d=1}^K a_d \left\{ \frac{(\tilde{\mu}^t_d)^2 + \lambda^s_d}{2\tilde{\sigma}^t_{d}{}^2} + \frac{(\tilde{\mu}^t_d)^2 + \tilde{\sigma}^t_{d}{}^2}{2\lambda^s_d} - 1 \right\} \quad \text{(7)} \end{align}
{{< /math >}}
        其中 {{< imath >}}a_d{{< /imath >}} 是维度权重，{{< imath >}}\lambda_d^s{{< /imath >}} 是源域子空间的第 {{< imath >}}d{{< /imath >}} 个特征值，{{< imath >}}\tilde{\mu}_d^t{{< /imath >}} 和 {{< imath >}}\tilde{\sigma}_{d}{}^2{{< /imath >}} 是投影后的目标特征在第 {{< imath >}}d{{< /imath >}} 个维度上的均值和方差

伪代码：
1. **输入**：预训练好的源模型 {{< imath >}}f_\theta{{< /imath >}}、源基向量 {{< imath >}}V_s{{< /imath >}}、源均值 {{< imath >}}\mu^s{{< /imath >}}、源方差 {{< imath >}}\Lambda^s{{< /imath >}}、目标数据集 {{< imath >}}T{{< /imath >}} 
2. **输出**：适应后的模型 {{< imath >}}f_\phi^t{{< /imath >}} 
3. **步骤**：
    - 计算源子空间中每个维度的权重 {{< imath >}}a_d{{< /imath >}} 
    - 对于目标数据集 {{< imath >}}T{{< /imath >}} 中的每个 mini batch {{< imath >}}\{x\}_i^B{{< /imath >}}：
        - 提取目标特征 {{< imath >}}z = g_\phi(x){{< /imath >}}。
        - 将目标特征投影到源子空间 {{< imath >}}\tilde{z}{{< /imath >}} 
        - 计算投影后目标特征的均值 {{< imath >}}\tilde{\mu}^t{{< /imath >}} 和方差 {{< imath >}}\tilde{\sigma}^{t2}{{< /imath >}} 
        - 更新特征提取器 {{< imath >}}g_\phi{{< /imath >}} 以最小化损失函数 {{< imath >}}L_{TTA}(\phi){{< /imath >}} 
    - 重复直到收敛。

### 对角高斯分布的合理性

为什么假设特征分布为对角高斯分布是合理的：
- **中心极限定理**：当特征被投影到子空间后，如果原始特征维度 {{< imath >}}D{{< /imath >}} 足够大，根据中心极限定理，投影后的特征分布会倾向于高斯分布。
- **PCA 的去相关性**：由于子空间检测使用了 PCA，投影到主成分上的特征是**去相关**的，这意味着不同维度之间是独立的，这使得对角高斯分布的假设（即各维度独立）变得合理。

## Appendix

- **A. LIMITATION**：SSA 假设是**协变量偏移**，即 {{< imath >}}p(y|x){{< /imath >}} 不变，未来工作将考虑 {{< imath >}}p(y|x){{< /imath >}} 变化的情况

- **B. EVALUATION METRIC**：R²接近 1 表示模型拟合效果好
    {{< math >}}
 R^2 = 1 - \frac{\sum_{i=1}^N (y_i - \hat{y}_i)^2}{\sum_{i=1}^N (y_i - \bar{y})^2} \quad \text{(10)} 
{{< /math >}}
    其中 {{< imath >}}\hat{y}_i{{< /imath >}} 是预测值，{{< imath >}}y_i{{< /imath >}} 是真实值，{{< imath >}}\bar{y}{{< /imath >}} 是真实值的平均值。

- **D. ADDITIONAL EXPERIMENTAL RESULTS**：
    - **D.1 特征对齐的度量**：比较了 KL 散度、2WD 和 L1 范数作为特征对齐损失的效果，结果显示 KL 散度结合子空间检测（SSA）表现最佳。
        - **公式 (11)：2-Wasserstein Distance for Gaussians**
            {{< math >}}
 W_2^2 (N(\mu_1, \sigma_1^2), N(\mu_2, \sigma_2^2)) = (\mu_1 - \mu_2)^2 + (\sigma_1 - \sigma_2)^2 
{{< /math >}}
        - **公式 (12)：L1 Norm of Statistics**
            {{< math >}}
 L_1 (N(\mu_1, \sigma_1^2), N(\mu_2, \sigma_2^2)) = |\mu_1 - \mu_2| + |\sigma_1 - \sigma_2| 
{{< /math >}}
        - **公式 (13)：SSA Loss with 2WD**
            {{< math >}}
 L_{TTA-2WD} = \sum_{d=1}^K a_d \left\{ (\tilde{\mu}^t_d)^2 + (\tilde{\sigma}^t_d - \sqrt{\lambda^s_d})^2 \right\} 
{{< /math >}}
        - **公式 (14)：SSA Loss with L1 Norm**
            {{< math >}}
 L_{TTA-L1} = \sum_{d=1}^K a_d \left\{ |\tilde{\mu}^t_d| + |\tilde{\sigma}^t_d - \sqrt{\lambda^s_d}| \right\} 
{{< /math >}}
    - **D.2 特征可视化**：通过 PCA 和 UMAP 等降维技术可视化了源域和目标域特征分布（图 4-5），直观地展示了 SSA 如何成功地将目标特征分布拉近源域。
    - **D.3 原始特征维度对子空间的影响**：分析了原始特征维度对子空间的重要性。
        - **公式 (15)：Gradient Norm {{< imath >}}s_d{{< /imath >}}**
            {{< math >}}
 s_d = ||\frac{\partial \tilde{z}}{\partial z_d}||_2 = ||(V_s^T)_d||_2 = ||[v_{1,d}^s, \dots, v_{K,d}^s]||_2, 
{{< /math >}}
            其中 {{< imath >}}(V_s^T)_d{{< /imath >}} 是 {{< imath >}}V_s^T{{< /imath >}} 的第 {{< imath >}}d{{< /imath >}} 行。
        - **发现**：回归模型的特征子空间确实受许多原始特征维度影响很小（图 6），这进一步确认了子空间检测的必要性。
    - **D.4 附加消融实验**：进一步证实了子空间检测对于 SSA 性能的重要性（表 13-14）。
    - **D.5 Vision Transformer 实验**：在 Vision Transformer 上验证了 SSA 的有效性（表 15-16），表明该方法对不同模型架构也适用。
    - **D.6 多任务回归模型**：将 SSA 应用于多任务回归，模型同时输出多个预测值（如头部姿态的俯仰、偏航、滚转角度），结果表明 SSA 同样有效（表 17）。
    - **D.7 与分类 TTA 结合**：探索了 SSA 与分类 TTA 结合的可能性（表 18-20）。
    - **D.8 超参数敏感性**：分析了学习率和批次大小等超参数对 SSA 性能的影响（表 21-26），发现 SSA 在典型参数范围内表现稳定。
    - **D.9 额外结果**：提供了 MAE 等其他指标的性能数据（表 27-28）。
    - **D.10 在线设置**：SSA 在分批在线（batched online）设置下也表现出色（表 29-31）。
