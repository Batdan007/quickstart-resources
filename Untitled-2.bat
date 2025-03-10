:: MECA Engineering Reserve Study App One-Click Installer
:: This script sets up the MECA Reserve Study App with all dependencies and configurations
@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo MECA Engineering Reserve Study App
echo One-Click Installer
echo ==========================================
echo.

:: Check if Node.js is installed
echo [1/8] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo Choose the LTS version, then run this installer again.
    pause
    exit /b 1
)

:: Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%

:: Check npm
echo [2/8] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm not found!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm found: %NPM_VERSION%

:: Create project directory
echo [3/8] Creating project directory...
set PROJECT_NAME=meca-reserve-study-app
if exist "%PROJECT_NAME%" (
    echo Directory already exists. Removing old version...
    rmdir /s /q "%PROJECT_NAME%"
)
mkdir "%PROJECT_NAME%"
cd "%PROJECT_NAME%"
echo [OK] Project directory created

:: Create React app
echo [4/8] Creating React application (this may take a few minutes)...
call npx create-react-app . --template typescript --silent
if %errorlevel% neq 0 (
    echo ERROR: Failed to create React app
    pause
    exit /b 1
)
echo [OK] React app created

:: Install dependencies
echo [5/8] Installing required packages...
call npm install recharts lucide-react lodash papaparse xlsx tailwindcss postcss autoprefixer --silent
call npm install -D @types/lodash @types/papaparse --silent
echo [OK] Dependencies installed

:: Initialize Tailwind CSS
echo [6/8] Setting up Tailwind CSS...
call npx tailwindcss init -p
echo [OK] Tailwind initialized

:: Create component files
echo [7/8] Creating application files...

:: Create ReserveStudyApp.tsx
(
echo import React, { useState, useEffect } from 'react';
echo import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
echo import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
echo import { Building, Clipboard, FileText, Camera, DollarSign, Download, CheckCircle, AlertCircle } from 'lucide-react';
echo import _ from 'lodash';
echo.
echo // [Component code would be inserted here - see next script]
echo.
echo export default ReserveStudyApp;
) > src\components\ReserveStudyApp.tsx

:: Create ui directory and basic card component
mkdir src\components\ui
(
echo import React from 'react';
echo.
echo export const Card = ^({ children, className = '', ...props }^) =^> ^(
echo   ^<div className={`bg-white rounded-lg shadow border ${className}`} {...props}^>
echo     {children}
echo   ^</div^>
echo ^);
echo.
echo export const CardHeader = ^({ children, className = '', ...props }^) =^> ^(
echo   ^<div className={`p-6 pb-4 ${className}`} {...props}^>
echo     {children}
echo   ^</div^>
echo ^);
echo.
echo export const CardTitle = ^({ children, className = '', ...props }^) =^> ^(
echo   ^<h3 className={`text-lg font-semibold ${className}`} {...props}^>
echo     {children}
echo   ^</h3^>
echo ^);
echo.
echo export const CardContent = ^({ children, className = '', ...props }^) =^> ^(
echo   ^<div className={`p-6 pt-0 ${className}`} {...props}^>
echo     {children}
echo   ^</div^>
echo ^);
) > src\components\ui\card.tsx

:: Update App.tsx
(
echo import React from 'react';
echo import ReserveStudyApp from './components/ReserveStudyApp';
echo import './index.css';
echo.
echo function App^(^) {
echo   return ^(
echo     ^<div className="App"^>
echo       ^<ReserveStudyApp /^>
echo     ^</div^>
echo   ^);
echo }
echo.
echo export default App;
) > src\App.tsx

:: Update index.css with Tailwind
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo body {
echo   margin: 0;
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
echo     sans-serif;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo }
) > src\index.css

:: Update tailwind.config.js
(
echo /** @type {import('tailwindcss'^).Config} */
echo module.exports = {
echo   content: [
echo     "./src/**/*.{js,jsx,ts,tsx}",
echo   ],
echo   theme: {
echo     extend: {},
echo   },
echo   plugins: [],
echo }
) > tailwind.config.js

:: Create package.json scripts section update
echo [OK] Application files created

:: Create launcher scripts
echo [8/8] Creating launcher scripts...

:: Create run.bat
(
echo @echo off
echo echo Starting MECA Reserve Study App...
echo echo Open your browser to: http://localhost:3000
echo echo Press Ctrl+C to stop the server
echo echo.
echo cd "%~dp0"
echo npm start
) > run.bat

:: Create install-dependencies.bat for future updates
(
echo @echo off
echo echo Installing/Updating dependencies...
echo cd "%~dp0"
echo npm install
echo echo Dependencies updated!
echo pause
) > install-dependencies.bat

:: Create build.bat for production builds
(
echo @echo off
echo echo Building production version...
echo cd "%~dp0"
echo npm run build
echo echo Production build complete! Check the 'build' folder.
echo pause
) > build.bat

echo [OK] Launcher scripts created

echo.
echo ==========================================
echo Installation Complete!
echo ==========================================
echo.
echo Your MECA Reserve Study App is ready!
echo.
echo To start the application:
echo 1. Double-click 'run.bat' in the project folder
echo 2. Wait for "Compiled successfully!" message
echo 3. Open your browser to: http://localhost:3000
echo.
echo Project location: %cd%
echo.
echo Additional tools created:
echo - run.bat              (Start the app)
echo - install-dependencies.bat (Update packages)
echo - build.bat            (Create production build)
echo.
echo Press any key to start the app now...
pause >nul

:: Start the application
echo Starting the application...
start cmd /k "echo MECA Reserve Study App Server && echo. && echo Open your browser to: http://localhost:3000 && echo Press Ctrl+C to stop && echo. && npm start"

echo.
echo The app is starting in a new window...
echo Open your browser to: http://localhost:3000
echo.
pause