//#region src/dotinto.ts
function into(fn, ...args) {
	return fn(this, ...args);
}
Object.defineProperty(Object.prototype, "into", {
	value: into,
	enumerable: false,
	configurable: false,
	writable: false
});
//#endregion
export {};

//# sourceMappingURL=dotinto.mjs.map