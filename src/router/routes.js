
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "registros", component: () => import("pages/Registros.vue") },
      { path: "servicios", component: () => import("pages/Servicios.vue") },
      {
        path: "seguimientos",
        component: () => import("pages/Seguimientos.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes
