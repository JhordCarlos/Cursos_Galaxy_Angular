import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosmedicosAddComponent } from './centrosmedicos-add.component';

describe('CentrosmedicosAddComponent', () => {
  let component: CentrosmedicosAddComponent;
  let fixture: ComponentFixture<CentrosmedicosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentrosmedicosAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrosmedicosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
