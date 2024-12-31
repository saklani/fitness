<script lang="ts">
    import { goto } from "$app/navigation";
    import Exercise from "@app/components/Exercise.svelte";
    import Timer from "@app/components/Timer.svelte";
    import { localStore } from "@app/localStore.svelte.js";
    import { Button } from "@app/ui/button";
    import { Input } from "@app/ui/input";
    import * as Sheet from "@app/ui/sheet";
    import Fuse from "fuse.js";

    type TExercise = Partial<{ id: number; name: string }>;

    const fuseOptions = {
        isCaseSensitive: false,
        includeScore: false,
        shouldSort: true,
        minMatchCharLength: 1,
        fieldNormWeight: 1,
        keys: ["name"],
    };

    const { data } = $props();

    const session = localStore<TExercise[]>("workout", []);
    const timer = localStore("timer", 0);

    const fuse = new Fuse<TExercise>(data.exercises, fuseOptions);

    let searchPattern = $state("");

    const result = $derived(fuse.search(searchPattern));

    function addExercise(exercise: TExercise) {
        if (!session.value.includes(exercise)) {
            session.value.push(exercise);
        }
    }

    function removeExercise(exercise: TExercise) {
        let removeIndex = session.value.indexOf(exercise);
        session.value.splice(removeIndex, 1);
    }

    async function save() {
        await fetch("/api/workout", {
            body: JSON.stringify({
                exercises: session.value.map((e) => e.id!),
                time: timer.value,
            }),
            method: "post"
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
</script>

<div class="flex flex-col h-[100vh] gap-2 p-2">
    <div class="flex items-center justify-between h-[3rem]">
        <Timer />
        <div class="flex gap-1">    
            <Button variant="destructive" onclick={cancel}>Cancel</Button>
            <Button onclick={save}>Save</Button>
        </div>
    </div>
    <div
        class="bg-gray-100 border-1 border flex flex-col h-[calc(100vh-3rem)] gap-[4px] p-[2px] rounded-sm overflow-y-scroll"
    >
        {#each session.value as exercise}
            <Exercise
                name={exercise.name}
                removeExercise={() => removeExercise(exercise)}
            />
        {/each}
    </div>
    <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
            <Button builders={[builder]}>Add Exercise</Button>
        </Sheet.Trigger>
        <Sheet.Content side="bottom">
            <Sheet.Header>
                <Sheet.Title>Exercise</Sheet.Title>
                <Sheet.Description>
                    Select an exercise to track
                </Sheet.Description>
            </Sheet.Header>

            <div class="flex flex-col h-[70vh] overflow-y-scroll gap-2">
                <Input class="outline-none" bind:value={searchPattern} />
                <div
                    class="flex flex-col border border-1 overflow-y-scroll rounded-lg"
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
                            class="flex items-center justify-center min-h-[100px]"
                        >
                            <p>Search for an exercise</p>
                        </div>
                    {/each}
                </div>
            </div>
        </Sheet.Content>
    </Sheet.Root>
</div>
