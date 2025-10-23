import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () => import("./modules/home/home").then((m) => m.Home),
    title: "Currency Converter",
  },
  {
    path: "details/:currency",
    loadComponent: () =>
      import("./modules/details/details").then((m) => m.Details),
    title: "Currency Details",
  },
  {
    path: "**",
    redirectTo: "",
  },
];
