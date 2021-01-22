<template>
  <div>
    <!--    {{ info[0] }}-->
    <q-table
      :data="info"
      grid
      :title="`Total ${info.length}`"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!--      <template v-slot:body-cell-tabla_de_servicios="props">-->
      <!--        <q-td :props="props">-->
      <!--          <div v-for="item in props.row.tabla_de_servicios" v-bind:key="item">-->
      <!--            {{ item.nombre }}-->
      <!--          </div>-->
      <!--        </q-td>-->
      <!--      </template>-->
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-list dense>
              <q-item class="bg-orange-3">
                <q-item-section>
                  Nombre:
                </q-item-section>
                <q-item-section>
                  {{ props.row.nombre_cliente }}
                </q-item-section>
                <q-item-section side style="padding-left: 58px;">
                  <!--                  {{ props.row.nombre_cliente }}-->
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item>
                <q-item-section>
                  Direccion:
                </q-item-section>
                <q-item-section>
                  {{ props.row.direccion_cliente }}
                </q-item-section>
                <q-item-section side style="padding-left: 58px;">
                  <!--                  {{ props.row.nombre_cliente }}-->
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item>
                <q-item-section>
                  Descripcion:
                </q-item-section>
                <q-item-section>
                  {{ props.row.nombre_cliente }}
                </q-item-section>
                <q-item-section side style="padding-left: 58px;">
                  <!--                  {{ props.row.nombre_cliente }}-->
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item>
                <q-item-section>
                  Servicios:
                </q-item-section>
                <q-item-section>
                  <!--                  {{ props.row.service_tipo_de_pago }}-->
                  <div
                    v-for="(item, index) in props.row.tabla_de_servicios"
                    v-bind:key="index"
                  >
                    {{ index + 1 }} - {{ item.nombre }}
                  </div>
                </q-item-section>
                <q-item-section side style="padding-left: 58px;">
                  <!--                  {{ props.row.nombre_cliente }}-->
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item>
                <q-item-section>
                  Total a pagar:
                </q-item-section>
                <q-item-section>
                  {{ props.row.total_a_pagar_cliente }}
                </q-item-section>
                <q-item-section side style="padding-left: 58px;">
                  <!--                  {{ props.row.nombre_cliente }}-->
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item>
                <q-item-section>
                  Pagado por el cliente:
                </q-item-section>
                <q-item-section>
                  {{ props.row.service_pago_del_cliente }}
                </q-item-section>
                <q-item-section side>
                  <q-btn size="xs" rounded color="primary" icon="add"></q-btn>
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item>
                <q-item-section>
                  Deuda:
                </q-item-section>
                <q-item-section
                  :class="
                    props.row.deuda_pendiente_cliente > 0
                      ? 'text-red text-bold'
                      : ''
                  "
                >
                  {{ props.row.deuda_pendiente_cliente }}
                </q-item-section>
                <q-item-section side style="padding-left: 58px;">
                  <!--                  {{ props.row.nombre_cliente }}-->
                </q-item-section>
              </q-item>
            </q-list>
            <!--            <q-card-section class="text-center">-->
            <!--              Calories for-->
            <!--              <br />-->
            <!--              <strong>{{ props.row.name }}</strong>-->
            <!--            </q-card-section>-->
            <!--            <q-separator />-->
            <!--            <q-card-section-->
            <!--              class="flex flex-center"-->
            <!--              :style="{ fontSize: props.row.calories + 'px' }"-->
            <!--            >-->
            <!--              <div>{{ props.row.calories }} g</div>-->
            <!--            </q-card-section>-->
          </q-card>
        </div>
      </template>
      <!--      <template v-slot:body-cell-acciones="props">-->
      <!--        <q-td :props="props">-->
      <!--          <div>-->
      <!--            <q-badge color="purple" :label="props.value" />-->
      <!--          </div>-->
      <!--          <div class="my-table-details">-->
      <!--            {{ props.row.details }}-->
      <!--          </div>-->
      <!--        </q-td>-->
      <!--      </template>-->
    </q-table>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "Tabla",
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "desc",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.nombre_cliente,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "direccion_cliente",
          align: "center",
          label: "Direccion",
          field: "direccion_cliente",
          sortable: true
        },
        {
          name: "tabla_de_servicios",
          label: "Servicios",
          field: "tabla_de_servicios",
          // field: row => row.tabla_de_servicios,
          // format: val => val,
          sortable: true
        },
        {
          name: "total_a_pagar_cliente",
          label: "Total a pagar",
          field: "total_a_pagar_cliente"
        },
        {
          name: "service_pago_del_cliente",
          label: "Pagado por el cliente",
          field: "service_pago_del_cliente"
        },
        {
          name: "deuda_pendiente_cliente",
          label: "Deuda pendiente",
          field: "deuda_pendiente_cliente"
        }
        // {
        //   name: "acciones",
        //   label: "Acciones",
        //   field: "acciones"
        // }
      ],
      data: []
    };
  },
  methods: {
    asd(val) {
      console.log(JSON.stringify(val));
      let elemento = [];
      const array = val;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(element);
        elemento.push(element);
      }
      return elemento;
    }
  }
};
</script>

<style scoped></style>
