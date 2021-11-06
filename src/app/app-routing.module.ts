import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from './start/start.component';
import {EditClientComponent} from './edit-client/edit-client.component';


const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'edit', component: EditClientComponent},
  {path: `edit/:id`, component: EditClientComponent},
  {path: `prev/:id`, component: EditClientComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
