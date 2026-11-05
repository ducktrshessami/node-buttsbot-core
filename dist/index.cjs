Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// src/.version.ts
const version = "0.1.0";
// src/defaults.ts
var defaults_exports = /* @__PURE__ */ __exportAll({
	frequency: () => 30,
	rate: () => 10,
	word: () => word
});
const word = "butt";
Object.defineProperty(exports, "Defaults", {
	enumerable: true,
	get: function() {
		return defaults_exports;
	}
});
exports.version = version;

//# sourceMappingURL=index.cjs.map