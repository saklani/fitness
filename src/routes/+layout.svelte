<script lang="ts">
	import { Toaster } from "@app/ui/sonner";
	import "../app.css";

	let { children } = $props();
</script>

<main class={"flex items-center justify-center min-h-[100vh]"}>
	<div
		class={"flex flex-col items-stretch min-h-[100vh] w-full max-w-[640px] p-[12px] lg:p-[24px] gap-[12px] lg:gap-[24px] border-x border-x-slate-200"}
	>
		{@render children()}
	</div>
	<Toaster />
</main>
