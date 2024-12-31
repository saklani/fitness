<script lang="ts">
    import * as AlertDialog from "@app/ui/alert-dialog";

    const { removeExercise } = $props();
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger>x</AlertDialog.Trigger>
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
