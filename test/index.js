
var into = require('../into');
var assert = require('assert');

describe('Installation and use in prototype.', function () {

	function Num(value) {
		this.value = value;
	}
	Num.prototype.valueOf = function () { return this.value };

	function increment(a) { return new Num(a + 1) };
	function add(a, b, c, d) { return new Num(a + b + c + d) };

	it('Installation.', function () {
		assert.doesNotThrow(function () {
			into.install(Num.prototype);
		});
	});

	it('Installed method is non-enumerable.', function () {
		for (var prop in Num.prototype) {
			if (prop === 'into') throw 'Found ´into´ while enumerating.';
		}
	});

	it('Use without parameters.', function () {
		assert( new Num(1).into(increment) == 2 );
	});

	it('Use with parameters.', function () {
		assert( new Num(1).into(add, 1, 2, 3) == 7 );
	});

});
