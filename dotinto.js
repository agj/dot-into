'use strict';

var fp = Function.prototype;
var toArray = fp.bind.call(fp.call, [].slice);

function into(fn) {
	if (arguments.length <= 1) {
		return fn(this);
	} else {
		var args = toArray(arguments);
		args[0] = this;
		return fn.apply(null, args);
	}
}

module.exports = {
	into: into,
	install: function (target) {
		target = target || Object.prototype;
		Object.defineProperty(target, 'into', {
			value: into,
			enumerable: false,
			configurable: true,
			writable: true
		});
	}
};
