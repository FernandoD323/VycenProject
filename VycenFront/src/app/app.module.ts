import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompanyComponent } from './components/company/company.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './components/forum/forum.component';
import { ProductComponent } from './components/product/product.component';
import { SeeProductsComponent } from './components/see-products/see-products.component';
import { SearchPipe } from './pipes/search.pipe';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { GalleryComponent } from './components/gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProfileComponent,
    NotFoundComponent,
    CompanyComponent,
    UsersComponent,
    ForumComponent,
    FooterComponent,
    ProductComponent,
    SeeProductsComponent,
    SearchPipe,
    ShoppingCartComponent,
    ProfileUserComponent,
    LoadingAnimationComponent,
    ReportsComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
