---
tags:
- learning
- math
- homework
- linear-algebra
discipline: mathematics
publish: true
date: '2025-10-09T14:53:00+08:00'
title: MATH1205H HW5
categories:
- course-note
---
## Exercise 1

> Let {{< imath >}}S \subseteq V{{< /imath >}} be a subset of vectors in a vector space {{< imath >}}V{{< /imath >}}. A finite subset {{< imath >}}S' \subseteq S{{< /imath >}} is maximally linearly independent in {{< imath >}}S{{< /imath >}} if
>
> - {{< imath >}}S'{{< /imath >}} is linearly independent, and
>
> - for any {{< imath >}}v \in S \setminus S'{{< /imath >}} the set {{< imath >}}S' \cup \{v\}{{< /imath >}} is not linearly independent.
>
> Prove that:
>
> (i) {{< imath >}}S'{{< /imath >}} is maximally linearly independent in {{< imath >}}S{{< /imath >}} if and only if {{< imath >}}S'{{< /imath >}} (viewed as a sequence of vectors) is a basis for {{< imath >}}\operatorname{span}(S){{< /imath >}}.
>
> (ii) A finite subset {{< imath >}}S \subseteq V{{< /imath >}} constitutes a basis for {{< imath >}}V{{< /imath >}} if and only if {{< imath >}}S{{< /imath >}} is maximally linearly independent in {{< imath >}}V{{< /imath >}}.
>
> (ii) Every finite {{< imath >}}S{{< /imath >}} must have a maximally linearly independent {{< imath >}}S' \subseteq S{{< /imath >}} (without assuming that {{< imath >}}V{{< /imath >}} is finite dimensional).

**Proof**:

**(i)**

If {{< imath >}}S'{{< /imath >}} is maximally linearly independent in {{< imath >}}S{{< /imath >}}, then it is linearly independent. For any {{< imath >}}v \in S \setminus S'{{< /imath >}}, {{< imath >}}S' \cup \{v\}{{< /imath >}} is dependent, so {{< imath >}}v \in \operatorname{span}(S'){{< /imath >}}. Thus, {{< imath >}}\operatorname{span}(S) = \operatorname{span}(S'){{< /imath >}}, making {{< imath >}}S'{{< /imath >}} a basis for {{< imath >}}\operatorname{span}(S){{< /imath >}}.

Conversely, if {{< imath >}}S'{{< /imath >}} is a basis for {{< imath >}}\operatorname{span}(S){{< /imath >}}, it is linearly independent. For any {{< imath >}}v \in S \setminus S'{{< /imath >}}, {{< imath >}}v \in \operatorname{span}(S) = \operatorname{span}(S'){{< /imath >}}, so {{< imath >}}S' \cup \{v\}{{< /imath >}} is dependent.

**(ii)**

If {{< imath >}}S{{< /imath >}} is a finite basis for {{< imath >}}V{{< /imath >}}, it is linearly independent and spans {{< imath >}}V{{< /imath >}}. For any {{< imath >}}v \in V \setminus S{{< /imath >}}, {{< imath >}}v \in \operatorname{span}(S){{< /imath >}}, so {{< imath >}}S \cup \{v\}{{< /imath >}} is dependent, making {{< imath >}}S{{< /imath >}} maximally linearly independent in {{< imath >}}V{{< /imath >}}.

Conversely, if {{< imath >}}S{{< /imath >}} is maximally linearly independent in {{< imath >}}V{{< /imath >}}, it is linearly independent. For any {{< imath >}}v \in V \setminus S{{< /imath >}}, {{< imath >}}S \cup \{v\}{{< /imath >}} is dependent, so {{< imath >}}v \in \operatorname{span}(S){{< /imath >}}, hence {{< imath >}}\operatorname{span}(S) = V{{< /imath >}}, making {{< imath >}}S{{< /imath >}} a basis.

**(iii)**

Start with the empty set, which is linearly independent. Iteratively add vectors from {{< imath >}}S{{< /imath >}} that preserve independence until no more can be added. The resulting finite subset is maximally linearly independent in {{< imath >}}S{{< /imath >}}.

## Exercise 2

> Let {{< imath >}}u_1, \ldots, u_n, v, w \in V{{< /imath >}} be linearly dependent. Assume that {{< imath >}}u_1, \ldots, u_n{{< /imath >}} are linearly independent. Then one of the following holds.
>
> (i) {{< imath >}}v{{< /imath >}} is a linear combination of {{< imath >}}u_1, \ldots, u_n{{< /imath >}}.
>
> (ii) {{< imath >}}w{{< /imath >}} is a linear combination of {{< imath >}}u_1, \ldots, u_n{{< /imath >}}.
>
> (iii) {{< imath >}}u_1, \ldots, u_n, v{{< /imath >}} are all linear combinations of {{< imath >}}u_1, \ldots, u_n, w{{< /imath >}}, and vice versa.

Since {{< imath >}}\{u_1, \ldots, u_n, v, w\}{{< /imath >}} is dependent, there exist scalars not all zero such that {{< imath >}}\sum a_i u_i + b v + c w = 0{{< /imath >}}. If {{< imath >}}b = c = 0{{< /imath >}}, this contradicts the independence of the {{< imath >}}u_i{{< /imath >}}. Thus, {{< imath >}}b \neq 0{{< /imath >}} or {{< imath >}}c \neq 0{{< /imath >}} (or both).

- If {{< imath >}}b \neq 0{{< /imath >}} and {{< imath >}}c = 0{{< /imath >}}, then {{< imath >}}v = -\frac{1}{b} \sum a_i u_i{{< /imath >}}, so (i) holds.
- If {{< imath >}}b = 0{{< /imath >}} and {{< imath >}}c \neq 0{{< /imath >}}, then {{< imath >}}w = -\frac{1}{c} \sum a_i u_i{{< /imath >}}, so (ii) holds.
- If {{< imath >}}b \neq 0{{< /imath >}} and {{< imath >}}c \neq 0{{< /imath >}}, then {{< imath >}}v = -\frac{1}{b} (\sum a_i u_i + c w){{< /imath >}} and {{< imath >}}w = -\frac{1}{c} (\sum a_i u_i + b v){{< /imath >}}, so {{< imath >}}\operatorname{span}\{u_1, \ldots, u_n, v\} = \operatorname{span}\{u_1, \ldots, u_n, w\}{{< /imath >}}, and (iii) holds.

## Exercise 3

> Given {{< imath >}}v_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \\ 1 \end{pmatrix}, \quad v_2 = \begin{pmatrix} 1 \\ 3 \\ 0 \\ 2 \end{pmatrix}, \quad v_3 = \begin{pmatrix} 2 \\ 3 \\ 2 \\ 1 \end{pmatrix}, \quad v_4 = \begin{pmatrix} -1 \\ 1 \\ 0 \\ 0 \end{pmatrix},{{< /imath >}}
>
> find the vector that is not a linear combination of the rest.

The vector {{< imath >}}v_3{{< /imath >}} is not a linear combination of the rest, as {{< imath >}}\operatorname{span}\{v_1, v_2, v_4\}{{< /imath >}} lies in the subspace where the third coordinate is zero, but {{< imath >}}v_3{{< /imath >}} has third coordinate 2.

## Exercise 4

> Let {{< imath >}}V{{< /imath >}} be finite-dimensional. Under what condition the basis of {{< imath >}}V{{< /imath >}} is unique?

The basis is unique if and only if {{< imath >}}\dim V = 0{{< /imath >}}, i.e., {{< imath >}}V = \{0\}{{< /imath >}}, where the unique basis is the empty set. For {{< imath >}}\dim V \geq 1{{< /imath >}}, there are infinitely many bases.

## Exercise 5

> Consider the vector space {{< imath >}}\mathbb{R}^4{{< /imath >}}. Construct a basis containing the following two vectors.
>
> {{< imath >}}(1, 1, 0, 1), \ (10, 7, 2, 3).{{< /imath >}}

One such basis is {{< imath >}}\{(1,1,0,1), (10,7,2,3), (0,0,1,0), (0,0,0,1)\}{{< /imath >}}.

## Exercise 6

> Let {{< imath >}}V{{< /imath >}} be a finite dimensional vector space. Let {{< imath >}}W{{< /imath >}} be a subspace of {{< imath >}}V{{< /imath >}}. Prove that {{< imath >}}W \subsetneq V \iff \dim(W) < \dim(V){{< /imath >}}.
>
> Here, {{< imath >}}W \subsetneq V{{< /imath >}} means that {{< imath >}}W{{< /imath >}} is a proper subset of {{< imath >}}V{{< /imath >}}, i.e., {{< imath >}}W \subseteq V{{< /imath >}} but {{< imath >}}W \neq V{{< /imath >}}.

If {{< imath >}}\dim W < \dim V{{< /imath >}}, then {{< imath >}}W \neq V{{< /imath >}}, as subspaces of equal dimension coincide.

Conversely, if {{< imath >}}W \subsetneq V{{< /imath >}}, suppose {{< imath >}}\dim W = \dim V{{< /imath >}}. Then extending a basis of {{< imath >}}W{{< /imath >}} to {{< imath >}}V{{< /imath >}} would require no additional vectors, implying {{< imath >}}W = V{{< /imath >}}, a contradiction. Thus, {{< imath >}}\dim W < \dim V{{< /imath >}}.

## Exercise 7

> Let {{< imath >}}A{{< /imath >}} be an {{< imath >}}m \times n{{< /imath >}} matrix with {{< imath >}}m < n{{< /imath >}}.
>
> (i) Prove that the column vectors of {{< imath >}}A{{< /imath >}} are linearly dependent.
>
> (ii) Using (i) to show that for every {{< imath >}}b \in \mathbb{R}^m{{< /imath >}} the system of linear equations {{< imath >}}Ax = b{{< /imath >}} either has no solution or has infinitely many solutions.
>
> (iii) Prove that the column rank of {{< imath >}}A{{< /imath >}} is {{< imath >}}m{{< /imath >}} if and only if for every {{< imath >}}b \in \mathbb{R}^m{{< /imath >}} the system {{< imath >}}Ax = b{{< /imath >}} has infinitely many solutions.

**(i)**

The {{< imath >}}n{{< /imath >}} columns are vectors in {{< imath >}}\mathbb{R}^m{{< /imath >}} with {{< imath >}}n > m{{< /imath >}}, so they are linearly dependent.

**(ii)**

By (i), {{< imath >}}\dim \ker A \geq 1{{< /imath >}}. The solution set to {{< imath >}}Ax = b{{< /imath >}} is either empty (no solution) or an affine subspace of dimension {{< imath >}}\dim \ker A \geq 1{{< /imath >}} (infinitely many solutions).

**(iii)**

If column rank is {{< imath >}}m{{< /imath >}}, then {{< imath >}}\operatorname{span}{{< /imath >}} of columns is {{< imath >}}\mathbb{R}^m{{< /imath >}}, so {{< imath >}}Ax = b{{< /imath >}} is always consistent. By (ii), it has infinitely many solutions.

Conversely, if always infinitely many solutions, then always consistent, so column space is {{< imath >}}\mathbb{R}^m{{< /imath >}}, hence column rank {{< imath >}}m{{< /imath >}}.

## Exercise 8

> Let {{< imath >}}A{{< /imath >}} be an {{< imath >}}m \times n{{< /imath >}} matrix. Prove that there is an {{< imath >}}n \times m{{< /imath >}} matrix {{< imath >}}B{{< /imath >}} such that {{< imath >}}BA = I{{< /imath >}} if and only if the row rank of {{< imath >}}A{{< /imath >}} is {{< imath >}}n{{< /imath >}}.

The equation {{< imath >}}BA = I_n{{< /imath >}} means {{< imath >}}A{{< /imath >}} has a left inverse, equivalent to {{< imath >}}A{{< /imath >}} being injective (full column rank), i.e., rank {{< imath >}}n{{< /imath >}}. Since row rank equals column rank, this is equivalent to row rank {{< imath >}}n{{< /imath >}}.
