---
permalink: 2025/08/04/feynmanintegration
title: Feynman's integration technique
subtitle: How does differentiating under the integral sign work for simple integrals?
date: 2025-08-04 22:01:25 +0530
layout: default
keywords: math, feynman, integral calculus
categories: math
published: true
---

Like many people before me, and many more after me, I first learnt about the "trick" of differentiating under the integral from "Surely You're Joking, Mr. Feynman!" where Feynman writes a story about how a high school teacher gave him an advanced calculus textbook which had some interesting integration techniques. I suspect that it is for this reason that the technique is called "Feynman's Integration Trick". This was a little less than ten years ago, and I'd completely forgotten all about it (and any other integration tricks I learnt) until a few weeks ago when a friend of mine and I decided to look at some calculus. We were trying to work out a very notorious definite integral (in relation to the normal distribution), and found ourselves completely out of our depth.

$$\displaystyle\int_{-\infty}^{\infty}e^{-x^2}dx=\sqrt{\pi}$$

The reason the indefinite integral can't be solved is because the anti-derivative cannot be expressed as a composition of elementary functions. The definite integral however, can be solved by multiplying the integral with itself and converting everything to polar coordinates[^1]. However, things get very interesting when you try to solve it using Feynman's Trick[^2].

The idea is fairly straightforward, you inject a second variable into the integral, thereby transforming the integral into a function of the second variable, and then differentiating this new function with respect to the second variable. This gives us a differential equation, which when solved cleverly using the knowledge of limits of the original equation, gives us the computation of the original integral.

There are loads of examples on YouTube of this technique with very flashy integrals, most of them being this Dirichlet integral

$$\displaystyle\int_{0}^{\infty}\frac{\sin x}{x}dx$$

Solving this using the Feynman trick involves having the proxy function

$$F(t)=\displaystyle\int_{0}^{\infty}e^{-tx}\frac{\sin x}{x}dx$$

which eliminates the $x$ in the denominator after differentiating once. We need to know what the graph of the $\arctan$ function looks like, and then everything falls into place.

I then tried to make the trick work for simple integrals like for integrating the function $f(x)=x$ to which the answer is very simple and doesn't need any fancy techniques. It turns out that the fancy technique turns out to be very complicated to work out. I tried a variety of functions, which just ballooned the integrals more and more as I fell into a spiral of integrating each resulting term by parts. It just shows how much integration, and mathematics isn't an exact science, but requires some practice, some creativity, and some intuition about what you think the result would look like.

### References

- [Dr. Trefor Bazett solves the Dirichlet integral](https://www.youtube.com/watch?v=ZZccxuOpb4k)
- [The Dirichlet Integral](https://philosophicalmath.wordpress.com/2017/09/04/a-dirichlet-integral/)
- [Some very good examples, and heuristics for learning the technique](https://zackyzz.github.io/feynman.html) by Zaharia Burghelea

---

[^1]: <https://math.stackexchange.com/a/886561>
[^2]: <https://math.stackexchange.com/questions/390850/integrating-int-infty-0-e-x2-dx-using-feynmans-parametrization-trick>
