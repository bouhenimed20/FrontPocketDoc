import { Component } from '@angular/core';
import { ReclamationService } from '../../reclamation.service'; // Update the path as per your project structure

@Component({
  selector: 'app-ajouterreclamation',
  templateUrl: './ajouterreclamation.component.html',
  styleUrls: ['./ajouterreclamation.component.css']
})

export class AjouterreclamationComponent {
  newReclamation: any = {
    dateRec: this.getTodayDate(),
    status: 'pending',
    // Initialize dateRec with today's date in 'YYYY-MM-DD' format
  };
  submissionSuccess: boolean = false;
  badWords: string[] = ['3ib', 'haram', 'israel']; // List of bad words
  badWordsDetected: boolean = false; // Flag to indicate if bad words are detected

  constructor(private reclamationService: ReclamationService) {}

  addReclamation() {
    if (this.containsBadWords(this.newReclamation.descriptionRec)) {
      this.badWordsDetected = true; // Set flag to true if bad words are detected
      return; // Prevent submission if bad words are detected
    }

    this.reclamationService.addReclamation(this.newReclamation)
      .subscribe(
        (response) => {
          console.log("Reclamation added successfully:", response);
          // Clear the form after successful submission
          this.newReclamation = {};
          // Show success message
          this.submissionSuccess = true;
        },
        (error) => {
          console.error("Error adding reclamation:", error);
          // Handle error as needed, for example, show error message
        }
      );
  }

  // Hcheck if the input contains any bad words
  containsBadWords(input: string): boolean {
    const regex = new RegExp(this.badWords.join('|'), 'gi');
    return regex.test(input);
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Method to check for bad words when input changes
  checkForBadWords() {
    if (this.containsBadWords(this.newReclamation.descriptionRec)) {
      this.badWordsDetected = true;
    } else {
      this.badWordsDetected = false;
    }
  }
}
