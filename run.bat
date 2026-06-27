@echo off
title Unicorn TV Control Panel
echo =====================================================================
echo                     UNICORN TV STREAMING PLAYER
echo =====================================================================
echo.
echo [1/3] Checking Node.js dependencies...
if not exist node_modules (
    echo Dependencies not found. Installing Express server...
    call npm install
) else (
    echo Dependencies are already installed.
)
echo.
echo [2/3] Opening Unicorn TV in your default browser...
start http://localhost:3000
echo.
echo [3/3] Starting Express stream delivery server...
echo.
node server.js
pause
