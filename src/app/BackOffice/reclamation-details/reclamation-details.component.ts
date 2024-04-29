import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../../reclamation.service';
import { Reclamation } from '../../module/Reclamation';
import { Reponse } from '../../module/Reponse';
import { ReponseService } from '../../reponse.service';
import { GoogleAiService } from 'src/app/google-ai.service';

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.css'],
})
export class ReclamationDetailsComponent implements OnInit {
  reclamation: Reclamation | null = null;
  response: Reponse = {
    idRep: 0,
    contenuRep: '',
    dateRep: new Date(),
  };
  responses: Reponse[] = []; // Array to hold responses
  submissionSuccess: boolean = false;
  showSuccessAlert: boolean = false; // Add showSuccessAlert property
  priority: string = ''; // Add priority property
  errorAdd: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private reponseService: ReponseService,
    private googleAiService: GoogleAiService // Inject GoogleAiService
  ) {}
  ngOnInit(): void {
    const idRec = this.route.snapshot.paramMap.get('idRec');

    if (idRec) {
      this.reclamationService.getReclamation(parseInt(idRec, 10)).subscribe(
        (reclamation: Reclamation) => {
          this.reclamation = reclamation;

          // Fetch responses for the current reclamation
          this.reponseService
            .getResponsesForReclamation(reclamation.idRec)
            .subscribe(
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
    if (this.reclamation && this.response.contenuRep) {
      // Call the service to add the response
      this.reponseService.addResponse(this.response).subscribe(
        (response: Reponse) => {
          // Check if this.reclamation is not null
          if (this.reclamation) {
            // Associate the response with the reclamation using affecterRepARec method
            this.reponseService
              .affecterRepARec(response.idRep, this.reclamation.idRec)
              .subscribe(
                (affectedResponse: Reponse) => {
                  console.log(
                    'Response added successfully and associated with reclamation:',
                    affectedResponse
                  );

                  // Reset the response object after it's added
                  this.response = {
                    idRep: 0,
                    contenuRep: '',
                    dateRep: new Date(),
                  };

                  // Set submissionSuccess to true to show the success alert
                  this.submissionSuccess = true;

                  // Change the status of the reclamation to "Completed" if it exists
                  if (this.reclamation) {
                    this.reclamation.status = 'Completed';

                    // Update the status of the reclamation in the database
                    this.reclamationService
                      .modifyReclamation(this.reclamation)
                      .subscribe(
                        (updatedReclamation: Reclamation) => {
                          console.log(
                            'Reclamation status updated to "closed":',
                            updatedReclamation
                          );
                        },
                        (error: any) => {
                          console.error(
                            'Error updating reclamation status:',
                            error
                          );
                        }
                      );
                  } else {
                    console.error('Error: Reclamation is null.');
                  }
                },
                (error: any) => {
                  console.error(
                    'Error associating response with reclamation:',
                    error
                  );
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
      this.errorAdd = true;
      console.error('Error: Reclamation or response object is null.');
    }
  }

  resetResponse(): void {
    this.response = {
      idRep: 0,
      contenuRep: '',
      dateRep: new Date(),
    };
  }

  answerTask(): void {
    // Use Google AI to generate a priority based on the reclamation content
    this.googleAiService
      .generateStory(
        'Our website PocketDoc helps students for their health care and you have to answer claims that are linked with our goal so please give me a short answer for this claim: ' +
          this.reclamation?.descriptionRec
      )
      .subscribe(
        (res) => {
          // Extract priority from the generated story
          const text = res.candidates[0].content.parts[0].text;

          // Set the priority property
          this.response.contenuRep = text;
          console.log('Automatic response:', text);
        },
        (error) => {
          console.error('Error generating priority:', error);
        }
      );
  }
}
