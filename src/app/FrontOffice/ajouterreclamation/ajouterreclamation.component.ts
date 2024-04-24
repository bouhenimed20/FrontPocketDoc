import { Component, OnInit } from '@angular/core';
import { BadwordsService } from '../../badwords.service';
import { Badwords } from '../../module/Badwords';

@Component({
  selector: 'app-ajouterreclamation',
  templateUrl: './ajouterreclamation.component.html',
  styleUrls: ['./ajouterreclamation.component.css']
})
export class AjouterreclamationComponent implements OnInit {
  newReclamation: any = {
    dateRec: this.getTodayDate(),
    status: 'pending'
  };
  submissionSuccess: boolean = false;
  badWords: Badwords[] = [];
  badWordsDetected: boolean = false;

  constructor(private badwordsService: BadwordsService) {}

  ngOnInit(): void {
    this.loadBadWords(); // Fetch bad words when component initializes
  }

  loadBadWords(): void {
    this.badwordsService.getAllBadwords()
      .subscribe(
        (badWords: Badwords[]) => {
          this.badWords = badWords;
          console.log('Bad words loaded:', this.badWords);
        },
        (error: any) => {
          console.error('Error loading bad words:', error);
        }
      );   
  }

  addReclamation() {
    this.checkForBadWords();
    if (this.badWordsDetected) {
      return;
    }
    // Your addReclamation logic here...
  }

  containsBadWords(input: string): boolean {
    const regex = new RegExp(this.badWords?.map(badWord => badWord.badword).join('|') || '', 'gi');
    return regex.test(input);
  }
  
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  checkForBadWords() {
    if (this.newReclamation.descriptionRec) {
      this.badWordsDetected = this.containsBadWords(this.newReclamation.descriptionRec);
    } else {
      this.badWordsDetected = false;
    }
  }

}
