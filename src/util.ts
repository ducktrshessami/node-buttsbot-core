import { Defaults } from "./index.js";

export function chance(n: number): boolean {
    return Math.random() < (1 / n);
}

/**
 * Solely in terms of frequency
 */
export function shouldButtify(frequency: number = Defaults.frequency): boolean {
    return chance(frequency);
}
