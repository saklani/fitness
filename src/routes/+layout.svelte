<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main class={"flex items-center justify-center bg-white min-h-[100vh]"}>
	<div
		class={"flex flex-col p-[24px] items-stretch bg-background min-h-[100vh] w-full max-w-[640px] border-x gap-[24px]"}
	>
		{@render children()}
	</div>
</main>
