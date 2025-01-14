<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main class="flex flex-col gap-[1rem] p-[1rem]">
	{@render children()}
</main>
