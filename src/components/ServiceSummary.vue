<template>
  <section class="flex flex-col gap-4 w-full">
    <h2>Finishing up</h2>
    <p>Double-check everything looks OK before confirming.</p>
    <ul class="flex flex-col gap-2 px-4 py-5 bg-neutral-magnolia rounded-lg">
      <li class="border-b border-neutral-light-gray pb-2">
        <div class="flex flex-col">
          <h3>
            {{ selectedPlan?.name }} ( {{ monthly ? "Monthly" : "Yearly" }})
          </h3>
          <span class="inline-flex justify-between">
            <Button
              type="ghost"
              size="sm"
              class="hover:text-primary-purplish-blue hover:underline"
            >
              Change
            </Button>
            <span class="text-primary-marine-blue font-bold">
              $
              {{
                calculatePrice(
                  selectedPlan?.monthlyPrice ?? 0,
                  monthly
                ).toLocaleString()
              }}
              / {{ monthly ? "mo" : "yr" }}
            </span>
          </span>
        </div>
      </li>
      <li
        v-for="addon in addons"
        :key="addon.name"
        class="inline-flex justify-between"
      >
        <p>{{ addon.name }}</p>
        <span class="text-primary-marine-blue">
          +$
          {{ calculatePrice(addon.monthlyPrice, monthly).toLocaleString() }}
          /{{ monthly ? "mo" : "yr" }}
        </span>
      </li>
    </ul>
    <span class="flex justify-between px-4">
      <p>Total (per {{ monthly ? "month" : "year" }})</p>
      <span class="font-bold text-lg text-primary-purplish-blue">
        +${{ totalPrice.toLocaleString() }}/{{ monthly ? "mo" : "yr" }}
      </span>
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { UserServiceConfiguration } from "AppTypes";
import { calculatePrice } from "../utils/calculatePrice";
import Button from "./Button.vue";

export default defineComponent({
  props: {
    userServiceConfiguration: Object as () =>
      | UserServiceConfiguration
      | undefined,
  },
  setup(props) {
    const config = computed(() => {
      return (
        props.userServiceConfiguration ?? {
          monthly: false,
          addons: [],
          selectedPlan: null,
        }
      );
    });

    const { monthly, addons, selectedPlan } = config.value;

    const totalPrice = (addons as any[]).reduce((acc: number, addon) => {
      return acc + calculatePrice(addon.monthlyPrice, monthly);
    }, calculatePrice(selectedPlan?.monthlyPrice ?? 0, monthly));

    return {
      monthly,
      addons,
      selectedPlan,
      totalPrice,
      calculatePrice,
    };
  },
});
</script>
