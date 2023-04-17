<template>
  <section class="flex flex-col w-full gap-4">
    <h2>Pick add-ons</h2>
    <p>Add-ons help enhance your gaming experience.</p>
    <Card
      v-for="addon in addons"
      :key="addon.name"
      :class="[
        `p-4 flex gap-4 transition-all relative w-full hover:border-primary-purplish-blue hover:bg-neutral-magnolia cursor-pointer`,
        selectedAddons?.includes(addon)
          ? activeClasses
          : 'border border-neutral-light-gray',
      ]"
      @click="updateAddons(addon)"
    >
      <input
        type="checkbox"
        :checked="selectedAddons?.includes(addon)"
        class="w-5 h-5 aspect-square rounded-sm self-center checked:accent-primary-purplish-blue"
        @change="updateAddons(addon)"
      />
      <div>
        <h3>{{ addon.name }}</h3>
        <p>{{ addon.description }}</p>
      </div>
      <span class="w-min ml-auto self-center">
        ${{ calculatePrice(addon.monthlyPrice, monthly).toLocaleString()
        }}{{ monthly ? "mo" : "yr" }}
      </span>
    </Card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Addon } from "AppTypes";

import { calculatePrice } from "../utils/calculatePrice";
import Card from "./Card.vue";

const activeClasses = "border border-primary-purplish-blue bg-neutral-magnolia";

const addons: Addon[] = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
  },
  {
    name: "Large storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
  },
];

export default defineComponent({
  props: {
    selectedAddons: Array as () => Addon[],
    monthly: Boolean,
  },
  emits: ["update:addons"],
  setup(props, { emit }) {
    const updateAddons = (addon: Addon) => {
      emit("update:addons", addon);
    };
    return {
      addons,
      activeClasses,
      calculatePrice,
      updateAddons,
    };
  },
  components: { Card },
});
</script>
