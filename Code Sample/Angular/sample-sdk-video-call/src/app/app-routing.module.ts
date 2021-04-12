import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCallComponent } from './video-call/video-call.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'call',
        component: VideoCallComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
