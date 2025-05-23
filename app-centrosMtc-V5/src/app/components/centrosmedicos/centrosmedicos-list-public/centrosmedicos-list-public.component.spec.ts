import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosmedicosListPublicComponent } from './centrosmedicos-list-public.component';

describe('CentrosmedicosListPublicComponent', () => {
  let component: CentrosmedicosListPublicComponent;
  let fixture: ComponentFixture<CentrosmedicosListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentrosmedicosListPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrosmedicosListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
