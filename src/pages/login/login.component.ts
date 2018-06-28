import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService) {
  }

  public email = '';
  public password = '';

  public onLogin(event) {
    event.preventDefault();

    this.apiService.login(this.email, this.password).then(success => {
      if (success) {
        this.router.navigate(['/users']);
      } else {
        alert('Invalid credentials.');
      }
    });
  }
}
