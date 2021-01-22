<template>
  <div>
    <q-table
      grid
      title="Servicios Agregados"
      :data="info"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      hide-bottom
      :pagination="initialPagination"
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-6 cursor-pointer">
          <q-card>
            <q-card-section class="text-center bg-primary">
              <u>Servicio</u>
              <br />
              <strong>{{ props.row.nombre }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section v-ripple>
              <q-list dense>
                <q-item class="justify-around">
                  <q-item-section>
                    Descripcion:
                  </q-item-section>
                  <q-item-section class="text-right">
                    {{ props.row.descripcion }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Precio:
                  </q-item-section>
                  <q-item-section class="text-right">
                    S/. {{ props.row.precio }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Descuento:
                  </q-item-section>
                  <q-item-section class="text-right">
                    S/. {{ props.row.descuento }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      filter: "",
      columns: [
        {
          name: "desc",
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
          label: "Descripcion",
          field: "descripcion",
          sortable: true
        },
        { name: "precio", label: "Precio", field: "precio", sortable: true },
        { name: "descuento", label: "Descuento", field: "descuento" }
      ]
    };
  }
};
</script>

<style scoped></style>
