<template>
  <div class="rounded-xl" :class="className" @click="handleClick">
    <slot />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

interface CardProps {
  className?: string;
  onClick?: (event: MouseEvent) => void;
}

export default defineComponent({
  name: "Card",
  props: {
    className: String,
    onClick: Function as PropType<CardProps["onClick"]>,
  },
  methods: {
    handleClick(event: MouseEvent) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
});
</script>
