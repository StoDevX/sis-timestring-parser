import convertTimeStringsToOfferings from '../convert-time-strings-to-offerings'

test('convertTimeStringsToOfferings turns the timestrings into semi-usable objects', () => {
	let course = {times: ['MT 0100-0400PM', 'MF 0905-1000']}

	let expected = [
		{day: 'Mo', times: [{start:1300, end:1600}, {start:905, end:1000}]},
		{day: 'Tu', times: [{start:1300, end:1600}]},
		{day: 'Fr', times: [{start:905,  end:1000}]},
	]

	let actual = convertTimeStringsToOfferings(course)

	expect(actual).toEqual(expected)
})

test('convertTimeStringsToOfferings correctly joins different times on the same day', () => {
	let course = {times: ['M-Th 0100-0200PM', 'MF 0905-1000']}

	let expected = [
		{day: 'Mo', times: [{start:1300, end:1400}, {start:905, end:1000}]},
		{day: 'Tu', times: [{start:1300, end:1400}]},
		{day: 'We', times: [{start:1300, end:1400}]},
		{day: 'Th', times: [{start:1300, end:1400}]},
		{day: 'Fr', times: [{start:905,  end:1000}]},
	]

	let actual = convertTimeStringsToOfferings(course)

	expect(actual).toEqual(expected)
})

test('convertTimeStringsToOfferings returns different time objects for different days', () => {
	let actual = convertTimeStringsToOfferings({times: ['MF 0905-1000']})

	expect(actual[0].times[0]).not.toBe(actual[1].times[0])
})

test('convertTimeStringsToOfferings joins locations with times offered', () => {
	let info = {times: ['MF 0905-1000'], locations: ['TOH 103']}

	let expected = [
		{day: 'Mo', times: [{start:905, end:1000}], location: 'TOH 103'},
		{day: 'Fr', times: [{start:905, end:1000}], location: 'TOH 103'},
	]

	let actual = convertTimeStringsToOfferings(info)

	expect(actual).toEqual(expected)
})

test('convertTimeStringsToOfferings can join together multiple location/time pairs', () => {
	let info = {
		times: ['MF 0905-1000', 'W 1000-1155'],
		locations: ['TOH 103', 'RNS 203'],
	}

	let expected = [
		{day: 'Mo', times: [{start:905, end:1000}], location: 'TOH 103'},
		{day: 'Fr', times: [{start:905, end:1000}], location: 'TOH 103'},
		{day: 'We', times: [{start:1000, end: 1155}], location: 'RNS 203'},
	]

	let actual = convertTimeStringsToOfferings(info)

	expect(actual).toEqual(expected)
})
