# ux-proto-playground
This is the master file for designers to create prototypes using our relevant UI libraries.

## Deployment

This project uses a **custom GitHub Actions workflow** for deployment to GitHub Pages. 

### Setup (One-time)

To prevent duplicate deployments, disable automatic GitHub Pages deployment:

1. Go to repository **Settings** → **Pages**
2. Under **"Build and deployment"** → **"Source"**, select **"GitHub Actions"**
3. This ensures only the custom workflow (`.github/workflows/deploy.yml`) handles deployment

### Why Custom Deployment?

- **Build process required**: TypeScript compilation and Vite bundling
- **Environment variables**: Sets `VITE_BASE_PATH=/ux-proto-playground/` for correct routing
- **Private npm registry**: Authenticates with Flexport's npm registry for `@ffa/latitude-typescript`

The app is automatically deployed to `https://nbilbao-ux.github.io/ux-proto-playground/` when you push to `main` or `settings-exploration-poc` branches. 
