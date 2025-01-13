<script lang="ts">
    import * as Card from "@app/ui/card";
    import Time from "./Time.svelte";

    const { workout } = $props();

</script>

<Card.Root class="bg-gray-100">
    <Card.Header>
        <div class="flex w-full justify-between items-center">
            <Card.Title>
                {workout.date.toDateString()}
            </Card.Title>
            <Time value={workout.time} />
        </div>
    </Card.Header>
    <Card.Content>
        {#each workout.exercises as exercise}
            <div class="flex flex-col mt-3">
                <p class="font-semibold">
                    {exercise.name}
                </p>
                {#each exercise.sets as set}
                    <div class="flex w-full gap-[0.75rem] items-center">
                        <p class="w-[12px] text-sm font-bold">{set.index}.</p>
                        <p class="">{set.weight}kg x {set.repetitions}</p>
                    </div>
                {/each}
            </div>
        {/each}
    </Card.Content>
</Card.Root>
