---
title: Engine Efficiencies
subtitle: and my attempts to relearn thermodynamics
date: 2024-01-31 14:21:17 +0530
layout: default
keywords: physics
published: true
---

<p>Heat engines convert heat to energy, specifically mechanical energy, which can be
used to move stuff around
$(W=F\cdot\Delta x)$. It does this by using a substance to move things, while
cooling the substance. A heat source
initially heats the substance, the substance moves whatever it needs to move while
losing heat. This substance is
anything that has a heat capacity. Some heat is lost to the surroundings, and there
are practical issues of friction
and drag.</p>
<p>Note that heat pumps (refrigerators) do the exact opposite by performing work on a
substance. They usually compress
(do work) on a refrigerant (the working substance) and draw out heat. This is a
diversion I do not wish to explore.
</p>
<p>Carnot engines operate on the carnot cycle. The Carnot cycle has in order 1)
isothermal expansion, (where it expands
in volume by pulling in heat) 2) adiabatic expansion, (where it loses temperature
because all the heat has to be
dispersed among the expanding molecules) 3) isothermal compression (where it
compresses by expelling heat) and 4)
adiabatic compression where it gains temperature.</p>

<div class='figure'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Carnot_cycle_pV_diagram.svg"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1.</span> Pressure vs. Volume curve of the Carnot cycle.
    </div>
</div>

<div class='figure'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Carnot_cycle_ST_diagram.svg"/>
    <div class='caption'>
        <span class='caption-label'>Figure 2.</span> Entropy vs. Temperature curve of the Carnot cycle
    </div>
</div>
<p>Lets see what happens if $Q_C=0$ (which means our engine doesn&#39;t lose any waste
heat). Then we&#39;ll have
negative entropy because $\Delta S=\displaystyle\frac{-Q_H}{T_H}<0$ which violates
the second law of thermodynamics. Which means we have to consider waste heat. So
the maximum work we can get is $\Delta W=Q_H-Q_C$. Now, considering both
sources: $\Delta S=\displaystyle\frac{-Q_H}{T_H}+\displaystyle\frac{Q_C}{T_C}$
and we know that $\Delta S>0$. For the entropy to be positive, the minimum value
of $Q_C$ will be
$\displaystyle\frac{Q_H}{T_H}T_C$ and this means that $$\Delta
W=Q_H\left(1-\displaystyle\frac{T_C}{T_H}\right)$$.
</p>
<p>This means we can&#39;t have 100% efficiency because we can&#39;t exhaust the heat
sink to 0 K, and we will
definitely lose waste heat to the universe due to the second law of thermodynamics.
Also, this is a purely
theoretical concept, taking a Carnot cycle through its steps without losing any
additional energy will require us to
do it infinitely slowly, and it is impractical to build an engine that takes forever
to do its job. Another way to
think of the whole entropy argument before is to look at the S-T diagram and realize
that for the cycle to complete
we need to gain back all the entropy we lost.</p>
<p>Bonus: TIL Diesel is apparently the name of a dude called Rudolf Diesel who invented
the Diesel Engine that runs on
Diesel.</p>

---
