@echo off
title KALADARSHAN - Interactive Indian Art Map (CLA-I Task 2)
color 0B

echo =====================================================================
echo                KALADARSHAN (कला दर्शन)
echo         Interactive Digital Map of Indian Art & Heritage
echo                 Semester 5 CLA-I Task 2
echo =====================================================================
echo.

cd /d "%~dp0task-2"

if not exist "node_modules" (
    echo [INFO] First run detected. Installing dependencies for Task 2...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed. Please check internet connection.
        pause
        exit /b 1
    )
)

echo [INFO] Starting Vite interactive art map on http://localhost:5173 ...
echo [INFO] Press Ctrl+C in this window anytime to stop the server.
echo.

start "" "http://localhost:5173"

call npm run dev -- --port 5173
pause
