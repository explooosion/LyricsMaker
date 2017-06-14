import { Component, OnInit, Input } from '@angular/core';

import { Example } from '../commons/lyrics/example';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [Example]
})
export class VideoComponent implements OnInit {

  hidden: boolean = true;
  ytEvent: any;
  player: YT.Player;
  id: string = 'https://www.youtube.com/watch?v=qIF8xvSA0Gw';
  //id: string = 'https://www.youtube.com/watch?v=Z09BFrcSewE';
  title: string;
  state: Number = 0;
  ctime: Number = 0;
  quality: string;
  ex: string = "";
  ex_res: string = "";
  constructor(private example: Example) {
    this.ex = example.demo;
    //this.ex_res = example.demo_res;
  }

  private showCurrentTime() {
    setInterval(() => {
      this.ctime = this.player.getCurrentTime();
      this.quality = this.player.getPlaybackQuality();
    }, 1)
  }

  ngOnInit() {

  }

  onStateChange(event) {
    this.ytEvent = event.target;
    this.state = event.data;

    if (this.state == 1) {
      this.hidden = false;
      this.title = this.ytEvent.getVideoData().title;
      this.showCurrentTime();    //ytp-title-link
    }
  }

  changeSource() {
    this.player.loadVideoById(this.id.split('?v=')[1]);
  }

  savePlayer(player) {
    this.player = player;

    var iframe = this.player.getIframe();
    iframe.width = "100%";
    iframe.height = "100%";

    this.player.playVideo();
  }

  entry() {
    // var arr = this.ex.split('\n');
    // this.ex_res = this.ex_res + arr[0] + '\n';
 
  }
}
