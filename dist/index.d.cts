declare const version = "0.1.0";
declare function buttify(content: string, word?: string, rate?: number, ignoreWords?: Array<string>, attemptLimit?: number | null): string | null;
declare namespace defaults_d_exports {
  export { frequency, rate, word };
}
declare const word = "butt";
declare const frequency = 30;
declare const rate = 10;
/**
 * Solely in terms of frequency
 */
declare function shouldButtify(frequency?: number): boolean;
export { defaults_d_exports as Defaults, buttify, shouldButtify, version };
//# sourceMappingURL=index.d.cts.map