---
permalink: /2025/04/24/diffusionconvolution
title: Sums of random variables and convolutions
subtitle: A note on how Gaussians are convolved to make the reparameterization trick work in the diffusion forward process.
date: 2025-04-24 19:28:12 +0530
layout: default
keywords: deep learning, diffusion models, probability
categories: nn
published: true
---

In probability theory, the probability distribution of the sum of two or more independent random variables is the convolution of their individual distributions[^1]. I learnt this while trying to make sense of the reparameterization trick in the diffusion forward process where we have to "add" two normal distributions. 

This blog hopes to take the reader along my journey of understanding this idea. Even though — I hope I have presented it in an organized way — this blog is set out fairly sequentially so that there are no inane jumps, I did not actually go through it this way. When I first came upon the idea of adding two distributions, I skipped past it as being irrelevant. But I didn't understand why the variances had to add up. So, I sat down to work it out only to realize I had no clue what adding two Gaussians meant. I did some Googling and found out that the product of two Gaussians was a Gaussian, and that this fact is used to prove that the convolution of two Gaussians is a Gaussian.

Now I had two more tasks in front of me. 1) Why is a convolution of two Gaussians a Gaussian? and 2) What does convolution have anything to do with adding the two distributions? I first solved the first question by solving the convolution integral, and then I watched a 3Blue1Brown video that helped me understand why you have to perform a convolution in order to add when you sample from two different distributions.

Finally, I went around trying to teach this to a few of my friends so they would ask me any questions I did not think about. This also helped me understand the whole thing in a much better way. Then I sat down to write this post.

A list of references if you want to work it out yourself:
- [What are Diffusion Models](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) by Lilian Weng — whose blog is one of the best things to read btw — where I was learning the diffusion theory from.
- [Sum of Gaussian is Gaussian?](https://stats.stackexchange.com/questions/125808/sum-of-gaussian-is-gaussian) which confused me because the accepted answer (with a dead link) says that it is not.
- [Convolution of Gaussians is Gaussian](https://jeremy9959.net/Math-5800-Spring-2020/notebooks/convolution_of_gaussians.html) which uses the FFT for the proof.
- [The central limit theorem in terms of convolutions](https://www.lesswrong.com/posts/6oPe3oqzdJtrWmduR/the-central-limit-theorem-in-terms-of-convolutions) by Maxwell Peterson which finally cleared the fog blinding my eyes. "But this is the same thing as our convolution-of-distributions, because the density function of the sum of two random variables X, Y is the convolution of the density functions of X and Y."

## The Diffusion Forward Process

The diffusion forward process progressively adds Gaussian noise to a probability distribution (an image in this case) until the distribution very closely resembles a Gaussian distribution itself. The real data distribution $q(\mathbf{x})$ is transformed at each time step by the following rule 

$$q(\mathbf{x}_t|\mathbf{x}_{t-1})=\mathcal{N}(\mathbf{x}_t;\mu_t=\sqrt{1-\beta_t}\mathbf{x}_{t-1},\sigma_t^2=\beta_t\mathbf{I})\tag{1}.$$

<div class='figure'>
    <img src="/assets/images/diff1.png"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1.</span> The diffusion forward process on an image from the CIFAR10 dataset.
    </div>
</div>

In practice, we compute this by multiplying the standard deviation to a normal distribution and adding a scaled mean to it ($\mathcal{N}(\mu, \sigma^{2})=\sigma\mathcal{N}(0, 1)+\mu$). 

$$\mathbf{x}_t=\sqrt{1-\beta_t}\mathbf{x}_{t-1}+\sqrt{\beta_t}\mathbf{\epsilon}_{t-1},\tag{2}$$

where $\mathbf{\epsilon}_{t-1}\sim\mathcal{N}(0, 1).$

<div class='figure'>
    <img src="/assets/images/diff2.png"/>
    <div class='caption'>
        <span class='caption-label'>Figure 2.</span> The top two images show the first and final image, $\mathbf{x}_0$ and $\mathbf{x}_T$ respectively. The bottom two panels show the corresponding distributions of their pixel values. All three colour channels were flattened into one tensor before the histogram was produced.
    </div>
</div>

In order to compute any $\mathbf{x}_t$ without having to go through all the previous time steps, we can substitute $\beta$ with $1-\alpha.$ Equation $(\tag(2)$ now becomes

$$
\begin{align}
\mathbf{x}_t &= \sqrt{\alpha_t}\mathbf{x}_{t-1}+\sqrt{1-\alpha_t}\epsilon_{t-1} \\
&= \sqrt{\alpha_t}(\sqrt{\alpha_{t-1}}\mathbf{x}_{t-2}+\sqrt{1-\alpha_{t-1}}\epsilon_{t-2}) + \sqrt{1-\alpha_t}\epsilon_{t-1} \\
&= \sqrt{\alpha_t\alpha_{t-1}}\mathbf{x}_{t-2}+\sqrt{\alpha_t(1-\alpha_{t-1})}\epsilon_{t-2} + \sqrt{1-\alpha_t}\epsilon_{t-1}\tag{3} \\
&= \sqrt{\alpha_t\alpha_{t-1}}\mathbf{x}_{t-2}+\sqrt{\alpha_t-\alpha_t\alpha_{t-1} + 1-\alpha_t}\bar\epsilon_{t-2}\tag{4} \\
&= \sqrt{\bar\alpha_t}\mathbf{x}_{0}+\sqrt{1-\bar\alpha_t}\epsilon
\end{align}
$$

where $\bar\alpha_t=\displaystyle\Pi_{i=1}^t\alpha_i.$ And finally,

$$q(\mathbf{x}_t|\mathbf{x}_0)=\mathcal{N}(\mathbf{x}_t;\mu_t=\sqrt{\bar\alpha_t}\mathbf{x}_0, \sigma_t^2=(1-\bar\alpha_t)\mathbf{I}).\tag{5}$$

## Convolutions as sums of random variables

This is famously known as the reparameterization trick, and it was first used in variational auto-encoders. While I was reading through this math, I came to a stop between equations $(3)$ and $(4).$ I did not think it was immediately obvious that the sum of two normal distributions should be a normal distribution. In my head I pictured the bell curve of a gaussian and another bell curve of a different gaussian and attempted to add them only to realize I would get something like two peaks.

<div class='figure'>
    <img src="/assets/images/gsum.png"/>
    <div class='caption'>
        <span class='caption-label'>Figure 3.</span> My first attempt at adding the probability distributions of two Gaussians.
    </div>
</div>

But this is obviously incorrect because this is adding the individual probabilies over the entire number line whereas what we need to do is compute the probability distribution of the random variable that arises when you sum the individual (and independent) normally distributed random variables. After a very long time, I found out that this could be achieved by performing a convolution between the individual probability distribution functions. The intuition really set in for me after I watched these two videos from 3Blue1Brown.

- [Convolutions \| Why X+Y in probability is a beautiful mess](https://www.youtube.com/watch?v=IaSGqQa5O-M)
- [A pretty reason why Gaussian + Gaussian = Gaussian](https://www.youtube.com/watch?v=d_qvLDhkg00)

We can see this in action using [`np.convolve`](https://numpy.org/doc/stable/reference/generated/numpy.convolve.html). Just make sure that the "filter" has a smaller size, or the function will swap the two arrays around.

```python

import numpy as np

array_a = np.array([0.1, 0.2, 0.3, 0.2, 0.2])
array_b = np.array([0.4, 0.3, 0.3])

convolved_array = np.convolve(array_a, array_b)

print(convolved_array)

>>> [0.04 0.11 0.21 0.23 0.23 0.12 0.06]
```

## Convolution of two Gaussians

The last thing that remains is for us to verify that convolving one Gaussian with another gives a Gaussian as a result. We can check that by writing some code, and looking at the resulting curve, but it would be nice if we could rigorously prove it as well. Also, we have to verify that the variances add up (which is what is happening in the jump from equation $(3)$ to $(4)$).

A Gaussian probability distribution function is defined in the following way:

$$g(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp{\left(-\frac{1}{2}\frac{(x-\mu)^2}{\sigma^2}\right)}\tag{6}$$

To make things easier for ourselves, and also to generalize, we can rewrite $g(x)$ as

$$g(x)=A\exp{\left(-B(x-C)^2\right)},$$

which, if it has to be a Gaussian pdf, $A=\displaystyle\frac{1}{\sigma\sqrt{2\pi}},B=\displaystyle\frac{1}{2\sigma^2},$ and $C=\mu.$ We can perform a variable substitution $t=x-C$; which is the same as recentering the Gaussian. This doesn't change the nature of the distribution.

$$g(t)=A\exp{\left(-Bt^2\right)}\tag{7}$$

Let us now take two functions $g_1(t)$ and $g_2(t)$

$$g_1(t) = A_1 \exp(-B_1t^2) \qquad g_2(t) = A_2 \exp(-B_2t^2)$$

The convolution between them is defined as:

$$
\begin{align}
(g_1 \star g_2)(x) &= \int_{-\infty}^{\infty} g_1(t) g_2(x-t) dt \\
&= \int_{-\infty}^{\infty} A_1 \exp(-B_1t^2) \cdot A_2 \exp(-B_2(x-t)^2) dt \\
&= A_1 A_2 \int_{-\infty}^{\infty} \exp(-B_1t^2 - B_2(x-t)^2) dt
\end{align}
$$

The trick to solving this integral is to convert it to the form $\displaystyle{\int_{-\infty}^{\infty}e^{-x^2}dx},$ which we know equals $\sqrt\pi.$ To do this, we complete the square inside the exponential.

$$
\begin{aligned}
&-B_1 t^2 - B_2 x^2 - B_2 t^2 + 2 B_2 x t \\
&- ( (B_1 + B_2) t^2 - 2 B_2 x t ) - B_2 x^2 \\
&- \left( \sqrt{B_1 + B_2} t - \frac{B_2 x}{\sqrt{B_1 + B_2}} \right)^2 - B_2 x^2 + \frac{B_2^2 x^2}{B_1 + B_2} \\
&- \left( \sqrt{B_1 + B_2} t - \frac{B_2 x}{\sqrt{B_1 + B_2}} \right)^2 - x^2 \left( \frac{B_1 B_2 + B_2^2 - B_2^2}{B_1 + B_2} \right) \\
&- \left( \sqrt{B_1 + B_2} t - \frac{B_2 x}{\sqrt{B_1 + B_2}} \right)^2 - x^2 \frac{B_1 B_2}{B_1 + B_2}
\end{aligned}
$$

Now the whole convolution becomes:

$$
\begin{align}
(g_1\star g_2)(x) &= A_1 A_2 \exp \left( - \frac{B_1 B_2}{B_1 + B_2} x^2 \right) \int_{-\infty}^{\infty} e^{- \left( \sqrt{B_1 + B_2} t + \frac{B_2 x}{\sqrt{B_1 + B_2}} \right)^2 } dt \\
&= A_1 A_2 \sqrt{\frac{\pi}{B_1+B_2}}\exp \left( - \frac{B_1 B_2}{B_1 + B_2} x^2 \right) 
\end{align}
$$

Now we know we have a Gaussian as the result of two Gaussians. The relationship between the variances can be gotten by substituting the value of $B=\frac{1}{2\sigma^2}$ everywhere:

$$\frac{\frac{1}{2\sigma_1^2 2\sigma_2^2}}{\frac{1}{2\sigma_1^2} + \frac{1}{2\sigma_2^2}} = \frac{1}{2\sigma^2} \implies \sigma^2 = \sigma_1^2 + \sigma_2^2$$

{: style="text-align: right" }
$\blacksquare$

This is easier to do in code:

```python

import numpy as np


def gauss(x, mu, sigma):
    G = (1 / (sigma * ((2 * np.pi) ** 0.5))) * np.exp(
        -0.5 * ((x - mu) ** 2) / (sigma**2)
    )
    return G / G.sum()


x = np.linspace(-20, 20, 1000)

N1 = gauss(x, -3, 3)
N2 = gauss(x, 3, 4)
N3 = gauss(x, 0, 5)  # -3 + 3 = 0; 5 = sqrt(3^2 + 4^2)

N1c2 = np.convolve(N1, N2, mode="same")
```

<div class='figure'>
    <img src="/assets/images/gconv.png"/>
    <div class='caption'>
        <span class='caption-label'>Figure 4.</span> Convolution of two Gaussians on the left pane, and a comparison with the true Gaussian on the right pane.
    </div>
</div>

## Citation

Cited as:

> Kilaru, Yasaswi Sri Chandra Gandhi. (April 2025). Sums of random variables and convolutions, New Ideas. <https://kyscg.github.io/2025/04/23/diffusionconvolution/>

Or

```bibtex

@article{kilaru2025diffusionconvolution,
  title   = "Sums of random variables and convolutions",
  author  = "Kilaru, Yasaswi Sri Chandra Gandhi",
  journal = "kyscg.github.io",
  year    = "2025",
  month   = "Apr",
  url     = "https://kyscg.github.io/2025/04/23/diffusionconvolution/"
}

```

---

[^1]: <https://en.wikipedia.org/wiki/List_of_convolutions_of_probability_distributions>

