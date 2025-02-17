export function removeUndefinedKeysFromFilter(obj: any) {
  Object.entries(obj).forEach(([k, v]) => {
    if (!v) {
      delete obj[k];
    }
  });

  return obj;
}
