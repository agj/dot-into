
var fp = Function.prototype;
var toArray = fp.bind(fp.call, [].slice);

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
		target.into = into;
	}
};
