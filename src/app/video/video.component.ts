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

  txtBefore: string = ""; // TextArea Before
  txtAfter: string = "";  // TextArea After

  markStart: number = 0;  // 起始標記位址
  markEnd: number = 0;    // 結尾標記位址
  markNow: number = 0;    // 當前標記位置
  markScroll: number = 0; // 當前標記卷軸位置

  constructor(private example: Example) {
    this.txtBefore = example.demo;
    //this.txtAfter = example.demo_res;
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

    // this.player.playVideo();
  }

  markLyrics(areaBefore, areaAfter) {

    var value = areaBefore.value;

    if (this.markEnd < 0) {
      return alert('Read TO End');
    }
    else if (this.markEnd == 0) {
      this.markStart = 0;
    } else {
      this.markStart = this.markNow;
    }

    this.markEnd = value.indexOf('\n', this.markNow);

    areaBefore.focus();

    this.markScroll = this.markScroll + 30;
    areaBefore.scrollTop = this.markScroll;

    areaBefore.setSelectionRange(this.markStart, this.markEnd);

    this.markNow = this.markEnd + 1;

    console.log(`${this.markStart} - ${this.markEnd}`);
    console.log(value.slice(this.markStart, this.markEnd));
    this.txtAfter = this.txtAfter + value.slice(this.markStart, this.markEnd) + '\n';
    areaAfter.focus();
  }
}
