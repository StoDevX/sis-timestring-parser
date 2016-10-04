import test from 'ava'
import {cleanTimestringSegment} from '../src/find-time'

test('cleanTimestringSegment trims up a timestring segment', t => {
	const expected = '800AM'
	const actual = cleanTimestringSegment('    800AM   ')
	t.is(actual, expected)
})

test('cleanTimestringSegment capitalizes a timestring segment', t => {
	const expected = '800AM'
	const actual = cleanTimestringSegment('800am')
	t.is(actual, expected)
})
