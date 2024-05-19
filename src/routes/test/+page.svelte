<script>
    import locations from '$lib/locations.json';
    locations.sort((a, b) => {
        if (a.difficulty < b.difficulty) return -1;
        if (a.difficulty > b.difficulty) return 1;
        return 0;
    });
</script>

{#each locations as location}
    {#if location.location_name != null}
        <h1>{location.location_name}</h1>
        <img alt="{location.location_name}" src="{location.location_src}"/>
        <h2>{location.difficulty}</h2>
    {/if}
{/each}