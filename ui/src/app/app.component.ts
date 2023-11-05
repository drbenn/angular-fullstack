import { Component } from '@angular/core';
import { ThemeService } from 'src/shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-fullstack';

  constructor(private themeService: ThemeService) {}

  changeTheme(theme: string): void {
    this.themeService.switchTheme(theme);
  }
}
