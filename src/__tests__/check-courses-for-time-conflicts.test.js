import checkCoursesForTimeConflicts from '../check-courses-for-time-conflicts'
import convertTimeStringsToOfferings from '../convert-time-strings-to-offerings'

test('checks for course time conflicts', () => {
	let courses = [
		{offerings: [
			{day: 'Mo', times:[{start:1300, end:1600}, {start:905, end:1000}]},
			{day: 'Tu', times:[{start:1300, end:1600}]},
			{day: 'Fr', times:[{start:905, end:1000}]},
		]},
		{offerings: [
			{day: 'Mo', times:[{start:1300, end:1400}, {start:905, end:1000}]},
			{day: 'Tu', times:[{start:1300, end:1400}]},
			{day: 'We', times:[{start:1300, end:1400}]},
			{day: 'Th', times:[{start:1300, end:1400}]},
			{day: 'Fr', times:[{start:905, end:1000}]},
		]},
		{offerings: [
			{day: 'Mo', times:[{start:400, end:600}]},
		]},
	]

	expect(checkCoursesForTimeConflicts(courses[0], courses[1])).toBe(true)

	expect(checkCoursesForTimeConflicts(courses[0], courses[2])).toBe(false)
	expect(checkCoursesForTimeConflicts(courses[1], courses[2])).toBe(false)
})

test('handles the output of convertTimeStringsToOfferings', () => {
	let testing = [
		{offerings: convertTimeStringsToOfferings({times: ['M 1255-0325PM']})},
		{offerings: convertTimeStringsToOfferings({times: ['MWF 0200-0255PM']})},
	]

	expect(checkCoursesForTimeConflicts(testing[0], testing[1])).toBe(true)
	expect(checkCoursesForTimeConflicts(testing[1], testing[0])).toBe(true)
})
