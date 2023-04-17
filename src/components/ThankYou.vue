<template>
  <section
    class="flex flex-col justify-center items-center w-full gap-4 py-[36px]"
  >
    <figure class="w-[60px] h-[60px]">
      <img
        src="/assets/images/icon-thank-you.svg"
        alt="Form compleated, thank you!"
      />
    </figure>
    <h2>Thank you</h2>
    <span class="text-center">
      <p>Thanks for confirming your subscription!</p>
      <p>
        We hope you have using our platform. If you ever need support, please
        feel free to email us at support@loregaming.com
      </p>
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThankYou",
});
</script>
