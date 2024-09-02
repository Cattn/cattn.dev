<script>
// @ts-nocheck

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

