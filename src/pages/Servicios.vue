<template>
  <div class="q-pa-xs items-start q-gutter-xs text-brown">
    <div class="row q-gutter-xs">
      <div class="col text-h5"></div>
      <div class="col text-right"></div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Agregar Servicios</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <AgregarServicio />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-8 q-pa-xs">
        <!--          <q-card-section class="q-pt-none">-->
        <Tabla :info="get_list_service.result" />
        <!--          </q-card-section>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("servicios", ["get_list_service"])
  },
  components: {
    Tabla: () => import("../components/Servicios/Table"),
    AgregarServicio: () => import("../components/Servicios/AgregarServicio")
  },
  data() {
    return {
      lorem: "Lorem ipsum ."
    };
  },
  methods: {
    ...mapActions("servicios", ["call_list_service"])
  },
  async created() {
    try {
      this.$q.loading.show();
      this.$store.commit("servicios/activador", "Servicios");
      console.log("cargando Servicios");
      // this.$router.replace("/servicios");
      await this.call_list_service();
      this.$q.loading.hide();
    } catch (e) {
      console.log(e);
      this.$q.loading.hide();
    }
  }
};
</script>
<style lang="sass" scoped>
/*.my-card*/
/*  width: 100%*/
</style>
