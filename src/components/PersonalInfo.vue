<template>
  <section class="flex flex-col gap-4 w-full">
    <h2>Personal info</h2>
    <p>Please provide your name, email address and phone number.</p>

    <Input
      label="Name"
      placeholder="e.g. Stephen King"
      :showRequired="showRequired && !userInfo.name"
      :value="userInfo.name"
      @input="handlePersonalInfo('name', $event)"
      :onChange="($event: Event) => handlePersonalInfo('name', $event)"
    />

    <Input
      label="Email Address"
      type="email"
      placeholder="e.g. stephenking@lorem.com"
      :showRequired="
        showRequired && (!userInfo.email || !userInfo.email.includes('@'))
      "
      :value="userInfo.email"
      @input="handlePersonalInfo('email', $event)"
      :onChange="($event: Event) => handlePersonalInfo('email', $event)"
    />

    <Input
      label="Phone Number"
      placeholder="e.g. +1 234 567 890"
      :showRequired="showRequired && !userInfo.phone"
      :value="userInfo.phone"
      @input="handlePersonalInfo('phone', $event)"
      :onChange="($event: Event) => handlePersonalInfo('phone', $event)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Input from "./Input.vue";
import { UserInfo } from "AppTypes";

export default defineComponent({
  components: {
    Input,
  },
  props: {
    userInfo: {
      type: Object as PropType<UserInfo>,
      required: true,
    },
    updateUserInfo: {
      type: Function as PropType<(userInfo: UserInfo) => void>,
      required: true,
    },
    showRequired: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handlePersonalInfo(key: keyof UserInfo, event: Event) {
      const updatedUserInfo = { ...this.userInfo };
      updatedUserInfo[key] = (event.target as HTMLInputElement).value;
      this.updateUserInfo(updatedUserInfo);
    },
  },
});
</script>
