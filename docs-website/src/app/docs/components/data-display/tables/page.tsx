'use client';

import { useState } from 'react';
import { 
  Grid5,
  Document,
  More,
  Edit,
  Trash,
  Eye,
  ProfileCircle
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { 
  Table, 
  TablePageHeader,
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  TablePagination,
  Tag,
  IconContainer,
  Button
} from '@/components/ui';
import type { TableCellType, TableCellLeading, TableSortDirection } from '@/components/ui/data-display';
import { useTheme } from 'next-themes';

// Sample data for examples
const sampleUsers = [
  { id: 1, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 2, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 3, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 4, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 5, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 6, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 7, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 8, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 9, name: 'Text Here', description: 'Description here', status: 'success' },
  { id: 10, name: 'Text Here', description: 'Description here', status: 'success' },
];

export default function TablesPage() {
  const component = getComponentBySlug('data-display', 'tables');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Playground state
  const [cellType, setCellType] = useState<TableCellType>('text');
  const [leading, setLeading] = useState<TableCellLeading>('none');
  const [showMainText, setShowMainText] = useState(true);
  const [showSupportingText, setShowSupportingText] = useState(true);
  const [sortable, setSortable] = useState(true);
  const [sortDirection, setSortDirection] = useState<TableSortDirection>('asc');

  // Selection state for examples
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  if (!component) return null;

  const allSelected = selectedRows.length === sampleUsers.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < sampleUsers.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? sampleUsers.map(u => u.id) : []);
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows(prev => 
      checked ? [...prev, id] : prev.filter(r => r !== id)
    );
  };

  const code = `import { 
  Table, 
  TablePageHeader,
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  TablePagination,
  Tag
} from '@singular/ui';

// Full Table with Page Header (Figma Layout)
<div className="rounded-xl border overflow-hidden">
  <TablePageHeader
    title="Title Goes Here"
    description="Description for title here"
    tag={<Tag status="default" size="sm">Text Here</Tag>}
    primaryAction={<Button variant="primary">Text Here</Button>}
    secondaryAction={<Button variant="secondary">Secondary</Button>}
    tertiaryAction={<Button variant="tertiary">Tertiary</Button>}
    searchPlaceholder="Search..."
  />
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead showCheckbox sortable sortDirection="asc">
          Title here
        </TableHead>
        <TableHead>Title here</TableHead>
        <TableHead>Title here</TableHead>
        <TableHead />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell 
            type="image" 
            leading="checkbox"
            imageSrc={item.image}
            mainText={item.name}
            supportingText={item.description}
          />
          <TableCell type="tag" tag={<Tag status="success">Text Here</Tag>} />
          <TableCell supportingText={item.description} showMainText={false} />
          <TableCell type="icon" icon={<More size={24} />} />
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <TablePagination
    currentPage={2}
    totalPages={10}
    totalRecords={200}
    itemsPerPage={10}
    onPageChange={setCurrentPage}
  />
</div>`;

  const controls: PlaygroundControl[] = [
    {
      name: 'Cell Type',
      nameAr: 'نوع الخلية',
      type: 'select',
      defaultValue: 'text',
      options: [
        { value: 'text', label: 'Text', labelAr: 'نص' },
        { value: 'image', label: 'Image', labelAr: 'صورة' },
        { value: 'icon-container', label: 'Icon Container', labelAr: 'حاوية أيقونة' },
        { value: 'tag', label: 'Tag', labelAr: 'علامة' },
        { value: 'icon', label: 'Icon', labelAr: 'أيقونة' },
      ],
    },
    {
      name: 'Leading',
      nameAr: 'العنصر الرائد',
      type: 'select',
      defaultValue: 'none',
      options: [
        { value: 'none', label: 'None', labelAr: 'بدون' },
        { value: 'checkbox', label: 'Checkbox', labelAr: 'مربع اختيار' },
        { value: 'radio', label: 'Radio', labelAr: 'زر راديو' },
        { value: 'toggle', label: 'Toggle', labelAr: 'تبديل' },
      ],
    },
    {
      name: 'Show Main Text',
      nameAr: 'إظهار النص الرئيسي',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Supporting Text',
      nameAr: 'إظهار النص الداعم',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Sortable Header',
      nameAr: 'عنوان قابل للفرز',
      type: 'boolean',
      defaultValue: true,
    },
  ];

  const controlValues = {
    'Cell Type': cellType,
    'Leading': leading,
    'Show Main Text': showMainText,
    'Show Supporting Text': showSupportingText,
    'Sortable Header': sortable,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'Cell Type':
        setCellType(value as TableCellType);
        break;
      case 'Leading':
        setLeading(value as TableCellLeading);
        break;
      case 'Show Main Text':
        setShowMainText(value as boolean);
        break;
      case 'Show Supporting Text':
        setShowSupportingText(value as boolean);
        break;
      case 'Sortable Header':
        setSortable(value as boolean);
        break;
    }
  };

  return (
    <ComponentDocTemplate 
      title={component.name} 
      titleAr={component.nameAr} 
      description={component.description} 
      descriptionAr={component.descriptionAr} 
      category="Data Display" 
      categorySlug="data-display" 
      icon={<Grid5 className="w-6 h-6" variant="Bold" />}
    >
      <div className="space-y-16">
        {/* Full Table Layout (Figma Design) */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Complete Table Layout
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Full table matching the Figma design with page header, search, action buttons, and pagination.
          </p>
          <div 
            className="rounded-xl overflow-hidden"
            style={{ 
              border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}`,
              backgroundColor: isDark ? '#111317' : '#ffffff'
            }}
          >
            {/* Page Header */}
            <TablePageHeader
              title="Title Goes Here"
              description="Description for title here"
              tag={<Tag status="default" size="sm">Text Here</Tag>}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              primaryAction={
                <button
                  className="px-4 py-2.5 rounded-xl text-sm font-medium"
                  style={{ 
                    backgroundColor: '#00CE8B',
                    color: '#111317'
                  }}
                >
                  Text Here
                </button>
              }
              secondaryAction={
                <button
                  className="px-4 py-2.5 rounded-xl text-sm font-medium"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(0, 206, 139, 0.1)' : '#e6faf3',
                    color: '#00714c'
                  }}
                >
                  Secondary
                </button>
              }
              tertiaryAction={
                <button
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border"
                  style={{ 
                    backgroundColor: isDark ? '#111317' : '#ffffff',
                    borderColor: isDark ? '#2a2d35' : '#e2e6ee',
                    color: isDark ? '#fff' : '#111317'
                  }}
                >
                  Tertiary
                </button>
              }
            />
            
            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow hoverable={false}>
                  <TableHead 
                    showCheckbox 
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckboxChange={handleSelectAll}
                    sortable 
                    sortDirection="asc"
                  >
                    Title here
                  </TableHead>
                  <TableHead>Title here</TableHead>
                  <TableHead>Title here</TableHead>
                  <TableHead>Title here</TableHead>
                  <TableHead>Title here</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleUsers.map((user) => (
                  <TableRow key={user.id} selected={selectedRows.includes(user.id)}>
                    <TableCell 
                      type="image"
                      leading="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectRow(user.id, checked)}
                      imageSrc={`https://picsum.photos/seed/user${user.id}/40/40`}
                      mainText={user.name}
                      supportingText={user.description}
                    />
                    <TableCell 
                      type="tag" 
                      tag={<Tag status="success" size="sm">Text Here</Tag>}
                    />
                    <TableCell 
                      type="icon-container"
                      icon={<Document size={20} variant="Outline" style={{ color: '#00714c' }} />}
                      supportingText="Description here"
                      showMainText={false}
                    />
                    <TableCell supportingText="Description here" showMainText={false} />
                    <TableCell supportingText="Description here" showMainText={false} />
                    <TableCell 
                      type="icon" 
                      icon={<More size={24} variant="Linear" style={{ color: '#00714c' }} />}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            <TablePagination
              currentPage={currentPage}
              totalPages={10}
              totalRecords={200}
              itemsPerPage={10}
              onPageChange={setCurrentPage}
              showRecordsCount
            />
          </div>
        </section>

        {/* Interactive Playground */}
        <LivePlayground 
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-full max-w-3xl overflow-auto">
            <Table>
              <TableHeader>
                <TableRow hoverable={false}>
                  <TableHead 
                    sortable={sortable} 
                    sortDirection={sortable ? sortDirection : null}
                    onSort={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                    showCheckbox={leading === 'checkbox'}
                  >
                    Title here
                  </TableHead>
                  <TableHead>Title here</TableHead>
                  <TableHead>Title here</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((row) => (
                  <TableRow key={row}>
                    <TableCell
                      type={cellType}
                      leading={leading}
                      mainText={showMainText ? 'Text Here' : undefined}
                      supportingText={showSupportingText ? 'Description here' : undefined}
                      showMainText={showMainText}
                      showSupportingText={showSupportingText}
                      imageSrc={cellType === 'image' ? `https://picsum.photos/seed/cell${row}/40/40` : undefined}
                      icon={cellType === 'icon-container' ? (
                        <Document size={20} variant="Outline" style={{ color: '#00714c' }} />
                      ) : cellType === 'icon' ? (
                        <More size={24} variant="Linear" style={{ color: '#00714c' }} />
                      ) : undefined}
                      tag={cellType === 'tag' ? <Tag status="success" size="sm">Text Here</Tag> : undefined}
                    />
                    <TableCell supportingText="Description here" showMainText={false} />
                    <TableCell supportingText="Description here" showMainText={false} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </LivePlayground>

        {/* Cell Types */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Cell Types
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Table cells support various content types to display different kinds of data.
          </p>
          <div 
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}` }}
          >
            <Table>
              <TableHeader>
                <TableRow hoverable={false}>
                  <TableHead>Type</TableHead>
                  <TableHead>Example</TableHead>
                  <TableHead>Use Case</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell mainText="Text only" showSupportingText={false} />
                  <TableCell 
                    type="text" 
                    mainText="Text Here" 
                    supportingText="Description here" 
                  />
                  <TableCell supportingText="Default text content" showMainText={false} />
                </TableRow>
                <TableRow>
                  <TableCell mainText="Image" showSupportingText={false} />
                  <TableCell 
                    type="image" 
                    imageSrc="https://picsum.photos/seed/demo/40/40"
                    mainText="Text Here" 
                    supportingText="Description here" 
                  />
                  <TableCell supportingText="Users, products with images" showMainText={false} />
                </TableRow>
                <TableRow>
                  <TableCell mainText="Icon container" showSupportingText={false} />
                  <TableCell 
                    type="icon-container" 
                    icon={<Document size={20} variant="Outline" style={{ color: '#00714c' }} />}
                    mainText="Text Here" 
                    supportingText="Description here" 
                  />
                  <TableCell supportingText="Files, documents, categories" showMainText={false} />
                </TableRow>
                <TableRow>
                  <TableCell mainText="Tag" showSupportingText={false} />
                  <TableCell 
                    type="tag" 
                    tag={<Tag status="success" size="sm">Text Here</Tag>}
                  />
                  <TableCell supportingText="Status indicators" showMainText={false} />
                </TableRow>
                <TableRow>
                  <TableCell mainText="Icon" showSupportingText={false} />
                  <TableCell 
                    type="icon" 
                    icon={<More size={24} variant="Linear" style={{ color: '#00714c' }} />}
                  />
                  <TableCell supportingText="Actions menu, indicators" showMainText={false} />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Leading Controls */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Leading Controls
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Add selection controls before cell content for interactive tables.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Checkbox */}
            <div 
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}` }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: isDark ? '#1a1d23' : '#f4f6fc' }}>
                <h3 className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#111317' }}>Checkbox</h3>
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell 
                      leading="checkbox" 
                      checked={true}
                      mainText="Selected Row" 
                      showSupportingText={false}
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell 
                      leading="checkbox" 
                      checked={false}
                      mainText="Unselected Row" 
                      showSupportingText={false}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Radio */}
            <div 
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}` }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: isDark ? '#1a1d23' : '#f4f6fc' }}>
                <h3 className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#111317' }}>Radio</h3>
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell 
                      leading="radio" 
                      checked={true}
                      mainText="Selected Option" 
                      showSupportingText={false}
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell 
                      leading="radio" 
                      checked={false}
                      mainText="Unselected Option" 
                      showSupportingText={false}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Toggle */}
            <div 
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}` }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: isDark ? '#1a1d23' : '#f4f6fc' }}>
                <h3 className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#111317' }}>Toggle</h3>
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell 
                      leading="toggle" 
                      checked={true}
                      mainText="Enabled" 
                      showSupportingText={false}
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell 
                      leading="toggle" 
                      checked={false}
                      mainText="Disabled" 
                      showSupportingText={false}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Sortable Headers */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Sortable Headers
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Headers can display sort indicators for sortable columns.
          </p>
          <div 
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}` }}
          >
            <Table>
              <TableHeader>
                <TableRow hoverable={false}>
                  <TableHead sortable sortDirection="asc">Ascending</TableHead>
                  <TableHead sortable sortDirection="desc">Descending</TableHead>
                  <TableHead sortable sortDirection={null}>Unsorted</TableHead>
                  <TableHead>Not Sortable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell supportingText="First" showMainText={false} />
                  <TableCell supportingText="Third" showMainText={false} />
                  <TableCell supportingText="Any" showMainText={false} />
                  <TableCell supportingText="Static" showMainText={false} />
                </TableRow>
                <TableRow>
                  <TableCell supportingText="Second" showMainText={false} />
                  <TableCell supportingText="Second" showMainText={false} />
                  <TableCell supportingText="Any" showMainText={false} />
                  <TableCell supportingText="Static" showMainText={false} />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Pagination */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Pagination
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Use TablePagination for large datasets that require multiple pages.
          </p>
          <div 
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${isDark ? '#2a2d35' : '#e2e6ee'}` }}
          >
            <TablePagination
              currentPage={2}
              totalPages={10}
              totalRecords={200}
              itemsPerPage={10}
              onPageChange={() => {}}
              showRecordsCount
            />
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow hoverable={false}>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleUsers.slice(0, 3).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell 
                        type="image"
                        imageSrc={`https://picsum.photos/seed/user${user.id}/40/40`}
                        mainText={user.name}
                        showSupportingText={false}
                      />
                      <TableCell type="tag" tag={<Tag status="success" size="sm">Text Here</Tag>} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          }
          tablet={
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow hoverable={false}>
                    <TableHead sortable sortDirection="asc">User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleUsers.slice(0, 3).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell 
                        type="image"
                        imageSrc={`https://picsum.photos/seed/user${user.id}/40/40`}
                        mainText={user.name}
                        supportingText={user.description}
                      />
                      <TableCell type="tag" tag={<Tag status="success" size="sm">Text Here</Tag>} />
                      <TableCell supportingText={user.description} showMainText={false} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          }
          desktop={
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow hoverable={false}>
                    <TableHead showCheckbox sortable sortDirection="asc">User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleUsers.slice(0, 3).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell 
                        type="image"
                        leading="checkbox"
                        imageSrc={`https://picsum.photos/seed/user${user.id}/40/40`}
                        mainText={user.name}
                        supportingText={user.description}
                      />
                      <TableCell type="tag" tag={<Tag status="success" size="sm">Text Here</Tag>} />
                      <TableCell supportingText={user.description} showMainText={false} />
                      <TableCell type="icon" icon={<More size={24} style={{ color: '#00714c' }} />} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use sortable headers for columns that benefit from sorting', 
              textAr: 'استخدم العناوين القابلة للفرز للأعمدة التي تستفيد من الفرز' 
            },
            { 
              text: 'Include pagination for tables with many rows', 
              textAr: 'أضف ترقيم الصفحات للجداول ذات الصفوف الكثيرة' 
            },
            { 
              text: 'Use consistent cell types within the same column', 
              textAr: 'استخدم أنواع خلايا متسقة داخل نفس العمود' 
            },
            { 
              text: 'Provide visual indicators for selected rows', 
              textAr: 'وفر مؤشرات مرئية للصفوف المحددة' 
            },
            { 
              text: 'Use Tags for status columns to improve scannability', 
              textAr: 'استخدم العلامات لأعمدة الحالة لتحسين قابلية المسح' 
            },
          ]}
          donts={[
            { 
              text: "Don't show too many columns on mobile", 
              textAr: 'لا تظهر الكثير من الأعمدة على الجوال' 
            },
            { 
              text: "Don't mix different leading controls in the same table", 
              textAr: 'لا تخلط عناصر التحكم الرائدة المختلفة في نفس الجدول' 
            },
            { 
              text: "Don't use tables for simple key-value data", 
              textAr: 'لا تستخدم الجداول للبيانات البسيطة من نوع المفتاح والقيمة' 
            },
            { 
              text: "Don't make every column sortable", 
              textAr: 'لا تجعل كل عمود قابلاً للفرز' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
