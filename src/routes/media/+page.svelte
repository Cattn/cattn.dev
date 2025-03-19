<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import { onMount } from "svelte";
    import { page } from '$app/stores';  

    onMount(() => {
        document.title = "Media - Cattn.dev";
    })
    let media = [
        { image: '/images/media/FBT_IMG_1.png', alt: 'Image in VRChat using FBT', desc: 'failed pose... [Japan Shrine]' },
        { image: '/images/media/VR_NOFBT_1.png', alt: 'Image in VRChat showing me', desc: 'nice framing [Japan Shrine]' },
        { image: '/images/media/VR_1.png', alt: 'Image in VRChat', desc: 'beautiful scenery [Japan Shrine]' },
    ];
</script>

<div class="flex justify-center mt-10">
    <h1 class="text-5xl font-black text-blue-400">Media</h1>
</div>

<div class="flex justify-center ml-4">
    <h2 class="text-lg font-black text-blue-100">Assorted Photos</h2>
</div>


    <div class="flex justify-start mt-10 flex-col items-start ml-5">
        <h1 class="text-3xl font-black text-blue-300">VRChat</h1>
        <p class="text-lg font-black text-blue-100">Some Cool Photos</p>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-2 ml-5 mr-5 mb-5">
        {#each media as item}
        <div class="border px-4 py-2 flex-col rounded-md shadow-md flex items-center justify-center hover:border-blue-500 h-full text-center p-5">
            <img alt="{item.alt}" src={item.image} class="p-2"/>
            <Button title="View Full Image" variant="link" href="{$page.url.origin}{item.image}" class="text-blue-500 hover:underline text-xl font-bold p-0 m-0">{item.desc}</Button>
        </div>
        {/each}
    </div>

