---
permalink: /2025/04/08/videoplaybackspeed
title: JavaScript to change video playback speed
subtitle: because sometimes, you want to go faster than 2x
date: 2025-04-08 20:07:44 +0530
layout: default
keywords: javascript, hacks
categories: personal
published: true
---

To speed up video playback beyond 2x, open the JavaScript console on your web browser (`Ctrl` + `Shift` + `K` on FireFox, `Ctrl` + `Shift` + `J` on Chrome, etc) and paste the following command with your desired playback rate:

```js
document.getElementsByTagName("video")[0].playbackRate = 
```

This should work on almost all websites that serve video. I can't remember where I first found it many years ago, but I'm sure this is a common solution to the problem that is easily available online.

---
