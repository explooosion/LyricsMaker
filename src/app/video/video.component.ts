import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {

  public hidden: boolean = true;
  state: Number;
  ctime: Number = 0;
  player: YT.Player;
  id: string = 'https://www.youtube.com/watch?v=qIF8xvSA0Gw';
  ytEvent: any;
  iframe: any;

  constructor() {

  }

  private showCurrentTime() {
    setInterval(() => {
      this.ctime = this.player.getCurrentTime();
    }, 1)
  }

  ngOnInit() {

  }

  onStateChange(event) {

    let iframe = document.querySelector("iframe");
    iframe.width = "100%";
    iframe.height = "100%";

    this.ytEvent = event.target;
    this.state = event.data;
    if (this.state == 1) {
      this.hidden = false;
      this.showCurrentTime();
    }
  }

  changeSource() {
    var id = this.id.split('?v=')[1];
    let iframe = document.querySelector("iframe");
    iframe.src = `https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A4200&widgetid=1`;
    iframe.onload = () => {
      this.playVideo();
    };
  }

  savePlayer(player) {
    this.player = player;
    console.log(player);

    this.playVideo();
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

}
