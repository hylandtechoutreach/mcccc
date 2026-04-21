# Music Programming
This lesson introduces music and uses Strudel to show how it is possible to create music using code.

**❗IMPORTANT:** Before starting the session, make sure each student has headphones/earbuds!

### Agenda

| Activity | Time |
|-|-|
| Warm-Up | 15m |
| Presentation | 30m |
| Strudel Demo | 15m |
| Break | 15m |
| Self-Paced Time | 30m |
| Gimkit | 15m |

## Warm-Up: Song Maker
Students should open [song maker](https://musiclab.chromeexperiments.com/Song-Maker/) and start making songs. After ~10 minutes, they should all submit their songs using the Sharing Form linked from the homepage. Listen to each of the songs as a group.

## Presentation
Present the [PowerPoint](MusicProgramming.pptx). This is a mix between facts and demonstrations, with some room for interactivity. There are several activities built into the presentation.

### Making Music with A.I. (Google Music FX DJ)
Go to [Google Music FX DJ](https://labs.google/fx/tools/music-fx-dj) and ask students for prompts. Build up something that sounds like something. The point here is that it's kind of cool, but tools like this give you no control or understanding or avenues for actual creativity.

### Shared Piano
Have the students go to [short.hyland.com/piano](https://short.hyland.com/piano) to join the live piano playing activity. This may sound like chaos, but it will be organic and authentic.

### Pitch Table
For the [pitch table](https://chromatone.center/practice/pitch/table/), have the students shout out random pitches to add to see how they sound together.

### Theory: Virtual Piano
In the theory section, open the [virtual piano](https://www.onlinepianist.com/virtual-piano) to demonstrate the concepts from the subsequent slides. For example, play octaves, or a major chord.

## Strudel Demo: Add a Lead
For this part, quickly walk through a bit of the [Strudel tutorial](https://strudel.cc/workshop/getting-started/), and then get into the playground. Make sure the students don't start coding yet! As a basic first activity, add a new part to the song: a lead. It can just be a few simple notes. Here is one example:

```js
$: n("<3@2 3 4 3 2 1 0 1@2 1 2 1@2 1 2>*4".add("-1")).anchor("c3").scale("C:major").sound("gm_accordion").gain(3)
```

From there, set the students free! Leave it up to them to try to start figuring out how to mess with the code. Explain that **variables** control the various attributes of the different tracks for the song.

## Formative Assessment: Gimkit
Close the session with a [Gimkit quiz](https://www.gimkit.com/view/69e683ca2a29490be81e6f96).
