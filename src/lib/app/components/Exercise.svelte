<script lang="ts">
    import * as Card from "@app/ui/card/index.js";
    import { Button } from "@app/ui/button/index.js";
    import Set from "./Set.svelte";
    import DeleteExercise from "./DeleteExercise.svelte";

    type tSet = {
        serial: number;
        previous: string;
        weight: string;
        reps: string;
    };

    let { name, removeExercise } = $props();
    const sets: tSet[] = $state([
        { serial: 1, previous: "", weight: "", reps: "" },
    ]);

    function addSet() {
        let previous = sets[sets.length - 1];
        let new_set = {
            ...previous,
            serial: previous ? previous.serial + 1 : 1,
        };
        sets.push(new_set);
    }

    function removeSet(set: tSet) {
        const deleteIndex = sets.indexOf(set);
        sets.splice(deleteIndex, 1);
        sets.forEach((set, serial) => {
            set.serial = serial + 1;
        });
    }
</script>

<Card.Root>
    <Card.Header class="flex-row items-center justify-between">
        <Card.Title>{name}</Card.Title>
        <div><DeleteExercise {removeExercise} /></div>
    </Card.Header>
    <Card.Content>
        <div class="flex flex-col gap-[6px]">
            <div class="flex w-full gap-[8px]">
                <div class="w-[36px]"></div>
                <div class="w-[24px] font-bold"></div>
                <div class="flex w-full gap-[0.75rem]">
                    <p class="w-1/3">Previous</p>
                    <p class="w-1/3">kg</p>
                    <p class="w-1/3">Reps</p>
                </div>
            </div>
            {#each sets as set}
                <div class="flex items-center w-full">
                    <Button
                        class="w-[36px] h-[36px]"
                        variant="outline"
                        on:click={() => removeSet(set)}
                    >
                        x
                    </Button>
                    <Set
                        serial={set.serial}
                        previous={set.previous}
                        bind:weight={set.weight}
                        bind:reps={set.reps}
                    />
                </div>
            {/each}
        </div>
    </Card.Content>
    <Card.Footer class="justify-end">
        <Button on:click={addSet}>Add Set</Button>
    </Card.Footer>
</Card.Root>
