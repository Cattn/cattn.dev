<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
	import { onMount } from "svelte";
    import { Badge } from "$lib/components/ui/badge";

    let featuredProjects = [
        { title: 'GBA', description: 'The best way to play your Retro Library on the go.', link: 'https://github.com/Cattn/gba', badges: ['Active', 'In Progress'] },
        { title: 'Kolf', description: 'A mod for kolf that allows for advanced stat tracking, better multiplayer, and more.', link: 'https://github.com/Cattn/kolf', badges: ['Active', 'In Progress'] },
        { title: 'Cattn.dev', description: 'This website!', link: 'https://github.com/Cattn/cattn.dev', badges: ['Active', 'In Progress'] },
        { title: 'Bunker', description: 'Bunker is an application to privately use your favorite tools without being spied on by filtering extensions.', link: 'https://github.com/bunkerweb/bunker', badges: ['Active', 'In Progress'] },
        { title: 'Maple', description: 'A local-library first music platform. A new way to organize and enjoy your music.', link: 'https://github.com/Maple-Development/Maple', badges: ['Active', 'In Progress'] }
    ]

    let otherProjects = [
        { title: 'Wii-GBA', description: 'A mostly faithful recreation of the Wii UI as an emulator site.', link: 'https://github.com/Math-Study/wii-gba', badges: ['Completed'] },
        { title: 'mathstudy.dev', description: 'The portfolio site for Math-Study, hosted on mathstudy.dev', link: 'https://github.com/Math-Study-Dev/math-study-dev.github.io/tree/svelte', badges: ['Completed'] },
        { title: 'lab-to-intravet', description: 'An app made in python to convert your lab results to a usable text format in the Vetinary software "Intravet". Available on request.', link: '#', badges: ['Completed'] },
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


<div class="flex justify-center mt-10">
    <h1 class="text-5xl font-black text-blue-400">Projects</h1>
</div>
<div class="flex justify-center ml-10">
    <h2 class="text-lg font-black text-blue-100">and unfinished work</h2>
</div>

<div class="flex justify-start ml-8 mb-4">
    <h1 class="text-3xl font-black text-blue-300">Featured Work</h1>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 ml-5 mr-5">
    {#each featuredProjects as project}
    <div class="border px-4 py-2 rounded-md shadow-md flex flex-col items-center justify-start hover:border-blue-500 h-full text-center">
        <img src="/images/{project.title}.png" alt="{project.title}" class="w-full h-48 object-contain rounded-md p-4" />
        <Button variant="link" href="{project.link}" class="text-blue-500 hover:underline text-xl font-bold p-0 m-0">{project.title}</Button>
        <div class="flex flex-wrap">
        {#each (project.badges || []) as badge}
            <Badge class="ml-1" variant="secondary">{badge}</Badge>
        {/each}
        </div>
        <p>{project.description}</p>
    </div>
    {/each}
</div>

<div class="flex flex-col justify-start ml-5 mr-5 mb-4 mt-10">
    <h1 class="text-3xl font-black text-blue-300">Other Projects</h1>
    <p class="text-lg font-black text-blue-100">Typically unfinished, or incomplete.</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 ml-5 mr-5 mb-10">
    {#each otherProjects as project}
    <div class="border px-4 py-2 rounded-md shadow-md flex flex-col items-center justify-start hover:border-blue-500 h-full text-center">
        <Button variant="link" href="{project.link}" class="text-blue-500 hover:underline text-xl font-bold p-0 m-0">{project.title}</Button>
        <div class="flex flex-wrap">
        {#each (project.badges || []) as badge}
            <Badge class="ml-1" variant="secondary">{badge}</Badge>
        {/each}
        </div>
        <p>{project.description}</p>
    </div>
    {/each}
</div>

<div class="flex flex-col justify-start ml-5 mr-5 mb-4 mt-10">
    <h1 class="text-3xl font-black text-blue-300">Things I've helped with</h1>
    <p class="text-lg font-black text-blue-100">Projects that I've contributed to, or are a part of.</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 ml-5 mr-5 mb-10">
    {#each collabProjects as project}
    <div class="border px-4 py-2 rounded-md shadow-md flex flex-col items-center justify-start hover:border-blue-500 h-full text-center">
        <Button variant="link" href="{project.link}" class="text-blue-500 hover:underline text-xl font-bold p-0 m-0">{project.title}</Button>
        <div class="flex flex-wrap">
            {#each (project.badges || []) as badge}
                <Badge class="ml-1" variant="secondary">{badge}</Badge>
            {/each}
            </div>
        <p>{project.description}</p>
    </div>
    {/each}
</div>