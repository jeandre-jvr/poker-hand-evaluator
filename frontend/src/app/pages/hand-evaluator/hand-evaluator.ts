import { Component, signal, computed, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { PokerService, Card, CardOptions } from '../../services/poker.service';
import { CardPicker } from '../../components/card-picker/card-picker';
import { HandDisplay } from '../../components/hand-display/hand-display';
import { ResultDisplay } from '../../components/result-display/result-display';

@Component({
  selector: 'app-hand-evaluator',
  imports: [Button, CardPicker, HandDisplay, ResultDisplay],
  templateUrl: './hand-evaluator.html',
  styleUrl: './hand-evaluator.css',
})
export class HandEvaluator implements OnInit {
  mode = signal<'pick' | 'random'>('pick');
  hand = signal<Card[]>([]);
  result = signal<string>('');
  pickerError = signal<string>('');
  resultError = signal<string>('');
  cardOptions = signal<CardOptions>({ ranks: [], suits: [] });
  isEvaluating = signal(false);

  handFull = computed(() => this.hand().length === 5);
  handCount = computed(() => this.hand().length);

  constructor(private pokerService: PokerService) {}

  ngOnInit() {
    this.pokerService.getCards().subscribe({
      next: (options) => this.cardOptions.set(options),
      error: (err) => this.pickerError.set(err),
    });
  }

  switchMode(newMode: 'pick' | 'random') {
    this.mode.set(newMode);
    this.hand.set([]);
    this.result.set('');
    this.pickerError.set('');
    this.resultError.set('');
  }

  addCard(card: Card) {
    if (this.handFull()) return;
    const duplicate = this.hand().some(
      (c) => c.rank === card.rank && c.suit === card.suit,
    );
    if (duplicate) {
      this.pickerError.set(
        `${card.rank} of ${card.suit} is already in your hand.`,
      );
      return;
    }
    this.hand.update((h) => [...h, card]);
    this.pickerError.set('');
    this.result.set('');
    this.resultError.set('');
  }

  removeCard(index: number) {
    this.hand.update((h) => h.filter((_, i) => i !== index));
    this.result.set('');
    this.resultError.set('');
  }

  dealHand() {
    this.pokerService.dealHand().subscribe({
      next: (cards) => {
        this.hand.set(cards);
        this.pickerError.set('');
        this.result.set('');
        this.resultError.set('');
      },
      error: (err) => this.pickerError.set(err),
    });
  }

  evaluateHand() {
    if (!this.handFull()) return;
    this.isEvaluating.set(true);
    this.pokerService.evaluateHand(this.hand()).subscribe({
      next: (result) => {
        this.result.set(result);
        this.resultError.set('');
        this.isEvaluating.set(false);
      },
      error: (err) => {
        this.resultError.set(err);
        this.isEvaluating.set(false);
      },
    });
  }
}
