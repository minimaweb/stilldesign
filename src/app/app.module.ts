import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from '../pages/userList/userList.component';
import { PageNotFoundComponent } from '../pages/pageNotFound/pageNotFound.component';
import { UserEditComponent } from '../pages/userEdit/userEdit.component';
import { UserCreateComponent } from '../pages/userCreate/userCreate.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PageNotFoundComponent,
    UserEditComponent,
    UserCreateComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
