---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-10-14T08:09:00+08:00'
title: MATH1205H HW6
categories:
- course-note
---
## Exercise 1

> Let {{< imath >}}A{{< /imath >}} be an {{< imath >}}n \times n{{< /imath >}} matrix. Prove the equivalence between:
> 
> (i) There is a {{< imath >}}B{{< /imath >}} with {{< imath >}}AB = I{{< /imath >}}.
> 
> (ii) There is a {{< imath >}}C{{< /imath >}} with {{< imath >}}CA = I{{< /imath >}}.

**Proof**:

We show both conditions are equivalent to {{< imath >}}\operatorname{rank}(A) = n{{< /imath >}}.

If there exists {{< imath >}}B{{< /imath >}} with {{< imath >}}AB = I{{< /imath >}}, then {{< imath >}}A{{< /imath >}} is surjective, so {{< imath >}}\operatorname{rank}(A) = n{{< /imath >}}.

If there exists {{< imath >}}C{{< /imath >}} with {{< imath >}}CA = I{{< /imath >}}, then {{< imath >}}A{{< /imath >}} is injective, so {{< imath >}}\operatorname{rank}(A) = n{{< /imath >}}.

Conversely, if {{< imath >}}\operatorname{rank}(A) = n{{< /imath >}}, then {{< imath >}}A{{< /imath >}} is invertible (as {{< imath >}}A{{< /imath >}} is square), so both {{< imath >}}AB = I{{< /imath >}} and {{< imath >}}CA = I{{< /imath >}} hold with {{< imath >}}B = C = A^{-1}{{< /imath >}}.

## Exercise 2

> Give an {{< imath >}}m \times n{{< /imath >}} matrix {{< imath >}}A{{< /imath >}} such that:
> 
> - There is a {{< imath >}}B{{< /imath >}} with {{< imath >}}AB = I{{< /imath >}}.
> 
> - There is no {{< imath >}}C{{< /imath >}} with {{< imath >}}CA = I{{< /imath >}}.

**Solution**:

We need {{< imath >}}m > n{{< /imath >}} and {{< imath >}}\operatorname{rank}(A) = n{{< /imath >}}.

Consider {{< imath >}}A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}{{< /imath >}}, a {{< imath >}}3 \times 2{{< /imath >}} matrix with {{< imath >}}\operatorname{rank}(A) = 2{{< /imath >}}.

Since {{< imath >}}\operatorname{rank}(A) = 2 = n{{< /imath >}}, the columns are linearly independent, so {{< imath >}}A{{< /imath >}} has a right inverse {{< imath >}}B = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}{{< /imath >}} with {{< imath >}}AB = I_2{{< /imath >}}.

However, {{< imath >}}\operatorname{rank}(A) = 2 < 3 = m{{< /imath >}}, so {{< imath >}}A{{< /imath >}} is not surjective, hence has no left inverse. If {{< imath >}}CA = I_3{{< /imath >}} existed, then {{< imath >}}\operatorname{rank}(I_3) = 3 \leq \operatorname{rank}(A) = 2{{< /imath >}}, a contradiction.

## Exercise 3

> Find all solutions of the following systems of linear equations, where {{< imath >}}x_1, x_2, x_3, x_4{{< /imath >}} are variables and {{< imath >}}\lambda{{< /imath >}} is a parameter.
> 
> (1) {{< math >}}
\begin{cases} 2x_1 - x_2 + x_3 + x_4 = 1, \\ x_1 + 2x_2 - x_3 + 4x_4 = 2, \\ x_1 + 7x_2 - 4x_3 + 11x_4 = \lambda. \end{cases}
{{< /math >}}
> 
> (2) {{< math >}}
\begin{cases} \lambda x_1 + x_2 + x_3 + x_4 = 1, \\ x_1 + \lambda x_2 + x_3 + x_4 = \lambda, \\ x_1 + x_2 + \lambda x_3 + x_4 = \lambda^2, \\ x_1 + x_2 + x_3 + \lambda x_4 = \lambda^3. \end{cases}
{{< /math >}}

**Solution**:

**(1)** Form the augmented matrix and perform row reduction:
{{< math >}}

\left( \begin{array}{cccc|c}
2 & -1 & 1 & 1 & 1 \\
1 & 2 & -1 & 4 & 2 \\
1 & 7 & -4 & 11 & \lambda
\end{array} \right)

{{< /math >}}
After Gaussian elimination, we obtain:
{{< math >}}

\left( \begin{array}{cccc|c}
1 & 0 & 1 & 6 & 4 \\
0 & 1 & -1 & -1 & -1 \\
0 & 0 & 0 & 0 & \lambda-5
\end{array} \right)

{{< /math >}}
- If {{< imath >}}\lambda \neq 5{{< /imath >}}: no solution.
- If {{< imath >}}\lambda = 5{{< /imath >}}: infinitely many solutions with two free variables.

Setting {{< imath >}}x_3 = s, x_4 = t{{< /imath >}}, we get: {{< math >}}
x_1 = 4-s-6t, \quad x_2 = -1+s+t, \quad x_3 = s, \quad x_4 = t.
{{< /math >}}

**(2)** Form the augmented matrix with parameter {{< imath >}}\lambda{{< /imath >}}:

{{< math >}}
\left( \begin{array}{cccc|c} \lambda & 1 & 1 & 1 & 1 \\ 1 & \lambda & 1 & 1 & \lambda \\ 1 & 1 & \lambda & 1 & \lambda^2 \\ 1 & 1 & 1 & \lambda & \lambda^3 \end{array} \right)
{{< /math >}}

**Case 1: {{< imath >}}\lambda = 1{{< /imath >}}**

The system becomes {{< imath >}}x_1 + x_2 + x_3 + x_4 = 1{{< /imath >}} (all four equations are identical). Setting {{< imath >}}x_2 = s, x_3 = t, x_4 = u{{< /imath >}} as free variables: {{< math >}}
x_1 = 1 - s - t - u, \quad x_2 = s, \quad x_3 = t, \quad x_4 = u.
{{< /math >}}

**Case 2: {{< imath >}}\lambda = -3{{< /imath >}}**

Performing row operations leads to an inconsistent system. Specifically, after reduction we obtain a row of the form {{< imath >}}(0, 0, 0, 0 \mid c){{< /imath >}} with {{< imath >}}c \neq 0{{< /imath >}}. No solution exists.

**Case 3: {{< imath >}}\lambda \notin {-3, 1}{{< /imath >}}**

Subtracting appropriate multiples of rows, we can reduce the system. Notice that if all {{< imath >}}x_i{{< /imath >}} are equal, say {{< imath >}}x_i = c{{< /imath >}}, then:

- First equation: {{< imath >}}(\lambda + 3)c = 1{{< /imath >}}
- Second equation: {{< imath >}}(\lambda + 3)c = \lambda{{< /imath >}}
- Third equation: {{< imath >}}(\lambda + 3)c = \lambda^2{{< /imath >}}
- Fourth equation: {{< imath >}}(\lambda + 3)c = \lambda^3{{< /imath >}}

For consistency, we need {{< imath >}}1 = \lambda = \lambda^2 = \lambda^3{{< /imath >}}, which is impossible for {{< imath >}}\lambda \neq 1{{< /imath >}}. However, the right-hand sides satisfy {{< imath >}}1 + \lambda + \lambda^2 + \lambda^3 = b{{< /imath >}}.

After complete row reduction, we find that the system has rank 4 (full rank) when {{< imath >}}\lambda \neq -3, 1{{< /imath >}}, giving a unique solution: {{< math >}}
x_1 = x_2 = x_3 = x_4 = \frac{1 + \lambda + \lambda^2 + \lambda^3}{\lambda + 3} = c.
{{< /math >}}
This can be verified by substitution into the original equations.

## Exercise 4

> Use Gaussian elimination to calculate an upper triangular system {{< imath >}}Ux = c{{< /imath >}} for the linear system {{< imath >}}Ax = b{{< /imath >}}. Write down the elementary matrix in each step and point out the failures you meet.
> 
> (i) {{< imath >}}A = \begin{pmatrix} 0 & 1 & 2 \\ 3 & 4 & 5 \\ 6 & 7 & 8 \end{pmatrix}{{< /imath >}} and {{< imath >}}b = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}{{< /imath >}}.
> 
> (ii) {{< imath >}}A = \begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix}{{< /imath >}} and {{< imath >}}b = 0{{< /imath >}}.
> 
> (iii) {{< imath >}}A = \begin{pmatrix} 0 & 1 & 2 \\ 7 & 8 & 3 \\ 6 & 5 & 4 \end{pmatrix}{{< /imath >}} and {{< imath >}}b = 0{{< /imath >}}.

**Solution**:

**(i)** {{< imath >}}A = \begin{pmatrix} 0 & 1 & 2 \\ 3 & 4 & 5 \\ 6 & 7 & 8 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}{{< /imath >}}

**Failure**: The first pivot position is zero, so we need a row swap.

**Step 1**: Swap rows 1 and 2. {{< math >}}
P_{12} = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}\begin{pmatrix} 3 & 4 & 5 \\ 0 & 1 & 2 \\ 6 & 7 & 8 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}{{< /imath >}}

**Step 2**: Eliminate position (3,1) using {{< imath >}}E_{31}{{< /imath >}}. {{< math >}}
E_{31} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}\begin{pmatrix} 3 & 4 & 5 \\ 0 & 1 & 2 \\ 0 & -1 & -2 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}{{< /imath >}}

**Step 3**: Eliminate position (3,2) using {{< imath >}}E_{32}{{< /imath >}}. {{< math >}}
E_{32} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}U = \begin{pmatrix} 3 & 4 & 5 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}{{< /imath >}}, {{< imath >}}c = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}{{< /imath >}}

**Failure**: The system is inconsistent since the last row gives {{< imath >}}0 = -1{{< /imath >}}.

**(ii)** {{< imath >}}A = \begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = 0{{< /imath >}}

**Step 1**: Eliminate position (2,1) using {{< imath >}}E_{21}{{< /imath >}}. {{< math >}}
E_{21} = \begin{pmatrix} 1 & 0 & 0 \\ -2 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}\begin{pmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 3 & 6 & 9 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = 0{{< /imath >}}

**Step 2**: Eliminate position (3,1) using {{< imath >}}E_{31}{{< /imath >}}. {{< math >}}
E_{31} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ -3 & 0 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}\begin{pmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & -6 & -12 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = 0{{< /imath >}}

**Step 3**: Eliminate position (3,2) using {{< imath >}}E_{32}{{< /imath >}}. {{< math >}}
E_{32} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & -2 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}U = \begin{pmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & 0 & 0 \end{pmatrix}{{< /imath >}}, {{< imath >}}c = 0{{< /imath >}}

**Failure**: The third row is zero, indicating the matrix is singular. The system has infinitely many solutions (with one free variable).

**(iii)** {{< imath >}}A = \begin{pmatrix} 0 & 1 & 2 \\ 7 & 8 & 3 \\ 6 & 5 & 4 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = 0{{< /imath >}}

**Failure**: The first pivot position is zero, requiring a row swap.

**Step 1**: Swap rows 1 and 2. {{< math >}}
P_{12} = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}\begin{pmatrix} 7 & 8 & 3 \\ 0 & 1 & 2 \\ 6 & 5 & 4 \end{pmatrix}{{< /imath >}}, {{< imath >}}b = 0{{< /imath >}}

**Step 2**: Eliminate position (3,1) using {{< imath >}}E_{31}{{< /imath >}}. {{< math >}}
E_{31} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ -\frac{6}{7} & 0 & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}\begin{pmatrix} 7 & 8 & 3 \\ 0 & 1 & 2 \\ 0 & -\frac{13}{7} & \frac{10}{7} \end{pmatrix}{{< /imath >}}, {{< imath >}}b = 0{{< /imath >}}

**Step 3**: Eliminate position (3,2) using {{< imath >}}E_{32}{{< /imath >}}. {{< math >}}
E_{32} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & \frac{13}{7} & 1 \end{pmatrix}
{{< /math >}}

After applying: {{< imath >}}U = \begin{pmatrix} 7 & 8 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & \frac{36}{7} \end{pmatrix}{{< /imath >}}, {{< imath >}}c = 0{{< /imath >}}

The system has a unique solution (the trivial solution {{< imath >}}x = 0{{< /imath >}}).

## Exercise 5

> Use Gauss-Jordan to calculate the inverse of the following matrices.
> 
> (i) {{< imath >}}\begin{pmatrix} 16 & 15 & 14 & 13 \\ 5 & 4 & 3 & 12 \\ 6 & 1 & 2 & 11 \\ 7 & 8 & 9 & 10 \end{pmatrix}{{< /imath >}}.
> 
> (ii) {{< imath >}}\begin{pmatrix} 1 & 1 & 10 & 1 \\ 1 & 10 & 1 & 1 \\ 1 & 1 & 1 & 10 \\ 10 & 1 & 1 & 1 \end{pmatrix}{{< /imath >}}.
> 
> (iii) {{< imath >}}aa^T - I_n{{< /imath >}} with {{< imath >}}a = \begin{pmatrix} 1 \\ \vdots \\ 1 \end{pmatrix} \in \mathbb{R}^n{{< /imath >}}.

**Solution**:

**(i)** For {{< imath >}}A = \begin{pmatrix} 16 & 15 & 14 & 13 \\ 5 & 4 & 3 & 12 \\ 6 & 1 & 2 & 11 \\ 7 & 8 & 9 & 10 \end{pmatrix}{{< /imath >}}:

Form the augmented matrix {{< imath >}}[A | I_4]{{< /imath >}} and apply row operations to reduce {{< imath >}}A{{< /imath >}} to {{< imath >}}I_4{{< /imath >}}.

After Gauss-Jordan elimination, we obtain:

{{< math >}}
A^{-1} = \begin{pmatrix} \frac{83}{690} & - \frac{2}{15} & \frac{1}{6} & - \frac{62}{345} \\ \frac{34}{345} & \frac{11}{30} & - \frac{1}{3} & - \frac{139}{690} \\ - \frac{17}{138} & - \frac{1}{3} & \frac{1}{6} & \frac{26}{69} \\ - \frac{6}{115} & \frac{1}{10} & 0 & \frac{11}{230} \end{pmatrix}
{{< /math >}}

**(ii)** For {{< imath >}}A = \begin{pmatrix} 1 & 1 & 10 & 1 \\ 1 & 10 & 1 & 1 \\ 1 & 1 & 1 & 10 \\ 10 & 1 & 1 & 1 \end{pmatrix}{{< /imath >}}:

Form {{< imath >}}[A | I_4]{{< /imath >}} and reduce. After row operations:

{{< math >}}
A^{-1} = \frac{1}{117} \begin{pmatrix} -1 & -1 & -1 & 12 \\ -1 & 12 & -1 & -1 \\ 12 & -1 & -1 & -1 \\ -1 & -1 & 12 & -1 \end{pmatrix}
{{< /math >}}

**(iii)** For {{< imath >}}M = aa^T - I_n{{< /imath >}} where {{< imath >}}a = \begin{pmatrix} 1 \\ \vdots \\ 1 \end{pmatrix} \in \mathbb{R}^n{{< /imath >}}:

Form the augmented matrix {{< imath >}}[M | I_n]{{< /imath >}} and apply row operations to reduce {{< imath >}}M{{< /imath >}} to {{< imath >}}I_n{{< /imath >}}.

After Gauss-Jordan elimination, we obtain:
{{< math >}}
M^{-1} = \frac{1}{n-1} aa^T - I_n
{{< /math >}}
Explicitly, {{< imath >}}M^{-1}{{< /imath >}} has diagonal entries {{< imath >}}\frac{1}{n-1}-1{{< /imath >}} and off-diagonal entries {{< imath >}}\frac{1}{n-1}{{< /imath >}}.