import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../../reclamation.service';
import { Reclamation } from '../../module/Reclamation';

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.css']
})
export class ReclamationDetailsComponent implements OnInit {
  reclamation: Reclamation | null = null;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    // Retrieve claim ID from route parameter
    const idRec = this.route.snapshot.paramMap.get('idRec');

    // Check if idRec exists
    if (idRec) {
      // Fetch claim details from the service based on the idRec
      this.reclamationService.getReclamation(parseInt(idRec, 10)).subscribe(
        (reclamation: Reclamation) => {
          this.reclamation = reclamation;
          console.log(reclamation); // Log the fetched reclamation object for debugging
        },
        (error: any) => {
          console.error('Error fetching claim details:', error);
          // Handle error (e.g., display error message)
        }
      );
    }
  }

  // Add methods to handle responding to the claim, updating status, etc.
}
