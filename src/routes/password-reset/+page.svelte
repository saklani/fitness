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

<h1 class="text-2xl font-bold">Forgot Password</h1>
<h1 class="text-gray-400 text-xs">Send a password reset link to your email</h1>

<form method="POST" action="?/send_reset_link" use:enhance>
	<div class="space-y-[8px] my-[12px]">
		<!-- Email Field -->
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Submit Button -->
	<Form.Button class="w-full mt-[8px] mb-[16px]" disabled={isLoading}>
		{#if isLoading}
			Loading...
		{:else}
			Send Reset Link
		{/if}
	</Form.Button>

	<!-- Display error message if there is one -->
	{#if errorMessage}
		<p class="text-red-600">{errorMessage}</p>
	{/if}
</form>
