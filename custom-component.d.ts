// custom-component.d.ts
import { ComponentCustomInstanceProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    currentComponent: any; // You can replace 'any' with a more specific type if needed
  }
}
