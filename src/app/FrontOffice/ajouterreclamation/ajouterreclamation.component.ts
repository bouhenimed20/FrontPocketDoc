// Import necessary modules and components from Angular core and custom files
import { Component, OnInit } from '@angular/core';
import { BadwordsService } from '../../badwords.service'; // Import BadwordsService for fetching bad words
import { Badwords } from '../../module/Badwords'; // Import Badwords interface for typing bad words

@Component({
  selector: 'app-ajouterreclamation', // Custom HTML tag representing this component
  templateUrl: './ajouterreclamation.component.html', // Template file for the component
  styleUrls: ['./ajouterreclamation.component.css'] // Styles file for the component
})
export class AjouterreclamationComponent implements OnInit { // Component class definition implementing OnInit interface

  // Declare variables to hold data and manage component state
  newReclamation: any = { // Object to store new reclamation data
    dateRec: this.getTodayDate(), // Initialize date with today's date using the getTodayDate method
    status: 'pending' // Initialize status as 'pending'
  };
  submissionSuccess: boolean = false; // Flag to indicate if submission is successful
  badWords: Badwords[] = []; // Array to store bad words fetched from the backend
  badWordsDetected: boolean = false; // Flag to indicate if bad words are detected in the input

  constructor(private badwordsService: BadwordsService) {} // Constructor injecting BadwordsService dependency

  ngOnInit(): void {
    this.loadBadWords(); // Call method to fetch bad words when component initializes
  }

  // Method to fetch bad words from the backend
  loadBadWords(): void {
    this.badwordsService.getAllBadwords() // Call BadwordsService method to fetch all bad words
      .subscribe(
        (badWords: Badwords[]) => { // Handle successful response
          this.badWords = badWords; // Assign fetched bad words to component variable
          console.log('Bad words loaded:', this.badWords); // Log loaded bad words to the console
        },
        (error: any) => { // Handle error response
          console.error('Error loading bad words:', error); // Log error to the console
        }
      );   
  }

  // Method to add a new reclamation
  addReclamation() {
    this.checkForBadWords(); // Check for bad words in the reclamation description
    if (this.badWordsDetected) { // If bad words are detected, return without adding the reclamation
      return;
    }
    // Your addReclamation logic here...
  }

  // Method to check if input contains bad words
  containsBadWords(input: string): boolean {
    const regex = new RegExp(this.badWords?.map(badWord => badWord.badword).join('|') || '', 'gi'); // Construct regex pattern from bad words array
    return regex.test(input); // Test input against regex pattern to check for bad words
  }
  
  // Method to get today's date in 'yyyy-MM-dd' format
  getTodayDate(): string {
    const today = new Date(); // Create a new Date object to get current date
    const year = today.getFullYear(); // Get full year
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get month and ensure 2-digit format
    const day = today.getDate().toString().padStart(2, '0'); // Get day and ensure 2-digit format
    return `${year}-${month}-${day}`; // Return formatted date string
  }

  // Method to check for bad words in the reclamation description
  checkForBadWords() {
    if (this.newReclamation.descriptionRec) { // Check if description is not null or undefined
      this.badWordsDetected = this.containsBadWords(this.newReclamation.descriptionRec); // Check for bad words in description
    } else {
      this.badWordsDetected = false; // Reset badWordsDetected flag if description is null or undefined
    }
  }
}
