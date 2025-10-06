import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newName = '';
  newEmail = '';
  newAge: number | null = null;
  newStatus: 'online' | 'offline' = 'offline';

  constructor(public userService: UserService) {}

  addUser() {
    if (!this.newName || !this.newEmail || this.newAge === null) return;
    this.userService.addUser({
      name: this.newName,
      email: this.newEmail,
      age: this.newAge,
      status: this.newStatus,
    });
    this.newName = '';
    this.newEmail = '';
    this.newAge = null;
    this.newStatus = 'offline';
  }

  setAllOnline() {
    this.userService.setAllStatus('online');
  }

  setAllOffline() {
    this.userService.setAllStatus('offline');
  }
}
