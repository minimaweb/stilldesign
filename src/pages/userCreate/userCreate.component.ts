import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './userCreate.component.html',
  styleUrls: ['./userCreate.component.scss'],
})
export class UserCreateComponent {
  public user = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    'introduction': [],
    'position': [],
    'active': 1,
    'avatar': '',
    'companies': {
      'data': [],
    },
  };

  constructor(private apiService: ApiService, private router: Router) {
  }

  public onCreate(event) {
    event.preventDefault();

    this.apiService.createUser(this.user).then(success => {
      if (success) {
        this.router.navigate(['/users']);
      } else {
        alert('Could not create user.');
      }
    });
  }
}
