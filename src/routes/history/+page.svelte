<script lang="ts">
    import History from "@app/components/History.svelte";
    import * as Card from "@app/ui/card";

    const { data } = $props();
</script>

<h1 class="title pb-[24px]">Workout History</h1>
{#each data.workouts as workout}
    <History {workout} />
{:else}
    <Card.Root>
        <Card.Content>
            <Card.Title>Your workout history will show up here</Card.Title>
        </Card.Content>
    </Card.Root>
{/each}
