import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSettings } from './appSettings';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  entryComponents: [HomeComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes, { enableTracing: false }
    )
  ],
  providers: [
    HomeComponent,
    AppSettings,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
