<script lang="ts">
    import Header from "@app/components/Header.svelte";
    import History from "@app/components/History.svelte";
    import * as Card from "@app/ui/card";

    const { data } = $props();
</script>

<Header>
    <h1 class="title text-lg">Workout History</h1>
</Header>
{#each data.workouts as workout}
    <History {workout} />
{:else}
    <Card.Root>
        <Card.Content>
            <Card.Title>Your workout history will show up here</Card.Title>
        </Card.Content>
    </Card.Root>
{/each}
