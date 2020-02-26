import { Component, OnInit } from '@angular/core';
import { ADJECTIVES, MNEMONICS, NOUNS, VERBS } from 'src/_data/words';
import { Random } from 'src/_utils/random';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// export class AppComponent implements OnInit {
export class AppComponent implements OnInit {
  title = 'cannon-clone';
  defaultSetSize = 10;
  inProgress = false;

  adjectiveNouns: string[];
  nounNouns: string[];
  verbNouns: string[];
  mnemonics: string[];

  adjectiveNounsAlliterations: string[];
  nounNounsAlliterations: string[];
  verbNounsAlliterations: string[];
  mnemonicsAlliterations: string[];

  constructor(private random: Random) {
  }

  private static getWordList(type: string): string[] {
    switch (type) {
      case 'adjective': return ADJECTIVES;
      case 'mnemonic': return MNEMONICS;
      case 'noun': return NOUNS;
      case 'verb': return VERBS;
    }
  }

  private static titleCase(str: string): string {
    return [str.charAt(0).toUpperCase(), str.substring(1)].join('');
  }

  ngOnInit(): void {
    /*
    * Generate phrases on initialization
    * */
    this.generatePhrases();
  }

  generatePhrases(): void {
    /*
    * Generate sets of phrases
    * adjective-noun, noun-noun, verb-noun, mnemonics
    * 2 of each (regular, alliteration)
    * */
    this.toggleProgressBar();

    this.adjectiveNouns = this.getPhraseSet('adjective', 'noun', false);
    this.nounNouns = this.getPhraseSet('noun', 'noun', false);
    this.verbNouns = this.getPhraseSet('verb', 'noun', false);
    this.mnemonics = this.getPhraseSet('mnemonic', 'mnemonic', false);

    this.adjectiveNounsAlliterations = this.getPhraseSet('adjective', 'noun', true);
    this.nounNounsAlliterations = this.getPhraseSet('noun', 'noun', true);
    this.verbNounsAlliterations = this.getPhraseSet('verb', 'noun', true);
    this.mnemonicsAlliterations = this.getPhraseSet('mnemonic', 'mnemonic', true);

    this.toggleProgressBar();
  }

  private getPhraseSet(type1: string, type2: string, alliteration: boolean): string[] {
    /*
    * Generate an array of "<type1> <type2>" words of length defaultSetSize
    * */
    const phraseSet: string[] = [];
    let phrase: string;
    for (let i = 0; i < this.defaultSetSize; i++) {
      let initial = null;
      const firstWord = this.getWord(type1);

      if (alliteration) {
        initial = firstWord.charAt(0);
      }
      phrase = `${AppComponent.titleCase(firstWord)}\ ${AppComponent.titleCase(this.getWord(type2, initial))}`;
      phraseSet.push(phrase);
    }
    return phraseSet;
  }

  private getWord(type: string, initial?: string): string {
    /*
    * Generate a word of a specific type
    * which can be an alliteration depending upon the initial value
    * */

    let word: string;

    /* get the list of the specified type of words */
    const wordList = AppComponent.getWordList(type);

    /* word selection */
    word = wordList[this.randomIndex(wordList.length)];
    /* alliteration */
    if (initial) {
      while (initial !== word.charAt(0)) {
        word = wordList[this.randomIndex(wordList.length)];
      }
    }

    return word;
  }

  private randomIndex(max: number): number {
    return this.random.randInt(0, max - 1);
  }

  private toggleProgressBar(): void {
    this.inProgress = !this.inProgress;
  }
}
