export class common {

    constructor() {}

    public transformDate(date: string): string | undefined {
        if (!date) {
            return undefined;
        }

        if (date === '0') {
            return date;
        }
    
        if (date.length > 7) {
            return date.substring(0, 2) + '/' + date.substring(2, 4) + '/' + date.substring(4, 8);
        }

        let year = date.substring(3, 5)

        if (year.length == 2) {
            year = "20" + year
        }
    
        return '0'+date.substring(0, 1) + '/' + date.substring(1, 3) + '/' + year;
    }
}