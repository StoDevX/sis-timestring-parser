import {cleanTimestringSegment} from '../find-time'

test('trims up a timestring segment', () => {
	const expected = '800AM'
	const actual = cleanTimestringSegment('    800AM   ')
	expect(actual).toBe(expected)
})

test('capitalizes a timestring segment', () => {
	const expected = '800AM'
	const actual = cleanTimestringSegment('800am')
	expect(actual).toBe(expected)
})
