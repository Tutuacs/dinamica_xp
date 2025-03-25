export class common {

    constructor() {}

    public transformDate(date: string): string | undefined {
        if (!date) {
            return undefined;
        }
    
        if (date.length > 7) {
            return date.substring(0, 2) + '/' + date.substring(2, 4) + '/' + date.substring(4, 8);
        }
    
        return date.substring(0, 1) + '/' + date.substring(1, 3) + '/' + date.substring(3, 5);
    }
}