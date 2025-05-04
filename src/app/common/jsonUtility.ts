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

    /**
     * Returns the date from string Json
     * @param date String value to be converted
     */
    public static jsonToDate(date: string | null): Date | null {
        let dateType: Date | null = null;
        if (date) {
            try {
                dateType = new Date( +date.substring(0,4),
                +date.substring(5,7) - 1,
                +date.substring(8,10),0,0,0,0);

                if (isNaN(dateType.valueOf())) {
                    dateType = null;
                }
            } catch (e) {
                dateType = null;
            }
        }
        return dateType;
    }

    /**
     * Returns the datetime from string Json
     * @param date String value to be converted
     */
    public static jsonToDateTime(date: string | null): Date | null {
        let dateType: Date | null = null;
        if (date) {
            try {
                dateType = new Date( +date.substring(0,4),
                +date.substring(5,7) - 1,
                +date.substring(8,10),
                +date.substring(11,13),
                +date.substring(14,16),
                +date.substring(17,19),
                0);

                if (isNaN(dateType.valueOf())) {
                    dateType = null;
                }
            } catch (e) {
                dateType = null;
            }
        }
        return dateType;

    }

    /**
     * Returns the time from string Json
     * @param date String value to be converted
     */
    public static jsonToTime(date: string | null): Date | null {
        let dateType: Date | null = null;
        if (date) {
            try {
                dateType = new Date( 1970, 0, 1,
                +date.substring(11,13),
                +date.substring(14,16),
                +date.substring(17,19),
                0);

                if (isNaN(dateType.valueOf())) {
                    dateType = null;
                }
            } catch (e) {
                dateType = null;
            }
        }
        return dateType;

    }
}

