<script lang="ts">
    import { page } from '$app/state';
    import * as Card from "$lib/components/ui/card/index.js";
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import { onMount } from "svelte";
    import { fly } from 'svelte/transition';

    let mediaPath = page.url.origin + "/media/";
    onMount(() => {
        document.title = "About - Cattn.dev";
    })
    let socials = [
        { icon: 'fa-solid fa-image', name: 'Media', link: mediaPath },
        { icon: 'fa-brands fa-github', name: 'GitHub', link: 'https://github.com/Cattn' },
        { icon: 'fa-brands fa-discord', name: 'Discord', link: 'https://discord.com/users/523927057722376204' },
        { icon: 'fa-brands fa-twitch', name: 'Twitch', link: 'https://www.twitch.tv/cattn_' },
        { icon: 'fa-brands fa-youtube', name: 'Youtube', link: 'https://www.youtube.com/@cattn' },
        { icon: 'fa-brands fa-steam', name: 'Steam', link: 'https://steamcommunity.com/id/cattn/' },
        { icon: 'fa-brands fa-spotify', name: 'Spotify', link: 'https://open.spotify.com/user/1q9jqzkqmtqitlg498o29ui6d?si=709c6bbb565c4ff8' },
        { icon: 'fa-regular fa-keyboard', name: 'Monkeytype', link: 'https://monkeytype.com/profile/Cattn' },
        { icon: 'fa-solid fa-globe', name: 'mathstudy.dev', link: 'https://mathstudy.dev/' },
        { icon: 'fa-solid fa-music', name: 'Stats.fm', link: 'https://stats.fm/catt' },
    ];
</script>

<section class="container mx-auto px-4 pt-16 pb-8 text-center" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
    <h1 class="text-5xl font-black text-accent-blue">Extras</h1>
    <h2 class="mt-1 text-xl font-semibold text-muted-foreground">Socials & More</h2>
</section>

<section class="container mx-auto px-4 py-6 mb-10" in:fly="{{ y: 50, duration: 500, delay: 400 }}">
    <div class="mb-6 text-center sm:text-left">
        <h2 class="text-3xl font-black text-accent-blue">Socials</h2>
        <p class="text-lg font-semibold text-muted-foreground">Where to find me</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each socials as social (social.name)}
            <a href={social.link} target="_blank" rel="noopener noreferrer" class="block group">
                <Card.Root class="transition-all group-hover:shadow-lg group-hover:border-accent-blue/50 h-full">
                    <Card.Content class="p-4 flex items-center justify-center space-x-4">
                        <i class={`${social.icon} fa-xl w-6 text-center text-muted-foreground group-hover:text-accent-blue transition-colors`}></i>
                        <span class="text-base font-medium text-foreground group-hover:text-accent-blue transition-colors">{social.name}</span>
                    </Card.Content>
                </Card.Root>
            </a>
        {/each}
    </div>
</section>

