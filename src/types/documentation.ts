
export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: 'integration' | 'feature' | 'troubleshooting' | 'api' | 'ui';
  tags: string[];
  lastUpdated: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  items: KnowledgeItem[];
}

export interface ProjectKnowledge {
  sections: DocumentationSection[];
  commonIssues: KnowledgeItem[];
  bestPractices: KnowledgeItem[];
}
