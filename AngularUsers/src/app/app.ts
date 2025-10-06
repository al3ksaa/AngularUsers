import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {User, UserService} from './user.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
})
export class AppComponent {
    newName = '';
    newEmail = '';
    newAge: number | null = null;
    newStatus: 'online' | 'offline' = 'offline';

    constructor(public userService: UserService) {
    }

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

    // ovde je castovan status: 'online' | 'offline'
    protected updateUserStatus(user: User, status: 'online' | 'offline'): void {
        this.userService.updateUser(user.id, {status})
        // isto sto i
        // this.userService.updateUser(user.id, { status: status })
    }
}
