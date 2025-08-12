--- ai-handbook/PLAYBOOKS/POSTGRES.md
5) Database Verification Protocol
🛢 Mandatory Database Inspection for API Development

All API development and testing MUST include database verification to ensure data persistence is working correctly.

Database Verification Requirements:

Before API Implementation:

-- Verify required tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('[table_names]');

-- Check table schema matches expectations  
\d [table_name]
During API Testing:

-- Before API call - check initial state
SELECT * FROM [table_name] WHERE [condition];

-- After API call - verify data changes
SELECT * FROM [table_name] WHERE [condition];
For Each API Endpoint:

Check data before the API call
Make the API call (success response expected)
Verify database changes occurred as expected
Test data persistence across page refreshes/sessions
Database Connection:

docker-compose exec postgres psql -U ascendvent -d ascendventdb
Common Verification Queries:

-- User onboarding status
SELECT id, email, onboarding_completed_at, user_type FROM users WHERE email = '[email]';

-- Onboarding progress  
SELECT * FROM user_onboarding_progress WHERE user_id = '[user_id]';

-- Survey responses
SELECT * FROM self_doubt_responses WHERE user_id = '[user_id]';
SELECT * FROM coaching_responses WHERE user_id = '[user_id]';
API Development Rule:

If an API returns "success" but database verification shows no changes, the API is broken and must be fixed before proceeding.

🔗 MANDATORY PAIRING RULE:

API endpoint testing MUST ALWAYS be paired with database state inspection. NEVER test an API endpoint in isolation. This pairing catches authentication flow issues, middleware problems, and data persistence failures that HTTP status codes alone cannot detect.

Example of Proper API + Database Testing:

# 1. Check database state BEFORE API call
docker-compose exec postgres psql -U ascendvent -d ascendventdb -c "SELECT firebase_uid, email FROM users WHERE firebase_uid = 'test-uid';"

# 2. Test API endpoint with proper auth
curl -H "Authorization: Bearer [token]" "http://localhost:3000/api/endpoint" -v

# 3. Check database state AFTER API call  
docker-compose exec postgres psql -U ascendvent -d ascendventdb -c "SELECT * FROM relevant_table WHERE user_id = '[user_id]';"

# 4. Verify server logs show expected behavior
docker-compose logs app | tail -10

# 5. Check database logs for connection/query issues  
docker-compose logs postgres | tail -10

