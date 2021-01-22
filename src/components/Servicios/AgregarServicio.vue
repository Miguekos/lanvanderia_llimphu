<template>
  <div class="q-pa-sm text-brown">
    <form
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
      class="q-gutter-md"
    >
      <q-list dense>
        <q-item>
          <q-item-section>
            <q-input
              ref="nombre"
              outlined
              v-model="nombre"
              label="Nombre"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              ref="descripcion"
              outlined
              v-model="descripcion"
              label="Descripcion"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              outline
              class="full-width"
              color="primary"
              type="submit"
              label="Agregar"
              :loading="loadboton"
            />
          </q-item-section>
        </q-item>
        <!--        <q-item>-->
        <!--          <q-item-section>-->
        <!--            <q-input-->
        <!--              outlined-->
        <!--              v-model="precio"-->
        <!--              label="Precio"-->
        <!--              mask="#.##"-->
        <!--              fill-mask="0"-->
        <!--              reverse-fill-mask-->
        <!--              prefix="S/."-->
        <!--            />-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
        <!--        <q-item>-->
        <!--          <q-item-section>-->
        <!--            <q-input-->
        <!--              outlined-->
        <!--              v-model="descuento"-->
        <!--              label="Descuento"-->
        <!--              mask="#.##"-->
        <!--              fill-mask="0"-->
        <!--              reverse-fill-mask-->
        <!--              prefix="S/."-->
        <!--            />-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
        <!--        <q-item>-->
        <!--          <q-item-section>-->
        <!--            <q-btn-->
        <!--              outline-->
        <!--              class="full-width"-->
        <!--              color="primary"-->
        <!--              type="submit"-->
        <!--              label="Agregar"-->
        <!--              :loading="loadboton"-->
        <!--            />-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
      </q-list>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      nombre: "",
      descripcion: "",
      precio: 0.0,
      descuento: 0.0,
      text: "",
      loadboton: false
    };
  },
  name: "AgregarServicio",
  methods: {
    ...mapActions("servicios", ["call_add_service", "call_list_service"]),
    async onSubmit() {
      // this.$q.loading.show();
      this.loadboton = true;

      this.$refs.nombre.validate();
      this.$refs.descripcion.validate();

      if (this.$refs.nombre.hasError || this.$refs.descripcion.hasError) {
        this.formHasError = true;
        // this.$q.loading.hide();
        this.loadboton = false;
      } else {
        await this.call_add_service({
          nombre: this.nombre,
          descripcion: this.descripcion,
          activo: "1"
        });
        await this.call_list_service();
        this.nombre = "";
        this.descripcion = "";
        this.$refs.nombre.resetValidation();
        this.$refs.descripcion.resetValidation();
        this.$q.notify({
          icon: "done",
          color: "positive",
          message: "Agregado"
        });
        // this.$q.loading.hide();
        this.loadboton = false;
      }
    }
  }
};
</script>

<style scoped></style>
