import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './userEdit.component.html',
  styleUrls: ['./userEdit.component.scss'],
})
export class UserEditComponent {
  public user = null;

  constructor(private router: Router, route: ActivatedRoute, private apiService: ApiService) {
    route.params.subscribe(params => {
      this.loadUser(params.id);
    });
  }

  private loadUser(id) {
    this.apiService.getUser(id).then(user => {
      this.user = user;
    });
  }

  public onEdit() {
    this.apiService.editUser(this.user).then(success => {
      if (success) {
        this.router.navigate(['/users']);
      } else {
        alert('Could not edit user.');
      }
    });
  }
}
