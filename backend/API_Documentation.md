# Higo Customer API Documentation

## Overview

The Higo Customer API provides endpoints for managing and analyzing customer data. It supports pagination, search functionality, and provides comprehensive analytics for customer demographics and location distribution.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, this API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### 1. Get Customers

**GET** `/api/customers`

Retrieve a paginated list of customers with optional search functionality.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number for pagination |
| `search` | string | No | "" | Search term for filtering customers |

#### Search Functionality

The search parameter performs case-insensitive matching across the following fields:
- Customer Name
- Email Address
- Brand Device
- Name of Location

#### Response Format

```json
{
  "data": [
    {
      "_id": "60f7b1234567890123456789",
      "Name": "John Doe",
      "Email": "john.doe@example.com",
      "Brand Device": "iPhone",
      "Name of Location": "Jakarta",
      "Location Type": "Urban",
      "gender": "Male",
      "Date": "2025-07-10T10:30:00.000Z"
    }
  ],
  "totalData": 1245
}
```

#### Features

- **Pagination**: 10 items per page
- **Sorting**: Results sorted by Date (newest first)
- **Search**: Case-insensitive search across multiple fields
- **Total Count**: Returns total matching records for pagination

#### Example Requests

```bash
# Get first page of customers
GET /api/customers?page=1

# Search for customers with "john" in their data
GET /api/customers?search=john

# Get second page with search
GET /api/customers?page=2&search=jakarta
```

### 2. Get Customer Overview

**GET** `/api/overview`

Retrieve summarized customer analytics and statistics.

#### Response Format

```json
{
  "locationType": {
    "labels": ["Urban", "Rural", "Suburban", "Unknown"],
    "values": [850, 250, 140, 5],
    "raw": [
      {
        "_id": "Urban",
        "count": 850
      },
      {
        "_id": "Rural",
        "count": 250
      }
    ]
  },
  "genderCount": {
    "male": 640,
    "female": 605
  },
  "totalUser": 1245
}
```

#### Data Processing

- **Unique Customers**: Data is grouped by email address to eliminate duplicates
- **Gender Filtering**: Only includes customers with valid gender values ("Male", "Female")
- **Location Sorting**: Location types are sorted by count in descending order
- **Null Handling**: Handles null or undefined location types as "Unknown"

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `locationType.labels` | array | Array of location type names |
| `locationType.values` | array | Array of counts corresponding to labels |
| `locationType.raw` | array | Raw aggregation data with _id and count |
| `genderCount.male` | integer | Count of male customers |
| `genderCount.female` | integer | Count of female customers |
| `totalUser` | integer | Total unique customers (by email) |

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Internal Server Error"
}
```

**HTTP Status Codes:**
- `200 OK`: Successful request
- `500 Internal Server Error`: Server error occurred

## Database Schema

The API works with a MongoDB collection named `Customers` with the following structure:

```javascript
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

## Usage Examples

### JavaScript/Fetch API

```javascript
// Get customers with pagination
const getCustomers = async (page = 1, search = '') => {
  const response = await fetch(`/api/customers?page=${page}&search=${search}`);
  const data = await response.json();
  return data;
};

// Get customer overview
const getOverview = async () => {
  const response = await fetch('/api/overview');
  const data = await response.json();
  return data;
};
```

### cURL Examples

```bash
# Get first page of customers
curl -X GET "http://localhost:3000/api/customers?page=1"

# Search for customers
curl -X GET "http://localhost:3000/api/customers?search=john"

# Get customer overview
curl -X GET "http://localhost:3000/api/overview"
```

## Environment Variables

The API requires the following environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/higo_db
NODE_ENV=development
```

## Dependencies

- Express.js
- MongoDB Driver
- dotenv
- cors

## Import to Postman

1. Open Postman
2. Click "Import" button
3. Select "Upload Files"
4. Choose the `postman_collection.json` file
5. The collection will be imported with all endpoints and examples

## Collection Features

- **Environment Variables**: Uses `{{base_url}}` variable for easy environment switching
- **Example Responses**: Includes sample success and error responses
- **Detailed Descriptions**: Each endpoint includes comprehensive documentation
- **Query Parameters**: Pre-configured with descriptions and examples

## Support

For API support or questions, please contact the development team.
