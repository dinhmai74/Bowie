/**
 * 0 = none    - 0 nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - 4 elements contextually close to each other
 * 2 = smaller - 8 for groups of closely related items or perhaps borders
 * 3 = small   - 12
 * 4 = medium  - 16
 * 5 = medium+ - 24
 * 6 = large   - 32 between groups of content that aren't related?
 * 7 = huge    - 48
 * 8 = massive - 64 an uncomfortable amount of whitespace
 * 9 = massive - 72 an uncomfortable amount of whitespace
 */
export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64, 72]
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
