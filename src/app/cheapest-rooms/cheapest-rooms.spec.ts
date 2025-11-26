import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheapestRoomsComponent } from './cheapest-rooms';

describe('CheapestRoomsComponent', () => {
  let component: CheapestRoomsComponent;
  let fixture: ComponentFixture<CheapestRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheapestRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheapestRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
