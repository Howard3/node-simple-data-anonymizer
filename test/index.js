"use strict";

var sda = require('../index'),
	expect = require('chai').expect;

describe('simple data anonymizer', function () {
	describe('#string', function () {
		var stringAnonmizer = sda.string;

		describe('invalid type testing', function () {
			[true, 1, 1.05, ['foobar'], {foo:'bar'} ].forEach(function(type_to_check) {
				it('should throw a TypeError when a "' + typeof type_to_check + '" is provided as a string', function () {
					expect(stringAnonmizer.bind(null, type_to_check, 1, -1)).to.throw(
						'The first argument `string_to_anonimize` should be a string!'
					)
				})
			});
		});

		describe('string testing', function () {
			var string_configurations_to_test = [
				{
					string: 'foobar@gmail.com',
					beginning: 2,
					end: ['@', '-'],
					expect: 'fo****@gmail.com'
				},
				{
					string: '+15551231234',
					beginning: ['-', 3],
					end: -4,
					expect: '+15*****1234'
				},
				{
					string: 'foobar',
					beginning: 2,
					end: -2,
					expect: 'fo**ar'
				},
				{
					string: 'some@email.com',
					beginning: '@',
					end: -4,
					expect: 'some@*****.com'
				},
				{
					string: 'complete miss',
					beginning: '---',
					end: '---',
					expect: 'c***********s'
				},
				{
					string: 'foo@bar.com',
					beginning: '@',
					end: '@',
					expect: 'foo@bar.com'
				}
			];

			string_configurations_to_test.forEach(function(configuration) {
				it('should convert "' + configuration.string + '" to "' + configuration.expect + '" given beginning:' +
					' ' + JSON.stringify(configuration.beginning) + ' End: ' + JSON.stringify(configuration.end),
					function () {
						expect(stringAnonmizer(configuration.string, configuration.beginning, configuration.end)).to.equal(configuration.expect);
					});
			});
		});
	});
});