# One 2 One Love

A modern relationship app built with Vite + React and Supabase.

## ⚠️ Important: Environment Setup Required

**Before running the app**, you must configure Supabase credentials.

👉 **See [SETUP_ENVIRONMENT.md](./SETUP_ENVIRONMENT.md) for detailed setup instructions.**

## Quick Setup

1. Create a `.env` file in the root directory
2. Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Run the required SQL schemas in Supabase (see [BASE44_REMOVAL_SQL_SETUP.md](./BASE44_REMOVAL_SQL_SETUP.md))
4. Install dependencies and run

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Database Setup

After setting up environment variables, you need to run SQL schemas in Supabase:

1. **Base Tables**: Run `supabase-complete-schema.sql` (or individual schema files)
2. **Base44 Replacement Tables**: Run `supabase-base44-replacement-tables.sql` (required after base44 removal)
3. **Additional Features**: Run feature-specific schemas as needed:
   - `supabase-chat-schema.sql` - Chat functionality
   - `supabase-communities-schema.sql` - Community features
   - `supabase-milestones-schema.sql` - Milestones
   - `supabase-relationship-goals-schema.sql` - Relationship goals
   - And others as needed

See [BASE44_REMOVAL_SQL_SETUP.md](./BASE44_REMOVAL_SQL_SETUP.md) for details.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router

## Features

- User authentication (Sign up, Sign in)
- Relationship tracking (Goals, Milestones, Memories)
- Love notes system
- Community features
- Chat functionality
- Calendar integration
- And much more!

## Deployment

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for deployment instructions.