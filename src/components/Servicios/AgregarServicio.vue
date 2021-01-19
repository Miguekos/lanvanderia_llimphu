<template>
  <div>
    <q-list dense>
      <q-item>
        <q-item-section>
          <q-input outlined v-model="text" label="Nombre" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input outlined v-model="text" label="Descripcion" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input outlined v-model="text" label="Precio" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn outline class="full-width" color="primary" label="Agregar" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  name: "AgregarServicio"
};
</script>

<style scoped></style>
