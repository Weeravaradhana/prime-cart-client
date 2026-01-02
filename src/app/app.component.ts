import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FaConfig, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from './shared/font-awesome-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'prime-cart-client';
  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig) ;

  constructor() {

  }

  ngOnInit(): void {
        this.initFontAwesome();
    }

  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far';
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
