import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterreclamationComponent } from './ajouterreclamation.component';

describe('AjouterreclamationComponent', () => {
  let component: AjouterreclamationComponent; // Corrected component reference
  let fixture: ComponentFixture<AjouterreclamationComponent>; // Corrected component reference

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterreclamationComponent ] // Corrected component reference
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
