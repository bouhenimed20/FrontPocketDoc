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
  response: Reponse = { 
    idRep: 0, 
    contenuRep: '', 
    dateRep: new Date()  
  };
  responses: Reponse[] = []; // Array to hold responses
  submissionSuccess: boolean = false;
  showSuccessAlert: boolean = false; // Add showSuccessAlert property
  priority: string = ''; // Add priority property
  
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

          // Calculate priority based on some criteria
          this.priority = this.calculatePriority(this.reclamation); // Call your priority calculation method here

          // Fetch responses for the current reclamation
          this.reponseService.getResponsesForReclamation(reclamation.idRec).subscribe(
            (responses: Reponse[]) => {
              this.responses = responses;
            },
            (error: any) => {
              console.error('Error fetching responses:', error);
            }
          );
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

                // Determine the priority of the reclamation
                const priority = this.calculatePriority(this.reclamation);
                console.log('Priority of reclamation:', priority);

                // Reset the response object after it's added
                this.response = { 
                  idRep: 0, 
                  contenuRep: '', 
                  dateRep: new Date()
                };

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
    this.response = { 
      idRep: 0, 
      contenuRep: '', 
      dateRep: new Date()
    };
  }

  private calculatePriority(reclamation: Reclamation | null): string {
    // Define an array of possible priorities
    const priorities = ['High', 'Medium', 'Low'];
  
    // Generate a random index to select a priority from the array
    const randomIndex = Math.floor(Math.random() * priorities.length);
  
    // Return the priority corresponding to the random index
    return priorities[randomIndex];
  }
  
}
