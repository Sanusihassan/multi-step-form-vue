<template>
  <button
    :class="['rounded', typeClasses, sizeClasses, className]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import clsx from "clsx";

interface ButtonProps {
  type?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (event: MouseEvent) => void;
}

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String as () => "primary" | "secondary" | "ghost",
      default: "primary",
    },
    size: {
      type: String as () => "sm" | "md" | "lg",
      default: "md",
    },
    className: {
      type: String,
      default: "",
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: null,
    },
  },

  computed: {
    typeClasses(): string {
      if (this.type === "primary") {
        return "bg-primary-purplish-blue text-white hover:opacity-70";
      } else if (this.type === "secondary") {
        return "bg-primary-marine-blue text-white hover:opacity-70";
      } else {
        return "bg-transparent text-neutral-cool-gray";
      }
    },
    sizeClasses(): string {
      if (this.size === "sm") {
        return "text-sm p-0";
      } else if (this.size === "lg") {
        return "text-lg px-5 py-2 font-medium";
      } else {
        return "px-5 py-2 font-medium";
      }
    },
  },
});
</script>
