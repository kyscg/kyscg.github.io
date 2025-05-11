---
permalink: 2024-08-23-sumsmultiples
title: On the sums of multiples of two numbers 
subtitle: A pattern that has evaded explanation for a long time, so I'm posting it here.
date: 2024-08-23 14:21:17 +0530
layout: default
keywords: math
categories: math
published: true
---

I came across a strange pattern when computing the sum of multiples of 2 and 3 below
1000, below 10000 et cetera. The sum of multiples of 2 and 3 less than
increasing powers of 10 are as follows, $\{32, 3317, 333167, 33331667, 3333316667,
\dots\}.$ This intrigued me and I wanted to check if this behaviour held for other
primes as well and found that it does for a bunch of others. Examples: $f(2,5)=\{25,
2950, 299500, 29995000, 2999950000,\dots\},$ and $f(3,5)=\{23, 2318, 233168,
23331668, 2333316668,\dots\}.$

```python

def sumMul(p1: int, p2: int, b: int, n: int) -> int:

    A = (b ** n - 1) // p1
    B = (b ** n - 1) // p2
    C = (b ** n - 1) // (p1 * p2)

    print(A, B, C)
    
    return p1 * A * (A + 1) / 2 + p2 * B * (B + 1) / 2 - (p1 * p2) * C * (C + 1) / 2


res = []
for i in range(1, 9):
    res.append(sumMul35(3, 5, 10, i)) # change this line

print(res)
```
                                
But all primes don't follow this pattern. As you may expect, the first prime to give me
trouble was 7. After some more experiments, I wondered why I couldn't try it for all
natural numbers and computed a few more numbers. I couldn't come up with any rules for
why some pairs had these patterns and why others did not but I noticed a few interesting
cases. For example, pairs like $(2,2^k)$ always gave a lot of zeros at the end of the
number, and that behaviour did not replicate among powers of 3 or 5. To investigate, I
looked at the actual number of terms that each summation had. Concretely, given two
numbers $p_1$ and $p_2,$ we first find the number of terms in each summation $A, B, C$.

$$A=\left\lfloor{\frac{10^n - 1}{p_1}}\right\rfloor,
B=\left\lfloor{\frac{10^n - 1}{p_2}}\right\rfloor,
C=\left\lfloor{\frac{10^n - 1}{p_1p_2}}\right\rfloor$$

$$S=\sum_{i=1}^Ap_1i+\sum_{i=1}^Bp_2i-\sum_{i=1}^Cp_1p_2i$$

$$S=p_1\cdot\frac{A(A+1)}{2}+p_2\cdot\frac{B(B+1)}{2}-p_1p_2\cdot\frac{C(C+1)}{2}$$

For most numbers, the numbers $A,B,C$ don't change apart from being multiplied by 10 and
so we can see patterns in the resulting sum. So that mystery is solved. But what I don't
get is what is so special about powers of 10 that this works. For example, changing the
base of the exponential to 7 (and computing the sums less than powers of 7) or any other
number doesn't work. Is there anything obvious that I am missing here?

---
