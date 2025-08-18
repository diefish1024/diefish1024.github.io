---
tags:
- literature-note
- TTA
title: Tent
publish: true
date: '2025-07-30T11:00:00+08:00'
categories:
- literature-note
---
# Setting

**Fully Test-Time Adaptation** 是一种独特的模型适应设定。在此设定下，模型 {{< imath >}}f_\theta(x){{< /imath >}} 在训练阶段已通过源数据 {{< imath >}}x^s{{< /imath >}} 和标签 {{< imath >}}y^s{{< /imath >}} 完成训练，获得参数 {{< imath >}}\theta{{< /imath >}}。但在测试阶段，模型将遇到与源数据分布不同的无标签目标数据 {{< imath >}}x^t{{< /imath >}}。

FTT-Adaptation 与以下方法不同：
- **Fine-tuning**：需要目标标签进行重新训练。
- **Domain Adaptation**：需要源数据和目标数据进行联合训练。
- **Test-Time Training (TTT)**：需要修改训练过程并共同优化有监督及自监督损失。

相比之下，FTT-Adaptation 仅能利用预训练模型 {{< imath >}}f_\theta{{< /imath >}} 和无标签目标数据 {{< imath >}}x^t{{< /imath >}} 进行适应，不依赖源数据或额外的监督信息。

## Method

论文的核心贡献是提出了 **Tent** 方法，其核心思想是通过**最小化测试熵**（**Test Entropy Minimization**）来适应模型预测，旨在使模型对测试数据的预测结果更“有信心”。

### Entropy Objective

Tent 的测试时目标函数是最小化模型预测 {{< imath >}}\hat{y} = f_\theta(x^t){{< /imath >}} 的**熵 {{< imath >}}H(\hat{y}){{< /imath >}}**。论文中使用的**香农熵**计算公式如下：

{{< math >}}

H(\hat{y}) = - \sum_c p(\hat{y}_c) \log p(\hat{y}_c)

{{< /math >}}

其中， {{< imath >}}p(\hat{y}_c){{< /imath >}} 表示模型预测目标数据 {{< imath >}}x^t{{< /imath >}} 属于类别 {{< imath >}}c{{< /imath >}} 的概率。
- 最小化熵促使模型输出更“尖锐”或更“确定”的预测分布。
- **优势**：熵是一种**无监督目标**，仅依赖于模型预测，不需要真实标签。最小化熵与减少预测误差和数据漂移之间存在内在联系，因为更确定的预测通常意味着更正确的预测。

### Modulation Parameters

**Tent** 不直接修改原始模型的全部参数 {{< imath >}}\theta{{< /imath >}}。相反，它仅更新模型内部归一化层（如**Batch Normalization layers**）中的线性且低维度的**仿射变换**参数：尺度参数 {{< imath >}}\gamma{{< /imath >}} 和偏移参数 {{< imath >}}\beta{{< /imath >}}。
- 这一选择的理由是：这些参数只占模型总参数的极小部分（<1%），优化效率高且稳定。
- **特征调制**过程包含两个步骤：
    1.**Normalization (标准化)**：根据当前批次测试数据的均值 {{< imath >}}\mu{{< /imath >}} 和标准差 {{< imath >}}\sigma{{< /imath >}} 来标准化特征 {{< imath >}}x{{< /imath >}}，即 {{< imath >}}\hat{x} = (x - \mu)/\sigma{{< /imath >}}。这里的 {{< imath >}}\mu, \sigma{{< /imath >}} 是在测试时从当前批次数据中估计的。
    2.**Transformation (仿射变换)**：对标准化后的特征 {{< imath >}}\hat{x}{{< /imath >}} 应用仿射变换，即 {{< imath >}}x' = \gamma \hat{x} + \beta{{< /imath >}}。参数 {{< imath >}}\gamma{{< /imath >}} 和 {{< imath >}}\beta{{< /imath >}} 通过最小化熵目标函数进行优化。

### Algorithm

**Tent** 算法的流程如下：
- **Initialization**：
    - 加载预训练好的源模型参数 {{< imath >}}\theta{{< /imath >}}。
    - 固定所有非仿射变换的参数。
    - 丢弃源数据中估计的归一化统计量。
    - 优化器收集所有归一化层的通道级仿射变换参数 {{< imath >}}\{\gamma_{l,k}, \beta_{l,k}\}{{< /imath >}}。
- **Iteration**：在线处理数据批次。
    - **Forward Pass**：对每个数据批次，逐层估计该批次数据的归一化统计量 ({{< imath >}}\mu, \sigma{{< /imath >}})。
    - **Backward Pass**：计算预测熵 {{< imath >}}H(\hat{y}){{< /imath >}} 相对于仿射变换参数 {{< imath >}}\gamma, \beta{{< /imath >}} 的梯度 {{< imath >}}\nabla H(\hat{y}){{< /imath >}}。
    - **Update**：使用梯度更新 {{< imath >}}\gamma, \beta{{< /imath >}} 参数。**Tent** 采用高效的在线更新策略，每次更新只影响下一个批次的数据处理。
- **Termination**：对于**在线适应**，适应过程只要有测试数据就持续进行。对于**离线适应**，模型会先进行更新，然后重复推断，适应可以持续多个**Epochs**。

## Experiments

论文在多种计算机视觉任务和数据集上对 **Tent** 进行了全面评估。

### Robustness To Corruptions

在图像分类的鲁棒性基准测试中，使用受损版本的 CIFAR-10/100-C 和 ImageNet-C 数据集（15 种损坏类型，不同严重程度）。
- **主要发现**：
    - **Tent** 在 ImageNet-C 上达到了 44.0% 的最低错误率，优于 SOTA 鲁棒性训练方法（如**Adversarial Noise Training (ANT)** 的 50.2%）和**Test-Time Normalization (BN)** 基线（49.9%）。
    - 在 CIFAR-10/100-C 上，**Tent** 也显著优于其他 TTA baseline（BN, **Pseudo-Labeling (PL)**）以及需要联合训练源域和目标域的**Domain Adaptation**（**RG, UDA-SS**）和**Test-Time Training (TTT)** 方法。
    - 这些改进仅通过一次**Epoch**的测试时优化实现，且未改变原始模型训练。

### Source-Free Domain Adaptation

评估 **Tent** 在**无源域适应**场景下的性能，包括数字识别（从 SVHN 到 MNIST/MNIST-M/USPS）和语义分割（从 GTA 到 Cityscapes）。
- **主要发现**：
    - 在数字识别任务中，**Tent** 大多数情况下错误率低于源模型和**BN**，部分情况甚至优于需要源数据的**Domain Adaptation**方法（**RG, UDA-SS**）。
    - 语义分割任务中，**Tent** 将**Intersection-Over-Union (IOU)** 分数从源模型的 28.8% 提高到 35.8%，显著优于 BN 的 31.4%。

### Analysis

论文通过多项分析实验探究了 **Tent** 的工作原理和特性：
- **Tent 降低熵和误差**：实验证实，**Tent** 成功降低了预测的熵值和任务损失（如**Softmax Cross-Entropy**），印证了熵最小化与误差减少之间的正相关性。
- **Tent 需要特征调制**：不更新归一化统计量或不优化仿射变换参数会显著降低 **Tent** 性能，说明这些**特征调制**步骤对于适应不可或缺。
- **Tent 泛化到不同的目标数据**：适应过程对未用于更新的其他测试数据点同样有效，表明其学习到的调制是通用的。
- **Tent 调制与归一化不同**：对比分析显示，**Tent** 的特征调制使特征更接近在目标标签上优化的**Oracle**模型（理想模型），而非仅像**Batch Normalization**那样接近原始参考分布。
- **Tent 适应其他网络架构**：**Tent** 在基于**Self-Attention** 和**Equilibrium Solving (MDEQ)** 的模型上也能有效降低误差，展现了其普适性。

## Related Work

论文回顾了与 **Tent** 相关的现有工作：
- **Train-Time Adaptation** 方法：传统的**Domain Adaptation**、**Test-Time Training (TTT)** 等，通常需要源数据或训练阶段修改模型。
- **Source-Free Adaptation** 方法：近期一些不依赖源数据的方法，但通常需要更复杂的设计、离线优化或修改训练过程。**Tent** 的优势在于其在线、高效且不改变训练过程。
- **Entropy Minimization**：熵最小化已被广泛用于**Semi-Supervised Learning**和**Domain Adaptation**的正则化项，但 **Tent** 首次将其作为**Fully Test-Time Adaptation**中唯一的**无监督损失**来驱动模型适应。
- **Feature Modulation**：归一化层和仿射变换已被用于各种任务的特征调制，但 **Tent** 将其作为在测试时通过无监督目标进行优化的核心机制。

## Discussion

**Tent** 通过**Test Entropy Minimization**实现了在**数据漂移**情况下的**泛化误差**降低。其核心在于模型的**自监督**自我改进，即依据自身的预测反馈进行调整。

- **优势总结**：
    - **高效**：仅通过在线优化少数参数（{{< imath >}}\gamma, \beta{{< /imath >}}）实现。
    - **实用**：无需源数据访问，不改变模型训练过程。
    - **通用**：适用于多种数据漂移类型和不同网络架构。

尽管 **Tent** 在广泛的场景中表现出色，但仍存在挑战，例如在特定困难的数据漂移（如 SVHN 到 MNIST-M/USPS）上仍有提升空间。未来研究方向可探索更全面的参数调整、更通用的**Test-Time Adaptation Loss**以及进一步提升效率的方法。总而言之，**Tent** 为**Fully Test-Time Adaptation** 提供了一个创新且实用的范式，使得模型能够在部署后，在面对未知且无标签的测试数据时，具备强大的自我适应能力。