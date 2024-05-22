<script>
    import games from '$lib/games.json';
    import locations from '$lib/locations.json';
    //import items from '$lib/items.json';
    //import characters from '$lib/characters.json';
    import types from '$lib/types.json';
</script>

{#each games as game}
    <div class="game-section">
        <h1>{game.title}</h1>

        {#each types as type}
            <h2>{type.type}</h2>

            {#if type.type === "Locations"}
                <div class="section-item">
                    {#each locations as location}
                        {#if location.game === game.title}
                            <div class="card-item">
                                <h3>{location.location_name}</h3>
                                <img alt="{location.location_name}" src="{location.location_src}" />
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}

            {#if type.type === "Items"}
            {/if}

            {#if type.type === "Characters"}
            {/if}

            {#if type.type === "Dungeons maps"}
            {/if}
        {/each}
    </div>
{/each}

<style>
    .game-section {
        margin-bottom: 2em;
    }
    .card-item {

        margin-right: 2em;
        margin-left: 2em;
        margin-bottom: 1em;
        flex: 1 1 200px;
    }

    .section-item{
        display: flex;
        flex-wrap: wrap;
    }

    .section-item img {
        width : 256px;
        height: 256px;
    }

</style>
