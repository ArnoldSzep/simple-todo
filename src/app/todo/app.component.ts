import { Component, OnInit } from '@angular/core';
import { TodoItem } from './interface/todo.interface';
import { TodoService } from './service/todo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public todoData: Array<TodoItem>;
  public incomplete: number = 0;
  public filter = ['All', 'Current', 'Completed'];
  public currentFilter: number = 0;
  public order = ['Default', 'Priority [DOWN]', 'Priority [UP]'];
  public currentOrder: number = 0;
  public lastId: number = 3;
  public itemElements: HTMLCollectionOf<Element>;

  constructor(private todoService: TodoService) { }

  public ngOnInit() {
    this.todoService.getTodoData().subscribe((todoData) => {
      this.todoData = todoData;
      this.countIncomplete();
      this.itemElements = document.getElementsByClassName('todo-item');
    });
  }

  // Count the incomplete elements
  public countIncomplete() {
    this.incomplete = 0;

    for (let i = 0; i < this.todoData.length; i++) {
      if (!this.todoData[i].completed) {
        this.incomplete++;
      }
    }
  }

  // Add new todo
  public addNewTodo() {
    this.todoData.push({
      id: this.lastId + 1,
      name: '',
      priority: 3,
      completed: false,
      hidden: false
    });

    this.lastId++;
    this.countIncomplete();
  }

  // Hide all priority select menu
  public closePrioritySelect() {
    for (let i = 0; i < this.itemElements.length; i++) {
      this.itemElements[i].getElementsByClassName('todo-priority_options')[0].classList.remove('active');
    }
  }

  // Open current priority select menu
  public prioritySelect(event) {
    this.closePrioritySelect();
    event.target.nextElementSibling.classList.add('active');
  }

  // Delete by key
  public delete(key: number) {
    this.todoData.splice(key, 1);
  }

  // Filter list by "completed"
  public filterList() {
    for (let i = 0; i < this.todoData.length; i++) {
      this.todoData[i].hidden = false;

      if (this.currentFilter === 0) {
        if (this.todoData[i].completed) {
          this.todoData[i].hidden = true;
        }
      }

      if (this.currentFilter === 1) {
        if (!this.todoData[i].completed) {
          this.todoData[i].hidden = true;
        }
      }
    }

    if (this.currentFilter < 2) {
      this.currentFilter++;
    } else {
      this.currentFilter = 0;
    }
  }

  // Order list by priority
  public orderList() {
    const sortBy = [
      function priorityDown(a, b) {
        return a.priority - b.priority;
      },
      function priorityUp(a, b) {
        return b.priority - a.priority;
      },
      function defaultOrder(a, b) {
        return a.id - b.id;
      }
    ];

    this.todoData = this.todoData.sort(sortBy[this.currentOrder]);

    if (this.currentOrder < 2) {
      this.currentOrder++;
    } else {
      this.currentOrder = 0;
    }
  }
}
