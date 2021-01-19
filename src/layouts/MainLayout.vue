<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header reveal class="bg-grey-2 text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          v-if="!$q.screen.gt.sm"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          style="padding: 14px 0 0 6px;"
        >
          <img width="200" src="logo.png" />
          <!-- <span class="q-ml-sm">Noticias</span> -->
        </q-toolbar-title>
        <q-toolbar-title v-else shrink class="row items-center no-wrap">
          <!--          <img width="200" src="logo.svg">-->
          <span class="q-ml-sm">{{ activador }}</span>
        </q-toolbar-title>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="text-grey-7"
            icon="apps"
          >
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-2"
      :width="!$q.screen.gt.sm ? 250 : 200"
    >
      <q-toolbar-title
        v-if="!$q.screen.gt.sm"
        shrink
        style="padding: 20px 0 0 12px;"
      >
        <img width="200" src="logo.png" />
        <!-- <span class="q-ml-sm">Noticias</span> -->
      </q-toolbar-title>
      <q-scroll-area :class="!$q.screen.gt.sm ? 'full-height' : 'fit'">
        <q-list dense padding class="blue text-grey">
          <q-item>
            <q-item-section>
              REGISTROS
            </q-item-section>
          </q-item>
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
            :active="activador === `${link.text}`"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section @click="(activador = link.text), URL(link.url)">
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              CONTROL
            </q-item-section>
          </q-item>

          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links2"
            :key="link.text"
            clickable
            :active="activador === `${link.text}`"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section @click="(activador = link.text), URL(link.url)">
              <q-item-label
                :active="activador === `${link.text}`"
                active-class="my-menu-text"
                >{{ link.text }}</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links3"
            :key="link.text"
            clickable
          >
            <q-item-section>
              <q-item-label
                >{{ link.text }} <q-icon v-if="link.icon" :name="link.icon"
              /></q-item-label>
            </q-item-section>
          </q-item>

          <!-- <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div>
          </div> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fasGlobeAmericas, fasFlask } from "@quasar/extras/fontawesome-v5";

export default {
  name: "GoogleNewsLayout",

  data() {
    return {
      activador: "Registros",
      leftDrawerOpen: false,
      search: "",
      showAdvanced: false,
      showDateOptions: false,
      exactPhrase: "",
      hasWords: "",
      excludeWords: "",
      byWebsite: "",
      byDate: "Any time",
      links1: [
        { icon: "web", text: "Registros", url: "registros" },
        { icon: "person", text: "Servicios", url: "servicios" }
      ],
      links2: [
        { icon: "flag", text: "Reportes" },
        { icon: "group", text: "Usuarios" },
        { icon: "star_border", text: "Caja" }
      ],
      links3: [{ icon: "open_in_new", text: "Help" }]
    };
  },

  methods: {
    URL(val) {
      this.$router.push(`${val}`);
    },
    onClear() {
      this.exactPhrase = "";
      this.hasWords = "";
      this.excludeWords = "";
      this.byWebsite = "";
      this.byDate = "Any time";
    },

    changeDate(option) {
      this.byDate = option;
      this.showDateOptions = false;
    }
  }
};
</script>

<style lang="sass">
.my-menu-text
  font-weight: 900

.my-menu-link
  color: #ff8728
  /*color: #00c6c6*/
  background: #e9e9e9
  font-weight: 900

.GNL
  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    /*font-weight: bold*/

    .q-item__section--avatar
      .q-icon
    // color: #5f6368

    .q-item__label
      // color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      /*font-weight: 700*/
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
// color: #000
</style>
