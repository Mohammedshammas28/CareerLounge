@echo off
REM Career Lounge - Installation Verification Script for Windows

echo.
echo ========================================
echo Career Lounge Installation Verifier
echo ========================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Download from: https://nodejs.org/
    goto end
) else (
    echo [OK] Node.js installed: 
    node --version
)

REM Check npm
echo.
echo Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    goto end
) else (
    echo [OK] npm installed:
    npm --version
)

REM Check MongoDB (optional)
echo.
echo Checking MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] MongoDB not found locally
    echo You can use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas
) else (
    echo [OK] MongoDB installed:
    mongod --version
)

REM Check Backend directory
echo.
echo Checking Backend directory...
if exist "Backend\package.json" (
    echo [OK] Backend/package.json found
) else (
    echo [ERROR] Backend/package.json not found
    goto end
)

REM Check Frontend directory
echo.
echo Checking Frontend directory...
if exist "Frontend\package.json" (
    echo [OK] Frontend/package.json found
) else (
    echo [ERROR] Frontend/package.json not found
    goto end
)

REM Check Backend .env
echo.
echo Checking Backend configuration...
if exist "Backend\.env" (
    echo [OK] Backend/.env file exists
) else (
    if exist "Backend\.env.example" (
        echo [WARNING] Backend/.env not found, but .env.example exists
        echo Run: cd Backend ^&^& cp .env.example .env
    ) else (
        echo [ERROR] Backend/.env.example not found
    )
)

REM Check .gitignore files
echo.
echo Checking .gitignore files...
if exist ".gitignore" (
    echo [OK] Root .gitignore found
) else (
    echo [WARNING] Root .gitignore not found
)

if exist "Backend\.gitignore" (
    echo [OK] Backend/.gitignore found
) else (
    echo [WARNING] Backend/.gitignore not found
)

if exist "Frontend\.gitignore" (
    echo [OK] Frontend/.gitignore found
) else (
    echo [WARNING] Frontend/.gitignore not found
)

REM Summary
echo.
echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Install Backend dependencies:
echo    cd Backend
echo    npm install
echo.
echo 2. Configure Backend:
echo    cp .env.example .env
echo    (edit .env with your settings)
echo.
echo 3. Start MongoDB:
echo    mongod
echo    (or use MongoDB Atlas cloud)
echo.
echo 4. Start Backend:
echo    cd Backend
echo    npm run dev
echo.
echo 5. In new terminal, install Frontend:
echo    cd Frontend
echo    npm install
echo.
echo 6. Start Frontend:
echo    npm run dev
echo.
echo Frontend: http://localhost:3001
echo Backend: http://localhost:5000
echo.
echo Demo Credentials:
echo Admin: admin@careerlounge.com / password123
echo User: user@careerlounge.com / password123
echo.

:end
pause
