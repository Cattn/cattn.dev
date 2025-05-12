<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { onMount } from "svelte";
    import { fly } from 'svelte/transition';

    let featuredProjects = [
        { title: 'Maple', description: 'A local-library first music platform. A new way to organize and enjoy your music. Optional account and social features!', link: 'https://github.com/Cattn/Maple', badges: ['Active', 'In Progress'] },
        { title: 'Bunker', description: 'Bunker is an application to privately use your favorite tools without being spied on by filtering extensions.', link: 'https://github.com/bunkerweb/bunker', badges: ['Active', 'In Progress'] },
        { title: 'Kolf', description: 'A mod for kolf that allows for advanced stat tracking, better multiplayer, and more.', link: 'https://github.com/Cattn/kolf', badges: ['Inactive', 'In Progress'] },
        { title: 'Cattn.dev', description: 'This website!', link: 'https://github.com/Cattn/cattn.dev', badges: ['Active', 'In Progress'] },
    ]

    let otherProjects = [
        { title: 'Wii-GBA', description: 'A mostly faithful recreation of the Wii UI as an emulator site.', link: 'https://github.com/Math-Study/wii-gba', badges: ['Completed'] },
        { title: 'mathstudy.dev', description: 'The portfolio site for Math-Study, hosted on mathstudy.dev', link: 'https://github.com/Math-Study-Dev/math-study-dev.github.io/tree/svelte', badges: ['Completed'] },
        { title: 'lab-to-intravet', description: 'An app made in python to convert your lab results to a usable text format in the Vetinary software "Intravet". Available on request.', link: '#', badges: ['Completed'] },
        { title: 'GBA', description: 'The best way to play your Retro Library on the go.', link: 'https://github.com/Cattn/gba', badges: ['Complete'] },
        { title: 'SPGC', description: 'Student Portal Grade Calculator', link: 'https://github.com/Cattn/SPGC', badges: ['Complete'] },
    ]

    let collabProjects = [
        { title: 'Nebula', description: 'a stunning and sleek web proxy with support for hundreds of popular sites.', link: 'https://github.com/NebulaServices/Nebula', badges: ['Inactive Contributor', 'In Progress'] },
        { title: 'Noctura', description: 'The blazing fast solution to internet censorship. Access blocked websites with ease while maintaining anonymity and security.', link: 'https://github.com/NebulaServices/Noctura', badges: ['Completed']},
        { title: 'Atlas', description: 'Atlas is a minimalistic proxy service packed with important features for a simple, streamlined proxy experience. Made for the 2024 Titanium Network Proxathon', link: 'https://github.com/atlasproxy/atlas', badges: ['Completed'] },
    ] 
    
onMount(() => {
    document.title = "Projects - Cattn.dev";
  });
</script>


<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
    <h1 class="text-5xl font-black text-accent-blue">Projects</h1>
    <h2 class="mt-1 text-xl font-semibold text-muted-foreground">and unfinished work</h2>
</section>

<section class="container mx-auto px-4 py-6" in:fly="{{ y: 50, duration: 500, delay: 400 }}">
    <h2 class="text-3xl font-black text-accent-blue mb-6 text-center sm:text-left">Featured Work</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each featuredProjects as project (project.title)}
            <Card.Root class="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-accent-blue/50 h-full">
                <Card.Header class="p-0">
                    <img src="/images/{project.title}.png" alt="{project.title}" class="w-full h-40 object-contain p-4 bg-muted/30" />
                </Card.Header>
                <Card.Content class="p-4 flex-grow flex flex-col">
                    <Card.Title class="mb-2">
                        <Button variant="link" href={project.link} target="_blank" rel="noopener noreferrer" class="text-xl font-bold p-0 m-0 text-foreground hover:text-accent-blue h-auto">{project.title}</Button>
                    </Card.Title>
                    <div class="flex flex-wrap gap-1 mb-3">
                        {#each (project.badges || []) as badge}
                            <Badge variant="secondary" class="text-xs">{badge}</Badge>
                        {/each}
                    </div>
                    <p class="text-sm text-muted-foreground flex-grow">{project.description}</p>
                </Card.Content>
            </Card.Root>
        {/each}
    </div>
</section>

<section class="container mx-auto px-4 py-6" in:fly="{{ y: 50, duration: 500, delay: 500 }}">
    <div class="mb-6 text-center sm:text-left">
        <h2 class="text-3xl font-black text-accent-blue">Finished Projects</h2>
        <p class="text-lg font-semibold text-muted-foreground">Stable and finished projects.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each otherProjects as project (project.title)}
            <Card.Root class="flex flex-col transition-all hover:shadow-lg hover:border-accent-blue/50 h-full">
                <Card.Header>
                    <Card.Title>
                        <Button variant="link" href={project.link} target="_blank" rel="noopener noreferrer" class="text-xl font-bold p-0 m-0 text-foreground hover:text-accent-blue h-auto">{project.title}</Button>
                    </Card.Title>
                    <div class="flex flex-wrap gap-1 mt-1">
                        {#each (project.badges || []) as badge}
                            <Badge variant="secondary" class="text-xs">{badge}</Badge>
                        {/each}
                    </div>
                </Card.Header>
                <Card.Content class="flex-grow">
                    <p class="text-sm text-muted-foreground">{project.description}</p>
                </Card.Content>
            </Card.Root>
        {/each}
    </div>
</section>

<section class="container mx-auto px-4 py-6 mb-10" in:fly="{{ y: 50, duration: 500, delay: 600 }}">
    <div class="mb-6 text-center sm:text-left">
        <h2 class="text-3xl font-black text-accent-blue">Things I've helped with</h2>
        <p class="text-lg font-semibold text-muted-foreground">Projects that I've contributed to, or am a part of.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each collabProjects as project (project.title)}
            <Card.Root class="flex flex-col transition-all hover:shadow-lg hover:border-accent-blue/50 h-full">
                <Card.Header>
                    <Card.Title>
                        <Button variant="link" href={project.link} target="_blank" rel="noopener noreferrer" class="text-xl font-bold p-0 m-0 text-foreground hover:text-accent-blue h-auto">{project.title}</Button>
                    </Card.Title>
                </Card.Header>
                <Card.Content class="flex-grow">
                    <div class="flex flex-wrap gap-1 mb-3">
                        {#each (project.badges || []) as badge}
                            <Badge variant="secondary" class="text-xs">{badge}</Badge>
                        {/each}
                    </div>
                    <p class="text-sm text-muted-foreground">{project.description}</p>
                </Card.Content>
            </Card.Root>
        {/each}
    </div>
</section>