import { Component } from '@angular/core';
import { GoogleAiService } from 'src/app/google-ai.service';

@Component({
  selector: 'app-all-template-back',
  templateUrl: './all-template-back.component.html',
  styleUrls: ['./all-template-back.component.css']
})
export class AllTemplateBackComponent {
  constructor( private gaservice : GoogleAiService){

  }
  ngOnInit(){
    this.gaservice.generateStory("write me a code for hello world with python").subscribe(
      (res) => console.log(res.candidates[0].content.parts[0].text)
    )

  }
}
