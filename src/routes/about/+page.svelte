<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import '@fortawesome/fontawesome-free/css/all.min.css'
    let socials = [
        { icon: 'fa-brands fa-github', name: 'GitHub', link: 'https://github.com/wicked1234567' },
        { icon: 'fa-brands fa-discord', name: 'Discord', link: 'https://discord.gg/jwYYtxRDZE' },
        { icon: 'fa-brands fa-youtube', name: 'Youtube', link: 'https://www.youtube.com/channel/UCpEYx3qAZQ0OLs-7o3ke-EQ' },
      
    ];
</script>

<div class="flex justify-center mt-10">
    <h1 class="text-5xl font-black text-blue-400">Extras</h1>
</div>

<div class="flex justify-center ml-4">
    <h2 class="text-lg font-black text-blue-100">Socials & More</h2>
</div>


    <div class="flex justify-start mt-10 flex-col items-start ml-20">
        <h1 class="text-3xl font-black text-blue-300">Socials</h1>
        <p class="text-lg font-black text-blue-100">Where to find me</p>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 ml-5 mr-5">
        {#each socials as social}
        <div class="border px-4 py-2 rounded-md shadow-md flex items-center justify-center hover:border-blue-500 h-full text-center p-5">
            <i class={`${social.icon} fa-2xl p-2`}></i>
            <Button variant="link" href="{social.link}" class="text-blue-500 hover:underline text-xl font-bold p-0 m-0">{social.name}</Button>
        </div>
        {/each}
    </div>

