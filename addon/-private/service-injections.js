const SERVICE_INjECTIONS = new WeakMap();

export function setServiceInjections(fn, services = []) {
  SERVICE_INjECTIONS.set(fn, services);
}

export function getServiceInjections(fn, owner) {
  if (!SERVICE_INjECTIONS.has(fn)) {
    return [];
  }

  const services = SERVICE_INjECTIONS.get(fn);

  return services.map(service => owner.lookup(`service:${service}`));
}
