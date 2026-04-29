'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import {
  FaApple,
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaFigma,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaSignalMessenger,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaTumblr,
  FaWhatsapp,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';

export type SocialPlatform =
  | 'apple'
  | 'discord'
  | 'dribbble'
  | 'facebook'
  | 'figma'
  | 'github'
  | 'google'
  | 'instagram'
  | 'linkedin'
  | 'pinterest'
  | 'reddit'
  | 'signal'
  | 'snapchat'
  | 'telegram'
  | 'tiktok'
  | 'tumblr'
  | 'twitter'
  | 'whatsapp'
  | 'youtube';

export interface SocialIconProps extends Omit<HTMLAttributes<SVGElement>, 'color'> {
  platform: SocialPlatform;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  colored?: boolean;
  className?: string;
}

// Map platform to icon component
const iconMap: Record<SocialPlatform, IconType> = {
  apple: FaApple,
  discord: FaDiscord,
  dribbble: FaDribbble,
  facebook: FaFacebook,
  figma: FaFigma,
  github: FaGithub,
  google: FaGoogle,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,
  reddit: FaReddit,
  signal: FaSignalMessenger,
  snapchat: FaSnapchat,
  telegram: FaTelegram,
  tiktok: FaTiktok,
  tumblr: FaTumblr,
  twitter: FaXTwitter,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
};

// Brand colors
const brandColors: Record<SocialPlatform, string> = {
  apple: '#000000',
  discord: '#5865F2',
  dribbble: '#EA4C89',
  facebook: '#1877F2',
  figma: '#F24E1E',
  github: '#181717',
  google: '#4285F4',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  pinterest: '#BD081C',
  reddit: '#FF4500',
  signal: '#3A76F0',
  snapchat: '#FFFC00',
  telegram: '#26A5E4',
  tiktok: '#000000',
  tumblr: '#36465D',
  twitter: '#000000',
  whatsapp: '#25D366',
  youtube: '#FF0000',
};

// Size mappings
const sizeMap: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function SocialIcon({
  platform,
  size = 'md',
  colored = true,
  className,
  ...props
}: SocialIconProps) {
  const IconComponent = iconMap[platform];
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];
  const color = colored ? brandColors[platform] : 'currentColor';

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      size={pixelSize}
      color={color}
      className={cn(className)}
      {...props}
    />
  );
}

// Available platforms
export const socialPlatforms = Object.keys(iconMap) as SocialPlatform[];

// Get brand color for platform
export function getSocialBrandColor(platform: SocialPlatform): string {
  return brandColors[platform];
}

