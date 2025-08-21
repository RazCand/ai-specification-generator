# AI Specification Generator

AI-powered procurement specification generator for Queensland councils, built with Next.js and deployed on Vercel.

## Features

- 🤖 **AI-Powered Generation**: Uses GPT-4 to create comprehensive specifications
- ⚡ **Fast & Responsive**: Built with Next.js for optimal performance
- 🏛️ **Government Ready**: Designed for Australian council procurement standards
- 📱 **Mobile Friendly**: Responsive design works on all devices
- 🔒 **Secure**: Government-grade security and compliance
- 📊 **Multiple Exports**: PDF, Word, and HTML formats

## Quick Start

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-spec-generator)

### 2. Set Environment Variables

In your Vercel dashboard, add these environment variables:

```env
POSTGRES_URL="your-vercel-postgres-url"
POSTGRES_PRISMA_URL="your-prisma-url"
POSTGRES_URL_NON_POOLING="your-non-pooling-url"
OPENAI_API_KEY="your-openai-api-key"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-app.vercel.app"
```

### 3. Set Up Database

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Create database
vercel postgres create

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
```

## Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/ai-spec-generator
cd ai-spec-generator

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

## Technology Stack

- **Framework**: Next.js 14
- **Database**: Vercel Postgres
- **ORM**: Prisma
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Next.js pages and API routes
├── lib/                # Utility libraries
├── services/           # Business logic
├