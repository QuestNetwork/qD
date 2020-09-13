import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadHexComponent } from './load-hex.component';

describe('LoadHexComponent', () => {
  let component: LoadHexComponent;
  let fixture: ComponentFixture<LoadHexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadHexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
