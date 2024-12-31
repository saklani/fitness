<script lang="ts">
	import Button from "@app/ui/button/button.svelte";
	import * as Card from "@app/ui/card";
	import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

	export let data: PageData;
</script>

<div class="flex flex-col gap-[1.5rem] min-h-[100vh] p-2">
	<div class="flex items-center justify-between">
		<h1 class="font-semibold text-md">Account: {data.user.email}</h1>
		<Button variant="destructive">Sign Out</Button>
	</div>
	<div class="flex flex-col">
		<h1 class="text-2xl">Workout Plans</h1>
		<div class="grid grid-cols-2 gap-2">
			<Card.Root>
				<Card.Content>01</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Content>01</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Content>01</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Content>01</Card.Content>
			</Card.Root>
		</div>
	</div>
	<Button variant="secondary" on:click={() => goto("/workout")}>Start empty workout</Button>
	<div class="flex gap-2">
		<Card.Root class="w-1/2">
			<Card.Header>
				<Card.Title>History</Card.Title>
			</Card.Header>
			<Card.Content></Card.Content>
		</Card.Root>
		<Card.Root class="w-1/2">
			<Card.Header>
				<Card.Title>Settings</Card.Title>
			</Card.Header>

			<Card.Content></Card.Content>
		</Card.Root>
	</div>
</div>
