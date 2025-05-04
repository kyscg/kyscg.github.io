---
title: Liquefying Silica 
subtitle: An appendix to my previous blog post on Isostasy 
date: 2024-04-24 14:21:17 +0530
layout: default
keywords: physics
published: true
---

So much of the heavy lifting in the [previous post about topographical heights](/2024/04/22/maxmountainheight)
involved calculating the liquefying
energy needed for a silica molecule. I wanted to expand on that a bit in this note
so I can provide myself closure
about this topic that consumed me for a few hours.
<p>
<p>All depends on the structure of the silica molecule. In the crystalline form, the
SiO$_2$ lattice has each O atom
bonded to two silicons and each Si atom bonded to four oxygens. For simplicity, we
can consider this configuration
to have zero entropy ($S=0$). In a liquid state, we can think of some fraction
$(f_N)$ of the total molecules ($N$)
being &quot;disordered&quot; by moving into holes, and then the entropy will be
$S=k_B\ln{N\choose f_N}$. Another
simplification ensues after we assume the liquid to be in the highest disordered
state possible and the change in
entropy per molecule will be $\Delta s\sim k_B\ln{2}$.</p>

<div class='figure'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Si-OCage.svg"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1.</span> Typical subunit for low pressure silicon dioxide.
    </div>
</div>
<p>There are three steps in the process now, first we need to detach single SiO$_2$
molecules from the lattice, but to
do that, we need to break bonds, or more accurately, overcome the binding energy of
the bonds. Finally, we need to
ask whether it is actually advantageous to completely detach every silica molecule
from the lattice.</p>
<p>Each oxygen atom is bounded to one silicon atom in the molecule, but in the lattice,
it is bounded to four silicon
atoms. So we first need to break $3/4$ bonds. But each oxygen atom is part of two
molecules, and so we&#39;re double
counting. Therefore, we only need to break $3/8$ bonds. </p>
<p>Next, from high school physics, we remember that breaking a bond at the Bohr radius
of $0.5$ Å is 13.6 eV. Silicon is
on the second row of the periodic table and so we can assume a linear addition of an
angstrom. And because two atoms
form a bond, the binding energy of a single bond is $$E_{b}\sim
Ry\cdot\frac{0.5\text{ Å}}{2\times1.5\text{
Å}}\sim2\text{ eV}.$$
But do we really want the binding energy? Breaking the lattice would mean
converting the crystal to a gas, but
we only want to achieve liquefaction. Assume that bond length changes by some
$p$ % where $p&lt;5$. Then we get
the new binding energy $$E_{b}\sim Ry\cdot\frac{0.5\text{
Å}}{2\times1.5\text{
Å}}\cdot\left(\frac{0.0p}{1.0p}\right)\sim0.1\text{ eV}.$$</p>
</p>

---
