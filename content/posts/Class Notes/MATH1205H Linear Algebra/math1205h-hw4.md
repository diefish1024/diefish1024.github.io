---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-10-07T19:53:00+08:00'
title: MATH1205H HW4
categories:
- course-note
---
## Exercise 1

> Give a basis for the vector space {{< imath >}}M_{m\times n}(\mathbb{R}){{< /imath >}} consisting of all {{< imath >}}m \times n{{< /imath >}} matrices.

A basis consists of the matrices {{< imath >}}E_{ij}{{< /imath >}} for {{< imath >}}1 \leq i \leq m{{< /imath >}} and {{< imath >}}1 \leq j \leq n{{< /imath >}}, where {{< imath >}}E_{ij}{{< /imath >}} has a 1 in the {{< imath >}}(i,j){{< /imath >}}-th position and 0 elsewhere.

## Exercise 2

> Give a basis for {{< imath >}}V = \mathbb{R}^+ = \{x \mid x \in \mathbb{R} \text{ with } x > 0\}{{< /imath >}} with {{< imath >}}x \oplus x' = x \times x'{{< /imath >}} and {{< imath >}}c \otimes x = x^c{{< /imath >}}.

This is a one-dimensional vector space. A basis is {{< imath >}}\{e\}{{< /imath >}}, where {{< imath >}}e{{< /imath >}} is the base of the natural logarithm, since any {{< imath >}}x > 0{{< /imath >}} can be written as {{< imath >}}(\ln x) \otimes e = e^{\ln x} = x{{< /imath >}}, and the "zero" element is 1.

## Exercise 3

> Is there a vector space {{< imath >}}V{{< /imath >}} such that
>
> (i) {{< imath >}}|V| > 1{{< /imath >}}, i.e., {{< imath >}}V \neq \{0\}{{< /imath >}}, and
>
> (ii) {{< imath >}}|V|{{< /imath >}} is finite, i.e., it contains only finitely many vectors?

No such vector space exists over {{< imath >}}\mathbb{R}{{< /imath >}}. If {{< imath >}}V{{< /imath >}} contains a nonzero vector {{< imath >}}v{{< /imath >}}, then the scalars multiples {{< imath >}}\{c v \mid c \in \mathbb{R}\}{{< /imath >}} form an infinite set, contradicting the finiteness.

## Exercise 4

> Find the largest possible number of linearly independent vectors among
>
> {{< imath >}}v_1 = \begin{pmatrix} 1 \\ -1 \\ 0 \\ 0 \end{pmatrix}, \quad v_2 = \begin{pmatrix} 1 \\ 0 \\ -1 \\ 0 \end{pmatrix}, \quad v_3 = \begin{pmatrix} 1 \\ 0 \\ 0 \\ -1 \end{pmatrix}, \quad v_4 = \begin{pmatrix} 0 \\ 1 \\ -1 \\ 0 \end{pmatrix}, \quad v_5 = \begin{pmatrix} 0 \\ 1 \\ 0 \\ -1 \end{pmatrix}, \quad v_6 = \begin{pmatrix} 0 \\ 0 \\ 1 \\ -1 \end{pmatrix}.{{< /imath >}}

These vectors lie in the three-dimensional subspace of {{< imath >}}\mathbb{R}^4{{< /imath >}} where the sum of components is zero. Thus, the largest number of linearly independent vectors is 3.

## Exercise 5

> Find the null space {{< imath >}}N(A){{< /imath >}} and column space {{< imath >}}C(A){{< /imath >}} for the following matrices and give a basis for {{< imath >}}N(A){{< /imath >}} and {{< imath >}}C(A){{< /imath >}} respectively.
>
> (i) {{< imath >}}A = \begin{pmatrix} 2 & 3 \\ 4 & 5 \\ 1 & 0 \\ 1 & 0 \\ 1 & 0 \end{pmatrix}{{< /imath >}}
>
> (ii) {{< imath >}}A = \begin{pmatrix} 1 & 0 & 2 & 3 \\ 2 & 2 & 4 & 5 \\ 1 & 2 & 4 & 3 \\ 5 & 6 & 16 & 15 \\ 4 & 4 & 10 & 11 \end{pmatrix}{{< /imath >}}

**(i)**

The null space {{< imath >}}N(A) = \{0\}{{< /imath >}}, so it has no basis (empty set).

The column space {{< imath >}}C(A){{< /imath >}} is the span of the columns of {{< imath >}}A{{< /imath >}}, and a basis is {{< imath >}}\left\{ \begin{pmatrix} 2 \\ 4 \\ 1 \\ 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 3 \\ 5 \\ 0 \\ 0 \\ 0 \end{pmatrix} \right\}{{< /imath >}}.

**(ii)**

The null space {{< imath >}}N(A){{< /imath >}} has dimension 1, and a basis is {{< imath >}}\left\{ \begin{pmatrix} -4 \\ 1 \\ -1 \\ 2 \end{pmatrix} \right\}{{< /imath >}}.

The column space {{< imath >}}C(A){{< /imath >}} has dimension 3, and a basis is {{< imath >}}\left\{ \begin{pmatrix} 1 \\ 2 \\ 1 \\ 5 \\ 4 \end{pmatrix}, \begin{pmatrix} 0 \\ 2 \\ 2 \\ 6 \\ 4 \end{pmatrix}, \begin{pmatrix} 2 \\ 4 \\ 4 \\ 16 \\ 10 \end{pmatrix} \right\}{{< /imath >}}.

## Exercise 6

> Calculate {{< imath >}}k \in \mathbb{R}{{< /imath >}} such that the sequence {{< imath >}}v_1 - k v_2{{< /imath >}}, {{< imath >}}v_2 - k v_3{{< /imath >}}, {{< imath >}}v_3 - k v_4{{< /imath >}}, {{< imath >}}v_4 - k v_1{{< /imath >}} is linearly independent, where
>
> {{< imath >}}v_1 = \begin{pmatrix} 1 \\ 1 \\ 1 \\ 1 \end{pmatrix}, \quad v_2 = \begin{pmatrix} 0 \\ 1 \\ 1 \\ 1 \end{pmatrix}, \quad v_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix}, \quad v_4 = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix}.{{< /imath >}}

**Sol**:
{{< math >}}

\begin{align*}
w_{1} & = v_{1}-kv_{2} = \begin{pmatrix}
1 \\ 1-k \\ 1-k \\ 1-k
\end{pmatrix}, 
w_{2}= v_{2} - kv_{3} = \begin{pmatrix}
0 \\ 1 \\ 1-k \\ 1-k
\end{pmatrix}, \\ \\
w_{3} & = v_{3} - kv_{4} = \begin{pmatrix}
0\\ 0 \\ 1 \\ 1-k
\end{pmatrix},
w_{4} = v_{4} - kv_{1} = \begin{pmatrix}
-k \\ -k \\ -k \\ 1-k
\end{pmatrix}, \\ \\ 
M & = \begin{pmatrix}
w_{1} & w_{2} & w_{3} & w_{4}
\end{pmatrix} = \begin{pmatrix}
1 & 0 & 0 & -k \\
1-k & 1 & 0 & -k \\
1-k & 1-k & 1 & -k \\
1-k & 1-k & 1-k & 1-k
\end{pmatrix}
\end{align*}

{{< /math >}}
Then we calculate the determinant of matrix {{< imath >}}M{{< /imath >}}, which is
{{< math >}}

\det(M) = 1-k^{4}

{{< /math >}}
So the sequence is linearly independent if and only if {{< imath >}}k^4 \neq 1{{< /imath >}}, i.e., {{< imath >}}k \neq \pm 1{{< /imath >}}.

## Exercise 7

> Let {{< imath >}}V{{< /imath >}} be a vector space and {{< imath >}}S_1, S_2 \subseteq V{{< /imath >}}. Prove that:
>
> (i) If {{< imath >}}S_1 \subseteq S_2{{< /imath >}}, then {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}.
>
> (ii) {{< imath >}}\operatorname{span}(S_1) = \operatorname{span}(\operatorname{span}(S_1)){{< /imath >}}.
>
> (iii) If {{< imath >}}S_1 \subseteq \operatorname{span}(S_2){{< /imath >}}, then {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}.

**Proof**:

**(i)**

Any linear combination of elements from {{< imath >}}S_1{{< /imath >}} is also a linear combination of elements from {{< imath >}}S_2{{< /imath >}}, using zero coefficients for elements in {{< imath >}}S_2 \setminus S_1{{< /imath >}}. Thus, {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}.

**(ii)**

Elements of {{< imath >}}\operatorname{span}(\operatorname{span}(S_1)){{< /imath >}} are linear combinations of elements from {{< imath >}}\operatorname{span}(S_1){{< /imath >}}, which are themselves linear combinations from {{< imath >}}S_1{{< /imath >}}, hence linear combinations from {{< imath >}}S_1{{< /imath >}}. So {{< imath >}}\operatorname{span}(\operatorname{span}(S_1)) \subseteq \operatorname{span}(S_1){{< /imath >}}. The reverse inclusion is immediate.

**(iii)**

Each element of {{< imath >}}S_1{{< /imath >}} is a linear combination from {{< imath >}}S_2{{< /imath >}}, so any linear combination from {{< imath >}}S_1{{< /imath >}} is a linear combination of linear combinations from {{< imath >}}S_2{{< /imath >}}, hence a linear combination from {{< imath >}}S_2{{< /imath >}}. Thus, {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}.

## Exercise 8

> Let {{< imath >}}V{{< /imath >}} be a vector space and {{< imath >}}v, e_1, \ldots, e_n \in V{{< /imath >}}. We have already used the following terminology in our class. We say that {{< imath >}}v{{< /imath >}} can be represented by {{< imath >}}e_1, \ldots, e_n{{< /imath >}} if {{< imath >}}v{{< /imath >}} can be written as a linear combination of {{< imath >}}e_1, \ldots, e_n{{< /imath >}}, or equivalently
>
> {{< imath >}}v \in \operatorname{span}(\{e_1, \ldots, e_n\}){{< /imath >}}.
>
> This can be extended as follows. Let {{< imath >}}v \in V{{< /imath >}} and {{< imath >}}S, S_1, S_2 \subseteq V{{< /imath >}}
>
> - {{< imath >}}v{{< /imath >}} can be represented by {{< imath >}}S{{< /imath >}} if {{< imath >}}v \in \operatorname{span}(S){{< /imath >}}.
>
> - {{< imath >}}S_1{{< /imath >}} can be represented by {{< imath >}}S_2{{< /imath >}} if every {{< imath >}}v \in S_1{{< /imath >}} can be represented by {{< imath >}}S_2{{< /imath >}}.
>
> Prove that:
>
> (i) {{< imath >}}S_1{{< /imath >}} can be represented by {{< imath >}}S_2{{< /imath >}} if and only if {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}.
>
> (ii) If {{< imath >}}S{{< /imath >}} can be represented by {{< imath >}}S_1{{< /imath >}}, and {{< imath >}}S_1{{< /imath >}} can be represented by {{< imath >}}S_2{{< /imath >}}, then {{< imath >}}S{{< /imath >}} can be represented by {{< imath >}}S_2{{< /imath >}}.
>
> (iii) Assume {{< imath >}}v \in S{{< /imath >}} and {{< imath >}}v{{< /imath >}} can be represented by {{< imath >}}S \setminus \{v\}{{< /imath >}}, then
>
> {{< imath >}}\operatorname{span}(S \setminus \{v\}) = \operatorname{span}(S){{< /imath >}}.

**Proof**:

**(i)**

{{< imath >}}S_1{{< /imath >}} can be represented by {{< imath >}}S_2{{< /imath >}} means {{< imath >}}S_1 \subseteq \operatorname{span}(S_2){{< /imath >}}, which by Exercise 7(iii) is equivalent to {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}.

**(ii)**

If {{< imath >}}S{{< /imath >}} is represented by {{< imath >}}S_1{{< /imath >}}, then {{< imath >}}S \subseteq \operatorname{span}(S_1){{< /imath >}}. If {{< imath >}}S_1{{< /imath >}} is represented by {{< imath >}}S_2{{< /imath >}}, then {{< imath >}}\operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}} by (i). Thus, {{< imath >}}S \subseteq \operatorname{span}(S_1) \subseteq \operatorname{span}(S_2){{< /imath >}}, so {{< imath >}}S{{< /imath >}} is represented by {{< imath >}}S_2{{< /imath >}}.

**(iii)**

Let {{< imath >}}T = S \setminus \{v\}{{< /imath >}}. Since {{< imath >}}v \in \operatorname{span}(T){{< /imath >}}, {{< imath >}}\operatorname{span}(S) = \operatorname{span}(T \cup \{v\}) \subseteq \operatorname{span}(T) + \operatorname{span}(\{v\}) \subseteq \operatorname{span}(T) + \operatorname{span}(T) = \operatorname{span}(T){{< /imath >}}. Also, {{< imath >}}\operatorname{span}(T) \subseteq \operatorname{span}(S){{< /imath >}}, so equality holds.