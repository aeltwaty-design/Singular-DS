'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { 
  ExportCurve, 
  Trash, 
  RefreshCircle,
  DocumentText,
  Image as ImageIcon,
  VideoPlay,
  MusicPlay,
  DocumentCode,
  Document
} from 'iconsax-react';
import { Close } from '@/components/icons';

// ============================================================================
// Types
// ============================================================================

export type FileUploadType = 'embedded' | 'modal';
export type FileItemState = 'uploading' | 'success' | 'error';

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  state: FileItemState;
  error?: string;
}

export interface FileUploadProps {
  /** Display type */
  type?: FileUploadType;
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Current files */
  files?: FileItem[];
  /** Disabled state */
  disabled?: boolean;
  /** Custom title for drop zone */
  title?: string;
  /** Custom description for drop zone */
  description?: string;
  /** Modal title */
  modalTitle?: string;
  /** Callback when files change */
  onChange?: (files: FileItem[]) => void;
  /** Callback when file is removed */
  onRemove?: (fileId: string) => void;
  /** Callback when retry is requested for failed file */
  onRetry?: (fileId: string) => void;
  /** Callback when modal is cancelled */
  onCancel?: () => void;
  /** Callback when modal is submitted */
  onSubmit?: () => void;
  /** Additional class name */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase();
}

function getAcceptedTypesLabel(accept?: string): string {
  if (!accept) return 'All file types';
  
  const types = accept.split(',').map(t => t.trim());
  const labels: string[] = [];
  
  types.forEach(type => {
    if (type === 'image/*') labels.push('Images');
    else if (type === '.pdf') labels.push('PDF');
    else if (type === '.csv') labels.push('CSV');
    else if (type === '.txt') labels.push('TXT');
    else if (type === '.doc' || type === '.docx') labels.push('DOC');
    else if (type === '.xls' || type === '.xlsx') labels.push('Excel');
    else if (type.startsWith('.')) labels.push(type.slice(1).toUpperCase());
  });
  
  return labels.length > 0 ? labels.join(', ') : 'All files';
}

// ============================================================================
// File Type Icon Component
// ============================================================================

interface FileTypeIconProps {
  filename: string;
  className?: string;
}

export function FileTypeIcon({ filename, className }: FileTypeIconProps) {
  const ext = getFileExtension(filename);
  const { brandColors } = useBrand();
  
  // Determine icon and color based on file type
  let IconComponent = Document;
  let bgColor = 'rgb(107, 114, 128)'; // gray
  let textColor = 'white';
  
  if (['.pdf'].includes(ext)) {
    IconComponent = DocumentText;
    bgColor = '#EF4444'; // red
  } else if (['.csv', '.xls', '.xlsx'].includes(ext)) {
    IconComponent = DocumentText;
    bgColor = '#22C55E'; // green
  } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
    IconComponent = ImageIcon;
    bgColor = '#3B82F6'; // blue
  } else if (['.mp4', '.mov', '.avi', '.webm'].includes(ext)) {
    IconComponent = VideoPlay;
    bgColor = '#8B5CF6'; // purple
  } else if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) {
    IconComponent = MusicPlay;
    bgColor = '#EC4899'; // pink
  } else if (['.json', '.xml', '.html', '.css', '.js', '.ts'].includes(ext)) {
    IconComponent = DocumentCode;
    bgColor = '#F59E0B'; // amber
  } else if (['.doc', '.docx', '.txt'].includes(ext)) {
    IconComponent = DocumentText;
    bgColor = '#3B82F6'; // blue
  }
  
  return (
    <div 
      className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      <IconComponent size={20} color={textColor} variant="Bold" />
    </div>
  );
}

// ============================================================================
// Progress Bar Component
// ============================================================================

interface ProgressBarProps {
  progress: number;
  state: FileItemState;
  className?: string;
}

function ProgressBar({ progress, state, className }: ProgressBarProps) {
  const { brandColors } = useBrand();
  
  let fillColor = brandColors.primary;
  if (state === 'success') fillColor = '#22C55E'; // success green
  if (state === 'error') fillColor = '#EF4444'; // error red
  
  return (
    <div 
      className={cn(
        'h-1 rounded-full overflow-hidden',
        className
      )}
      style={{ backgroundColor: 'rgb(229, 231, 235)' }}
    >
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{ 
          width: `${state === 'error' ? 100 : progress}%`,
          backgroundColor: fillColor 
        }}
      />
    </div>
  );
}

// ============================================================================
// File Progress Item Component
// ============================================================================

interface FileProgressItemProps {
  file: FileItem;
  onRemove?: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export function FileProgressItem({ 
  file, 
  onRemove, 
  onRetry, 
  onCancel,
  disabled 
}: FileProgressItemProps) {
  const { brandColors } = useBrand();
  const isUploading = file.state === 'uploading';
  const isSuccess = file.state === 'success';
  const isError = file.state === 'error';
  
  // Calculate estimated time remaining (mock)
  const estimatedTime = isUploading && file.progress !== undefined
    ? `${Math.ceil((100 - file.progress) / 10)}s left`
    : null;
  
  return (
    <div 
      className={cn(
        'rounded-xl p-4 border transition-colors',
        isError 
          ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10' 
          : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50'
      )}
    >
      {/* Top Row: Icon + File Info + Actions */}
      <div className="flex items-center gap-3">
        {/* File Type Icon (Left side) */}
        <FileTypeIcon filename={file.name} />
        
        {/* File Info (Center) */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
            {file.name}
          </p>
          <p className={cn(
            'text-xs mt-0.5',
            isError 
              ? 'text-red-500 dark:text-red-400' 
              : 'text-neutral-500 dark:text-neutral-400'
          )}>
            {isError ? (file.error || 'Upload failed') : formatFileSize(file.size)}
          </p>
        </div>
        
        {/* Action Buttons (Right side) */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {isUploading && onCancel && (
            <button
              onClick={onCancel}
              disabled={disabled}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                'text-neutral-500 dark:text-neutral-400',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label="Cancel upload"
            >
              <Close size={20} variant="Linear" />
            </button>
          )}
          
          {isError && onRetry && (
            <button
              onClick={onRetry}
              disabled={disabled}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                'text-neutral-500 dark:text-neutral-400',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label="Retry upload"
            >
              <RefreshCircle size={20} variant="Linear" />
            </button>
          )}
          
          {(isSuccess || isError) && onRemove && (
            <button
              onClick={onRemove}
              disabled={disabled}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                'text-neutral-500 dark:text-neutral-400',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label="Remove file"
            >
              <Trash size={20} variant="Linear" />
            </button>
          )}
        </div>
      </div>
      
      {/* Progress Bar Row (below file info) */}
      {(isUploading || isSuccess) && (
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar 
            progress={file.progress ?? 0} 
            state={file.state}
            className="flex-1"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              {isSuccess ? '100%' : `${file.progress ?? 0}%`}
            </span>
            {estimatedTime && (
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                {estimatedTime}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// File Drop Zone Component
// ============================================================================

interface FileDropZoneProps {
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  title?: string;
  description?: string;
  isDragging?: boolean;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (files: File[]) => void;
  onClick?: () => void;
}

export function FileDropZone({
  accept,
  maxSize,
  disabled,
  title = 'Choose file',
  description = 'Drag & drop your files here or',
  isDragging,
  onDragEnter,
  onDragLeave,
  onDrop,
  onClick,
}: FileDropZoneProps) {
  const { brandColors } = useBrand();
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragEnter?.();
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragLeave?.();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragLeave?.();
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    onDrop?.(files);
  };
  
  const acceptLabel = getAcceptedTypesLabel(accept);
  const sizeLabel = maxSize ? formatFileSize(maxSize) : null;
  
  return (
    <div
      className={cn(
        'relative rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer',
        isDragging && !disabled
          ? 'border-solid'
          : 'border-neutral-300 dark:border-neutral-600',
        disabled && 'opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-900'
      )}
      style={{
        borderColor: isDragging && !disabled ? brandColors.primary : undefined,
        backgroundColor: isDragging && !disabled ? `${brandColors.primary}08` : undefined,
      }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={disabled ? undefined : onClick}
    >
      {/* Upload Icon */}
      <div 
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4',
          'bg-neutral-100 dark:bg-neutral-800'
        )}
        style={{
          backgroundColor: isDragging && !disabled ? `${brandColors.primary}15` : undefined,
        }}
      >
        <ExportCurve 
          size={24} 
          color={isDragging && !disabled ? brandColors.primary : 'rgb(156, 163, 175)'} 
          variant="Linear"
        />
      </div>
      
      {/* Text */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
        {description}{' '}
        <span 
          className="font-semibold"
          style={{ color: brandColors.primary }}
        >
          {title}
        </span>
      </p>
      
      {/* File type and size info */}
      <p className="text-xs text-neutral-500 dark:text-neutral-500">
        {acceptLabel}
        {sizeLabel && ` (${sizeLabel} maximum)`}
      </p>
    </div>
  );
}

// ============================================================================
// Main FileUpload Component
// ============================================================================

export function FileUpload({
  type = 'embedded',
  accept,
  maxSize = 50 * 1024 * 1024, // 50MB default
  maxFiles = 10,
  files: controlledFiles,
  disabled = false,
  title,
  description,
  modalTitle = 'Upload Files',
  onChange,
  onRemove,
  onRetry,
  onCancel,
  onSubmit,
  className,
}: FileUploadProps) {
  const { brandColors } = useBrand();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalFiles, setInternalFiles] = useState<FileItem[]>([]);
  
  const files = controlledFiles !== undefined ? controlledFiles : internalFiles;
  
  // Handle file selection
  const handleFiles = useCallback((newFiles: File[]) => {
    if (disabled) return;
    
    const validFiles = newFiles
      .slice(0, maxFiles - files.length)
      .filter(file => {
        if (maxSize && file.size > maxSize) return false;
        return true;
      });
    
    const fileItems: FileItem[] = validFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      state: 'uploading' as FileItemState,
    }));
    
    const updatedFiles = [...files, ...fileItems];
    
    if (controlledFiles === undefined) {
      setInternalFiles(updatedFiles);
    }
    onChange?.(updatedFiles);
    
    // Simulate upload progress
    fileItems.forEach((fileItem, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Update file state to success
          setTimeout(() => {
            const updateFiles = (prev: FileItem[]) => 
              prev.map(f => f.id === fileItem.id ? { ...f, progress: 100, state: 'success' as FileItemState } : f);
            
            if (controlledFiles === undefined) {
              setInternalFiles(updateFiles);
            }
            onChange?.(updateFiles(files));
          }, 300);
        } else {
          const updateFiles = (prev: FileItem[]) => 
            prev.map(f => f.id === fileItem.id ? { ...f, progress: Math.min(progress, 99) } : f);
          
          if (controlledFiles === undefined) {
            setInternalFiles(updateFiles);
          }
        }
      }, 200 + index * 100);
    });
  }, [disabled, maxFiles, maxSize, files, controlledFiles, onChange]);
  
  // Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (inputFiles) {
      handleFiles(Array.from(inputFiles));
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };
  
  // Handle remove file
  const handleRemove = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    if (controlledFiles === undefined) {
      setInternalFiles(updatedFiles);
    }
    onRemove?.(fileId);
    onChange?.(updatedFiles);
  };
  
  // Render content
  const renderContent = () => (
    <div className={cn('space-y-4', className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      {/* Drop Zone */}
      <FileDropZone
        accept={accept}
        maxSize={maxSize}
        disabled={disabled || files.length >= maxFiles}
        title={title}
        description={description}
        isDragging={isDragging}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFiles}
        onClick={() => fileInputRef.current?.click()}
      />
      
      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map(file => (
            <FileProgressItem
              key={file.id}
              file={file}
              disabled={disabled}
              onRemove={() => handleRemove(file.id)}
              onRetry={() => onRetry?.(file.id)}
              onCancel={() => handleRemove(file.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
  
  // Modal type wrapper
  if (type === 'modal') {
    return (
      <div 
        className={cn(
          'bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden',
          'border border-neutral-200 dark:border-neutral-700',
          'shadow-lg'
        )}
        style={{
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
        }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {modalTitle}
          </h3>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {renderContent()}
        </div>
        
        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={disabled}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium',
              'text-neutral-700 dark:text-neutral-300',
              'border border-neutral-300 dark:border-neutral-600',
              'hover:bg-neutral-50 dark:hover:bg-neutral-800',
              'transition-colors',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={disabled || files.length === 0 || files.some(f => f.state === 'uploading')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium',
              'text-white',
              'transition-colors',
              (disabled || files.length === 0 || files.some(f => f.state === 'uploading')) && 'opacity-50 cursor-not-allowed'
            )}
            style={{ backgroundColor: brandColors.primary }}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
  
  // Embedded type (default)
  return renderContent();
}

export default FileUpload;
