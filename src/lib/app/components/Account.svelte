<script lang="ts">
    import { Button } from "@app/ui/button";

    import * as DropdownMenu from "@app/ui/dropdown-menu";
    import { CircleUserRound } from "lucide-svelte";

    let { user } = $props();
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <CircleUserRound strokeWidth={"0.8"} size={24} />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label>{user.email}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <form method="POST" action="?/logout">
                <Button class="w-full" variant="destructive" type="submit">
                    Logout
                </Button>
            </form>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
