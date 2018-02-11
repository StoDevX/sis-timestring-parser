# stolaf-sis-timestring-parser

[![Build Status](https://travis-ci.org/StoDevX/sis-timestring-parser.svg?branch=master)](https://travis-ci.org/StoDevX/sis-timestring-parser)

A parser to take the wierd timestrings from St. Olaf's SIS and turn them into a semi-usable format.

Example:

```js
// input
course = {times: ['MT 0100-0400PM', 'MF 0905-1000']}

convertTimeStringsToOfferings(course, {groupBy: 'day'})

// output
[
	{ day: 'Mo', times: [{ start: 1300, end: 1600 }, { start: 905, end: 1000 }] },
	{ day: 'Tu', times: [{ start: 1300, end: 1600 }] },
	{ day: 'Fr', times: [{ start: 905,  end: 1000 }] },
]
```

You can also request that the offerings be grouped like SIS does:

```js
// input
course = {times: ['MT 0100-0400PM', 'MF 0905-1000']}

convertTimeStringsToOfferings(course, {groupBy: 'sis'})

// output
[
    { days: ['Mo', 'Tu'], start: 1300, end: 1600 },
    { days: ['Mo', 'Fr'], start: 905,  end: 1000 },
]
```
