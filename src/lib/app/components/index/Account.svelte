<script lang="ts">
    import { Button } from "@app/ui/button";

    import * as DropdownMenu from "@app/ui/dropdown-menu";
    import { CircleUserRound } from "lucide-svelte";
    import Logout from "./logout/Logout.svelte";

    let { data, user } = $props();
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <CircleUserRound strokeWidth={"0.8"} size={24} />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label class="text-sm">{user.email}</DropdownMenu.Label>
            <div class="h-[24px]"></div>
            <Logout data/>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
