import convertTimeStringsToOfferings from '../convert-time-strings-to-offerings'

test('turns the timestrings into semi-usable objects', () => {
	let course = {times: ['MT 0100-0400PM', 'MF 0905-1000']}

	let expected = [
		{day: 'Mo', times: [{start:1300, end:1600}, {start:905, end:1000}]},
		{day: 'Tu', times: [{start:1300, end:1600}]},
		{day: 'Fr', times: [{start:905,  end:1000}]},
	]

	let actual = convertTimeStringsToOfferings(course)

	expect(actual).toEqual(expected)
})

test('correctly joins different times on the same day', () => {
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

test('returns different time objects for different days', () => {
	let actual = convertTimeStringsToOfferings({times: ['MF 0905-1000']})

	expect(actual[0].times[0]).not.toBe(actual[1].times[0])
})

test('joins locations with times offered', () => {
	let info = {times: ['MF 0905-1000'], locations: ['TOH 103']}

	let expected = [
		{day: 'Mo', times: [{start:905, end:1000}], location: 'TOH 103'},
		{day: 'Fr', times: [{start:905, end:1000}], location: 'TOH 103'},
	]

	let actual = convertTimeStringsToOfferings(info)

	expect(actual).toEqual(expected)
})

test('can join together multiple location/time pairs', () => {
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

test('throws an error when an invalid groupBy parameter is passed', () => {
	let info = {
		times: ['MF 0905-1000', 'W 1000-1155'],
		locations: ['TOH 103', 'RNS 203'],
	}

	const actual = () => convertTimeStringsToOfferings(info, {groupBy: '--invalid--'})

	expect(() => actual()).toThrow('"--invalid--" is not a valid groupBy mode')
})

describe('in groupBy=day mode', () => {
	test('groups the "times" by "day" (of the week)', () => {
		let course = {times: ['MT 0100-0400PM', 'MF 0905-1000']}

		let expected = [
			{day: 'Mo', times: [{start:1300, end:1600}, {start:905, end:1000}]},
			{day: 'Tu', times: [{start:1300, end:1600}]},
			{day: 'Fr', times: [{start:905,  end:1000}]},
		]

		let actual = convertTimeStringsToOfferings(course, {groupBy: 'day'})

		expect(actual).toEqual(expected)
	})
})

describe('in groupBy=sis mode', () => {
	test('retains the day groupings given by SIS', () => {
		let course = {times: ['MT 0100-0400PM', 'MF 0905-1000']}

		let expected = [
			{days: ['Mo', 'Tu'], times: [{start:1300, end:1600}]},
			{days: ['Mo', 'Fr'], times: [{start:905,  end:1000}]},
		]

		let actual = convertTimeStringsToOfferings(course, {groupBy: 'sis'})

		expect(actual).toEqual(expected)
	})

	test('embeds locations correctly', () => {
		let course = {
			times: ['MT 0100-0400PM', 'MF 0905-1000'],
			locations: ['TOH 103', 'RNS 203'],
		}

		let expected = [
			{days: ['Mo', 'Tu'], times: [{start:1300, end:1600}], location: 'TOH 103'},
			{days: ['Mo', 'Fr'], times: [{start:905,  end:1000}], location: 'RNS 203'},
		]

		let actual = convertTimeStringsToOfferings(course, {groupBy: 'sis'})

		expect(actual).toEqual(expected)
	})

	test('does not overwrite the offering if the same days are given again', () => {
		let course = {times: ['MT 0100-0400PM', 'MT 0905-1000']}

		let expected = [
			{days: ['Mo', 'Tu'], times: [
				{start:1300, end:1600},
				{start:905,  end:1000},
			]},
		]

		let actual = convertTimeStringsToOfferings(course, {groupBy: 'sis'})

		expect(actual).toEqual(expected)
	})

	test('does not overwrite the offering if the same days are given in a different order', () => {
		let course = {
			times: ['MT 0100-0400PM', 'TM 0905-1000'],
			locations: ['Place 1', 'Place 2'],
		}

		let expected = [
			{days: ['Mo', 'Tu'], times: [{start:1300, end:1600}], location: 'Place 1'},
			{days: ['Tu', 'Mo'], times: [{start:905,  end:1000}], location: 'Place 2'},
		]

		let actual = convertTimeStringsToOfferings(course, {groupBy: 'sis'})

		expect(actual).toEqual(expected)
	})
})
