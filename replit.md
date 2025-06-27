# Adam Công AI Services Landing Page

## Overview

This is a full-stack web application built to serve as a lead generation landing page for Adam Công's AI expertise services. The application features a vibrant, Khánh Hùng Academy-inspired Vietnamese landing page with dynamic animations, professional lead collection, and comprehensive service showcasing. Built with modern React frontend and Node.js/Express backend.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution in development

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Neon Database (serverless PostgreSQL)
- **Schema Location**: Shared between client and server in `/shared/schema.ts`

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Leads Table**: Lead capture system (id, name, email, createdAt, source)
- **Validation**: Zod schemas for type-safe data validation

### API Endpoints
- `POST /api/leads` - Create new lead
- `GET /api/leads` - Retrieve all leads (admin)
- `GET /api/leads/count` - Get total leads count

### Frontend Pages
- **Home Page** (`/`): Adam Công's AI services landing page with lead capture
- **Admin Page** (`/admin`): Lead management dashboard with analytics
- **404 Page**: Custom not found page

### UI Components
- Landing page sections: Hero, About, Services, Free Material, Testimonials, Contact, CTA
- Navigation components: Sticky nav with Adam Công branding, floating CTA
- Admin dashboard with lead statistics and CSV export functionality
- Khánh Hùng Academy-inspired design with vibrant colors and animations
- Complete shadcn/ui component library integration

## Data Flow

1. **Lead Capture**: Users fill out the form on the landing page
2. **Validation**: Frontend validates using Zod schemas before submission
3. **API Processing**: Express server validates and stores lead data
4. **Database Storage**: Drizzle ORM handles PostgreSQL operations
5. **Admin Access**: Dashboard displays leads with real-time updates via React Query

## External Dependencies

### Key Libraries
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **@radix-ui/**: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library

### Development Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Build tool and development server

## Deployment Strategy

### Environment Setup
- **Development**: Uses Vite dev server with HMR and Express API
- **Production**: Builds static assets and serves via Express
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend bundles to `dist/index.js` using esbuild
3. Static file serving configured for production deployment

### Deployment Configuration
- **Platform**: Configured for Replit deployment
- **Port**: 5000 (configurable)
- **Process**: `npm run dev` for development, `npm run start` for production

## Recent Changes

- **December 27, 2024**: Complete redesign with Adam Công's content and branding
  - Updated all landing page sections with Adam Công's AI services information
  - Integrated FormSubmit.co for lead collection (vantiencong1996@gmail.com)
  - Added new sections: Free Material showcase, Contact information, Why Choose
  - Implemented Khánh Hùng Academy-inspired design with vibrant animations
  - Updated Vietnamese content for AI video production, automation systems, training services
- **June 26, 2025**: Initial setup

## Features

### Lead Collection System
- Modern form with FormSubmit.co integration for email delivery
- Dual storage: FormSubmit.co + internal backend storage
- Real-time form validation with Vietnamese error messages
- Success states with animated feedback

### Content Sections
1. **Hero Section**: Adam Công branding with achievement badges
2. **About Section**: Personal introduction and mission statement  
3. **Services Section**: 4 key AI services (video production, automation, training, tools)
4. **Free Material Section**: Detailed breakdown of free AI toolkit contents
5. **Testimonials**: Customer success stories from real clients
6. **Contact Section**: Phone/email contact with "Why Choose" benefits
7. **CTA Section**: Lead collection form with compelling copy

### Admin Dashboard
- Lead analytics with today's count and total leads
- Exportable CSV functionality for lead management
- Responsive design for mobile and desktop access

## User Preferences

Preferred communication style: Simple, everyday language.