---
permalink: /2022/01/17/recursionfibonacci
title: How Many Recursive Calls Does a Recursive Function Make?
subtitle: a wild fibonacci appears
date: 2022-01-17 15:42:28 +0530
layout: default
keywords: math, os
categories: math
published: true
---

This [paper](https://vulms.vu.edu.pk/Courses/CS201/Downloads/p60-robertson.pdf) looks at the number of function calls made to itself by a function calculating the Fibonacci numbers recursively. There is a linear relationship between the Fibonacci numbers and the number of recursive calls. The number of function calls for a number $n, G(n)$ is related to the Fibonacci number $F(n)$ by the relation $G(n)=2F(n)-1.$ This was achieved by adding a global counter to the recursive function and incrementing it each time the function is called. 

---
