---
permalink: 2025/01/06/text2imageproblems
title: Some known problems in text to image generation
subtitle: Learning about where diffusion models break and collecting attempts at solutions
date: 2025-01-06 18:53:16 +0530
layout: default
keywords: diffusion models, research
categories: nn
published: true
---

Text to image models run into a few common issues which I want to understand and investigate. They are as follows. Attribute binding: generated objects should faithfully adhere to prompts. Example: A black cube and a red sphere should not only generate the cube and sphere, but also correctly assign them their respective colours. Other similar issues are catastrophic neglect (where objects in prompt are not even generated), layout guidance (objects are not spatially placed according to the prompt), and colour leakage (one object presents with the attribute of another object)

## Wiener Process

A Wiener process $W_t$ has the following properties:

1. $W_0=0$
2. $W_{t+u}-W_t, u\ge0$ are independent of past values $W_s,s\lt t$
3. $W_{t+u}-W_t$ is normally distributed with mean $0$ and variance $u$
4. $W_t$ is almost surely continuous in $t$

## Reward Based Noise Optimization

<div class='figure'>
    <img src="/assets/images/250106.png"/>
    <div class='caption'>
        <span class='caption-label'>ReNO:</span> difference between reward based noise optimization as proposed in ReNO (Eyring et al, NeurIPS 2024) and classical diffusion.
    </div>
</div>

## Questions and Todo

- Is ReNO different from just choosing the 50th/nth time step from the classical diffusion process and then using the one-step distillation?
- Why would GPU VRAM increase? Aren't we just storing an image and a prompt for each run?
- How is Direct Preference Optimization different from Contrastive Learning?
- How are Denoising Diffusion Implicit Models different from DDPMs?

## References

- [ReNO](https://arxiv.org/abs/2406.04312)
- [Training Diffusion Models with Reinforcement Learning](https://rl-diffusion.github.io/)
- [Diffusion Models Beat GANs on Image Synthesis](https://arxiv.org/abs/2105.05233)

---
