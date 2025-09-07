"# PoojaPathApplication" 
# PoojaPath - Spiritual Services Platform

## Overview

PoojaPath is a comprehensive React-based web application designed to connect devotees with spiritual services. The platform allows users to book Hindu poojas (religious ceremonies), hire experienced pandits (priests), and purchase authentic puja kits and essentials. Built with modern web technologies, it provides a seamless experience for managing spiritual needs from browsing services to completing bookings and orders.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API with useReducer for global state management
- **UI Framework**: Custom component library built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with custom saffron/orange color palette for spiritual theme
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Data Fetching**: TanStack Query for server state management and caching


### Component Structure
- **Layout Components**: Navbar with responsive design and mobile hamburger menu
- **Page Components**: Home, Login, Dashboard, Booking, Cart, Poojas, Kits
- **UI Components**: Comprehensive shadcn/ui component library with custom modifications
- **Protected Routes**: ProtectedRoute wrapper for authenticated pages
- **Context Providers**: AppProvider for global state and TooltipProvider for UI enhancements

### Data Model
- **User Schema**: Simple user model with id and name fields
- **Pooja Schema**: Service definitions with pricing, duration, and descriptions
- **Pandit Schema**: Priest profiles with ratings, experience, and availability
- **Kit Schema**: Product catalog with inventory management
- **Booking Schema**: Order management for puja services
- **Cart Management**: Shopping cart functionality with quantity controls

### Authentication & Authorization
- **Simple Name-Based Login**: User enters name to create session
- **localStorage Persistence**: Session data stored locally for continuity
- **Route Protection**: Protected routes redirect unauthenticated users to login
- **No Password Required**: Simplified authentication for demonstration purposes

### Development Environment
- **Database Integration**: Drizzle ORM configured for PostgreSQL with migration support
- **Development Server**: Vite dev server with HMR and React Fast Refresh
- **TypeScript**: Full TypeScript support with strict configuration
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Modern icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling

### Data Management
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type safety
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect support

### Database and Storage
- **Neon Database**: Serverless PostgreSQL database platform
- **Drizzle Kit**: Database migration and introspection tools
- **Connect PG Simple**: PostgreSQL session store for Express

### Development Tools
- **Vite**: Next-generation frontend build tool with fast HMR
- **TypeScript**: Static type checking for improved developer experience
- **ESBuild**: Fast bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Utility Libraries
- **Date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **Wouter**: Minimalist routing library for React applications
