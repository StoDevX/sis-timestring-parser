# CHANGELOG

## 2.3.3
- We now test the published package on Travis
- Removed babel configuration to prevent React Native from re-compiling the library

## 2.3.2
- Fix post-compilation files being in the wrong location (`/lib/src`, instead of just `/lib`)

## 2.3.1
- Fixed `{groupBy: sis}` to not overwrite the offerings if the same key is given twice

## 2.3.0
- Added new `{groupBy: sis}` optional second parameter to `convertTimeStringsToOfferings`
    - It maintains the groupings that SIS gives us, instead of re-grouping multiple times into a single day

## 2.2.13
- Fixes bundled package – I had forgotten how to publish properly

## 2.2.12
- Remove babel-plugin-object-rest-spread, as it wasn't being used
- Don't publish `.babelrc`
- Added `package-lock.json` for development

## 2.2.11
- Fix index.js file

## 2.2.10
- Same version as as 2.2.9

## 2.2.9
- Some internal refactorings

## 2.2.8
- Fix wrong case in filename of `lodash/mergeWith` import

## 2.2.7
- Shrink the compiled bundle

## 2.2.6
- Put some more lodash back in

## 2.2.5
- Removed most usages of lodash
- Added code coverage

## 2.2.4
- Fix lodash pathnames

## 2.2.3
- The dependency update release (lodash@4, babel@6.4, etc.)

## 2.2.2
- Actually fix index.js importing/exporting issues

## 2.2.1
- Fix exports from the manual index.js

## 2.2.0
- Fixed embedding the location into the offering object

## 2.1.3
- Updated to Babel 6
- Did some internal shuffling

## 2.1.2
- removed the `location` field

## 2.1.1
- **Bugfix:** Revert part of 2.1.0
	- we're just going to go back to the old implementation

## 2.1.0
- **Feature:** Locations are now embedded within offerings

## 2.0.2
- **Renamed:** `findTimes` to `findTime`
- **Bugfix:** In 2.0.1, offerings would to share time objects. No longer!
	- This wasn't an issue before because something about our older use of `_.merge` created copies of the objects for us
- Updated publish script to exit as soon as any step errors

## 2.0.1
- Updated Babel
- Removed accidental dependency on the *entirety* of lodash

## 2.0.0
- **Renamed:** `checkCourseTimeConflicts` -> `checkCoursesForTimeConflicts`
- **Renamed:** `checkScheduleTimeConflicts` -> `findScheduleTimeConflicts`
- **Added:** `checkScheduleForTimeConflicts` - returns true if there is a time conflict and false otherwise
- Finished adding tests for the helper functions
- Updated 6to5

## 1.0.9
- Update lodash
- Write a script to automatically update the index.js file

## 1.0.8
- Fix camel-casing in `cleanTimeStringSegment`

## 1.0.7
- Add .npmignore

## 1.0.6
- Add `.npmignore` so we don't publish extra files
