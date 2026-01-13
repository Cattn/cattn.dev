<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { onMount } from "svelte";
  import { fly } from 'svelte/transition';

  type SkillItem = { name: string; icon?: string };
  type SkillGroup = { title: string; items: SkillItem[] };

  let skillGroups: SkillGroup[] = [
    {
      title: "Languages",
      items: [
        { icon: 'fa-brands fa-js', name: 'JavaScript' },
        { icon: 'fa-solid fa-code', name: 'TypeScript' },
        { icon: 'fa-brands fa-python', name: 'Python' },
        { icon: 'fa-brands fa-html5', name: 'HTML' },
        { icon: 'fa-brands fa-css3-alt', name: 'CSS' },
        { icon: 'fa-brands fa-java', name: 'Java' },
        { icon: 'fa-solid fa-code', name: 'C#' },
        { icon: 'fa-solid fa-code', name: 'C++' },
      ],
    },
    {
      title: "Web",
      items: [
        { name: 'SvelteKit' },
        { name: 'Svelte' },
        { name: 'React' },
        { name: 'Astro' },
        { name: 'Tailwind' },
        { name: 'Vite' },
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Electron' },
        { name: 'Aframe.js' },
        { name: 'Tauri' },
      ],
    },
    {
      title: "Tools",
      items: [{ icon: 'fa-brands fa-git-alt', name: 'Git' }],
    },
    {
      title: "Game Dev",
      items: [
        { icon: 'fa-brands fa-unity', name: 'Unity' },
        { icon: 'fa-solid fa-code', name: 'Godot' },
        { icon: 'fa-solid fa-code', name: 'Unreal Engine' },
      ],
    },
  ];

let projects = [
  { title: 'SMS', description: 'Upload, share, and manage your files quickly. Supports file expiration, quick filters, and previews!', link: 'https://github.com/Cattn/SMS', badges: ['Complete'] },
  { title: 'Maple', description: 'A local-library first music platform. A new way to organize and enjoy your music. Optional account and social features.', link: 'https://github.com/Cattn/Maple', badges: ['Active', 'In Progress'] },
  { title: 'Cattn.dev', description: 'This website!', link: 'https://github.com/Cattn/cattn.dev', badges: ['Complete'] },
  { title: 'senseshift-face-pcb', description: 'A custom pcb that fits the X6 Facial Haptic Interface', link: 'https://github.com/Cattn/senseshift-face-pcb', badges: ['Complete'] },
];

let albums = [
    { title: 'To Pimp A Butterfly', image: 'tpab.webp'},
    { title: 'Atavista', image: 'atavista.webp'},
    { title: 'brat', image: 'brat.webp'},
    { title: 'Californication', image: 'cali.webp'},
    { title: 'Cyberpunk 2077: Radio, Vol. 2', image: 'cp277.webp'},
    { title: 'Damn.', image: 'damn.webp'},
    { title: "By the Way", image: 'dontstop.webp'},
    { title: 'Evil Empire', image: 'evilem.webp'},
    { title: 'good kid, m.A.A.d city', image: 'gkmc.webp'},
    { title: 'Guts', image: 'guts.webp'},
    { title: 'Mr. Morale & The Big Steppers', image: 'mmatbs.webp'},
    { title: 'Rage Against The Machine', image: 'ratm.webp'},
    { title: 'The Slow Rush', image: 'tsr.webp'},
    { title: 'untitled unmastered.', image: 'unti.webp'}
]

let artists = [
    { title: 'Rage Against The Machine', image: 'ratmartist.webp'},
    { title: 'Kendrick Lamar', image: 'kendrick.webp'},
    { title: 'Childish Gambino', image: 'gambino.webp'},
    { title: 'George Clinton', image: 'clinton.webp'},
    { title: 'Metro Boomin', image: 'metro.webp'},
    { title: 'Tyler, the Creator', image: 'tyler.webp'},
    { title: 'Nine Inch Nails', image: 'nin.webp'},
    { title: 'Slipknot', image: 'slipknot.webp'},
    { title: 'Thundercat', image: 'thundercat.webp'},
    { title: 'Olivida Rodrigo', image: 'livia.webp'},
    { title: 'Limp Bizkit', image: 'limpbizkit.webp'},
    { title: 'Korn', image: 'korn.webp'},
    { title: 'Red Hot Chili Peppers', image: 'rhcp.webp'}
]

  onMount(() => {
    document.title = "Home - Cattn.dev";
  })
</script>

<section class="container mx-auto px-4 py-16 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
  <h1 class="text-5xl font-black text-accent-blue">Cattn</h1>
  <h2 class="mt-1 text-xl font-semibold text-muted-foreground">aka Logan</h2>
  <div class="mt-8 flex flex-col lg:flex-row items-center justify-center gap-8">
    <img src="/images/cat.jpg" alt="cat" class="w-40 h-40 rounded-full shadow-lg" />
    <p class="max-w-xl text-lg text-foreground leading-relaxed">
      Hi! I'm Logan, aka Cattn. I am a fullstack developer, linux user, and love to create things. I mostly create front-ends and toy around with games! I also love VR, and have built my own FBT/Slime Trackers. I'm also interested in electronics as a hobby. Check out my personal discord server <Button variant="link" href="https://discord.gg/math-study-934807331668099142" class="text-accent-blue hover:underline text-lg font-bold p-0 m-0 inline-block">here</Button>.
    </p>
  </div>
</section>

<section class="container mx-auto px-4 py-10" in:fly="{{ y: 50, duration: 500, delay: 400 }}">
  <h2 class="text-3xl font-black text-accent-blue mb-6 text-center lg:text-left">Featured Projects</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each projects as project (project.title)}
          <Card.Root class="flex flex-col text-center transition-all hover:shadow-lg hover:border-accent-blue/50">
              <Card.Header>
                  <Card.Title>
                      <Button variant="link" href={project.link} target="_blank" rel="noopener noreferrer" class="text-xl font-bold p-0 m-0 text-foreground hover:text-accent-blue h-auto">{project.title}</Button>
                  </Card.Title>
              </Card.Header>
              <Card.Content class="flex-grow">
                  <p class="text-muted-foreground">{project.description}</p>
              </Card.Content>
          </Card.Root>
      {/each}
  </div>
</section>

<section class="container mx-auto px-4 py-10" in:fly="{{ y: 50, duration: 500, delay: 500 }}">
  <h2 class="text-3xl font-black text-primary mb-6 text-center lg:text-left">Things I know</h2>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each skillGroups as group (group.title)}
      <Card.Root class="transition-all hover:shadow-lg hover:border-accent-blue/50">
        <Card.Header>
          <Card.Title class="text-xl font-bold">{group.title}</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {#each group.items as item (item.name)}
              <div class="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
                {#if item.icon}
                  <i class={`${item.icon} text-muted-foreground`}></i>
                {/if}
                <span class="text-sm font-semibold text-foreground">{item.name}</span>
              </div>
            {/each}
          </div>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
</section>

<section class="container mx-auto px-4 py-10" in:fly="{{ y: 50, duration: 500, delay: 700 }}">
  <h2 class="text-3xl font-black text-accent-foreground mb-6 text-center lg:text-left">Favorite Albums</h2>
  <div class="border border-border rounded-lg p-6">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {#each albums as album}
            <Card.Root class="overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
                <Card.Content class="p-0 aspect-square flex items-center justify-center">
                    <img src="/images/albums/{album.image}" alt="{album.title}" class="w-full h-full object-cover" />
                </Card.Content>
                <Card.Footer class="p-3 bg-muted/50">
                    <h3 class="text-sm font-semibold text-accent-foreground text-center w-full truncate">{album.title}</h3>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
  </div>
</section>

<section class="container mx-auto px-4 py-10 mb-10" in:fly="{{ y: 50, duration: 500, delay: 800 }}">
  <h2 class="text-3xl font-black text-accent-foreground mb-6 text-center lg:text-left">Favorite Artists</h2>
  <div class="border border-border rounded-lg p-6">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {#each artists as artist}
            <div class="flex flex-col items-center group transition-all hover:scale-105">
                <img src="/images/artists/{artist.image}" alt="{artist.title}" class="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-transparent group-hover:border-accent-blue shadow-lg" />
                <h3 class="mt-3 text-sm font-semibold text-accent-foreground text-center w-full truncate">{artist.title}</h3>
            </div>
        {/each}
    </div>
  </div>
</section>