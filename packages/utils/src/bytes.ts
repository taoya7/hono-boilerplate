import { isEmpty } from 'lodash'

const BYTE = 1
const KB = BYTE * 1024
const MB = KB * 1024
const GB = MB * 1024
const TB = GB * 1024
const PB = TB * 1024
const regx = /^(-?(?:\d+)?\.?\d+)(b|kb|mb|gb|tb|pb)$/i

export function parseBytes(value: string | number): number | undefined {
  if (isEmpty(value))
    return

  const str = String(value)
  const matches = str.match(regx)

  if (!matches)
    return

  const num = Number.parseFloat(matches[1])
  const type = matches[2].toLowerCase()

  switch (type) {
    case 'pb':
      return num * PB

    case 'tb':
      return num * TB

    case 'gb':
      return num * GB

    case 'mb':
      return num * MB

    case 'kb':
      return num * KB

    case 'b':
      return num * BYTE
  }
}

export function bytes(size: string): number | undefined {
  return parseBytes(size)
}

export function formatBytes(value: string | number): string {
  const mag = Math.abs(Number(value))
  let unit: string
  let size: number | string

  if (mag >= PB) {
    unit = 'PB'
    size = mag / PB
  }
  else if (mag >= TB) {
    unit = 'TB'
    size = mag / TB
  }
  else if (mag >= GB) {
    unit = 'GB'
    size = mag / GB
  }
  else if (mag >= MB) {
    unit = 'MB'
    size = mag / MB
  }
  else if (mag >= KB) {
    unit = 'KB'
    size = mag / KB
  }
  else {
    unit = 'B'
    size = mag / BYTE
  }

  if (String(size).includes('.'))
    size = size.toFixed(1)

  return size + unit
}


/**
 * 将字节转换为人类可读的字符串以供显示
 *
 * @param bytes filesize in bytes
 * @returns Human readable filesize as a string
 */
export function bytesToHumanReadable(bytes: number | undefined) {
  if (!bytes) {
    return "0 Bytes";
  }

  const out = ("0".repeat((bytes.toString().length * 2) % 3) + bytes).match(
    /.{3}/g
  );

  if (!out || bytes < 1000) {
    return bytes + " Bytes";
  }

  const f = (out[1] ?? "").substring(0, 2);
 
  return `${Number(out[0])}${f === "00" ? "" : `.${f}`} ${"  kMGTPEZY"[out.length]
    }B`;
}