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
  submissionSuccess: boolean = false;
  showSuccessAlert: boolean = false; // Add showSuccessAlert property

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
    if (this.reclamation && this.response) {
      // Call the service to add the response
      this.reponseService.addResponse(this.response).subscribe(
        (response: Reponse) => {
          // Check if this.reclamation is not null
          if (this.reclamation) {
            // Associate the response with the reclamation using affecterRepARec method
            this.reponseService.affecterRepARec(response.idRep, this.reclamation.idRec).subscribe(
              (affectedResponse: Reponse) => {
                console.log('Response added successfully and associated with reclamation:', affectedResponse);
                // Reset the response object after it's added
                this.response = { idRep: 0, contenuRep: '', dateRep: new Date(), reclamation: { idRec: 0, descriptionRec: '', dateRec: new Date(), status: '' } };
                // Set submissionSuccess to true to show the success alert
                this.submissionSuccess = true;
              },
              (error: any) => {
                console.error('Error associating response with reclamation:', error);
              }
            );
          } else {
            console.error('Error: Reclamation is null.');
          }
        },
        (error: any) => {
          console.error('Error adding response:', error);
          // Handle error (e.g., display error message)
        }
      );
    } else {
      console.error('Error: Reclamation or response object is null.');
    }
  }
  

  resetResponse(): void {
    this.response = { idRep: 0, contenuRep: '', dateRep: new Date(), reclamation: { idRec: 0, descriptionRec: '', dateRec: new Date(), status: '' } };
  }

}
