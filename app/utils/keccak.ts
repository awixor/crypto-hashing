/**
 * Keccak hashing utility
 */

import { keccak256 } from "js-sha3";

/**
 * Hash input using Keccak-256
 * @param input - The input string to hash
 * @returns The hexadecimal hash string
 */
export function hashKeccak256(input: string): string {
  return keccak256(input);
}
