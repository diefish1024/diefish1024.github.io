---
tags:
- literature-note
- TTA
title: Benchmarking TTA
publish: true
date: '2025-07-30T10:58:00+08:00'
categories:
- literature-note
---
### A General Paradigm of Test-Time Adaptation

根据测试数据接收方式和适应过程，TTA 分为三种主要范式：

- **Test-Time Batch Adaptation (TTBA) 测试时间批次适应：** 数据以小批次形式到达。模型会针对每个到来的小批次进行适应，并立即提供预测。
- **Online Test-Time Adaptation (OTTA) 在线测试时间适应：** 数据以序列化的方式（小批次）到达。模型进行增量更新，并且过去的适应经验会影响未来的预测。
- **Test-Time Domain Adaptation (TTDA) 测试时间域适应：** 整个目标域的数据（所有测试数据）可在预测前一次性用于适应。

### Datasets for Evaluation

论文使用了两种不同类型的分布偏移数据集进行评估：

- **Corruption Datasets 损坏数据集：** 原始数据集（CIFAR-10，ImageNet）经过**人为损坏处理**后得到的，通过添加不同类型的噪声、模糊等，模拟不同严重程度的分布偏移。
- **Natural-shift Datasets 自然偏移数据集：** 这些数据集代表数据分布中**自然发生的变化**，收集自不同的真实世界来源或条件（Office-Home，DomainNet，其中图像可能是不同风格的艺术作品、剪贴画、真实世界照片或草图）。

### Results on Natural Shift Datasets

- TTA 方法在自然偏移数据集上的表现与在损坏数据集上的表现有所不同。
- PredBN 在损坏数据集上有效，但在自然偏移数据集上表现不佳，有时甚至比源模型更差。这可能是因为自然偏移对数据分布的影响与人工损坏不同。
- **T3A** 在 OTTA 范式下的自然偏移数据集上表现优于其他 OTTA 算法。这归因于其特征生成方式及其分类器优化能力。
- 对于自然偏移数据集，**TTDA 算法** 持续取得了最高的性能。一些 OTTA 方法的多轮次也能达到可比的成果。


