'use client';

import { useState } from 'react';
import { FormInput } from 'lucide-react';
import { ExportCurve, DocumentText, Trash, RefreshCircle } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { FileUpload, FileDropZone, FileProgressItem, Button } from '@/components/ui';
import type { FileItem, FileUploadType } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function FileUploadPage() {
  const component = getComponentBySlug('data-entry', 'file-upload');
  const { brandColors } = useBrand();
  
  // Interactive demo state
  const [uploadType, setUploadType] = useState<FileUploadType>('embedded');
  const [maxFiles, setMaxFiles] = useState(5);
  const [disabled, setDisabled] = useState(false);
  const [demoFiles, setDemoFiles] = useState<FileItem[]>([]);

  if (!component) return null;

  const code = `import { FileUpload } from '@singular/ui';
import type { FileItem } from '@singular/ui';

function MyComponent() {
  const [files, setFiles] = useState<FileItem[]>([]);
  
  return (
    <FileUpload
      type="${uploadType}"
      accept=".pdf,.csv,.txt"
      maxSize={50 * 1024 * 1024}
      maxFiles={${maxFiles}}
      files={files}
      onChange={setFiles}
      onRemove={(id) => setFiles(f => f.filter(file => file.id !== id))}
      ${disabled ? 'disabled' : ''}
    />
  );
}`;

  // Sample file items for state demos
  const uploadingFile: FileItem = {
    id: 'uploading-1',
    name: 'quarterly-report.pdf',
    size: 2457600,
    type: 'application/pdf',
    progress: 65,
    state: 'uploading',
  };

  const successFile: FileItem = {
    id: 'success-1',
    name: 'financial-data.csv',
    size: 1258291,
    type: 'text/csv',
    progress: 100,
    state: 'success',
  };

  const errorFile: FileItem = {
    id: 'error-1',
    name: 'corrupted-file.pdf',
    size: 5242880,
    type: 'application/pdf',
    state: 'error',
    error: 'Upload failed - connection lost',
  };

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Entry"
      categorySlug="data-entry"
      icon={<ExportCurve size={24} variant="Linear" />}
    >
      <div className="space-y-12">
        {/* Interactive Playground */}
        <LivePlayground 
          code={code}
          controls={
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Type:</span>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as FileUploadType)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                >
                  <option value="embedded">Embedded</option>
                  <option value="modal">Modal</option>
                </select>
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Max Files:</span>
                <select
                  value={maxFiles}
                  onChange={(e) => setMaxFiles(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </label>
              
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  className="rounded"
                />
                <span className="text-neutral-600 dark:text-neutral-400">Disabled</span>
              </label>
              
              {demoFiles.length > 0 && (
                <button
                  onClick={() => setDemoFiles([])}
                  className="px-3 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear Files
                </button>
              )}
            </div>
          }
        >
          <div className="w-full max-w-lg mx-auto">
            <FileUpload
              type={uploadType}
              accept=".pdf,.csv,.txt,image/*"
              maxSize={50 * 1024 * 1024}
              maxFiles={maxFiles}
              disabled={disabled}
              files={demoFiles}
              onChange={setDemoFiles}
              onRemove={(id) => setDemoFiles(f => f.filter(file => file.id !== id))}
              onCancel={() => setDemoFiles([])}
              onSubmit={() => alert('Files submitted!')}
              modalTitle="Upload Documents"
            />
          </div>
        </LivePlayground>

        {/* Upload Types Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Upload Types
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Embedded Type */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Embedded (Inline)
              </h4>
              <FileUpload
                type="embedded"
                accept=".pdf,.csv"
                maxSize={50 * 1024 * 1024}
                maxFiles={3}
              />
            </div>
            
            {/* Modal Type */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Modal (With Actions)
              </h4>
              <FileUpload
                type="modal"
                accept=".pdf,.csv"
                maxSize={50 * 1024 * 1024}
                maxFiles={3}
                modalTitle="Upload Documents"
                onCancel={() => {}}
                onSubmit={() => {}}
              />
            </div>
          </div>
        </section>

        {/* File States Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            File Item States
          </h3>
          
          <div className="grid gap-4">
            {/* Uploading State */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brandColors.primary }} />
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Uploading (In Progress)
                </h4>
              </div>
              <FileProgressItem
                file={uploadingFile}
                onCancel={() => {}}
              />
            </div>
            
            {/* Success State */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Success (Completed)
                </h4>
              </div>
              <FileProgressItem
                file={successFile}
                onRemove={() => {}}
              />
            </div>
            
            {/* Error State */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Error (Failed)
                </h4>
              </div>
              <FileProgressItem
                file={errorFile}
                onRemove={() => {}}
                onRetry={() => {}}
              />
            </div>
          </div>
        </section>

        {/* Drop Zone States */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Drop Zone States
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Default State */}
            <div className="card p-4">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 text-center">
                Default
              </h4>
              <FileDropZone
                accept=".pdf,.csv"
                maxSize={50 * 1024 * 1024}
              />
            </div>
            
            {/* Dragging State */}
            <div className="card p-4">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 text-center">
                Dragging (Hover)
              </h4>
              <FileDropZone
                accept=".pdf,.csv"
                maxSize={50 * 1024 * 1024}
                isDragging={true}
              />
            </div>
            
            {/* Disabled State */}
            <div className="card p-4">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 text-center">
                Disabled
              </h4>
              <FileDropZone
                accept=".pdf,.csv"
                maxSize={50 * 1024 * 1024}
                disabled={true}
              />
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="space-y-3">
              <FileDropZone
                accept="image/*"
                maxSize={10 * 1024 * 1024}
                title="Tap to upload"
                description="Or drag & drop •"
              />
              <FileProgressItem
                file={{
                  id: 'mobile-1',
                  name: 'photo.jpg',
                  size: 1048576,
                  type: 'image/jpeg',
                  progress: 100,
                  state: 'success',
                }}
                onRemove={() => {}}
              />
            </div>
          }
          tablet={
            <div className="space-y-4">
              <FileDropZone
                accept=".pdf,.doc,.docx"
                maxSize={25 * 1024 * 1024}
              />
              <div className="space-y-2">
                <FileProgressItem
                  file={{
                    id: 'tablet-1',
                    name: 'document.pdf',
                    size: 2457600,
                    type: 'application/pdf',
                    progress: 45,
                    state: 'uploading',
                  }}
                  onCancel={() => {}}
                />
                <FileProgressItem
                  file={{
                    id: 'tablet-2',
                    name: 'report.docx',
                    size: 1258291,
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    progress: 100,
                    state: 'success',
                  }}
                  onRemove={() => {}}
                />
              </div>
            </div>
          }
          desktop={
            <FileUpload
              type="modal"
              accept=".pdf,.csv,.xlsx"
              maxSize={50 * 1024 * 1024}
              maxFiles={10}
              files={[
                {
                  id: 'desktop-1',
                  name: 'financial-report-2024.pdf',
                  size: 4718592,
                  type: 'application/pdf',
                  progress: 100,
                  state: 'success',
                },
                {
                  id: 'desktop-2',
                  name: 'data-export.csv',
                  size: 2097152,
                  type: 'text/csv',
                  progress: 78,
                  state: 'uploading',
                },
              ]}
              modalTitle="Upload Financial Documents"
              onCancel={() => {}}
              onSubmit={() => {}}
            />
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Show accepted file types clearly', textAr: 'أظهر أنواع الملفات المقبولة بوضوح' },
            { text: 'Display maximum file size limits', textAr: 'أظهر الحد الأقصى لحجم الملف' },
            { text: 'Provide visual upload progress feedback', textAr: 'وفر تغذية راجعة مرئية لتقدم الرفع' },
            { text: 'Allow users to cancel uploads in progress', textAr: 'اسمح للمستخدمين بإلغاء الرفع قيد التنفيذ' },
            { text: 'Offer retry option for failed uploads', textAr: 'وفر خيار إعادة المحاولة للرفع الفاشل' },
            { text: 'Support drag and drop for desktop users', textAr: 'ادعم السحب والإفلات لمستخدمي سطح المكتب' },
          ]}
          donts={[
            { text: "Don't allow files exceeding size limit without warning", textAr: 'لا تسمح بملفات تتجاوز الحد دون تحذير' },
            { text: "Don't hide upload errors or validation messages", textAr: 'لا تخف أخطاء الرفع أو رسائل التحقق' },
            { text: "Don't remove files without confirmation", textAr: 'لا تحذف الملفات بدون تأكيد' },
            { text: "Don't block the UI during uploads", textAr: 'لا تحجب الواجهة أثناء الرفع' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
