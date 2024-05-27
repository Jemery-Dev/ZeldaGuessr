<script>
    import games from '$lib/games.json';
    import locations from '$lib/locations.json';
    import items from '$lib/items.json';
    import bosses from '$lib/bosses.json';
    import characters from '$lib/characters.json';
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
                                <h3>{location.name}</h3>
                                <img alt="{location.name}" src="{location.src}" />
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}

            {#if type.type === "Items"}
                <div class="section-item">
                    {#each items as item}
                        {#if item.game === game.title}
                            <div class="card-item">
                                <h3>{item.name}</h3>
                                <img alt="{item.name}" src="{item.src}" />
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}

            {#if type.type === "Characters"}
                <div class="section-item">
                    {#each characters as character}
                        {#if character.game === game.title}
                            <div class="card-item">
                                <h3>{character.name}</h3>
                                <img alt="{character.name}" src="{character.src}" />
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}

            {#if type.type === "bosses"}
                <div class="section-item">
                    {#each bosses as boss}
                        {#if boss.game === game.title}
                            <div class="card-item">
                                <h3>{boss.name}</h3>
                                <img alt="{boss.name}" src="{boss.src}" />
                            </div>
                        {/if}
                    {/each}
                </div>
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
        max-width : 100%;
        height : auto;
    }

</style>
