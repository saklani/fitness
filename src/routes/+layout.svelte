<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main class={"flex items-center justify-center bg-background min-h-[100vh]"}>
	{@render children()}
</main>
