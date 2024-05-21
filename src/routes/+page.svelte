<script>
    import types from '$lib/types.json';
    import games from '$lib/games.json';

    let jeuChoisi;
    let typeChoisi;

    function gotoPageJeu() {
        if (jeuChoisi) {
            window.location.href = `/guess?game_name=${encodeURIComponent(jeuChoisi)}&type=${encodeURIComponent(typeChoisi)}`;
        }
    }
</script>

<form on:submit|preventDefault={gotoPageJeu}>
    <label for="game-select">Choisir un jeu:</label>
    <select id="game-select" bind:value={jeuChoisi}>
        <option value="" disabled selected>Prendre un jeu</option>
        {#each games as game}
            <option value={game.title}>{game.title}</option>
        {/each}
    </select>

    <select id="type-select" bind:value={typeChoisi}>
        <option value="" disabled selected>Choisir une catégorie</option>
        {#each types as type}
            <option value={type.type}>{type.type}</option>
        {/each}
    </select>

    <button type="submit" disabled={!jeuChoisi}>Go to Game Details</button>
</form>

