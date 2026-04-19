# Project Architecture

## Atomic Design Structure

This project follows the Atomic Design Methodology, organizing components into five distinct levels:

### 1. Atoms (Basic Building Blocks)

Located in `src/components/atoms/`

- **Avatar** - Circular avatar displaying the first letter of a task
- **Button** - Reusable button component with variants (primary, secondary, icon)
- **Input** - Text input with variants (default, search)
- **StatusBadge** - Visual status indicator with colored dot
- **Textarea** - Multi-line text input

### 2. Molecules (Simple Combinations)

Located in `src/components/molecules/`

- **FilterButtons** - Group of filter buttons for task status
- **SearchBar** - Search input with icon
- **StatusDropdown** - Dropdown selector for task status
- **TaskCard** - Individual task display with all task information

### 3. Organisms (Complex Components)

Located in `src/components/organisms/`

- **TaskForm** - Complete form for adding/editing tasks
- **TaskSection** - Collapsible section containing a list of tasks

### 4. Templates (Page Layouts)

Located in `src/components/templates/`

- **TaskManagementTemplate** - Main application layout orchestrating all features

### 5. Pages

Located in `src/`

- **App.tsx** - Entry point that renders the TaskManagementTemplate

## Component Hierarchy

```
App
└── TaskManagementTemplate
    ├── SearchBar
    │   └── Input (search variant)
    ├── FilterButtons
    │   └── Button (multiple instances)
    ├── TaskSection (multiple instances)
    │   └── TaskCard (multiple instances)
    │       ├── Avatar
    │       ├── StatusBadge
    │       └── Button (icon variant, multiple)
    ├── TaskForm (conditional)
    │   ├── Input
    │   ├── Textarea
    │   ├── StatusDropdown (edit mode only)
    │   └── Button (multiple)
    └── FAB Button
```

## Data Flow

### State Management

- **Local State**: Component-specific state using `useState`
- **Persistent State**: Application state using custom `useLocalStorage` hook
- **Computed State**: Derived values using `useMemo` for performance

### Props Flow

```
TaskManagementTemplate (state owner)
  ↓ props
TaskSection (presentation)
  ↓ props
TaskCard (presentation)
  ↑ callbacks
TaskManagementTemplate (state updates)
```

## Key Design Decisions

### 1. Atomic Design Benefits

- **Reusability**: Components can be easily reused across the application
- **Maintainability**: Clear separation makes updates easier
- **Scalability**: Easy to add new features without affecting existing code
- **Testing**: Smaller components are easier to test in isolation

### 2. Component Responsibilities

#### Atoms

- Pure presentational components
- No business logic
- Highly reusable
- Accept props for customization

#### Molecules

- Combine atoms for specific purposes
- Minimal logic
- Reusable across different contexts

#### Organisms

- Complex, feature-rich components
- May contain business logic
- Self-contained functionality

#### Templates

- Page-level layouts
- Orchestrate organisms and molecules
- Manage application state
- Handle data fetching and mutations

### 3. State Management Strategy

- **Local Storage**: Persist tasks between sessions
- **React State**: Manage UI state and user interactions
- **Memoization**: Optimize expensive computations (filtering, sorting)

### 4. Performance Optimizations

- `useMemo` for filtered task lists
- Conditional rendering for sections
- CSS animations instead of JavaScript
- Efficient re-rendering with proper key props

## File Organization

```
src/
├── components/
│   ├── atoms/
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx
│   │   │   └── Avatar.css
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.css
│   │   └── ...
│   ├── molecules/
│   │   ├── FilterButtons/
│   │   │   ├── FilterButtons.tsx
│   │   │   └── FilterButtons.css
│   │   └── ...
│   ├── organisms/
│   │   ├── TaskForm/
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskForm.css
│   │   └── ...
│   └── templates/
│       └── TaskManagementTemplate/
│           ├── TaskManagementTemplate.tsx
│           └── TaskManagementTemplate.css
├── hooks/
│   └── useLocalStorage.ts
├── types/
│   └── Task.ts
├── App.tsx
├── App.css
└── index.tsx
```

## TypeScript Integration

### Type Definitions

- **Task**: Core data model
- **FilterType**: Union type for filter options
- **Component Props**: Strongly typed interfaces for all components

### Benefits

- Type safety throughout the application
- Better IDE support and autocomplete
- Catch errors at compile time
- Self-documenting code

## Styling Strategy

### CSS Organization

- Component-scoped CSS files
- BEM-like naming convention
- Consistent spacing and colors
- Responsive design with media queries

### Design Tokens (Implicit)

- Primary Color: #034EA2
- Background: #F4F5F7
- Text: #172B4D, #5E6C84
- Status Colors: #FF991F (In Progress), #A5ADBA (Pending), #00875A (Completed)

## Future Enhancements

### Potential Improvements

1. **Context API**: For deeper component trees
2. **React Query**: For server state management
3. **Storybook**: Component documentation and testing
4. **Unit Tests**: Comprehensive test coverage
5. **E2E Tests**: User flow testing
6. **Accessibility**: Enhanced ARIA labels and keyboard navigation
7. **Internationalization**: Multi-language support
8. **Theme System**: Dark mode and custom themes

### Scalability Considerations

- Easy to add new atom components
- Simple to create new page templates
- Straightforward to integrate state management libraries
- Ready for backend integration

## Best Practices Followed

1. **Single Responsibility Principle**: Each component has one clear purpose
2. **DRY (Don't Repeat Yourself)**: Reusable components eliminate duplication
3. **Composition over Inheritance**: Components are composed, not extended
4. **Props Drilling Minimization**: State is managed at appropriate levels
5. **Type Safety**: Full TypeScript coverage
6. **Semantic HTML**: Proper HTML5 elements
7. **Accessibility**: ARIA labels and keyboard support
8. **Performance**: Memoization and efficient rendering
9. **Clean Code**: Consistent formatting and naming
10. **Documentation**: Clear README and architecture docs
