<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { localStore } from "@app/localStore.svelte.js";
	import { Button } from "@app/ui/button";
	import * as Card from "@app/ui/card";
	import { Input } from "@app/ui/input";
	import * as Sheet from "@app/ui/sheet";
	import Fuse from "fuse.js";

	type TExercise = Partial<{ id: string; name: string }>;

	const fuseOptions = {
		isCaseSensitive: false,
		includeScore: false,
		shouldSort: true,
		minMatchCharLength: 1,
		fieldNormWeight: 1,
		keys: ["name"],
	};

	const { data } = $props();

	const plan = localStore<TExercise[]>("plan", []);
	let name = $state("");

	const fuse = new Fuse<TExercise>(data.exercises, fuseOptions);

	let searchPattern = $state("");

	const result = $derived(fuse.search(searchPattern));

	function addExercise(exercise: TExercise) {
		if (!plan.value.includes(exercise)) {
			plan.value.push(exercise);
		}
	}

	function removeExercise(exercise: TExercise) {
		let removeIndex = plan.value.indexOf(exercise);
		plan.value.splice(removeIndex, 1);
	}

	async function save() {
		await fetch("/api/plan", {
			body: JSON.stringify({
				exercises: plan.value.map((e) => e.id!),
				name,
			}),
			method: "post",
		});
		if (plan.value.length > 0) {
			plan.value = [];
		}
		await goto("/", { invalidateAll: true });
		plan.clear();
	}

	async function cancel() {
		if (plan.value.length > 0) {
			plan.value = [];
		}
		await goto("/");
		plan.clear();
	}
</script>

<div class="flex flex-col h-[100vh] gap-2 p-2 w-full">
	<div class="flex items-center justify-between h-[3rem]">
		<h1 class="title text-xl">Create A Plan</h1>
		<div class="flex gap-1">
			<Button class="w-[128px]" variant="destructive" onclick={cancel}>Cancel</Button>
			<Button class="w-[128px]" onclick={save}>Save</Button>
		</div>
	</div>
	<Input placeholder="Workout Name" bind:value={name} />
	<div
		class="border-[2px] border-black flex flex-col h-[calc(100vh-3rem)] gap-[4px] p-[2px] rounded-[2px] overflow-y-scroll"
	>
		{#each plan.value as exercise}
			<Card.Root>
				<Card.Content
					class="flex flex-row items-center justify-between"
				>
					<Card.Title>{exercise.name}</Card.Title>
					<Button
					class="w-[128px]"
						variant="destructive"
						onclick={() => removeExercise(exercise)}
					>
						Delete
					</Button>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]}>Add Exercise</Button>
		</Sheet.Trigger>
		<Sheet.Content side="bottom">
			<Sheet.Header>
				<Sheet.Title>Exercise</Sheet.Title>
				<Sheet.Description>
					Select an exercise to track
				</Sheet.Description>
			</Sheet.Header>

			<div class="flex flex-col h-[70vh] overflow-y-scroll gap-2">
				<Input class="outline-none" bind:value={searchPattern} />
				<div
					class="flex flex-col border border-1 overflow-y-scroll rounded-lg"
				>
					{#each result as res}
						<Sheet.Close>
							<button
								class="border-b border-1 flex p-1 w-full hover:bg-gray-100"
								onclick={() => addExercise(res.item)}
							>
								{res.item.name}
							</button>
						</Sheet.Close>
					{:else}
						<div
							class="flex items-center justify-center min-h-[100px]"
						>
							<p>Search for an exercise</p>
						</div>
					{/each}
				</div>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</div>
