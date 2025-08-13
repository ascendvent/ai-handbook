# Vite Build Configuration Playbook

**Purpose**: Optimized Vite configuration patterns for React + TypeScript applications with proper bundling, development experience, and production builds in Ascendvent projects.

## Core Vite Configuration

### Basic vite.config.ts
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/pages': path.resolve(__dirname, './src/pages'),
    },
  },
  server: {
    port: 3000,
    host: true, // for Docker compatibility
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
```

### Environment-Specific Configuration
```typescript
// vite.config.ts with environment handling
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    build: {
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
    },
    define: {
      __DEV__: mode === 'development',
      __PROD__: mode === 'production',
    },
  }
})
```

## Development Optimization

### Hot Module Replacement Setup
```typescript
// vite.config.ts - HMR optimization
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better DX
      fastRefresh: true,
    }),
  ],
  server: {
    hmr: {
      overlay: true, // Show errors in overlay
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dialog',
    ],
  },
})
```

### TypeScript Integration
```typescript
// vite.config.ts - TypeScript optimization
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // Automatically use tsconfig paths
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
})
```

## Production Build Optimization

### Bundle Splitting Strategy
```typescript
// vite.config.ts - Advanced chunking
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunk for stable dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@radix-ui')) {
              return 'radix-vendor'
            }
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            return 'vendor'
          }
          
          // Feature-based chunks
          if (id.includes('/src/components/ui/')) {
            return 'ui-components'
          }
          if (id.includes('/src/pages/')) {
            return 'pages'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

### Asset Optimization
```typescript
// vite.config.ts - Asset handling
export default defineConfig({
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  assetsInclude: ['**/*.woff', '**/*.woff2'],
})
```

## Plugin Configuration

### Essential Plugins Setup
```typescript
// vite.config.ts - Plugin configuration
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    
    // Bundle analyzer (dev only)
    process.env.ANALYZE && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    }),
    
    // PWA support
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Ascendvent App',
        short_name: 'App',
        description: 'Ascendvent Application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ].filter(Boolean),
})
```

## Environment Variables

### Environment File Structure
```bash
# .env.local (local development)
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your-dev-key
VITE_ENV=development

# .env.staging
VITE_API_URL=https://api-staging.example.com
VITE_FIREBASE_API_KEY=your-staging-key
VITE_ENV=staging

# .env.production
VITE_API_URL=https://api.example.com
VITE_FIREBASE_API_KEY=your-prod-key
VITE_ENV=production
```

### Type-Safe Environment Variables
```typescript
// src/env.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_ENV: 'development' | 'staging' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Runtime validation
export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  ENV: import.meta.env.VITE_ENV || 'development',
} as const

// Validate required environment variables
const requiredEnvVars = ['VITE_FIREBASE_API_KEY'] as const

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}
```

## Testing Integration

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Test Setup File
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock environment variables
vi.mock('../env', () => ({
  env: {
    API_URL: 'http://localhost:8000',
    FIREBASE_API_KEY: 'test-key',
    ENV: 'test',
  },
}))

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

## Build Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:staging": "tsc && vite build --mode staging",
    "build:analyze": "ANALYZE=true vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  }
}
```

## Docker Integration

### Multi-stage Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
```nginx
# nginx.conf
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Performance Monitoring

### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Preview production build
npm run preview
```

### Performance Metrics
```typescript
// src/lib/performance.ts
export function measurePerformance() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      console.log('Performance Metrics:', {
        FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        LCP: navigation.loadEventEnd - navigation.loadEventStart,
        TTFB: navigation.responseStart - navigation.requestStart,
      })
    })
  }
}
```

## Best Practices

### DO
- Use environment-specific configurations
- Implement proper bundle splitting
- Enable source maps for debugging
- Use TypeScript path aliases consistently
- Monitor bundle size regularly
- Implement proper error boundaries
- Use lazy loading for large components

### DON'T
- Include sensitive data in environment variables
- Skip TypeScript checking in build process
- Bundle everything into a single chunk
- Ignore build warnings
- Use synchronous imports for large dependencies
- Commit .env files with secrets

## Troubleshooting Common Issues

### Build Failures
```typescript
// Common fixes for build issues
export default defineConfig({
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@vite/client', '@vite/env'],
  },
})
```

### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Integration with Other Playbooks
- **REACT-HOOKS.md**: Optimizing React component builds and HMR
- **TYPESCRIPT.md**: TypeScript compilation and type checking integration
- **TAILWIND.md**: CSS optimization and purging strategies
- **TESTING.md**: Vitest configuration and test environment setup
- **DOCKER.md**: Container builds and nginx serving strategies