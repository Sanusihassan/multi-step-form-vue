<template>
  <section class="flex flex-col gap-4 w-full">
    <h2>Select your plan</h2>
    <p>You have the option of monthly or yearly billing</p>
    <ul class="flex flex-col gap-2 lg:flex-row">
      <li v-for="plan in plans" :key="plan.name" class="lg:w-full">
        <Card
          :class="[
            'p-4 flex gap-4 transition-all w-full lg:flex-col lg:gap-8 hover:border-primary-purplish-blue hover:bg-neutral-magnolia cursor-pointer',
            plan.name === selectedPlan?.name
              ? activeClasses.split(' ')
              : 'border border-neutral-light-gray',
          ]"
          :onclick="() => updateSelectedPlan(plan)"
        >
          <figure class="w-10 h-10">
            <img :src="`/assets/images/${plan.icon}`" alt="" />
          </figure>
          <div>
            <h3 class="leading-5">{{ plan.name }}</h3>
            <p>
              $
              {{ calculatePrice(plan.monthlyPrice, monthly).toLocaleString() }}
              /{{ monthly ? "mo" : "yr" }}
            </p>

            <p :class="['text-primary-marine-blue', monthly && 'hidden']">
              2 months free
            </p>
          </div>
        </Card>
      </li>
    </ul>
    <div class="bg-neutral-alabaster w-full rounded-sm mt-8 flex p-4">
      <label class="flex relative items-center cursor-pointer mx-auto w-min">
        <span
          :class="[
            'mr-4 font-medium',
            monthly ? 'text-primary-marine-blue' : '',
          ]"
        >
          Monthly
        </span>
        <input type="checkbox" @change="updateMonthly()" class="sr-only peer" />
        <div
          class="w-11 h-6 peer-focus:outline-none rounded-full peer bg-primary-marine-blue peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[80px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
        ></div>
        <span
          :class="[
            'ml-4 font-medium',
            !monthly ? 'text-primary-marine-blue' : '',
          ]"
        >
          Yearly
        </span>
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Plan } from "AppTypes";
import { calculatePrice } from "../utils/calculatePrice";
import Card from "./Card.vue";

const activeClasses =
  "border border-primary-purplish-blue bg-neutral-magnolia falopa";

const plans: Plan[] = [
  {
    name: "Arcade",
    icon: "icon-arcade.svg",
    monthlyPrice: 9,
  },
  {
    name: "Advanced",
    icon: "icon-advanced.svg",
    monthlyPrice: 12,
  },
  {
    name: "Pro",
    icon: "icon-pro.svg",
    monthlyPrice: 15,
  },
];

export default defineComponent({
  props: {
    selectedPlan: {
      type: Object as PropType<Plan | null>,
      required: true,
    },
    monthly: {
      type: Boolean,
      required: true,
    },
    updateSelectedPlan: {
      type: Function as PropType<(plan: Plan) => void>,
      required: true,
    },
    updateMonthly: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },

  // emits: ["update:selectedPlan", "update:isMonthly"],
  setup(props, { emit }) {
    // const updateSelectedPlan = (selectedPlan: Plan) => {
    //   console.log("test");

    //   // emit("update:selectedPlan", selectedPlan);
    // };
    // const updateIsMonthly = (isMonthly: boolean) => {
    //   emit("update:isMonthly", isMonthly);
    // };
    return {
      plans,
      activeClasses,
      calculatePrice,
    };
  },
  components: { Card },
});
</script>
