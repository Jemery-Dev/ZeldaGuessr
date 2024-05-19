<script>
    import locations from '$lib/locations.json';
    import games from '$lib/games.json';
    let selectedGame;

    function gotoNextPage() {
        if (selectedGame) {
            window.location.href = `/guess?game_name=${encodeURIComponent(selectedGame)}`;
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

    <button type="submit" disabled={!selectedGame}>Go to Game Details</button>
</form>

{#if selectedGame}
    <h2>You selected: {selectedGame}</h2>
{/if}

