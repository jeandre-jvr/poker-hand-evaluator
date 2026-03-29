import { Component, input } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-result-display',
  imports: [Message],
  templateUrl: './result-display.html',
  styleUrl: './result-display.css',
})
export class ResultDisplay {
  result = input<string>('');
  error = input<string>('');
}
