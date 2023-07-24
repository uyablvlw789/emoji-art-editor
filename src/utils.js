/**
 *
 * @param {*} string
 * @returns array of characters
 */
export const splitEmoji = (string) =>
  [...new Intl.Segmenter().segment(string)].map((x) => x.segment);
