<script lang="ts">
	import { goto } from "$app/navigation";
	import * as Form from "@app/ui/form";
	import { Input } from "@app/ui/input";
	import {
	    type Infer,
	    superForm,
	    type SuperValidated,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { formSchema, type FormSchema } from "./schema";
    import { toast } from "svelte-sonner";

	export let data: SuperValidated<Infer<FormSchema>>;

	// Local component state

	// Initialize the superForm
	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: "json",
		onResult: async ({ result }) => {
			if (result.status !== 200) {
				//@ts-ignore
				toast(result.data.message)
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<div
	class="flex flex-col justify-center h-[calc(100vh-32px)] lg:h-[calc(100vh-48px)] items-stretch w-full"
>
	<h1 class="title">Register</h1>
	<h2 class="subtitle">Enter your email below to create your account</h2>
	<form method="POST" action="?/register" use:enhance>
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

	<p class="info my-[8px]">
		Already have an account?
		<a class="text-blue-600 hover:underline" href="/login">Login</a>
	</p>
</div>
