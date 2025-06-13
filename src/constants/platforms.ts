
import { 
  Globe, Youtube, Facebook, Instagram, Linkedin, 
  Twitter
} from 'lucide-react';
import { Platform } from '@/types/integrations';

export const platforms: Platform[] = [
  {
    id: 'website',
    name: 'Website',
    icon: Globe,
    description: 'Connect your website for content analysis',
    color: 'text-red-600',
    bgColor: 'bg-red-600/20',
    premium: false
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    description: 'Analyze your YouTube channel and videos',
    color: 'text-red-600',
    bgColor: 'bg-red-600/20',
    premium: false
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    description: 'Connect Facebook pages and analyze posts',
    color: 'text-red-600',
    bgColor: 'bg-red-600/20',
    premium: true
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    description: 'Analyze Instagram content and engagement',
    color: 'text-red-400',
    bgColor: 'bg-red-600/20',
    premium: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    description: 'Professional content analysis and optimization',
    color: 'text-red-600',
    bgColor: 'bg-red-600/20',
    premium: true
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    description: 'Tweet analysis and thread optimization',
    color: 'text-foreground',
    bgColor: 'bg-red-600/20',
    premium: true
  }
];
