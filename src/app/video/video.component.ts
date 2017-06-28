import { Component, OnInit, Input } from '@angular/core';

import { FormatTime } from '../commons/class/format-time';
import { Example } from '../commons/lyrics/example';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [Example]
})
export class VideoComponent implements OnInit {

  format: FormatTime;

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

  markStart: number = 0;          // 起始標記位址
  markEnd: number = 0;            // 結尾標記位址
  markNow: number = 0;            // 當前標記位置
  markScroll: number = 0;         // 當前標記卷軸位置

  constructor(private example: Example) {
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

    //var a = this.format.getTimeStyle();
    //console.log(a);
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
    this.txtAfter.push(`[${Number(this.ctime).toFixed(2)}] ${b.value}`);

    // 選取下一行
    b.selectedIndex = b.selectedIndex + 1;

    // 選取提示上一個捕捉到的歌詞 (故意延遲)
    setTimeout(() => {
      a.selectedIndex = a.length <= 0 ? 0 : a.length - 1;
    }, 1);
  }

}
