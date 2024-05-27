<script>
    import { onMount } from 'svelte';
    import locations from '$lib/locations.json';
    import bosses from '$lib/bosses.json';
    import characters from '$lib/characters.json';
    import items from '$lib/items.json';
    import { page } from '$app/stores';

    const params = new URLSearchParams($page.url.search);
    const selectedGame = params.get('game_name');
    const selectedType = params.get('type');
    let randomIndex;
    let gameScore = 0;
    let attempts = 0;
    let totalAttempts = 0;
    let currentLocation = {};
    let selectedLocation = '';
    let isCorrect = null;
    let gameList = [];

    function getCategoryList(type) {
        switch (type.toLowerCase()) {
            case 'items':
                return items;
            case 'characters':
                return characters;
            case 'bosses':
                return bosses;
            default:
                return locations;
        }
    }

    function initializeLocations(categoryList) {
        let temporaryGameList = [];
        for (let category of categoryList) {
            if (category.game === selectedGame) {
                temporaryGameList.push(category);
            }
        }
        return temporaryGameList;
    }

    function selectRandomLocation() {
        randomIndex = Math.floor(Math.random() * gameList.length);
        currentLocation = gameList[randomIndex];
        selectedLocation = '';
        isCorrect = null;
    }

    function verifyAnswer() {
        totalAttempts++;
        const validLocationNames = gameList.map(question => question.name.toLowerCase());
        if (!validLocationNames.includes(selectedLocation.toLowerCase())) {
            isCorrect = false;
            return;
        }

        if (selectedLocation.toLowerCase() === currentLocation.name.toLowerCase()) {
            isCorrect = true;
            gameScore++;
            gameList = gameList.slice(0, randomIndex).concat(gameList.slice(randomIndex + 1));
        } else {
            isCorrect = false;
        }

        attempts++;

        if(gameList.length < 1 ){
            stopGame();
        }
    }


    function stopGame(){
        
    }
    onMount(function () {
        const categoryList = getCategoryList(selectedType);
        gameList = initializeLocations(categoryList);
        if (gameList.length > 0) {
            selectRandomLocation();
        }
    });
</script>

<div class="content-center items-center justify-center">
    <h1>You're looking for {selectedType} in {selectedGame}</h1>

    {#if currentLocation}
        <div class="text-4xl font-black">
            <h1>Guess the {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h1>
        </div>
        <div class="flex justify-center items-center">
            <img src={currentLocation.src} alt={selectedType}/>
        </div>

        <div class="flex items-center justify-center">
            <form on:submit|preventDefault={verifyAnswer}>
                <label>Choose a {selectedType} from this list:
                    <input list="locationList" name="locationInput" bind:value={selectedLocation}/>
                </label>
                <datalist id="locationList">
                    {#each gameList as question}
                        <option value={question.name.toLowerCase()}>{question.name}</option>
                    {/each}
                </datalist>
                <button type="submit">Submit</button>
            </form>
        </div>

        {#if isCorrect === true}
            <p>Correct! You have earned 1 point. The correct answer was indeed {currentLocation.name}.</p>
        {:else if isCorrect === false}
            <p>Incorrect !.</p>
        {/if}

        <p>Score: {gameScore} || {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} remaining: {gameList.length}</p>
        <p>Total attempts: {totalAttempts}</p>
    {/if}
</div>

<style>
    @import 'styles.css';
</style>
