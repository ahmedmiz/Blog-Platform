# Blog Platform

A modern blog platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to view, create, edit, and delete blog posts, as well as view author profiles and comments.

## About this project This project was developed as part of a task assessment

## Features

- Responsive design that works on desktop and mobile
- View, create, edit, and delete blog posts
- Author profiles with detailed information
- Comment system for blog posts
- Search functionality for posts
- Pagination for post lists
- Server-side rendering with Next.js
- UI with Tailwind CSS
- Real-time updates with SWR

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR + Axios
- **State Management**: React Hooks
- **UI Components**: Custom components
- **Notifications**: React Hot Toast
- **API**: JSONPlaceholder

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ahmedmiz/Blog-Platform.git
cd blog-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
src/
├── app/                   # Next.js app router pages
│   ├── authors/          # Author-related pages
│   ├── posts/            # Post-related pages
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── AuthorCard.tsx    # Author profile card
│   ├── CommentList.tsx   # Post comments
│   ├── PostCard.tsx      # Individual post card
│   ├── PostList.tsx      # List of posts
│   └── SearchBar.tsx     # Search functionality
├── hooks/                # Custom React hooks
│   └── usePosts.ts       # Posts data fetching
├── lib/                  # Utility functions
│   └── api.ts           # API client
└── types/                # TypeScript types
    └── index.ts         # Shared types
```

## Key Features Implementation

### Posts Management

- View all posts with pagination
- Search posts by title or content
- Create, edit, and delete posts
- View individual post details

### Author Features

- View author profiles
- See author's posts
- Contact information display
- Company details

### UI/UX Features

- Loading states
- Error handling
- Toast notifications
- Responsive design
- Pagination controls

## API Integration

The project uses JSONPlaceholder API for demonstration purposes. Key endpoints:

- `/posts` - Get all posts
- `/posts/:id` - Get single post
- `/users/:id` - Get single user
- `/posts/:id/comments` - Get post comments

## Contact Information

For any questions or feedback about this project, please contact:

- **Developer**: Ahmed Saad
- **Email**: <mizoahmed017@gmail.com>
- **Phone**: +201114149305
