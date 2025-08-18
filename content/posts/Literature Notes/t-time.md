---
tags:
- literature-note
- TTA
- EEG
title: T-TIME
publish: true
date: '2025-07-30T11:00:00+08:00'
categories:
- literature-note
---
# Method

### Problem Set

EEG 数据 {{< imath >}}\{ X_{s,l}^{i},y_{s,l}^{i} \}_{i=1}^{n_{s,l}}{{< /imath >}} ，进行无监督在线 K 分类

### Source Model Training

对源数据做 Euclidean alignment (EA) 数据对齐，减少不同个体 EEG 信号差异

EA 计算每个个体所有 EEG 试次协方差矩阵的算术平均值
{{< math >}}

R_{s,l} = \dfrac{1}{n}\sum_{i=1}^{n} X_{i}(X_{i})^{T} \implies \bar{X}_{i} = R_{s,l}^{-1/2}X_{i}

{{< /math >}}
之后再整合经过对齐的受试者数据，形成“源域”

在整合后的数据上独立训练 {{< imath >}}M{{< /imath >}} 个模型

### Incremental EA on Target Data

对新数据增量式更新协方差矩阵，再用新的矩阵更新所有测试数据

### Target Label Prediction

用训练好的 {{< imath >}}M{{< /imath >}} 模型初始化用于适应目标域的 {{< imath >}}M{{< /imath >}} 个 TTA 模型 {{< imath >}}f_{m}{{< /imath >}} 

新的 {{< imath >}}X_{a}{{< /imath >}} 经过 IEA 被变换为 {{< imath >}}X_{a}'{{< /imath >}} 后被输入到每个模型 {{< imath >}}f_{m}{{< /imath >}} 中进行分类，输出概率向量 {{< imath >}}f_{m}(X_{a}'){{< /imath >}} 

之后结合这 {{< imath >}}M{{< /imath >}} 个概率向量来获得最终的预测标签 {{< imath >}}\hat{y}_{a}{{< /imath >}} 
- {{< imath >}}a\leq M{{< /imath >}} 数据量较少：直接对所有模型的预测向量平均
- {{< imath >}}a>M{{< /imath >}} 数据量较多：使用谱元学习器对各个模型进行加权平均，根据历史表现（预测的协方差矩阵）分配不同的权重

### Target Model Update

在数据量足够以后（{{< imath >}}a>B{{< /imath >}}）使用一个滑动批次的数据更新模型，在此之前模型不变

组合损失函数：
{{< math >}}

L_{M} = L_{CEM}(f_{m};\{ X'_{i} \}_{i=a-B+1}^{a}) + L_{MDR}(f_{m};\{ X'_{i} \}_{i=a-B+1}^{a})

{{< /math >}}
有两个部分

**1) Conditional Entropy Minimization** 条件熵最小化
- 使分类边界更加清晰
- 通过最小化每个预测的条件熵（使用温度缩放因子 {{< imath >}}T{{< /imath >}} 进行校准），使模型倾向于输出接近 0 或 1 的概率

**2) Adaptive Marginal Distribution Regularization** 自适应边缘分布正则化
- 防止出现所有数据都在单类别和对错误结果过于自信的不良结果
- 计算当前批次每个类别的平均预测概率 {{< imath >}}p_{k}{{< /imath >}}
- 通过设置阈值得到伪标签，估计目标域的类别评论 {{< imath >}}z_{k}{{< /imath >}}
- 校准平均预测概率 {{< imath >}}q'_{k}{{< /imath >}}
{{< math >}}

q_{k} = \dfrac{p_{k}}{c+z_{k}},\quad q'_{k} = \dfrac{q_{k}}{\sum q}

{{< /math >}}
- {{< imath >}}L_{MDR} = \sum_{k=1}^{K}q'_{k}\log q'_{k}{{< /imath >}} （采用负熵的形式）

### Complete T-TIME Algorithm

![500](/images/t-time/pasted-image-20250630164657-png)

先预测，后台并行地更新模型

# Experiment

使用三个运动想象数据集

每次把一个受试者的数据作为目标域，其余作为源域

### Classification Accuracies on Balanced Classes

- 过于复杂的算法由于数据不足，性能反而下降
- 基于熵的方法普遍表现良好，MCC 在离线迁移学习中表现最好
- T-TIME 在所有**在线迁移学习算法中表现最佳**，并且其性能**与表现最佳的离线迁移学习方法相当**

### Classification Performance Under Class-Imbalance

使用随机移除数据来创建不平衡数据集

- 传统方法表现较弱
- T-TIME 表现突出

