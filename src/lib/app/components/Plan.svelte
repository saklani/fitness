<script lang="ts">
    import * as Card from "@app/ui/card/index.js";
    import DeletePlan from "./DeletePlan.svelte";
    import { goto, invalidateAll } from "$app/navigation";
    import type { TExercise } from "$lib/db/schema";
    import { Button } from "@app/ui/button";

    let { plan, session, data } = $props();

    function addExercise(exercise: TExercise) {
        if (
            session.value.findIndex(
                (e: { exerciseId: string }) => e.exerciseId === exercise.id,
            ) === -1
        ) {
            session.value.push({
                exerciseId: exercise.id,
                name: exercise.name,
                sets: [{ index: 1, previous: "", repetitions: 0, weight: 0 }],
            });
        }
    }
</script>

<Card.Root class="w-full">
    <Card.Header class="flex-row w-full items-center justify-between">
        <Card.Title>{plan.name}</Card.Title>

        <DeletePlan
            deletePlan={async () => {
                await fetch("/api/plan", {
                    method: "delete",
                    body: JSON.stringify({ id: plan.id }),
                });

                await invalidateAll();
            }}
        />
    </Card.Header>
    <Card.Content>
        {#each plan.exerciseIds as exerciseId}
            <div>
                {data.exercises.find((e: { id: string }) => e.id === exerciseId)
                    ?.name ?? ""}
            </div>
        {/each}
    </Card.Content>
    <Card.Footer class="justify-end">
        <Button
            class="w-[96px]"
            onclick={() => {
                // TODO: Move to backend
                for (const exerciseId of plan.exerciseIds) {
                    const e = data.exercises.find((e: { id: string }) => e.id === exerciseId);
                    if (e) addExercise(e);
                }
                goto("/workout");
            }}
        >
            Start
        </Button>
    </Card.Footer>
</Card.Root>
