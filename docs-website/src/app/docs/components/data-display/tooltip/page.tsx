'use client';

import { useState } from 'react';
import { 
  Grid5,
  InfoCircle,
  Setting2,
  MessageQuestion,
  Notification
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { 
  Tooltip,
  SimpleTooltip,
  Button,
  IconButton
} from '@/components/ui';
import type { TooltipPosition } from '@/components/ui/data-display';
import { useTheme } from 'next-themes';
import { grayLight, grayDark } from '@/tokens/primitives/colors';

export default function TooltipPage() {
  const component = getComponentBySlug('data-display', 'tooltip');
  if (!component) return null;

  // Playground state
  const [position, setPosition] = useState<TooltipPosition>('top');
  const [showSteps, setShowSteps] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Demo tour state
  const [tourStep, setTourStep] = useState(1);
  const [tourOpen, setTourOpen] = useState(false);

  const code = `import { Tooltip, SimpleTooltip } from '@singular/ui';

// Full-featured Tooltip (for guided tours)
<Tooltip
  position="${position}"
  title="Feature Title"
  content="Description text explaining the feature."
  showSteps={${showSteps}}
  currentStep={${currentStep}}
  totalSteps={${totalSteps}}
  showNavigation={${showNavigation}}
  showCloseButton={${showCloseButton}}
  trigger="click"
  open={open}
  onOpenChange={setOpen}
  onNext={() => setStep(s => s + 1)}
  onPrev={() => setStep(s => s - 1)}
>
  <Button>Click to open</Button>
</Tooltip>

// Simple tooltip (basic hover)
<SimpleTooltip content="Helpful text" position="top">
  <Button>Hover me</Button>
</SimpleTooltip>`;

  const controls: PlaygroundControl[] = [
    {
      name: 'position',
      type: 'select',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      defaultValue: 'top',
    },
    {
      name: 'showSteps',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showNavigation',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      defaultValue: true,
    },
  ];

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'position':
        setPosition(value as TooltipPosition);
        break;
      case 'showSteps':
        setShowSteps(value as boolean);
        break;
      case 'showNavigation':
        setShowNavigation(value as boolean);
        break;
      case 'showCloseButton':
        setShowCloseButton(value as boolean);
        break;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
      icon={<Grid5 className="w-6 h-6" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground
          code={code}
          controls={controls}
          onControlChange={handleControlChange}
          controlValues={{
            position,
            showSteps,
            showNavigation,
            showCloseButton,
          }}
        >
          <div className="flex items-center justify-center py-16">
            <Tooltip
              position={position}
              title="Feature Title"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
              showSteps={showSteps}
              currentStep={currentStep}
              totalSteps={totalSteps}
              showNavigation={showNavigation}
              showCloseButton={showCloseButton}
              trigger="click"
              defaultOpen={true}
              onNext={handleNext}
              onPrev={handlePrev}
              prevDisabled={currentStep === 1}
              nextDisabled={currentStep === totalSteps}
            >
              <Button variant="outline">Click to toggle</Button>
            </Tooltip>
          </div>
        </LivePlayground>

        {/* Position Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Position Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Tooltips can be positioned on any side of the trigger element.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
            {(['top', 'bottom', 'left', 'right'] as TooltipPosition[]).map((pos) => (
              <div key={pos} className="flex flex-col items-center gap-2">
                <div className="py-12">
                  <Tooltip
                    position={pos}
                    title="Title here"
                    content="Description text for the tooltip."
                    showSteps={false}
                    showNavigation={false}
                    showCloseButton={false}
                    trigger="hover"
                    width={200}
                  >
                    <Button variant="outline" size="sm">
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Simple Tooltip */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Simple Tooltip
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Use SimpleTooltip for basic hover hints without navigation or step indicators.
          </p>
          
          <div className="flex flex-wrap items-center gap-8 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
            <SimpleTooltip content="View settings" position="top">
              <IconButton 
                icon={<Setting2 variant="Linear" size={20} />} 
                label="Settings"
                variant="tertiary"
              />
            </SimpleTooltip>
            
            <SimpleTooltip content="Get help and support" position="bottom">
              <IconButton 
                icon={<MessageQuestion variant="Linear" size={20} />} 
                label="Help"
                variant="tertiary"
              />
            </SimpleTooltip>
            
            <SimpleTooltip content="View notifications" position="left">
              <IconButton 
                icon={<Notification variant="Linear" size={20} />} 
                label="Notifications"
                variant="tertiary"
              />
            </SimpleTooltip>
            
            <SimpleTooltip content="More information" position="right">
              <IconButton 
                icon={<InfoCircle variant="Linear" size={20} />} 
                label="Info"
                  variant="tertiary"
              />
            </SimpleTooltip>
          </div>
        </section>

        {/* Guided Tour Example */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Guided Tour
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Use the full Tooltip component with step indicators and navigation for onboarding tours.
          </p>
          
          <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
            <div className="flex items-center justify-center gap-8">
              <Tooltip
                position="bottom"
                title={tourStep === 1 ? "Welcome!" : tourStep === 2 ? "Explore Features" : "Get Started"}
                content={
                  tourStep === 1 
                    ? "This is your dashboard. Let's take a quick tour to help you get started."
                    : tourStep === 2 
                    ? "Click on different sections to explore the available features."
                    : "You're all set! Click the button below to begin using the app."
                }
                showSteps={true}
                currentStep={tourStep}
                totalSteps={3}
                showNavigation={true}
                showCloseButton={true}
                trigger="manual"
                open={tourOpen}
                onOpenChange={setTourOpen}
                onNext={() => {
                  if (tourStep < 3) {
                    setTourStep(tourStep + 1);
                  } else {
                    setTourOpen(false);
                    setTourStep(1);
                  }
                }}
                onPrev={() => {
                  if (tourStep > 1) {
                    setTourStep(tourStep - 1);
                  }
                }}
                prevDisabled={tourStep === 1}
                nextLabel={tourStep === 3 ? "Finish" : undefined}
              >
                <Button 
                  onClick={() => {
                    setTourOpen(true);
                    setTourStep(1);
                  }}
                >
                  Start Tour
                </Button>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Trigger Types */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Trigger Types
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Tooltips can be triggered by hover, click, or controlled manually.
          </p>
          
          <div className="flex flex-wrap items-center gap-8 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <Tooltip
                position="top"
                title="Hover Trigger"
                content="This tooltip appears on hover."
                trigger="hover"
                showSteps={false}
                showNavigation={false}
                showCloseButton={false}
              >
                <Button variant="outline">Hover me</Button>
              </Tooltip>
              <span className="text-xs text-neutral-500">Hover</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Tooltip
                position="top"
                title="Click Trigger"
                content="This tooltip toggles on click."
                trigger="click"
                showSteps={false}
                showNavigation={false}
              >
                <Button variant="outline">Click me</Button>
              </Tooltip>
              <span className="text-xs text-neutral-500">Click</span>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex items-center justify-center p-4">
              <SimpleTooltip content="Tap to interact" position="bottom">
                <Button size="sm">Mobile Tooltip</Button>
              </SimpleTooltip>
            </div>
          }
          tablet={
            <div className="flex items-center justify-center p-6">
              <Tooltip
                position="bottom"
                title="Tablet View"
                content="Tooltips work well on tablet devices."
                showSteps={false}
                showNavigation={false}
                trigger="click"
              >
                <Button>Tap to open</Button>
              </Tooltip>
            </div>
          }
          desktop={
            <div className="flex items-center justify-center p-8">
              <Tooltip
                position="right"
                title="Desktop Experience"
                content="Full tooltip support with hover and click triggers."
                showSteps={true}
                currentStep={1}
                totalSteps={3}
                showNavigation={true}
                trigger="hover"
              >
                <Button>Hover or click</Button>
              </Tooltip>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use tooltips for supplementary, non-essential information', 
              textAr: 'استخدم التلميحات للمعلومات التكميلية غير الأساسية' 
            },
            { 
              text: 'Keep tooltip text concise and helpful', 
              textAr: 'اجعل نص التلميح موجزًا ومفيدًا' 
            },
            { 
              text: 'Position tooltips to avoid covering important content', 
              textAr: 'ضع التلميحات بحيث لا تغطي المحتوى المهم' 
            },
            { 
              text: 'Use guided tours sparingly for onboarding', 
              textAr: 'استخدم الجولات الإرشادية باعتدال للتعريف بالتطبيق' 
            },
          ]}
          donts={[
            { 
              text: 'Don\'t put essential information only in tooltips', 
              textAr: 'لا تضع المعلومات الأساسية في التلميحات فقط' 
            },
            { 
              text: 'Don\'t use tooltips for interactive forms or inputs', 
              textAr: 'لا تستخدم التلميحات للنماذج أو المدخلات التفاعلية' 
            },
            { 
              text: 'Don\'t create overly long tooltip content', 
              textAr: 'لا تنشئ محتوى تلميح طويل جدًا' 
            },
            { 
              text: 'Don\'t rely on tooltips for critical user actions', 
              textAr: 'لا تعتمد على التلميحات للإجراءات الحرجة للمستخدم' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
