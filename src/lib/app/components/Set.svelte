<script lang="ts">
    import { Input } from "@app/ui/input";

    let {
        serial,
        previous = "-",
        weight = $bindable(),
        reps = $bindable(),
    } = $props();
</script>

<div class="flex gap-[8px] items-center w-full  pl-[0.75rem]">
    <p class="text-center h-[24px] w-[24px] font-bold">{serial}</p>
    <div class="flex w-full gap-[0.75rem]">
        <Input class="w-1/3" disabled value={previous} />
        <Input type="number" class="w-1/3" bind:value={weight} />
        <Input type="number" class="w-1/3" bind:value={reps} />
    </div>
</div>
