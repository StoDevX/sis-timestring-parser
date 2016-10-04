// Clean a timestring segment by uppercasing and trimming it.
export default function cleanTimestringSegment(segment) {
	const uppercased = segment.toUpperCase()
	const trimmed = uppercased.trim()
	return trimmed
}
