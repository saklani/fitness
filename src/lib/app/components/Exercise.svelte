<script lang="ts">
    import * as Card from "@app/ui/card/index.js";
    import { Button } from "@app/ui/button/index.js";
    import Set from "./Set.svelte";
    import DeleteExercise from "./DeleteExercise.svelte";
    import {XIcon} from "lucide-svelte";


    let { eId, name, sets, removeExercise, addSet, removeSet } = $props();

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
                <div class="w-[36px] font-bold"></div>
                <div class="flex w-full gap-[0.75rem]">
                    <p class="w-1/3">Previous</p>
                    <p class="w-1/3">kg</p>
                    <p class="w-1/3">Reps</p>
                </div>
            </div>
            {#each sets ?? [] as set}
                <div class="flex items-center w-full">
                    <Button
                        class="w-[36px] h-[36px] p-0"
                        variant="outline"
                        on:click={() => removeSet(eId, set)}
                    >
                        <XIcon size={16}/>
                    </Button>
                    <Set
                        index={set.index}
                        previous={set.previous}
                        bind:weight={set.weight}
                        bind:reps={set.repetitions}
                    />
                </div>
            {/each}
        </div>
    </Card.Content>
    <Card.Footer class="justify-end">
        <Button on:click={() => addSet(eId)}>Add Set</Button>
    </Card.Footer>
</Card.Root>
