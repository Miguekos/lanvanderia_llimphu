<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from "quasar";
export default {
  name: "App",
  created() {
    this.$q.loading.setDefaults({
      spinner: QSpinnerGears,
      spinnerColor: "orange"
    });
  }
};
</script>
