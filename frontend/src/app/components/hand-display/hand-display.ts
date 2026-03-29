import { Component, input, output } from '@angular/core';
import { Card } from '../../services/poker.service';

@Component({
  selector: 'app-hand-display',
  imports: [],
  templateUrl: './hand-display.html',
  styleUrl: './hand-display.css'
})
export class HandDisplay {
  cards = input.required<Card[]>();
  mode = input.required<'pick' | 'random'>();

  removeCard = output<number>();

  suitSymbol(suit: string): string {
    const symbols: Record<string, string> = {
      'Hearts': '♥',
      'Diamonds': '♦',
      'Clubs': '♣',
      'Spades': '♠'
    };
    return symbols[suit] ?? suit;
  }

  isRed(suit: string): boolean {
    return suit === 'Hearts' || suit === 'Diamonds';
  }
}