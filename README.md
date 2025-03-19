# Beverage Order System

A modern web application for ordering various types of beverages, built with React and Node.js.

## Features

- Four beverage categories: Coffee, Tea, Shakes, and Bubble Tea
- Modern and responsive UI
- Real-time category switching
- Easy-to-use ordering interface

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

## Running the Application

You can run both the frontend and backend concurrently using:

```bash
npm run dev
```

Or run them separately:

- Backend only: `npm run server`
- Frontend only: `npm run client`

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- GET `/api/beverages` - Get all beverages
- GET `/api/beverages/:category` - Get beverages by category (coffee, tea, shakes, bubbleTea) 