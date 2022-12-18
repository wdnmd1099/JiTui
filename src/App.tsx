import { defineComponent, Transition, VNode } from "vue";
import { RouteLocationNormalizedLoaded, RouterView } from "vue-router";
import "./App.scss"
import { Loader } from "./shared/Loader";

export const App = defineComponent({
  setup() {
    return () => (
      <div class="page">
        <RouterView />
        <Loader />
      </div>
    )
  }
})