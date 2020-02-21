import { Component, OnInit } from '@angular/core';
import { ADJECTIVES, NOUNS, VERBS } from 'src/_data/words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'cannon-clone';
  adjectives = ADJECTIVES;
  nouns = NOUNS;
  verbs = VERBS;

  ngOnInit(): void {
  }
}
