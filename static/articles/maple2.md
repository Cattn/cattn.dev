## Intro
If you haven't read [Part 1](https://cattn.dev/blog/article/maple), you should do that! It gives a ton of insight into why I made Maple to begin with. 

Between now and Part 1, quite a bit has changed. I redesigned (or rather, fixed) Maple again.

> Iteration #7 (Maple)

<img src="https://play.maple.music/SMS/uploads/cattn.dev/Screenshot%202026-03-20%20124411.png">

## What I've changed
Over the past year, I've focused a lot more on the intention behind my designs and work. Previously, I'd try and create the most *functional* UI, often sacrificing certain design conventions for how I assumed a project should look. However, it became obvious that while this helped me nail down the function of my app much quicker, it often led to more disorganization, and regret later down the line.

In previous iterations of Maple, I never stopped to take a step back and really think about what each system was acomplishing, and how certain things are re-used across the whole app.

For example, features such as **filters** were implemented on a per-page basis, often leading to a huge workload trying to replicate new features across every page. This also led to **tons** of redundent code and performance issues. This was also the case with how I handled the mere processing & displaying of tracks. Eventually I regretted this implementation, and tried to throw the logic into a few components to be re-used, but that was simply a band-aid solution.

In the Maple rewrite however, almost all code is highly re-usable across numerous pages.

<FilterComparison />

Some other basic features that were previously missing from Maple, but have now been added are:

- A proper queue
- Shuffling
- Looping
- Proper track context
- Better artist pages
- And much more...

A huge focus of the redesign was to have a fluent and consistent set of animations & transitions across the whole app. I went with a "springy" and active design while still prioritizing speed. All of the tracks/tiles fly around in a fun (but quick) way, making every page feel a bit alive.

I highly encourage you to check it out! Especially if you've used Maple in the past. [Check it out here!!!](https://play.maple.music/)

## Onto the future

Maple has always been a long term passion project, occasionally it's been my top priority, but often I delegate time where and when I can. I often spend my time on much ~~less~~ *more* interesting things...

The next set of improvements to Maple will focus on:

- Social Features
- LastFM Support
- Public Profiles
- Enhanced Stat Tracking

**more in part 3: [SOON]**