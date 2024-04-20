import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';

const routes: Routes = [
  {path:"",component:AllTemplateFrontComponent,
  children :[]
},
    

{
      path:"admin",component:AllTemplateBackComponent,
      children:[
        { path:"event",component:ListEventComponent},

      ]
    }
  
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
