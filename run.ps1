#!/usr/bin/env powershell

# HRIS Setup and Run Script
# This script initializes the database and starts the HRIS system

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "HRIS System - Complete Setup & Run" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found." -ForegroundColor Red
    exit 1
}

$backendDir = ".\backend"
$frontendDir = ".\frontend"

# Install backend dependencies
if (Test-Path $backendDir) {
    Write-Host ""
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location $backendDir
    npm install
    Pop-Location
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Backend directory not found" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
if (Test-Path $frontendDir) {
    Write-Host ""
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location $frontendDir
    npm install
    Pop-Location
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend directory not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT - Database Setup Required:" -ForegroundColor Yellow
Write-Host "1. PostgreSQL must be installed and running" -ForegroundColor White
Write-Host "2. Create a database named 'hris_db'" -ForegroundColor White
Write-Host "3. Update .env file with your PostgreSQL credentials" -ForegroundColor White
Write-Host ""
Write-Host "To create the database (using psql):" -ForegroundColor Cyan
Write-Host "  psql -U postgres -c 'CREATE DATABASE hris_db;'" -ForegroundColor Gray
Write-Host ""
Write-Host "To initialize the schema:" -ForegroundColor Cyan
Write-Host "  psql -U postgres -d hris_db -f backend/src/config/schema.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "Starting the HRIS application..." -ForegroundColor Yellow
Write-Host ""

# Function to start backend
function Start-Backend {
    Write-Host "Starting Backend Server..." -ForegroundColor Cyan
    Push-Location $backendDir
    npm start
    Pop-Location
}

# Function to start frontend
function Start-Frontend {
    Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
    Push-Location $frontendDir
    npm start
    Pop-Location
}

# Start both servers in parallel
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in background job
$backendJob = Start-Job -ScriptBlock {
    Set-Location "$using:backendDir"
    npm start
} -Name "HRIS-Backend"

# Start frontend in background job
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "$using:frontendDir"
    npm start
} -Name "HRIS-Frontend"

Write-Host "✓ Backend started (Job ID: $($backendJob.Id))" -ForegroundColor Green
Write-Host "✓ Frontend started (Job ID: $($frontendJob.Id))" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access the HRIS at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📡 Backend API at: http://localhost:5000/api" -ForegroundColor Cyan
Write-Host ""

# Wait for jobs
Wait-Job -Job $backendJob, $frontendJob

# Clean up
Stop-Job -Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
Remove-Job -Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
