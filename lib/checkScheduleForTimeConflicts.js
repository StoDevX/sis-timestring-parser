import some from 'lodash/collection/some'
import checkCoursesForTimeConflicts from './checkCoursesForTimeConflicts'

export default function checkScheduleForTimeConflicts(courses) {
	if (courses.hasOwnProperty('toArray')) {
		courses = courses.toArray()
	}

	// for (let c1 of courses) {
	// 	for (let c2 of courses) {
	// 		if (c1 === c2) {
	// 			continue
	// 		}
	// 		else if (checkCoursesForTimeConflicts(c1, c2)) {
	// 			return true
	// 		}
	// 	}
	// }

	return some(courses, c1 => some(courses, c2 =>
		checkCoursesForTimeConflicts(c1, c2)))
}