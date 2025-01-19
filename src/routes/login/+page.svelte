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

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: "json",
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex flex-col w-full max-w-[400px] p-[24px]">
	<h1 class="title">Login</h1>
	<h2 class="subtitle">Enter your email below to login to your account</h2>
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
				<a class="text-blue-600 hover:underline text-xs" href="/password-reset">Forgot Password?</a>
			</Form.Field>
		</div>
		<Form.Button class="w-full">Login</Form.Button>
	</form>
	<p class="text-sm font-semibold text-gray-500 my-[8px]">
		Don't have an account?
		<a class="text-blue-600 hover:underline" href="/register">Register</a>
	</p>
</div>
