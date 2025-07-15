---
permalink: 2025/07/11/dqnenduro
title: A Deep Q-Network learns to play Enduro 
subtitle: Implementing the first Deepmind papers on deep reinforcement learning and realizing that the Sutton-Barto textbook is a masterpiece in technical pedagogy. 
date: 2025-07-11 12:20:10 +0530
layout: default
keywords: deep learning, reinforcement learning
categories: nn
published: true
---

A recording of me explaining and implementing the Deep Q-Network (DQN) algorithm, as described in the seminal paper "Playing Atari with Deep Reinforcement Learning" (Mnih et al., 2013/2015), applied to the Atari 2600 game Enduro using PyTorch and Gymnasium.

This implementation has some optimizations for stable and efficient training, such as `uint8` frame storage for memory efficiency and reward clipping for improved learning stability.

I trained a lot of variants with different results. Two things that improved performance significantly from test average of 100 to 320 to 481 was 1) using uint8 for memory management in the replay buffer and 2) clipping rewards before stacking frames into the buffer and updating the target network (even though this makes no sense to me because the environment only gives a max reward of 1 per step). Overall, an average test performance of 481 was achieved which is comparable to the results in the original paper.

<center>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/kRzhB5Fhd8M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</center>

## Resources

- [Playing Atari with Deep Reinforcement Learning](https://arxiv.org/abs/1312.5602)
- [Human-level control through deep reinforcement learning](https://www.nature.com/articles/nature14236)
- [Reinforcement Learning: An Introduction](http://incompleteideas.net/book/the-book-2nd.html)
- [Arcade Learning Environment (ALE) Documentation](https://ale.farama.org/)

## Code

- Install the following requirements (most of these are already available on Colab)

```

ale-py==0.11.1
gymnasium==1.1.1
imageio==2.37.0
imageio-ffmpeg==0.6.0
numpy==2.0.2
pillow==11.2.1
tensorboard==2.18.0
torch @ https://download.pytorch.org/whl/cu124/torch-2.6.0%2Bcu124-cp311-cp311-linux_x86_64.whl
tqdm==4.67.1
```

- [`train.py`](/assets/code/250711-1.html) for training the agent, generating logs, and saving model checkpoints
- [`infer.py`](/assets/code/250711-2.html) for loading checkpoints and generating gameplay video

---
