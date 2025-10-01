---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-09-30T16:12:00+08:00'
title: LA HW3
categories:
- course-note
---
## Exercise 1

> (Multiplication of block matrices). Consider two block matrices
> {{< math >}}

 A = \begin{pmatrix}
 A_{11} & \cdots & A_{1t} \\
 \vdots & \ddots & \vdots \\
 A_{p1} & \cdots & A_{pt}
 \end{pmatrix}
 \quad \text{and} \quad
 B = \begin{pmatrix}
 B_{11} & \cdots & B_{1q} \\
 \vdots & \ddots & \vdots \\
 B_{t1} & \cdots & B_{tq}
 \end{pmatrix}
 
{{< /math >}}
> Moreover, for every {{< imath >}}i \in [p]{{< /imath >}}, {{< imath >}}j \in [t]{{< /imath >}}, and {{< imath >}}l \in [q]{{< /imath >}} the number of columns of {{< imath >}}A_{ij}{{< /imath >}} is equal to the number of rows of {{< imath >}}B_{jl}{{< /imath >}}. In particular, {{< imath >}}A_{ij} \cdot B_{jl}{{< /imath >}} is defined. Prove that
> {{< math >}}

 A \cdot B = \begin{pmatrix}
 C_{11} & \cdots & C_{1q} \\
 \vdots & \ddots & \vdots \\
 C_{p1} & \cdots & C_{pq}
 \end{pmatrix}
 
{{< /math >}}
> with
> {{< math >}}

 C_{il} = \sum_{j \in [t]} A_{ij} B_{jl}
 
{{< /math >}}
> for any {{< imath >}}i \in [p]{{< /imath >}} and {{< imath >}}l \in [q]{{< /imath >}}.

**Proof**:

Let {{< imath >}}A = (a_{\alpha\beta}){{< /imath >}} and {{< imath >}}B = (b_{\beta\gamma}){{< /imath >}}. The entry {{< imath >}}(AB)_{\alpha\gamma}{{< /imath >}} is given by {{< imath >}}(AB)_{\alpha\gamma} = \sum_{\beta} a_{\alpha\beta} b_{\beta\gamma}{{< /imath >}}.

Consider a specific entry {{< imath >}}(C_{il})_{uv}{{< /imath >}} within the block {{< imath >}}C_{il}{{< /imath >}} of the product matrix {{< imath >}}AB{{< /imath >}}. This entry corresponds to a global row index {{< imath >}}\alpha{{< /imath >}} in {{< imath >}}A{{< /imath >}}'s {{< imath >}}i{{< /imath >}}-th block row (specifically, the {{< imath >}}u{{< /imath >}}-th row within that block row) and a global column index {{< imath >}}\gamma{{< /imath >}} in {{< imath >}}B{{< /imath >}}'s {{< imath >}}l{{< /imath >}}-th block column (specifically, the {{< imath >}}v{{< /imath >}}-th column within that block column).

The summation over {{< imath >}}\beta{{< /imath >}} can be partitioned according to the column blocks of {{< imath >}}A{{< /imath >}} and the row blocks of {{< imath >}}B{{< /imath >}} that correspond to the intermediate index {{< imath >}}j{{< /imath >}}. Specifically, the range of {{< imath >}}\beta{{< /imath >}} for which {{< imath >}}a_{\alpha\beta}{{< /imath >}} belongs to {{< imath >}}A_{ij}{{< /imath >}} and {{< imath >}}b_{\beta\gamma}{{< /imath >}} belongs to {{< imath >}}B_{jl}{{< /imath >}} forms a segment. Summing these segments yields:
{{< math >}}

(C_{il})_{uv} = \sum_{\beta} a_{\alpha\beta} b_{\beta\gamma} = \sum_{j=1}^{t} \left( \sum_{\substack{\beta_j \in \text{columns of } A_{ij} \\ \text{and rows of } B_{jl}}} (A_{ij})_{u\beta_j} (B_{jl})_{\beta_j v} \right)

{{< /math >}}
The inner sum {{< imath >}}\sum_{\beta_j} (A_{ij})_{u\beta_j} (B_{jl})_{\beta_j v}{{< /imath >}} precisely represents the {{< imath >}}(u,v){{< /imath >}}-th entry of the product matrix {{< imath >}}A_{ij} B_{jl}{{< /imath >}}.

Therefore, we can write:
{{< math >}}

(C_{il})_{uv} = \sum_{j=1}^{t} (A_{ij} B_{jl})_{uv}

{{< /math >}}
Since this equality holds for every entry {{< imath >}}(u,v){{< /imath >}} in the block {{< imath >}}C_{il}{{< /imath >}}, it follows that the block matrix equation is true:
{{< math >}}

C_{il} = \sum_{j \in [t]} A_{ij} B_{jl}

{{< /math >}}

## Exercise 2

> Let {{< imath >}}P{{< /imath >}} be a permutation matrix and consider its column vectors {{< imath >}}p_1, \ldots, p_n{{< /imath >}}.
> (i) Prove that each pair of distinct (i.e., {{< imath >}}i \neq j{{< /imath >}}) {{< imath >}}p_i{{< /imath >}} and {{< imath >}}p_j{{< /imath >}} are perpendicular.
> (ii) Prove each {{< imath >}}p_i{{< /imath >}} is a unit vector.
> (iii) Using (i) and (ii) prove that {{< imath >}}P^{-1} = P^T{{< /imath >}}.

**(i)**

For distinct columns {{< imath >}}p_i{{< /imath >}} and {{< imath >}}p_j{{< /imath >}} (where {{< imath >}}i \neq j{{< /imath >}}), each vector has a single '1' at different positions. 

When computing their dot product {{< imath >}}p_i^T p_j = \sum_k (p_i)_k (p_j)_k{{< /imath >}}, for any given {{< imath >}}k{{< /imath >}}, at least one of {{< imath >}}(p_i)_k{{< /imath >}} or {{< imath >}}(p_j)_k{{< /imath >}} must be '0' because their '1's are in different rows. Thus, {{< imath >}}(p_i)_k (p_j)_k = 0{{< /imath >}} for all {{< imath >}}k{{< /imath >}}, which implies {{< imath >}}p_i^T p_j = 0{{< /imath >}}. Therefore, {{< imath >}}p_{i}{{< /imath >}} and {{< imath >}}p_j{{< /imath >}} are perpendicular for {{< imath >}}i \neq j{{< /imath >}}.

**(ii)**

A column vector {{< imath >}}p_i{{< /imath >}} has exactly one '1' and all other entries are '0', its norm is {{< imath >}}p_i^T p_i = \sum_k (p_i)_k^2 = 1{{< /imath >}}. Therefore, {{< imath >}}\|p_i\| = 1{{< /imath >}}, proving {{< imath >}}p_i{{< /imath >}} is a unit vector.

**(iii)**

Consider the entry {{< imath >}}(P^T P)_{ij}{{< /imath >}} of the product {{< imath >}}P^T P{{< /imath >}}. This entry is the dot product of the {{< imath >}}i{{< /imath >}}-th column of {{< imath >}}P{{< /imath >}} with its {{< imath >}}j{{< /imath >}}-th column: {{< imath >}}(P^T P)_{ij} = p_i^T p_j{{< /imath >}}.
- From part (i), if {{< imath >}}i \neq j{{< /imath >}}, then {{< imath >}}p_i^T p_j = 0{{< /imath >}}.
- From part (ii), if {{< imath >}}i = j{{< /imath >}}, then {{< imath >}}p_i^T p_i = 1{{< /imath >}}.

Thus {{< imath >}}P^T P = I{{< /imath >}}, therefore, {{< imath >}}P^{-1} = P^T{{< /imath >}}.

## Exercise 3

> Let {{< imath >}}A = [a_1, \ldots, a_n]{{< /imath >}} be an {{< imath >}}n \times n{{< /imath >}} matrix such that {{< imath >}}A^{-1} = A^T{{< /imath >}}. Prove:
> (i) Each pair of distinct column vectors {{< imath >}}a_i{{< /imath >}} and {{< imath >}}a_j{{< /imath >}} are perpendicular.
> (ii) Each {{< imath >}}a_i{{< /imath >}} is a unit vector.
> Prove that the same is true for the row vectors of {{< imath >}}A{{< /imath >}}.

**(i) & (ii) Proof for Column Vectors**

Given {{< imath >}}A^{-1} = A^T{{< /imath >}}, it follows that {{< imath >}}A^T A = I{{< /imath >}}.

The entry {{< imath >}}(A^T A)_{kl}{{< /imath >}} is the dot product of the {{< imath >}}k{{< /imath >}}-th column of {{< imath >}}A{{< /imath >}} ({{< imath >}}a_k{{< /imath >}}) and the {{< imath >}}l{{< /imath >}}-th column of {{< imath >}}A{{< /imath >}} ({{< imath >}}a_l{{< /imath >}}), i.e., {{< imath >}}(A^T A)_{kl} = a_k^T a_l{{< /imath >}}.

Since {{< imath >}}A^T A = I{{< /imath >}}, we have:
- For {{< imath >}}k \neq l{{< /imath >}}: {{< imath >}}a_k^T a_l = 0{{< /imath >}}. This proves that distinct column vectors {{< imath >}}a_k{{< /imath >}} and {{< imath >}}a_l{{< /imath >}} are perpendicular.
- For {{< imath >}}k = l{{< /imath >}}: {{< imath >}}a_k^T a_k = 1{{< /imath >}}. This proves that {{< imath >}}\|a_k\|^2 = 1{{< /imath >}}, so each column vector {{< imath >}}a_k{{< /imath >}} is a unit vector.

**Proof for Row Vectors**

Let {{< imath >}}A{{< /imath >}} have row vectors {{< imath >}}r_1, \ldots, r_n{{< /imath >}}. From {{< imath >}}A^{-1} = A^T{{< /imath >}}, it also follows that {{< imath >}}A A^T = I{{< /imath >}}.

The entry {{< imath >}}(A A^T)_{kl}{{< /imath >}} is the dot product of the {{< imath >}}k{{< /imath >}}-th row of {{< imath >}}A{{< /imath >}} ({{< imath >}}r_k{{< /imath >}}) and the {{< imath >}}l{{< /imath >}}-th row of {{< imath >}}A{{< /imath >}} ({{< imath >}}r_l{{< /imath >}}), i.e., {{< imath >}}(A A^T)_{kl} = r_k r_l^T{{< /imath >}}.

Since {{< imath >}}A A^T = I{{< /imath >}}, we have:
- For {{< imath >}}k \neq l{{< /imath >}}: {{< imath >}}r_k r_l^T = 0{{< /imath >}}. This proves that distinct row vectors {{< imath >}}r_k{{< /imath >}} and {{< imath >}}r_l{{< /imath >}} are perpendicular.
- For {{< imath >}}k = l{{< /imath >}}: {{< imath >}}r_k r_k^T = 1{{< /imath >}}. This proves that {{< imath >}}\|r_k\|^2 = 1{{< /imath >}}, so each row vector {{< imath >}}r_k{{< /imath >}} is a unit vector.

## Exercise 4

> Let {{< imath >}}A{{< /imath >}} be a square matrix such that there are {{< imath >}}B{{< /imath >}} and {{< imath >}}C{{< /imath >}} with {{< imath >}}BA = AC = I{{< /imath >}}. Note we didn't assume per se {{< imath >}}B = C{{< /imath >}}. However, prove that {{< imath >}}B = C{{< /imath >}}. In particular {{< imath >}}A{{< /imath >}} is invertible with {{< imath >}}A^{-1} = B = C{{< /imath >}}.

**Proof**:
{{< math >}}

\begin{align*}
 BA & = I \\
 (BA)C & = IC = C \\
B(AC)& = C \\
BI = B & = C
\end{align*}

{{< /math >}}
Thus, {{< imath >}}B{{< /imath >}} and {{< imath >}}C{{< /imath >}} must be equal. This proves that if both a left inverse and a right inverse exist for a square matrix {{< imath >}}A{{< /imath >}}, they are unique and identical, defining the inverse {{< imath >}}A^{-1} = B = C{{< /imath >}}.

## Exercise 5

> This is intended to repeat what we have learnt in the class. Prove in a vector space:
> (i) {{< imath >}}0v = 0{{< /imath >}}.
> (ii) {{< imath >}}(-1)v = -v{{< /imath >}}.
> (iii) {{< imath >}}-(v + w) = (-v) + (-w){{< /imath >}}.
> (iv) {{< imath >}}c0 = 0{{< /imath >}}.
> (v) {{< imath >}}c(-v) = (-c)v = -(cv){{< /imath >}}.

**(i)**
{{< math >}}

0v = (0+0)v = 2\cdot0v \implies 0v = 0

{{< /math >}}
**(ii)**
{{< math >}}

v + (-1)v = (1 + (-1))v = 0v  =0 \implies (-1)v = -v

{{< /math >}}
**(iii)**
{{< math >}}

(v+w) + ((-v) + (-w)) = (v + (-v)) + (w + (-w)) = 0 \implies (-v+w) = (-v) + (-w)

{{< /math >}}
**(iv)**
{{< math >}}

c\cdot \vec{0} = c\cdot(\vec{0} + \vec{0}) = 2(c \cdot \vec{0}) \implies c\cdot \vec{0} = 0

{{< /math >}}
**(v)**
{{< math >}}

c(-v) = c((-1)v) = (c \cdot (-1))v = (-c)v

{{< /math >}}
{{< math >}}

cv + (-c)v = (c + (-c))v = 0v = 0 \implies (-c)v = -(cv)

{{< /math >}}

Combining these, we have {{< imath >}}c(-v) = (-c)v = -(cv){{< /imath >}}.