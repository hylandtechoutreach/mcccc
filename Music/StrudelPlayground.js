// TOP LEVEL STUFF
const TEMPO = 120;
const CHORD_PROGRESSION = "<C G Am F>"; // Try changing some of the chords to things like: Dm Em F G Am E Fm D Gm

// BAS STUFF
const BASS_INSTRUMENT = "saw";
const BASS_VOLUME = slider(0);

const BASS_SPEED = 1;
const BASS_HEIGHT = 3;

const BASS_FILTER = slider(12000, 1000, 12000);


const BASS_ATTACK = slider(0);
const BASS_DECAY = slider(1, 0, 1);
const BASS_SUSTAIN = slider(0, 0, 1);
const BASS_RELEASE = slider(0, 0, 2);


// ARP STUFF
const ARP_INSTRUMENT = "supersaw"
const ARP_VOLUME = slider(0);

const ARP_HEIGHT = 0;
const ARP_SPEED = 1;

const ARP_FILTER = slider(12000, 1000, 12000);


const ARP_ATTACK = slider(0, 0, .2);
const ARP_DECAY = slider(1, 0, 1);
const ARP_SUSTAIN = slider(0, 0, 2)
const ARP_RELEASE = slider(0, 0, 2)

const ARP_DELAY = 0; // try .9 or mousey
const ARP_VIB = 0; // try 9 or mousex

// BEAT STUFF
const BEAT_VOLUME = slider(0);
const beats = [
`
[[hh hh] hh hh hh] [hh hh [hh hh] hh] [hh hh hh hh] [hh [hh hh] hh hh ],
[-  -  cp  - ] [ -  - cp  - ] [-  - cp  - ] [- - cp  - ],
[bd - bd  - ] [bd   -  bd - ] [bd - bd - ] [bd  -  bd  - ]
`,
`
[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh ],
[-  -  -  - ] [cp -  -  - ] [-  -  -  - ] [cp - -  - ],
[bd - -  - ] [bd  -  - - ] [bd - - - ] [bd  -  -  - ]
`,
`
[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh hh hh ],
[-  -  -  - ] [- -  -  - ] [cp  - cp  - ] [- - -  - ],
[bd - bd  - ] [-  -  - - ] [- - - - ] [-  -  -  - ]
`,
]

const BEAT = beats[1];
const BEAT_BANK = "RolandTR909";



// Doing Stuff

setcpm(TEMPO/4)

const bass_fast = Math.pow(2, BASS_SPEED);
const arp_anchor = 60 + 12 * ARP_HEIGHT;

const bass_pattern = "[1]".fast(bass_fast);

$: n(bass_pattern)
  .chord(CHORD_PROGRESSION)
  .mode("duck")
  .anchor("a3")
  .rootNotes(BASS_HEIGHT)
  .lpf(BASS_FILTER)
  .attack(BASS_ATTACK)
  .decay(BASS_DECAY)
  .sustain(BASS_SUSTAIN)
  .release(BASS_RELEASE)
  .gain(BASS_VOLUME)
  // .euclid(10, bass_fast)
  .color("blue")
  .s(BASS_INSTRUMENT)
  ._spectrum()

$: n("-1 | 0 | 1 | 2 | 3 | 4 | 7")
  .fast(ARP_SPEED*4)
  .vib(ARP_VIB)
  .chord(CHORD_PROGRESSION)
  .mode("duck")
  .anchor(arp_anchor)
  .lpf(ARP_FILTER)
  .attack(ARP_ATTACK)
  .decay(ARP_DECAY)
  .sustain(ARP_SUSTAIN)
  .release(ARP_RELEASE)
  .voicing()
  .gain(ARP_VOLUME)
  .s(ARP_INSTRUMENT)
  .delay(ARP_DELAY)
  .superimpose(x=>x.add("2,1"))
  // .ply("<1 2>")
  //.jux(rev)
  .color("lime")
  ._pitchwheel()

$: s(BEAT)
  .bank(BEAT_BANK)
  .gain(BEAT_VOLUME)
  .color("red")
  ._pianoroll()
