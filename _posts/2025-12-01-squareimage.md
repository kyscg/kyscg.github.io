---
permalink: 2025/12/01/squareimage
title: Square an Image
subtitle: padding rectangular images to squares using Pillow
date: 2025-12-01 13:49:39 +0530
layout: default
keywords: image processing
categories: personal
published: true
---

This is going to be quick, but someone told me this morning about how they were uploading their non-square photos to websites that padded them to squares, and I felt like that was the easiest thing to program. I'm actually surprised modern phones don't have this feature. A quick internet search tells me that everyone is downloading image editing applications to do this for them.

Usage is fairly simple, you need Python3 and Pillow (`pip install Pillow`) installed on your machine.

You can "square" a single image, multiple images, and/or all images in a directory

```bash
# single image
python3 squareimage.py img1.png

# multiple images
python3 squareimage.py img1.jpg img2.jpeg

# all image formats
python3 squareimage.py *.jpg *.jpeg *.png *.webp
```

Running these commands will save the squared images with names img1_squared.jpg, img2_squared.jpeg, etc. You can change the background padding colour from white to any other colour of your choice or make any other changes you want. Basically, do not upload your data anywhere when you can solve the problem yourself.

#### Code

```python
"""
file: 
    squareimage.py
description: 
    pads rectangular images to 1:1 shape without cropping
    or changing the aspect ratio
url:
    https://kyscg.github.io/2025/12/01/squareimage
author:
    kyscg
"""

import argparse
from PIL import Image
import os


def infer_output_path(input_path):
    dirname, basename = os.path.split(input_path)
    filename_base, ext = os.path.splitext(basename)

    return os.path.join(
        dirname,
        f"{filename_base}_squared{ext}",
    )


def square_image(input_path):
    output_path = infer_output_path(input_path)

    img = Image.open(input_path)

    w, h = img.size
    s = max(w, h)

    square_img = Image.new("RGB", (s, s), color="white")
    square_img.paste(img, ((s - w) // 2, (s - h) // 2))
    square_img.save(output_path)

    img.close()
    square_img.close()


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("i", nargs="+")
    args = p.parse_args()

    for path in args.i:
        square_image(path)

```

This code is available on this [GitHub Gist](https://gist.github.com/kyscg/8553df74505f03a9dead0d20e593ed8c) as well.

---
