@echo off
title BHARATIYA KALA HERITAGE - Master Demo Launcher
color 0E

echo =====================================================================
echo           BHARATIYA KALA HERITAGE (भारतीय कला धरोहर)
echo             Integrated Semester 5 CLA-I Demo Launcher
echo =====================================================================
echo.
echo   [1] Launch Task 1: Kala Pravah (3D Timeline & Virtual Artifacts)
echo       URL: http://localhost:3001
echo.
echo   [2] Launch Task 2: KalaDarshan (Interactive Living Heritage Map)
echo       URL: http://localhost:5173
echo.
echo   [3] Launch BOTH Tasks Simultaneously (Side-by-Side Presentation)
echo.
echo =====================================================================
set /p choice="Enter choice [1, 2, or 3]: "

if "%choice%"=="1" (
    call "%~dp0run-project.bat"
) else if "%choice%"=="2" (
    call "%~dp0run-task-2.bat"
) else if "%choice%"=="3" (
    echo [INFO] Launching Task 1 in a background terminal...
    start "Task 1: Kala Pravah" cmd /k "cd /d "%~dp0task-1" && npm run dev -- -p 3001"
    timeout /t 2 >nul
    start "" "http://localhost:3001"
    
    echo [INFO] Launching Task 2 in a background terminal...
    start "Task 2: KalaDarshan" cmd /k "cd /d "%~dp0task-2" && npm run dev -- --port 5173"
    timeout /t 2 >nul
    start "" "http://localhost:5173"
    
    echo [SUCCESS] Both Task 1 (Port 3001) and Task 2 (Port 5173) are running!
    pause
) else (
    echo [ERROR] Invalid choice. Exiting.
    pause
)
