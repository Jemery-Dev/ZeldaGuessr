<script>
    import '../app.css'
    import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
    import { Fa } from 'svelte-fa';
    import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

    const githubUrl = "https://github.com/Jemery-Dev";
    const twitterUrl = "https://twitter.com/JeremyPujadas";
</script>

<style>
    .logo {
        height: 40px;
    }
</style>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" >
    <svelte:fragment slot="lead">
        <LightSwitch class="mx-12" />
    </svelte:fragment>

    <img class="scale-75" src="/logo.png" alt="Logo"/>


    <svelte:fragment slot="trail">
        <a target="_blank" href={twitterUrl}>
            <button type="button" class="btn-icon-lg btn-icon variant-filled-secondary"><Fa icon={faTwitter} /></button>
        </a>

        <a target="_blank" href={githubUrl} >
            <button type="button" class="btn-icon-lg btn-icon variant-filled-secondary"><Fa icon={faGithub} /></button>
        </a>

    </svelte:fragment>
</AppBar>

<slot />