import {cleanTimestringSegment} from '../src/find-time'

test('cleanTimestringSegment trims up a timestring segment', () => {
	const expected = '800AM'
	const actual = cleanTimestringSegment('    800AM   ')
	expect(actual).toBe(expected)
})

test('cleanTimestringSegment capitalizes a timestring segment', () => {
	const expected = '800AM'
	const actual = cleanTimestringSegment('800am')
	expect(actual).toBe(expected)
})
