<script lang="ts">
    import * as AlertDialog from "@app/ui/alert-dialog";
    import { XIcon } from "lucide-svelte";
    const { deletePlan } = $props();
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger  class="border flex w-[36px] h-[36px] rounded items-center justify-center hover:bg-slate-100">
        <XIcon size={18} />
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
                This will delete this plan.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action on:click={deletePlan}>
                Delete
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
