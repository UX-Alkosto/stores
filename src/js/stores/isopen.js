import { getColombiaHolidaysByYear } from "../colombia-holidays/index.js"

const isOpen = (schedule = []) => {
	try {
		const todayDate = new Date(),
			tomorrowDate = new Date(todayDate),
			fullDay = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate()}`,
			holidays = getColombiaHolidaysByYear(todayDate.getFullYear()),
			timeOptions = {
				hour: 'numeric',
				hour12: true,
				minute: 'numeric'
			}
		tomorrowDate.setDate(todayDate.getDate() + 1)

		if (schedule[todayDate.getDay()].length === 0) {
			schedule[todayDate.getDay()] = ["0:00", "0:00"]
		}
		if (schedule[tomorrowDate.getDay()].length === 0) {
			schedule[tomorrowDate.getDay()] = ["0:00", "0:00"]
		}

		let _today = {
			open: schedule[todayDate.getDay()][0].split(":"),
			close: schedule[todayDate.getDay()][1].split(":")
		},
			_tomorrow = {
				open: schedule[tomorrowDate.getDay()][0].split(":"),
				close: schedule[tomorrowDate.getDay()][1].split(":")
			},
			today = {
				open: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), Number(_today.open[0]), Number(_today.open[1])),
				close: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), Number(_today.close[0]), Number(_today.close[1]))
			},
			tomorrow = {
				open: new Date(tomorrowDate.getFullYear(), tomorrowDate.getMonth(), tomorrowDate.getDate(), Number(_tomorrow.open[0]), Number(_tomorrow.open[1])),
				close: new Date(tomorrowDate.getFullYear(), tomorrowDate.getMonth(), tomorrowDate.getDate(), Number(_tomorrow.close[0]), Number(_tomorrow.close[1]))
			}

		for (const holidayKey in holidays) {
			const holiday = holidays[holidayKey]
			if (holiday.holiday === fullDay) {
				_today.open = schedule[0][0].split(":")
				_today.close = schedule[0][1].split(":")
				today.open = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), Number(_today.open[0]), Number(_today.open[1]))
				today.close = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), Number(_today.close[0]), Number(_today.close[1]))
			}
		}

		if (todayDate.getTime() >= today.open.getTime() && todayDate.getTime() <= today.close.getTime()) {
			const complemento = `cierra a las ${today.close.toLocaleString('es-CO', timeOptions)}`
			return {
				open: true,
				message: `Abierto, ${complemento}`
			}
		} else {
			const complemento = `abre a las ${tomorrow.open.toLocaleString('es-CO', timeOptions)}`
			return {
				open: false,
				message: `Cerrado, ${complemento}`
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export { isOpen }