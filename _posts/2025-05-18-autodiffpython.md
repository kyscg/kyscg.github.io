---
permalink: 2025/05/18/autodiffpython
title: Implementing Automatic Differentiation in Pure Python
subtitle: Forward-mode and reverse-mode autodiff in python featuring dual numbers and graph traversals
date: 2025-05-18 09:54:49 +0530
layout: default
keywords: research, automatic differentiation, autograd
categories:
    - nn
    - math
published: true
---

A recording of me explaining and implementing automatic differentiation in pure Python. I start with some mathematics of forward and reverse mode autodiff and then implement interleaved forward mode autodiff. Then I explain how to use Dual Numbers and implement forward mode autodiff using Dual Numbers. Finally, I construct a computation graph and perform a topological sort to achieve reverse mode autodiff.

<center>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ULS1Py6ovjs?si=s2Hu84g9t6tdfIn7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</center>

## Resources

- [Wikipedia - Automatic Differentiation](https://en.wikipedia.org/wiki/Automatic_differentiation)
- [Backprop is not just the chain rule](https://timvieira.github.io/blog/post/2017/08/18/backprop-is-not-just-the-chain-rule/) by Tim Vieira on Graduate Descent
- [Evaluation $\nabla f(x)$ is as fast as $f(x)$](https://timvieira.github.io/blog/post/2016/09/25/evaluating-fx-is-as-fast-as-fx/) by Tim Vieira on Graduate Descent
- [How to test gradient implementations](https://timvieira.github.io/blog/post/2017/04/21/how-to-test-gradient-implementations/) by Tim Vieira on Graduate Descent
- [micrograd](https://github.com/karpathy/micrograd) by Andrej Karpathy (the greatest ever)

_Update: ever since I published my video, I have had many interesting discussions with people about autodiff and I found these links to be very useful in improving my understanding of autodiff._

- [PyTorch Autograd Explained](https://www.youtube.com/watch?v=MswxJw-8PvE) by Elliot Waite
- [Automatic Differentiation](https://justindomke.wordpress.com/2009/02/17/automatic-differentiation-the-most-criminally-underused-tool-in-the-potential-machine-learning-toolbox/) by Justin Domke
- [Introduction to Automatic Differentiation](https://alexey.radul.name/ideas/2013/introduction-to-automatic-differentiation/)

## Code

- [`fmadinterleaved.py`](https://gist.github.com/kyscg/fdd97e5da5c7456dbf0d5d336f1f318a#file-fmadinterleaved-py): implementation of forward mode autodiff by straightforward interleaving
- [`dnexample.py`](https://gist.github.com/kyscg/fdd97e5da5c7456dbf0d5d336f1f318a#file-dnexample-py): an example implementation of dual numbers and usage for finding derivatives
- [`fmaddual.py`](https://gist.github.com/kyscg/fdd97e5da5c7456dbf0d5d336f1f318a#file-fmaddual-py): implementation of forward mode autodiff using dual numbers
- [`rmad.py`](https://gist.github.com/kyscg/fdd97e5da5c7456dbf0d5d336f1f318a#file-rmad-py): implementation of reverse mode autodiff by building a computational graph
- [`ftest.py`](https://gist.github.com/kyscg/fdd97e5da5c7456dbf0d5d336f1f318a#file-ftest-py): code to test whether numbers generated are correct

## Notes

<p style="width: 100%">
<img src="/assets/images/2025-05-18-Note-10-05-1.png" alt="" style="width: 100%">
<img src="/assets/images/2025-05-18-Note-10-05-2.png" alt="" style="width: 100%">
<img src="/assets/images/2025-05-18-Note-10-05-3.png" alt="" style="width: 100%">
<img src="/assets/images/2025-05-18-Note-10-05-4.png" alt="" style="width: 100%">
</p>

---
