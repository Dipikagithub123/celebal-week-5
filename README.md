# MongoDB CRUD Application

## Screenshots

![Main UI](/main.png)

![Add/Edit Form](/form.png)

![Items List](/items.png)

---

A simple and modern CRUD (Create, Read, Update, Delete) application built with Node.js, Express, MongoDB, and Mongoose. Features a beautiful responsive frontend with real-time data management.

## Features

- ✅ **Create** - Add new items with form validation
- ✅ **Read** - Display all items in a responsive grid layout
- ✅ **Update** - Edit existing items inline
- ✅ **Delete** - Remove items with confirmation modal
- 🎨 **Modern UI** - Beautiful, responsive design with animations
- 📱 **Mobile Friendly** - Works perfectly on all devices
- ⚡ **Real-time** - Instant updates without page refresh
- 🔒 **Data Validation** - Server-side and client-side validation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with Font Awesome icons
- **Development**: Nodemon for auto-reload

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher)
2. **MongoDB** installed and running locally
3. **npm** or **yarn** package manager

## Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - The application will automatically create a database called `crud-app`
   - Default connection: `mongodb://localhost:27017/crud-app`

4. **Configure environment variables** (optional)
   - Edit `config.env` file to change database connection or port
   - Default settings work with local MongoDB installation

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Access the Application
Open your browser and navigate to: `http://localhost:3000`

## API Endpoints

The application provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get a specific item |
| POST | `/api/items` | Create a new item |
| PUT | `/api/items/:id` | Update an existing item |
| DELETE | `/api/items/:id` | Delete an item |

### Request/Response Examples

**Create Item (POST /api/items)**
```json
{
  "name": "Sample Item",
  "description": "This is a sample item description",
  "price": 29.99,
  "category": "Electronics"
}
```

**Response**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b",
  "name": "Sample Item",
  "description": "This is a sample item description",
  "price": 29.99,
  "category": "Electronics",
  "createdAt": "2023-07-20T10:30:00.000Z"
}
```

## Database Schema

The application uses a simple Item schema with the following fields:

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required),
  createdAt: Date (auto-generated)
}
```

## Project Structure

```
mongodb-crud-app/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server and API routes
├── config.env          # Environment variables
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Features in Detail

### Create Operation
- Form with validation for all required fields
- Real-time feedback and error handling
- Automatic form reset after successful creation

### Read Operation
- Responsive grid layout for items display
- Empty state with helpful message
- Loading states with spinner animation

### Update Operation
- Inline editing with form population
- Cancel functionality to revert changes
- Visual feedback during edit mode

### Delete Operation
- Confirmation modal to prevent accidental deletions
- Smooth animations and transitions
- Immediate UI updates after deletion

## Customization

### Changing Database Connection
Edit `config.env`:
```
MONGODB_URI=mongodb://your-mongodb-url/database-name
PORT=3000
```

### Adding New Fields
1. Update the Mongoose schema in `server.js`
2. Modify the HTML form in `public/index.html`
3. Update the JavaScript form handling in `public/script.js`

### Styling Changes
All styles are in `public/styles.css` and use modern CSS features like:
- CSS Grid for responsive layouts
- CSS Custom Properties for theming
- Smooth transitions and animations

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check if the port 27017 is available
- Verify your MongoDB installation

### Port Already in Use
- Change the port in `config.env`: `PORT=3001`
- Or kill the process using the port

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again


