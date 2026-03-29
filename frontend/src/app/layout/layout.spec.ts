import { TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { provideRouter } from '@angular/router';

describe('Layout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the layout', () => {
    const fixture = TestBed.createComponent(Layout);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the header', async () => {
    const fixture = TestBed.createComponent(Layout);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Poker Hand Evaluator',
    );
  });
});
