import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar/navbar';
import { Footer } from './core/footer/footer';
// import { LayoutComponent } from './core/layout/layout'; // NÃO PRECISA!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],  
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}