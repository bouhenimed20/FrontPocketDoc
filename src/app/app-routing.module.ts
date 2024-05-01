import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';
import { ListReclamationComponent } from './BackOffice/liste-reclamation/liste-reclamation.component';
import { AjouterreclamationComponent } from './FrontOffice/ajouterreclamation/ajouterreclamation.component';
import { ReclamationDetailsComponent } from './BackOffice/reclamation-details/reclamation-details.component';
import { DashboardComponent } from './BackOffice/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AllTemplateFrontComponent,
    children: [{ path: 'reclamation', component: AjouterreclamationComponent }],
  },
  {
    path: 'admin',
    component: AllTemplateBackComponent,
    children: [
      { path: 'event', component: ListEventComponent },
      { path: 'reclamation', component: ListReclamationComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reclamation/:idRec', component: ReclamationDetailsComponent }, // Define route for claim details component
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
