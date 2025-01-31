<script lang="ts">
	import { goto } from "$app/navigation";
	import type { TWorkoutExercise } from "$lib/db/schema";
	import Account from "@app/components/index/Account.svelte";
	import Plan from "@app/components/index/Plan.svelte";
	import History from "@app/components/index/History.svelte";
	import { localStore } from "@app/localStore.svelte";
	import Button from "@app/ui/button/button.svelte";
	import * as Card from "@app/ui/card";
	import Separator from "@app/ui/separator/separator.svelte";
	import type { PageData } from "./$types";

	const session = localStore<Partial<TWorkoutExercise & { name: string }>[]>(
		"workout",
		[],
	);

	export let data: PageData;
</script>

<div class="flex items-center justify-between h-[60px]">
	<h1 class="title text-lg">
		{new Date().toLocaleDateString("en-us", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})}
	</h1>
	<Account data user={data.user} />
</div>
{#if session.check("timer")}
	<Button on:click={() => goto("/workout")}>Continue</Button>
{:else}
	<Button on:click={() => goto("/workout")}>Start empty workout</Button>
{/if}
<Separator/>
<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between gap-2">
		<h1 class="text-lg uppercase tracking-wide">Workout Plans</h1>
		<Button
			variant="secondary"
			class="w-[108px]"
			onclick={() => goto("/add-plan")}
		>
			Create Plan
		</Button>
	</div>
	<div class="flex flex-wrap gap-2 w-full">
		{#each data.plans as plan}
			<Plan {data} {plan} {session} />
		{:else}
			<Card.Root class="w-full">
				<Card.Header></Card.Header>
				<Card.Content
					class="h-[100px] flex justify-center items-center"
				>
					NO WORKOUT PLANS
				</Card.Content>
				<Card.Footer></Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
<Separator />
<div class="grid grid-cols-2 gap-[24px]">
	<History />
</div>
