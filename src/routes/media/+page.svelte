<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { onMount } from "svelte";
    import { fly } from 'svelte/transition';

    onMount(() => {
        document.title = "Media - Cattn.dev";
    })
    let media = [
        { image: 'https://maple.kolf.pro/SMS/uploads/FBT_IMG_1.png', alt: 'Image in VRChat using FBT', desc: 'failed pose... [Japan Shrine]' },
        { image: 'https://maple.kolf.pro/SMS/upload/VR_NOFBT_1.png', alt: 'Image in VRChat showing me', desc: 'nice framing [Japan Shrine]' },
        { image: 'https://maple.kolf.pro/SMS/upload/VR_1.png', alt: 'Image in VRChat', desc: 'beautiful scenery [Japan Shrine]' },
    ];
</script>

<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
    <h1 class="text-5xl font-black text-accent-blue">Media</h1>
    <h2 class="mt-1 text-xl font-semibold text-muted-foreground">Assorted Photos</h2>
</section>

<section class="container mx-auto px-4 py-6 mb-10" in:fly="{{ y: 50, duration: 500, delay: 400 }}">
    <div class="mb-6 text-center sm:text-left">
        <h2 class="text-3xl font-black text-accent-blue">VRChat</h2>
        <p class="text-lg font-semibold text-muted-foreground">Some Cool Photos</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each media as item (item.image)}
            <Card.Root class="overflow-hidden transition-all hover:shadow-lg hover:border-accent-blue/50">
                <Card.Content class="p-0 aspect-video flex items-center justify-center bg-muted/30">
                    <a href={item.image} target="_blank" rel="noopener noreferrer" class="block w-full h-full">
                        <img alt={item.alt} src={item.image} class="w-full h-full object-contain transition-transform hover:scale-105"/>
                    </a>
                </Card.Content>
                <Card.Footer class="p-3 bg-background">
                    <p class="text-sm text-center text-muted-foreground w-full truncate" title={item.desc}>{item.desc}</p>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
</section>

