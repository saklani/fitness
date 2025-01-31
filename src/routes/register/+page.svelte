<script lang="ts">
	import RegisterForm from "@app/components/register/register-form.svelte";
	import * as Card from "@app/ui/card";
	import {
	    type Infer,
	    type SuperValidated
	} from "sveltekit-superforms";
	import { type FormSchema } from "./schema";

	let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();
</script>

<div class="flex flex-col justify-center items-center h-[calc(100vh-32px)] md:h-[calc(100vh-48px)]">
	<Card.Root
		class="flex flex-col justify-between gap-[24px] py-[24px] max-w-[470px] w-full"
	>
		<Card.Header>
			<h1 class="title">Register</h1>
			<h2 class="subtitle">
				Enter your email below to create your account
			</h2>
		</Card.Header>
		<Card.Content>
			<RegisterForm {data} />
		</Card.Content>
		<Card.Footer>
			<p class="info my-[8px]">
				Already have an account?
				<a class="text-blue-600 hover:underline" href="/login">
					Login
				</a>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
