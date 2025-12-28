---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-12-28T11:00:00+08:00'
title: MATH1205H HW26
categories:
- course-note
---
## Exercise 1

**(1)**

利用内积的双线性性质，对于任意 {{< imath >}}u \in V{{< /imath >}}，有 {{< imath >}}\langle u, 0 \rangle = \langle u, 0 + 0 \rangle = \langle u, 0 \rangle + \langle u, 0 \rangle{{< /imath >}}，即可得到 {{< imath >}}\langle u, 0 \rangle = 0{{< /imath >}}。

**(2)**

若对于所有 {{< imath >}}u \in V{{< /imath >}} 都有 {{< imath >}}\langle u, v \rangle = 0{{< /imath >}}，那么我们可以取特例 {{< imath >}}u = v{{< /imath >}}，此时有 {{< imath >}}\langle v, v \rangle = 0{{< /imath >}}。根据内积的正定性公理，{{< imath >}}\langle v, v \rangle = 0{{< /imath >}} 当且仅当 {{< imath >}}v = 0{{< /imath >}}。

**(3)**

若对于所有 {{< imath >}}w \in V{{< /imath >}} 都有 {{< imath >}}\langle u, w \rangle = \langle v, w \rangle{{< /imath >}}，则移项可得 {{< imath >}}\langle u, w \rangle - \langle v, w \rangle = 0{{< /imath >}}。利用线性性质合并，得 {{< imath >}}\langle u - v, w \rangle = 0{{< /imath >}} 对任意 {{< imath >}}w{{< /imath >}} 成立。根据上一小问 {{< imath >}}(2){{< /imath >}} 的结论，令新的向量为 {{< imath >}}u-v{{< /imath >}}，则必有 {{< imath >}}u - v = 0{{< /imath >}}，即 {{< imath >}}u = v{{< /imath >}}。

## Exercise 2

首先若 {{< imath >}}u{{< /imath >}} 和 {{< imath >}}v{{< /imath >}} 线性相关，则不妨设 {{< imath >}}u = kv{{< /imath >}}（若 {{< imath >}}v=0{{< /imath >}} 显然成立），代入计算左边 {{< imath >}}=\langle kv, v \rangle^2 = k^2\langle v, v \rangle^2{{< /imath >}}，右边 {{< imath >}}=\langle kv, kv \rangle \langle v, v \rangle = k^2\langle v, v \rangle^2{{< /imath >}}，等式成立。

反之，若等式成立且 {{< imath >}}v \neq 0{{< /imath >}}，构造向量 {{< imath >}}z = u - \frac{\langle u, v \rangle}{\langle v, v \rangle} v{{< /imath >}}，计算其模长平方 {{< imath >}}||z||^2 = \langle z, z \rangle{{< /imath >}}。展开化简可得 {{< imath >}}||z||^2 = \langle u, u \rangle - \frac{\langle u, v \rangle^2}{\langle v, v \rangle}{{< /imath >}}。若柯西不等式取等号，则分子 {{< imath >}}\langle u, u \rangle \langle v, v \rangle - \langle u, v \rangle^2 = 0{{< /imath >}}，即 {{< imath >}}||z||^2 = 0{{< /imath >}}。由正定性知 {{< imath >}}z=0{{< /imath >}}，故 {{< imath >}}u = \frac{\langle u, v \rangle}{\langle v, v \rangle} v{{< /imath >}}，即 {{< imath >}}u{{< /imath >}} 是 {{< imath >}}v{{< /imath >}} 的标量倍数，两者线性相关。

## Exercise 3

该形式是 {{< imath >}}\mathbb{R}^2{{< /imath >}} 上的内积。

**对称性**：{{< imath >}}\langle x, y \rangle = x_1 y_1 - x_2 y_1 - x_1 y_2 + 3 x_2 y_2{{< /imath >}} 与交换 {{< imath >}}x, y{{< /imath >}} 后的表达式完全一致，满足对称性。

**双线性**：表达式是关于 {{< imath >}}x_1, x_2{{< /imath >}} 和 {{< imath >}}y_1, y_2{{< /imath >}} 的线性组合，显然满足线性性质。

**正定性**：将内积写成矩阵形式 {{< imath >}}\langle x, y \rangle = x^T A y{{< /imath >}}，其中 {{< imath >}}A = \begin{pmatrix} 1 & -1 \\ -1 & 3 \end{pmatrix}{{< /imath >}}。计算 {{< imath >}}A{{< /imath >}} 的顺序主子式：{{< imath >}}D_1 = 1 > 0{{< /imath >}}，{{< imath >}}D_2 = 1 \times 3 - (-1) \times (-1) = 2 > 0{{< /imath >}}。可知 {{< imath >}}A{{< /imath >}} 是正定矩阵，故对任意 {{< imath >}}x \neq 0{{< /imath >}}，{{< imath >}}\langle x, x \rangle > 0{{< /imath >}}。因此，这是一个内积。

## Exercise 4

首先证明 {{< imath >}}C[0,1]{{< /imath >}} 是向量空间。这遵循连续函数的性质：两个连续函数的和仍是连续函数（加法封闭），连续函数与常数的乘积仍是连续函数（数乘封闭）。此外，零函数 {{< imath >}}f(x)=0{{< /imath >}} 是连续的（加法单位元），且每个函数 {{< imath >}}f{{< /imath >}} 都有加法逆元 {{< imath >}}-f{{< /imath >}}。结合加法和数乘的结合律、分配律等显然成立的性质，可知 {{< imath >}}C[0,1]{{< /imath >}} 构成实数域上的向量空间。

其次，证明 {{< imath >}}\langle f, g \rangle = \int_0^1 f(x)g(x)dx{{< /imath >}} 是内积。
- **对称性**：由乘法交换律，{{< imath >}}f(x)g(x) = g(x)f(x){{< /imath >}}，故积分相等。
- **线性**：积分运算本身具有线性性质，{{< imath >}}\int (af+h)g = a\int fg + \int hg{{< /imath >}}。
- **正定性**：{{< imath >}}\langle f, f \rangle = \int_0^1 (f(x))^2 dx \ge 0{{< /imath >}}。若积分为 {{< imath >}}0{{< /imath >}}，由于 {{< imath >}}(f(x))^2 \ge 0{{< /imath >}} 且 {{< imath >}}f{{< /imath >}} 连续，则 {{< imath >}}f(x){{< /imath >}} 必须恒等于 {{< imath >}}0{{< /imath >}}。

再次，证明 {{< imath >}}f_1, f_2, f_3{{< /imath >}} 线性无关。设 {{< imath >}}c_1(1) + c_2(x-1) + c_3(x-1)^2 = 0{{< /imath >}} 对所有 {{< imath >}}x \in [0,1]{{< /imath >}} 成立。取 {{< imath >}}x=1{{< /imath >}}，得 {{< imath >}}c_1 = 0{{< /imath >}}。对等式求导得 {{< imath >}}c_2 + 2c_3(x-1) = 0{{< /imath >}}，再取 {{< imath >}}x=1{{< /imath >}} 得 {{< imath >}}c_2 = 0{{< /imath >}}。再次求导得 {{< imath >}}2c_3 = 0 \implies c_3 = 0{{< /imath >}}。因为只有零解，所以三者线性无关。

最后，使用 GS 正交化寻找标准正交基。令 {{< imath >}}w_1=1, w_2=x-1, w_3=(x-1)^2{{< /imath >}}。
1. {{< imath >}}v_1 = w_1 = 1{{< /imath >}}。归一化：{{< imath >}}||v_1||^2 = \int_0^1 1^2 dx = 1{{< /imath >}}，故 {{< imath >}}e_1 = 1{{< /imath >}}。
2. {{< imath >}}\langle w_2, e_1 \rangle = \int_0^1 (x-1) dx = -1/2{{< /imath >}}。令 {{< imath >}}v_2 = w_2 - \langle w_2, e_1 \rangle e_1 = (x-1) - (-1/2) = x - 0.5{{< /imath >}}。计算范数 {{< imath >}}||v_2||^2 = \int_0^1 (x-0.5)^2 dx = [\frac{1}{3}(x-0.5)^3]_0^1 = \frac{1}{12}{{< /imath >}}。归一化得 {{< imath >}}e_2 = \sqrt{12}(x - 0.5){{< /imath >}}。
3. {{< imath >}}v_3 = w_3 - \langle w_3, e_1 \rangle e_1 - \langle w_3, e_2 \rangle e_2{{< /imath >}}。计算内积 {{< imath >}}\langle w_3, e_1 \rangle = \int_0^1 (x-1)^2 dx = 1/3{{< /imath >}}；{{< imath >}}\langle w_3, e_2 \rangle = \sqrt{12} \int_0^1 (x-1)^2(x-0.5) dx = -1/\sqrt{12}{{< /imath >}}。代入得到 {{< imath >}}v_3 = (x-1)^2 - \frac{1}{3} - (-\frac{1}{\sqrt{12}})\sqrt{12}(x-0.5)  = x^2 - x + \frac{1}{6}{{< /imath >}}。计算范数 {{< imath >}}||v_3||^2 = \int_0^1 (x^2-x+\frac{1}{6})^2 dx = \frac{1}{180}{{< /imath >}}。归一化得 {{< imath >}}e_3 = \sqrt{180}(x^2 - x + \frac{1}{6}){{< /imath >}}。

最终的标准正交基为 {{< imath >}}\{1, \sqrt{12}(x-\frac{1}{2}), \sqrt{180}(x^2-x+\frac{1}{6})\}{{< /imath >}}。
