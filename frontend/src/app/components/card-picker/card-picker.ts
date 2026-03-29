import { Component, input, output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Card, CardOptions } from '../../services/poker.service';

@Component({
  selector: 'app-card-picker',
  imports: [FormsModule, Select, SelectButton, Button, Message],
  templateUrl: './card-picker.html',
  styleUrl: './card-picker.css',
})
export class CardPicker {
  cardOptions = input.required<CardOptions>();
  mode = input.required<'pick' | 'random'>();
  handFull = input.required<boolean>();
  error = input<string>('');

  modeChange = output<'pick' | 'random'>();
  addCard = output<Card>();
  dealHand = output<void>();

  selectedRank = signal<string>('');
  selectedSuit = signal<string>('');

  modeOptions = [
    { label: 'Pick Cards', value: 'pick' },
    { label: 'Random Hand', value: 'random' },
  ];

  canAdd = computed(() => {
    return !!this.selectedRank() && !!this.selectedSuit() && !this.handFull();
  });

  onModeChange(value: 'pick' | 'random') {
    this.modeChange.emit(value);
    this.selectedRank.set('');
    this.selectedSuit.set('');
  }

  onAddCard() {
    if (!this.canAdd()) return;
    this.addCard.emit({ rank: this.selectedRank(), suit: this.selectedSuit() });
    this.selectedRank.set('');
    this.selectedSuit.set('');
  }

  onDeal() {
    this.dealHand.emit();
  }
}
