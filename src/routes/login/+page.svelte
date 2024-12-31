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

<h1 class="text-xl font-bold">Login to your account</h1>
<form method="POST" action="?/login" use:enhance>
	<div class="space-y-[8px] my-[12px]">
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
				<Input {...attrs}type={"password"} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Button class="w-full mt-[8px] mb-[16px]">Login</Form.Button>
</form>
<p class="text-sm font-semibold text-gray-500">
	Don't have an account?
	<a class="text-blue-600 hover:underline" href="/register">Register</a>
</p>
