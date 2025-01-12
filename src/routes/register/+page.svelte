<script lang="ts">
	import { Input } from "@app/ui/input";
	import * as Form from "@app/ui/form";
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { formSchema, type FormSchema } from "./schema";

	export let data: SuperValidated<Infer<FormSchema>>;

	// Local component state
	let isLoading = false;
	let errorMessage = "";

	// Initialize the superForm
	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: "json",
		onResult: async () => {
			try {
				isLoading = true;
				errorMessage = "";
				await new Promise((resolve) => setTimeout(resolve, 1500));
			} catch (err) {
				errorMessage = "Something went wrong. Please try again.";
			} finally {
				isLoading = false;
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<h1 class="text-xl font-bold">Create an account</h1>

<form method="POST" action="?/register" use:enhance>
	<div class="space-y-[8px] my-[12px]">
		<!-- Email Field -->
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Password Field -->
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input
					{...attrs}
					type="password"
					bind:value={$formData.password}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Submit Button -->
	<Form.Button class="w-full mt-[8px] mb-[16px]" disabled={isLoading}>
		{#if isLoading}
			Loading...
		{:else}
			Register
		{/if}
	</Form.Button>

	<!-- Display error message if there is one -->
	{#if errorMessage}
		<p class="text-red-600">{errorMessage}</p>
	{/if}
</form>

<p class="text-sm font-semibold text-gray-500">
	Already have an account?
	<a class="text-blue-600 hover:underline" href="/login">Login</a>
</p>
