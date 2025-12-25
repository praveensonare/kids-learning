# Kids Learning Platform 🎓

An interactive, rich, and responsive learning platform for nursery to primary school students following Cambridge International Standards.

## Features ✨

- **Authentication**: Secure login with username/password or Google OAuth
- **Mobile-First Design**: Fully responsive interface optimized for all devices
- **Interactive Learning**: Engaging lessons with multiple learning modes
- **Cambridge Standards**: Content aligned with Cambridge International curriculum
- **Rich UI**: Colorful, kid-friendly interface with animations

## Pages & Routes 📚

### `/login`
- Login page with username/password authentication
- Google OAuth integration
- Demo credentials: `username: demo, password: demo123`

### `/` (Home)
- Displays all available classes (Nursery to Year 6)
- Beautiful card-based layout
- Each class has unique colors and icons

### `/[class]`
- Shows subjects for the selected class
- Tab-based navigation on desktop
- Card-based layout on mobile
- Subjects include: English, Maths, Science, History, Geography, Art

### `/[class]/[subject]`
- Lists all lessons/topics for the subject
- Shows lesson difficulty and duration
- Progress tracking

### `/[class]/[subject]/[lesson]`
- **Learn**: Educational content and key learning points
- **Worksheet**: Interactive practice exercises
- **Quiz**: Knowledge assessment with instant feedback
- **Challenges**: Point-based challenges to master skills

## Tech Stack 🛠️

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started 🚀

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local` and update with your values
   - For Google OAuth, get credentials from [Google Cloud Console](https://console.cloud.google.com/)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure 📁

```
kids-learning/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [class]/           # Dynamic class routes
│   │   │   ├── [subject]/     # Dynamic subject routes
│   │   │   │   └── [lesson]/  # Dynamic lesson routes
│   │   ├── api/               # API routes (NextAuth)
│   │   ├── login/             # Login page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   ├── data/                  # Sample data and content
│   ├── lib/                   # Utilities and configurations
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── package.json
```

## Features in Detail 🎯

### Authentication
- Username/password authentication
- Google OAuth integration
- Protected routes with middleware
- Session management

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized layouts for all screen sizes

### Interactive Elements
- Animated transitions between pages
- Interactive quiz with instant feedback
- Point-based challenge system
- Progress tracking
- Visual feedback for user actions

### Accessibility
- Semantic HTML
- Clear visual hierarchy
- Readable fonts and colors
- Interactive elements with proper focus states

## Customization 🎨

### Adding New Classes
Edit `src/data/classes.ts` and add to the `classes` array:

```typescript
{
  id: 'new-class',
  name: 'New Class',
  level: 'Level',
  description: 'Description',
  color: 'bg-gradient-to-br from-color-400 to-color-600',
  icon: '🎓',
}
```

### Adding New Subjects
Update the `subjects` object in `src/data/classes.ts`:

```typescript
'class-id': [
  { id: 'subject-id', name: 'Subject Name', color: 'bg-color-500', icon: '📚' }
]
```

### Adding Lessons
Add to the `lessons` object:

```typescript
'class-id-subject-id': [
  {
    id: 'lesson-id',
    title: 'Lesson Title',
    description: 'Description',
    duration: '20 mins',
    difficulty: 'easy',
  }
]
```

## License 📄

This project is open source and available under the MIT License.

## Support 💬

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ for kids' education
