import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'inicio', component: LoginComponent },
    { path: 'login', component: RegisterComponent },
    { path: 'registro', component: RegisterComponent }
];

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)
