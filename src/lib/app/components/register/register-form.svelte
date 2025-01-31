<script lang="ts">
    import * as Form from "@app/ui/form";
    import { Input } from "@app/ui/input";
    import { Loader2 } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import {
        type Infer,
        superForm,
        type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema, type FormSchema } from "./schema";


    let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();
    let state = $state("default");

    const form = superForm(data, {
        validators: zodClient(formSchema),
        dataType: "json",
        onSubmit: async () => {
            state = "loading";
        },
        onResult: async () => {
            state = "default";
        },
        onError: async ({ result }) => {
            toast(result.error.message);
        },
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/register" use:enhance>
    <div class="flex flex-col gap-[8px] h-[210px]">
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
    {#if state === "default"}
        <Form.Button class="w-full">Register</Form.Button>
    {:else}
        <Form.Button class="w-full" disabled>
            <Loader2 class="animate-spin" size={14} />
        </Form.Button>
    {/if}
</form>
