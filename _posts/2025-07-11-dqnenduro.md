---
permalink: 2025/07/11/dqnenduro
title: A Deep Q-Network learns to play Enduro 
subtitle: Implementing the first Deepmind papers on deep reinforcement learning and realizing that the Sutton-Barto textbook is a masterpiece in technical pedagogy. 
date: 2025-11-02 12:20:10 +0530
layout: default
keywords: deep learning, reinforcement learning
categories: nn
published: true
---

_Update (Nov. 2, 2025): Added some notes from the textbook_

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

```PlainText
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

## Notes

Markov Decision Process $\rightarrow$ memoryless, choose action.

<div class='figure'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Markov_Decision_Process.svg/600px-Markov_Decision_Process.svg.png"/>
    <div class='caption'>
        <span class='caption-label'>Figure 1.</span> Example of a simple MDP with three states (green circles) and two actions (orange circles), with two rewards (orange arrows)
    </div>
</div>

From this, a sequence or trajectory is the set $$\left\{S_0,A_0,R_1,S_1,A_1,R_2,S_2,A_2,R_3,\dots\right\}$$

#### Non-Discounted Return ($G_t$)

The non-discounted return is the sum of rewards from time step $t+1$ up to the final time step $T$:

$$
\text{Return } G_t = R_{t+1} + R_{t+2} + R_{t+3} + R_{t+4} + \cdots + R_T
$$

The **recursive definition** (Bellman equation for the return) is:

$$
G_t \doteq R_{t+1} + G_{t+1}
$$

#### Discounted Return

The discounted return sums rewards from $t+1$ to infinity, applying a discount factor $\gamma$ ($\gamma \in [0, 1]$) to future rewards:

$$
\text{Discounted Return } G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots
$$

This is the **compact summation form**:

$$
G_t \doteq \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}
$$

And the crucial **recursive Bellman definition** for the return:

$$
G_t \doteq R_{t+1} + \gamma G_{t+1}
$$

#### Unified Return Notation

This notation defines the discounted return over a finite episode ($T$) by including the discount factor and aligning the reward index $k$ with the time step:

$$
G_t \doteq \sum_{k=t+1}^{T} \gamma^{k-t-1} R_k
$$

Value functions estimate how good it is for an agent to be in a given state (state value function) or how good it is to perform an action in a given state (state-action value function)

A policy is a mapping from states to probabilities of selecting each action. If an agent is following policy $\pi$ at time $t,$ then $\pi(a\|s)$ is the probability that $A_t=a$ if $S_t=s.$

#### Value Functions for a given Policy $\pi$

##### State-Value Function ($v_\pi$)

The state-value function for a policy $\pi$ is defined as the expected return starting from state $s$ and following policy $\pi$ thereafter:

$$
v_\pi(s) \doteq E_\pi [G_t \mid S_t = s], \quad \text{for all } s \in \mathcal{S}
$$

##### Action-Value Function ($q_\pi$)

The action-value function for a policy $\pi$ is defined as the expected return starting from state $s$, taking action $a$, and following policy $\pi$ thereafter:

$$
q_\pi(s, a) \doteq E_\pi [G_t \mid S_t = s, A_t = a]
$$

##### Bellman Expectation Equation for $v_\pi$

The Bellman Expectation Equation for $v_\pi$ relates the value of a state to the values of the successor states.

$$
v_\pi(s) \doteq E_\pi [R_{t+1} + \gamma v_\pi(S_{t+1}) \mid S_t = s]
$$

This equation can be expanded into a summation over all possible next actions ($a$), next states ($s'$), and rewards ($r$):

$$
v_\pi(s) \doteq \sum_{a} \pi(a \mid s) \sum_{s', r} p(s', r \mid s, a) [r + \gamma v_\pi(s')] \quad \forall s \in \mathcal{S}
$$

#### Optimal Value Functions (Bellman Optimality Equations)

##### Optimal State-Value Function ($v_*$)

The optimal state-value function is the maximum value achievable from state $s$ under any policy. The Bellman Optimality Equation for $v_*$ selects the action $a$ that yields the best expected outcome:

$$
v_*(s) \doteq \max_{a} \sum_{s', r} p(s', r \mid s, a) [r + \gamma v_*(s')]
$$

##### Optimal Action-Value Function ($q_*$)

The optimal action-value function is the maximum expected return achievable from state $s$ after taking action $a$:

$$
q_*(s, a) \doteq \sum_{s', r} p(s', r \mid s, a) [r + \gamma \max_{a'} q_*(s', a')]
$$

#### Temporal Difference Learning

Temporal difference methods don't need a model of the environment; only of its rewards. They are implemented in a fully incremental way.

$$
V(S_t)\leftarrow V(S_t)+\alpha[G_t-V(S_t)]
$$

#### SARSA (On-Policy TD Control) for Estimating $Q \approx q_\pi$

SARSA is an **on-policy** algorithm because it uses the same policy (derived from $Q$, often $\epsilon$-greedy) to select both the action to execute ($A$) and the next action to evaluate ($A'$).

##### Algorithm Pseudocode

* **Algorithm parameters:** $\alpha \in (0, 1]$, small $\epsilon > 0$
* **Initialize:** $Q(s, a) \ne 0$ for all $s \in \mathcal{S}, a \in \mathcal{A}$ arbitrarily, except for $Q(\text{terminal}, \cdot) = 0$.
* **Loop for each episode:**
    1.  Initialize $S$.
    2.  Choose $A$ from $S$ using policy derived from $Q$ (e.g., $\epsilon$-greedy).
    3.  **Loop for each step of episode:**
        * Take action $A$, observe $R, S'$.
        * Choose $A'$ from $S'$ using policy derived from $Q$ (e.g., $\epsilon$-greedy).
        * **Update $Q(S, A)$:**
            $$
            Q(S, A) \leftarrow Q(S, A) + \alpha [R + \gamma Q(S', A') - Q(S, A)]
            $$
        * $S \leftarrow S'$; $A \leftarrow A'$.
    4.  **until** $S$ is terminal.

##### SARSA Update Equation

The SARSA update rule is:

$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t)]
$$

#### Q-Learning (Off-Policy TD Control)

Q-Learning is an **off-policy** algorithm. It uses a different policy for action selection (behavior policy, e.g., $\epsilon$-greedy) and for evaluation (target policy, which is always greedy).

##### Q-Learning Update Equation

The Q-Learning update rule uses the maximum expected future return, making the target independent of the action actually taken ($A'$), which is why it is off-policy:

$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [R_{t+1} + \gamma \max_{a} Q(S_{t+1}, a) - Q(S_t, A_t)]
$$

**Note:** The $\max_{a}$ part corresponds to a greedy choice (the target policy), whereas the initial choosing of $A_t$ for execution can be $\epsilon$-greedy (the behavior policy).

The stepsize $\alpha$ should be decayed as time progresses so the agent doesn't jump into other states when you're expecting it to converge.

A good rule for the step-size schedule, $\alpha_t(s, a)$, to guarantee convergence (specifically for stochastic approximation methods, often referred to as the Robbins–Monro conditions) is that the step-size must satisfy two main properties (I learnt this from watching the 2021 Foundations of Deep RL series by Pieter Abbeel):

The sum of the step-sizes must diverge (to ensure the algorithm can overcome initial conditions and reach the target):

$$
\sum_{t=0}^{\infty} \alpha_t(s, a) = \infty
$$

AND the sum of the squares of the step-sizes must converge (to ensure that the updates eventually become small enough to stop oscillating around the target):

$$
\sum_{t=0}^{\infty} \alpha_t^2(s, a) \lt \infty
$$

A common example of a step-size schedule that satisfies both conditions is setting $\alpha_t$ proportional to $1/t$.

#### Deep Q-Network (DQN) Code Structure

A scratchpad before I start implementing everything...

##### Top-Level Training Loop

- `train()`
    - Initializes the DQN agent.
    - Calls `DQN Agent()`

##### DQN Agent Class

- `DQN Agent()` // Initialize DQN agent.
    - Calls `DQN()` (to set up the neural networks).
    - Contains logic for exploration (e.g., $\epsilon$-greedy).
    - Calls `Replay Buffer()` methods.

##### DQN Network Class

- `DQN()` // Initialize policy and target networks.
    - Initializes **policy network** (the Q-network used for action selection and training).
    - Initializes **target network** (a delayed copy of the policy network, used for stable Q-value calculation, with $N$ action outputs).
    - **`select_action()`**: Uses the policy network to choose an action (often $\epsilon$-greedy).
    - **`optimize_model()`**: Performs the gradient descent step to update the policy network weights.

##### Replay Buffer Class

A memory structure that stores past experiences (S, A, R, S', Done) to break temporal correlation during training.

- `Replay Buffer()`
    - Implemented as a **double-ended queue (`deque`)** for efficient removal of the oldest element and addition of new elements.
    - **`deque()`** // Double-ended queue data structure.
    - **`push()`**: Adds a new experience tuple to the buffer.
    - **`sample()`**: Randomly selects a batch of experiences for training.
    - **`len()`**: Returns the current number of experiences in the buffer.

---
