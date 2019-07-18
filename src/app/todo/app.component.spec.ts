import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContenteditableModule } from 'ng-contenteditable';
import { AppComponent } from './app.component';

describe('Todo', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ContenteditableModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have at least 0 incomplete task', () => {
    expect(component.incomplete).toBeGreaterThanOrEqual(0);
  });

  it('should add new task', () => {
    const prevId = component.lastId;
    const todoDataCount = component.todoData.length;
    component.addNewTodo();

    expect(component.lastId).toBe(prevId + 1);
    expect(component.todoData.length).toBe(todoDataCount + 1);
  });
});
