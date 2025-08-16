# Obsessive Innovation & Iteration

### A quick bit of psychology

The need to innovate and iterate is one of the driving principles of society. Almost everyone has the innate desire to create or participate in something, and then iterate or improve on it. Whether that be a job, project, product, or even a relationship, the desire to improve or advance remains a primary motivation. Even your entire life is driven by this principle. You start somewhere and then iterate and build on your skills throughout school and jobs, all in hopes of reaching a goal.

For many of us, this is simply due to the capitalistic society we live in. As a company you must create a better product or service in order to raise your profits and attract more investors. Companies like Nvidia [didn't become the first company to top a $4T market cap](https://www.nytimes.com/2025/07/10/technology/nvidia-4-trillion-market-value.html) by creating the second-best GPU, or re-using what worked. They put themselves in a position where they offer a unique product (H200s, H100s, etc) and a compelling reason to stay with them (CUDA). The motivation to perform better as a company is passed down to employees, who are themselves motivated to move up the chain, and in turn get more money.

### How does this relate to software development and hobby projects?

As you might already be able to tell, almost all of these principles can be applied to your personal projects, designs, and goals. However instead of a direct monetary incentive, it's usually a desire to learn, put out a cool project, build a portfolio, etc. Say you've just finished a large project: a public website that acts as a tool for many users. However after you finish, a few things happen:

1. Less people than expected visit your website
2. You get messages from users asking you how to do something (that you thought was obvious)
3. As you start to work through more projects, and see similar projects to your own, you notice subtle flaws in your design.

What would be your response to all of these issues? Here's a few potential ones:

1. Answer the user complaints, improve your documentation/f&q, and ignore the design choices you previously made in favor of consistency
2. Re-work specific sections of your UI and UX to try and address the root of the user complains
3. Do both #1 and #2, while making subtle tweaks to your UI to try and improve the quality

Each answer has it's downsides, for example, **#1** would likely result in more user complaints, constantly re-answering questions, and confused users. **#2** would require significantly more work for you, also confuse users, and could end up backfiring. Finally, **#3** would be only a few steps behind a full re-write, requiring a lot of work, while ending up with what feels like a new project.

Despite this, each solution has it's own clear use case. For example, you'd typically use **#1** in a smaller/less complicated project in order to minimize the extra time put into it, as well as clearly instruct users on how to fix most potential issues. For **#2**, you'd use this for a specific component or layout-based issue in a project, which can resolve a large amount of confusion with minimally sized changes.


<h5><em>However, with #3, comes... </em></h5>

### The Issue (at least for me)

One issue that I can never seem to solve is: design creep. (More commonly known as [scope creep](https://en.wikipedia.org/wiki/Scope_creep) or feature creep) The feeling that a design is never enough, or that there is always a better layout, color pallet, ui library, animation, to be made consumes you. I don't know how many project I've tried working on that have been slowed down by the constant re-working and re-designing of various aspects.

For example, Maple

> Iteration #1 (MLib)

<img src="https://play.maple.music/SMS/uploads/cattn.dev/mlib.png">

> Iteration #2 (Mlib v2)

<img src="https://play.maple.music/SMS/uploads/cattn.dev/mlib2.png">

> Iteration #3 (UMLA - Mock-up)

<img src="https://play.maple.music/SMS/uploads/cattn.dev/Screenshot 2025-08-16 030100.png">

> Iteration #4 (UMLA v2 - Mock-up)

<img src="https://play.maple.music/SMS/uploads/cattn.dev/Screenshot 2025-08-16 030221.png">

> Iteration #5 (Maple - Current)

<img src="https://play.maple.music/SMS/uploads/cattn.dev/maple_current.png">

> Iteration #6 (Maple - Redesign) - In Progress

<img src="https://play.maple.music/SMS/uploads/cattn.dev/maple_new.png">

In the days of MLib, I lacked most of the skills I have currently, especially in terms of mocking up a design, creating a well-rounded UI, and optimizing for performance. In short, it sucked ass.

Moving forward to the first iteration (MLib v2), I wanted to integrate MLib into another project, but found that many of my design choices wouldn't fit or look well in a highly-customizable app, so I somewhat followed the strategy of #2, and worked on specific components (font color, bottom-bar positioning, and top-bar clutter). While this was slightly better in some ways, overall the design was a regression. It was however, received much better by users at the time, mainly due to the sleeker look, and less clutter.

Both iterations of UMLA represented a major shift for me, as I moved to a framework - Svelte. During this period, I was loosely inspired by Material UI (custom themes via material ui tokens were supported), however due to the lack of material web components at the time, and my still relatively low skill, this was not executed well in either revision. This resulted in a significant improvement in my layout, but overall an incomplete experience, as many features (such as search or artists) were half-baked, or largely incomplete. Most of my improvements and effort was put into learning the syntax of the framework, and becoming accustomed to it's various quirks and benefits.

Finally, with Maple (which was the 3rd complete re-write), I put a real emphasis into UX, and overall functionality. Despite an insane amount of feature creep, there was one outside factor that drove the success of this iteration: Rewards. During this time, I had just discovered [hack club](https://hackclub.com/), and more specifically [high seas](https://highseas.hackclub.com/). Essentially, high seas rewards the time you spend on projects with various rewards, such as a 3D printer, gift card, stickers, or other cool electronics. This reward system directly incentivized two things.

1. High levels of innovation, and even higher levels of feature creep
- Coming up with new features, interesting features, and adding as many options as possible directly correlated to what seemed to be a more interesting project, and more importantly: more hours.
2. Actually completing a project
- One of the main requirements of high seas was to ship a completed project, where others would vote on it. If your project was low quality, unfinished, or otherwise unappealing, you'd likely earn less from it.

This incentivization scheme is what allowed me to overcome the feeling of imperfection, as there was a direct consequence to that feeling, and a direct reward for sticking with a design.

### But this doesn't apply to me!

I know not everyone is eligible (or able) to be paid for the work they do on their projects, which makes much of this advice far less valuable. However, there is one other strategy/circumstance which helped me to break past this problem, and in turn learn a lot more about my abilities and finish more projects.

And that is: **Setting hard time limits occasionally**

Forcing yourself to complete a project within an extremely small time-window (think a day or two) can be a really effective wakeup call. It really forces you to think about what you're capable of, without having the luxury to stress over the same design over and over. From there, you'll find that these skills apply beyond time-constricted projects, and you'll find yourself finding more joy in completing a project, rather then trying to make one part perfect.

### Thank you.

Seriously! Thank you for reading this far, and I hope you enjoyed what I had to say, and the quick story I had to tell about my own experience. If this helped you, you have any questions, or you'd just like to contact me, don't hesitate to shoot me an email at: [Logan@cattn.dev](mailto:Logan@cattn.dev)