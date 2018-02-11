import assign from 'lodash/assign'
import mergeWith from 'lodash/mergeWith'
import values from 'lodash/values'
import zip from 'lodash/zip'
import findDays from './find-days'
import findTime from './find-time'

export default function convertTimeStringsToOfferings(course, {groupBy='day'}={}) {
	// you may group by "day" or by "sis", where "sis" retains the groupings given by SIS

	if (groupBy === 'day') {
		return convertAndGroupByDay(course)
	} else if (groupBy === 'sis') {
		return convertAndGroupLikeSis(course)
	} else {
		throw new TypeError(`"${groupBy}" is not a valid groupBy mode`)
	}
}

function convertAndGroupByDay(course) {
	let offerings = {}

	zip(course.times, course.locations).forEach(([sisTimestring, location]) => {
		const [daystring, timestring] = sisTimestring.split(' ')

		const days = findDays(daystring)
		const time = findTime(timestring)

		days.forEach(day => {
			if (!offerings[day]) {
				offerings[day] = {}
			}

			let offering = {
				day: day,
				times: [assign({}, time)],
			}

			if (location) {
				offering.location = location
			}

			mergeWith(offerings[day], offering,
				(a, b) => Array.isArray(a) ? a.concat(b) : undefined)
		})
	})

	return values(offerings)
}

function convertAndGroupLikeSis(course) {
	let offerings = {}

	zip(course.times, course.locations).forEach(([sisTimestring, location]) => {
		const [daystring, timestring] = sisTimestring.split(' ')

		const days = findDays(daystring)
		const time = findTime(timestring)
		const key = days.join(',')

		if (!offerings[key]) {
			offerings[key] = {}
		}

		let offering = {days, ...time}

		if (location) {
			offering.location = location
		}

		mergeWith(offerings[key], offering,
			(a, b) => Array.isArray(a) ? a.concat(b) : undefined)
	})

	return values(offerings)
}
