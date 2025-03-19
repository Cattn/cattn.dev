<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import '@fortawesome/fontawesome-free/css/all.min.css'
	import { onMount } from "svelte";

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
    { title: 'GBA', description: 'The best way to play your Retro Library on the go.', link: 'https://github.com/Cattn/gba' },
    { title: 'Maple', description: 'A local-library first music platform. A new way to organize and enjoy your music. Optional account and social features.', link: 'https://github.com/Cattn/Maple' },
    { title: 'Cattn.dev', description: 'This website!', link: 'https://github.com/Cattn/cattn.dev' },
    { title: 'Bunker' , description: 'Bunker is an application to privately use your favorite tools without being spied on by filtering extensions.', link: 'https://github.com/bunkerweb/bunker' }
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
<div class="flex justify-center mt-10">
    <h1 class="text-5xl font-black text-blue-400">Cattn</h1>
</div>
<div class="flex justify-center ml-6">
    <h2 class="text-xl font-black text-blue-100">aka Logan</h2>
</div>
<div class="flex flex-col lg:flex-row items-center justify-center lg:justify-start mt-3 mx-4 lg:mx-32">
    <img src="/images/cat.jpg" alt="cat" class="w-48 h-48 rounded-md self-center" />
    <div class="flex-grow lg:w-1/3 self-center mr-4">
        <h1 class="text-xl font-bold mt-4 lg:mt-0 lg:ml-4 w-full overflow">
            Hi! I'm Logan, aka Cattn. I am a fullstack developer, linux user, and love to create things. I mostly create front-ends and toy around with games! I also love VR, and have built my own FBT/Slime Trackers. I'm also interested in engineering as a hobby. Check out some of my photos and media <Button variant="link" href="/media" class="text-blue-500 hover:underline text-lg font-bold p-0 m-0">here</Button>
        </h1>
    </div>
    <div class="flex flex-col lg:ml-4 mt-4 lg:mt-0 w-full lg:w-3/6 self-center">
        <div class="flex lg:justify-end md:justify-start">
            <h2 class="text-2xl font-black text-blue-300">Featured Projects</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            {#each projects as project}
                <div class="border px-4 py-2 rounded-md shadow-md flex flex-col items-center justify-center hover:border-blue-500 text-center">
                    <Button variant="link" href="{project.link}" class="text-blue-500 hover:underline text-xl font-bold p-0 m-0">{project.title}</Button>
                    <p>{project.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
    
<div class="mt-10 mx-4 lg:mx-40">
    <h1 class="text-3xl font-black text-blue-300 text-left">Things I know</h1>
</div>
<div class="mt-4 border border-border mx-4 lg:mx-32 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {#each skills as skill}
            <div class="flex flex-col items-center mt-5">
                <i class={`${skill.icon} fa-2xl`}></i>
                <h2 class="text-2xl font-black text-blue-100 mt-4">{skill.name}</h2>
                <div class="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div class="bg-blue-900 h-4 rounded-full" style="width: {skill.level};"></div>
                </div>
            </div>
        {/each}
    </div>
</div>

<div class="mt-10 mx-4 lg:mx-40">
    <h1 class="text-3xl font-black text-blue-300 text-left">Web Technologies</h1>
</div>
<div class="mt-4 border border-border mx-4 lg:mx-32 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {#each webskills as skill}
            <div class="flex flex-col items-center mt-5">
                <h2 class="text-2xl font-black text-blue-100">{skill.name}</h2>
                <div class="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div class="bg-blue-900 h-4 rounded-full" style="width: {skill.level};"></div>
                </div>
            </div>
        {/each}
    </div>
</div>

<div class="mt-10 mx-4 lg:mx-40">
    <h1 class="text-3xl font-black text-green-500 text-left">Favorite Albums</h1>
</div>
<div class="mt-4 border border-border mx-4 lg:mx-32 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
        {#each albums as album}
            <div class="flex flex-col items-center mt-2">
                <img src="/images/albums/{album.image}" alt="{album.title}" class="w-fit h-48 object-contain rounded-[10%]  p-1" />
                <h2 class="text-2xl font-bold text-green-300 text-center">{album.title}</h2>
            </div>
        {/each}
    </div>
</div>

<div class="mt-10 mx-4 lg:mx-40">
    <h1 class="text-3xl font-black text-green-500 text-left">Favorite Artists</h1>
</div>
<div class="mt-4 border border-border mx-4 lg:mx-32 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
        {#each artists as artist}
            <div class="flex flex-col items-center mt-2">
                <img src="/images/artists/{artist.image}" alt="{artist.title}" class="w-fit h-48 object-fill rounded-[100%] p-1" />
                <h2 class="text-2xl font-bold text-green-300 text-center">{artist.title}</h2>
            </div>
        {/each}
    </div>
</div>