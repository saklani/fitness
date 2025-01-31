<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
    import Header from "@app/components/Header.svelte";
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

<Header>
	<h1 class="title text-lg">Create A Plan</h1>
	<div class="flex gap-1">
		<Button variant="destructive" onclick={cancel}>Cancel</Button>
		<Button onclick={save}>Save</Button>
	</div>
</Header>
<Input placeholder="Workout Name" bind:value={name} />
{#each plan.value as exercise}
	<Card.Root>
		<Card.Header>
			<Card.Title>{exercise.name}</Card.Title>
		</Card.Header>
		<Card.Content />
		<Card.Footer class="justify-end">
			<Button
				class="w-[78px]"
				variant="destructive"
				onclick={() => removeExercise(exercise)}
			>
				Delete
			</Button>
		</Card.Footer>
	</Card.Root>
{/each}
<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button
			class="fixed bottom-4 mx-auto inset-x-0 z w-[300px]"
			builders={[builder]}>Add Exercise</Button
		>
	</Sheet.Trigger>
	<Sheet.Content side="bottom">
		<Sheet.Header>
			<Sheet.Title>Exercise</Sheet.Title>
			<Sheet.Description>Select an exercise to track</Sheet.Description>
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
					<div class="flex items-center justify-center min-h-[100px]">
						<p class="uppercase text-sm tracking-wide">
							Search for an exercise
						</p>
					</div>
				{/each}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
