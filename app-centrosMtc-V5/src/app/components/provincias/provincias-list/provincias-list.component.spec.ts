import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciasListComponent } from './provincias-list.component';

describe('ProvinciasListComponent', () => {
  let component: ProvinciasListComponent;
  let fixture: ComponentFixture<ProvinciasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinciasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinciasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
