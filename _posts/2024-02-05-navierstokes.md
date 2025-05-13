---
permalink: /2024/02/05/navierstokes
title: Navier Stokes and smoothness
subtitle: My notes while trying to make sense of the Navier Stokes problem
date: 2024-02-05 14:21:17 +0530
layout: default
keywords: math, physics
categories:
    - math
    - physics
published: true
---

<p>Basically, a function is differentiable iff it is continuous. Now if there exists a
$k$-th derivative for a function, it means that the function is continuous at least
$k-1$ times. They are using this to group functions into differentiability classes.
A function of class $C^k$ has derivatives $f',f^{\prime\prime},\dots,f^{(k)}.$ Now,
a smooth
function is in the differentiability class $C^{\infty}$ which means that you can
differentiate it as many times as you want. Which means it is always continuous.</p>
<p>Now that we know this, we should first try and understand this operator in Terence
Tao's paper $$\partial_t
u=\Delta u+B(u,u)$$ and he says this $B$ is equivalent to the energy equation. As
far as I understand, Tao doesn't assume the equation to be smooth, instead of
$B(u,u)$ he assumed an averaged $\tilde{B}(u,u).$ And then he constructs a
smooth solution and
demonstrates finite-time blowup.</p>
<p>
References: <a
href="https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_existence_and_smoothness">Navier-Stokes
existence and smoothness</a> on Wikipedia and Tao&#39;s paper: <a
href="https://arxiv.org/abs/1402.0290">Finite time
blowup for an averaged three-dimensional Navier-Stokes equation</a>
</p>

---
