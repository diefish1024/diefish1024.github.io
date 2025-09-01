---
tags:
- CS
- tool
- optimizer
discipline:
- computer-science
publish: true
date: '2025-09-01T11:22:00+08:00'
title: COPT 求解器学习笔记
categories:
- concept
---
针对 CUMCM-2025 开始学习 COPT 求解器的使用，学习如何应用 COPT 的 Python API (`coptpy`) 来建模并求解数学建模中常见的离散优化问题。

## Basic API

本节将介绍 `COPT` 求解器 `Python API (coptpy)` 的核心组件和常用方法。

### Envr Class

`Envr` 类用于创建一个 `COPT` 环境。它是所有模型操作的起点。

**Creating Environment and Model:**

```python
import coptpy as cp
from coptpy import COPT

env = cp.Envr()  # 创建一个 COPT 环境实例
model = env.createModel(name='YourModelName')  # 在环境中创建一个模型
```

- `name`：模型的名称，此为可选参数。

### Model Class Properties and Methods

`Model` 类是 `COPT` 的核心，代表了优化模型，包含了所有变量、约束和目标函数。

#### Basic Properties

在模型求解后，可以通过以下属性获取其基本信息：

- `model.status`：**模型解的状态**。此属性指示模型是否找到了最优解、无可行解等。例如，`COPT.OPTIMAL` 表示已找到最优解。
- `model.objval`：**目标函数值**。此属性存储模型的最优目标函数值。

#### Adding Variables

可以通过 `addVar()` 和 `addVars()` 方法向模型中添加决策变量。

**Adding a Single Variable:**

使用 `model.addVar()` 方法向模型中添加一个单独的决策变量。

```python
x = model.addVar(lb=0.0, ub=cp.COPT.INFINITY, vtype=cp.COPT.CONTINUOUS, name='x_var')
```

- `lb`：变量的**下界**（默认为 {{< imath >}}0.0{{< /imath >}}）。
- `ub`：变量的**上界**（默认为 `COPT.INFINITY`，表示正无穷）。
- `vtype`：变量的**类型**，可以是：
    - `cp.COPT.CONTINUOUS` (连续变量)
    - `cp.COPT.INTEGER` (整数变量)
    - `cp.COPT.BINARY` (二进制变量，即 {{< imath >}}0{{< /imath >}} 或 {{< imath >}}1{{< /imath >}})
- `name`：变量的**名称**。

**Adding Multiple Variables:**

使用 `model.addVars()` 方法一次性添加一组变量。该方法返回一个 `tupledict` 对象，其键为变量的下标，值为相应的 `Var` 对象。

```python
model.addVars(*indices, lb=0.0, ub=cp.COPT.INFINITY, obj=0.0, vtype=cp.COPT.CONTINUOUS, nameprefix="")
```

- `*indices`：用于定义变量下标的参数。
- `lb`/`ub`/`vtype`：含义与 `addVar` 相同。
- `obj`：变量在目标函数中的系数，默认为 {{< imath >}}0.0{{< /imath >}}。
- `nameprefix`：变量名称的前缀。

**Form 1: Using Integer Parameters to Define Dimensions:**

这将创建一个具有给定维度和连续整数下标的变量组。

```python
# 添加一个 2x3 的整数变量 x，共计 6 个变量，下标从 (0,0) 到 (1,2)
x = model.addVars(2, 3, vtype=COPT.INTEGER, nameprefix='x')

print(x.select())
```

输出：
```
[<coptpy.Var: x(0,0)>, <coptpy.Var: x(0,1)>, <coptpy.Var: x(0,2)>, <coptpy.Var: x(1,0)>, <coptpy.Var: x(1,1)>, <coptpy.Var: x(1,2)>]
```

可以通过下标访问这些变量：

```python
for i in range(2):
    for j in range(3):
        print(x[i,j].name, end='  ')
```

输出：
```
x(0,0)  x(0,1)  x(0,2)  x(1,0)  x(1,1)  x(1,2)
```

可以看到 {{< imath >}}x{{< /imath >}} 实际上是一个 `tupledict` 对象，其键是变量下标（如 `(0,0)`），值是 `Var` 对象。

**Form 2: Using `tuplelist` for Non-contiguous Indices:**

当变量下标不是连续整数时，可以使用 `coptpy.tuplelist` 来明确指定需要创建的变量。

```python
t = cp.tuplelist([(0, 1), (1, 2)])
x = model.addVars(t, nameprefix="t")

print(x.select())
```

输出：
```
[<coptpy.Var: t(0,1)>, <coptpy.Var: t(1,2)>]
```

**Form 3: Using Multiple Lists for Cartesian Product:**

`*indices` 可以是多个列表，`addVars` 会自动生成这些列表的**笛卡尔积**作为变量的下标。

```python
t = ['a', 'b']
# 创建 x['a',0,0], x['a',0,1], ..., x['b',1,2] 等变量
x = model.addVars(t, range(2), range(3))

print(x.select())
```

输出：
```
[<coptpy.Var: C(a,0,0)>, <coptpy.Var: C(a,0,1)>, <coptpy.Var: C(a,0,2)>, <coptpy.Var: C(a,1,0)>, <coptpy.Var: C(a,1,1)>, <coptpy.Var: C(a,1,2)>, <coptpy.Var: C(b,0,0)>, <coptpy.Var: C(b,0,1)>, <coptpy.Var: C(b,0,2)>, <coptpy.Var: C(b,1,0)>, <coptpy.Var: C(b,1,1)>, <coptpy.Var: C(b,1,2)>]
```

从此示例可以看出，变量的下标也可以是字符串类型。

#### Adding Constraints

可以通过 `addConstr()` 和 `addConstrs()` 方法向模型中添加约束。

**Adding a Single Constraint:**

使用 `model.addConstr()` 添加一个约束。

```python
model.addConstr(lhs, sense=None, rhs=None, name="")
```

- `lhs`：约束的**左侧表达式**。对于线性约束，可以是 `Var` 对象、`LinExpr` 对象或 `ConstrBuilder` 对象。
- `sense`：约束的**类型**，可以是：
    - `cp.COPT.LESS_EQUAL` (`<=`)
    - `cp.COPT.EQUAL` (` == `)
    - `cp.COPT.GREATER_EQUAL` (`>=`)
- `rhs`：约束的**右侧值**。
- `name`：约束的**名称**。

例子：
```python
# 假设 x 和 y 都是模型中的变量
# 添加一个线性约束 x + y <= 10
model.addConstr(x + y <= 10, name="total_limit")
```

**Adding Multiple Constraints:**

使用 `model.addConstrs()` 方法添加一组类似的约束，通常通过生成器表达式来完成。

```python
# 假设 x 和 y 是通过 addVars 生成的变量组
# 添加 10 个线性约束，每个约束形如：x[i] + y[i] >= 2.0
model.addConstrs(x[i] + y[i] >= 2.0 for i in range(10), nameprefix="pairwise_sum")
```

- `nameprefix`：约束名称的前缀，COPT 会自动在其后添加下标。

**Adding Indicator Constraints:**

指示约束是一种特殊类型的约束，它在一个二值变量取特定值时激活一个线性约束。

```python
model.addGenConstrIndicator(binvar, binval, lhs, sense=None, rhs=None)
```

- `binvar`：作为指示器功能的**二进制变量**。
- `binval`：`binvar` 的**目标值**（`True` 或 `False` / {{< imath >}}1{{< /imath >}} 或 {{< imath >}}0{{< /imath >}}），当 `binvar` 取此值时，线性约束被激活。
- `lhs`/`sense`/`rhs`：定义被激活的**线性约束**（与 `addConstr` 类似）。

例子：
```python
# 假设 x 是一个二进制变量，y 和 z 是模型中的变量
# 添加一个 Indicator 约束：当 x 为 True (即 x=1) 时，线性约束 y + 2*z >= 3 成立
model.addGenConstrIndicator(x, True, y + 2*z >= 3, name="indicator_constr")
```

#### Setting the Objective Function

使用 `model.setObjective()` 方法定义模型的优化目标。

```python
model.setObjective(expr, sense=None)
```

- `expr`：**目标函数表达式**，通常是一个 `LinExpr` 对象。
- `sense`：目标的**优化方向**，可以是 `cp.COPT.MAXIMIZE` 或 `cp.COPT.MINIMIZE`。

例子：
```python
# 假设 profit 是一个线性表达式
model.setObjective(profit, COPT.MAXIMIZE)
```

#### Retrieving Model Information

以下方法用于获取模型求解后的各种信息。

**Getting All Variables:**

```python
vars = model.getVars()
```
- 返回一个 `VarArray` 对象，包含模型中的所有变量。

**Getting LP Analysis Results:**

```python
values, slacks, duals, redcosts = model.getLpSolution()
```

- 仅适用于线性规划 (LP) 模型。
- 返回一个四元组，其中每个元素都是一个列表：
    - `values`：变量的**取值**。
    - `slacks`：松弛变量的**取值**。
    - `duals`：约束的**对偶变量取值**。
    - `redcosts`：变量的 **Reduced Cost**。

**Getting Specific Model Information:**

```python
model.getInfo(infoname, args)
```

- `infoname`：待获取信息的名称（如 `COPT.Info.VarPrimal` 获取变量值，`COPT.Info.ConDual` 获取对偶值等）。
- `args`：指定要获取信息的变量或约束。
    - 若 `args` 为单个 `Var` 或 `Constraint` 对象，则返回其信息值常量。
    - 若 `args` 为列表、`VarArray` 或 `ConstrArray` 对象，则返回信息值组成的列表。
    - 若 `args` 为字典或 `tupledict` 对象，则返回键为指定变量/约束的下标，值为其信息值的 `tupledict` 对象。

#### Cloning a Model

```python
mcopy = model.clone()
```

- 创建模型的**深拷贝**，`mcopy` 是一个与原模型独立的新模型实例。

### Var Class

`Var` 类表示模型中的一个单独决策变量。

#### Attributes

在模型求解后，可以通过以下属性获取变量的相应信息。

- `var.x` 或 `var.Value`：**变量的当前取值**。
- `var.name`：**变量的名称**。
- `var.Slack`：**松弛变量的取值**（对于约束，此属性在变量层面通常不直接使用）。
- `var.Dual`：**对偶变量的取值**（与约束的对偶值相关，在变量层面通常不直接使用）。
- `var.LB`：变量的**下界**。
- `var.UB`：变量的**上界**。

#### Methods

- `varname = v.getName()`：获取变量 `v` 的名称。
- `v.setName('new_name')`：设置变量 `v` 的名称。
- `x.remove()`：从模型中**删除**变量 `x`。

### VarArray Class

`VarArray` 类是一个特殊的容器，用于存储一组 `Var` 对象。例如，`model.getVars()` 的返回值就是 `VarArray` 类型。

#### Methods

- `var = vararr.getVar(idx)`：根据变量在 `VarArray` 对象中的**下标**获取相应的变量，返回一个 `Var` 对象。
- `varall = vararr.getAll()`：获取 `VarArray` 对象中的**所有变量**，返回一个列表。
- `arrsize = vararr.getSize()`：获取 `vararr` 中变量的**个数**。

### Important Data Structures

`coptpy` 库提供了一些特殊的数据结构，以方便处理变量和约束的集合，特别是多维情况。

#### multidict

`multidict` 函数可以将输入字典拆分为多个平行字典。当有一个字典，其值是列表或元组，并且希望将每个子元素作为单独的字典时，它非常有用。

```python
import coptpy as cp

# 将输入的字典对象拆分为键与多个字典对象并返回
keys, dict1, dict2 = cp.multidict({
    "hello": [0, 1],
    "world": [2, 3]
})

print(f"keys: {keys}")
print(f"dict1: {dict1}")
print(f"dict2: {dict2}")
```

输出：
```
keys: ['hello', 'world']
dict1: {'hello': 0, 'world': 2}
dict2: {'hello': 1, 'world': 3}
```

`multidict` 返回一个元组，第一个元素是原始字典的所有键组成的列表，随后的元素是根据原始字典值中对应位置元素生成的字典。

#### tupledict

`tupledict` 是 `Python` 内置 `dict` 的子类，专为使用元组作为键的字典进行了优化。它继承了 `dict` 的所有方法，并额外提供了 `select`、`sum` 和 `prod` 等方便的集合操作。`model.addVars()` 的返回值就是一个 `tupledict`。

**Creating a `tupledict`:**

```python
d = cp.tupledict([((1,1),'a'), ((1,2),'b'),((2,1),'c'),((2,2),'d')])
print(d)
```

输出：
```
{(1, 1): 'a', (1, 2): 'b', (2, 1): 'c', (2, 2): 'd'}
```

可以使用下标访问 `tupledict` 中的元素，如同访问普通字典一样：

```python
for i in range(1, 3):
    for j in range(1, 3):
        print(d[i,j], end=' ')
```

输出：
```
a b c d
```

**`select` Method:**

`tupledict.select(pattern)` 方法根据指定的模式筛选出符合条件的项，返回包含所有符合条件的**值**的列表。`pattern` 中的 `*` 代表通配符。注意，`pattern` 匹配的是 `tupledict` 的**键**。

```python
d = cp.tupledict([((1,1),'a'), ((1,2),'b'),((2,1),'c'),((2,2),'d')])

print(d.select(2,'*'))  # 筛选第一个键为 2 的项
print(d.select(1,2))    # 筛选精确键为 (1,2) 的项
print(d.select())       # 筛选所有项
```

输出：
```
['c', 'd']
['b']
['a', 'b', 'c', 'd']
```

**`sum` Method:**

`expr = tupledict.sum(pattern)` 方法根据指定的模式筛选并累加项，返回一个 `LinExpr` 对象（如果 `tupledict` 中的值是数字）。这里的 `pattern` 用法与 `select` 方法完全相同。

```python
d = cp.tupledict([((1,1),1), ((1,2),2),((2,1),3),((2,2),4)])
print(d.sum('*', 2))  # 匹配第二个键为 2 的项，即 d[(1,2)] 和 d[(2,2)]，并求和
```

输出：
```
6.0
```

**`prod` Method:**

`expr = d.prod(coeff, pattern)` 方法根据指定的模式筛选，并与乘积系数累乘项，返回一个 `LinExpr` 对象。`coeff` 是一个字典或 `tupledict` 类型，其键需要与 `d` 的键对应。`pattern` 的含义与 `select` 相同。本质上，`prod` 方法执行的是点积操作。

```python
d = cp.tupledict([((1,1),1), ((1,2),2),((2,1),3),((2,2),4)])
coef = cp.tupledict([((1,1),2), ((1,2),2),((2,1),3),((2,2),3)])
# 匹配第二个键为 2 的项，即 d[(1,2)] 和 d[(2,2)]
# 计算 (d[(1,2)] * coeff[(1,2)]) + (d[(2,2)] * coeff[(2,2)])
# 即 (2 * 2) + (4 * 3) = 4 + 12 = 16
print(d.prod(coef, '*', 2))
```

输出：
```
16.0
```

#### tuplelist

`tuplelist` 是 `Python` 内置 `list` 的子类，专门用于存储元组列表。它继承了 `list` 的所有方法，并增强了 `select` 和 `add` 等功能。

**Creating a `tuplelist`:**

```python
tl1 = cp.tuplelist([(0, 1), (1, 2)])
tl2 = cp.tuplelist([('a', 'b'), ('b', 'c')])

print(tl1)
print(tl2)
```

输出：
```
[(0, 1), (1, 2)]
[('a', 'b'), ('b', 'c')]
```

可以直接用索引访问列表的成员。

**`add` Method:**

`tl.add((2, 3))` 方法用于向 `tuplelist` 中添加成员，功能类似于 `list.append()`。

```python
tl = cp.tuplelist([(0, 1), (1, 2)])
tl.add((2, 3))
print(tl)
```

输出：
```
[(0, 1), (1, 2), (2, 3)]
```

**`select` Method:**

`select` 方法的思想与 `tupledict` 中的 `select` 相同，根据指定的模式筛选符合条件的元组。

```python
tl = cp.tuplelist([(0, 1), (1, 2)])
print(tl.select(0,'*'))  # 筛选第一个元素为 0 的元组
```

输出：
```
[(0, 1)]
```

## Mixed-Integer Programming (MIP)

离散优化的核心工具是混合整数规划 (Mixed-Integer Programming, MIP)。一个标准的 MIP 模型包含三个核心要素：

1. **决策变量 (Decision Variables)**：模型中需要求解的未知数。在离散优化中，这些变量通常被约束为整数（例如，工人数、产品件数）或 0-1 二进制变量（例如，某个决策是否执行）。

2. **目标函数 (Objective Function)**：一个关于决策变量的线性表达式，我们需要将其最大化（如利润、效率）或最小化（如成本、距离）。

3. **约束条件 (Constraints)**：一系列关于决策变量的线性等式或不等式，用于定义问题的可行域。

我们的任务就是将一个具体问题用这三个要素清晰地表达出来，然后交给 COPT 进行求解。

### 0-1 Knapsack Problem

对于 0-1 背包问题，定义 {{< imath >}}N{{< /imath >}} 为物品总数，{{< imath >}}w_{i},v_{i}{{< /imath >}} 分别为物品 {{< imath >}}i{{< /imath >}} 的重量和价值，{{< imath >}}C{{< /imath >}} 为背包的容量。那么就可以列出这个问题的三个要素：

- **决策变量**：定义二进制串 {{< imath >}}x_{i}{{< /imath >}} 表示是否选取。 {{< math >}}
x_i \in \{0, 1\}, \quad \forall i \in \{1, ..., N\}
{{< /math >}}
- **目标函数**：最大化背包内物品的总价值。 {{< math >}}
\max \sum_{i=1}^{N} v_i x_i
{{< /math >}}
- **约束条件**：装入背包的物品总重量不能超过背包容量。 {{< math >}}
\text{s.t.} \quad \sum_{i=1}^{N} w_i x_i \leq C
{{< /math >}}
那么就可以得到 COPT 的求解代码：
```python
import coptpy as cp
from coptpy import COPT

# 1. 创建环境和模型
env = cp.Envr()
model = env.createModel("Knapsack")

# 2. 定义数据
weights = [4, 5, 2, 6, 3]   # 重量
values = [10, 12, 5, 15, 7] # 价值
capacity = 12               # 背包容量
n = len(weights)

# 3. 创建决策变量
# x[i] = 1 if item i is selected, 0 otherwise
x = model.addVars(n, vtype=COPT.BINARY, nameprefix="x")

# 4. 设置目标函数
model.setObjective(cp.quicksum(values[i] * x[i] for i in range(n)), COPT.MAXIMIZE)

# 5. 添加约束条件
model.addConstr(cp.quicksum(weights[i] * x[i] for i in range(n)) <= capacity)

# 6. 求解模型
model.solve()

# 7. 打印结果
if model.status == COPT.OPTIMAL:
    print("Optimal solution found.")
    print(f"Total value: {model.objval:.2f}")
    selected_items = [i for i in range(n) if x[i].x > 0.5]
    print(f"Selected items (indices): {selected_items}")
else:
    print("No optimal solution found.")
```

### Traveling Salesperson Problem (TSP)

旅行商问题。给定一系列城市和每对城市之间的距离，求解访问每一座城市一次并最终回到起始城市的最短可能路径。此问题的一个经典 MIP 模型是 Miller-Tucker-Zemlin (MTZ) 公式。

定义 {{< imath >}}N{{< /imath >}} 为城市总数量，{{< imath >}}d_{i,j}{{< /imath >}} 为城市 {{< imath >}}i{{< /imath >}} 到城市 {{< imath >}}j{{< /imath >}} 的距离，那么可以得到：

- **决策变量**：
	- 二进制变量 {{< imath >}}x_{i,j}{{< /imath >}} ，表示是否经过 {{< imath >}}i{{< /imath >}} 到 {{< imath >}}j{{< /imath >}} 之间路径。 {{< math >}}
x_{ij} \in \{0, 1\}, \quad \forall i, j \in \{0, ..., N-1\}, i \neq j
{{< /math >}}
	- 辅助连续变量 {{< imath >}}u_{i}{{< /imath >}} 用于消除子回路 {{< math >}}
u_i \ge 0, \quad \forall i \in \{0, ..., N-1\}
{{< /math >}}
- **目标函数**：最小化总路程。 {{< math >}}
\min \sum_{i=0}^{N-1} \sum_{j=0, j\neq i}^{N-1} d_{i,j} x_{i,j}
{{< /math >}}
- **约束条件**：
	- 每个城市必须且只能进入一次。 {{< math >}}
\sum_{i=0, i\neq j}^{N-1} x_{i,j} = 1, \quad \forall j \in \{0, ..., N-1\}
{{< /math >}}
	- 每个城市必须且只能离开一次。 {{< math >}}
\sum_{j=0, j\neq i}^{N-1} x_{ij} = 1, \quad \forall i \in \{0, ..., N-1\}
{{< /math >}}
	- 消除子回路约束。 {{< math >}}
u_i - u_j + N \cdot x_{ij} \le N-1, \quad \forall i, j \in \{1, ..., N-1\}, i \neq j
{{< /math >}}
那么就可以得到代码：
```python
import coptpy as cp
from coptpy import COPT
import random

# 1. 创建环境和模型
env = cp.Envr()
model = env.createModel("TSP")

# 2. 定义数据
n_cities = 10
# 生成随机城市坐标
coords = {i: (random.randint(0, 100), random.randint(0, 100)) for i in range(n_cities)}
# 计算距离矩阵
distances = {(i, j): ((coords[i][0] - coords[j][0])**2 + (coords[i][1] - coords[j][1])**2)**0.5 for i in range(n_cities) for j in range(n_cities) if i != j}

# 3. 创建决策变量
# x[i, j] = 1 if path from city i to j is taken, 0 otherwise
x = model.addVars(distances.keys(), vtype=COPT.BINARY, nameprefix="x")
# 辅助变量用于消除子回路
u = model.addVars(n_cities, vtype=COPT.CONTINUOUS, nameprefix="u")

# 4. 设置目标函数
model.setObjective(x.prod(distances), COPT.MINIMIZE)

# 5. 添加约束条件
# 每个城市必须离开一次
model.addConstrs((cp.quicksum(x[i, j] for j in range(n_cities) if i != j) == 1
                  for i in range(n_cities)), nameprefix="leave")

# 每个城市必须进入一次
model.addConstrs((cp.quicksum(x[i, j] for i in range(n_cities) if i != j) == 1
                  for j in range(n_cities)), nameprefix="enter")

# 消除子回路 (MTZ)
model.addConstrs((u[i] - u[j] + n_cities * x[i, j] <= n_cities - 1
                  for i in range(1, n_cities)
                  for j in range(1, n_cities) if i != j), nameprefix="subtour")

# 6. 求解模型
# 为复杂问题设置时间限制
model.setParam(COPT.Param.TimeLimit, 60)
model.solve()

# 7. 打印结果
if model.status == COPT.OPTIMAL:
    print(f"Optimal solution found with total distance: {model.objval:.2f}")
    path = []
    current_city = 0
    while len(path) < n_cities:
        path.append(current_city)
        for j in range(n_cities):
            if current_city != j and x[current_city, j].x > 0.5:
                current_city = j
                break
    print(f"Path: {path}")
```

其余问题方法均类似，在此不再赘述，总之解决问题的流程就是定义决策变量，构建目标函数，构建约束三步。

## Advanced Tips

在比赛中需要高效的建模和调试。

### Debugging Infeasible Models

当模型没有可行解时 (`model.status == COPT.INFEASIBLE`)，意味着约束条件之间存在冲突。找出问题所在非常困难。COPT 提供了**不可约不一致子系统 (Irreducible Inconsistent Subsystem, IIS)** 工具来定位问题。IIS 是原始模型约束的一个最小子集，其本身是不可行的。

**使用流程**：
1. 首先调用 `model.solve()` 并确认模型状态为不可行。
2. 调用 `model.computeIIS()` 来计算 IIS。
3. 遍历模型的约束，通过检查其 `IISConstr` 属性，找出属于 IIS 的约束。这些约束就是导致模型不可行的元凶。

```python
# (在模型求解后)
if model.status == COPT.INFEASIBLE:
    print("Model is infeasible. Computing IIS...")
    model.computeIIS()
    
    print("The following constraints are in the IIS:")
    for constr in model.getConstrs():
        if constr.IISConstr:
            print(f"- {constr.name}")
```

### Parameter Tuning for Performance

对于大规模或复杂的 MIP 问题，默认参数可能无法在有限时间内找到好的解。可以使用 COPT 的**参数调优工具 (Tuner)** 自动寻找最佳参数组合。

在 Python 中，可以通过 `model.tune()` 方法来启动调优器。它会尝试不同的参数设置，并在调优过程结束后，将最优参数应用到模型上。

```python
# 在调用 solve() 之前，可以先调用 tune()
print("Starting parameter tuning...")
model.tune()

# 调优后，可以直接求解模型
print("Tuning finished. Solving with best parameters...")
model.solve()
```

## References

- [Python接口 - 杉树求解器用户指南](https://guide.coap.online/copt/zh-doc/pythoninterface.html)
- [copt求解器的使用----常见api](https://zhuanlan.zhihu.com/p/567840043)（知乎）
