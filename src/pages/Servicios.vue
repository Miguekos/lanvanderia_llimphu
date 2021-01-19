<template>
  <div class="q-pa-xs items-start q-gutter-xs">
    <div class="row q-gutter-xs">
      <div class="col text-h5">
        <!--        <u>Servicios</u>-->
      </div>
      <div class="col text-right">
        <!--        <q-btn-->
        <!--          icon="add"-->
        <!--          label="Registro Nuevo"-->
        <!--          size="md"-->
        <!--          color="primary"-->
        <!--        ></q-btn>-->
      </div>
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
        <q-card flat bordered class="my-card">
          <!--          <q-card-section>-->
          <!--            <div class="text-h6">Administrar Servicios</div>-->
          <!--          </q-card-section>-->

          <q-card-section class="q-pt-none">
            <Tabla />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Tabla: () => import("../components/Servicios/Table"),
    AgregarServicio: () => import("../components/Servicios/AgregarServicio")
  },
  data() {
    return {
      lorem: "Lorem ipsum ."
    };
  },
  created() {
    this.$router.replace("/servicios");
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
