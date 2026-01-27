# Mackenzie Costs - Legal Costs Specialist Application

## Overview

Mackenzie Costs is a full-stack web application for a legal costs specialist firm. The application serves as both a public-facing website and an administrative platform for managing case law, services, team members, and community engagement. Built with modern web technologies, it provides a comprehensive solution for legal professionals specializing in costs law.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React-based SPA using Vite for development and build tooling
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Deployment**: Designed for Node.js environments with Replit hosting support

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling
- **State Management**: TanStack Query for server state and form handling with React Hook Form
- **Styling**: Tailwind CSS with shadcn/ui component system
- **Animations**: Framer Motion for smooth user interactions
- **SEO**: React Helmet Async for dynamic meta tag management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **API Design**: RESTful endpoints with consistent error handling
- **File Uploads**: Express-fileupload middleware for document handling
- **Email**: Nodemailer integration for contact form notifications
- **External Integrations**: Discord webhook notifications for new case law

### Database Schema
The application uses Drizzle ORM with PostgreSQL, featuring these main entities:
- **Users**: Admin authentication and role management
- **Cases**: Case law database with full-text search capabilities
- **Services**: Business service offerings
- **News**: Blog/news content management
- **Contacts**: Contact form submissions
- **Community**: Discord integration settings
- **Subscriptions**: Email newsletter management
- **Team Members**: Staff profiles and credentials

## Data Flow

1. **Public Access**: Visitors can browse cases, services, and contact the firm
2. **Search & Discovery**: Advanced filtering and search across case law database
3. **Content Management**: Authenticated admins can CRUD all content types
4. **Community Integration**: Automatic Discord notifications for new case law
5. **Lead Generation**: Contact forms and newsletter subscriptions
6. **SEO Optimization**: Dynamic sitemap generation and meta tag management

## External Dependencies

### Production Dependencies
- **Database**: Neon serverless PostgreSQL
- **Email Service**: SMTP integration (configurable provider)
- **Discord**: Webhook integration for community notifications
- **Analytics**: Google Analytics 4 integration
- **CDN**: Font Awesome and Google Fonts

### Development Tools
- **Build System**: Vite with TypeScript support
- **Code Quality**: ESLint, TypeScript compiler
- **Database Management**: Drizzle Kit for migrations
- **Development Server**: Hot module replacement with Vite

## Deployment Strategy

### Environment Configuration
The application requires these environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Authentication token signing key
- `SMTP_*`: Email service configuration
- `DISCORD_WEBHOOK_URL`: Community notifications
- `GA_MEASUREMENT_ID`: Analytics tracking

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles server code for production
3. **Database Setup**: Drizzle migrations initialize schema
4. **Asset Optimization**: Automatic code splitting and minification

### Hosting Requirements
- Node.js 18+ runtime environment
- PostgreSQL database access
- File system access for temporary uploads
- HTTPS support for secure authentication

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup