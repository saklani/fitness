import { type VariantProps, tv } from "tailwind-variants";
import type { Button as ButtonPrimitive } from "bits-ui";
import Root from "./button.svelte";

const buttonVariants = tv({
	base: "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-[4px] text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-xs lg:text-sm tracking-wider  hover:-translate-y-[1px]",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/95",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline:
				"border text-primary bg-background hover:bg-secondary/10",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "font-medium text-blue-600 underline-offset-4 hover:underline",
		},
		size: {
			default: "h-[32px] min-w-[72px] lg:min-w-[78px]",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-[32px] w-[32px]",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];

type Props = ButtonPrimitive.Props & {
	variant?: Variant;
	size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants,
};
