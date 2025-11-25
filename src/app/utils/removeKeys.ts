export function stripFrontEndFields(section: any) {
  const clean: any = {};

  for (const key in section) {
    // eliminar estos campos SIEMPRE
    if (key === 'component') continue;
    if (key.startsWith('_')) continue;        // propiedades internas Angular
    if (typeof section[key] === 'function') continue;
    if (section[key]?.__proto__?.constructor?.name?.includes('Section')) continue;

    clean[key] = section[key];
  }

  return clean;
}
