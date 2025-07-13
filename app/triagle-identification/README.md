# Triangle Classification Application

## Assignment Overview

This application was created for the **MSSE640 Software Security Engineering** course assignment. The goal is to create a robust program that accepts three values for the length of the sides of a triangle and returns the type of triangle (scalene, isosceles, or equilateral).

### Assignment Requirements
- Accept three numeric inputs representing triangle side lengths
- Validate input data (positive numbers, triangle inequality theorem)
- Classify triangles into three types:
  - **Equilateral**: All three sides are equal
  - **Isosceles**: Exactly two sides are equal
  - **Scalene**: All three sides are different
- Provide clear error messages for invalid inputs
- Implement robust error handling and input validation

## Features

### Frontend
- **Modern React Interface**: Built with Next.js 15 and TypeScript
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dynamic Visualization**: Shows different triangle shapes based on type
- **Real-time Validation**: Immediate feedback on input errors
- **Beautiful UI**: Dark theme with gradient backgrounds and modern styling

### Backend API
- **RESTful Endpoint**: `/api/identify-triangle` for triangle classification
- **Robust Validation**: Server-side validation of triangle properties
- **Error Handling**: Comprehensive error responses
- **TypeScript**: Full type safety throughout the application

### Triangle Classification Logic
- **Input Validation**: Ensures all sides are positive numbers
- **Triangle Inequality Theorem**: Validates that sides can form a triangle
- **Type Classification**: Determines triangle type based on side relationships
- **Error Reporting**: Clear error messages for invalid inputs

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Custom component library with Lucide React icons
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS with custom dark theme
- **Development**: ESLint, PostCSS, Turbopack

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

### Installing Node.js

#### Windows
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer and follow the setup wizard
4. Verify installation: `node --version` and `npm --version`

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
# Visit https://nodejs.org/ and download the macOS installer
```

#### Linux (Ubuntu/Debian)
```bash
# Using apt
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using snap
sudo snap install node --classic
```

#### Linux (CentOS/RHEL/Fedora)
```bash
# Using dnf (Fedora)
sudo dnf install nodejs npm

# Using yum (CentOS/RHEL)
sudo yum install nodejs npm
```

## Installation & Setup

### Step 1: Clone or Download the Project
```bash
# If using git
git clone https://github.com/ThomasVickers-Regis/MSSE640-2025summer.git
cd triagle-identification

# Or download and extract the ZIP file, then navigate to the folder
```

### Step 2: Install Dependencies

#### Windows (Command Prompt)
```cmd
cd triagle-identification
npm install
```

#### Windows (PowerShell)
```powershell
cd triagle-identification
npm install
```

#### macOS/Linux
```bash
cd triagle-identification
npm install
```

### Step 3: Run the Development Server

#### Windows (Command Prompt)
```cmd
npm run dev
```

#### Windows (PowerShell)
```powershell
npm run dev
```

#### macOS/Linux
```bash
npm run dev
```

### Step 4: Open the Application
Open your web browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Enter Triangle Sides**: Input three positive numbers representing the lengths of triangle sides
2. **Click "Classify Triangle"**: The application will validate and classify the triangle
3. **View Results**: See the triangle type, visualization, and properties
4. **Handle Errors**: Invalid inputs will show clear error messages

### Example Inputs

#### Valid Triangles
- **Equilateral**: `5, 5, 5`
- **Isosceles**: `5, 5, 3` or `6, 4, 4`
- **Scalene**: `3, 4, 5` (Pythagorean triple) or `7, 8, 9`

#### Invalid Inputs (for testing error handling)
- **Negative values**: `-1, 2, 3`
- **Invalid triangle**: `1, 1, 10` (violates triangle inequality)
- **Non-numeric**: `abc, 2, 3`
- **Zero values**: `0, 2, 3`

## API Endpoint

The application includes a RESTful API endpoint for triangle classification:

### POST `/api/identify-triangle`

**Request Body:**
```json
{
  "sideA": 5,
  "sideB": 5,
  "sideC": 3
}
```

**Response:**
```json
{
  "sideA": 5,
  "sideB": 5,
  "sideC": 3,
  "type": "Isosceles",
  "isValid": true
}
```

**Error Response:**
```json
{
  "sideA": 1,
  "sideB": 1,
  "sideC": 10,
  "type": "",
  "isValid": false,
  "error": "These sides cannot form a valid triangle"
}
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Project Structure
```
triagle-identification/
├── app/
│   ├── api/
│   │   └── identify-triangle/
│   │       └── route.ts          # API endpoint
│   ├── components/
│   │   ├── ui/                   # UI components
│   │   ├── ClientImage.tsx       # Image component
│   │   └── HydrationWrapper.tsx  # Hydration wrapper
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application
├── components/
│   └── ui/                       # Shared UI components
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
└── package.json                  # Dependencies and scripts
```

## Troubleshooting

### Common Issues

#### Port Already in Use
If you see "Port 3000 is already in use":
```bash
# Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

#### Node.js Version Issues
Ensure you're using Node.js 18+:
```bash
node --version
# Should show v18.x.x or higher
```

#### Permission Issues (Linux/macOS)
If you encounter permission errors:
```bash
# Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

#### Windows Path Issues
If npm is not recognized:
1. Restart your terminal/command prompt
2. Ensure Node.js is properly installed
3. Check that npm is in your PATH environment variable

## Contributing

This is an educational project for the MSSE640 course. The application demonstrates:
- Robust input validation
- Error handling best practices
- Modern web development techniques
- API design principles
- Responsive UI/UX design

## License

This project is created for educational purposes as part of the MSSE640 Software Security Engineering course.
