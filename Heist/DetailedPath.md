# Detailed Path to Each Key
The idea is that there is one primary entry and exit point, but there are various paths throughout so multiple students can work on different areas of the puzzle. Learn how each puzzle can be solved below.

## BOX A: Paper Puzzles (2795)
There are four puzzles - each provide a digit for the BOX A COMBO. This is the true starting point, as these puzzles are the only clear tasks provided at the start.

### The First Digit
To find the first digit, fill in the grid using the `(x,y)` coordinates provided. This is a cartesian plane, but the game development version. The `x` goes from around `0` to `50` from left to right, and the `y` goes from around `0` to `50` from top to bottom. Filling in each square reveals that the number is **2**.

_Hints: X and Y axis, number each square, brute force_

### The Second Digit
To solve the second puzzle, evaluate the JavaScript code. This can be done by typing out everything manually (tedious but easy), or walking through it (interesting but difficult). Running the code will log a number to the console - that number is **7**.

_Hints: Figure out the language, Evaluate the code_

### The Third Digit
The third puzzle is a ROT-12 cipher. Each letter corresponds to another letter, 12 up in the alphabet. Participants can enter the encoded message into a decoder site, or they can try to parse it out manually. When they decode the whole message, they will find that the digit is **9**.

_Hints: Look for a number (that number is 2 digits, so is not the puzzle digit), Try to find a pattern, Encode/Decode_

### The Fourth Digit
The fourth puzzle is a logic question. The answer to the question can be parsed out with a truth table or something similar. Since Nicole says she was lying yesterday, there are two options: 1) she is lying TODAY, and was telling the truth yesterday, or 2) she is telling the truth TODAY and WAS lying yesterday. In option 1, we know it must be Monday - the only day she would lie AND have told the truth yesterday. In option 2, we know it must be Thursday - the only day she would tell the truth AND have lied yesterday. Applying the same logic for Emi, there are again two options: 1) she is lying - it must be Thursday, or 2) she is telling the truth - it must be Sunday. The only overlap is Thursday. Thursday is the FIFTH day of the week (despite what the British might say), so the digit is **5**.

_Hints: Truth table, Process of elimination, Narrow possibilities, What digits are days of the week_

## BOX B: DVD -> Projects (3334)
The entry point for finding the combination for BOX B is the DVD that was inside of BOX A (TODO: Make video). When played, it will reveal the URL for the Projects Site: [https://hylandtechoutreach.github.io/hf8S47hfo2/](https://hylandtechoutreach.github.io/hf8S47hfo2/)

The goal for this site is for students to explore the various projects, and try to find the four digits for BOX B. The digits can be found as follows:

1. [block removal](https://trinket.io/processing/24dd29103ab1) - play the game and beat it, OR change the code to reveal `level4`
1. [squirrels](https://trinket.io/pygame/3094f7c20f93) - in the code, change the `ANIMAL` variable to `"frog"` and then beat the game
1. [embers](https://hytop.onrender.com/e/embers-2) - scroll to the bottom of the **script.js** file to see the secret message
1. [minor chord progression](https://tunepad.com/project/117468) - play the song, and either change the tempo, or change the code to make the spoken message longer

## BOX C: ASCII -> Decoded Message -> MIDTOWN22 PC -> Platformer Game -> MP3 Player -> Melody Combo (2375)
This box has quite a few twists and turns!

### Step 1: ASCII
In BOX A, there is a physical jigsaw puzzle that, when solved, reveals a QR code pointing here: [https://hytop.onrender.com/pf/ascii-table](https://hytop.onrender.com/pf/ascii-table)

Also, there is a jumble of numbers on a sheet ([BoxCAscii.docx](BoxCAscii.docx)). Each number is the ASCII code for a symbol.

The students should translate the numbers on the sheet using the ASCII table from the QR code to reveal the message. That message should point them to MIDTOWN22.

### Step 2: MIDTOWN22
On the MIDTOWN22 PC, there should be a file in the Recycling Bin. That file should contain a shortcut to this game: [https://hytop.onrender.com/pf/reuhfrehf/](https://hytop.onrender.com/pf/reuhfrehf/)

The students should play the game, and must score **8000** or higher to reveal the next clue: the code to unlock the MP3 Player.

_Note: there are additional hints if the students keep decoding the ASCII message. They will definitely have to change the variables in the game in order to beat the score of 8000. They can also try to hack the code of the game at [https://hytop.onrender.com/e/reuhfrehf/](https://hytop.onrender.com/e/reuhfrehf/)._

### Step 3: MP3 Player (10 01 10)
In Box A, there is also an MP3 Player, locked with a passcode. After scoring 8000+ in the Platformer Game, this passcode will be revealed.

On the player, there is the [Mp3Melody.wav](Mp3Melody.wav) file - this plays through a C Major Scale, and then plays four notes. Those four notes, in the intervals of the scale, translate into the four digits of the combination: `1,2,3,4,5,6,7,8 ... _,_,_,_`

## BOX D: Various Locations (0258)
The digits for the BOX D COMBO are scattered in various places. Each of them appears in a monospace green font. Based on the hint in the instructions, they should be entered in ascending order. The locations are:

1. In the Platformer Game (TIME BONUS - **0**)
2. In the Presentation (Slide 10 - frame 14**2**)
3. On the Number Sheets on the wall (only dark green monospace number - **5**)
4. In the instructions (**8** total keys)

## CRYPTEX: E L E V E N
In BOX A, there is a cryptex locked by a letter-based code. The cryptex code can be revealed through various means, depending on the hints. The two primary hints are hidden in diversion safes that are in the classroom:

- **Green Sharpie:** the word "Binary"
- **Blue Water Bottle:** 1011

Combining those two clues, translating `1011` from binary into decimal, the answer is `11` or (`E L E V E N`).

Additional clues are scattered to help students discover the two diversion safes.

## KEY-AT-LARGE: Under MIDTOWN11
The hidden key should be under the desk of the MIDTOWN11 PC.

## FACILITATOR'S KEY: Thank You Note
In order to obtain this key, a student will have to write a nice hand-written thank you note to a facilitator. Nicole officially holds this key. The students are welcome to attempt to use social engineering to try to get the key from her or from any facilitator.

## CHOSEN ONE'S KEY: Swag Bag 4
The key given to a random student will be contained in Swag Bag 4. The student might not notice it right away, but once they know it's out there, it should be pretty easy to find.
