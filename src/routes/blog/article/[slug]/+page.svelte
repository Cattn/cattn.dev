<script>
// @ts-nocheck
    import markdownit from 'markdown-it'
    import { onMount } from 'svelte';

    import { page } from '$app/stores';  
    let path = $page.url.pathname  

    import articles from '../../articles.json';

    const article = articles.find((article) => article.link === path);

    export let data;

    let tags = "";

    let slugParts = data.slug.split("-");

    if (slugParts[1] === "creation") {
        tags = "creation";
    }
    let content = "Loading Article...";

    onMount(() => {
        loadArticle();
    });

    async function loadArticle() {
        const res = await fetch("/articles/" + data.slug + ".md");
        if (res.status === 404) {
            content = "Article Not Found";
            return;
        }
        const mdContent = await res.text();
        console.log(mdContent);
        content = md.render(mdContent);
    }


    const md = markdownit({
        html: true,
        linkify: true,
        typographer: true
    });
</script>

    <div class="flex justify-center mt-10">
        <h1 class="text-5xl font-black text-blue-400">{article.title}</h1>
    </div>

    <div class="flex justify-center ml-6">
        <h2 class="text-lg font-black text-blue-100">{article.description}</h2>
    </div>

    <div class="flex justify-center ml-6">
        <p class="text-sm text-blue-800">{article.date}</p>
    </div>

    <div class="flex justify-center ml-6 mt-4">
        <p class="text-sm text-blue-500">Tag: <span class="text-sm text-blue-300 bg-slate-600 p-2 rounded-md">{tags}</span></p>
    </div>

<div class="flex justify-center mt-10 mx-20 py-2 rounded-md shadow-md h-full">
    <div class="mx-44 flex flex-col [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_p]:text-base [&_h1]:text-blue-400 [&_h1]:font-bold [&_a]:text-blue-500 [&_a]:hover:underline [&_h2]:text-blue-400 [&_li]:ml-4 [&_li]:list-disc [&_blockquote]:text-gray-500 [&_blockquote]:dark:text-gray-400">
        {@html content}
    </div>
</div>
