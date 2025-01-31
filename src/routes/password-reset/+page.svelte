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
	import * as Card from "@app/ui/card";

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

<div
	class="flex flex-col justify-center items-center h-[calc(100vh-32px)] md:h-[calc(100vh-48px)]"
>
	<Card.Root
		class="flex flex-col justify-between gap-[24px] py-[24px] max-w-[470px] w-full"
	>
		<Card.Header>
			<h1 class="title">Forgot Password</h1>
			<h2 class="subtitle">Enter your email to send a reset code</h2>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/send_reset_link" use:enhance>
				<div class="space-y-[12px] my-[36px]">
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Button class="w-full">Send a code</Form.Button>
			</form>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
