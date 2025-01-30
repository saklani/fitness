<script lang="ts">
    import * as Card from "@app/ui/card";
    import Time from "./Time.svelte";

    const { workout } = $props();

</script>

<Card.Root>
    <Card.Header class="border-b">
        <div class="flex w-full justify-between items-center">
            <Card.Title>
                {workout.date.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </Card.Title>
            <Time value={workout.time} />
        </div>
    </Card.Header>
    <Card.Content>
        {#each workout.exercises as exercise}
            <div class="flex flex-col">
                <p class="font-semibold">
                    {exercise.name}
                </p>
                {#each exercise.sets as set}
                    <div class="h-[22px] flex w-full gap-[0.75rem] items-center">
                        <p class="w-[12px] text-sm font-bold">{set.index}.</p>
                        <p class="text-sm">{set.weight}kg x {set.repetitions}</p>
                    </div>
                {/each}
            </div>
        {/each}
    </Card.Content>
</Card.Root>
