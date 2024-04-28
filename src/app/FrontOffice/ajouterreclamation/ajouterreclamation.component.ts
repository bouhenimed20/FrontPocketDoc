import { Component, OnInit } from '@angular/core';
import { GoogleAiService } from 'src/app/google-ai.service';
import { BadwordsService } from '../../badwords.service';
import { Badwords } from '../../module/Badwords';
import { ReclamationService } from '../../reclamation.service'; // Import ReclamationService if not imported

@Component({
  selector: 'app-ajouterreclamation',
  templateUrl: './ajouterreclamation.component.html',
  styleUrls: ['./ajouterreclamation.component.css'],
})
export class AjouterreclamationComponent implements OnInit {
  newReclamation: any = {
    dateRec: this.getTodayDate(),
    status: 'pending',
    descriptionRec: '',
    priority: '',
  };
  submissionSuccess: boolean = false;
  badWords: Badwords[] = [];
  badWordsDetected: boolean = false;

  constructor(
    private badwordsService: BadwordsService,
    private reclamationService: ReclamationService, // Inject ReclamationService,
    private googleAiService: GoogleAiService // Inject GoogleAiService
  ) {}

  ngOnInit(): void {
    this.loadBadWords();
  }

  loadBadWords(): void {
    this.badwordsService.getAllBadwords().subscribe(
      (badWords: Badwords[]) => {
        this.badWords = badWords;
        console.log('Bad words loaded:', this.badWords);
      },
      (error: any) => {
        console.error('Error loading bad words:', error);
      }
    );
  }

  async addReclamation() {
    this.checkForBadWords();
    if (this.badWordsDetected) {
      return;
    }
    this.googleAiService
      .generateStory(
        'Generate a priority for this claim based on the emotions of the user and the response will be only one word: high, medium or low. this is the reclamation' +
          this.newReclamation.descriptionRec
      )
      .subscribe(
        (res) => {
          // Extract priority from the generated story
          const priority = res.candidates[0].content.parts[0].text;

          // Set the priority property
          this.newReclamation.priority = priority;
          this.reclamationService.addReclamation(this.newReclamation).subscribe(
            (response: any) => {
              // Explicitly type response
              console.log('Reclamation added successfully:', response);
              this.newReclamation = {
                dateRec: this.getTodayDate(),
                status: 'pending',
                descriptionRec: '',
              };
              this.submissionSuccess = true;
            },
            (error: any) => {
              // Explicitly type error
              console.error('Error adding reclamation:', error);
            }
          );
          console.log('Priority of reclamation:', priority);
        },
        (error) => {
          console.error('Error generating priority:', error);
        }
      );
  }

  containsBadWords(input: string): boolean {
    const regex = new RegExp(
      this.badWords?.map((badWord) => badWord.badword).join('|') || '',
      'gi'
    );
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
      this.badWordsDetected = this.containsBadWords(
        this.newReclamation.descriptionRec
      );
    } else {
      this.badWordsDetected = false;
    }
  }
}
