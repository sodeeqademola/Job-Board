## JobBoard Website

Welcome to the JobBoard website repository! This project is a job listing platform built using modern technologies such as Next.js, TypeScript, JavaScript, Prisma, and PostgreSQL. This README provides an overview of the project, its features, and instructions for setup and development.

## Table of Contents

1.Project Overview 2. Features 3. Technologies Used 4. Setup and Installation 5. Usage 6. Folder Structure 7. Contributing

## Project Overview

The JobBoard website is a platform that allows users to browse and post job listings. It features a user-friendly interface with advanced search capabilities, job categorization, and authentication mechanisms. Built with Next.js for server-side rendering and TypeScript for static type checking, this project aims to provide a robust and scalable solution for job seekers and employers.

## Features

Job Listings: Browse available job listings with detailed descriptions.
Search Functionality: Filter jobs based on keywords, location, and job type.
User Authentication: Sign up, log in for Admin through admin panel using Nextjs authentication.
Job Posting: Employers can post new job listings.
Responsive Design: Mobile-friendly and adaptive layout.
Database Integration: Store and manage data with PostgreSQL using Prisma ORM.

## Technologies Used

Next.js: React framework for server-side rendering and static site generation.
TypeScript: Superset of JavaScript for static typing and improved development experience.
JavaScript: Core language for application logic.
Prisma: ORM for database management and query building.
PostgreSQL: Relational database for storing job listings and user data.

## Setup and Installation

To get started with the JobBoard website, follow these steps:

1. Clone the Repository:

git clone https://github.com/sodeeqademola/jobboard.git
cd jobboard

## Install Dependencies:

Ensure you have Node.js installed, then run:

npm install
or

yarn install
Set Up Environment Variables:

## Create a .env file in the root directory and add the following environment variables:

DATABASE_URL=postgresql://user:password@localhost:5432/jobboard
NEXT_PUBLIC_API_URL=http://localhost:3000/
Replace user, password, and other connection details with your PostgreSQL configuration.

Run Migrations:

Use Prisma to set up the database schema:

npx prisma migrate dev

## Start the Development Server:

npm run dev
or

yarn dev
Navigate to http://localhost:3000 in your browser to view the application.

## Usage

Development Mode: Run npm run dev to start the application in development mode with hot-reloading.

Build and Start: Run npm run build to create a production build, then npm start to start the production server.
Linting and Formatting: Use npm run lint to check for code issues and npm run format to format the codebase.

## Folder Structure

The project follows a standard Next.js structure with additional folders for Prisma and TypeScript configuration:

.
├── public/ # Static assets like images and icons
├── src/ # Application source code
│ ├── components/ # React components
│ ├── pages/ # Next.js pages
│ ├── prisma/ # Prisma schema and migration files
│ ├── styles/ # Global and component-specific styles
│
├── .env # Environment variables
├── next.config.js # Next.js configuration
├── prisma.schema # Prisma schema definition
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## Contributing

Contributions are welcome! To contribute to this project:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a Pull Request.
