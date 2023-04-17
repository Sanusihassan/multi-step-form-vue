<template>
  <div class="flex flex-col font-medium">
    <span class="inline-flex justify-between">
      <label :for="label" class="text-sm text-primary-marine-blue">
        {{ label }}
      </label>
      <p
        v-if="required && showRequired"
        class="text-primary-starberry-red leading-3"
      >
        This field is required
      </p>
    </span>
    <input
      :type="type"
      :id="label"
      :value="value"
      :class="[
        'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',
        showRequired &&
          required &&
          !value &&
          'ring-1 ring-primary-starberry-red',
      ]"
      :placeholder="placeholder"
      @input="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface InputProps {
  label: string;
  value: string | undefined;
  placeholder?: string;
  type?: string;
  required?: boolean;
  showRequired?: boolean;
  onChange: (e: Event) => void;
}

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: "Enter a value",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: true,
    },
    showRequired: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onChange(e: Event) {
      this.$emit("update:value", (e.target as HTMLInputElement).value);
      this.onChange(e);
    },
  },
});
</script>
