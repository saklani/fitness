<script>

    import * as Card from "@app/ui/card";
    import { HistoryIcon } from "lucide-svelte";

</script>
<a href="/history">
    <Card.Root class="hover:bg-secondary/10">
        <Card.Content
            class="flex flex-row gap-[16px] items-center p-[24px]"
        >
            <HistoryIcon size={"22px"} />
            <Card.Title
                class="text-left h-[24px] uppercase tracking-wide text-md"
                >History</Card.Title
            >
        </Card.Content>
    </Card.Root>
</a>