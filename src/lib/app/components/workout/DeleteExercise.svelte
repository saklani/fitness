<script lang="ts">
    import * as AlertDialog from "@app/ui/alert-dialog";
    import { XIcon } from "lucide-svelte";
    const { removeExercise } = $props();
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger  class="flex w-[32px] h-[32px] rounded items-center justify-center  border-[1px] hover:bg-slate-100">
        <XIcon size={16} />
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
                This will delete this exercise from the workout and all tracked
                sets.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action on:click={removeExercise}>
                Delete
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
