<template>
  <div>
    <!--    {{ info }}-->
    <q-table
      flat
      :grid="$q.screen.lt.sm"
      virtual-scroll
      class="my-sticky-header-table"
      color="primary"
      card-class="bg-cyan-1 text-brown"
      table-header-class="text-brown"
      title="Servicios"
      :data="info"
      :columns="columns"
      :loading="loading"
      row-key="index"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      loading: false,

      pagination: {
        rowsPerPage: 0,
        rowsNumber: 1
      },

      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.nombre,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "descripcion",
          align: "center",
          label: "descripcion",
          field: "descripcion",
          sortable: true
        },
        { name: "precio", label: "Precio", field: "precio", sortable: true },
        { name: "descuento", label: "Descuento", field: "descuento" }
      ]
    };
  },
  methods: {}
};
</script>
