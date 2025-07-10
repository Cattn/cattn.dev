<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { onMount } from "svelte";
  import { fly } from 'svelte/transition';

  let skills = [
    { icon: 'fa-brands fa-js', name: 'JavaScript', level: '100%' },
    { icon: 'fa-brands fa-html5', name: 'HTML', level: '100%' },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS', level: '100%' },
    { name: 'TypeScript', level: '97%' },
    { icon: 'fa-brands fa-git-alt', name: 'Git', level: '95%' },
    { icon: 'fa-brands fa-unity', name: 'Unity', level: '65%' },
    { icon: 'fa-brands fa-python', name: 'Python', level: '65%' },
    { icon: 'fa-solid fa-code', name: 'C#', level: '55%' },
    { icon: 'fa-solid fa-code', name: 'C++', level: '35%' }
];

let webskills = [
    { name: 'Tailwind', level: '95%' },
    { name: 'SvelteKit', level: '90%' },
    { name: 'Svelte', level: '87%' },
    { name: 'Vite', level: '90%' },
    { name: 'Astro', level: '90%' },
    { name: 'Node.js', level: '90%' },
    { name: 'Express.js', level: '90%' },
    { name: 'TypeScript', level: '85%' },
    { name: 'React', level: '75%' },
    { name: 'Electron', level: '70%' },
    { name: 'Aframe.js', level: '25%' }
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
  });

</script>

<section class="container mx-auto px-4 py-16 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
  <h1 class="text-5xl font-black text-accent-blue">Cattn</h1>
  <h2 class="mt-1 text-xl font-semibold text-muted-foreground">aka Logan</h2>
  <div class="mt-8 flex flex-col lg:flex-row items-center justify-center gap-8">
    <img src="/images/cat.jpg" alt="cat" class="w-40 h-40 rounded-full shadow-lg" />
    <p class="max-w-xl text-lg text-foreground leading-relaxed">
      Hi! I'm Logan, aka Cattn. I am a fullstack developer, linux user, and love to create things. I mostly create front-ends and toy around with games! I also love VR, and have built my own FBT/Slime Trackers. I'm also interested in electronics as a hobby. Check out some of my photos and media <Button variant="link" href="/media" class="text-accent-blue hover:underline text-lg font-bold p-0 m-0 inline-block">here</Button>.
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
  <div class="border border-border rounded-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each skills as skill}
            <div class="flex flex-col items-center">
                <i class={`${skill.icon || 'fa-solid fa-code'} fa-2xl text-muted-foreground mb-3`}></i>
                <h3 class="text-xl font-semibold text-foreground mb-2">{skill.name}</h3>
                <div class="w-full bg-muted rounded-full h-2.5">
                    <div class="bg-accent-blue h-2.5 rounded-full" style="width: {skill.level};"></div>
                </div>
            </div>
        {/each}
    </div>
  </div>
</section>

<section class="container mx-auto px-4 py-10" in:fly="{{ y: 50, duration: 500, delay: 600 }}">
  <h2 class="text-3xl font-black text-primary mb-6 text-center lg:text-left">Web Technologies</h2>
  <div class="border border-border rounded-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each webskills as skill}
            <div class="flex flex-col items-center">
                <h3 class="text-xl font-semibold text-foreground mb-2">{skill.name}</h3>
                <div class="w-full bg-muted rounded-full h-2.5">
                    <div class="bg-accent-blue h-2.5 rounded-full" style="width: {skill.level};"></div>
                </div>
            </div>
        {/each}
    </div>
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