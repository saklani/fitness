<script>
    import { Button } from "@app/ui/button";
    import { Loader2 } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import { superForm } from "sveltekit-superforms/client";
    let { data } = $props();

    let state = $state("default");
    const { enhance } = superForm(data, {
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
</script>

<form method="POST" action="?/logout" use:enhance>
    <Button
        type="submit"
        class="w-full"
        variant="destructive"
        disabled={state !== "default"}
    >
        {#if state === "default"}
            Logout
        {:else}
            <Loader2 class="animate-spin" size={14} />
        {/if}
    </Button>
</form>
