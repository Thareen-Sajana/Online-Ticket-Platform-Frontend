import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketHistoryPageComponent } from './ticket-history-page.component';

describe('TicketHistoryPageComponent', () => {
  let component: TicketHistoryPageComponent;
  let fixture: ComponentFixture<TicketHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
