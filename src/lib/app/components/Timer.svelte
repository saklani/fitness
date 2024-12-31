<script lang="ts">
    import { localStore } from "@app/localStore.svelte";
    import { onDestroy, onMount } from "svelte";

    let hh = $state("--"),
        mm = $state("--"),
        ss = $state("--");

    const timer = localStore("timer", 0);

    onMount(() => {
        setInterval(() => {
            timer.value += 1;
            hh = Math.floor(timer.value / 3600)
                .toString()
                .padStart(2, "0");
            mm = Math.floor((timer.value / 60) % 60)
                .toString()
                .padStart(2, "0");
            ss = Math.floor(timer.value % 60)
                .toString()
                .padStart(2, "0");
        }, 1000);
    });

    onDestroy(() => timer.clear());
</script>

<p class="text-xl font-bold">
    {hh}:{mm}:{ss}
</p>
