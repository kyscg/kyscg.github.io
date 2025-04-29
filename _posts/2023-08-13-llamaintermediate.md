---
title: Intermediate Activations in Llama 2.7B
subtitle: there is a country layer in in the llama 2 transformer
date: 2023-08-13 15:42:28 +0530
layout: default
keywords: deep learning, transformers
published: true
---

I found these parts interesting from this [LessWrong analysis of the Llama 2 attention outputs](https://www.lesswrong.com/posts/fJE6tscjGRPnK8C2C/decoding-intermediate-activations-in-llama-2-7b).

"By layer 24, the model is quite certain about the correct answer, and the remaining computations are mostly redundant, mainly re-weighting alternative less obvious completion paths such as 'The capital of Germany is {a, the, one, home, located...}'. Interestingly, the model becomes less certain about 'Berlin' from layers 24-31 as it figures out more alternative options."

"The attention output of layer 24 of the llama 2 transformer consistently represents relevant information related to countries, even when neither the prompt nor the higher probability completions are related to countries"

---
