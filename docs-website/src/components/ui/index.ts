/**
 * Singular UI Components
 * 
 * Components are now sourced from @singular/react package.
 * This barrel re-exports everything for backward compatibility.
 * The local component files under ./button, ./navigation, etc. still exist
 * for reference, but new code should import from @singular/react.
 */

// Re-export all components from the package
export * from '@singular/react';

// Local re-exports for components that haven't been migrated to package yet
// or have docs-specific overrides:

// Button Components
export { Button, IconButton, ButtonGroup, Hyperlink, Dock } from './button';
export type { ButtonProps, IconButtonProps, ButtonGroupProps, HyperlinkProps, DockProps } from './button';

// Navigation Components
export { AppBar, Breadcrumbs, Navbar, NavbarPrimaryRow, NavbarSecondaryRow, NavbarBrand, NavbarContent, NavbarNavigation, NavbarItem, NavbarActions, NavbarActionIcons, NavbarActionIcon, NavbarCTA, NavbarSearch, Tabs, TabsList, TabsTrigger, TabsContent, TabBar, SideMenu, SideMenuHeader, SideMenuContent, SideMenuSection, SideMenuSeparator, SideMenuItem, SideMenuExpandableItem, SideMenuSubItem, SideMenuFooter, SideMenuLogout, SideMenuFeatured, useSideMenu, SectionHeader, ActionHeader, PageHeader, Stepper, Pagination } from './navigation';

// Data Entry Components
export { Input, InputField, Chip as InputChip, ListControl, DropdownMenu, InputDropdown, DatePicker, Slider, FileUpload, FileDropZone, FileProgressItem, FileTypeIcon } from './data-entry';

// Data Display Components
export { Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardMedia, CardTag, CardHeadline, CardSupportingText, CardActions, CardLink, Avatar, AvatarGroup, Separator, Accordion, AccordionItem, ImageCarousel, Chip, ChipGroup, IconContainer, Tag, Table, TablePageHeader, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption, TablePagination, Tooltip, SimpleTooltip } from './data-display';

// Feedback Components
export { LoadingSpinner, Alert, Dialogue, DialogueOverlay, DialogueContent, InlineDialogue, BottomSheet, InlineBottomSheet, Snackbar, Message } from './feedback';

