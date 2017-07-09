import { Component, OnInit, Input } from '@angular/core';

import { Example } from '../commons/lyrics/example';
import { ConvertTime } from '../commons/class/convert-time';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [Example, ConvertTime]
})
export class VideoComponent implements OnInit {

  id: string = 'https://www.youtube.com/watch?v=qIF8xvSA0Gw';
  player: YT.Player;
  playerHidden: boolean = true;   // loading時隱藏
  ytEvent: any;                   // 擷取到的狀態資訊
  title: string = "";             // 標題
  state: Number = 0;              // 讀取狀態
  ctime: Number = 0;              // 當前秒數
  quality: string = "";           // 品質

  txtBefore: Array<any> = [];     // [前] 歌詞內容
  txtAfter: Array<any> = [];      // [後] 歌詞內容

  constructor(private example: Example, private ct: ConvertTime) {
    this.txtBefore = example.demo.split('\n');
  }

  ngOnInit() { }

  // Youtube Player - 讀取就緒
  savePlayer(player) {
    this.player = player;
    var iframe = this.player.getIframe();
    iframe.width = "100%";
    iframe.height = "100%";
    this.player.playVideo();
  }

  // Youtube Player - 狀態改變
  onStateChange(event) {
    this.ytEvent = event.target;
    this.state = event.data;

    if (this.state == 1) {
      this.playerHidden = false;
      this.title = this.ytEvent.getVideoData().title;
      this.showCurrentTime();    //ytp-title-link
    }
  }

  // Youtube Player - 更換路徑
  changeSource() {
    this.player.loadVideoById(this.id.split('?v=')[1]);
  }

  // Timer - 當前播放進度
  showCurrentTime() {
    setInterval(() => {
      this.ctime = this.player.getCurrentTime();
      this.quality = this.player.getPlaybackQuality();
    }, 1)
  }

  // 加入動態歌詞
  appendLyrics(b, a) {

    if (b.selectedIndex < 0) {
      b.selectedIndex = 0;
    }

    // 塞入新歌詞 - [時間][歌詞]
    this.txtAfter.push(`[${this.ct.custom(this.ctime)}] ${b.value}`);

    // 選取下一行
    b.selectedIndex = b.selectedIndex + 1;

    // 選取提示上一個捕捉到的歌詞 (故意延遲)
    setTimeout(() => {
      a.selectedIndex = a.length <= 0 ? 0 : a.length - 1;
    }, 1);

  }

  // 按鈕群組
  controlPause() {
    this.player.pauseVideo();

  }

  controlPlay() {
    this.player.playVideo();
  }

  controlStop() {
    this.player.stopVideo();
  }
}
