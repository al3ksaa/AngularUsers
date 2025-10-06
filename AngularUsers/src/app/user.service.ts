import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'online' | 'offline';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private _users = signal<User[]>([]);
  users = this._users.asReadonly();

  private nextId = 1;

  addUser(user: Omit<User, 'id'>) {
    this._users.update(users => [...users, { ...user, id: this.nextId++ }]);
  }

  removeUser(id: number) {
    this._users.update(users => users.filter(u => u.id !== id));
  }

  updateUser(id: number, changes: Partial<User>) {
    this._users.update(users =>
      users.map(u => (u.id === id ? { ...u, ...changes } : u))
    );
  }

  setAllStatus(status: 'online' | 'offline') {
    this._users.update(users => users.map(u => ({ ...u, status })));
  }

  clearAll() {
    this._users.set([]);
  }
}
