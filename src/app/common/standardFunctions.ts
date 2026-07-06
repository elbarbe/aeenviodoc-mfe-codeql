import { formatDate } from '@angular/common';
import { LanguageMng } from './languageMng';
import { Injectable } from '@angular/core';

/**
 * « Common functions »
 */
@Injectable({providedIn: 'root'})
export class StandardFunctions {

    /**
     * Constructor
     * @param langMng Language manager
     */
    constructor(private langMng: LanguageMng) {
    }

    /**
     * Return de system date
     */
    public systemDate(): Date {
        const date = new Date();
        return new Date(date.toDateString());
    }

    /**
     * Return true if the year is  leap or not
     * @param year Year
     */
    public isLeapYear(year: number): boolean {
        return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
    }

    /**
     * Return the days of difference between date1 and date2.
     * @param date1 date1
     * @param date2 date2
     */
    public daysDifferenceFromDate(date1: Date | null, date2: Date | null): number {
        if (date1 == null || date2 == null) {
            return 0;
        }

        if (date1 > date2) {
            return 0;
        }

        let year = date1.getFullYear() - 1;
        // amount of leapYear;
        let ly = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
        const day1 = year * 365 + 1 * ly + this.getDayOfYear(date1);
        year = date2.getFullYear() - 1;
        // amount of leapYear;
        ly = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
        const day2 = year * 365 + 1 * ly + this.getDayOfYear(date2);

        return day2 - day1;
    }

    /**
     * Return the number of days in a specified month of the specified year.
     * For example, if month equals 2 for February, the return value is 28 or 29
     * depending upon whether year is a leap year.
     * @param year year
     * @param month month
     */
    public daysinMonth(year: number, month: number): number {
        const date1 = new Date();
        date1.setFullYear(year, month - 1, 1);
        const date2 = this.dateAdd('m', 1, date1);
        return this.daysDifferenceFromDate(date1, date2);
    }

    /**
     * Return the day in adate.
     * @param adate date
     */
    public getDay(adate: Date | null): number {
        if (adate) {
            return adate.getDate();
        }
        return 0;
    }

    /**
     * Return the month in adate. (1 through 12).
     * @param adate date
     */
    public getMonth(adate: Date | null): number {
        if (adate) {
            return adate.getMonth() + 1;
        }
        return 0;
    }

    /**
     * Return the year in adate.
     * @param adate date
     */
    public getYear(adate: Date | null): number {
        if (adate) {
            return adate.getFullYear();
        }
        return 0;
    }

    /**
     * Return the day of week contained in adate.
     * The possible values are 1 through 7.
     * @param adate date
     */
    public getDayOfweek(adate: Date | null): number {
        if (adate) {
            return adate.getDay() + 1;
        }
        return 0;
    }

    /**
     * Return the day of year contained in adate.
     * The possible values are either 1 through 365
     * (if the year is not leap) or 1 through 366.
     * @param adate date
     */
    public getDayOfYear(adate: Date): number {
        if (!adate) {
            return 0;
        }
        const daysByMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let numberOfDays = adate.getDate();
        numberOfDays += daysByMonth[adate.getMonth()];
        if (this.isLeapYear(adate.getFullYear())) {
            numberOfDays += 1;
        }
        return numberOfDays;
    }

    /**
     * Return a date corresponding to the next day of the argument aDate.
     * @param adate date
     */
    public tomorrow(adate: Date | null): Date | null {
        return this.dateAdd('d', 1, adate);
    }

    /**
     * Return a date corresponding to the earlier day of the argument aDate.
     * @param adate date
     */
    public yesterday(adate: Date): Date | null {
        return this.dateAdd('d', -1, adate);
    }

    /**
     * Returns a date to which a specified time interval has been added.
     * @param interval interval : The interval of time you want to add.
     *  - yyyy Year
     *  - m Month
     *  - d Day
     * @param theNumber The number of interval you want to add.
     * @param adate  The date to which a specified time interval has been added.
     */
    public dateAdd(interval: string, theNumber: number, adate: Date | null): Date | null{

        let newDate = null;
        if (adate) {
            newDate = new Date(adate);
            if ('d' === interval.toLowerCase()) {
                newDate.setDate(adate.getDate() + theNumber);
            }
            if ('m' === interval.toLowerCase()) {
                newDate.setMonth(adate.getMonth() + theNumber);
            }
            if ('yyyy' === interval.toLowerCase()) {
                newDate.setFullYear(adate.getFullYear() + theNumber);
            }
        }
        return newDate;
    }

    /**
     * Return a string (short) representation of the argument adate.
     * @param adate date
     */
    public toShortDateFormat(adate: Date | null): string {
        return adate ? formatDate(adate, 'shortDate', this.langMng.getLanguageId()) : '';
    }

    /**
     * Return a string (medium) representation of the argument adate.
     * @param adate Date
     */
    public tomediumDateFormat(adate: Date | null): string {
        return adate ? formatDate(adate, 'mediumDate', this.langMng.getLanguageId()) : '';
    }

    /**
     * Return a string (long) representation of the argument adate.
     * @param adate Date
     */
    public tolongDateFormat(adate: Date | null): string {
        return adate ? formatDate(adate, 'longDate', this.langMng.getLanguageId()) : '';
    }

    /**
     * Return a string (full) representation of the argument adate.
     * @param adate Date
     */
    public tofullDateFormat(adate: Date | null): string {
        return adate ? formatDate(adate, 'fullDate', this.langMng.getLanguageId()) : '';
    }

    /**
     * Convert the string stringDate to a date representation.
     * @param stringDate date
     */
    public stringToDate(stringDate: string): Date | null {
        if (stringDate) {
            return new Date(stringDate);
        }
        return null;
    }

    /**
     * Convert the arguments (month, day and year) to a date representation.
     *  -month 1 (January) through 12 (December)
     *  -day 1 through 31
     * @param year year
     * @param month month
     * @param day day
     */
    public formatToDate(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day);
    }

    /**
     * Tests if adate1 is after the specified date adate2.
     *  Return: true if and only if adate1 is strictly later
     *  than the date represented by adate2.
     * @param date1 date1
     * @param date2 date2
     */
    public dateAfter(date1: Date, date2: Date): boolean {
        return date1 > date2;
    }

    /**
     * Tests if adate1 is before the specified date adate2.
     *  Return: true if and only if adate1 is strictly earlier
     *  than the date represented by adate2.
     * @param date1 date1
     * @param date2 date2
     */
    public dateBefore(date1: Date, date2: Date): boolean {
        return date1 < date2;
    }

    /**
     * Compare two dates for equality.
     *  The result is true if and only if the argument adate1 represents
     *  the same date as adate2.
     * @param date1 date1
     * @param date2 date2
     */
    public dateEquals(date1: Date, date2: Date): boolean {
        return date1 === date2;
    }

    /**
     * Return the date and time of the system.
     */
    public systemDatetime(): Date {
        return new Date();
    }

    /**
     * Returns the date part of a datetime argument.
     * @param adatetime dateTime
     */
    public getDatePart(adatetime: Date | null): Date | null {
        try {
            if (adatetime) {
                return new Date(adatetime.getFullYear(), adatetime.getMonth(), adatetime.getDate(), 0, 0, 0, 0);
            }
        } catch(e) {
            return null;
        }
        return null;
    }

    /**
     * Returns the time part of a datetime argument.
     * @param adatetime dateTime
     */
    public getTimePart(adatetime: Date | null): Date | null {
        return adatetime;
    }

    /**
     * Returns a datetime to which a specified time interval has been added.Interval : The interval
     *  of time you want to add.
     *  - yyyy Year
     *  - m Month
     *  - d Day
     *  - h Hour
     *  - n Minute
     *  - s Second Number: The number of interval you want to add.adatetime:
     *  The datetime to which a specified time interval has been added.
     * @param interval interval of time you want to add
     * @param theNumber number
     * @param adatetime initial dateTime
     */
    public dateTimeadd(interval: string, theNumber: number, adatetime: Date): Date {
        const c = adatetime;

        if (interval.toUpperCase() === 'YYYY') {
            c.setFullYear(c.getFullYear() + theNumber);
        } else if (interval.toUpperCase() === 'M') {
            c.setMonth(c.getMonth() + theNumber);
        } else if (interval.toUpperCase() === 'D') {
            c.setDate(c.getDate() + theNumber);
        } else if (interval.toUpperCase() === 'H') {
            c.setHours(c.getHours() + theNumber);
        } else if (interval.toUpperCase() === 'N') {
            c.setMinutes(c.getMinutes() + theNumber);
        } else if (interval.toUpperCase() === 'S') {
            c.setSeconds(c.getSeconds() + theNumber);
        }
        return c;
    }

    /**
     * Return the days of difference between datetime1 and datetime2.
     * @param datetime1 dateTime1
     * @param datetime2 dateTime1
     */
    public daysDifferenceFromDatetime(datetime1: Date, datetime2: Date): number {
        return this.daysDifferenceFromDate(datetime1, datetime2);
    }

    /**
     * Counts the number of appearances of the day of the week between two dates.
     * @param dayOfWeekArg of the week from 1 (sunday) to 7 (saturday)
     * @param iniDateArg is the initial date of the interval
     * @param endDateArg is the end date of the interval
     */
    public getnumDayOfweekBetweenDates(dayOfWeekArg: number, iniDateArg: Date, endDateArg: Date): number {

        const daysDiff = this.daysDifferenceFromDate(iniDateArg, endDateArg);
        const numberOfWeeks = Math.floor(daysDiff / 7);
        let numberOfDays = numberOfWeeks;
        const remainder = daysDiff % 7;
        const weekDayIni = this.getDayOfweek(iniDateArg);
        if (weekDayIni > dayOfWeekArg) {
            if ((weekDayIni + remainder - 7) >= dayOfWeekArg) {
                numberOfDays ++;
            }
        } else if (weekDayIni + remainder >= dayOfWeekArg) {
            numberOfDays ++;
        }
        return numberOfDays;
    }

    /**
     * Convert the arguments adate and atime to a datetime representation.
     * @param adate date
     * @param atime time
     */
    public toDatetime(adate: Date | null, atime: Date | null): Date | null {
        try {
            if (adate && atime) {
                return new Date(adate.getFullYear(), adate.getMonth(), adate.getDate(), atime.getHours(),
                    atime.getMinutes(), atime.getSeconds(), atime.getMilliseconds());
            }
        } catch(e) {
            return null;
        }
        return null;
    }

    /**
     * Return a string representation of the argument datetime.
     * Converts aDate to a (long) string
     * @param adatetime dateTime
     */
    public datetimeToString(adatetime: Date): string {
        if (adatetime) {
            return formatDate(adatetime, 'full', this.langMng.getLanguageId());
        } else {
            return '';
        }
    }

    /**
     * Convert the string stringDate to a datetime representation.
     * @param stringDate stringDate
     */
    public stringToDatetime(stringDate: string): Date | null {
        return this.stringToDate(stringDate);
    }

    /**
     * Convert the arguments (month, day, year, hour, minute and second) to a datetime representation.
     * @param year year
     * @param month month
     * @param day day
     * @param hour hour
     * @param minute minute
     * @param second second
     */
    public formatToDatetime(year: number, month: number, day: number, hour: number, minute: number, second: number): Date {
        return new Date(year, month, day, hour, minute, second);
    }

    /**
     * Tests if adatetime1 is after the specified datetime adatetime2.
     *  Return: true if and only if adatetime1 is strictly later
     *  than the datetime represented by adatetime2.
     * @param adatetime1 dateTime1
     * @param adatetime2 dateTime2
     */
    public datetimeAfter(adatetime1: Date, adatetime2: Date): boolean {
        return adatetime1 > adatetime2;
    }

    /**
     * Tests if adatetime1 is before the specified datetime adatetime2.
     *  Return: true if and only if adatetime1 is strictly earlier
     *  than the datetime represented by adatetime2
     * @param adatetime1 dateTime1
     * @param adatetime2 dateTime2
     */
    public datetimeBefore(adatetime1: Date, adatetime2: Date): boolean {
        return adatetime1 > adatetime2;
    }

    /**
     * Compare two datetimes for equality.
     *  The result is true if and only if the argument adatetime1
     *  represents the same datetime as adatetime2.
     * @param adatetime1 dateTime1
     * @param adatetime2 dateTime2
     */
    public datetimeEquals(adatetime1: Date, adatetime2: Date): boolean {
        if (adatetime1 === adatetime2) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Return the time of the system.
     */
    public systemtime(): Date {
        return new Date();
    }

    /**
     * Returns the hour of a time.
     * @param atime time
     */
    public getHour(atime: Date): number {
        return atime.getHours();
    }

    /**
     * Returns the minutes of a time.
     * @param atime Time
     */
    public getMinute(atime: Date): number {
        return atime.getMinutes();
    }

    /**
     * Returns the seconds of a time.
     * @param atime Time
     */
    public getSecond(atime: Date): number {
        return atime.getSeconds();
    }

    /**
     * Returns a time to which a specified time interval has been added.Interval : The interval.
     *   of time you want to add.
     *   - h Hour
     *   - n Minute
     *   - s Second
     *   Number: The number of interval you want to add.
     *   Date: The date to which a specified time interval has been added.
     * @param interval interval of time
     * @param theNumber number
     * @param atime Time
     */
    public timeAdd(interval: string, theNumber: number, atime: Date): Date {
        const c = atime;

        if (interval.toUpperCase() === 'H') {
            c.setHours(c.getHours() + theNumber);
        } else if (interval.toUpperCase() === 'N') {
            c.setMinutes(c.getMinutes() + theNumber);
        } else if (interval.toUpperCase() === 'S') {
            c.setSeconds(c.getSeconds() + theNumber);
        }
        return c;
    }

    /**
     * Convert the arguments (hour, minute and second) to a time representation.
     * @param hour Hour
     * @param minute Minutes
     * @param second Seconds
     */
    public formatToTime(hour: number, minute: number, second: number): Date {
        const c = new Date();
        c.setHours(hour);
        c.setMinutes(minute);
        c.setSeconds(second);
        return c;
    }

    /**
     * Convert the string stringTime to a time representation.
     * @param stringTime StringTime
     */
    public stringToTime(stringTime: string): Date {
        return new Date('1970-01-01T' + stringTime);
    }

    /**
     * Return a string representation of the argument atime.
     * @param atime Time
     */
    public timeToString(atime: Date): string {
        if (atime) {
            return formatDate(atime, 'shortTime', this.langMng.getLanguageId());
        }
        return '';
    }

    /**
     * Tests if atime1 is after the specified time atime2.
     *  Return: true if and only if atime1 is strictly later than the time represented by atime2.
     * @param atime1 Time1
     * @param atime2 Time2
     */
    public timeAfter(atime1: Date, atime2: Date): boolean {
        const time1 = new Date(2000, 0, 1, atime1.getHours(), atime1.getMinutes(), atime1.getSeconds(), 0);
        const time2 = new Date(2000, 0, 1, atime2.getHours(), atime2.getMinutes(), atime2.getSeconds(), 0);
        if (time1 > time2) {
            return true;
        }
        return false;
    }

    /**
     * Tests if atime1 is before the specified time atime2.
     *  Return: true if and only if first is strictly earlier than the time represented by second.
     * @param first Time1
     * @param second Time2
     */
    public timeBefore(first: Date, second: Date): boolean {
        return this.timeAfter(second, first);
    }

    /**
     * Compare two times for equality.
     *  The result is true if and only if the argument atime1 represents the same time as atime2.
     * @param atime1 Time1
     * @param atime2 time2
     */
    public timeEquals(atime1: Date, atime2: Date): boolean {
        return atime1.getHours() === atime2.getHours() && atime1.getMinutes() === atime2.getMinutes() &&
            atime1.getSeconds() === atime2.getSeconds();
    }

    /**
     * Returns the value of the PI constant, equals to 3.14159265358979323846832.
     */
    public numberPI(): number {
        return Math.PI;
    }

    /**
     * Returns the value of the Euler constant, equals to 2.718281.
     */
    public numberEuler(): number {
        return 2.718281;
    }

    /**
     * Returns the trigonometric sine of the argument Angle.
     * @param angle angle
     */
    public sin(angle: number): number {
        return Math.sin(angle);
    }

    /**
     * Returns the trigonometric cosine of the argument Angle.
     * @param angle angle
     */
    public cos(angle: number): number {
        return Math.cos(angle);
    }

    /**
     * Returns the trigonometric tangent of the argument Angle.
     * @param angle angle
     */
    public tan(angle: number): number {
        return Math.tan(angle);
    }

    /**
     * Returns the trigonometric cotangent of the argument Angle.
     * @param angle angle
     */
    public cot(angle: number): number {
        return 1 / Math.tan(angle);
    }

    /**
     * Returns the trigonometric arc sine of the argument Value.
     *  which most hold a real value between -1 through 1.
     *  The result is in the range of -PI/2 through PI/2.
     * @param value value
     */
    public asin(value: number): number {
        return Math.asin(value);
    }

    /**
     * Returns the trigonometric arc cosine of the argument Value.
     *  which most hold a real value between -1 through 1.
     *  The result is in the range of -PI/2 through PI/2.
     * @param value value
     */
    public acos(value: number): number {
        return Math.acos(value);
    }

    /**
     * Returns the trigonometric arc tangent of the argument Value.
     * The result is in the range of -PI/2 through PI/2.
     * @param value value
     */
    public atan(value: number): number {
        return Math.atan(value);
    }

    /**
     * Returns the trigonometric of the argument Value.
     * The result is in the range of -PI/2 through PI/2.
     * @param value value
     */
    public acot(value: number): number {
        return Math.PI / 2 - Math.atan(value);
    }

    /**
     * Returns the trigonometric arc tangent of the value y/x.
     * This function calculate the result based on the atan function,
     * but it considers the (x, y) as rectangular
     * coordinates to be converted to polar coordinates (ro, theta), where theta is the result.
     * The result is in the range of -PI through PI.
     * @param x x
     * @param y y
     */
    public atan2(x: number, y: number): number {
        return Math.atan2(y, x);
    }

    /**
     * Converts an angle measured in degrees (Value) in an angle measured in radians.
     *  The result is mathematically equivalent to Value * PI / 180.
     * @param value angle measured in degrees
     */
    public toradians(value: number): number {
        return value / 180.0 * Math.PI;
    }

    /**
     * Converts an angle measured in radians (Value) in an angle measured in degrees.
     *  The result is mathematically equivalent to Value * 180 / PI.
     * @param value angle measured in radians
     */
    public todegrees(value: number): number {
        // return value * Math.PI / 180;
        return value * (180 / Math.PI);
    }

    /**
     * Returns the trigonometric secant of the argument angle.
     * @param angle angle
     */
    public sec(angle: number): number {
        return 1 / Math.cos(angle);
    }

    /**
     * Returns the trigonometric cosecant of the argument angle.
     * @param angle angle
     */
    public csec(angle: number): number {
        return 1 / Math.sin(angle);
    }

    /**
     * Returns the trigonometric inverse secant of the argument value.
     * @param value value
     */
    public asec(value: number): number {
        return Math.acos(1 / value);
    }

    /**
     * Returns the trigonometric inverse cosecant of the argument value.
     * @param value value
     */
    public acsec(value: number): number {
        return Math.asin(1 / value);
    }

    /**
     * Returns the Euler constant raised to the specified argument value (e^value).
     * @param value value
     */
    public exp(value: number): number {
        return Math.exp(value);
    }

    /**
     * Returns the natural logarithm (base Euler constant) of the specified argument value.
     * @param value value
     */
    public log(value: number): number {
        return Math.log(value);
    }

    /**
     * Returns the value Base raised to the power of Exponent (Base^Exponent).
     * @param base Base
     * @param exponent Exponent
     */
    public pow(base: number, exponent: number): number {
        return Math.pow(base, exponent);
    }

    /**
     * Returns the square root of the specified value argument.
     * @param value value
     */
    public sqrt(value: number): number {
        return Math.sqrt(value);
    }

    /**
     * Returns the absolute value of the specified argument value.
     * @param value value
     */
    public absInt(value: number): number {
        return Math.abs(value);
    }

    /**
     * Returns the absolute value of the specified argument value.
     * @param value value
     */
    public absReal(value: number): number {
        return Math.abs(value);
    }

    /**
     * Returns the minimum between value1 and value2.
     * @param value1 value1
     * @param value2 value2
     */
    public min(value1: number, value2: number): number {
        return Math.min(value1, value2);
    }

    /**
     * Returns the minimum between value1 and value2.
     * @param value1 value1
     * @param value2 value2
     */
    public minimum(value1: number, value2: number): number {
        return Math.min(value1, value2);
    }

    /**
     * Returns the maximum between value1 and value2.
     * @param value1 value1
     * @param value2 value2
     */
    public max(value1: number, value2: number): number {
        return Math.max(value1, value2);
    }

    /**
     * Returns the maximum between value1 and value2.
     * @param value1 value1
     * @param value2 value2
     */
    public maximum(value1: number, value2: number): number {
        return Math.max(value1, value2);
    }

    /**
     * Returns the minimum between value1 and value2.
     * @param value1 value1
     * @param value2 value2
     */
    public minInt(value1: number, value2: number): number {
        return Math.min(value1, value2);
    }

    /**
     * Returns the maximum between value1 and value2.
     * @param value1 value1
     * @param value2 value2
     */
    public maxInt(value1: number, value2: number): number {
        return Math.max(value1, value2);
    }

    /**
     * Returns the logarithm of value, in base Base.
     * @param value value
     * @param base Base
     */
    public logbase(value: number, base: number): number {
        return Math.log(value) / Math.log(base);
    }

    /**
     * Returns the sign of the specified argument value, represented as -1,
     *  0 and 1, in correspondence with negative, zero or positive argument.
     * @param value value
     */
    public sign(value: number): number {
        return Math.sign(value);
    }

    /**
     * Returns the greatest common divisor between value1 and value2. That is,
     * the greatest integer value that exactly divides Value1 (integer quotient and
     * remainder 0) and exactly divides Value2. Both arguments (value1 and value2)
     * can't be simultaneously 0.
     * @param value1 value1
     * @param value2 value2
     */
    public gcd(value1: number, value2: number): number {
        value1 = Math.abs(value1);
        value2 = Math.abs(value2);
        while (value2) {
            const t = value2;
            value2 = value1 % value2;
            value1 = t;
        }
        return value1;
    }

    /**
     * Returns the less common multiple between value1 and value2. That is, the
     * lesser integer value that is exactly divisible by value1 and value2. Both arguments
     * (value1 and value2) can't be simultaneously 0.
     * @param value1 value1
     * @param value2 value2
     */
    public lcm(value1: number, value2: number): number {
        return (!value1 || !value2) ? 0 : Math.abs((value1 * value2) / this.gcd(value1, value2));
    }

    /**
     * Returns the smallest integer value (closest to negative infinity) greater than or
     *  equal to value.
     * @param value value
     */
    public ceiling(value: number): number {
        return Math.ceil(value);
    }

    /**
     * Returns the largest integer value (closest to positive infinity) less than or equal
     *  to value.
     * @param value value
     */
    public floor(value: number): number {
        return Math.floor(value);
    }

    /**
     * Returns the integer part of the real argument value, just removing the fraction
     *  part. If Value is below 0, it returns the ceiling, otherwise it returns the floor.
     * @param value value
     */
    public trunc(value: number): number {
        return Math.trunc(value);
    }

    /**
     * Returns the integer value closest to value. In cases of ambiguity, where the
     *  fraction part is .5, this function returns the even integer from the two possible
     *  closest integers (on the examples).
     * @param value value
     */
    public round(value: number): number {
        return Math.round(value);
    }

    /**
     * Returns the number with the specified precision nearest the specified value, where
     *  digits is the number of significant fractional digits (precision) in the returned value.
     * @param value value
     * @param digits digits
     */
    public roundEx(value: number, digits: number): number {
        const a = value.toFixed(digits);
        return parseFloat(a);
    }

    /**
     * Returns the string representation of Value in decimal format.
     * @param value value
     */
    public intToStr(value: number): string {
        return value.toString();
    }

    /**
     * Returns the string representation of Value.
     * @param value value
     */
    public realToStr(value: number): string {
        return value.toString();
    }

    /**
     * Returns the string representation of Value in hexadecimal format.
     * @param value value
     */
    public toHexString(value: number): string {
        return value.toString(16);
    }

    /**
     * Returns the string representation of Value in octal format.
     * @param value value
     */
    public toOctalString(value: number): string {
        return value.toString(8);
    }

    /**
     * Returns the integer value represented in decimal format by the string Value.
     * @param value value
     */
    public strToInt(value: string): number {
        return parseInt(value, 10);
    }

    /**
     * Returns the real value represented by the string Value.
     * @param value value
     */
    public strToReal(value: string): number {
        return parseFloat(value);
    }



    /**
     * Returns the hyperbolic sine of the argument value.
     * @param value value
     */
    public sinh(value: number): number {
        return Math.sinh(value);
    }

    /**
     * Returns the hyperbolic cosine of the argument value.
     * @param value value
     */
    public cosh(value: number): number {
        return Math.cosh(value);
    }

    /**
     * Returns the hyperbolic tangent of the argument value.
     * @param value value
     */
    public tanh(value: number): number {
        return Math.tanh(value);
    }

    /**
     * Returns the hyperbolic cotangent of the argument value.
     * @param value value
     */
    public coth(value: number): number {
        return 1 / Math.tanh(value);
    }

    /**
     * Returns the hyperbolic secant of the argument value.
     * @param value value
     */
    public sech(value: number): number {
        return 1 / Math.cosh(value);
    }

    /**
     * Returns the hyperbolic cosecant of the argument value.
     * @param value value
     */
    public csech(value: number): number {
        return 1 / Math.sinh(value);
    }

    /**
     * Returns the inverse hyperbolic sine of the argument value.
     * @param value value
     */
    public asinh(value: number): number {
        return Math.asinh(value);
    }

    /**
     * Returns the inverse hyperbolic cosine of the argument value.
     * @param value value
     */
    public acosh(value: number): number {
        return Math.acosh(value);
    }

    /**
     * Returns the inverse hyperbolic tangent of the argument value.
     * @param value value
     */
    public atanh(value: number): number {
        return Math.atanh(value);
    }

    /**
     * Returns the inverse hyperbolic cotangent of the argument value.
     * @param value value
     */
    public acoth(value: number): number {
        return Math.atanh(1 / value);
    }

    /**
     * Returns the inverse hyperbolic secant of the argument value.
     * @param value value
     */
    public asech(value: number): number {
        return Math.acosh(1 / value);
    }

    /**
     * Returns the inverse hyperbolic cosecant of the argument value.
     * @param value value
     */
    public acsech(value: number): number {
        return Math.asinh(1 / value);
    }

    /**
     * Returns the first position of the substring specified by the argument subStr
     *  if it is found as part of the aString string. It returns 0 otherwise.
     * @param astring String
     * @param subStr subString
     */
    public indexOf(astring: string, subStr: string): number {
        const idx = astring.indexOf(subStr);
        if (idx < 0) {
            return 0;
        }
        return idx;
    }

    /**
     * Search the first occurrence of the substring specified by the argument subStr in
     *  the aString string after the position specified by the argument from, if the substring
     *  is found, its position in the string is returned, It returns 0 otherwise.
     * @param astring String
     * @param subStr subString
     * @param from position
     */
    public indexOfFrom(astring: string, subStr: string, from: number): number {
        const idx = astring.indexOf(subStr, from);
        if (idx < 0) {
            return 0;
        }
        return idx;
    }

    /**
     * Returns the last position of the substring specified by the argument subStr if it
     *  is found as part of the aString string, otherwise it returns 0.
     * @param astring String
     * @param subStr subString
     */
    public lastindexOf(astring: string, subStr: string): number {
        const idx = astring.lastIndexOf(subStr);
        if (idx < 0) {
            return 0;
        }
        return idx;
    }

    /**
     * Search the rightmost occurrence of the substring specified by the argument subStr in
     *  the aString string before the position specified by the argument ending, if the substring
     *  is found it position in the string is returned, otherwise it returns 0.
     * @param aString String
     * @param subStr subString
     * @param ending ending
     */
    public lastindexOfFrom(astring: string, subStr: string, ending: number): number {
        const idx = astring.lastIndexOf(subStr, ending);
        if (idx < 0) {
            return 0;
        }
        return idx;
    }

    /**
     * Returns true if aString string starts with the substring specified by the argument prefix,
     *  false otherwise.
     * @param astring String
     * @param prefix prefix
     */
    public strStartsWith(astring: string, prefix: string): boolean {
        return astring.startsWith(prefix);
    }

    /**
     * Returns true if aString string ends with the substring specified by the argument sufix, false
     *  otherwise.
     * @param astring String
     * @param sufix sufix
     */
    public strEndsWith(astring: string, sufix: string): boolean {
        return astring.endsWith(sufix);
    }

    /**
     * Returns true if the substring that begins in the from position of the aString string,
     *  starts with the substring specified by the argument prefix, false otherwise.
     * @param astring String
     * @param prefix prefix
     * @param from from
     */
    public strStartsWithFrom(astring: string, prefix: string, from: number): boolean {
        return astring.startsWith(prefix, from);
    }

    /**
     * Returns a string containing a number of size characters of the right side of the
     *  aString string.
     * @param astring String
     * @param size Size
     */
    public rightSubstring(astring: string, size: number): string {
        return astring.slice(-size);
    }

    /**
     * Returns a string containing a number of size characters of the left side of the
     *  aString string.
     * @param astring String
     * @param size Size
     */
    public leftSubstring(astring: string, size: number): string {
        return astring.slice(0, size);
    }

    /**
     * Returns a copy of a substring of the aString string. This copy starts at the from
     *  position of the aString string and copy an amount of size characters.
     * @param astring String
     * @param from from
     * @param size size
     */
    public substring(astring: string, from: number, size: number): string {
        return astring.substring(from, from + size);
    }

    /**
     * Returns a new string which is a copy of aString string without its leading spaces.
     * @param astring String
     */
    public leftTrim(astring: string): string {
        return astring.trimStart();
    }

    /**
     * Returns a new string which is a copy of aString string without its trailing spaces.
     * @param astring String
     */
    public rightTrim(astring: string): string {
        return astring.trimEnd();
    }

    /**
     * Returns a new string which is a copy of aString string without its both leading and
     *   trailing spaces.
     * @param astring String
     */
    public strTrim(astring: string): string {
        return astring.trim();
    }

    /**
     * Returns a copy of the aString string but with all occurrences of the subStr substring
     *  specified replaced by the other string.
     * @param astring String
     * @param subStr subString
     * @param other other
     */
    public strReplace(astring: string, subStr: string, other: string): string {
        return astring.replace(new RegExp(subStr, 'g'), other);
    }

    /**
     * Returns a copy of the aString string but with all occurrences of the subStr substring
     *   specified replaced by the other string, starting from the from position.
     * @param astring String
     * @param subStr subString
     * @param other other
     * @param from from
     */
    public replaceFrom(astring: string, subStr: string, other: string, from: number): string {
        if (from <= 0) {
            from = 0;
        } else {
            from = from - 1;
        }

        const iniString = astring.substr(0, from);
        astring = astring.replace(iniString, '');
        astring = astring.replace(new RegExp(subStr, 'g'), other);
        return iniString + astring;
    }

    /**
     * Returns a copy of the aString string with a number of times occurrences of the subStr
     *  substring specified replaced by the other string, starting from the from position.
     * @param astring String
     * @param subStr subString
     * @param other other
     * @param from from
     * @param times times
     */
    public replaceTimes(astring: string, subStr: string, other: string, from: number, times: number): string {
        if (from <= 0) {
            from = 0;
        } else {
            from = from - 1;
        }

        const iniString = astring.substr(0, from);
        astring = astring.replace(iniString, '');

        for (let i = 0; i < times; i++) {
            astring = astring.replace(subStr, other);
        }

        return iniString + astring;
    }

    /**
     * Concatenates the secondStr string at the end of the firstStr string.
     * @param firstStr First String
     * @param secondStr Second String
     */
    public concat(firstStr: string, secondStr: string): string {
        return firstStr.concat(secondStr);
    }

    /**
     * Returns a new String which is a copy of aString without the region
     *  defined by the start position specified with the specified length.
     * @param aString String
     * @param start Start
     * @param length Length
     */
    public strDelete(astring: string, start: number, length: number): string {
        return astring.replace(astring.substr(start, length), '');
    }

    /**
     * Returns a copy of the aString string with a new string (insertion)
     *  inserted at the index position.
     * @param astring string
     * @param index index
     * @param insertion insertion
     */
    public strInsert(astring: string, index: number, insertion: string): string {
        const output = [astring.slice(0, index), insertion, astring.slice(index)].join('');
        return output;
    }

    /**
     * Return a new String with all its characters in their Uppercase variant.
     * @param astring String
     */
    public upperCase(astring: string): string {
        return astring.toUpperCase();
    }

    /**
     * Return a new String with all its characters in their Lowercase variant.
     * @param astring String
     */
    public lowerCase(astring: string): string {
        return astring.toLowerCase();
    }

    /**
     * Returns the size of the aString string.
     * @param astring String
     */
    public lengthString(astring: string): number {
        return astring.length;
    }

    /**
     * Returns a new Sting, copy of the aString string with its characters in reverse order.
     * @param astring String
     */
    public reverse(astring: string): string {
        return astring.split('').reverse().join('');
    }

    /**
     * Compare both strings: firstStr and secondStr lexicographically. Returns a negative
     *  value when firstStr appears before secondStr, 0 if they are equals, or a positive value
     *  if firstStr  follows secondStr.
     * @param firstStr first String
     * @param secondStr second String
     */
    public strCompare(firstStr: string, secondStr: string): number {
        return firstStr.localeCompare(secondStr);
    }

    /**
     * Compares both strings lexicographically ignoring case considerations.
     * It returns a negative value when the firstStr string appears before the secondStr in the lexical order,
     *  0 if they are equals, or a positive value if the first string follows the second String.
     * @param firstStr first String
     * @param secondStr second String
     */
    public strCompareIgnoreCase(firstStr: string, secondStr: string): number {
        return firstStr.toUpperCase().localeCompare(secondStr.toUpperCase());
    }

    /**
     * Compares two regions defined by the arguments of this method: The first string region
     *  is defined by the substring of the aString string starting at the from position with a
     *  length size, the second one is a substring which starts at the otherfrom position of the
     *  other string with the length size. If both regions are equals (depending on the ignoreCase
     *  parameter) this method returns true, if not, or if one of the from or otherfrom arguments is
     *  negative, or some of the regions exceeds the end of the string, this method returns false.
     * @param astring String
     * @param ignoreCase ignoreCase
     * @param from from
     * @param other other
     * @param otherFrom otherFrom
     * @param length length
     */
    public strRegionMatches(astring: string, ignoreCase: boolean, from: number, other: string, otherFrom: number, length: number): boolean {
        if (ignoreCase) {
            astring = astring.toUpperCase();
            other = other.toUpperCase();
        }

        const substr1 = this.substring(astring, from, length);
        const substr2 = this.substring(other, otherFrom, length);

        return (this.strCompare(substr1, substr2) === 0);
    }

    /**
     * Return true if the string firstStr comes before the string secondStr in lexicographic
     *  order.
     * @param firstStr first String
     * @param secondStr second String
     */
    public strLesserThan(firstStr: string, secondStr: string): boolean {
        return (firstStr.localeCompare(secondStr) < 0);
    }

    /**
     * Return true if the string firstStr comes after the string secondStr in lexicographic
     *  order.
     * @param firstStr first String
     * @param secondStr second String
     */
    public strGreaterThan(firstStr: string, secondStr: string): boolean {
        return (firstStr.localeCompare(secondStr) > 0);
    }

    /**
     * Return true if the string firstStr and the string secondStr are lexicographically.
     *  equals
     * @param firstStr first String
     * @param secondStr second String
     */
    public strsameas(firstStr: string, secondStr: string): boolean {
        return (firstStr.localeCompare(secondStr) === 0);
    }

    /**
     * Converts a TEXT type into a STRING type.
     * @param text Text to convert
     */
    public textToStr(text: string): string {
        return text;
    }
}
