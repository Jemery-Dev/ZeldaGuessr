<script>
    import { onMount } from 'svelte';
    import locations from '$lib/locations.json';

    let gameScore = 0;
    let guesses = 0;
    let currentLocation = {};
    let selectedLocation = '';
    let isCorrect = null;

    function selectRandomLocation() {
        currentLocation = locations[Math.floor(Math.random() * locations.length)];
        selectedLocation = '';
        isCorrect = null;
    }

    function checkAnswer() {
        if (selectedLocation.toLowerCase() === currentLocation.location_name.toLowerCase()) {
            isCorrect = true;
            gameScore++;
            guesses++;
            if(guesses == 10){

            }
        } else {
            isCorrect = false;
        }
        selectRandomLocation();
    }

    onMount(selectRandomLocation);
</script>

<div class="content-center items-center justify-center">
{#if currentLocation}
    <div class="text-4xl font-black">
        <h1 >Guess the Location</h1>
    </div>
    <div class="flex justify-center items-center ">
        <img src={currentLocation.location_src} alt="Location" />
    </div>

    <div class="flex items-center justify-center">
        <form on:submit|preventDefault={checkAnswer}>
            <label>Choose a location from this list:
                <input list="locationList" name="locationInput" bind:value={selectedLocation} />
            </label>
            <datalist id="locationList">
                {#each locations as location}
                    <option value={location.location_name}></option>
                {/each}
            </datalist>
            <button type="submit">Submit</button>
        </form>
    </div>

    {#if isCorrect === true}
        <p>Correct! You earned 1 point.</p>
    {:else if isCorrect === false}
        <p>Incorrect! The correct answer is {currentLocation.location_name}.</p>
    {/if}

    <p>Score: {gameScore}</p>
{/if}
</div>


<style>
    @import 'styles.css';
</style>