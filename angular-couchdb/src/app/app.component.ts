import { Component } from '@angular/core';
import { RouterOutlet ,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormGroup} from '@angular/forms'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test12';
}
