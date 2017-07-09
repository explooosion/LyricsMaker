export class ConvertTime {

    private min: string = '00';
    private sec: string = '00';
    private ns: string = '00';

    public custom(time) {
        this.setNs(time);
        this.setSec(time);
        this.setMin(time);
        this.addZero(this.min);
        return `${this.min}:${this.sec}.${this.ns}`;
    }

    private setNs(time: number) {
        this.ns = this.addZero(time.toFixed(2).split('.')[1]);
    }

    private setSec(time: number) {
        this.sec = this.addZero(String(Math.floor(time) % 60));
    }

    private setMin(time: number) {
        this.min = this.addZero(String(Math.floor(Number(time.toFixed(0)) / 60)));
    }

    private addZero(time: String) {
        return String(time.length > 1 ? time : '0' + time);
    }
}
