import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FloorComponent } from './floor/floor.component';
import { KwhMeterComponent } from './kwh-meter/kwh-meter.component';
import { ApplianceComponent } from './appliance/appliance.component';
import { AppRoutingModule } from './app-routing.module';
import { KwhMeterEditComponent } from './kwh-meter-edit/kwh-meter-edit.component';
import { FloorsEditComponent } from './floors-edit/floors-edit.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { HighlightDirective } from './highlight.directive';
import { ToggleInputDirective } from './toggle-input.directive';
import { ApplianceEditComponent } from './appliance-edit/appliance-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FloorComponent,
    KwhMeterComponent,
    ApplianceComponent,
    KwhMeterEditComponent,
    FloorsEditComponent,
    NameEditorComponent,
    HighlightDirective,
    ToggleInputDirective,
    ApplianceEditComponent
  ],
    imports: [
        
        ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'FloorsEdit', component: FloorsEditComponent },
        { path: 'KwhMeterEdit', component: KwhMeterEditComponent },
        { path: 'AppliancesEdit', component:ApplianceEditComponent },
        { path: 'NameEditor', component: NameEditorComponent },
    ]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
