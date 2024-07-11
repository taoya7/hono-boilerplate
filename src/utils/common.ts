import os from 'node:os'

export function getLocalhostAddress() {
  const interfaces = os.networkInterfaces()
  const address = Object.keys(interfaces)
    .flatMap(name => interfaces[name] ?? [])
    .filter(iface => iface?.family === 'IPv4' && !iface.internal)
    .map(iface => iface?.address)
    .filter(Boolean)
  return address
}
