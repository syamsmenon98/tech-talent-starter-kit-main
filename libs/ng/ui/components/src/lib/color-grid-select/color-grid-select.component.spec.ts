import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorGridSelectComponent } from './color-grid-select.component';

describe('ColorGridSelectComponent', () => {
  let component: ColorGridSelectComponent;
  let fixture: ComponentFixture<ColorGridSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorGridSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update grid row width based on componentWidth', () => {
    component.componentWidth = 500;
    component.updateGridRowWidth();
    expect(component['_itemSize'].set).toHaveBeenCalledWith('small');
    expect(component['_itemsPerRow'].set).toHaveBeenCalledWith(15); 
    expect(component['_itemsPerColumn'].set).toHaveBeenCalledWith(2); 

    component.componentWidth = 800;
    component.updateGridRowWidth();
    expect(component['_itemSize'].set).toHaveBeenCalledWith('medium');
    expect(component['_itemsPerRow'].set).toHaveBeenCalledWith(12); 
    expect(component['_itemsPerColumn'].set).toHaveBeenCalledWith(2); 

    component.componentWidth = 1200;
    component.updateGridRowWidth();
    expect(component['_itemSize'].set).toHaveBeenCalledWith('large');
    expect(component['_itemsPerRow'].set).toHaveBeenCalledWith(15); 
    expect(component['_itemsPerColumn'].set).toHaveBeenCalledWith(2); 
  });
});
