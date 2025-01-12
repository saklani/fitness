<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main class="flex flex-col h-[100vh] gap-2 p-2">
	{@render children()}
</main>
