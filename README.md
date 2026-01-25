# MediaHub Frontend

React-based frontend application for multimedia file upload, search, and management platform.

## Live Deployment

**Production URL**: [https://santamediahub.vercel.app/](https://santamediahub.vercel.app/)

## Tech Stack

- **Framework**: React 18.2.0
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: SASS/SCSS
- **HTTP Client**: Axios
- **UI Components**: React Icons
- **PDF Viewer**: react-pdf, pdfjs-dist
- **Notifications**: React Toastify

## Prerequisites

Before running the application locally, ensure you have:

- Node.js (v20.12.2 or higher)
- npm (v10.5.0 or higher)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the frontend root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

For production, update to:
```env
REACT_APP_API_URL=https://santabackend-media-hub.vercel.app
```

### 4. Run the Application

```bash
npm start
```

The application will start on **http://localhost:3000**

### 5. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Features

- **User Authentication**: JWT-based secure login and registration
- **File Upload**: Support for images, videos, audio, and PDF files
- **File Preview**: In-app preview for all supported file types
- **Search & Filter**: Advanced search with file type filtering and sorting
- **File Management**: View, download, and delete uploaded files
- **Responsive Design**: Mobile-friendly interface

## File Upload Limits

### Production (Vercel Deployment)
- **Maximum file size**: 4MB
- **Reason**: Vercel Hobby plan has a 4.5MB request body limit for serverless functions

### Local Development
- **Maximum file size**: 100MB
- **Reason**: No serverless limitations on local environment


## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── pdf.worker.min.mjs
├── src/
│   ├── components/
│   │   ├── FileCard.js
│   │   ├── FilePreviewModal.js
│   │   ├── Navbar.js
│   │   └── PrivateRoute.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Search.js
│   │   └── Upload.js
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── fileSlice.js
│   │   └── store.js
│   ├── services/
│   │   ├── authService.js
│   │   └── fileService.js
│   ├── styles/
│   │   └── *.scss
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## API Integration

The frontend communicates with the backend API at:
- **Local**: http://localhost:5000
- **Production**: https://santabackend-media-hub.vercel.app

All API requests include JWT authentication tokens in headers.

## Deployment

The application is deployed on **Vercel**.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_URL`: Backend API URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or run on a different port
PORT=3001 npm start
```

### PDF Not Loading
Ensure `pdf.worker.min.mjs` is present in the `public` folder.

### API Connection Issues
- Verify backend is running
- Check CORS configuration
- Confirm API URL in `.env` file

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please contact the development team.
