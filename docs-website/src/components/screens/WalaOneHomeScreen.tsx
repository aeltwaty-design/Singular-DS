'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/data-display/Avatar';
import { SectionHeader } from '@/components/ui/navigation/SectionHeader';
import { Input } from '@/components/ui/data-entry/Input';
import {
  Notification,
  Add,
  Coin1,
  ArrowSwapHorizontal,
  Reserve,
  Heart,
  Game,
  Ticket,
  DiscountShape,
  Home2,
  Scan,
  Wallet,
  ProfileCircle,
  Shop,
  SearchNormal1,
} from 'iconsax-react';

// =============================================================================
// TYPES
// =============================================================================

interface WalaOneHomeScreenProps {
  isDark?: boolean;
  isArabic?: boolean;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const quickActions = [
  { icon: Reserve, label: 'Order Food', labelAr: 'اطلب طعام' },
  { icon: Heart, label: 'Donate', labelAr: 'تبرع' },
  { icon: Game, label: 'Games', labelAr: 'ألعاب' },
  { icon: Ticket, label: 'Vouchers', labelAr: 'قسائم' },
  { icon: DiscountShape, label: 'Offers', labelAr: 'عروض' },
];

const partners = [
  { name: 'Amazon', category: 'Partner', categoryAr: 'شريك', initial: 'a', color: '#FF9900' },
  { name: 'Fortnite', category: 'Vouchers', categoryAr: 'قسائم', initial: 'F', color: '#9D4DFF' },
  { name: 'Noon', category: 'Offers', categoryAr: 'عروض', initial: 'N', color: '#FFD100' },
];

const vouchers = [
  { title: 'Gaming Time 🕹️', gradient: ['#1A1A2E', '#534199'] },
  { title: 'Hello Summer 🍉🏝️', gradient: ['#4ECDC4', '#44A08D'] },
  { title: 'Catch up or not', gradient: ['#E74C3C', '#C0392B'] },
];

const offers = [
  { title: 'Morning Coffee ☕', gradient: ['#8B4513', '#5D3A1A'] },
  { title: 'Your needs on us 🍅', gradient: ['#2ECC71', '#27AE60'] },
  { title: 'Text for Card', gradient: ['#3498DB', '#2980B9'] },
];

const banners = [
  { title: 'Gaming Promo', gradient: ['#1A1A2E', '#534199'] },
  { title: 'Summer Sale', gradient: ['#534199', '#755BD8'] },
  { title: 'New Arrivals', gradient: ['#380AAA', '#534199'] },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function WalaOneHomeScreen({ isDark = false, isArabic = false }: WalaOneHomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {/* Gradient Header Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[320px]"
        style={{
          background: 'linear-gradient(180deg, #1B1532 0%, #380AAA 37%)',
        }}
      >
        {/* Decorative Blur Circles */}
        <div 
          className="absolute w-[296px] h-[203px] rounded-full blur-[57px]"
          style={{ 
            left: -101, 
            top: 142, 
            backgroundColor: 'rgba(138, 107, 28, 0.5)' 
          }}
        />
        <div 
          className="absolute w-[275px] h-[203px] rounded-full blur-[57px]"
          style={{ 
            left: 157, 
            top: 142, 
            backgroundColor: 'rgba(83, 65, 153, 0.5)' 
          }}
        />
      </div>

      {/* Scrollable Content */}
      <div className="relative h-full overflow-y-auto overflow-x-hidden">
        {/* Status Bar Spacer */}
        <div className="h-[54px]" />

        {/* Header */}
        <Header isArabic={isArabic} />

        {/* Points Hero */}
        <PointsHero isArabic={isArabic} />

        {/* Glass Action Buttons */}
        <GlassActionButtons isArabic={isArabic} />

        {/* White Content Card */}
        <div className="relative mt-6 bg-white rounded-t-[25px] min-h-[600px]">
          {/* Things You Can Do Section */}
          <div className="px-4 pt-6">
            <SectionHeaderWithHighlight 
              title={isArabic ? 'أشياء يمكنك فعلها' : 'Things you can do'} 
            />
            
            {/* Search Input */}
            <div className="mt-4">
              <div className="relative">
                <SearchNormal1 
                  size={20} 
                  className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" 
                />
                <input
                  type="text"
                  placeholder={isArabic ? 'ابحث عما تحتاجه..' : 'Find what you need..'}
                  className="w-full h-12 pl-10 rtl:pl-4 rtl:pr-10 pr-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#755BD8] focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {quickActions.map((action, index) => (
                <QuickActionCircle
                  key={index}
                  icon={action.icon}
                  label={isArabic ? action.labelAr : action.label}
                />
              ))}
            </div>
          </div>

          {/* Promotional Banners */}
          <div className="mt-6">
            <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {banners.map((banner, index) => (
                <BannerCard key={index} title={banner.title} gradient={banner.gradient} />
              ))}
            </div>
            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-3">
              {banners.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    index === currentBanner ? 'bg-neutral-800' : 'bg-neutral-300'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Partners Section */}
          <div className="px-4 mt-6">
            <SectionHeader
              title={isArabic ? 'الشركاء الذين تتابعهم' : 'Partners you follow'}
              trailingAction={isArabic ? '+ إضافة المزيد' : '+ Add more'}
              size="md"
            />
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {partners.map((partner, index) => (
                <PartnerCard
                  key={index}
                  name={partner.name}
                  category={isArabic ? partner.categoryAr : partner.category}
                  initial={partner.initial}
                  color={partner.color}
                />
              ))}
            </div>
          </div>

          {/* Special Vouchers Section */}
          <div className="px-4 mt-6">
            <SectionHeaderWithHighlight 
              title={isArabic ? 'قسائم مميزة' : 'Special Vouchers'} 
            />
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {vouchers.map((voucher, index) => (
                <ImageCard key={index} title={voucher.title} gradient={voucher.gradient} />
              ))}
            </div>
          </div>

          {/* Exclusive Offers Section */}
          <div className="px-4 mt-6">
            <SectionHeaderWithHighlight 
              title={isArabic ? 'عروض حصرية' : 'Exclusive Offers'} 
            />
            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {offers.map((offer, index) => (
                <ImageCard key={index} title={offer.title} gradient={offer.gradient} />
              ))}
            </div>
          </div>

          {/* Bottom Padding for Nav */}
          <div className="h-[120px]" />
        </div>
      </div>

      {/* Curved Bottom Navigation */}
      <CurvedBottomNav
        selectedIndex={selectedTab}
        onTabChange={setSelectedTab}
        isArabic={isArabic}
      />
    </div>
  );
}

// =============================================================================
// HEADER COMPONENT
// =============================================================================

function Header({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Avatar src="https://i.pravatar.cc/150?img=8" size="lg" />
        <div>
          <p className="text-sm text-[#CCD2E0]">
            {isArabic ? 'صباح الخير' : 'Good Morning'}
          </p>
          <p className="text-lg font-semibold text-[#F8F9FC]">
            {isArabic ? 'محمد' : 'Mohamed'}
          </p>
        </div>
      </div>
      <button className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
        <Notification size={20} color="white" />
      </button>
    </div>
  );
}

// =============================================================================
// POINTS HERO COMPONENT
// =============================================================================

function PointsHero({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #534199 0%, #A391E5 100%)',
        }}
      >
        <Coin1 size={18} color="white" variant="Bold" />
      </div>
      <span className="text-4xl font-semibold text-white">
        {isArabic ? '٥٠٠،٠٠٠' : '500,000'}
      </span>
    </div>
  );
}

// =============================================================================
// GLASS ACTION BUTTONS
// =============================================================================

function GlassActionButtons({ isArabic }: { isArabic: boolean }) {
  const actions = [
    { icon: Add, label: isArabic ? 'شحن' : 'Top Up' },
    { icon: Coin1, label: isArabic ? 'اكسب واستبدل' : 'Earn & Redeem' },
    { icon: ArrowSwapHorizontal, label: isArabic ? 'تحويل' : 'Transfer' },
  ];

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {actions.map((action, index) => (
        <GlassButton key={index} icon={action.icon} label={action.label} />
      ))}
    </div>
  );
}

function GlassButton({ 
  icon: Icon, 
  label 
}: { 
  icon: typeof Add; 
  label: string;
}) {
  return (
    <button className="flex flex-col items-center gap-1">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Icon size={20} color="white" />
      </div>
      <span className="text-xs text-white text-center">{label}</span>
    </button>
  );
}

// =============================================================================
// SECTION HEADER WITH HIGHLIGHT
// =============================================================================

function SectionHeaderWithHighlight({ title }: { title: string }) {
  return (
    <div className="relative inline-block">
      <div 
        className="absolute left-0 bottom-0.5 h-[9px] bg-[#C0B4ED]/50"
        style={{ width: title.length * 5.5 }}
      />
      <h2 className="relative text-base font-semibold text-neutral-900">{title}</h2>
    </div>
  );
}

// =============================================================================
// QUICK ACTION CIRCLE
// =============================================================================

function QuickActionCircle({ 
  icon: Icon, 
  label 
}: { 
  icon: typeof Reserve; 
  label: string;
}) {
  return (
    <button className="flex flex-col items-center gap-1 min-w-[66px]">
      <div className="w-14 h-14 rounded-full bg-[#E3DDF9] flex items-center justify-center">
        <Icon size={28} color="#755BD8" variant="Bold" />
      </div>
      <span className="text-xs text-neutral-900 font-medium text-center line-clamp-1">
        {label}
      </span>
    </button>
  );
}

// =============================================================================
// BANNER CARD
// =============================================================================

function BannerCard({ title, gradient }: { title: string; gradient: string[] }) {
  return (
    <div 
      className="relative min-w-[320px] h-[120px] rounded-xl overflow-hidden snap-center"
      style={{
        background: `linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
      }}
    >
      {/* Decorative Circles */}
      <div 
        className="absolute w-20 h-20 rounded-full bg-white/10"
        style={{ right: -20, top: -20 }}
      />
      <div 
        className="absolute w-[60px] h-[60px] rounded-full bg-white/[0.08]"
        style={{ left: -10, bottom: -30 }}
      />
      
      {/* Content */}
      <div className="relative p-4 h-full flex flex-col justify-center">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/80">Special promotion</p>
      </div>
    </div>
  );
}

// =============================================================================
// PARTNER CARD
// =============================================================================

function PartnerCard({ 
  name, 
  category, 
  initial, 
  color 
}: { 
  name: string; 
  category: string; 
  initial: string; 
  color: string;
}) {
  return (
    <div className="flex flex-col items-center p-3 min-w-[110px] bg-white rounded-xl border border-neutral-200">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}1A` }}
      >
        <span className="font-bold" style={{ color }}>{initial}</span>
      </div>
      <span className="text-sm text-neutral-900 mt-2">{name}</span>
      <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-neutral-100">
        {category === 'Partner' || category === 'شريك' ? (
          <Shop size={10} className="text-neutral-500" />
        ) : category === 'Vouchers' || category === 'قسائم' ? (
          <Ticket size={10} className="text-neutral-500" />
        ) : (
          <DiscountShape size={10} className="text-neutral-500" />
        )}
        <span className="text-[10px] text-neutral-500">{category}</span>
      </div>
    </div>
  );
}

// =============================================================================
// IMAGE CARD (Vouchers / Offers)
// =============================================================================

function ImageCard({ title, gradient }: { title: string; gradient: string[] }) {
  return (
    <div 
      className="relative min-w-[127px] h-[169px] rounded-xl overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
      }}
    >
      {/* Bottom Gradient Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60px]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(64, 50, 119, 0.9) 100%)',
        }}
      />
      {/* Title */}
      <div className="absolute bottom-2 left-4 right-4">
        <p className="text-sm font-semibold text-white text-center line-clamp-1">{title}</p>
      </div>
    </div>
  );
}

// =============================================================================
// CURVED BOTTOM NAVIGATION
// =============================================================================

function CurvedBottomNav({ 
  selectedIndex, 
  onTabChange, 
  isArabic 
}: { 
  selectedIndex: number; 
  onTabChange: (index: number) => void;
  isArabic: boolean;
}) {
  const tabs = [
    { icon: Home2, label: isArabic ? 'الرئيسية' : 'Home' },
    { icon: Ticket, label: isArabic ? 'السوق' : 'Market' },
    { icon: Scan, label: '', isFab: true },
    { icon: Wallet, label: isArabic ? 'المحفظة' : 'Wallet' },
    { icon: ProfileCircle, label: isArabic ? 'حسابي' : 'Account' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[95px]">
      {/* SVG Curved Background */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[70px]"
        viewBox="0 0 375 70" 
        preserveAspectRatio="none"
        fill="white"
      >
        <path d="M0 25H142C156 25 165 5 187.5 5C210 5 219 25 233 25H375V70H0V25Z" />
      </svg>

      {/* Tab Items */}
      <div className="absolute bottom-[9px] left-0 right-0 flex items-center justify-evenly">
        {tabs.map((tab, index) => {
          if (tab.isFab) {
            return (
              <button
                key={index}
                className="relative -mt-[30px] w-[62px] h-[62px] rounded-full flex items-center justify-center backdrop-blur-md"
                style={{
                  background: 'linear-gradient(180deg, rgba(98, 72, 195, 0.9) 0%, rgba(52, 34, 123, 0.9) 100%)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <tab.icon size={24} color="white" />
              </button>
            );
          }

          const isSelected = index === selectedIndex;
          return (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className="flex flex-col items-center justify-center w-[75px] h-[56px]"
            >
              <tab.icon 
                size={24} 
                color={isSelected ? '#755BD8' : '#111317'}
                variant={isSelected ? 'Bold' : 'Linear'}
              />
              <span 
                className={cn(
                  'text-xs mt-0.5',
                  isSelected ? 'text-[#755BD8] font-semibold' : 'text-neutral-900 font-medium'
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WalaOneHomeScreen;
