@echo off

set dbName=NoteManager

echo Checking if SQL database %dbName% exists...
sqlcmd -S . -d master -Q "IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = '%dbName%') CREATE DATABASE %dbName%;"
if %errorlevel% neq 0 (
  echo Failed to create the database. Please check your SQL Server configuration and permissions.
  exit /b %errorlevel%
)
echo SQL database %dbName% created or already exists.

echo Installing npm packages...
npm install
echo npm packages installed successfully.

echo Starting the application...
npm start
