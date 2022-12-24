export const toAlphabet = (num: number): string => {
  let mod = num % 26,
    pow = (num / 26) | 0,
    out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
  return pow ? toAlphabet(pow) + out : out;
};

export const fromAlphabet = (str: string): number => {
  let out = 0,
    len = str.length,
    pos = len;
  while (--pos > -1) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - 1 - pos);
  }
  return out;
};

export const getColumns = (columnsCount: number): string[] => {
  const columns = new Array(columnsCount).fill("");
  return columns.map((column, index) => toAlphabet(index + 1));
};
