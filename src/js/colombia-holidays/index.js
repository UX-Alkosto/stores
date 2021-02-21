import { EASTER_WEEK_HOLIDAYS, HOLIDAYS } from "./holidays.js";

const MILLISECONDS_DAY = 86400000;

function getColombiaHolidaysByYear(year) {
	if (!year) {
		throw "No year provided";
	} else {
		year = year.toString();
		if (!year.match(/^\d*$/g)) {
			throw "The year is not a number";
		} else if (year < 1970 || year > 99999) {
			throw "The year should be greater to 1969 and smaller to 100000";
		} else {
			const normalHolidays = HOLIDAYS.map(element => {
				return {
					holiday: nextDay(year.toString().concat("-").concat(element.day), element.daysToSum),
					celebrationDay: year.toString().concat("-").concat(element.day),
					celebration: element.celebration
				};
			});
			const sunday = new Date(butcherAlgorithm(year));
			const easterWeekHolidays = EASTER_WEEK_HOLIDAYS.map(element => {
				const day = new Date(sunday.getTime() + element.day * MILLISECONDS_DAY);
				return {
					holiday: nextDay(getFormattedDate(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate()), element.daysToSum),
					celebrationDay: getFormattedDate(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate()),
					celebration: element.celebration
				};
			});
			return normalHolidays.concat(easterWeekHolidays).sort((a, b) => {
				return new Date(a.holiday) - new Date(b.holiday);
			});
		}
	}
}

function butcherAlgorithm(year) {
	year = parseInt(year);
	const A = year % 19;
	const B = Math.floor(year / 100);
	const C = year % 100;
	const D = Math.floor(B / 4);
	const E = B % 4;
	const F = Math.floor((B + 8) / 25);
	const G = Math.floor((B - F + 1) / 3);
	const H = (19 * A + B - D - G + 15) % 30;
	const I = Math.floor(C / 4);
	const K = C % 4;
	const L = (32 + 2 * E + 2 * I - H - K) % 7;
	const M = Math.floor((A + 11 * H + 22 * L) / 451);
	const N = H + L - 7 * M + 114;
	const month = Math.floor(N / 31);
	const day = 1 + (N % 31);
	return getFormattedDate(year, month, day);
}

function nextDay(day, sum) {
	const date = new Date(day);
	const newDate = (sum === 7 ? date : new Date(date.getTime() + (((7 + sum) - date.getUTCDay()) % 7) * MILLISECONDS_DAY));
	return getFormattedDate(newDate.getUTCFullYear(), newDate.getUTCMonth() + 1, newDate.getUTCDate());
}

function addZero(number) {
	number = number.toString();
	if (number > 0 && number < 10 && !number.startsWith("0")) return "0".concat(number);
	else return number;
}

function getFormattedDate(year, month, day) {
	return year.toString().concat("-").concat(addZero(month)).concat("-").concat(addZero(day));
}

export { getColombiaHolidaysByYear };