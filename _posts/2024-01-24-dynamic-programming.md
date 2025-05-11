---
permalink: 2024-01-24-dynamic-programming
title: Dynamic Programming [UFO]
subtitle: Some notes on rod-cutting, LCS, and 0-1 Knapsack...
date: 2024-01-24 21:44:04 +0530
layout: default
keywords: algorithms, notes
categories: math
published: true
---

Dynamic programming applies when the subproblems overlap - that is, when subproblems share subsubproblems. A dynamic-programming algorithm solves each subsubproblem just once and then saves its answer in a table, thereby avoiding the work of recomputing the answer every time it solves each subsubproblem.

## Rod-cutting

The *rod-cutting* problem is the following. Given a rod of length $n$ inches and a table of prices $p_i$ for $i=1,2,\dots,n$, determine the maximum revenue $r_n$ obtainable by cutting up the rod and selling the pieces. Rod lengths are always an integral number of inches.

The length vs. price table is given below:

|1|2|3|4|5|6|7|8|9|10|
|-|-|-|-|-|-|-|-|-|-|
|1|5|8|9|10|17|17|20|24|30|

We can cut up a rod of length $n$ in $2^{n-1}$ different ways. We denote decompositions using ordinary additive notation. $7=2+2+3$ means a rod of length 7 has been cut into 2 pieces of lentgh 2 and 1 piece of length 3. The optimal decomposition:

$n=i_1+i_2+\cdots+i_k$

provides maximum corresponding revenue

$r_n=p_{i_1}+p_{i_2}+\cdots+p_{i_k}$

More generally, we can frame the values $r_n$ for $n\geq1$ in terms of optimal revenue from shorter rods:

$r_n=\max(p_n, r_1+r_{n-1}, r_2+r_{n-2},\dots,r_{n-1}+r_1)$.

### Recursive Top Down Implementation

```python
def CutRod(p, n):
    if n == 0:
        return 0
    q = -inf
    for i in range(0, n):
        q = max(q, p[i] + CutRod(p, n - i))
    return q
```

The problem with the above implementation is that running time doubles every time we increment $n$ by 1. Why is `CutRod` so inefficient? The problem is that `CutRod` calls itself recursively over and over again with the same parameter values; it solves the same subproblems repeatedly.

### Using Dynamic Programming

Having observed that a naive recursive solution is inefficient because it solves the same subproblems repeatedly, we arrange for each subproblem to be solved only once, saving its solution.

The first approach is *top-down with memoization*. In this approach, we write the procedure recursively in a natural manner, but modified to save the result of each subproblem (usually in an array or hash table). The procedure now first checks to see whether it has previously solved this subproblem. If so, it returns the saved value, saving further computation at this level; if not, the procedure computes the value in the usual manner. We say that the recursive procedure has been memoized; it “remembers” what results it has computed previously.

The second approach is the *bottom-up method*. This approach typically depends on some natural notion of the “size” of a subproblem, such that solving any particular subproblem depends only on solving “smaller” subproblems. We sort the subproblems by size and solve them in size order, smallest first. When solving a particular subproblem, we have already solved all of the smaller subproblems its solution depends upon, and we have saved their solutions. We solve each subproblem only once, and when we first see it, we have already solved all of its prerequisite subproblems

```python
MemoizedCutRod(p, n):
    r = [None] * n
    for i in range(0, n):
        r[i] = -inf
    return MemoizedCutRodAux(p, n, r)
```

```python
MemoizedCutRodAux(p, n, r):
    if r[n] >= 0:
        return r[n]
    if n == 0:
        q = 0
    else if q = -inf:
        for i in range(0, n):
            q = max(q, p[i] + MemoizedCutRodAux(p, n - i, r))
    r[n] = q
    return q
```

The bottom-up version is very simple:

```
BottomUpCutRod(p, n)
	let r[n] be a new array
	r[0] = 0
	for j = 1 to n
		q = -inf
		for i = 1 to j
			q = max(q, p[i] + r[j - 1])
			r[j] = q
	return r[n]
```

## Fibonacci Numbers

## Longest Common Subsequence

Biological applications often need to compare the DNA of two (or more) different organisms. For example, the DNA of one organism may be $S_1=$ `ACCGGTCGAGTGCGCGGAAGCCGGCCGAA`, and the DNA of another organism may be $S_2=$`GTCGTTCGGAATGCCGTTGCTCTGTAAA`. One reason to compare two strands of DNA is to determine how “similar” the two strands are, as some measure of how closely related the two organisms are.

One way to find/measure similarity is to find a third strand $S_3$ in which the bases appear in both $S_1$ and $S_2$; in the same order but not necessarily consecutively. In our example, the longest strand $S_3$ is `GTCGTCGGAAGCCGGCCGAA`. This is the longest common subsequence problem.

### Optimal Substructure of LCS

Let $X=\langle x_1,x_2,\dots,x_m\rangle$ and $Y=\langle y_1,y_2,\dots,y_n\rangle$ be sequences, and let $Z=\langle z_1,z_2,\dots,z_k\rangle$ be any LCS of $X$ and $Y$.

1. If $x_m=y_n$, then $z_k=x_m=y_n$ and $Z_{k-1}$ is an LCS of $X_{m-1}$ and $Y_{n-1}$.
2. If $x_m\neq y_n$, then $z_k\neq x_m$ implies that $Z$ is an LCS of $X_{m-1}$ and $Y$.
3. If $x_m\neq y_n$, then $z_k\neq y_n$ implies that $Z$ is an LCS of $X$ and $Y_{n-1}$.

### Recursive Solution

Let us define $c[i, j]$ to be the length of an LCS of the sequences $X_i$ and $Y_j$.

$$
c[i, j] =
\begin{cases}
    0 & \text{if } i = 0 \text{ or } j = 0, \\
    c[i - 1, j - 1] + 1 & \text{if } i, j > 0 \text{ and } x_i = y_j, \\
    \max(c[i, j - 1], c[i - 1, j]) & \text{if } i, j > 0 \text{ and } x_i \neq y_j.
\end{cases}
$$

This is a bottom-up or tabulation approach. We first compute the $C$ matrix and then use it for solving problems.

**Time Complexity**: $O(mn)$
**Space complexity**: $O(mn)$

## 0-1 Knapsack Problem

A thief robbing a store finds $n$ items. The $i$ th item is worth $v_i$ dollars and weighs $w_i$ pounds, where $v_i$ and $w_i$ are integers. The thief wants to take as valuable a load as possible, but he can carry at most $W$ pounds in his knapsack, for some integer $W$. Which items should he take?

### Optimal Substructure

$K(n, W)$ is the knapsack with $n$ items and weight limit of $W$. If $w[n]>W$, then the problem reduces to $K(n-1,W)$. Otherwise, we again have two cases: if we put the $n$ th item in the bag, the problem reduces to $K(n-1,W-w[n])$ and if the $n$ the item is skipped, it reduces to $K(n-1, W)$.

The overall substructure can be written as follows:

$$
\begin{equation}
  K(n,W)=\left\{
  \begin{array}{@{}ll@{}}
    K(n-1, W) & \text{if}\ w[n] > W, \\
    \max\{K(n-1,W-w[n])+val[n], K(n-1,W)\} & \text{otherwise.}
  \end{array}\right.
\end{equation} 
$$

---
