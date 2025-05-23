import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosmedicosListComponent } from './centrosmedicos-list.component';

describe('CentrosmedicosListComponent', () => {
  let component: CentrosmedicosListComponent;
  let fixture: ComponentFixture<CentrosmedicosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentrosmedicosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrosmedicosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
