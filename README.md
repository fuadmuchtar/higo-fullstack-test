# Higo Fullstack Test

A full-stack web application for customer management and analytics, built with Node.js/Express backend and Next.js frontend.

## 🚀 Features

### Backend (API)
- **Customer Management**: RESTful API for customer data operations
- **Search & Pagination**: Advanced search functionality with paginated results
- **Analytics Dashboard**: Customer demographics and location analytics
- **MongoDB Integration**: Robust database operations with aggregation pipelines
- **CORS Enabled**: Cross-origin resource sharing support

### Frontend (Dashboard)
- **Modern UI**: Built with Next.js 15 and React 19
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: DaisyUI components with Lucide React icons
- **Material-UI Integration**: Advanced data grids and charts
- **Customer Dashboard**: Comprehensive overview with tabs for different views

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB 6.17.0
- **Environment**: dotenv 17.2.0
- **CORS**: cors 2.8.5

### Frontend
- **Framework**: Next.js 15.3.5
- **React**: React 19.0.0
- **Styling**: Tailwind CSS, DaisyUI 5.0.46
- **UI Components**: Material-UI 7.2.0
- **Icons**: Lucide React 0.525.0
- **Charts**: MUI X-Charts 8.7.0
- **Data Grid**: MUI X-Data-Grid 8.7.0
- **TypeScript**: Full TypeScript support

## 📁 Project Structure

```
higo-fullstack-test/
├── backend/
│   ├── bin/
│   │   └── www                 # Server entry point
│   ├── controllers/
│   │   └── customerController.js  # Business logic
│   ├── routes/
│   │   └── customerRoutes.js   # API routes
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── app.js                 # Express application
│   ├── package.json
│   ├── .env.example
│   ├── API_Documentation.md   # API documentation
│   └── postman_collection.json # Postman collection
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx       # Main dashboard page
│   │       ├── layout.tsx     # App layout
│   │       └── globals.css    # Global styles
│   ├── public/               # Static assets
│   ├── package.json
│   └── next.config.ts
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd higo-fullstack-test
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   
   # Configure your MongoDB connection in .env
   # MONGODB_URI=mongodb://localhost:27017/higo_db
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3001`

## 📊 API Documentation

### Endpoints

#### GET `/api/customers`
- **Description**: Retrieve paginated customer list with search functionality
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `search` (optional): Search term for filtering
- **Response**: Customer data with pagination info

#### GET `/api/overview`
- **Description**: Get customer analytics and statistics
- **Response**: Location distribution, gender demographics, and total counts

### Postman Collection

Import the `postman_collection.json` file into Postman for easy API testing:

1. Open Postman
2. Click "Import" → "Upload Files"
3. Select `backend/postman_collection.json`
4. Set `base_url` variable to `http://localhost:3000`

For detailed API documentation, see: [API_Documentation.md](./backend/API_Documentation.md)

## 🎨 Frontend Features

### Customer Dashboard
- **Tab Navigation**: Switch between different customer views
- **Customer List**: Display customer information with status badges
- **Analytics View**: Charts and statistics for customer insights
- **Reports Section**: Download and view customer reports

### UI Components
- **Responsive Cards**: Customer information cards with actions
- **Statistics Cards**: Key metrics with trend indicators
- **Interactive Tabs**: Radio-based tab system with smooth transitions
- **Modern Icons**: Lucide React icons throughout the interface

## 🔧 Configuration

### Environment Variables (Backend)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/higo_db

# Server
PORT=3000
NODE_ENV=development
```

### Database Schema

```javascript
// Customers Collection
{
  "_id": ObjectId,
  "Name": String,
  "Email": String,
  "Brand Device": String,
  "Name of Location": String,
  "Location Type": String,
  "gender": String,
  "Date": Date
}
```

## 🧪 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Uses Next.js with Turbopack
```

### Building for Production

**Backend**:
```bash
cd backend
npm start
```

**Frontend**:
```bash
cd frontend
npm run build
npm start
```

## 📝 Scripts

### Backend Scripts
- `npm run dev`: Start development server with nodemon

### Frontend Scripts
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Check the API documentation in `backend/API_Documentation.md`
- Use the Postman collection for API testing
- Review the frontend components in `frontend/src/app/`

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time updates with WebSocket
- [ ] Advanced filtering and sorting
- [ ] Data export functionality
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Customer relationship management features

---

**Built with ❤️ for Higo**