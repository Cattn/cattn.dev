<script lang="ts">
    import articles from './articles.json';

    import {Button} from "$lib/components/ui/button/index.js";
</script>

<div class="flex justify-center mt-10">
    <h1 class="text-5xl font-black text-blue-400">Blog</h1>
</div>

<div class="flex justify-center ml-6">
    <h2 class="text-lg font-black text-blue-100">My thoughts</h2>
</div>

<div class="flex flex-col items-center mt-2 mx-5">
    {#each articles as article}
        <div class="mt-5 w-full sm:w-1/2 lg:w-1/3 border rounded-md shadow-md flex flex-col items-center justify-center hover:border-blue-500 h-full text-center p-4 mx-2">
            <Button variant="link" href="{article.link}" class="p-2 text-blue-500 hover:underline text-xl font-bold m-0">
                {article.title}
            </Button>
            <p>{article.description}</p>
            <p class="text-sm text-blue-800">{article.date}</p>
        </div>
    {/each}
</div>