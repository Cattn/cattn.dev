<script>
    export let data;

    let tags = "";

    let slugParts = data.slug.split("-");

    if (slugParts[1] === "creation") {
        tags = "creation";
    }
</script>

<h1>{data.slug}</h1>

<p>{tags}</p>