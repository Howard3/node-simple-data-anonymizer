"use strict";

/**
 * Simple repeat function since String.prototype.repeat is not available on older versions of node.js
 *
 * @param {String} string - the string to repeat
 * @param {Number} times - the number of times to repeat the string
 * @returns {String} - the output
 */
function repeat(string, times) {
	var i, out = '';
	for (i = 0; i < times; i++ ) {
		out += string;
	}
	return out;
}

module.exports.string = function stringAnonymizer(string_to_anonymize, beginning, end) {
	var filler = '', positions = [ beginning, end ];

	if (typeof string_to_anonymize != 'string') {
		throw new TypeError('The first argument `string_to_anonimize` should be a string!');
	}

	positions = positions.map(function positionMapper (position_values, index) {

		// initialize all values as arrays, this makes dealing with them uniform later
		if (!Array.isArray(position_values)) {
			position_values = [ position_values ];
		}

		// for each of the defined values, iterate over the position values until one is matched
		return position_values.reduce(function stringPositionReducer (state, value) {
				var position;

				if (state) {
					// one of the positions ahead of us has been found, do nothing.
					return state;
				}

				if (typeof value === 'number') {
					// Numeric positions are understood as definite and will not be interpreted.
					return value;
				}

				if (index === 0) {
					// beginning position
					position = string_to_anonymize.indexOf(value);
				} else {
					// ending position
					position = string_to_anonymize.lastIndexOf(value);
				}

				if (position < 0) {
					// continue state being null since this position indicator did not match anything.
					return null;
				}
				return position + ( index === 0 ? 1 : 0 ); // add 1 to the beginning offset for slicing purposes
			}, null) || ( index === 0 ? 1 : -1 ); // default to the first/last characters only
	});

	// Define beginning & ending here based off of our findings in the forEach/reduce jobs.
	beginning = positions[ 0 ];
	end = positions[ 1 ];

	if (end < 0) {
		// if the end is a negative number (interpreted literally from the definition) add it to the string length.
		// This gives us an absolute position in the string.
		end = string_to_anonymize.length + end;
	}

	if (end - beginning > 0) {
		// For each of the characters we remove, add an asterisk
		filler = repeat('*', end - beginning);
	} else {
		// adjust the beginning position since patching the string below will end up with a duplicated joining character
		beginning -= 1;
	}

	// join the beginning string pieces, the asterisk fillers, and the end string pieces.
	return string_to_anonymize.substr(0, beginning) + filler + string_to_anonymize.substr(end);
}