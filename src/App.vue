<template>
  <main
    class="h-screen flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:max-w-[58.75rem] lg:mt-20 lg:flex-row grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[33.75rem] lg:shadow"
  >
    <SideBar
      :currentStep="step"
      @nextStep="nextStep"
      :handle-next-step="nextStep"
    />
    <div
      class="px-4 relative bg-neutral-magnolia lg:bg-transparent lg:flex lg:flex-col lg:w-full"
    >
      <form
        class="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0"
      >
        <PersonalInfo
          v-if="step === 1"
          :userInfo="userServiceConfiguration.userInfo"
          @updateUserInfo="updateUserInfo"
          :showRequired="showRequired"
          :update-user-info="updateUserInfo"
        />
        <SelectPlan
          v-if="step === 2"
          :selectedPlan="userServiceConfiguration.selectedPlan"
          :monthly="userServiceConfiguration.monthly"
          @updateSelectedPlan="updateSelectedPlan"
          @updateIsMonthly="updateMonthly"
          :update-selected-plan="updateSelectedPlan"
          :update-monthly="updateMonthly"
        />
        <Addons
          v-if="step === 3"
          :selectedAddons="userServiceConfiguration.addons"
          :monthly="userServiceConfiguration.monthly"
          @updateAddons="updateAddons"
        />
        <ServiceSummary
          v-if="step === 4"
          :userServiceConfiguration="userServiceConfiguration"
        />
        <ThankYou v-if="step === 5" />
      </form>
      <menu v-if="step < 5" class="flex justify-between p-4 mt-auto">
        <li>
          <Button type="ghost" @click="goBack"> Go Back </Button>
        </li>
        <li>
          <Button
            @click="nextStep()"
            :type="step !== 4 ? 'secondary' : 'primary'"
          >
            {{ step !== 4 ? "Next Step" : "Confirm" }}
          </Button>
        </li>
      </menu>
    </div>
  </main>
</template>
<script lang="ts">
import { UserServiceConfiguration, UserInfo, Plan, Addon } from "AppTypes";
import { defineComponent, ref } from "vue";

import SideBar from "./components/SideBar.vue";
import ThankYou from "./components/ThankYou.vue";
import Button from "./components/Button.vue";
import PersonalInfo from "./components/PersonalInfo.vue";
import SelectPlan from "./components/SelectPlan.vue";
import Addons from "./components/Addons.vue";
import ServiceSummary from "./components/ServiceSummary.vue";
// ...other imports

export default defineComponent({
  components: {
    SideBar,
    ThankYou,
    Button,
    PersonalInfo,
    SelectPlan,
    Addons,
    ServiceSummary,
  },
  setup() {
    const step = ref(1);
    const showRequired = ref(false);

    const userServiceConfiguration = ref<UserServiceConfiguration>({
      userInfo: {
        name: "",
        email: "",
        phone: "",
      },
      selectedPlan: null,
      monthly: true,
      addons: [],
    });

    const updateUserInfo = (userInfo: UserInfo) => {
      userServiceConfiguration.value = {
        ...userServiceConfiguration.value,
        userInfo,
      };
    };

    const updateSelectedPlan = (plan: Plan) => {
      userServiceConfiguration.value = {
        ...userServiceConfiguration.value,
        selectedPlan: plan,
      };
    };

    const updateMonthly = () => {
      userServiceConfiguration.value = {
        ...userServiceConfiguration.value,
        monthly: !userServiceConfiguration.value.monthly,
      };
    };

    const updateAddons = (addon: Addon) => {
      const addons = userServiceConfiguration.value.addons;
      const index = addons.findIndex(
        (currentAddon) => currentAddon.name === addon.name
      );
      if (index === -1) {
        userServiceConfiguration.value = {
          ...userServiceConfiguration.value,
          addons: [...addons, addon],
        };
      } else {
        addons.splice(index, 1);
        userServiceConfiguration.value = {
          ...userServiceConfiguration.value,
          addons: [...addons],
        };
      }
    };

    const nextStep = (onGoingStep?: number) => {
      if (step.value === 5) return;
      if (
        step.value === 1 ||
        (onGoingStep && onGoingStep !== 1 && step.value === 1)
      ) {
        if (
          !userServiceConfiguration.value.userInfo.name ||
          !userServiceConfiguration.value.userInfo.email ||
          !userServiceConfiguration.value.userInfo.email.includes("@") ||
          !userServiceConfiguration.value.userInfo.phone
        ) {
          showRequired.value = true;
          return;
        }
      }
      step.value = onGoingStep ? onGoingStep : step.value + 1;
    };

    const goBack = () => {
      if (step.value === 1) return;
      step.value -= 1;
    };

    const currentComponent = ref(null);
    const componentProps = ref({});
    return {
      step,
      showRequired,
      userServiceConfiguration,
      updateUserInfo,
      updateSelectedPlan,
      updateMonthly,
      updateAddons,
      nextStep,
      goBack,
      currentComponent,
      componentProps,
      // ...other previously returned values
    };
  },
});
</script>
