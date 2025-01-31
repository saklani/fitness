<script lang="ts">
	import LoginForm from "@app/components/login/login-form.svelte";
	import { type FormSchema } from "@app/components/login/schema";
	import * as Card from "@app/ui/card";
	import { type Infer, type SuperValidated } from "sveltekit-superforms";

	let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();
</script>

<div class="flex flex-col justify-center items-center h-[100vh]">
	<Card.Root
		class="flex flex-col justify-between gap-[24px] py-[24px] max-w-[470px] w-full"
	>
		<Card.Header>
			<h1 class="title">Login</h1>
			<h2 class="subtitle">
				Enter your email below to login to your account
			</h2>
		</Card.Header>
		<Card.Content>
			<LoginForm {data} />
		</Card.Content>
		<Card.Footer>
			<p class="info my-[8px]">
				Don't have an account?
				<a class="text-blue-600 hover:underline" href="/register">
					Register
				</a>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
