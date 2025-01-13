<script lang="ts">
    import { localStore } from "@app/localStore.svelte";
    import { onMount } from "svelte";
    import Time from "./Time.svelte";

    const timer = localStore("timer", (new Date()).toString());

    let value = $state(0);

    onMount(() => {
        setInterval(() => {
            const currentTime = new Date();
            value = currentTime.getTime() / 1000 - Date.parse(timer.value)  / 1000;
        }, 1000);
    });

</script>

{#key value}
    <Time {value} />
{/key}
