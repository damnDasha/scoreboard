import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};
// Decorator that marks a class as available to be provided and injected as a dependency.
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://angular-first-server.herokuapp.com/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
//almost identical to servies in react

// // Observables are kind of like promises, but better because:
// // they are declarative; computation does not start until subscription.
// Promises execute immediately on creation.
// This makes observables useful for defining recipes that can be run whenever you need the result.

// // Observables provide many values.
// Promises provide one.
// This makes observables useful for getting multiple values over time.

// // Observables differentiate between chaining and subscription.
// Promises only have .then() clauses.
// This makes observables useful for creating complex transformation recipes to be used by other part of the system,
// without causing the work to be executed.

// // Observables subscribe() is responsible for handling errors.
// Promises push errors to the child promises.
// This makes observables useful for centralized and predictable error handling.
