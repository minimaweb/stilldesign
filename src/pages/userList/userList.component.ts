import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss'],
})
export class UserListComponent {
  constructor(private router: Router, private apiService: ApiService) {
    this.apiService.getUsers().then(users => {
      this.users = users;
    });
  }

  public users = [];

  public onCreate() {
    this.router.navigate(['/users/create']);
  }

  public onEdit(id) {
    this.router.navigate(['/users/' + id]);
  }

  public onDelete(id) {
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }

    this.apiService.deleteUser(id).then(success => {
      if (success) {
        this.users = this.users.filter(u => u.id !== id);
      } else {
        alert('Could not delete user.');
      }
    });
  }
}
