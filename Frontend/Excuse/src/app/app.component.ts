import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Excuse';

  excuse = {
  mood: '',
  tone: '',
  text: ''
};
 generatedExcuse: string= '';
  generateMood: string = '';
  generateTone: string = '';


  excuses: any[] = [];
  moods: string[] = ['Sad', 'Happy', 'Angry', 'Guilty', 'Playful', 'Sleepy', 'Lazy', 'Exited', 'Innocent', 'Romantic', 'Regretful'];
tones: string[] = ['Funny', 'Serious', 'Romantic', 'Cute', 'Relatable', 'Random', 'Flirty', 'Overdramatic', 'Sarcastic'];


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExcuses(); 
  }

addExcuse() {
  this.http.post('http://localhost:3000/api/excuses', this.excuse).subscribe((res) => {
    alert('Excuse added!');
    this.excuse = { mood: '', tone: '', text: '' }; // reset the form
    this.fetchExcuses();
  });
}

fetchExcuses() {
  this.http.get<any[]>('http://localhost:3000/api/excuses').subscribe((data) => {
    this.excuses = data;
  });}

  generateExcuse() {
  let filtered = this.excuses;

  if (this.generateMood) {
    filtered = filtered.filter(e => e.mood === this.generateMood);
  }

  if (this.generateTone) {
    filtered = filtered.filter(e => e.tone === this.generateTone);
  }

  if (filtered.length > 0) {
    // Choose a random excuse from the filtered list
    const randomIndex = Math.floor(Math.random() * filtered.length);
    this.generatedExcuse = filtered.map(e => e.text).join('\n');
  } else {
    this.generatedExcuse = 'No excuse found for the selected mood or tone.';
    }
}

}
 


