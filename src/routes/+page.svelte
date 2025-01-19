<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import type { TExercise, TWorkoutExercise } from "$lib/db/schema";
	import { localStore } from "@app/localStore.svelte";
	import Button from "@app/ui/button/button.svelte";
	import * as Card from "@app/ui/card";
	import * as DropdownMenu from "@app/ui/dropdown-menu";
	import Separator from "@app/ui/separator/separator.svelte";
	import { HistoryIcon, XIcon, CircleUserRound } from "lucide-svelte";
	import type { PageData } from "./$types";
	import CardContent from "@app/ui/card/card-content.svelte";

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

<div
	class="flex flex-col gap-[32px] max-w-[960px] w-full p-[24px] min-h-[100vh]"
>
	<div class="flex items-center justify-between">
		<h1 class="title text-xl">
			{new Date().toLocaleDateString("en-us", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			})}
		</h1>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<CircleUserRound
					color={"white"}
					strokeWidth={"1.2"}
					size={28}
				/>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>{data.user.email}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<form method="POST" action="?/logout">
						<Button
							class="w-full"
							variant="destructive"
							type="submit">Logout</Button
						>
					</form>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	{#if session.check("timer")}
		<Button on:click={() => goto("/workout")}>Continue</Button>
	{:else}
		<Button on:click={() => goto("/workout")}>Start empty workout</Button>
	{/if}

	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between gap-2">
			<h1 class="title">Workout Plans</h1>
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
							class="w-[128px]"
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
				<Card.Root class="w-full">
					<Card.Header></Card.Header>
					<Card.Content
						class="h-[100px] flex justify-center items-center"
					>
						No workout plans
					</Card.Content>
					<Card.Footer></Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
	<Separator />
	<div class="gap-2">
		<button class="w-1/2" onclick={() => goto("/history")}>
			<Card.Root class="hover:bg-primary">
				<Card.Header></Card.Header>
				<CardContent class="flex flex-row gap-[12px] items-center p-[24px]">
					<HistoryIcon size={"24px"} />
					<Card.Title class="text-left h-[24px]">History</Card.Title>
				</CardContent>
				<Card.Footer />
			</Card.Root>
		</button>
	</div>
</div>
