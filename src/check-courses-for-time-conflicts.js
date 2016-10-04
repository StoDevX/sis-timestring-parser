import some from 'lodash/some'
import filter from 'lodash/filter'

function checkOfferingForTimeConflict(main, alternate) {
	// const altStartsAfterMain      = alternate.start >= main.start
	const altStartsBeforeMainEnds = alternate.start <= main.end
	const altEndsAfterMainStarts  = alternate.end >= main.start
	// const altEndsBeforeMainEnds   = alternate.end <= main.end

	if (altStartsBeforeMainEnds && altEndsAfterMainStarts) {
		return true
	}

	return false
}

function checkTwoOfferingsForTimeConflict(mainOffer, altOffer) {
	return some(
		mainOffer.times,
		mainTime =>
			some(
				altOffer.times,
				altTime =>
					checkOfferingForTimeConflict(mainTime, altTime)))
}

export default function checkCoursesForTimeConflicts(mainCourse, altCourse) {
	// Check the offerings from two courses against each other.
	// Returns *as soon as* two times conflict.

	return some(
		mainCourse.offerings,
		mainOffer =>
			some(
				// Two offerings cannot conflict if they are on different days
				filter(altCourse.offerings, offer => offer.day === mainOffer.day),
				altOffer =>
					checkTwoOfferingsForTimeConflict(mainOffer, altOffer)))
}
