<h1 align="center" style="margin-bottom: 0">
    <strong>Shipwrecked</strong>
</h1>

<h5 align="center">
    <strong>and other stuff I did</strong>
</h5>

*First off...*
# What is shipwrecked?

Shipwrecked was the worlds **first** hackathon hosted on an island! It was a story-based programming event that required building 3 projects in order to "save" the island from a monster.

*So what did I make?*

# Projects
## Project 1

> Prompt: Make a game/app purely using colors, patterns, and sounds.

I designed a relatively simple party-game called [tone-match](https://github.com/Cattn/tone-match). Each player is assigned a random "match". Each pair has the same color and audio tone assigned to them. The goal is to find your match as quick as you can in the crowd, and have one person play/record the tone to verify the match!

For this project, I used plain js/html for the realtively simple client, and then a typescript-based socket\.io server to power the multiplayer aspect. 

> Example screen of a player.

<img width="400" src="https://play.maple.music/SMS/uploads/matchss.png">

## Project 2

> Prompt: Make a multiplayer game/app for 3+ players

To clarify, the prompts were not revealed beforehand. That being said, my last project gave me a pretty good head-start going into this project. I was able to re-purpose a lot of the same backend & game structures I used in the last project, making boilerplate-style code much quicker to write. Because of this, I was able to create a much larger project with a wider scope.

I made a wii/xbox kinnect inspired game called [wreckedship](https://github.com/Cattn/wreckedship). 

<h4><em>soooo, how does it work?</em></h4>

The basic goal of the game is to work in a group of 2-3 to get your ship to safety. There's three roles: **Captain**, **Shooter**, and the **Enemy** (I'll discuss this one later).

Players must physically move left to right in order to pilot the ship, shoot their cannon, or perform actions. The **captain** must steer the ship away from all of the rocks, prevent a crash. Both **shooters** must lookout for monsters trying to attack the ship. Upon spotting one, they must aim their cannon at it, and then fire.

<h4><em>controls?</em></h4>

This first half of the control scheme is based off of the Xbox Kinnect control scheme, requiring players to move physically to accomplish tasks within the game. I did this using [pose.js with mediapipe](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/web_js). 

The second half of the control scheme is based off of a wiimote, requiring players to pair their phone to their computer (via a QR code), and then making use of internal gyro sensors to detect when, and what direction a user has shook their phone.

For example, if you'd like to fire the cannon as a shooter, you must first move into position, and then shake your phone forward. This creates an immersive and challenging experience, requiring players to focus on both elements.

<h4><em>what about the enemy?</em></h4>

If you have a 4th player, they will become **the Enemy**. They're given the power of the sea, and the ability to shift monsters coming at players, making them much more difficult to hit. This creates a unqiue gameplay loop anytime a group plays.

I came up with this concept while play-testing my game, as I realized that 3 shooters, or a "map" based character would be too boring, and decrease replayability.

<h4><em>other info?</em></h4>

I created all of the assets myself for this project (except for the background)! Some where rough outlines of existing creatures, or in one case (the ship) a recreation of the official shipwrecked ship. I've shown some below.

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="900" alt="cannon" src="https://raw.githubusercontent.com/Cattn/wreckedship/refs/heads/main/client/sprites/cannon.png">  cannon |  <img width="900" alt="monster" src="https://raw.githubusercontent.com/Cattn/wreckedship/refs/heads/main/client/sprites/monster.png"> monster |<img width="900" alt="rock" src="https://raw.githubusercontent.com/Cattn/wreckedship/refs/heads/main/client/sprites/rock.png"> rock |
|<img width="1604" alt="ship" src="https://raw.githubusercontent.com/Cattn/wreckedship/refs/heads/main/client/sprites/ship.png"> ship |  <img width="1604" alt="waves" src="https://raw.githubusercontent.com/Cattn/wreckedship/refs/heads/main/client/sprites/waves.png"> waves |

> Screenshot of the game page

<img src="https://play.maple.music/SMS/uploads/wreckedshipss.png">

> Screenshot of a phone "controller"

<img src="https://play.maple.music/SMS/uploads/wreckedshipcontroller.png">

## Project 3

> Prompt: Build the most COLORFUL game/app/site possible

The first thing that came to my mind when I heard this prompt was: HDR. HDR content, and how phones handle it, has always interested me. There's so many quirks on each platform, especially it's availability on the web. Building on this, one thing I noticed about shipwrecked was the diverse range of phones that people had. There were Samsungs, iPhones, Pixels, Xiaomi, One Plus, etc.

Armed with both of these facts, I aimed to create *something* with HDR, and make it as universal as possible. Because I'm a web developer, I naturally looked towards the web. The first issue I encountered was: **there is no published spec for HDR within css**, meaning only images or videos should work. This was a bit of a dissapointment as I planned to make a flashing light, or drawing based site from dynamic HDR colors. (Yes, I'm evil.)

<h4><em>so what did I do about this? </em></h4>

I found projects which got HDR within CSS working on a few platforms, [this one](https://kidi.ng/wanna-see-a-whiter-white/) for iOS, and [this one](https://github.com/ardov/hdr-web/) for android/mac. The issue with these projects, is neither were a unviersal solution, leading to extreme inconsistency across device types, and requiring JS work to seperate out the solutions per device.

<h4><em>the solution? </em></h4>

My solution was to create a combination of these two methods, standardizing how non-media HDR content works on the web. The result is [hdr-paint](https://github.com/Cattn/hdr-paint). You can try it out [here](https://cattn.github.io/hdr-paint/draw.html)!

<h4><em>how does it work? </em></h4>

hdr-paint makes use of a hidden image/video to trick your phone into thinking there's HDR content on screen. Then, by using a combination of `backdrop-filter: brightness(10);` on the body, and `display-p3` values above 100%, I'm able to display colors above their normal value, allowing them to be rendered within the HDR colorspace!

> Screenshot of the site - this should be in HDR on supported devices.

<img width="400" src="https://play.maple.music/SMS/uploads/Screenshot_20250814-161855.png">

# Final Thoughts

This entire event was an amazing experience! I got to make a ton of new friends, explore an island, and get out of my confort zone. This event has inspired two projects from me:

1. **@cattn/multisocket**
- A simple networking solution for web-based games, to make building a fun & reliable multiplayer experience, easy.
2. **@cattn/hdr**
- A standardized way to create HDR-ified web components and elements. Built to be as simple as posible to setup & use.

I'll probably write blogs about those projects as I complete them. Otherwise, thank you very much for reading this far! I hope you enjoyed everything I made, and if you have any questions, feel free to email me at [Logan@cattn.dev](mailto:Logan@cattn.dev)!

# Assorted media!

<img src="https://play.maple.music/SMS/uploads/cattn.dev/PXL_20250811_161953608.RAW-01.MP.COVER.jpg">

<img src="https://play.maple.music/SMS/uploads/cattn.dev/PXL_20250810_102959963.RAW-01.MP.COVER.jpg">

<img src="https://play.maple.music/SMS/uploads/cattn.dev/PXL_20250809_015901881.RAW-01.MP.COVER.jpg">

<img src="https://play.maple.music/SMS/uploads/cattn.dev/PXL_20250809_002108377.NIGHT.RAW-01.COVER.jpg">

<img src="https://play.maple.music/SMS/uploads/cattn.dev/PXL_20250808_225540278.RAW-01.COVER.jpg">