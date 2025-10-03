---
tags:
- learning
- math
- linear-algebra
- homework
discipline: mathematics
publish: true
date: '2025-09-24T12:55:00+08:00'
title: MATH1205H HW1
categories:
- course-note
---
## Exercise 1

> Let {{< imath >}}f:\mathbb{R}\to\mathbb{R}{{< /imath >}} be a function. Prove that the following are equivalent:
> (i) There is a constant {{< imath >}}a\in\mathbb{R}{{< /imath >}} such that for every{{< imath >}}x\in\mathbb{R}{{< /imath >}} we have{{< imath >}}f(x)=ax{{< /imath >}}.
> (ii) For all {{< imath >}}x_1,x_2,c,x\in\mathbb{R}{{< /imath >}} we have {{< imath >}}f(x_1+x_2)=f(x_1)+f(x_2){{< /imath >}} and {{< imath >}}f(cx)=c\,f(x){{< /imath >}}.

**(i ⇒ ii)**

Assume there exists {{< imath >}}a\in\mathbb{R}{{< /imath >}} such that {{< imath >}}f(x)=a x{{< /imath >}} for all {{< imath >}}x\in\mathbb{R}{{< /imath >}} . Then for any {{< imath >}}x_1,x_2,c,x\in\mathbb{R}{{< /imath >}} ,
- {{< imath >}}f(x_1+x_2)=a(x_1+x_2)=ax_1+ax_2=f(x_1)+f(x_2){{< /imath >}};
- {{< imath >}}f(cx)=a(cx)=c(ax)=c\,f(x){{< /imath >}}.

Hence (ii) holds.

**(ii ⇒ i)**

Assume (ii) hold for all real scalars. Define {{< imath >}}a:=f(1){{< /imath >}}. For any {{< imath >}}x\in\mathbb{R}{{< /imath >}} we can write {{< imath >}}x=x\cdot 1{{< /imath >}}; by homogeneity, we have {{< imath >}}f(x)=f(x\cdot 1)=x\,f(1)=a x{{< /imath >}}.

Thus (i) holds with {{< imath >}}a=f(1){{< /imath >}}. Therefore (i) and (ii) are equivalent.

## Exercise 2

> Describe geometrically (line, plane, or all of {{< imath >}}\mathbb{R}^3{{< /imath >}}) all linear combinations of the given vectors.

**(a)** {{< imath >}}\begin{pmatrix}1\\2\\3\end{pmatrix}{{< /imath >}} and {{< imath >}}\begin{pmatrix}3\\6\\9\end{pmatrix}{{< /imath >}}.

- Observe that{{< imath >}}\begin{pmatrix}3\\6\\9\end{pmatrix}=3\begin{pmatrix}1\\2\\3\end{pmatrix}{{< /imath >}}, so the two vectors are colinear.
- Hence their span is {{< imath >}}\mathrm{Span}=\{\, t\begin{pmatrix}1\\2\\3\end{pmatrix}\mid t\in\mathbb{R}\,\}{{< /imath >}}, which is a line.

**(b)** {{< imath >}}\begin{pmatrix}1\\0\\0\end{pmatrix}{{< /imath >}} and {{< imath >}}\begin{pmatrix}0\\2\\3\end{pmatrix}{{< /imath >}}.

- These two vectors are not scalar multiples of each other, hence they are linearly independent.
- Therefore their span {{< imath >}}\mathrm{Span}=\{\, \alpha\begin{pmatrix}1\\0\\0\end{pmatrix}+\beta\begin{pmatrix}0\\2\\3\end{pmatrix}\mid \alpha,\beta\in\mathbb{R}\,\}{{< /imath >}} is a plane.

**(c)** {{< imath >}}\begin{pmatrix}2\\0\\0\end{pmatrix}{{< /imath >}}, {{< imath >}}\begin{pmatrix}0\\2\\2\end{pmatrix}{{< /imath >}} and {{< imath >}}\begin{pmatrix}2\\2\\3\end{pmatrix}{{< /imath >}}.

- Form the matrix with these as columns and compute the determinant:
 {{< math >}}

  \det\begin{pmatrix}
  2 & 0 & 2\\
  0 & 2 & 2\\
  0 & 2 & 3
  \end{pmatrix} \neq 0.
 
{{< /math >}}
- Since the determinant is nonzero, the three vectors are linearly independent,therefore their span all of {{< imath >}}\mathbb{R}^3{{< /imath >}}.

Answers:
- (a) a line.
- (b) a plane.
- (c) all of {{< imath >}}\mathbb{R}^3{{< /imath >}}.

## Exercise 3

> Consider {{< imath >}}v=(1,-2,1){{< /imath >}} and {{< imath >}}w=(0,1,-1){{< /imath >}}. Find {{< imath >}}c{{< /imath >}} and {{< imath >}}d{{< /imath >}} such that {{< imath >}}c v+d w=(3,3,-6){{< /imath >}}. Why is {{< imath >}}(3,3,6){{< /imath >}} impossible?

Let {{< imath >}}c v+d w=(3,3,-6){{< /imath >}}. Comparing coordinates:
{{< math >}}

\begin{cases}
c = 3 \\
-2c+d=9 \\
c-d=-6
\end{cases}

{{< /math >}}
It can be solved that {{< imath >}}c=3{{< /imath >}} and {{< imath >}}d=9{{< /imath >}}.

For {{< imath >}}(3,3,6){{< /imath >}}, the first coordinate again forces {{< imath >}}c=3{{< /imath >}}, and the second gives {{< imath >}}d=9{{< /imath >}}, hence the third would be {{< imath >}}c-d=3-9=-6\neq 6{{< /imath >}}. Therefore it is impossible. Equivalently, every linear combination satisfies {{< imath >}}y+z=-x{{< /imath >}} (since {{< imath >}}y=-2c+d{{< /imath >}} and {{< imath >}}z=c-d{{< /imath >}}), but the vector {{< imath >}}(3,3,6){{< /imath >}} has {{< imath >}}y+z=9\neq -3{{< /imath >}}; hence it does not lie in {{< imath >}}\mathrm{Span}\{v,w\}{{< /imath >}}.

## Exercise 4

> In the following, tacitly assume that every matrix operation is well-defined. Prove:
> (i) {{< imath >}}A+B=B+A{{< /imath >}}. (ii) {{< imath >}}c(A+B)=cA+cB{{< /imath >}}. (iii) {{< imath >}}A+(B+C)=(A+B)+C{{< /imath >}}.
> (iv) {{< imath >}}A(B+C)=AB+AC{{< /imath >}}. (v) {{< imath >}}(A+B)C=AC+BC{{< /imath >}}. (vi) {{< imath >}}A(BC)=(AB)C{{< /imath >}}.

Write {{< imath >}}A=(a_{ij}){{< /imath >}}, {{< imath >}}B=(b_{ij}){{< /imath >}}, {{< imath >}}C=(c_{ij}){{< /imath >}}. Use the entrywise definitions of addition and multiplication.

- (i) Commutativity of addition:
  For all {{< imath >}}i,j{{< /imath >}}, {{< imath >}}(A+B)_{ij}=a_{ij}+b_{ij}=b_{ij}+a_{ij}=(B+A)_{ij}{{< /imath >}}. Hence {{< imath >}}A+B=B+A{{< /imath >}}.

- (ii) Distributivity of scalar multiplication over addition:
  For all {{< imath >}}i,j{{< /imath >}}, {{< imath >}}\big(c(A+B)\big)_{ij}=c(a_{ij}+b_{ij})=ca_{ij}+cb_{ij}=(cA+cB)_{ij}{{< /imath >}}.

- (iii) Associativity of addition:
  For all {{< imath >}}i,j{{< /imath >}}, {{< imath >}}\big(A+(B+C)\big)_{ij}=a_{ij}+(b_{ij}+c_{ij})=(a_{ij}+b_{ij})+c_{ij}=\big((A+B)+C\big)_{ij}{{< /imath >}}.

- (iv) Left distributivity of multiplication:
 {{< math >}}

  \big(A(B+C)\big)_{ij}
  =\sum_k a_{ik}(b_{kj}+c_{kj})
  =\sum_k a_{ik}b_{kj}+\sum_k a_{ik}c_{kj}
  =(AB)_{ij}+(AC)_{ij}
  =(AB+AC)_{ij}.
 
{{< /math >}}

- (v) Right distributivity of multiplication:
 {{< math >}}

  \big((A+B)C\big)_{ij}
  =\sum_k (a_{ik}+b_{ik})c_{kj}
  =\sum_k a_{ik}c_{kj}+\sum_k b_{ik}c_{kj}
  =(AC)_{ij}+(BC)_{ij}
  =(AC+BC)_{ij}.
 
{{< /math >}}

- (vi) Associativity of multiplication:
 {{< math >}}

  \big(A(BC)\big)_{ij}
  =\sum_k a_{ik}(BC)_{kj}
  =\sum_k a_{ik}\sum_\ell b_{k\ell}c_{\ell j}
  =\sum_\ell\Big(\sum_k a_{ik}b_{k\ell}\Big)c_{\ell j}
  =\big((AB)C\big)_{ij}.
 
{{< /math >}}

Therefore all properties (i)–(vi) hold.

## Exercise 5

> Let{{< imath >}}A=\begin{pmatrix}3&1\\[2pt] 1&-3\end{pmatrix}{{< /imath >}}. Compute {{< imath >}}A^{50}{{< /imath >}} and {{< imath >}}A^{51}{{< /imath >}}.

First compute{{< imath >}}A^2{{< /imath >}}:
{{< math >}}

A^2
=\begin{pmatrix}3&1\\ 1&-3\end{pmatrix}
\begin{pmatrix}3&1\\ 1&-3\end{pmatrix}
=\begin{pmatrix}
3\cdot 3+1\cdot 1 & 3\cdot 1+1\cdot(-3)\\
1\cdot 3+(-3)\cdot 1 & 1\cdot 1+(-3)\cdot(-3)
\end{pmatrix}
=\begin{pmatrix}10&0\\ 0&10\end{pmatrix}
=10\,I_2.

{{< /math >}}
Thus {{< imath >}}A^2=10I_2{{< /imath >}}. It follows that for any integer {{< imath >}}n\ge 1{{< /imath >}},
- if {{< imath >}}n{{< /imath >}} is even, {{< imath >}}A^n=(A^2)^{n/2}=10^{n/2}I_2{{< /imath >}};
- if {{< imath >}}n{{< /imath >}} is odd, {{< imath >}}A^n=A\cdot A^{n-1}=A\cdot 10^{(n-1)/2}I_2=10^{(n-1)/2}A{{< /imath >}}.

Therefore,
- {{< imath >}}A^{50}=10^{25}I_2{{< /imath >}},
- {{< imath >}}A^{51}=10^{25}A=10^{25}\begin{pmatrix}3&1\\[2pt] 1&-3\end{pmatrix}{{< /imath >}}.
