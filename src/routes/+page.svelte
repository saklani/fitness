<script lang="ts">
	import { goto } from "$app/navigation";
	import { localStore } from "@app/localStore.svelte";
	import Button from "@app/ui/button/button.svelte";
	import * as Card from "@app/ui/card";
	import Separator from "@app/ui/separator/separator.svelte";
	import { HistoryIcon } from "lucide-svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	type TExercise = Partial<{ id: number; name: string }>;
	const session = localStore<TExercise[]>("workout", []);
</script>

<div class="flex flex-col gap-[1.5rem]">
	<div class="flex items-center justify-between">
		<h1 class="font-semibold text-md">Account: {data.user.email}</h1>
		<form method="POST" action="?/logout">
			<Button variant="destructive" type="submit">Sign Out</Button>
		</form>
	</div>
	<Separator />
	<Button
		on:click={() => {
			for (const exercise of data.exercises) {
				session.value.push(exercise);
			}
			goto("/workout");
		}}
	>
		Start empty workout
	</Button>
	<Separator />
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between gap-2">
			<h1 class="text-2xl">Workout Plans</h1>
			<Button variant="outline" class="w-[128px]" onclick={() => goto("/add-plan")}>
				Create Plan
			</Button>
		</div>
		<div class="flex flex-wrap gap-2 w-full">
			{#each data.plans as plan}
				<Card.Root
					onclick={() => {
						() => goto("/workout");
					}}
					class="w-[calc(50%-4px)]"
				>
					<Card.Content>{plan.name}</Card.Content>
					<Card.Footer
						><Button
							variant="destructive"
							onclick={async () => {
								await fetch("/api/plan", {
									method: "delete",
									body: JSON.stringify({ id: plan.id }),
								});
							}}
						>
							Delete
						</Button>
					</Card.Footer>
				</Card.Root>
			{:else}
				<div
					class="bg-gray-100 flex h-[200px] w-full items-center justify-center rounded"
				>
					No workout plans
				</div>
			{/each}
		</div>
	</div>
	<Separator />
	<div class="gap-2">
		<button class="w-1/2" onclick={() => goto("/history")}>
			<Card.Root class="hover:bg-slate-100">
				<Card.Header class="flex-row items-center gap-2">
					<HistoryIcon size={"24px"} />
					<Card.Title class="text-left h-[24px]">History</Card.Title>
				</Card.Header>
				<Card.Footer/>
			</Card.Root>
		</button>
	</div>
</div>
