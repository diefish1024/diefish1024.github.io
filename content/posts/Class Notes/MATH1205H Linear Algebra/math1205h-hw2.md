---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-09-29T22:39:00+08:00'
title: MATH1205H HW2
categories:
- course-note
---
## Exercise 1

> What rows or columns or matrices do you multiply to find
> 
> 1. the second column of {{< imath >}}AB{{< /imath >}} ?
> 2. the first row of {{< imath >}}AB{{< /imath >}} ?
> 3. the entry in row {{< imath >}}3{{< /imath >}}, column {{< imath >}}5{{< /imath >}} of {{< imath >}}AB{{< /imath >}} ?
> 4. the entry in row {{< imath >}}1{{< /imath >}}, column {{< imath >}}1{{< /imath >}} of {{< imath >}}CDE{{< /imath >}} ?

1. To find the second column of {{< imath >}}AB{{< /imath >}}, we multiply matrix {{< imath >}}A{{< /imath >}} by the second column of matrix {{< imath >}}B{{< /imath >}}.

2. Multiply the first row of {{< imath >}}A{{< /imath >}} by matrix {{< imath >}}B{{< /imath >}}.

3. Multiply the third row of {{< imath >}}A{{< /imath >}} and the fifth column of {{< imath >}}B{{< /imath >}}.

4. Multiply first the first row of {{< imath >}}C{{< /imath >}} by {{< imath >}}D{{< /imath >}}, then product the first column of {{< imath >}}E{{< /imath >}}.

## Exercise 2

> Show that {{< imath >}}(A + B)^2{{< /imath >}} is different from {{< imath >}}A^2 + 2AB + B^2{{< /imath >}}, when {{< imath >}}A=\begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}{{< /imath >}} and {{< imath >}}B=\begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix}{{< /imath >}}.
>
> Write down the correct rule for
> {{< imath >}}(A + B)(A + B) = A^2 + \_\_\_\_\_\_\_\_ + B^2{{< /imath >}}.

First, we find the sum of matrices {{< imath >}}A{{< /imath >}} and {{< imath >}}B{{< /imath >}} :
{{< math >}}

A+B = \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix} + \begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix} = \begin{pmatrix} 1+1 & 2+0 \\ 0+3 & 0+0 \end{pmatrix} = \begin{pmatrix} 2 & 2 \\ 3 & 0 \end{pmatrix}

{{< /math >}}
Next, we compute the square of {{< imath >}}(A+B){{< /imath >}} :
{{< math >}}

(A+B)^2 = \begin{pmatrix} 2 & 2 \\ 3 & 0 \end{pmatrix} \begin{pmatrix} 2 & 2 \\ 3 & 0 \end{pmatrix} = \begin{pmatrix} 10 & 4 \\ 6 & 6 \end{pmatrix}

{{< /math >}}
Then we need to compute {{< imath >}}A^2{{< /imath >}}, {{< imath >}}B^2{{< /imath >}}, and {{< imath >}}2AB{{< /imath >}} separately.

{{< math >}}

A^2 = \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}  =  \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}, B^2 = \begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix}

{{< /math >}}
{{< math >}}

AB = \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix} = \begin{pmatrix} 7 & 0 \\ 0 & 0 \end{pmatrix}

{{< /math >}}
Thus, we can calculate the result
{{< math >}}

A^2 + 2AB + B^2 = \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix} + \begin{pmatrix} 14 & 0 \\ 0 & 0 \end{pmatrix} + \begin{pmatrix} 1 & 0 \\ 3 & 0 \end{pmatrix} = \begin{pmatrix} 16 & 2 \\ 3 & 0 \end{pmatrix}

{{< /math >}}
We found: {{< imath >}}(A+B)^2 = \begin{pmatrix} 10 & 4 \\ 6 & 6 \end{pmatrix} ,A^2 + 2AB + B^2 = \begin{pmatrix} 16 & 2 \\ 3 & 0 \end{pmatrix}{{< /imath >}}.

Since {{< imath >}}\begin{pmatrix} 10 & 4 \\ 6 & 6 \end{pmatrix} \neq \begin{pmatrix} 16 & 2 \\ 3 & 0 \end{pmatrix}{{< /imath >}}, we have shown that {{< imath >}}(A + B)^2{{< /imath >}} is different from {{< imath >}}A^2 + 2AB + B^2{{< /imath >}} for the given matrices. This difference arises because matrix multiplication is generally not commutative ({{< imath >}}AB \neq BA{{< /imath >}}).

The correct rule for expanding {{< imath >}}(A+B)(A+B){{< /imath >}} for matrices {{< imath >}}A{{< /imath >}} and {{< imath >}}B{{< /imath >}} is:
{{< imath >}}(A + B)(A + B) = A^2 + \underline{AB+BA} + B^2{{< /imath >}}.

## Exercise 3

> If you do a row operation on {{< imath >}}A{{< /imath >}} and then a column operation, the result is the same as if you did the column operation first. Why is this true?

**Proof**:

Performing a row operation on a matrix {{< imath >}}A{{< /imath >}} is equivalent to multiplying {{< imath >}}A{{< /imath >}} on its **left** by a corresponding elementary matrix, let's call it {{< imath >}}E_R{{< /imath >}}. So, the operation results in {{< imath >}}E_R A{{< /imath >}}. Then, perform the column operation on the result {{< imath >}}E_R A{{< /imath >}}. This means multiplying {{< imath >}}E_R A{{< /imath >}} on the right by {{< imath >}}E_C{{< /imath >}}, giving the final result {{< imath >}}(E_R A) E_C{{< /imath >}}.

Performing a column operation on a matrix {{< imath >}}A{{< /imath >}} is equivalent to multiplying {{< imath >}}A{{< /imath >}} on its **right** by a corresponding elementary matrix, let's call it {{< imath >}}E_C{{< /imath >}}. So, the operation results in {{< imath >}}A E_C{{< /imath >}}. Then, perform the row operation on the result {{< imath >}}A E_C{{< /imath >}}. This means multiplying {{< imath >}}A E_C{{< /imath >}} on the left by {{< imath >}}E_R{{< /imath >}}, giving the final result {{< imath >}}E_R (A E_C){{< /imath >}}.

According to the associativity of matrix multiplication, we have {{< imath >}}(E_R A) E_C = E_R (A E_C){{< /imath >}}. Therefore, the final matrix result is the same regardless of the order in which the row and column operations are performed.

## Exercise 4

> Let {{< imath >}}A=\begin{pmatrix} 2 & 3 \\ 1 & 2 \\ 7 & 100 \end{pmatrix}{{< /imath >}}. Prove that there is no {{< imath >}}2 \times 3{{< /imath >}} matrix {{< imath >}}B{{< /imath >}} such that {{< imath >}}AB = I{{< /imath >}}.
>
> *(Please only use the materials we have learnt so far, in particular the geometric interpretation of {{< imath >}}Ab{{< /imath >}} is a linear combination of the column vectors of {{< imath >}}A{{< /imath >}}).*

**Proof:**

Firstly, if {{< imath >}}AB=I{{< /imath >}}, {{< imath >}}I{{< /imath >}} must be the {{< imath >}}3 \times 3{{< /imath >}} identity matrix ({{< imath >}}I_3{{< /imath >}}).

Considering the column space of matrix {{< imath >}}A{{< /imath >}}, which has two column vectors: {{< imath >}}A_1 = \begin{pmatrix} 2 \\ 1 \\ 7 \end{pmatrix}{{< /imath >}} and {{< imath >}}A_2 = \begin{pmatrix} 3 \\ 2 \\ 100 \end{pmatrix}{{< /imath >}}. These two vectors are linearly independent, so the column space {{< imath >}}Col(A){{< /imath >}} is a two-dimensional subspace of {{< imath >}}\mathbb{R}^3{{< /imath >}} (a plane through the origin).

If {{< imath >}}AB=I_3{{< /imath >}}, then each column of {{< imath >}}I_3{{< /imath >}} must be in the column space of {{< imath >}}A{{< /imath >}}. That is, for each standard basis vector {{< imath >}}e_j{{< /imath >}} (the columns of {{< imath >}}I_3{{< /imath >}}), there must exist a column vector {{< imath >}}b_j{{< /imath >}} from {{< imath >}}B{{< /imath >}} such that {{< imath >}}A b_j = e_j{{< /imath >}}. This means {{< imath >}}e_j{{< /imath >}} must be a linear combination of {{< imath >}}A{{< /imath >}}'s column vectors, and thus {{< imath >}}e_j \in Col(A){{< /imath >}}.

The columns of {{< imath >}}I_3{{< /imath >}} are {{< imath >}}e_1=\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}{{< /imath >}}, {{< imath >}}e_2=\begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}{{< /imath >}}, and {{< imath >}}e_3=\begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}{{< /imath >}}. These three vectors are linearly independent and span the entire {{< imath >}}\mathbb{R}^3{{< /imath >}}. However, {{< imath >}}Col(A){{< /imath >}} is only a two-dimensional subspace. A two-dimensional subspace cannot contain three linearly independent vectors that span a three-dimensional space.

Therefore, there is no {{< imath >}}2 \times 3{{< /imath >}} matrix {{< imath >}}B{{< /imath >}} such that {{< imath >}}AB=I{{< /imath >}}.

## Exercise 5

> Let {{< imath >}}m, n \ge 1{{< /imath >}} and {{< imath >}}A, B{{< /imath >}} two {{< imath >}}m \times n{{< /imath >}} matrices. Prove that if for all {{< imath >}}x \in \mathbb{R}^n{{< /imath >}} we have {{< imath >}}Ax = Bx{{< /imath >}}, then {{< imath >}}A = B{{< /imath >}}.

**Proof:**

We are given {{< imath >}}Ax = Bx{{< /imath >}} for all {{< imath >}}x \in \mathbb{R}^n{{< /imath >}}. This can be rewritten as {{< imath >}}(A-B)x = 0{{< /imath >}} for all {{< imath >}}x \in \mathbb{R}^n{{< /imath >}}. Let . Then the condition becomes for all .

Consider the standard basis vectors {{< imath >}}e_1, e_2, \ldots, e_n{{< /imath >}} in {{< imath >}}\mathbb{R}^n{{< /imath >}}. Since {{< imath >}}Cx=0{{< /imath >}} for all {{< imath >}}x{{< /imath >}}, it must hold for each {{< imath >}}e_j{{< /imath >}}. Therefore, implies that every column of is the zero vector.

If all columns of matrix {{< imath >}}C{{< /imath >}} are the zero vector, then {{< imath >}}C{{< /imath >}} must be the zero matrix. Since {{< imath >}}C=A-B{{< /imath >}}, we have {{< imath >}}A-B=0{{< /imath >}}, which implies {{< imath >}}A=B{{< /imath >}}.