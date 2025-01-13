<script lang="ts">
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import Button from "@app/ui/button/button.svelte";
	import * as Card from "@app/ui/card";
	import Separator from "@app/ui/separator/separator.svelte";
	import { HistoryIcon } from "lucide-svelte";
	import type { PageData } from "./$types";
	import { localStore } from "@app/localStore.svelte";
	import type { TExercise, TWorkoutExercise } from "$lib/db/schema";
	import { XIcon } from "lucide-svelte";

	const session = localStore<Partial<TWorkoutExercise & { name: string }>[]>(
		"workout",
		[],
	);

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
	export let data: PageData;
</script>

<div class="flex flex-col gap-[1.5rem]">
	<div class="flex items-center justify-between">
		<h1 class="font-semibold text-sm">Account: {data.user.email}</h1>
		<form method="POST" action="?/logout">
			<Button variant="destructive" type="submit">Sign Out</Button>
		</form>
	</div>
	<Separator />
	{#if session.check("timer")}
		<Button on:click={() => goto("/workout")}>Continue</Button>
	{:else}
		<Button on:click={() => goto("/workout")}>Start empty workout</Button>
	{/if}

	<Separator />
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between gap-2">
			<h1 class="text-xl">Workout Plans</h1>
			<Button
				variant="outline"
				class="w-[128px]"
				onclick={() => goto("/add-plan")}
			>
				Create Plan
			</Button>
		</div>
		<div class="flex flex-wrap gap-2 w-full">
			{#each data.plans as plan}
				<Card.Root class="w-full">
					<Card.Header
						class="flex-row w-full items-center justify-between"
					>
						<Card.Title>{plan.name}</Card.Title>
						<Button
							variant="ghost"
							onclick={async () => {
								await fetch("/api/plan", {
									method: "delete",
									body: JSON.stringify({ id: plan.id }),
								});
								
								await invalidateAll();
							}}
						>
							<XIcon />
						</Button>
					</Card.Header>
					<Card.Content>
						{#each plan.exerciseIds as exerciseId}
							<div>
								{data.exercises.find((e) => e.id === exerciseId)
									?.name ?? ""}
							</div>
						{/each}
					</Card.Content>
					<Card.Footer class="gap-2">
						<Button
							onclick={() => {
								// TODO: Move to backend
								for (const exerciseId of plan.exerciseIds) {
									const e = data.exercises.find(
										(e) => e.id === exerciseId,
									);
									if (e) addExercise(e);
								}
								goto("/workout");
							}}
						>
							Start
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
				<Card.Footer />
			</Card.Root>
		</button>
	</div>
</div>
