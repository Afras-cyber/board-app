# Board Application - Senior Software Engineer Practical Test

## Overview
This is a demonstration application developed for Vision Ex Digital (visionexdigital.com.au) as part of the Senior Software Engineer practical test. The application is a modern task management board built with Next.js.

## Features
- 📱 Responsive design for mobile, tablet, and desktop
- 🎯 Drag and drop task management
- 🔍 Real-time task search functionality
- 📊 Multiple board views and task organization
- 💾 Persistent state management with Zustand
- 🎨 Modern UI with Tailwind CSS

## Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Drag & Drop:** dnd-kit
- **Icons:** Lucide React & React Icons

## Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd board-app

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

### Running Tests
```bash
npm run test
# or
yarn test
```

## Project Structure
```
board-app/
├── src/
│   ├── app/            # App router pages
│   ├── components/     # Reusable components
│   ├── lib/           # Utilities and store
│   └── styles/        # Global styles
├── public/            # Static assets
└── tests/            # Test files
```

## Key Components
- **TaskBoard:** Main board component with drag-and-drop functionality
- **Swimlane:** Represents different task status columns
- **TaskCard:** Individual task component
- **Header:** Application header with search functionality
- **Sidebar:** Navigation and board management

## State Management
- Uses Zustand for state management
- Persistent storage with localStorage
- Real-time task filtering and updates

## Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Collapsible sidebar for better mobile experience

## Developer
Ahmed Afras  
Senior Software Engineer

## License
MIT License

---
*This project was developed as part of the technical assessment for Vision Ex Digital Australia.*