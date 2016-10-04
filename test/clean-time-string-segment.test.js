import test from 'ava'
import cleanTimeStringSegment from '../src/clean-time-string-segment'

test('cleanTimeStringSegment trims up a timestring segment', t => {
	const expected = '800AM'
	const actual = cleanTimeStringSegment('    800AM   ')
	t.is(actual, expected)
})

test('cleanTimeStringSegment capitalizes a timestring segment', t => {
	const expected = '800AM'
	const actual = cleanTimeStringSegment('800am')
	t.is(actual, expected)
})
