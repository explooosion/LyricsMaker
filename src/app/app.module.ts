import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { MenuComponent } from './menu/menu.component';

// Module
import { YoutubePlayerModule } from 'ng2-youtube-player';

// Pipe
import { SplitYoutubePipe } from './commons/pipe/split-youtube.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    SplitYoutubePipe,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    YoutubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
