---
permalink: /2022/06/20/ceilv2incpp
title: Nicer ceil function in C++
subtitle: The inbuilt ceil function was being very unwieldy. I prefer defining my own inline function now. 
date: 2022-06-20 15:42:28 +0530
layout: default
keywords: notes
categories: math
published: true
---

```cpp
int ceil(int numerator, int denominator):
{
    return (numerator + denominator - 1) / denominator;
}

```

and in case of suspected overflow, use this

```cpp
int ceil(int numerator, int denominator)
{
    if (numerator % denominator == 0)
    {
        return numerator / denominator;
    } else
    {
        return numerator / denominator + 1;
    }
}
```

---
