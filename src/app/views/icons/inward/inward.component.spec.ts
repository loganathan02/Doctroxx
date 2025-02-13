import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardComponent } from './inward.component';

describe('InwardComponent', () => {
  let component: InwardComponent;
  let fixture: ComponentFixture<InwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InwardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
