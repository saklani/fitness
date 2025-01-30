<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("p-[16px] lg:p-[24px] gap-[16px] lg:gap-[24px]", className)} {...$$restProps}>
	<slot />
</div>
