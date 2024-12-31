<script lang="ts">
	import Button from "@app/ui/button/button.svelte";
	import * as Card from "@app/ui/card";
	import type { PageData } from "./$types";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import Separator from "@app/ui/separator/separator.svelte";

	export let data: PageData;
</script>

<div class="flex flex-col gap-[1.5rem] min-h-[100vh] p-2">
	<div class="flex items-center justify-between">
		<h1 class="font-semibold text-md">Account: {data.user.email}</h1>
		<Button class="w-[128px]" variant="destructive">Sign Out</Button>
	</div>
	<Separator />
	<Button variant="secondary" on:click={() => goto("/workout")}>
		Start empty workout
	</Button>
	<Separator />
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between gap-2">
			<h1 class="text-2xl">Workout Plans</h1>
			<Button  class="w-[128px]" onclick={() => goto("/add-plan")}>Create</Button>
		</div>
		<div class="flex flex-wrap gap-2 w-full">
			{#each data.plans as plan}
				<Card.Root class="w-[calc(50%-4px)]">
					<Card.Content>{plan.name}</Card.Content>
				</Card.Root>
			{:else}
				<div
					class="bg-gray-100 flex h-[100px] w-full items-center justify-center rounded"
				>
					No workout plans
				</div>
			{/each}
		</div>
	</div>
	<Separator />
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
