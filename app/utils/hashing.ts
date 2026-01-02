/**
 * Unified hashing utility using @noble/hashes
 * Supports multiple hash algorithms from a single package
 * Can hash both strings and binary data (files)
 */

import { sha256 } from "@noble/hashes/sha2";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

type HashInput = string | Uint8Array | null;

/**
 * Hash input using Keccak-256
 * @param input - The input string or Uint8Array to hash
 * @returns The hexadecimal hash string, or empty string if input is null/empty
 */
export function hashKeccak256(input: HashInput): string {
  if (!input || (typeof input === "string" && !input.trim())) {
    return "";
  }

  try {
    const inputBytes =
      input instanceof Uint8Array ? input : new TextEncoder().encode(input);
    const hash = keccak_256(inputBytes);
    return bytesToHex(hash);
  } catch (error) {
    console.error("Keccak-256 hashing error:", error);
    return "Error occurred";
  }
}

/**
 * Hash input using SHA-256
 * @param input - The input string or Uint8Array to hash
 * @returns The hexadecimal hash string, or empty string if input is null/empty
 */
export function hashSHA256(input: HashInput): string {
  if (!input || (typeof input === "string" && !input.trim())) {
    return "";
  }

  try {
    const inputBytes =
      input instanceof Uint8Array ? input : new TextEncoder().encode(input);
    const hash = sha256(inputBytes);
    return bytesToHex(hash);
  } catch (error) {
    console.error("SHA-256 hashing error:", error);
    return "Error occurred";
  }
}

/**
 * Compute all available hashes for the given input
 * @param input - The input string or Uint8Array to hash
 * @returns An object containing all computed hashes
 */
export function computeAllHashes(input: HashInput) {
  return {
    keccak256: hashKeccak256(input),
    sha256: hashSHA256(input),
  };
}
