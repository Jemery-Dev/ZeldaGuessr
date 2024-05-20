<script>
    import types from '$lib/types.json';
    import games from '$lib/games.json';

    let selectedGame;
    let selectedType;

    function gotoNextPage() {
        if (selectedGame) {
            window.location.href = `/guess?game_name=${encodeURIComponent(selectedGame)}&type=${encodeURIComponent(selectedType)}`;
        }
    }
</script>

<form on:submit|preventDefault={gotoNextPage}>
    <label for="game-select">Choose a Zelda game:</label>
    <select id="game-select" bind:value={selectedGame}>
        <option value="" disabled selected>Select a game</option>
        {#each games as game}
            <option value={game.title}>{game.title}</option>
        {/each}
    </select>

    <select id="type-select" bind:value={selectedType}>
        <option value="" disabled selected>Select a type</option>
        {#each types as type}
            <option value={type.type}>{type.type}</option>
        {/each}
    </select>

    <button type="submit" disabled={!selectedGame}>Go to Game Details</button>
</form>

{#if selectedGame}
    <h2>You selected: {selectedGame}</h2>
{/if}

