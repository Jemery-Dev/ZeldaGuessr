<script>
    import { onMount } from 'svelte';
    import locations from '$lib/locations.json';
    import { page } from '$app/stores';

    const params = new URLSearchParams($page.url.search);
    const jeuSelectionne = params.get('game_name');
    const typeSelectionne = params.get('type');
    let indexAleatoire;
    let scoreJeu = 0;
    let tentatives = 0;
    let emplacementActuel = {};
    let emplacementSelectionne = '';
    let estCorrect = null;
    let listeJeu = [];

    function initialiserEmplacements(listeCategories) {
        let listeJeuTemporaire = [];
        for (let categorie of listeCategories) {
            if (categorie.game === jeuSelectionne) {
                listeJeuTemporaire.push(categorie);
            }
        }
        return listeJeuTemporaire;
    }

    function selectionnerEmplacementAleatoire() {
        indexAleatoire = Math.floor(Math.random() * listeJeu.length);
        emplacementActuel = listeJeu[indexAleatoire];
        emplacementSelectionne = '';
        estCorrect = null;
    }

    function verifierReponse() {
        listeJeu = listeJeu.slice(0, indexAleatoire).concat(listeJeu.slice(indexAleatoire + 1));
        const nomsEmplacementsValid = listeJeu.map(question => question.name.toLowerCase());
        if (!nomsEmplacementsValid.includes(emplacementSelectionne.toLowerCase())) {
            estCorrect = false;
            return;
        }

        if (emplacementSelectionne.toLowerCase() === emplacementActuel.name.toLowerCase()) {
            estCorrect = true;
            scoreJeu++;
        } else {
            estCorrect = false;
        }
        tentatives++;
        if (tentatives < 10 && listeJeu.length > 0) {
            selectionnerEmplacementAleatoire();
        }
    }

    onMount(function () {
        listeJeu = initialiserEmplacements(locations);
        if (listeJeu.length > 0) {
            selectionnerEmplacementAleatoire();
        }
    });
</script>

<div class="content-center items-center justify-center">
    <h1>Vous cherchez {typeSelectionne} dans {jeuSelectionne}</h1>

    {#if emplacementActuel}
        <div class="text-4xl font-black">
            <h1>Devinez l'Emplacement</h1>
        </div>
        <div class="flex justify-center items-center ">
            <img src={emplacementActuel.src} alt="Emplacement"/>
        </div>

        <div class="flex items-center justify-center">
            <form on:submit|preventDefault={verifierReponse}>
                <label>Choisissez un emplacement dans cette liste :
                    <input list="listeEmplacements" name="inputEmplacement" bind:value={emplacementSelectionne}/>
                </label>
                <datalist id="listeEmplacements">
                    {#each listeJeu as question}
                        <option value={question.name}></option>
                    {/each}
                </datalist>
                <button type="submit" disabled={!listeJeu.map(question => question.name.toLowerCase()).includes(emplacementSelectionne.toLowerCase())}>Soumettre</button>
            </form>
        </div>

        {#if estCorrect === true}
            <p>Correct ! Vous avez gagné 1 point.</p>
        {:else if estCorrect === false}
            <p>Incorrect ! La bonne réponse est {emplacementActuel.name}.</p>
        {/if}

        <p>Score : {scoreJeu} || Locations remaining : {listeJeu.length}</p>
    {/if}
</div>

<style>
    @import 'styles.css';
</style>
