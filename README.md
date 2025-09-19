# Challenge Creator App

A React + TypeScript application built with Vite for creating location-based challenges.

## Environment Variables

This project requires environment variables for external services. Follow these steps to set them up:

### Development Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API keys to `.env.local`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_key_here
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

3. **Never commit `.env.local`** - it's already in `.gitignore`

### Google Maps Setup

To enable location features:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
3. Add the key to your `.env.local` file as `VITE_GOOGLE_MAPS_API_KEY`

If the Google Maps API key is not set, the location panel will show a warning banner but the app will continue to function.

### Deployment

For production deployments, set the environment variables in your hosting platform's environment variables panel. Do not include actual API keys in your codebase.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Security

- API keys are never committed to the repository
- All environment variables use the `VITE_` prefix for client-side access
- `.env.local` is ignored by git to prevent accidental commits