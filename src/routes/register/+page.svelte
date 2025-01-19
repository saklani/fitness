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

<div class="flex flex-col w-full max-w-[400px] p-[24px]">
	<h1 class="title">Register</h1>
	<h2 class="subtitle">Enter your email below to create your account</h2>
	<form method="POST" action="?/login" use:enhance>
		<div class="space-y-[12px] my-[36px]">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						{...attrs}
						type={"password"}
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Button class="w-full">Register</Form.Button>
	</form>

	<p class="text-sm font-semibold text-gray-500 my-[8px]">
		Already have an account?
		<a class="text-blue-600 hover:underline" href="/login">Login</a>
	</p>
</div>
