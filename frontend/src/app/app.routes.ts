import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { HandEvaluator } from './pages/hand-evaluator/hand-evaluator';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [{ path: '', component: HandEvaluator }],
  },
];
