<script lang="ts">
    import { goto } from "$app/navigation";
    import { type TExercise, type TWorkoutExercise } from "$lib/db/schema";
    import Exercise from "@app/components/workout/Exercise.svelte";
    import Timer from "@app/components/Timer.svelte";
    import { localStore } from "@app/localStore.svelte.js";
    import { Button } from "@app/ui/button";
    import { Input } from "@app/ui/input";
    import * as Sheet from "@app/ui/sheet";
    import Fuse from "fuse.js";
    import Header from "@app/components/Header.svelte";

    const fuseOptions = {
        isCaseSensitive: false,
        includeScore: false,
        shouldSort: true,
        minMatchCharLength: 1,
        fieldNormWeight: 1,
        keys: ["name"],
    };

    const { data } = $props();

    const session = localStore<Partial<TWorkoutExercise & { name: string }>[]>(
        "workout",
        [],
    );

    const fuse = new Fuse<TExercise>(data.exercises, fuseOptions);

    let searchPattern = $state("");

    const result = $derived(fuse.search(searchPattern));

    function addExercise(exercise: TExercise) {
        if (
            session.value.findIndex((e) => e.exerciseId === exercise.id) === -1
        ) {
            session.value.push({
                exerciseId: exercise.id,
                name: exercise.name,
                sets: [{ index: 1, previous: "", repetitions: 0, weight: 0 }],
            });
        }
    }

    function removeExercise(exerciseId: string) {
        const index = session.value.findIndex(
            (e) => e.exerciseId === exerciseId,
        );
        if (index !== -1) {
            session.value.splice(index, 1);
        }
    }

    async function save() {
        const startTime = localStorage.getItem("timer");
        if (startTime === null) {
            return;
        }

        const currentTime = new Date();
        const time =
            currentTime.getTime() / 1000 - Date.parse(startTime) / 1000;
        await fetch("/api/workout", {
            body: JSON.stringify({
                exercises: session.value,
                time,
            }),
            method: "post",
        });
        if (session.value.length > 0) {
            session.value = [];
        }
        goto("/");
        session.clear();
    }

    function cancel() {
        if (session.value.length > 0) {
            session.value = [];
        }
        goto("/");
        session.clear();
    }

    function addSet(eId: string) {
        const eIndex = session.value.findIndex((e) => e.exerciseId === eId);
        const exercise = session.value[eIndex];
        const sets = exercise.sets!;
        let previous = sets[sets.length - 1];
        let new_set = {
            ...previous,
            index: previous ? previous.index + 1 : 1,
        };
        sets.push(new_set);

        exercise.sets = sets;
        session.value[eIndex] = exercise;
    }

    function removeSet(eId: string, index: number) {
        const eIndex = session.value.findIndex((e) => e.exerciseId === eId);
        const deleteIndex = session.value[eIndex].sets!.findIndex(
            (s) => s.index == index,
        );
        session.value[eIndex].sets!.splice(deleteIndex, 1);
        session.value[eIndex].sets!.forEach((set, i) => {
            set.index = i + 1;
        });
    }
</script>

<Header>
    <Timer />
    <div class="flex gap-1">
        <Button variant="destructive" onclick={cancel}>Cancel</Button>
        <Button onclick={save}>Save</Button>
    </div>
</Header>
<div class="flex flex-col pb-[40px] gap-[8px]"> 
    {#each session.value as exercise}
        <Exercise
            eId={exercise.exerciseId}
            {addSet}
            {removeSet}
            name={exercise.name}
            sets={exercise.sets}
            removeExercise={() => removeExercise(exercise.exerciseId!)}
        />
    {/each}
</div>
<Sheet.Root>
    <Sheet.Trigger asChild let:builder>
        <Button
            class="fixed bottom-4 mx-auto inset-x-0 z w-[300px]"
            builders={[builder]}>Add Exercise</Button
        >
    </Sheet.Trigger>
    <Sheet.Content side="bottom">
        <Sheet.Header>
            <Sheet.Title>Exercise</Sheet.Title>
            <Sheet.Description>Select an exercise to track</Sheet.Description>
        </Sheet.Header>

        <div class="flex flex-col h-[70vh] overflow-y-scroll">
            <Input class="outline-none" bind:value={searchPattern} />
            <div
                class="flex flex-col border border-[1px] overflow-y-scroll rounded-lg"
            >
                {#each result as res}
                    <Sheet.Close>
                        <button
                            class="border-b border-1 flex p-1 w-full hover:bg-gray-100"
                            onclick={() => addExercise(res.item)}
                        >
                            {res.item.name}
                        </button>
                    </Sheet.Close>
                {:else}
                    <div
                        class="flex items-center justify-center min-h-[100px] uppercase text-sm"
                    >
                        <p>Search for an exercise</p>
                    </div>
                {/each}
            </div>
        </div>
    </Sheet.Content>
</Sheet.Root>
