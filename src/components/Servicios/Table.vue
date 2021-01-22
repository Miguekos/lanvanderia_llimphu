<template>
  <div>
    <q-card flat bordered>
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
        :pagination="initialPagination"
        :rows-per-page-options="[0]"
      >
        <template :grid="$q.screen.lt.sm" v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-6 cursor-pointer">
            <q-card @click="acciones">
              <q-list dense>
                <q-item>
                  <q-item-section avatar style="min-width: 0">
                    <q-avatar size="xs" color="primary" text-color="white">
                      <q-icon size="xs" name="shopping_basket"></q-icon>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <u>Servicio</u>
                  </q-item-section>
                  <q-item-section>
                    <strong>{{ props.row.nombre }}</strong>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar style="min-width: 0">
                    <q-avatar size="xs" color="primary" text-color="white">
                      <q-icon size="xs" name="description"></q-icon>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <u>Descripcion</u>
                  </q-item-section>
                  <q-item-section>
                    <strong>{{ props.row.descripcion }}</strong>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar style="min-width: 0">
                    <q-avatar size="xs" color="primary" text-color="white">
                      <q-icon size="xs" name="attach_money"></q-icon>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <u>Precio</u>
                  </q-item-section>
                  <q-item-section>
                    <strong>S/. {{ props.row.precio }}</strong>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar style="min-width: 0">
                    <q-avatar size="xs" color="primary" text-color="white">
                      <q-icon size="xs" name="attach_money"></q-icon>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <u>Descuento</u>
                  </q-item-section>
                  <q-item-section>
                    <strong>S/. {{ props.row.descuento }}</strong>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      loading: false,

      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
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
  methods: {
    acciones() {
      this.$q.notify({
        message: "Se preciono"
      });
    }
  }
};
</script>
<style>
/*.q-item__section--avatar {*/
/*  color: inherit;*/
/*  min-width: 0px;*/
/*}*/
</style>
