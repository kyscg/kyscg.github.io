---
permalink: /2023/11/11/SAMsemanticsegmentation
title: Segmentation model outputs as prompts to SAM
subtitle: Some ideas on improving semantic segmentation with SAM
date: 2023-11-11 14:21:17 +0530
layout: default
keywords: deep learning, research
categories: nn
published: true
---

Use some pre-existing models like [DeepLab](https://arxiv.org/abs/1606.00915) and [OneFormer](https://arxiv.org/abs/2211.06220) as baseline semantic segmentation models. Get bounding box prompts by using semantic segmentation masks from the baseline models. Use the prompts to get SAM masks, these masks are not labelled well. Now use IoU score between both masks to label the SAM masks, and we end up with labels from the baseline models and masks from SAM. Test this hypothesis on around 100 images per dataset.

---
