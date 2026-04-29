'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface Device {
  id: DeviceType;
  label: string;
  labelAr: string;
  width: number;
  icon: ReactNode;
}

const devices: Device[] = [
  { id: 'mobile', label: 'Mobile', labelAr: 'الجوال', width: 375, icon: <Smartphone className="w-4 h-4" /> },
  { id: 'tablet', label: 'Tablet', labelAr: 'التابلت', width: 768, icon: <Tablet className="w-4 h-4" /> },
  { id: 'desktop', label: 'Desktop', labelAr: 'سطح المكتب', width: 1280, icon: <Monitor className="w-4 h-4" /> },
];

export interface ResponsivePreviewProps {
  mobile: ReactNode;
  tablet: ReactNode;
  desktop: ReactNode;
  title?: string;
  titleAr?: string;
}

export function ResponsivePreview({
  mobile,
  tablet,
  desktop,
  title = 'Responsive Preview',
  titleAr = 'معاينة متجاوبة',
}: ResponsivePreviewProps) {
  const locale = useLocale();
  const { brandColors } = useBrand();
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');

  const content = {
    mobile,
    tablet,
    desktop,
  };

  const activeDeviceConfig = devices.find((d) => d.id === activeDevice)!;

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          {locale === 'ar' ? titleAr : title}
        </h3>

        {/* Device Switcher */}
        <div className="flex gap-1 p-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                activeDevice === device.id
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {device.icon}
              <span className="hidden sm:inline">
                {locale === 'ar' ? device.labelAr : device.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="bg-neutral-100 dark:bg-neutral-950 p-6 min-h-[400px] overflow-x-auto">
        <div className="flex justify-center">
          <motion.div
            layout
            className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden"
            style={{
              width: Math.min(activeDeviceConfig.width, typeof window !== 'undefined' ? window.innerWidth - 80 : 1200),
              maxWidth: '100%',
            }}
          >
            {/* Device Frame */}
            <div className="bg-neutral-200 dark:bg-neutral-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white dark:bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-500 dark:text-neutral-400 text-center truncate">
                  {activeDeviceConfig.width}px
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.div
                key={activeDevice}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {content[activeDevice]}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 text-center">
          {locale === 'ar' 
            ? `العرض: ${activeDeviceConfig.width}px • ${activeDeviceConfig.labelAr}`
            : `Width: ${activeDeviceConfig.width}px • ${activeDeviceConfig.label}`}
        </p>
      </div>
    </div>
  );
}

export default ResponsivePreview;

