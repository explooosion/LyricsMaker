export class ConvertTime {

    private min: String = '00';
    private sec: String = '00';
    private ns: String = '0';

    custom(time) {
        this.setNs(time);
        this.setSec(time);
        this.setMin(time);
        return `${this.min}:${this.sec}.${this.ns}`;
    }

    private setNs(time) {
        this.ns = String(Number(time).toFixed(2)).split('.')[1];
    }

    private setSec(time) {
        this.sec = String(Number(Number(time).toFixed(0)) % 60);
    }

    private setMin(time) {
        this.min = String(Math.round(Number(Number(time).toFixed(0)) / 60));
    }

    private addZero(time) {
        //return String(time).length > 1 ? '0' + time : time;
    }
}
