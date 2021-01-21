<template>
  <div>
    <q-list dense>
      <q-item>
        <q-item-section>
          <q-input outlined v-model="nombre" label="Nombre" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input outlined v-model="descripcion" label="Descripcion" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            v-model="precio"
            label="Precio"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            prefix="./S"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            v-model="descuento"
            label="Descuento"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            prefix="./S"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
            outline
            class="full-width"
            color="primary"
            @click="agregar"
            label="Agregar"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      nombre: "",
      descripcion: "",
      precio: null,
      descuento: 0.0,
      text: ""
    };
  },
  name: "AgregarServicio",
  methods: {
    ...mapActions("servicios", ["call_add_service", "call_list_service"]),
    async agregar() {
      this.$q.loading.show();
      await this.call_add_service({
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        descuento: this.descuento,
        activo: "1"
      });
      await this.call_list_service();
      this.$q.loading.hide();
    }
  }
};
</script>

<style scoped></style>
