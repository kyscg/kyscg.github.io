---
permalink: /2024/06/14/pointsinacircle
title: A very nice ruler and compass geometry puzzle 
subtitle: Find the shortest route between two points in a circle by touching the circumference along the route.
date: 2024-06-14 14:21:17 +0530
layout: default
keywords: math, geometry
categories: math
published: true
---

I found a nice puzzle on Twitter that I want to add some thoughts about here. The problem is that you need to find the shortest route from A to B by touching the perimetre of the circle on the way. We can solve this analytically, by considering a parametric form of the circle and minimizing the distance from the two points but we would ideally require a ruler and compass construction of the solution. Apparently, this problem can be traced way back to Ptolemy in 150 AD.

References:  
1. [Alhazen's Billiard Problem](https://mathworld.wolfram.com/AlhazensBilliardProblem.html) on Wolfram Mathworld  
2. [Circular Billiard](https://www.unige.ch/~gander/Preprints/Billiard.pdf) by Drexler and Gardner  
3. [Twitter thread](https://twitter.com/adad8m/status/1800065254011068926)

<div class='figure'>
    <img src="/assets/images/circleinternal.svg"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1.</span> An example construction of the problem. The goal here is to find the shortest path from A to B while hitting the circumference along the way.
    </div>
</div>

There are three special cases that I want to note here:  
1. If B=A, then the shortest route is the round trip from A to the nearest point on the circle.  
2. If B or A is on the perimeter, then the shortest route is the straight line from A to B.  
3. If B or A is on the center of the circle, then the shortest route is along the radius of the circle.

---
