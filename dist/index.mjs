import { t as __exportAll } from "./rolldown-runtime-D8jQpDG7.mjs";
import { syllablize } from "fast-syllablize";
// src/.version.ts
const version = "0.1.0";
// src/defaults.ts
var defaults_exports = /* @__PURE__ */ __exportAll({
	frequency: () => 30,
	rate: () => 10,
	word: () => word
});
const word = "butt";
// src/util.ts
function chance(n) {
	return Math.random() < 1 / n;
}
/**
* Solely in terms of frequency
*/
function shouldButtify(frequency$1 = 30) {
	return chance(frequency$1);
}
// src/buttify.ts
const NonWordPattern = /(https?:\/\/(?:www\.)?[-A-Z0-9@:%._\+~#=]{1,256}(?:\.[A-Z0-9()]{1,6})?\b(?:[-A-Z0-9()@:%_\+.~#?&\/=]*)|<?(?:a?:?\w{2,32}:|#|@[!&]?)\d{17,19}>?|[^A-Z]+)/gi;
const WordPattern = /^[A-Z]+$/i;
const CapsPattern = /^[A-Z]$/;
const AllCapsPattern = /^[A-Z]{2,}$/;
const PluralPattern = /[SZ]$/i;
var ContentItem = class {
	content;
	chars;
	word;
	allCaps;
	pluralChar;
	_syllables;
	_current;
	_buttified;
	constructor(content, chars) {
		this.content = content;
		this.chars = chars;
		const lastChar = this.chars[this.chars.length - 1] ?? "";
		this.word = WordPattern.test(this.chars) && !this.content.ignoreWords.includes(this.chars.toLowerCase());
		this.allCaps = this.word ? AllCapsPattern.test(this.chars) : false;
		this.pluralChar = this.word && !this.content.pluralWord && PluralPattern.test(lastChar) ? lastChar : null;
		this._syllables = this.word ? syllablize(this.chars) : null;
		this._current = this.word ? this.chars : null;
		this._buttified = false;
		this.buttify();
	}
	get syllables() {
		return this._syllables?.length ?? 0;
	}
	get buttified() {
		return this._buttified;
	}
	get length() {
		return this._current?.length ?? this.chars.length;
	}
	isWord() {
		return this.word;
	}
	buttify() {
		if (!this.isWord()) return this.chars;
		this._buttified = false;
		this._current = this._syllables.reduce((buttified, syllable, i, syllables) => {
			if (chance(this.content.rate)) {
				let word = this.content.word;
				this._buttified = true;
				if (this.pluralChar && i === syllables.length - 1) word += this.pluralChar;
				if (this.allCaps) buttified += word.toUpperCase();
				else for (let j = 0; j < word.length; j++) buttified += CapsPattern.test(syllable[j]) ? word[j].toUpperCase() : word[j];
			} else buttified += syllable;
			return buttified;
		}, "");
		return this._current;
	}
	toString() {
		return this._current ?? this.chars;
	}
};
var ButtifiedContent = class {
	original;
	word;
	rate;
	ignoreWords;
	pluralWord;
	items;
	constructor(original, word, rate, ignoreWords) {
		this.original = original;
		this.word = word;
		this.rate = rate;
		this.ignoreWords = ignoreWords;
		this.pluralWord = PluralPattern.test(word[word.length - 1] ?? "");
		this.items = original.split(NonWordPattern).reduce((items, item) => {
			if (item) items.push(new ContentItem(this, item));
			return items;
		}, new Array());
	}
	get syllables() {
		return this.items.reduce((syllables, item) => syllables + item.syllables, 0);
	}
	get buttified() {
		return this.items.some((item) => item.buttified);
	}
	get length() {
		return this.items.reduce((length, item) => length + item.length, 0);
	}
	get valid() {
		return this.buttified && this.length <= 2e3;
	}
	buttify() {
		return this.items.reduce((buttified, item) => buttified + item.buttify(), "");
	}
	toString() {
		return this.items.join("");
	}
};
function calculateMaxAttempts(rate, syllables, attemptLimit) {
	const certainAttempts = Math.ceil(Math.log(.050000000000000044) / (syllables * Math.log((rate - 1) / rate)));
	return attemptLimit ? Math.min(attemptLimit, certainAttempts) : certainAttempts;
}
function buttify(content, word$1 = word, rate$1 = 10, ignoreWords = [], attemptLimit = null) {
	const buttifiedContent = new ButtifiedContent(content, word$1, rate$1, ignoreWords);
	if (buttifiedContent.syllables < 2) return null;
	const maxAttempts = rate$1 > 1 ? calculateMaxAttempts(rate$1, buttifiedContent.syllables, attemptLimit) : 1;
	for (let i = 1; i < maxAttempts && !buttifiedContent.valid; i++) buttifiedContent.buttify();
	return buttifiedContent.valid ? buttifiedContent.toString() : null;
}
export { defaults_exports as Defaults, buttify, shouldButtify, version };

//# sourceMappingURL=index.mjs.map