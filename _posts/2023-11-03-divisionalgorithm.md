---
permalink: 2023-11-03-divisionalgorithm
title: Division Algorithm Theorem
subtitle: a very elegant proof that I learnt after many hours of toil
date: 2023-11-03 14:21:17 +0530
layout: default
keywords: math
categories: math
published: true
---

<p><strong>Theorem:</strong> For all $a,b\in\mathbb{Z},$ with $b&gt;0,$ there exists
unique $q,r\in\mathbb{Z}$ such that
$a=bq+r$ with $0\le r&lt;b$</p>
<p><strong>Proof:</strong> Basically, $q$ is the quotient and $r$ is the remainder.
Consider the set
$S={a-bx|x\in\mathbb{Z},a-bx\ge0}$. For this set, we will first choose $a, b$ and
vary $x$ to get elements of the
set.</p>
<p>In general, to find the smallest element $r$ in $S$, we have to argue that the set
$S$ is not empty.</p>
<p>Claim: $S\neq\phi$<br>
Case 1: $a\ge0$, we set $x=0$, so that we get $a-b(0)=a\in S$. The set is not
empty<br>
Case 2: $a&lt;0$, we will set $x=a$, so that $a-ba=a(1-b)\ge0$. The set is not empty
</p>
<p>Let $r$ be the minimum value of $S$ and $q$ be the corresponding quotient for this
value of $r$.</p>
<p>We have $r=a-bq$. Towards the contradiction, assume that $r\ge b$<br>
$$r=a-bq\ge b$$
$$r-b=a-b(q+1)\ge b-b\ge0$$
<p>This means that $r-b\in S$ because $r-b=a-b(q&#39;)$ where $q&#39;=q+1$. But on the
other hand, $r-b&lt;r$ which
contradicts our assumption that $r$ is the minimum value of $S$. This implies that
$0\le r&lt;b$</p>
<p>Now, all that is left is to prove the uniqueness of $q$ and $r$. Suppose that
$q,q&#39;,r,r&#39;$ are such that $a=bq+r=bq&#39;+r&#39;$. Assume $r&#39;\ge r$, this assumption can work either ways. We have $b(q-q&#39;)=r&#39;-r$. The LHS is a multiple of $b$ and the RHS follows the inequality $o\le r&#39;-r&lt;b$. The only way both can be true is if LHS $=$ RHS $=0$. This implies that $q=q&#39;$ and $r=r&#39;$. $\blacksquare$ </p>


---
