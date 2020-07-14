---
waltz:
  title: Educational Game Design Document Template
meta:
  version: 0.0.2
  gdd authors:
    - Zihan Wu
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Overview

*Simulation to familarize students with glassware*

## Core Gameplay Mechanics (Brief)

*Give a very high-level description of any core gameplay mechanics*

- *Choose glassware*
- *Interact / click add water with glassware*

# Learning Aspects

## Learning Domains

*Chemistry, lab equipment*

## Target Audiences

*College general chem students*

## Target Contexts

*Before lab time to get an idea of what the lab will be like.*

## Learning Objectives

*Remember, Learning Objectives are NOT simply topics. They are statements of observable behavior that a learner can do after the learning experience. You cannot observe someone "understanding" or "knowing" something.*

- *Students will be able to recognize and name more glassware.*
- *Be able to read glassware measurements correctly (meniscus, units)*
- *Can determine which wares should be used for specific scenarios - like if you want to get this amount of liquid, which tool would be better to use*
- *_Not sure if should include precision vs accuracy here or if this should just introduce how to use the glassware_*

## Prerequisite Knowledge

*What do they need to know prior to trying this game?*

- *Know basic subtraction/addition and units of measurement*

## Assessment Measures

*Describe how the learning will be assessed, e.g., pre/post multiple-choice test, or SAT, or some other instrument.*

- *What is the name of this piece of glassware?*
- *Given a pipet how would you use it?*


# Player Interaction Patterns and Modes

## Player Interaction Pattern

*One user can follow the minimal instruction on screen and click/drag where highlighted to interact.*

## Player Modes

- *Glassware selection*: *Pick a tool to use / learn about.*
- *Measurement*: *Use the tool picked to measure out a target amount?*

# Gameplay Objectives

- *To transfer and weigh water and find the volume of the water*

# Procedures/Actions

*Idea is to have a selection menu of glassware that one can click to zoom in and operate closer. Each piece in detail should clearly present the name and maybe a quick blurb about what it's usually used for. A glass on a zeroed scale. Users can use the glassware to measure out a specific amount told and weigh it. (pour or pipette water) Maybe a notepad on side that auto records the mass and there can be a note about D = M/V to calc the volume. MVP would be a beaker vs pipet probably?*

# Rules

*What resources are available to the player that they make use of?  How does this affect gameplay?*

# Objects/Entities

*What other things are in the world that you need to design?*
*The scale, all the glassware, possibly a notes section.*

## Core Gameplay Mechanics (Detailed)

  - *Take up water*
    - Details: *Use mouse in some way to pour/get water into glassware. Graphically this might be a bit tricky if the glassware not uniform shape.*
  - *Weigh and determine volume*
    - Details: *Scale gives back a number once you put water in the glass on it*
    - How it works: *Scale readings can correspond to lines on the glass readings easily - maybe with some randomness.*

## Feedback

*Explicitly describe what visual/audio/etc. indicators there that give players feedback on their progress towards their gameplay objectives (and ideally the learning objectives).*

- *Water level rising when you use the glassware*
- *Once measured on scale, tells user if it was on mark or not*

# Story and Gameplay
![Storyboard](glassware_storyboard.png) 

## Gameplay (Brief)

*The Summary version of below*

## Gameplay (Detailed)

*Go into as much detail as needs be. Spare no detail. Combine this with the game mechanics section above*

# Assets Needed

## Graphical

- Textures:
  - *Water*
- Environment Art/Textures:
  - *All the glassware types (ask)*
  - *Scale*
  - *Table*

## Audio

*Game region/phase/time are ways of designating a particularly important place in the game.*

- Music List (Ambient sound)
  - *General calm background music or no bg music*
  
*Game Interactions are things that trigger SFX, like character movement, hitting a spiky enemy, collecting a coin.*

- Sound List (SFX)
  - *Pouring water sound*
  - *Some clinking sounds ideally*
