---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-11-13T13:51:00+08:00'
title: MATH1205H HW15
categories:
- course-note
---
## Exercise 2

先证充分性。如果 {{< imath >}}G{{< /imath >}} 是一个二分图，设两部分的点集分别为 {{< imath >}}L,R{{< /imath >}}，所有边均满足两端点分别在 {{< imath >}}L,R{{< /imath >}} 中。反证法，加入存在奇环，设环中第一和最后一个点分别为 {{< imath >}}v_{1},v_{k}{{< /imath >}}，那么 {{< imath >}}k{{< /imath >}} 为奇数。不妨设 {{< imath >}}v_{1}\in L{{< /imath >}}，由于一条边必然在 {{< imath >}}L,R{{< /imath >}} 两部分之间 ，所以环中的点在 {{< imath >}}L,R{{< /imath >}} 交替出现，即 {{< imath >}}v_{2}\in R,v_{3}\in L,\dots{{< /imath >}}，由于 {{< imath >}}k{{< /imath >}} 是奇数，因此 {{< imath >}}v_{k}\in L{{< /imath >}}。这说明 {{< imath >}}v_{1},v_{k}{{< /imath >}} 两个 {{< imath >}}L{{< /imath >}} 中的点存在连边，与二分图矛盾。因此二分图中没有奇环。

再证必要性。如果 {{< imath >}}G{{< /imath >}} 没有奇环，我们可以将 {{< imath >}}G{{< /imath >}} 分成若干个连通块，每个连通块中任取一个点 {{< imath >}}u_{i}{{< /imath >}}，我们按照一下顺序将所有点分成 {{< imath >}}L,R{{< /imath >}} 两组：首先令 {{< imath >}}u_{i}\in L{{< /imath >}}，将所有与 {{< imath >}}u_{i}{{< /imath >}} 最短距离为偶数的点加入 {{< imath >}}L{{< /imath >}}，其余的点，也就是到 {{< imath >}}u_{i}{{< /imath >}} 最短距离为奇数的点加入 {{< imath >}}R{{< /imath >}}。

下面我们证明这是一个二分图，也就是证明所有 {{< imath >}}L{{< /imath >}} 中的点两两不连边，所有 {{< imath >}}R{{< /imath >}} 中的点也两两不练边。设 {{< imath >}}v_{1},v_{2}\in L{{< /imath >}}，如果这两个点不在一个连通块内，那么显然 {{< imath >}}v_{1},v_{2}{{< /imath >}} 之间没有边；如果两个点在一个连通块内，设这个连通块中之前选取的代表点 {{< imath >}}u{{< /imath >}}，我们知道 {{< imath >}}d(u,v_{1}),d(u,v_{2}){{< /imath >}} 均为偶数，如果边 {{< imath >}}\{ v_{1},v_{2} \}{{< /imath >}} 存在，那么我们就找到了一个长度为奇数的环 {{< imath >}}u\dots v_{1}v_{2}\dots u{{< /imath >}}，矛盾，因此此时 {{< imath >}}v_{1},v_{2}{{< /imath >}} 之间也没有边。对于 {{< imath >}}R{{< /imath >}} 中的两个点，同理，如果两个点在一个连通块，那么假设边存在，选取对应连通块的代表元素 {{< imath >}}u{{< /imath >}}，也找到了奇数环 {{< imath >}}u\dots v_{1}v_{2}\dots u{{< /imath >}}，矛盾。所以 {{< imath >}}L{{< /imath >}} 和 {{< imath >}}R{{< /imath >}} 中一个集合内的点两两都没有连边，这是一个二分图。证毕！

## Exercise 3

**(1)**

由于 {{< imath >}}G{{< /imath >}} 是 {{< imath >}}d{{< /imath >}}-正则图，所以最大的特征值 {{< imath >}}\lambda_{1}=d{{< /imath >}}。如果 {{< imath >}}G{{< /imath >}} 不连通，那么至少可以被划分为两个连通块 {{< imath >}}G_{1},G_{2}{{< /imath >}}。我们为每个连通块都定义一个特征向量，对于 {{< imath >}}G_{1}{{< /imath >}}，我们构造向量 {{< imath >}}v_{1}{{< /imath >}}，其中对应在 {{< imath >}}G_{1}{{< /imath >}} 中顶点的元素为 {{< imath >}}1{{< /imath >}}，其余为 {{< imath >}}0{{< /imath >}}。

此时当邻接矩阵乘以 {{< imath >}}v_{1}{{< /imath >}}，由于 {{< imath >}}G_{1}{{< /imath >}} 和其他连通块之间都没有边，因此对于 {{< imath >}}G_{1}{{< /imath >}} 中的每个点，结果都是 {{< imath >}}d{{< /imath >}}，其余的点都是 {{< imath >}}0{{< /imath >}}，所以就有
{{< math >}}

Av_{1} = dv_{1}

{{< /math >}}
对于 {{< imath >}}G_{2}{{< /imath >}}，同理也能构造出这样 {{< imath >}}v_{2}{{< /imath >}}。并且 {{< imath >}}v_{1},v_{2}{{< /imath >}} 显然是线性无关的，这样我们就找到了两个特征值 {{< imath >}}d{{< /imath >}} 对应的特征向量，说明 {{< imath >}}d{{< /imath >}} 的几何重数至少是 {{< imath >}}2{{< /imath >}}，从而代数重数也至少是 {{< imath >}}2{{< /imath >}}，所以必然有
{{< math >}}

\lambda_{1}=\lambda_{2}=d

{{< /math >}}
**(2)**

由于 {{< imath >}}d{{< /imath >}}-正则图的性质，我们知道 {{< imath >}}\left| \lambda \right|\leq d{{< /imath >}}，因此我们只需要证明 {{< imath >}}-d{{< /imath >}} 是一个特征值即可说明最小的特征值 {{< imath >}}\lambda_{n}=-d{{< /imath >}}。

对于二分图 {{< imath >}}G{{< /imath >}}，我们可以将点集 {{< imath >}}V{{< /imath >}} 分成不相交的 {{< imath >}}U,W{{< /imath >}} 两个集合，使得每条边的两个端点分别属于 {{< imath >}}U,W{{< /imath >}}。我们构造向量 {{< imath >}}v{{< /imath >}} 满足所有 {{< imath >}}U{{< /imath >}} 中的点对应的元素为 {{< imath >}}1{{< /imath >}}，所有 {{< imath >}}W{{< /imath >}} 中的点对应的元素为 {{< imath >}}-1{{< /imath >}}。根据二分图和正则图的性质，我们就知道
{{< math >}}

Av = -dv

{{< /math >}}
因为 {{< imath >}}U{{< /imath >}} 中的点对应行中只有 {{< imath >}}W{{< /imath >}} 中的点值为 {{< imath >}}1{{< /imath >}}，共有 {{< imath >}}d{{< /imath >}} 个，乘以 {{< imath >}}v{{< /imath >}} 以后就会得到 {{< imath >}}-d{{< /imath >}}。{{< imath >}}W{{< /imath >}} 中的点同理。

由于 {{< imath >}}v{{< /imath >}} 是一个非零向量，那么根据特征值的定义，我们就得到了 {{< imath >}}-d{{< /imath >}} 是一个特征值，从而
{{< math >}}

\lambda_{n}=-d

{{< /math >}}
## Exercise 6

由于每个顶点 {{< imath >}}v{{< /imath >}} 和所有通过路径可以和 {{< imath >}}v{{< /imath >}} 相连的顶点构成的集合是一个联通子图，因此 {{< imath >}}v{{< /imath >}} 至少属于一个连通分量。

假设 {{< imath >}}u{{< /imath >}} 同时属于两个不同的连通分量 {{< imath >}}C_{1},C_{2}{{< /imath >}}，那么对于 {{< imath >}}v_{1}\in C_{1},v_{2}\in C_{2}{{< /imath >}}，我们知道存在从 {{< imath >}}u{{< /imath >}} 到 {{< imath >}}v_{1}{{< /imath >}} 和 {{< imath >}}u{{< /imath >}} 到 {{< imath >}}v_{2}{{< /imath >}} 的路径，从而说明存在 {{< imath >}}v_{1}{{< /imath >}} 到 {{< imath >}}v_{2}{{< /imath >}} 的路径，从而与定义矛盾。

因此每个顶点唯一地属于一个连通分量。

接着证明如果 {{< imath >}}G{{< /imath >}} 不连通，当且仅当 {{< imath >}}G{{< /imath >}} 包含至少两个连通分量。首先如果 {{< imath >}}G{{< /imath >}} 不连通，那么存在 {{< imath >}}u,v{{< /imath >}} 满足 {{< imath >}}u,v{{< /imath >}} 之间不存在任何路径相连，如果 {{< imath >}}u,v{{< /imath >}} 属于一个连通分量，那么则与定义矛盾，所以 {{< imath >}}u,v{{< /imath >}} 一定分开属于两个连通分量，因此 {{< imath >}}G{{< /imath >}} 至少包含两个连通分量。如果 {{< imath >}}G{{< /imath >}} 至少包含两个连通分量，那么取两个属于不同连通分量的点 {{< imath >}}u,v{{< /imath >}}，我们可以知道 {{< imath >}}u,v{{< /imath >}} 之间不存在路径，因此 {{< imath >}}G{{< /imath >}} 不连通。

## Exercise 7

({{< imath >}}\Rightarrow{{< /imath >}}) 假设 {{< imath >}}G{{< /imath >}} 有一个连通分量 {{< imath >}}C{{< /imath >}} 是二部图。我们可以将 {{< imath >}}C{{< /imath >}} 的点集 {{< imath >}}V(C){{< /imath >}} 分成不相交的 {{< imath >}}U,W{{< /imath >}} 两个集合，使得 {{< imath >}}C{{< /imath >}} 中每条边的两个端点分别属于 {{< imath >}}U{{< /imath >}} 和 {{< imath >}}W{{< /imath >}}。我们构造向量 {{< imath >}}x{{< /imath >}} 满足所有 {{< imath >}}U{{< /imath >}} 中的点对应的元素为 {{< imath >}}1{{< /imath >}}，所有 {{< imath >}}W{{< /imath >}} 中的点对应的元素为 {{< imath >}}-1{{< /imath >}}，而所有不在 {{< imath >}}C{{< /imath >}} 中的点对应的元素为 {{< imath >}}0{{< /imath >}}。根据二部图和 {{< imath >}}d{{< /imath >}}-正则图的性质，对于任何 {{< imath >}}U{{< /imath >}} 中的点，其 {{< imath >}}d{{< /imath >}} 个邻居都在 {{< imath >}}W{{< /imath >}} 中，因此 {{< imath >}}A{{< /imath >}} 的对应行与 {{< imath >}}x{{< /imath >}} 相乘得到 {{< imath >}}d \times (-1) = -d{{< /imath >}}。同理，对于任何 {{< imath >}}W{{< /imath >}} 中的点，其 {{< imath >}}d{{< /imath >}} 个邻居都在 {{< imath >}}U{{< /imath >}} 中，相乘得到 {{< imath >}}d \times (1) = d = -d \times (-1){{< /imath >}}。对于不在 {{< imath >}}C{{< /imath >}} 中的点，其邻居也不在 {{< imath >}}C{{< /imath >}} 中，相乘结果为 {{< imath >}}0{{< /imath >}}。因此，我们就知道 {{< imath >}}Ax = -dx{{< /imath >}}。由于 {{< imath >}}x{{< /imath >}} 是一个非零向量，那么根据特征值的定义，{{< imath >}}-d{{< /imath >}} 是一个特征值。又因为对于 {{< imath >}}d{{< /imath >}}-正则图的所有特征值 {{< imath >}}\lambda{{< /imath >}} 均满足 {{< imath >}}|\lambda| \leq d{{< /imath >}}，我们从而得到最小特征值 {{< imath >}}\lambda_{n}=-d{{< /imath >}}。

({{< imath >}}\Leftarrow{{< /imath >}}) 假设 {{< imath >}}\lambda_{n}=-d{{< /imath >}}。令 {{< imath >}}x{{< /imath >}} 为其对应的非零特征向量，满足 {{< imath >}}Ax = -dx{{< /imath >}}。因为 {{< imath >}}x{{< /imath >}} 非零，所以必定存在一个连通分量 {{< imath >}}C{{< /imath >}} 使得 {{< imath >}}x{{< /imath >}} 在 {{< imath >}}C{{< /imath >}} 上的分量不全为零。在 {{< imath >}}C{{< /imath >}} 中取一个顶点 {{< imath >}}v{{< /imath >}} 使得其分量的绝对值 {{< imath >}}|x_v|{{< /imath >}} 最大，令 {{< imath >}}M = |x_v| > 0{{< /imath >}}。不失一般性，设 {{< imath >}}x_v=M{{< /imath >}}。根据特征值方程有 {{< imath >}}\sum_{u \sim v} x_u = -d x_v = -dM{{< /imath >}}。由三角不等式可得 {{< imath >}}dM = |-dM| = |\sum_{u \sim v} x_u| \le \sum_{u \sim v} |x_u|{{< /imath >}}。又因为 {{< imath >}}M{{< /imath >}} 是最大绝对值，我们有 {{< imath >}}\sum_{u \sim v} |x_u| \le \sum_{u \sim v} M = dM{{< /imath >}}。因此上述不等式必须取等，这意味着 {{< imath >}}v{{< /imath >}} 的所有邻居 {{< imath >}}u{{< /imath >}} 必须满足 {{< imath >}}|x_u|=M{{< /imath >}} 且符号与 {{< imath >}}x_v{{< /imath >}} 相反，即 {{< imath >}}x_u = -M{{< /imath >}}。此论证可以沿 {{< imath >}}C{{< /imath >}} 中的路径传递，说明 {{< imath >}}C{{< /imath >}} 中所有顶点的分量绝对值均为 {{< imath >}}M{{< /imath >}}。于是我们可以将 {{< imath >}}C{{< /imath >}} 的点集划分为 {{< imath >}}U=\{u \in V(C) \mid x_u=M\}{{< /imath >}} 和 {{< imath >}}W=\{w \in V(C) \mid x_w=-M\}{{< /imath >}}。根据构造， {{< imath >}}C{{< /imath >}} 中的任意一条边都连接着 {{< imath >}}U{{< /imath >}} 和 {{< imath >}}W{{< /imath >}} 中的顶点，因此连通分量 {{< imath >}}C{{< /imath >}} 是一个二部图。