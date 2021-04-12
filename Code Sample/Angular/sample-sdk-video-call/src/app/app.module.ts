import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { VideoCallComponent } from './video-call/video-call.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, VideoCallComponent, MainComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireMessagingModule,
        FormsModule,
    ],
    providers: [AngularFireMessaging],
    bootstrap: [AppComponent],
})
export class AppModule {}
