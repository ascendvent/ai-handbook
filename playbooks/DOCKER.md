--- ai-handbook/PLAYBOOKS/DOCKER.md
🧪 MANDATORY Testing Protocol (NO EXCEPTIONS)

Clean Docker Build Requirement:
# MANDATORY for ALL code changes (NEVER use restart)
docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up -d --force-recreate

🐳 Docker-based Development and Deployment
Development

Local builds use docker-compose for full stack simulation
Services include frontend, backend, Firebase emulator, and PostgreSQL
All local builds must be clean
⚠️ CRITICAL: Rebuild vs Restart Decision Matrix

Change Type	Required Action	Reason
Code changes (TypeScript, server, client)	REBUILD	Code must be recompiled/bundled
Environment variables	REBUILD	New vars need container restart with rebuild
Package.json dependencies	REBUILD	Dependencies must be installed
Docker configuration	REBUILD	Container structure changed
Database schema	Restart only	Database runs independently
Config files only	Restart only	No code compilation needed
🚫 NEVER use docker-compose restart for code changes - it won't apply your changes!

✅ Local clean build sequence (MANDATORY for code changes)

docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up -d --force-recreate
📊 Post-Rebuild Verification Protocol

After every rebuild, MUST verify changes took effect:

# 1. Check all services are healthy
docker-compose ps

# 2. Verify health endpoint
curl -sf http://localhost:3000/api/health

# 3. Check app logs for startup messages
docker-compose logs app --tail=20

# 4. Check database logs for connection health
docker-compose logs postgres --tail=10

# 5. Look for your new debug logs/changes
docker-compose logs app | grep -i "your-new-feature"
🔍 Log Monitoring During Development

Always monitor logs during testing to catch issues early:

# Monitor real-time logs for both services
docker-compose logs -f app postgres

# Filter out health check noise
docker-compose logs app | grep -v "GET /api/health"

# Check for authentication/database errors
docker-compose logs app | grep -i "error\|auth\|database"

# Verify database connections
docker-compose logs postgres | grep -i "connection\|error"

