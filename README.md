# Task Management Application

A modern, feature-rich task management application built with React and TypeScript following Atomic Design Methodology.

## Features

### Core Features
- ✅ **Task List**: Display all tasks with their status
- ✅ **Add Task**: Create new tasks with title and description
- ✅ **Mark as Completed**: Toggle task completion status with visual feedback
- ✅ **Edit Task**: Edit task title, description, and status
- ✅ **Delete Task**: Remove tasks from the list
- 🔍 **Search**: Search tasks by title or description
- 🎯 **Filter**: Filter tasks by status (All, In Progress, Pending, Completed)
- 💾 **Persistence**: Tasks persist between page reloads using localStorage
- ✨ **Animations**: Smooth animations for all interactions
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## Project Structure (Atomic Design)

```
src/
├── components/
│   ├── atoms/                    # Basic building blocks
│   │   ├── Avatar/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── StatusBadge/
│   │   └── Textarea/
│   ├── molecules/                # Simple component combinations
│   │   ├── FilterButtons/
│   │   ├── SearchBar/
│   │   ├── StatusDropdown/
│   │   └── TaskCard/
│   ├── organisms/                # Complex component sections
│   │   ├── TaskForm/
│   │   └── TaskSection/
│   └── templates/                # Page-level layouts
│       └── TaskManagementTemplate/
├── hooks/
│   └── useLocalStorage.ts        # Custom hook for localStorage
├── types/
│   └── Task.ts                   # TypeScript interfaces
├── App.tsx                       # Main application component
└── App.css                       # Global styles
```

## Atomic Design Methodology

### Atoms
Small, reusable components that serve as building blocks:
- `Avatar`: Circular avatar with initial letter
- `Button`: Reusable button with variants (primary, secondary, icon)
- `Input`: Text input with variants (default, search)
- `StatusBadge`: Status indicator with colored dot
- `Textarea`: Multi-line text input

### Molecules
Simple combinations of atoms:
- `FilterButtons`: Group of filter buttons
- `SearchBar`: Search input with icon
- `StatusDropdown`: Dropdown for selecting task status
- `TaskCard`: Individual task display with avatar, title, description, and actions

### Organisms
Complex, self-contained components:
- `TaskForm`: Form for adding/editing tasks
- `TaskSection`: Collapsible section containing task list

### Templates
Page-level layouts:
- `TaskManagementTemplate`: Main application layout with all features

## Technical Highlights

- **TypeScript**: Full type safety throughout the application
- **Atomic Design**: Well-organized, scalable component architecture
- **Custom Hooks**: `useLocalStorage` for persistent state management
- **Performance**: Optimized with `useMemo` for filtering
- **Clean Code**: Modular, reusable, and maintainable codebase
- **CSS Animations**: Smooth transitions and keyframe animations
- **Accessibility**: Proper ARIA labels and semantic HTML

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Runs the app at [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
```
Creates an optimized production build

### Testing
```bash
npm test
```

## Component Usage Examples

### Using Atoms
```tsx
import { Button } from './components/atoms/Button/Button';
import { Input } from './components/atoms/Input/Input';

<Button variant="primary" onClick={handleClick}>
  Submit
</Button>

<Input 
  variant="search" 
  placeholder="Search..." 
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

### Using Molecules
```tsx
import { TaskCard } from './components/molecules/TaskCard/TaskCard';

<TaskCard 
  task={task}
  onEdit={() => handleEdit(task)}
  onDelete={() => handleDelete(task.id)}
/>
```

### Using Organisms
```tsx
import { TaskSection } from './components/organisms/TaskSection/TaskSection';

<TaskSection
  title="In Progress"
  tasks={inProgressTasks}
  isExpanded={true}
  onToggle={handleToggle}
  onEditTask={handleEdit}
  onDeleteTask={handleDelete}
/>
```

## State Management

- Uses React's `useState` for local component state
- Custom `useLocalStorage` hook for persistent state
- `useMemo` for optimized filtering and computed values
- Props drilling for component communication

## Browser Support

Works on all modern browsers that support ES6+ and localStorage.

## Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components are designed to be reused across the application
3. **Composition**: Complex components are built from simpler ones
4. **Separation of Concerns**: Logic, presentation, and styling are properly separated
5. **Type Safety**: TypeScript ensures type correctness throughout

## Future Enhancements

- Task categories/tags
- Due dates and reminders
- Task priority levels
- Drag and drop reordering
- Dark mode support
- Export/import tasks
- Backend integration

## License

MIT
