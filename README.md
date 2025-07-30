# Currency Exchange Calculator with Fee Management

A Next.js 15 application that allows users to calculate currency exchange rates with configurable fees. Built using Feature-Sliced Design (FSD) architecture.

## Features

- Currency conversion with real-time exchange rates
- Fee management system (add, edit, delete fees for currency pairs)
- Persistent storage using localStorage
- Server-side currency rate fetching
- Dark/Light theme support
- Responsive design using shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Architecture**: Feature-Sliced Design (FSD)
- **State Management**: React Hooks + localStorage
- **Data Fetching**: Server Components + XML parsing
- **Form Handling**: Controlled Components

## Project Structure

Following FSD architecture:

```
src/
├── app/                 # Next.js App Router pages
├── entities/           # Business entities
│   ├── currency/      # Currency-related logic
│   └── fee/           # Fee management logic
├── features/          # User features
│   ├── currency/      # Currency conversion
│   ├── fee/           # Fee operations
│   └── theme/         # Theme switching
├── shared/            # Shared utilities
│   ├── ui/           # UI components
│   ├── lib/          # Utility functions
│   └── hooks/        # Custom hooks
└── views/             # Page compositions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Features Explained

### Currency Conversion

- Fetches current exchange rates from the European Central Bank
- Server-side XML parsing using xml2js
- Supports conversion between multiple currencies
- Applies configured fees to conversions

### Fee Management

- Add, edit, and delete fees for specific currency pairs
- Fees are stored in localStorage for persistence
- Validation to prevent duplicate fees for the same currency pair
- Default fee fallback when no specific fee is configured

### Theme Support

- System-based theme detection
- Manual theme toggle
- Persistent theme preference

## Architecture Decisions

1. **Feature-Sliced Design**: Organizes code by business domains and technical layers
2. **Server Components**: Utilized for data fetching and initial rendering
3. **Client Components**: Used for interactive features and localStorage access
4. **No Global State**: Simple state management using React hooks and localStorage
5. **No Database**: Using localStorage for persistence as per requirements
6. **No Proxy Configuration**: Direct server-side data fetching in Next.js 15

## Component Design

- **Controlled Components**: Forms are implemented as controlled components for better state management
- **Error Boundaries**: Graceful error handling for runtime errors
- **Loading States**: Suspense boundaries for smooth loading experiences


