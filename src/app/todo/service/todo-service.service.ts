import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  public getTodoData() {
    return [
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
  }
}
