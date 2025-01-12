<script lang="ts">
    import * as Card from "@app/ui/card";
    import Time from "./Time.svelte";

    type TWorkout = { time: number; date: Date };
    const { workout }: { workout: TWorkout } = $props();
</script>

<Card.Root class="bg-gray-100">
    <Card.Header>
        <Card.Title class="text-md"
            >{workout.date.toLocaleDateString()}</Card.Title
        >
        <Time value={workout.time} />
    </Card.Header>
    <Card.Content></Card.Content>
</Card.Root>
