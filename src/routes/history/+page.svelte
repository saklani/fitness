<script lang="ts">
    import History from "@app/components/History.svelte";
    import * as Card from "@app/ui/card";

    const { data } = $props();
</script>

<h1 class="text-xl font-bold">Workout History</h1>
{#each data.workouts as workout}
    <History {workout}/>
{:else}
    <Card.Root class="bg-gray-100 h-[300px]">
        <Card.Content>
            <Card.Title>Your workout history will show up here</Card.Title>
        </Card.Content>
    </Card.Root>
{/each}
