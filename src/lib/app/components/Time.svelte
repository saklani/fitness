<script lang="ts">
    const { value } = $props();
    const hh = Math.floor(value / 3600)
            .toString()
            .padStart(2, "0"),
        mm = Math.floor((value / 60) % 60)
            .toString()
            .padStart(2, "0"),
        ss = Math.floor(value % 60)
            .toString()
            .padStart(2, "0");
</script>

<p class="text-md md:text-xl font-light">
    {hh}:{mm}:{ss}
</p>
