<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import '@fortawesome/fontawesome-free/css/all.min.css'

  let skills = [
    { icon: 'fa-brands fa-html5', name: 'HTML', level: '100%' },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS', level: '95%' },
    { icon: 'fa-brands fa-git-alt', name: 'Git', level: '90%' },
    { icon: 'fa-brands fa-js', name: 'JavaScript', level: '85%' },
    { icon: 'fa-brands fa-unity', name: 'Unity', level: '65%' },
    { icon: 'fa-brands fa-python', name: 'Python', level: '55%' },
    { icon: 'fa-solid fa-code', name: 'C#', level: '45%' },
    { icon: 'fa-solid fa-code', name: 'C++', level: '35%' },
];

let projects = [
    { title: 'GBA', description: 'The best way to play your Retro Library on the go.', link: 'https://github.com/Cattn/gba' },
    { title: 'Kolf', description: 'A kolf mod to allow for advanced Stat Tracking and other multiplayer improvements', link: 'https://github.com/Cattn/kolf' },
    { title: 'Cattn.dev', description: 'This website!', link: 'https://github.com/Cattn/cattn.dev' }
  ];

</script>
<div class="flex justify-center mt-10">
    <h1 class="text-5xl font-black text-blue-400">Cattn</h1>
</div>
<div class="flex justify-center ml-6">
    <h2 class="text-xl font-black text-blue-100">aka Logan</h2>
</div>
<div class="flex flex-col lg:flex-row justify-start items-center lg:items-start mt-10 mx-4 lg:mx-32">
    <img src="/images/cat.jpg" alt="cat" class="w-48 h-48 rounded-md" />
    <div class="flex-grow lg:w-1/3">
        <h1 class="text-xl font-bold mt-4 lg:mt-0 lg:ml-4 w-full overflow">
            Hi! I'm Logan, aka Cattn. I am a fullstack developer, linux user, and love to create things. I mostly create front-ends and toy around with games!
        </h1>
    </div>
    <div class="flex flex-col lg:ml-4 mt-4 lg:mt-0 w-full lg:w-3/6">
        <div class="flex justify-between">
            <h2 class="text-2xl font-black text-blue-300">Featured Projects</h2>
            <Button href="/projects" variant="link" class="text-2xl ml-2 p-0 pb-1 font-black text-blue-800">More Projects!</Button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            {#each projects as project}
                <div class="border px-4 py-2 rounded-md shadow-md">
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        {#each skills as skill}
            <div class="flex flex-col items-center mt-5">
                <i class={`${skill.icon} fa-2xl`}></i>
                <h2 class="text-2xl font-black text-blue-100 mt-4">{skill.name}</h2>
                <div class="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div class="bg-yellow-900 h-4 rounded-full" style="width: {skill.level};"></div>
                </div>
            </div>
        {/each}
    </div>
</div>