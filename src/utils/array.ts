interface IArray {
  [index: string]: string | string[];
}

export const filteredListByKey = <T extends IArray, O extends keyof T>(arr: T[], key: O, target: string): T[] =>
  arr.filter((item) => item[key] !== target);

export const sortDescend = <T extends IArray, O extends keyof T>(arr: T[], key: O): T[] =>
  [...arr].sort((a, b) => (a[key] > b[key] ? -1 : b[key] > a[key] ? 1 : 0));

export const sortAscend = <T extends IArray, O extends keyof T>(arr: T[], key: O): T[] =>
  [...arr].sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
