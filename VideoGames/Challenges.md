# Challenges
Complete any of the following challenges that seem interesting. Start with the code from the [code-along activity](CodeAlong.md), and then take a look at the ideas below.

Feel free to get creative and create something else too! It is recommended to start with the Basic Challenges, and then decide whether to move on to the Other Challenges or the Advanced Challenges.

## Basic Challenges
These challenges are fairly basic, so they are a good starting point.

### Basic 1: Add a New Background Image
In the "Scene" category, there is a `set background image` block. Drag it into the `on start` block, and click the blank spot to open the Background Image Editor!

### Basic 2: Create a New Tilemap
Edit the tilemap to make a new challenge for the player! To make a longer level, update the horizontal size of the tilemap.

### Basic 3: Change the Jump Height
Find the code that makes the main character jump, and figure out how to jump higher!

### Basic 4: Add a Countdown
In the "Info" category, there is a `start countdown` block. Drag it into the `on start` block to add a countdown to the game. When the countdown reaches zero, the player will lose! Update the length of the countdown so the game is still winnable.

### Basic 5: Add a Startup Melody
In the "Music" category, there is a `play melody` block. Drag it into the `on start` block to add a melody that plays before the game begins! Click the blank music section to create the melody, or choose from the gallery of existing melodies. Set the tempo too!

## Other Challenges
These challenges are separate from the platformer game, but they are related to retro game development.

### Option 1: Hack Another Platformer
[Click here for another Platformer game](https://glitch.com/edit/#!/remix/platformer-hacker). This game is written in JavaScript, and it lives somewhere different, but it is still a platformer!

1. Open up the preview for the game
1. Play the game
1. Try to get a high score

To hack the game, open up the **variables.js** file, and try to change the numbers to get a higher score!

### Other 2: Piskel
[Piskel](https://www.piskelapp.com/) is a website that lets artists create pixel art! It is free to use, and it can be a lot of fun to design sprites and animations.

Visit the website and look at some of the examples, or click "Create Sprite" to start creating a sprite.

[This video](https://www.youtube.com/watch?v=VMkvVmAQBd0) and the other videos in the series can be helpful to get started making pixel art with Piskel.

### Other 3: More MakeCode Arcade Tutorials
MakeCode Arcade has a bunch of great [tutorials](https://arcade.makecode.com/tutorials) for all types of retro games!

Visit the website to explore some of the possibilities.

### Other 4: Whatever!
Add some completely different stuff to the platformer game, or create an entirely new game! Almost anything is possible; it's all about learning how to do it.

## Advanced Challenges
These challenges are a little more advanced, so they can be fairly difficult!

### Advanced 1: Update the Main Character Sprite Animation
Update the frames of the main character sprite animation! Start by opening the [Animated Game](https://makecode.com/_3wXbAr715Myi), and click the "Edit Code" button at the top.

For the new template, find the `Main Character Image` variables and update each of them:

![](https://i.imgur.com/SQ3uhRy.png)

### Advanced 2: Add Background Music

1. From the "Loops" category, drag a `forever` block into the **Code** section
1. In the "Music" category, drag a `play melody` block ito the `forever` block

This will make the melody repeat forever!

### Advanced 3: Add a Points System

1. In the "Info" category, click and drag a `set score to 0` block into the `on start` block
1. Edit the tilemap to add a new type of tile that will give the character a point (a coin, a star, a ring, something like that)
1. From the "Scene" category, drag an `on sprite of kind player overlaps` block to the **Code** section
1. Click the drop-down arrow next to `overlaps` and select the point up tile
1. In the "Info" category, click and drag a `change score by 1` block into the new `overlaps` block
1. In the "Scene" category, under Tiles, click and drag a `set [] at tilemap` block into the new `overlaps` block
1. Click and drag the `location` from the `overlaps` block into where the `tilemap` coordinates are

![](https://i.imgur.com/UgkN28V.png)

### Advanced 4: Add an Infinite Jump Power-up
A lot of this is very similar to the points system - adding a new tile to the tilemap, and making something happen when the main character overlaps it. The new part is the `Infinite Jump` variable. The `Infinite Jump` variable will be either `true` or `false` - it will change based on the gameplay.

1. In the "Variables" category, click the "Make a variable..." button to make a new variable named `Infinite Jump`
1. Drag a `set mySprite to 0` block into the `on start` block
1. Change `mySprite` to `Infinite Jump`
1. In the `Logic` section, scroll down to find the `<false>` block and drag it into the `0` in the `set Infinite Jump to` block
    - This means that `Infinite Jump` will be turned off to start the game
1. Edit the tilemap to add a new type of tile that will give the player a power-up (a mushroom, a flower, a cherry, something like that)
1. From the "Scene" category, drag an `on sprite of kind player overlaps` block to the **Code** section
1. Click the drop-down arrow next to `overlaps` and select the power-up tile
1. From the "Variables" category, drag a `set mySprite to 0` block into the `overlaps` block, but make it set `Infinite Jump` to `<true>`
1. In the "Scene" category, under Tiles, click and drag a `set [] at tilemap` block into the new `overlaps` block
1. Click and drag the `location` from the `overlaps` block into where the `tilemap` coordinates are
1. In the jump code, drag an `< or >` block from the "Logic" category into the `if` block
1. For one side of the `or`, drag back the `is Main Character hitting wall bottom` block
1. For the other side, drag in the `Infinite Jump` block from the "Variables" category

Now, the main character can jump if they are on the ground _or_ `Infinite Jump` has been enabled by the power-up!
