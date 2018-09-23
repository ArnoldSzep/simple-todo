import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContenteditableModule } from 'ng-contenteditable';
import { DebugElement } from '@angular/core';

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
    let prevId = component.lastId;
    let todoDataCount = component.todoData.length;
    component.addNewTodo();

    expect(component.lastId).toBe(prevId + 1);
    expect(component.todoData.length).toBe(todoDataCount + 1);
  });


  /*
    it(`should have as title 'todo'`, async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('todo');
    }));
    it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to todo!');
    }));
    */
});
