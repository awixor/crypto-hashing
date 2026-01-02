/**
 * Unified hashing utility using @noble/hashes
 * Supports multiple hash algorithms from a single package
 */

import { sha256 } from "@noble/hashes/sha2";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

/**
 * Hash input using Keccak-256
 * @param input - The input string to hash
 * @returns The hexadecimal hash string
 */
export function hashKeccak256(input: string): string {
  const inputBytes = new TextEncoder().encode(input);
  const hash = keccak_256(inputBytes);

  return bytesToHex(hash);
}

/**
 * Hash input using SHA-256
 * @param input - The input string to hash
 * @returns The hexadecimal hash string
 */
export function hashSHA256(input: string): string {
  const inputBytes = new TextEncoder().encode(input);
  const hash = sha256(inputBytes);

  return bytesToHex(hash);
}
