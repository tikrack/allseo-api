@echo off

title AllSEO Analysis CLI

echo ==========================================
echo        AllSEO Analysis CLI
echo ==========================================
echo.

echo Starting Node.js application...
echo.

node index.js

echo.
echo ==========================================
echo       Process Finished
echo ==========================================
echo.

if exist "reports.json" (
    echo Opening reports.json...
    start "" notepad.exe "reports.json"
) else (
    echo reports.json was not found.
)

echo.
pause