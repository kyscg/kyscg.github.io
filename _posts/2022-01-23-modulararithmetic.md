---
title: Modular Arithmetic
subtitle: Storing a few results here for future use
date: 2022-01-23 15:42:28 +0530
layout: default
keywords: math, notes
published: true
---

`(a + b) % m = (a % m + b % m) % m` is fairly obvious to derive.

`(a * b) % m = ((a % m) * (b % m)) % m` can be derived by writing out the multiplication as repeated addition.

[Fermat's Little Theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem) states that if  $p$ is a prime, then for any $a\in\mathbb{Z},$

$$a^{p}\equiv a\text{ mod }p.$$

`(a / b) % m = (a % m * b^-1 % m) % m` can be derived from Fermat's Little Theorem. The multiplicative inverse of $b$ modulo $m$ is $b^{-1}$ such that $b\cdot b^{-1}\equiv 1\text{ mod }m.$

---
