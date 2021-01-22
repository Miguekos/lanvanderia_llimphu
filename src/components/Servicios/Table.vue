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
            <q-card @click="acciones(props.row)">
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
                <!--                <q-item>-->
                <!--                  <q-item-section avatar style="min-width: 0">-->
                <!--                    <q-avatar size="xs" color="primary" text-color="white">-->
                <!--                      <q-icon size="xs" name="attach_money"></q-icon>-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>-->
                <!--                    <u>Precio</u>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>-->
                <!--                    <strong>S/. {{ props.row.precio }}</strong>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item>-->
                <!--                  <q-item-section avatar style="min-width: 0">-->
                <!--                    <q-avatar size="xs" color="primary" text-color="white">-->
                <!--                      <q-icon size="xs" name="attach_money"></q-icon>-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>-->
                <!--                    <u>Descuento</u>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>-->
                <!--                    <strong>S/. {{ props.row.descuento }}</strong>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
    </q-card>
    <q-dialog
      v-model="dialog_agregar_precio"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-center">Nombre</div>
          <div class="text-h6 text-center">{{ service_selec.nombre }}</div>
          <div class="text-center">Descripcion</div>
          <div class="text-h6 text-center">{{ service_selec.descripcion }}</div>
        </q-card-section>

        <!--        <q-card-section class="q-pt-none">-->
        <!--        {{ service_selec }}-->
        <!--        {{ tabla_de_precios }}-->
        <!--        </q-card-section>-->

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-6 q-pa-xs">
              <q-input outlined v-model="descripcion" label="Descripcion" />
            </div>
            <div class="col-4 q-pa-xs">
              <q-input
                outlined
                v-model="precio"
                label="Precio"
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                prefix="S/."
              />
            </div>
            <div
              class="col-2 q-pa-xs"
              style="align-self: center"
              align="center"
            >
              <q-btn
                color="primary"
                rounded
                size="md"
                icon="add"
                @click="agregarPrecio"
                :loading="loadboton"
              ></q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Descripcion</th>
                <th class="text-right">Precio</th>
                <th class="text-right">Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tabla_de_precios" :key="index">
                <td class="text-left">{{ item.descripcion }}</td>
                <td class="text-right">S/. {{ item.precio }}</td>
                <td class="text-right">
                  <q-btn size="xs" icon="delete" color="red" rounded></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      loadboton: false,
      descripcion: "",
      precio: "",
      tabla_de_precios: [],
      text: "",
      service_selec: "",
      dialog: false,
      maximizedToggle: false,
      dialog_agregar_precio: false,
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
    async acciones(val) {
      this.$q.loading.show();
      this.service_selec = val;
      await this.$store.dispatch("precios/call_list_service_id", val.id_);
      this.tabla_de_precios = this.$store.state.precios.get_list_service_id;
      this.dialog_agregar_precio = true;
      // this.$q.notify({
      //   message: "Se preciono"
      // });
      this.$q.loading.hide();
    },
    async agregarPrecio() {
      try {
        if (this.descripcion.length > 0 && this.precio > 0) {
          this.loadboton = true;
          await this.$store.dispatch("precios/call_add_service", {
            servicio_id: this.service_selec.id_,
            descripcion: this.descripcion,
            precio: this.precio
          });
          console.log("agregarPrecio");
          await this.$store.dispatch(
            "precios/call_list_service_id",
            this.service_selec.id_
          );
          this.tabla_de_precios = this.$store.state.precios.get_list_service_id;
          this.descripcion = "";
          this.precio = "";
          this.loadboton = false;
          // this.tabla_de_precios.push({
          //   descripcion: this.descripcion,
          //   precio: this.precio
          // });
        } else {
          this.$q.notify({
            message: "Campos Vacios"
          });
        }
      } catch (e) {
        console.log(e);
        this.loadboton = false;
      }
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
