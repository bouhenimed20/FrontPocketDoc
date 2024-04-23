import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';
import { ListReclamationComponent } from './BackOffice/liste-reclamation/liste-reclamation.component';
import { AjouterreclamationComponent } from './FrontOffice/ajouterreclamation/ajouterreclamation.component';
import { ReclamationDetailsComponent } from './BackOffice/reclamation-details/reclamation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    AllTemplateBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    ListEventComponent,
    ListReclamationComponent,
    AjouterreclamationComponent,
    ReclamationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule to imports
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
