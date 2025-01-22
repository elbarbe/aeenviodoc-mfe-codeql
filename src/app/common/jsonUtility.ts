/**
 * Utility class to manage Json formats
 */
export class JsonUtility {

    /**
     * Returns the Json format for a date value
     * @param date Date value to be converted
     */
    public static date2Json(date: Date | null): string {
        let dateJson = '';
        if (date) {
            date.setMilliseconds(0);
            dateJson = date.getFullYear().toString() + '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
            date.getDate().toString().padStart(2, '0');
        }
        return dateJson;
    }


    /**
     * Returns the Json format for a datetime value
     * @param date Datetime value to be converted
     */
    public static dateTime2Json(date: Date | null): string {
        let dateJson = '';
        if (date) {
            date.setMilliseconds(0);
            dateJson = date.getFullYear().toString() + '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
            date.getDate().toString().padStart(2, '0') + 'T' +
            date.getHours().toString().padStart(2, '0') + ':' +
            date.getMinutes().toString().padStart(2, '0') + ':' +
            date.getSeconds().toString().padStart(2, '0');
        }
        return dateJson;
    }

    /**
     * Returns the Json format for a time value
     * @param date Date value to be converted
     */
    public static time2Json(date: Date | null): string {
        let timeJson = '';
        if (date) {
            date.setMilliseconds(0);
            timeJson = '1970-01-01T' +
            date.getHours().toString().padStart(2, '0') + ':' +
            date.getMinutes().toString().padStart(2, '0') + ':' +
            date.getSeconds().toString().padStart(2, '0');
        }
        return timeJson;

    }
}

