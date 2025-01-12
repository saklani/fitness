<script lang="ts">
    import { localStore } from "@app/localStore.svelte";
    import { onDestroy } from "svelte";
    import Time from "./Time.svelte";

    const timer = localStore("timer", 0);

    $effect(() => {
        setInterval(() => {
            timer.value += 1;
        }, 1000);
    });

    onDestroy(() => timer.clear());
</script>

{#key timer.value}
    <Time value={timer.value} />
{/key}
