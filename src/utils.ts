import { decode, encode } from "base-64";
import { resolve } from "path-cross";

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  // eslint-disable-next-line functional/no-let
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  // eslint-disable-next-line functional/no-loop-statement, functional/no-let
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return encode(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary_string = decode(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  // eslint-disable-next-line functional/no-loop-statement, functional/no-let
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line functional/immutable-data
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export function isBase64(str: string): boolean {
  try {
    return encode(decode(str)) === str;
  } catch (err) {
    return false;
  }
}

export function rawText(str: string): string {
  if (isBase64(str)) {
    return decode(str);
  }

  return str;
}

export function textToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);

  // eslint-disable-next-line functional/no-loop-statement, functional/no-let
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    // eslint-disable-next-line functional/immutable-data
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
}

export function isParentFolder(parent: string, children: string): boolean {
  parent = resolve(parent);
  children = resolve(children);
  const pathsA = parent.split("/");
  const pathsB = children.split("/");

  return (
    parent !== children &&
    pathsA.every((value, index) => value === pathsB[index])
  );
}

export function pathEquals(a: string, b: string): boolean {
  return resolve(a) === resolve(b);
}

export function pathEqualsOrParent(path1: string, path2: string): boolean {
  return pathEquals(path1, path2) || isParentFolder(path1, path2);
}
