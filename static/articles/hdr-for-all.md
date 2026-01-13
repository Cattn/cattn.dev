<HDROpen />

# The issue.
HDR support on the web **sucks**. Like really sucks. Take a screenshot of HDR content and want to put it on your website? Too bad. Want to make some text pop? Too bad. Suppose you get past all of those issues, and *somehow* display colors in HDR. Any users without HDR supported devices won't see anything, or the color will be completely different then what you intended.

I've always been interested in HDR content, and the quirks around when it would show up, and when it wouldn't. For example, on Android, the files app wouldn't display HDR for a long time, yet the photos app would given the same file. On iPhone, HDR photos on the web were very hit or miss, while videos almost always worked as expected.

During a <a href="https://cattn.dev/blog/article/shipwrecked">hackathon</a>, one of my prompts was to *"Build the most COLORFUL game/app/site possible"*. I took this very literally, and set out to build a site that displayed the **BRIGHTEST** possible colors. This is what took me down the rabbit hole of HDR content on the web.

# The search.
Through a LOT of research, I came across two separate projects, one demonstrating HDR text/background on [Android](https://hdr.ardov.me/), and another for [Mac/iOS](https://github.com/dtinth/superwhite?tab=readme-ov-file). For some reason, I couldn't find a project supporting both, which didn't make sense considering it seemed trivial to combine the two methods.

I decided to combine both methods onto one page, and test it. And.... It was broken on both.

The implementation of the p3 color space (in relation to HDR) is "broken" on Chrome. While it does work as intended, setting p3-colors beyond their maximum will just result in white, or blown out colors. On Webkit browsers, this is not the case. If you set a p3-color beyond 100%, and have an HDR video somewhere on the page, you can "trick" the browser into rendering normal text/background colors as HDR.

So the solution for iOS is simple, right? Not exactly. In order for me to come up with a solution that works on both platforms, I need a reliable way to detect what platform & browser the user is on, only through CSS.

> Why only through CSS?

It's the only reasonably quick way of rendering HDR colors, if I had to rely on JS, not only would it add to the bundle size, but it would result in flickering/inconsistent colors on the page.

This detection process *(and then experimenting with what styles could be re-used across platforms to make it as simple as possible)* was the longest part of development. Adding to the annoyances, it required continuous access to 3 different devices, an Android device, iOS device, and a Mac.

# The solution.

My [initial page](https://cattn.github.io/hdr-paint/hdr-green.html) was just a giant flashbang (I suggest you turn down your brightness!!)

Shortly after, I worked on a way of "painting" with HDR [here](https://cattn.github.io/hdr-paint/draw.html) (this one doesn't work consistently anymore). This is what I submitted in the hackathon, the reaction from everyone I showed it to, astonished that it just **worked**, was amazing.

After the hackathon, I worked on a svelte-library to streamline the HDR-ification of content. I named it [hdr-ify](https://github.com/Cattn/hdr-ify).

Here's an example of it in action!
> Make sure you have power saver off, are on chrome/safari, and brightness is ~80%

<HDR />

# HDR for all!
Want to add this to your own site? Checkout the svelte library [here](https://github.com/Cattn/hdr-ify). Use responsibly!!!