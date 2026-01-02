# Crypto Hashing

A modern web application for practicing cryptographic methods and hashing mechanisms. Built with Next.js, this tool provides an interactive interface for hashing text/files and working with digital signatures.

🔗 **Live Demo:** [crypto-hashing.vercel.app](https://crypto-hashing.vercel.app)

## Features

### 🔐 Hash Visualizer
- **Keccak-256** hashing for text and files
- **SHA-256** hashing for text and files
- Support for both text input and file upload
- Real-time hash generation
- Copy to clipboard functionality

### ✍️ Digital Signature Process
Complete workflow for Ethereum-style digital signatures:

1. **Hash the Message** - Generate Keccak-256 hash of your message
2. **Sign the Message** - Sign the hash with a private key using ECDSA
   - Generate random private keys
   - View signature components (r, s, recovery bit)
   - Display v values (Legacy, EIP-155)
   - Show yParity for EIP-1559/EIP-2930 transactions
3. **Recover Public Key** - Recover the public key from signature and recovery bit
4. **Generate Address** - Convert public key to Ethereum address
5. **Verify Signature** - Verify signatures against message hash and public key

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Cryptography:**
  - [@noble/hashes](https://github.com/paulmillr/noble-hashes) - Fast, audited hash implementations
  - [@noble/secp256k1](https://github.com/paulmillr/noble-secp256k1) - ECDSA signing and verification
- **React:** 19.2.3


1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/          # React components
│   ├── icons/          # Icon components
│   ├── CopyButton.tsx   # Clipboard copy button
│   ├── DigitalSignature.tsx
│   ├── FileInput.tsx
│   ├── Footer.tsx
│   ├── GenerateAddress.tsx
│   ├── HashMessage.tsx
│   ├── HashResult.tsx
│   ├── HashVisualizer.tsx
│   ├── Navigation.tsx
│   ├── RecoverPublicKey.tsx
│   ├── SignMessage.tsx
│   ├── StepBadge.tsx
│   ├── TextInput.tsx
│   ├── Toggle.tsx
│   └── VerifySignature.tsx
├── digital-signature/   # Digital signature page
├── utils/              # Utility functions
│   ├── clipboard.ts    # Clipboard operations
│   ├── hashing.ts     # Hash functions
│   └── signature.ts   # Digital signature functions
├── layout.tsx          # Root layout
└── page.tsx            # Home page
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

## Features in Detail

### Hash Visualizer
- Input text or upload files
- Generate Keccak-256 and SHA-256 hashes
- View hash length and copy to clipboard
- Toggle between text and file input modes

### Digital Signature Workflow
- **Message Hashing:** Hash messages using Keccak-256 (Ethereum standard)
- **Signing:** ECDSA signing with secp256k1 curve
- **Key Recovery:** Recover public keys from signatures
- **Address Generation:** Convert public keys to Ethereum addresses
- **Verification:** Verify signature authenticity

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [@noble/hashes](https://github.com/paulmillr/noble-hashes) - Excellent cryptographic library
- [@noble/secp256k1](https://github.com/paulmillr/noble-secp256k1) - Secure ECDSA implementation
- [Next.js](https://nextjs.org/) - Amazing React framework

---

Made with ❤️ by [awixor](https://github.com/awixor)
