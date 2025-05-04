---
title: Temperature
subtitle: and some more thermodynamics
date: 2024-04-10 14:21:17 +0530
layout: default
keywords: physics
published: true
---

<p>Thermometers wouldn&#39;t work if energy didn&#39;t spontaneously flow from two
objects in contact with each other, and temperature is objectively, just something
you measure with a thermometer. (of course, we&#39;re talking about traditional
mercury thermometers here, and not stuff like infrared thermometers)</p>
<p>One definition for the average kinetic energy of an ideal gas (with three degrees of
freedom) is $$\bar K=\frac{3}{2}k_BT$$ and we can get a bad definition of
temperature by moving the terms around. Note that we got this equation from the
<strong>equipartition theorem</strong> which states the average energy of a system
in which individual elements have $n$ degrees of freedom is
$\displaystyle\frac{1}{2}nk_BT$.
</p>
<p><strong>Fundamental Assumption of Statistical Mechanics</strong>: All accessible
microstates are equally likely for a system in thermodynamic equilibrium.</p>
<p>Entropy is a statistical measure of how many possible arrangements exist for a
system. Define multiplicity $\Omega$ for an Einstein Solid with $N$ quantum harmonic
oscillators and $q$ units of energy as $$\Omega={q+N-1\choose q},$$ and energy units
will flow in such a way as to maximize the product of individual multiplicities of
the objects in contact with each other. Concretely, there are systems $A,B$ with
$N_A,N_B$ oscillators and $q_A,q_B$ units of energy in contact with each other. They
have individual multiplicities of $\Omega_A,\Omega_B$ and the units of energy
$q_A,q_B$ will flow in a way that maximizes $\Omega=\Omega_A\cdot\Omega_B.$ The
constraint obviously being that $q_A+q_B$ is always fixed. The graph of $\Omega$
versus $q_A$ looks like a Dirac Delta function with a very narrow peak near the
middle, which is intuitive (if you accept that multiplicities should be maximized,
because the $\displaystyle{n\choose k}$ function has it&#39;s maximum at $2k=n$)</p>
<p>Now, entropy is just the natural log of this multiplicity and has units
[energy]$\times$[temperature]$^{-1}$.$$S=k_B\ln{\Omega}$$ <strong>The Second Law of
Thermodynamics</strong>: (1) The entropy of an isolated system tends to
increase. (2) A system in thermodynamic equilibrium is most likely to be found in
the macrostate (configuration of $q_A$ and $q_B$ for example above) of highest
entropy.
</p>
<p>Finally, temperature is defined as $$\frac{1}{T}=\frac{\Delta S}{\Delta E}.$$ Which
is why temperature is a measure of the tendency of an object to give up it&#39;s
energy to another object it comes in contact with. Reference/Inspiration: <a
href="https://arxiv.org/abs/2401.12119">Temperature as Joules per Bit</a></p>

---
