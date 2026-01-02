/**
 * Digital signature utilities using @noble/secp256k1
 * Supports ECDSA signing, public key recovery, and address generation
 */

import * as secp256k1 from "@noble/secp256k1";
import { keccak_256 } from "@noble/hashes/sha3";
import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha2";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

// Setup HMAC-SHA256 for @noble/secp256k1
secp256k1.etc.hmacSha256Sync = (key, ...msgs) => {
  const h = hmac.create(sha256, key);
  msgs.forEach((msg) => h.update(msg));

  return h.digest();
};

/**
 * Hash a message using Keccak-256
 * @param message - The message to hash
 * @returns The hexadecimal hash string
 */
export function hashMessage(message: string): string {
  const messageBytes = new TextEncoder().encode(message);
  const hash = keccak_256(messageBytes);

  return bytesToHex(hash);
}

/**
 * Sign a message hash with a private key
 * @param messageHash - The hashed message (hex string)
 * @param privateKey - The private key (hex string)
 * @returns The signature object with r, s, and recovery bit
 */
export function signMessage(
  messageHash: string,
  privateKey: string
): { signature: string; recovery: number } {
  try {
    const msgHashBytes = hexToBytes(messageHash);
    const privKeyBytes = hexToBytes(privateKey);

    const signature = secp256k1.sign(msgHashBytes, privKeyBytes);

    const signatureHex = bytesToHex(signature.toCompactRawBytes());
    const recovery = signature.recovery;

    return {
      signature: signatureHex,
      recovery: recovery,
    };
  } catch (error) {
    console.error("Signing error:", error);
    throw new Error("Failed to sign message");
  }
}

/**
 * Recover public key from signature and message hash
 * @param messageHash - The hashed message (hex string)
 * @param signature - The signature (hex string)
 * @param recovery - The recovery bit (0 or 1)
 * @returns The recovered public key (hex string, uncompressed)
 */
export function recoverPublicKey(
  messageHash: string,
  signature: string,
  recovery: number
): string {
  try {
    const msgHashBytes = hexToBytes(messageHash);
    const sigBytes = hexToBytes(signature);

    const signatureObj = secp256k1.Signature.fromCompact(sigBytes);
    const signatureWithRecovery = signatureObj.addRecoveryBit(recovery);
    const publicKeyPoint = signatureWithRecovery.recoverPublicKey(msgHashBytes);

    const publicKeyBytes = publicKeyPoint.toRawBytes(false);

    return bytesToHex(publicKeyBytes);
  } catch (error) {
    console.error("Public key recovery error:", error);
    throw new Error("Failed to recover public key");
  }
}

/**
 * Generate Ethereum-style address from public key
 * @param publicKey - The public key (hex string, uncompressed, 65 bytes)
 * @returns The Ethereum address (hex string, 20 bytes, with 0x prefix)
 */
export function publicKeyToAddress(publicKey: string): string {
  try {
    const pubKeyBytes = hexToBytes(publicKey);

    const pubKeyWithoutPrefix = pubKeyBytes.slice(1);

    const hash = keccak_256(pubKeyWithoutPrefix);

    const addressBytes = hash.slice(-20);
    return "0x" + bytesToHex(addressBytes);
  } catch (error) {
    console.error("Address generation error:", error);
    throw new Error("Failed to generate address from public key");
  }
}

/**
 * Generate a random private key
 * @returns A random private key (hex string)
 */
export function generatePrivateKey(): string {
  const privateKey = secp256k1.utils.randomPrivateKey();

  return bytesToHex(privateKey);
}

/**
 * Verify a signature using a public key and message hash
 * @param messageHash - The hashed message (hex string)
 * @param signature - The signature (hex string, 64 bytes)
 * @param publicKey - The public key (hex string, uncompressed, 65 bytes)
 * @returns True if the signature is valid, false otherwise
 */
export function verifySignature(
  messageHash: string,
  signature: string,
  publicKey: string
): boolean {
  try {
    const msgHashBytes = hexToBytes(messageHash);
    const sigBytes = hexToBytes(signature);
    const pubKeyBytes = hexToBytes(publicKey);

    return secp256k1.verify(sigBytes, msgHashBytes, pubKeyBytes);
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}
