---
title: Using shuf to select random ports in a cluster
subtitle: A few tricks in bash to generate random numbers
date: 2025-04-12 20:24:53 +0530
layout: default
keywords: hacks, bash
published: true
---

I found this Stack OverFlow answer about [generating random numbers with a bash command](https://stackoverflow.com/a/2556282) and I've been using it to randomly select ports in a cluster.

It uses the [`shuf`](https://man7.org/linux/man-pages/man1/shuf.1.html) command (typing `man shuf` opens the manual on linux)

```bash
curl http://127.0.0.1:$(shuf -i 4000-4007 -n1)
```

I was reading the man pages and I found that you can do so much more with this simple command, a few cool examples are:

- Randomize lines in a file (this is useful if I have a list of file names of training data and I want to do a quick `train_test_split`)

```bash
shuf files.txt
```

- Pick seven random numbers out of an input range

```bash
seq 1 10010 | shuf -n 7
```

- And finally, the last one doesn't really need `shuf` but I found it while I was exploring, so I'm just putting it here. This one is the coolest, you can generate random passwords by taking random bytes from `/dev/urandom`, filter for alphanumeric characters, and choose how many ever characters you want. I am definitely using this the next time my institute bugs me about changing my email passwords.

```bash
head /dev/urandom | tr -dc A-Za-z0-9 | head -c 9 | shuf -n 1
```

---

