---
permalink: 2025/09/30/batchnorm
title: BatchNorm ten years on
subtitle: Why does BatchNorm work?
date: 2025-09-30 23:10:15 +0530
layout: default
keywords: deep learning
categories: nn
published: true
---

A few days ago, I found this tweet in my Twitter bookmarks, and made some time to watch the 2025 ICML Test of Time talk. This post is about what I learnt from that talk and some more thoughts about BatchNorm. But first, a prologue of sorts.

What caught my eye upon second perusal of the tweet was the line about normalization being a non-linear operation by definition. My first thought was to question everything I knew, and after some careful revision of Statistics 101, I was pretty sure that normalization is as linear as operations get. I should mention that what is being called normalization here, is technically standardization—the rescaling of data to have a mean ($\mu$) of $0$ and standard deviation ($\sigma$) of $1$ (unit variance) while normalization rescales the values into a range of $[0, 1].$[^1] I wrote a message to the author of the tweet but I haven't gotten any clarification about what they meant, and everyone I conferred with agreed with me that normalization was a linear operation, so I leave it here hoping (1) for some closure and (2) that I don't have to be carted off to remedial high school statistics.

<center>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just watched the BatchNorm talk at ICML2025 (test of time award), and it reminds me of the magical feeling when I first learned and tried it 10 years ago. Among many new normalization layers, BN is still more interesting to me because, unlike others, it acts more like a… <a href="https://t.co/u07MZdnfKx">pic.twitter.com/u07MZdnfKx</a></p>&mdash; Shuangfei Zhai (@zhaisf) <a href="https://twitter.com/zhaisf/status/1958461886053380574?ref_src=twsrc%5Etfw">August 21, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

## BatchNorm

- Google used to train Inception (circa 2015) on a CPU, and training time was one month.
- When sigmoid takes input from many variables, any small perturbation knocked the function to extremities.
- BatchNorm is like input normalization but for intermediate layers; if intermediate values in layer $l$ are $z^{[l][i]},$ then

$$
\begin{align}
z^{[l]}_{\text{norm}} &= \frac{z^{[l][i]} - \mu}{\sqrt{\sigma^2 + \epsilon}} &&; \text{where } \mu = \text{mean}, \, \sigma^2 = \text{var} \\
\tilde{z}^{[l]}_{\text{norm}} &:= \gamma z^{[l]}_{\text{norm}} + \beta &&; \text{where } \gamma \text{ and } \beta \text{ are learnt.}
\end{align}
$$

- While computing $z^{[l][i]}$ as $z^{[l][i]}=w^{[l]}a^{[l - 1]} + b^{[l]},$ we can get rid of the bias terms $b^{[l]}$ because BatchNorm, while seeking to normalize over all samples (intermediate) sometimes learns $\gamma$ to be $\sqrt{\sigma^2+\epsilon},$ and $\beta=\mu.$ Performing a kind of inversion (and even if it doesn't, it renders the biases useless)
- BatchNorm makes the weights deeper in a network more robust to changes in weights earlier in the network. A phenomenon called internal covariate shift, which I learnt later, has a somewhat analogous term in statistics called restriction of range. [^2]

<div class='figure'>
    <img src="/assets/images/covariateshift.svg"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1.</span> A simplistic demonstration of covariate shift.
    </div>
</div>

- Covariate shift requires us to retrain our neural networks even if the ground truth prediction function remains the same. Deeper layers in neural networks are constantly suffering from covariate shift problems. That is, the inputs to the layers are always different.
- By normalizing every layer, BatchNorm reduces internal covariate shift. This was the justification provided in the original 2015 paper (in the title too!) and lets neural networks train faster.
- BatchNorm during inference needs to be implemented differently because we might just want to predict on one sample instead of on a mini-batch.
- For inference, use estimates of $\mu$ and $\sigma^2$ using exponentially weighted averages across all mini-batches, for all samples.

```python
import torch

def logbn(tnsr, desc: str) -> None:
    print(f"{desc}")
    print(f"running mean: {tnsr.running_mean.item():.4f}")
    print(f"running var: {tnsr.running_var.item():.4f}\n")

# 0.9 * old_mean + 0.1 * current_mean
bn = torch.nn.BatchNorm1d(num_features=1, momentum=0.1)
logbn(bn, "Initialization")

data_tnsr = torch.tensor([[7.0], [7.0], [7.0]])

bn.train()
_ = bn(data_tnsr)
logbn(bn, "first pass")

_ = bn(data_tnsr)
logbn(bn, "second pass")

_ = bn(data_tnsr)
logbn(bn, "third pass")

data_tnsr = torch.tensor([[3.0]])
output = bn(data_tnsr) # this will throw an error

bn.eval()
output = bn(data_tnsr)
logbn(bn, "inference")
```

- Sergey Ioffe in his talk gives his reasoning for the affine transformation $(\gamma, \beta)$ after normalization as a way for the model to reverse the normalization if it wants. Which is related to what I wrote earlier about the biases being redundant.
- BatchNorm cut down training time from thirty to fifteen days, but it also  allowed for higher learning rates and finally got training time down to three days on CPU.

The most interesting part of the talk comes about halfway in when he points at all the subsequent research that was done to prove/disprove the reasons why BatchNorm works. To its merit, BatchNorm deserves the test of time award simply because it is established in the deep learning ecosystem, and it has enabled massive neural network depth because of the speed and performance you gain from it.

## References

- [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167)
- How does BatchNorm help Normalization? [Paper](https://arxiv.org/abs/1805.11604) and [Talk](https://www.microsoft.com/en-us/research/video/how-does-batch-normalization-help-optimization/)
- On the ordering of BatchNorm: [Reddit](https://www.reddit.com/r/MachineLearning/comments/67gonq/d_batch_normalization_before_or_after_relu/) and [StackOverflow](https://stackoverflow.com/questions/39691902/ordering-of-batch-normalization-and-dropout)
- [Batch Normalization Explained](https://arxiv.org/abs/2209.14778)
- [Batch Normalization \| Wikipedia](https://en.wikipedia.org/wiki/Batch_normalization)

---

[^1]: [Vivek Kumar](https://stats.stackexchange.com/users/2202/vivek-kumar), What's the difference between Normalization and Standardization?, URL (version: 2016-12-31): <https://stats.stackexchange.com/a/10298>

[^2]: [What is Restriction of Range?](https://www.statology.org/restriction-of-range/) by Zach Bobbitt in Statology
