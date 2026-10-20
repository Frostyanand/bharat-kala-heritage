@echo off
title KALA PRAVAH - Indian Art Form Exhibition (CLA-I Task 1)
color 0E

echo =====================================================================
echo                KALA PRAVAH (काल प्रवाह)
echo     Interactive Timeline of Indian Art Forms & 3D Artifacts
echo             Semester 5 CLA-I Assignment - CO1
echo =====================================================================
echo.

cd /d "%~dp0task-1"

if not exist "node_modules" (
    echo [INFO] First run detected. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed. Please check your internet connection.
        pause
        exit /b 1
    )
)

echo [INFO] Starting Next.js interactive exhibition on http://localhost:3001 ...
echo [INFO] Press Ctrl+C in this window anytime to stop the server.
echo.

start "" "http://localhost:3001"

call npm run dev -- -p 3001
pause
