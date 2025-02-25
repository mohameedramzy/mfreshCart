import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailasComponent } from './detailas.component';

describe('DetailasComponent', () => {
  let component: DetailasComponent;
  let fixture: ComponentFixture<DetailasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
