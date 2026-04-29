// Singular Design System - React Components
// Framework-agnostic component library

// Providers
export {
  SingularProvider,
  useBrand,
  useSingularTheme,
  useTheme,
  useDir,
} from './providers/SingularProvider';

export type {
  SingularProviderProps,
  BrandId,
  BrandConfig,
  BrandColorScale,
} from './providers/SingularProvider';

// Utilities
export { cn } from './utils/cn';

// Icons
export { Close } from './icons';
export { Flag } from './icons';
export type { FlagProps, FlagSize } from './icons';

// Components - Button
export * from './components/button';

// Components - Feedback
export * from './components/feedback';

// Components - Data Display
export * from './components/data-display';

// Components - Data Entry (Chip aliased as InputChip to avoid conflict with data-display/Chip)
export {
  Input,
  InputField,
  Chip as InputChip,
  ListControl,
  DropdownMenu,
  InputDropdown,
  DatePicker,
  Slider,
  FileUpload,
} from './components/data-entry';

// Components - Navigation
export * from './components/navigation';
