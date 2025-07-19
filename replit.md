# REPLIT.MD

## Overview

This is a modern web application for an Android APK distribution platform called "THE STYLE OF NEXUS". The application allows users to browse, search, and download Android applications across different categories. It features a cyberpunk-themed UI with a dark gradient background and neon accents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom cyberpunk theme variables
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Management**: Built-in session handling with connect-pg-simple
- **Development**: Hot reload with Vite integration in development mode

### Database Schema
The application uses PostgreSQL with two main tables:
- **Users**: Basic user authentication with username/password
- **Apps**: Comprehensive app metadata including name, developer, description, category, download URLs, ratings, and features

## Key Components

### Frontend Components
- **Header**: Search functionality and branding
- **HeroSection**: Main landing area with call-to-action
- **CategoryNavigation**: Filter apps by categories (games, social, productivity, media, tools)
- **FeaturedApps**: Highlighted apps section
- **AllAppsGrid**: Main app listing with sorting and view mode options
- **AppDetailsModal**: Detailed app information modal
- **Footer**: Company information and social links

### Backend Components
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **API Routes**: RESTful endpoints for app management and search
- **Middleware**: Request logging and error handling

## Data Flow

1. **App Loading**: Frontend components use React Query to fetch data from Express API endpoints
2. **Search**: Real-time search queries hit `/api/apps/search` endpoint
3. **Filtering**: Category-based filtering uses `/api/apps/category/:category` endpoint
4. **App Details**: Modal displays comprehensive app information including download links
5. **Downloads**: External download links open in new tabs (MediaFire URLs)

## External Dependencies

### Production Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Database**: Neon Database serverless PostgreSQL
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icons and React Icons (social media)
- **Utilities**: clsx, class-variance-authority for dynamic styling

### Development Tools
- **TypeScript**: Type checking and development experience
- **ESBuild**: Fast production bundling for server code
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle Kit manages schema migrations

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Startup
- Development: `npm run dev` starts both frontend and backend with hot reload
- Production: `npm run build` then `npm start` serves the built application

The application is designed to work seamlessly in Replit's environment with proper configuration for both development and production deployments.