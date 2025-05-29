
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Star, TrendingUp, Users, Code, 
  Briefcase, Megaphone, BookOpen, Zap, Heart
} from 'lucide-react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const templates = {
    business: [
      {
        title: "B2B Email Outreach",
        description: "Professional cold email templates for B2B sales and partnerships",
        prompt: "Write a professional B2B outreach email for [COMPANY] offering [SERVICE/PRODUCT]. The email should be personalized for [TARGET_ROLE] at [TARGET_COMPANY] and highlight [KEY_BENEFIT]. Keep it under 150 words and include a clear call-to-action.",
        category: "B2B",
        rating: 4.8,
        uses: 2340
      },
      {
        title: "Business Proposal Generator",
        description: "Create compelling business proposals for client presentations",
        prompt: "Create a comprehensive business proposal for [SERVICE/PRODUCT] targeting [CLIENT_NAME]. Include executive summary, problem statement, proposed solution, timeline, budget, and expected ROI. Tone should be professional and persuasive.",
        category: "B2B",
        rating: 4.9,
        uses: 1875
      },
      {
        title: "Sales Copy Framework",
        description: "High-converting sales copy using proven frameworks",
        prompt: "Write sales copy for [PRODUCT/SERVICE] using the AIDA framework (Attention, Interest, Desire, Action). Target audience: [AUDIENCE]. Key benefits: [BENEFITS]. Include social proof and urgency elements. Length: [WORD_COUNT] words.",
        category: "Sales",
        rating: 4.7,
        uses: 3120
      }
    ],
    marketing: [
      {
        title: "Social Media Content Calendar",
        description: "30-day content strategy for social media platforms",
        prompt: "Create a 30-day social media content calendar for [BUSINESS_TYPE] on [PLATFORM]. Include post types (educational, promotional, behind-the-scenes, user-generated content). Target audience: [AUDIENCE]. Brand voice: [TONE]. Include hashtag suggestions.",
        category: "Social Media",
        rating: 4.6,
        uses: 2890
      },
      {
        title: "Google Ads Campaign",
        description: "Optimized ad copy for Google Ads campaigns",
        prompt: "Create Google Ads copy for [PRODUCT/SERVICE]. Target keyword: [KEYWORD]. Include 3 headlines (30 chars each), 2 descriptions (90 chars each), and display URL. Focus on [UNIQUE_SELLING_POINT] and include call-to-action.",
        category: "PPC",
        rating: 4.8,
        uses: 1650
      },
      {
        title: "Viral Content Ideas",
        description: "Content concepts with high viral potential",
        prompt: "Generate 5 viral content ideas for [PLATFORM] in the [NICHE] space. Each idea should tap into current trends, emotions, and shareability factors. Include content format, hook, and key message for maximum engagement.",
        category: "Content",
        rating: 4.5,
        uses: 4200
      }
    ],
    coaching: [
      {
        title: "Course Sales Page",
        description: "High-converting sales pages for online courses",
        prompt: "Write a sales page for online course '[COURSE_NAME]' teaching [SKILL/TOPIC]. Include compelling headline, pain points, transformation promise, course curriculum, instructor bio, testimonials placeholder, pricing, and guarantee. Target: [IDEAL_STUDENT].",
        category: "Education",
        rating: 4.9,
        uses: 980
      },
      {
        title: "Webinar Script Template",
        description: "Engaging webinar scripts that convert",
        prompt: "Create a 45-minute webinar script for '[TOPIC]'. Include attention-grabbing opening, 3 main teaching points, story elements, social proof, soft pitch for [OFFER], Q&A section, and strong close. Audience: [TARGET_AUDIENCE].",
        category: "Education",
        rating: 4.7,
        uses: 765
      },
      {
        title: "Client Onboarding Sequence",
        description: "Welcome email series for new coaching clients",
        prompt: "Design a 5-email onboarding sequence for new [COACHING_TYPE] clients. Email 1: Welcome & expectations. Email 2: Getting started guide. Email 3: Success stories. Email 4: Common challenges. Email 5: First milestone. Tone: encouraging and professional.",
        category: "Coaching",
        rating: 4.8,
        uses: 540
      }
    ],
    content: [
      {
        title: "YouTube Video Script",
        description: "Engaging YouTube scripts that boost retention",
        prompt: "Write a YouTube video script for '[VIDEO_TITLE]' in the [NICHE] space. Include hook (first 15 seconds), main content points, engagement elements, call-to-actions, and end screen suggestions. Target length: [DURATION] minutes. Audience: [TARGET_VIEWERS].",
        category: "Video",
        rating: 4.6,
        uses: 3450
      },
      {
        title: "Blog Post Outline",
        description: "SEO-optimized blog post structures",
        prompt: "Create a detailed blog post outline for '[TITLE]' targeting keyword '[KEYWORD]'. Include H2 and H3 headings, key points for each section, internal linking opportunities, and meta description. Word count target: [COUNT] words.",
        category: "Blogging",
        rating: 4.7,
        uses: 2180
      },
      {
        title: "Instagram Carousel Post",
        description: "Multi-slide educational content for Instagram",
        prompt: "Design a 10-slide Instagram carousel about '[TOPIC]'. Slide 1: Eye-catching title. Slides 2-9: Educational content with tips/insights. Slide 10: Call-to-action. Include captions and hashtag strategy. Style: [VISUAL_STYLE].",
        category: "Social Media",
        rating: 4.5,
        uses: 1920
      }
    ]
  };

  const getAllTemplates = () => {
    return Object.values(templates).flat();
  };

  const filteredTemplates = getAllTemplates().filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TemplateCard = ({ template }: { template: any }) => (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{template.title}</CardTitle>
            <CardDescription className="text-sm">{template.description}</CardDescription>
          </div>
          <Button size="sm" variant="ghost" className="text-yellow-500">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4 pt-2">
          <Badge variant="secondary">{template.category}</Badge>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{template.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{template.uses.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-mono text-gray-700 line-clamp-3">
            {template.prompt}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Use Template
          </Button>
          <Button size="sm" variant="outline">
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Templates
            </span>
          </div>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center space-x-2">
              <Megaphone className="h-4 w-4" />
              <span>Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="coaching" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Coaching</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Templates</h2>
              <Badge variant="secondary">{filteredTemplates.length} templates</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Business Templates</h2>
              <Badge variant="secondary">{templates.business.length} templates</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.business.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Marketing Templates</h2>
              <Badge variant="secondary">{templates.marketing.length} templates</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.marketing.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="coaching" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Coaching Templates</h2>
              <Badge variant="secondary">{templates.coaching.length} templates</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.coaching.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Content Creation Templates</h2>
              <Badge variant="secondary">{templates.content.length} templates</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.content.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Templates;
