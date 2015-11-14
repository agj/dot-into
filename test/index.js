'use strict';

var into = require('../');
var test = require('tape-catch');

function Num(value) {
	this.value = value;
}
Num.prototype.valueOf = function () { return this.value };

function increment(a) { return new Num(a + 1) };
function add(a, b, c, d) { return new Num(a + b + c + d) };

test('Installation.', function (assert) {
	assert.doesNotThrow(function () {
		into.install(Num.prototype);
	});
	assert.end();
});

test('Installed method is non-enumerable.', function (assert) {
	for (var prop in Num.prototype) {
		if (prop === 'into') throw 'Found ´into´ while enumerating.';
	}
	assert.end();
});

test('Use without parameters.', function (assert) {
	assert.equal(new Num(1).into(increment).valueOf(), 2);
	assert.end();
});

test('Use with parameters.', function (assert) {
	assert.equal(new Num(1).into(add, 1, 2, 3).valueOf(), 7);
	assert.end();
});
