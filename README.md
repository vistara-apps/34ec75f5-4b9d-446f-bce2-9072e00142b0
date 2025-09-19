# FairPlay Draws

A blockchain-verified fair draws application built as a Base Mini App. Create and participate in transparent, provably fair draws with complete data traceability on the blockchain.

## Features

- **Secure Draw Creation**: Define draw parameters with blockchain verification
- **Blockchain-Verified Randomness**: Uses Chainlink VRF for provably fair winner selection
- **Auditable Data Trails**: Complete transparency with immutable blockchain records
- **Cross-Platform Integration**: API/SDK for embedding in other applications
- **Base Wallet Integration**: Seamless integration within the Base ecosystem

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network, OnchainKit, MiniKit
- **Randomness**: Chainlink VRF (Verifiable Random Function)
- **Wallet**: Base Wallet integration

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fairplay-draws.git
   cd fairplay-draws
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your OnchainKit API key and other required variables.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Required for Base integration
- `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL (optional)
- `CHAINLINK_VRF_COORDINATOR`: Chainlink VRF coordinator address
- `CHAINLINK_VRF_KEY_HASH`: VRF key hash for randomness
- `CHAINLINK_VRF_SUBSCRIPTION_ID`: VRF subscription ID

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── DrawCard.tsx       # Draw display component
│   ├── CreateDrawForm.tsx # Draw creation form
│   ├── ParticipantList.tsx# Participant management
│   └── ...
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants
└── public/               # Static assets
    └── manifest.json     # Base Mini App manifest
```

## Data Model

### Draw Entity
- `drawId`: Unique identifier
- `creatorAddress`: Creator's wallet address
- `title`, `description`: Draw details
- `startTime`, `endTime`: Draw timing
- `status`: Current draw status
- `prizeDetails`: Prize information
- `rules`: Entry requirements and rules
- `blockchainTxHash`: Creation transaction hash
- `vrfProofTxHash`: Randomness verification hash
- `winnerAddress`: Winner's address (when completed)

### Entry Entity
- `entryId`: Unique identifier
- `drawId`: Associated draw
- `participantAddress`: Participant's wallet address
- `entryTimestamp`: Entry submission time
- `eligibilityStatus`: Eligibility verification
- `blockchainTxHash`: Entry transaction hash
- `isWinner`: Winner status

## Business Model

**Micro-transactions**: Pay-per-draw creation (0.01 ETH) and small participant entry fees. This model ensures accessibility while generating revenue from both creators and participants.

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Self-hosted

3. **Configure environment variables** in your deployment platform

4. **Set up webhook endpoints** for frame updates (if needed)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact us at support@fairplay-draws.com.
