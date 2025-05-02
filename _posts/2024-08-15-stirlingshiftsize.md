---
title: $x^n/n!$ and Stirling's Formula 
subtitle: What is the size of the shift between two successive curves and how do you show that they intersect at integer points? 
date: 2024-08-23 14:21:17 +0530
layout: default
keywords: math
published: true
---

I saw this nice problem on Mathstodon a few months ago and decided to take a look today. It turns out that the curves of $x^n/n!$ have very similar shapes but shifted. What is the size of the shift between the curves? 

<div class='figure'>
    <img src="/assets/images/stirling.svg"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1: </span> The curves of $x^n/n!$ for $n=1,...,20.$ They show a characteristic parallel shape among each other.
    </div>
</div>

The easiest way to do it is by using Stirling approximations, on which I did some
rudimentary speed analysis <a
href="https://gist.github.com/kyscg/b5f90f5162582f86197ddd7a391ad471">sometime
before.</a> Assume that the value we're trying to find the spacing at is $t.$
Then we need to find the corresponding value of $x$ for two successive curves. $x^n
/ n! = t.$ Recall Stirling's formula and substitute it into this:

$$n! \approx
(n/e)^n \sqrt{2\pi n}$$

$$x^n / (n/e)^n \sqrt{2\pi n} = t$$

Two things happen here
when $n$ is large and $t$ is small, we can ignore the effects of $\sqrt{n}$ in the
product with $n^{n}$ firstly and notice that $t^{1/n}$ equals one. So we get

$$x =
n/e$$

and the resulting spacing is simply $1/e.$ I thought this was very neat, and a
good example of street-fighting calculations that are seemingly too complex. I would
say that the hardest part in this entire thing was plotting the graphs, they needed
some programming acrobatics to get the axes right.

```python

def comp(n: int) -> list:
    
    x = []
    y = []
    for i in np.linspace(0, 10, 1000):
        if ((i ** n) / math.factorial(n)) <= 2:
            x.append(i)
            y.append((i ** n) / math.factorial(n))
    
    return x, y

for i in range(2, 20):
    plt.plot(comp(i)[0], comp(i)[1])
plt.xlabel("x")
plt.ylabel("x^n/n!")
plt.show()
```

An interesting fact here is that every curve intersects with the next one only at an
integer. This is fairly easy to show,

$$\frac{(n + 1)^{n + 1}}{(n + 1)!} = \frac{(n +
1)(n + 1)^{n}}{(n + 1)(n)!} = \frac{(n + 1)^{n}}{(n)!}$$

This means that the
$n^{\text{th}}$ curve and the $(n + 1)^{\text{th}}$ curve will intersect at $x = n + 1.$
Cute.

---
