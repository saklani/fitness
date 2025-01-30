<script lang="ts">
	import { Toaster } from "@app/ui/sonner";
	import "../app.css";

	let { children } = $props();
</script>

<main class={"flex items-center justify-center bg-white min-h-[100vh]"}>
	<div
		class={"flex flex-col items-stretch bg-background min-h-[100vh] w-full max-w-[640px] border-x p-[12px] lg:p-[24px] gap-[12px] lg:gap-[24px]"}
	>
		{@render children()}
	</div>
	<Toaster />
</main>
