
import { ProjectKnowledge } from '@/types/documentation';

export const projectKnowledge: ProjectKnowledge = {
  sections: [
    {
      id: 'integrations',
      title: 'Platform Integrations',
      description: 'Documentation for social media and platform integrations',
      items: [
        {
          id: 'youtube-setup',
          title: 'YouTube Integration Setup',
          content: 'To connect YouTube: 1. Click Connect YouTube 2. Authorize with Google 3. Select channel 4. Import content automatically',
          category: 'integration',
          tags: ['youtube', 'oauth', 'content-analysis'],
          lastUpdated: new Date(),
          priority: 'high'
        },
        {
          id: 'tiktok-setup',
          title: 'TikTok Integration Setup',
          content: 'To connect TikTok: 1. Click Connect TikTok 2. Authorize with TikTok Business 3. Select account 4. Enable content sync',
          category: 'integration',
          tags: ['tiktok', 'oauth', 'content-analysis'],
          lastUpdated: new Date(),
          priority: 'high'
        }
      ]
    },
    {
      id: 'features',
      title: 'Core Features',
      description: 'Documentation for application features',
      items: [
        {
          id: 'content-analysis',
          title: 'Content Analysis Engine',
          content: 'The AI analyzes your content for engagement patterns, optimal posting times, and audience preferences. Uses machine learning to provide personalized recommendations.',
          category: 'feature',
          tags: ['ai', 'analysis', 'recommendations'],
          lastUpdated: new Date(),
          priority: 'high'
        }
      ]
    }
  ],
  commonIssues: [
    {
      id: 'auth-issues',
      title: 'Authentication Problems',
      content: 'If experiencing login issues: 1. Clear browser cache 2. Check email verification 3. Try incognito mode 4. Contact support if persistent',
      category: 'troubleshooting',
      tags: ['auth', 'login', 'troubleshooting'],
      lastUpdated: new Date(),
      priority: 'high'
    },
    {
      id: 'sync-issues',
      title: 'Platform Sync Issues',
      content: 'If platform data is not syncing: 1. Check internet connection 2. Re-authorize platform 3. Check API rate limits 4. Wait for next sync cycle',
      category: 'troubleshooting',
      tags: ['sync', 'api', 'troubleshooting'],
      lastUpdated: new Date(),
      priority: 'medium'
    }
  ],
  bestPractices: [
    {
      id: 'regular-sync',
      title: 'Regular Content Sync',
      content: 'Enable automatic sync for all connected platforms to get the most accurate insights. Sync frequency: Every 2 hours for active platforms.',
      category: 'api',
      tags: ['sync', 'best-practices', 'optimization'],
      lastUpdated: new Date(),
      priority: 'medium'
    }
  ]
};
