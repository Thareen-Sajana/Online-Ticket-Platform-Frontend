import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketDitailsPageComponent } from './buy-ticket-ditails-page.component';

describe('BuyTicketDitailsPageComponent', () => {
  let component: BuyTicketDitailsPageComponent;
  let fixture: ComponentFixture<BuyTicketDitailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyTicketDitailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyTicketDitailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
