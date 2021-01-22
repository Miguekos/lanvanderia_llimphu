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
            <form
              @submit.prevent.stop="onSubmit"
              @reset.prevent.stop="onReset"
              class="q-gutter-md"
            >
              <q-list bordered separator>
                <q-item>
                  <q-item-section avatar>
                    Nombre
                  </q-item-section>
                  <q-item-section>
                    <q-input
                      ref="nombre_cliente"
                      outlined
                      input-class="text-right"
                      v-model="nombre_cliente"
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'Campo Obligatorio'
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    Direccion
                  </q-item-section>
                  <q-item-section>
                    <q-input
                      ref="direccion_cliente"
                      outlined
                      input-class="text-right"
                      v-model="direccion_cliente"
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'Campo Obligatorio'
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    Servicios
                  </q-item-section>
                  <q-item-section>
                    <q-input
                      ref="calculo"
                      disable
                      outlined
                      prefix="S/."
                      v-model="calculo"
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'Campo Obligatorio'
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    Tipo de pago
                  </q-item-section>
                  <q-item-section>
                    <q-select
                      ref="service_tipo_de_pago"
                      outlined
                      v-model="service_tipo_de_pago"
                      :options="formadepago"
                      label="Tipo de pago"
                      clearable
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'Campo Obligatorio'
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    Pago del cliente
                  </q-item-section>
                  <q-item-section>
                    <q-input
                      ref="service_pago_del_cliente"
                      outlined
                      v-model="service_pago_del_cliente"
                      prefix="S/."
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'Campo Obligatorio'
                      ]"
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
                    <q-btn outline color="primary" @click="todo"> Todo</q-btn>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    Restante
                  </q-item-section>
                  <q-item-section>
                    <q-input prefix="S/." outlined v-model="restante" />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-btn
                      outline
                      color="primary"
                      type="submit"
                      label="Procesar"
                      :loading="loadboton"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </form>
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
      options: [],
      options2: [],
      loadboton: false,
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
      return total.toFixed(2);
    },
    restante() {
      let total = 0.0;
      total = this.calculo - this.service_pago_del_cliente;
      // const array = this.tabla_de_servicios;
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //   total = element.precio + total;
      // }
      return total.toFixed(2);
    }
  },
  methods: {
    todo() {
      this.service_pago_del_cliente = this.calculo;
    },
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
    },
    async onSubmit() {
      this.loadboton = true;
      this.$refs.nombre_cliente.validate();
      this.$refs.direccion_cliente.validate();
      this.$refs.service_tipo_de_pago.validate();
      this.$refs.service_pago_del_cliente.validate();
      this.$refs.service_pago_del_cliente.validate();

      // this.$refs.nombre.hasError || this.$refs.descripcion.hasError

      if (
        this.$refs.nombre_cliente.hasError ||
        this.$refs.direccion_cliente.hasError ||
        this.$refs.service_tipo_de_pago.hasError ||
        this.$refs.service_pago_del_cliente.hasError ||
        this.$refs.service_pago_del_cliente.hasError
      ) {
        this.formHasError = true;
        // this.$q.loading.hide();
        this.loadboton = false;
      } else {
        if (this.restante < 0) {
          this.$q.notify({
            icon: "close",
            color: "negative",
            message: "La deuda es negativa verificar"
          });
          // this.$q.loading.hide();
          // this.onReset();
          this.loadboton = false;
        } else {
          const json = {
            tabla_de_servicios: this.tabla_de_servicios,
            service_tipo_de_pago: this.service_tipo_de_pago,
            service_pago_del_cliente: this.service_pago_del_cliente,
            service_restante_cliente: this.service_restante_cliente,
            nombre_tipo_de_pago: this.nombre_tipo_de_pago,
            service_cliente: this.service_cliente,
            nombre_cliente: this.nombre_cliente,
            direccion_cliente: this.direccion_cliente,
            servi_selec: this.servi_selec,
            total_a_pagar_cliente: this.calculo,
            deuda_pendiente_cliente: this.restante
          };
          console.log(json);
          await this.$store.dispatch("registros/call_add_service", json);
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Agregado"
          });
          // this.$q.loading.hide();
          this.onReset();
          this.loadboton = false;
        }
      }
    },
    onReset() {
      this.tabla_de_servicios = [];
      this.nombre_cliente = "";
      this.direccion_cliente = "";
      this.service_tipo_de_pago = "";
      this.service_pago_del_cliente = "";
      this.service_pago_del_cliente = "";
      this.$refs.nombre_cliente.resetValidation();
      this.$refs.direccion_cliente.resetValidation();
      this.$refs.service_tipo_de_pago.resetValidation();
      this.$refs.service_pago_del_cliente.resetValidation();
      this.$refs.service_pago_del_cliente.resetValidation();
    }
  },
  async created() {
    try {
      this.$store.commit("servicios/activador", "Registros");
      this.$q.loading.show();
      await this.$store.dispatch("servicios/call_list_service");
      const lista = await this.$store.state.servicios.get_list_service.result;
      this.options = lista;
      this.options2 = lista;
      console.log(lista);
      this.$q.loading.hide();
    } catch (e) {
      console.log(e);
      this.$q.loading.hide();
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
