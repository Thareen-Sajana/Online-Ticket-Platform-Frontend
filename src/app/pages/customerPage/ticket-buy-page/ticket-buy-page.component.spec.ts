import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBuyPageComponent } from './ticket-buy-page.component';

describe('TicketBuyPageComponent', () => {
  let component: TicketBuyPageComponent;
  let fixture: ComponentFixture<TicketBuyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketBuyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketBuyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
