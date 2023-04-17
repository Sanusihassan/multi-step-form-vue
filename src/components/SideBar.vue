<template>
  <aside
    class="bg-sidebar-image-mobile min-h-[172px] bg-cover bg-no-repeat lg:rounded-lg lg:bg-sidebar-image-desktop"
  >
    <nav>
      <ol
        class="flex justify-center pt-8 gap-4 lg:flex-col lg:w-60 lg:mx-autor"
      >
        <li
          v-for="step in steps"
          :key="step.step"
          class="flex gap-4 lg:ml-8 items-center"
        >
          <button
            :class="buttonClass(step.step)"
            @click="handleNextStep(step.step)"
          >
            {{ step.step }}
          </button>
          <span class="hidden lg:inline text-white uppercase">
            <p class="font-normal">Step {{ step.step }}</p>
            <span class="font-bold">{{ step.title }}</span>
          </span>
        </li>
      </ol>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import clsx from "clsx";

interface Step {
  step: number;
  title: string;
}

interface SidebarProps {
  currentStep: number;
  handleNextStep: (step: number) => void;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Your Info",
  },
  {
    step: 2,
    title: "Select Plan",
  },
  {
    step: 3,
    title: "Add-ons",
  },
  {
    step: 4,
    title: "Summary",
  },
];

const props = defineProps<SidebarProps>();

const buttonClass = (step: number) =>
  clsx(
    "px-3 py-2 border border-white inline-flex rounded-full leading-none font-medium w-min h-min transition-colors duration-[400ms]",
    props.currentStep === step
      ? "bg-primary-light-blue text-primary-marine-blue border-primary-light-blue"
      : "text-white"
  );
</script>
