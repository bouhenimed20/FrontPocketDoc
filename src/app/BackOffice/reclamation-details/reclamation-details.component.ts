import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../../reclamation.service';
import { Reclamation } from '../../module/Reclamation';
import { Reponse } from '../../module/Reponse';
import { ReponseService } from '../../reponse.service';

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.css']
})
export class ReclamationDetailsComponent implements OnInit {
  reclamation: Reclamation | null = null;
  response: Reponse = { idRep: 0, contenuRep: '', dateRep: new Date(), reclamation: { idRec: 0, descriptionRec: '', dateRec: new Date(), status: '' } };

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
    const idRec = this.route.snapshot.paramMap.get('idRec');

    if (idRec) {
      this.reclamationService.getReclamation(parseInt(idRec, 10)).subscribe(
        (reclamation: Reclamation) => {
          this.reclamation = reclamation;
        },
        (error: any) => {
          console.error('Error fetching claim details:', error);
        }
      );
    }
  }

  addResponse(): void {
    if (this.reclamation) {
      this.response.reclamation = this.reclamation;
      this.reponseService.addResponse(this.response).subscribe(
        (response: Reponse) => {
          console.log('Response added successfully:', response);
          // Reset the response object after it's added
          this.response = { idRep: 0, contenuRep: '', dateRep: new Date(), reclamation: { idRec: 0, descriptionRec: '', dateRec: new Date(), status: '' } };
        },
        (error: any) => {
          console.error('Error adding response:', error);
          // Handle error (e.g., display error message)
        }
      );
    }
  }
  resetResponse(): void {
    this.response = { idRep: 0, contenuRep: '', dateRep: new Date(), reclamation: { idRec: 0, descriptionRec: '', dateRec: new Date(), status: '' } };
  }
  
}
