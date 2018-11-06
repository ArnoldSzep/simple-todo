import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo';
  todoData = [
    {
      id: 0,
      name: 'You probably haven\'t heard of them trust fund',
      priority: 1,
      completed: false,
      hidden: false,
    },
    {
      id: 1,
      name: 'Occupy jianbing swag tbh hashtag',
      priority: 3,
      completed: true,
      hidden: false,
    },
    {
      id: 2,
      name: 'Whatever locavore chartreuse ethical williamsburg',
      priority: 1,
      completed: false,
      hidden: false,
    },
    {
      id: 3,
      name: 'Selfies glossier marfa, pitchfork twee dreamcatcher four dollar toast',
      priority: 2,
      completed: true,
      hidden: false,
    }
  ];
  lastId = 3;
  incomplete = 0;
  filter = ['All', 'Current', 'Completed'];
  currFilter = 0;
  order = ['Default', 'Priority [DOWN]', 'Priority [UP]'];
  currOrder = 0;
  itemElems;

  ngOnInit() {
    this.countIncomplete();
    this.itemElems = document.getElementsByClassName('todo-item');
  }

  // Count the incomplete elements
  countIncomplete() {
    this.incomplete = 0;

    for (let i = 0; i < this.todoData.length; i++) {
      if (!this.todoData[i].completed) {
        this.incomplete++;
      }
    }
  }

  // Set the keyvalue pipe's key to number, otherwise the key is a string??
  compareFn = (a:number, b:number) => {};

  // Add new todo
  addNewTodo() {
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
  closePrioritySelect() {
    for (let i = 0; i < this.itemElems.length; i++) {
      this.itemElems[i].getElementsByClassName('todo-priority_options')[0].classList.remove('active');
    }
  }

  // Open current priority select menu
  prioritySelect(ev) {
    this.closePrioritySelect();
    ev.target.nextElementSibling.classList.add('active');
  }

  // Delete by key
  delete(key) {
    this.todoData.splice(key, 1);
  }

  // Filter list by "completed"
  filterList() {
    for (let i = 0; i < this.todoData.length; i++) {
      this.todoData[i].hidden = false;

      if (this.currFilter == 0) {
        if (this.todoData[i].completed) {
          this.todoData[i].hidden = true;
        }
      }

      if (this.currFilter == 1) {
        if (!this.todoData[i].completed) {
          this.todoData[i].hidden = true;
        }
      }
    }

    if (this.currFilter < 2) {
      this.currFilter++;
    } else {
      this.currFilter = 0;
    }
  }

  // Order list by priority
  orderList() {
    let sortBy = [
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

    this.todoData = this.todoData.sort(sortBy[this.currOrder]);

    if (this.currOrder < 2) {
      this.currOrder++;
    } else {
      this.currOrder = 0;
    }
  }
}
