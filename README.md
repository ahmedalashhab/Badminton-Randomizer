# Badromizer

A responsive web application for managing badminton court assignments and player randomization. Built with React, TypeScript, and Tailwind CSS.

## Features

- Player management (add, remove, mark as sitting out)
- Dynamic court setup based on number of players
- Smart player randomization for matches
- Responsive design for all devices
- Dark mode support
- Real-time player status tracking

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

## Usage

1. Add players to the system by entering their names
2. Set the number of courts you want to use
3. Click "Generate New Round" to create random matches
4. Players can be marked as sitting out for a round
5. The system automatically ensures fair distribution of playing time

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hooks

## License

MIT
