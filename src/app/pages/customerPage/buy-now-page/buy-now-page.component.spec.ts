import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowPageComponent } from './buy-now-page.component';

describe('BuyNowPageComponent', () => {
  let component: BuyNowPageComponent;
  let fixture: ComponentFixture<BuyNowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyNowPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyNowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
