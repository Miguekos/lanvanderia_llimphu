<template>
  <div class="q-pa-xs items-start">
    <div class="row q-gutter-xs">
      <div class="col text-h5"></div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 q-pa-xs">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Seleccionar Servicios</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-10 q-pa-xs">
                <q-select
                  outlined
                  v-model="servi_selec"
                  use-input
                  hide-selected
                  fill-input
                  label="Servicios"
                  input-debounce="0"
                  :options="options"
                  option-label="nombre"
                  map-options
                  emit-value
                  @filter="filterFn"
                  clearable
                  options-selected-class="text-deep-orange"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <!--                  <q-item-section avatar>-->
                      <!--                    <q-icon :name="scope.opt.icon" />-->
                      <!--                  </q-item-section>-->
                      <q-item-section>
                        <q-item-label v-html="scope.opt.nombre" />
                        <q-item-label caption>{{
                          scope.opt.descripcion
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div
                class="col-2 q-pa-xs"
                style="align-self: center;"
                align="center"
              >
                <q-btn
                  icon="add"
                  @click="agregarServicios"
                  size="md"
                  color="primary"
                ></q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <TablaRegistros :info="tabla_de_servicios" />
          </q-card-section>

          <q-separator inset />
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6 q-pa-xs">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Orden</div>
          </q-card-section>

          <!--          <q-card-section class="q-pt-none">-->
          <!--            -->
          <!--          </q-card-section>-->

          <q-card-section class="q-pt-none">
            <q-list bordered separator>
              <q-item>
                <q-item-section avatar>
                  Nombre
                </q-item-section>
                <q-item-section>
                  <q-input
                    outlined
                    input-class="text-right"
                    v-model="nombre_cliente"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  Direccion
                </q-item-section>
                <q-item-section>
                  <q-input
                    outlined
                    input-class="text-right"
                    v-model="direccion_cliente"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  Servicios
                </q-item-section>
                <q-item-section>
                  <q-input outlined prefix="S/." v-model="calculo" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  Tipo de pago
                </q-item-section>
                <q-item-section>
                  <q-select
                    outlined
                    v-model="service_tipo_de_pago"
                    :options="formadepago"
                    label="Tipo de pago"
                    clearable
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  Pago del cliente
                </q-item-section>
                <q-item-section>
                  <q-input
                    outlined
                    v-model="service_pago_del_cliente"
                    prefix="S/."
                    mask="#.##"
                    fill-mask="0"
                    reverse-fill-mask
                  >
                  </q-input>
                  <!--                  <q-input-->
                  <!--                    outlined-->
                  <!--                    v-model="service_pago_del_cliente"-->
                  <!--                    mask="#.##"-->
                  <!--                    fill-mask="0"-->
                  <!--                    reverse-fill-mask-->
                  <!--                  />-->
                </q-item-section>
                <q-item-section side>
                  <q-btn outline color="primary"> Todo</q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  Restante
                </q-item-section>
                <q-item-section>
                  <q-input
                    prefix="S/."
                    outlined
                    v-model="service_restante_cliente"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn outline color="primary" label="Procesar" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-separator inset />
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    TablaRegistros: () => import("components/Registros/TablaRegistros")
  },
  data() {
    return {
      tabla_de_servicios: [],
      service_tipo_de_pago: "",
      service_pago_del_cliente: "",
      service_restante_cliente: "",
      nombre_tipo_de_pago: "",
      service_cliente: "",
      nombre_cliente: "",
      direccion_cliente: "",
      servi_selec: "",
      formadepago: ["Efectivo", "Yape", "Transferencia"],
      model: null,
      options: {},
      options2: {},
      lorem: "Lorem ipsum dolor"
    };
  },
  computed: {
    calculo() {
      let total = 0.0;
      const array = this.tabla_de_servicios;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        total = element.precio + total;
      }
      return total;
    }
  },
  methods: {
    agregarServicios() {
      console.log(this.servi_selec);
      this.tabla_de_servicios.push(this.servi_selec);
      this.servi_selec = "";
    },
    filterFn(val, update, abort) {
      update(() => {
        console.log(val);
        const needle = val.toLowerCase();
        this.options = this.options2.filter(
          v => v.nombre.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },
  async created() {
    this.$store.commit("servicios/activador", "Registros");
    this.$q.loading.show();
    await this.$store.dispatch("servicios/call_list_service");
    const lista = await this.$store.state.servicios.get_list_service.result;
    this.options = lista;
    this.options2 = lista;
    console.log(lista);
    this.$q.loading.hide();
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
