export function pick(object, fields: string[]) {
  return fields.reduce((acc, v) => ({ ...acc, [v]: object[v] }), {});
}
