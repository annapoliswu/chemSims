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

Simulation to familarize students with glassware

## Core Gameplay Mechanics (Brief)

- Take up water
- Weigh water on scale
- Notes and calculations on mass -> volume

# Learning Aspects

## Learning Domains

Chemistry, lab equipment

## Target Audiences

College-aged, general chemistry students

## Target Contexts

Before lab time, to get an idea of what the lab will be like.

## Learning Objectives

- Students will be able to recognize and name more glassware.
- Be able to read glassware measurements correctly (meniscus, units)
- Can determine which wares should be used for specific scenarios - like if you want to get this amount of liquid, which tool would be better to use
- _TODO: Not sure if should include precision vs accuracy here or if this should just introduce how to use the glassware_

## Prerequisite Knowledge

- Students should be able to do basic subtraction/addition with units of measurement

## Assessment Measures

- What is the name of this piece of glassware?
- Given a pipette how would you use it?

# Player Interaction Patterns and Modes

## Player Interaction Pattern

One user can follow the minimal instruction on screen and click/drag where highlighted to interact.

## Player Modes

- Glassware selection: Pick a tool to use / learn about.
- Measurement: Use the tool picked to measure out a target amount?

# Gameplay Objectives

- To transfer and weigh water and find the volume of the water.

# Procedures/Actions

Idea is to have a selection menu of glassware that one can click to zoom in and operate closer.

Each glassware piece in detail should clearly present the name and a quick blurb about what it's usually used for.

There is a glass on a zeroed scale and users can use the glassware to measure out a specific amount into the glass to weigh it. 

Actions for measuring out water using the pipettes would be different from more container-like glassware. 

Maybe include a notepad on side that auto records the mass and there can be a note about D = M/V to calculate volume from mass.

_TODO: Minimum viable product would probably be a beaker vs pipette? If pipetting and pouring are the only 2 actions needed to measure out water._

# Objects/Entities

* The scale
* All the glassware
* Possibly a notes section.

## Core Gameplay Mechanics (Detailed)

- Take up water
    - Details: Use mouse in some way to get water into glassware. Actions for taking up the water for pipettes vs for other glassware would have to be different. Graphically  might be a bit tricky if the glassware not uniform shape.
- Weigh and determine volume
    - Details: Scale gives back a number once you put water in the glass on it
    - How it works: Scale readings can correspond to lines on the glass readings easily - or could be fixed with some randomness.
- Calc mass -> volume
    - Details: A notes section after the weighing with formulas and a guide to how to calc.
    - How it works: Could autofill once everything is over or a fill in the blank type section

## Feedback

- Water level rising when you use the glassware.
- Warnings and prompts to retry the "taking up water" section if user sets pipettes wrong or poors way past target amount.
- At end, tells user how close to target amount.

# Story and Gameplay
![Storyboard](glassware_storyboard.jpg) 

# Assets Needed

## Graphical

- Textures:
  - Water
- Environment Art/Textures:
  - All the glassware types (TODO: What specific glassware types will we need?)
  - Scale
  - Table

## Audio
  
- Sound List (SFX)
  - Pouring water sound
  - Some clinking glass sounds ideally
