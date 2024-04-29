import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from '../../module/Reclamation';
import { ReclamationService } from '../../reclamation.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './liste-reclamation.component.html',
  styleUrls: ['./liste-reclamation.component.css'],
})
export class ListReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  totalClaims: number = 0;
  error: string = '';

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations: Reclamation[]) => {
        this.reclamations = reclamations;
        this.calculateTotalClaims();
        this.error = ''; // error message if request succeeds
      },
      (error: any) => {
        if (error.status === 0) {
          this.error =
            'Failed to connect to the server. Please check your internet connection or try again later.';
        } else {
          this.error = `Error loading reclamations: ${error.status} - ${error.statusText}`;
        }
      }
    );
  }

  calculateTotalClaims(): void {
    this.totalClaims = this.reclamations.length;
  }

  confirmDelete(id: number): void {
    const result = confirm('Are you sure you want to delete this item?');

    // If user confirms deletion, call the deleteReclamation method
    if (result) {
      this.deleteReclamation(id);
    }
  }

  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamation(id).subscribe(
      () => {
        this.loadReclamations();
      },
      (error: any) => {
        console.error('Error deleting reclamation:', error);
      }
    );
  }

  navigateToModify(idRec: number): void {
    this.router.navigate(['/modifierreclamation', idRec]); // Corrected path
  }

  respondToClaim(idRec: number): void {
    this.router.navigate(['/admin/reclamation', idRec]); // Redirect to the detail page of the claim
  }
}
