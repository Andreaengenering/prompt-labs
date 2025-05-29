import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { 
  Search, Copy, Zap, TrendingUp, Users, Play, ShoppingCart,
  Briefcase, Megaphone, BookOpen, Globe, Target, DollarSign,
  BarChart3, Smartphone, Heart, Star, Crown
} from 'lucide-react';

const PromptLab = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: Zap, color: '#8B5CF6' },
    { id: 'business', name: 'Business Growth', icon: TrendingUp, color: '#059669' },
    { id: 'marketing', name: 'Marketing & Ads', icon: Megaphone, color: '#DC2626' },
    { id: 'content', name: 'Content Creation', icon: BookOpen, color: '#2563EB' },
    { id: 'social', name: 'Social Media', icon: Users, color: '#7C3AED' },
    { id: 'sales', name: 'Sales & Leads', icon: Target, color: '#EA580C' },
    { id: 'courses', name: 'Online Courses', icon: Play, color: '#0891B2' },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, color: '#BE185D' }
  ];

  const promptTemplates = [
    // Business Growth Templates
    {
      id: 1,
      title: "Optimizing Existing Business for Online Growth",
      category: "business",
      description: "Transform your traditional business into a thriving online presence",
      prompt: "Act as a digital transformation consultant. Help me optimize my existing [BUSINESS TYPE] business for online growth. Current situation: [CURRENT STATE]. Goals: [SPECIFIC GOALS]. Provide a step-by-step strategy covering: 1) Digital presence audit 2) Online channel optimization 3) Customer acquisition strategies 4) Revenue stream diversification 5) Technology implementation plan 6) Timeline and budget considerations.",
      tags: ["business transformation", "digital strategy", "growth optimization"],
      difficulty: "Intermediate",
      rating: 4.8,
      usage: 156
    },
    {
      id: 2,
      title: "Website Conversion Optimization Strategy",
      category: "business",
      description: "Maximize your website's conversion potential with data-driven strategies",
      prompt: "You are a conversion rate optimization expert. Analyze my website [WEBSITE URL/DESCRIPTION] and create a comprehensive optimization strategy. Current conversion rate: [CURRENT RATE]. Target audience: [AUDIENCE]. Goals: [CONVERSION GOALS]. Provide: 1) Landing page optimization tactics 2) User experience improvements 3) A/B testing recommendations 4) Call-to-action optimization 5) Trust signal implementation 6) Mobile optimization strategies 7) Analytics setup and tracking.",
      tags: ["conversion optimization", "website improvement", "user experience"],
      difficulty: "Advanced",
      rating: 4.9,
      usage: 203
    },
    {
      id: 3,
      title: "Scaling Business with Strategic Growth",
      category: "business",
      description: "Develop a comprehensive scaling strategy for sustainable business growth",
      prompt: "Act as a business growth strategist. Help me scale my [BUSINESS TYPE] from [CURRENT REVENUE/SIZE] to [TARGET SCALE]. Current challenges: [CHALLENGES]. Resources available: [RESOURCES]. Create a scaling roadmap including: 1) Market expansion opportunities 2) Team building and hiring strategy 3) Operations optimization 4) Financial planning and funding options 5) Technology infrastructure scaling 6) Risk management and mitigation 7) Timeline and milestones.",
      tags: ["business scaling", "strategic growth", "expansion planning"],
      difficulty: "Advanced",
      rating: 4.7,
      usage: 134
    },

    // Marketing & Ads Templates
    {
      id: 4,
      title: "Google Ads Campaign Optimization",
      category: "marketing",
      description: "Create high-converting Google Ads campaigns with expert optimization techniques",
      prompt: "You are a Google Ads specialist with 10+ years of experience. Help me optimize my Google Ads campaign for [BUSINESS/PRODUCT]. Current performance: [CURRENT METRICS]. Budget: [BUDGET]. Target audience: [AUDIENCE]. Provide: 1) Keyword research and selection strategy 2) Ad copy optimization with A/B testing variants 3) Landing page alignment recommendations 4) Bidding strategy optimization 5) Negative keyword list 6) Campaign structure improvements 7) Tracking and analytics setup 8) Performance monitoring KPIs.",
      tags: ["google ads", "ppc optimization", "campaign management"],
      difficulty: "Advanced",
      rating: 4.8,
      usage: 267
    },
    {
      id: 5,
      title: "Facebook Ads for Audience Engagement",
      category: "marketing",
      description: "Build engaging Facebook ad campaigns that drive meaningful audience interaction",
      prompt: "Act as a Facebook advertising expert. Create an engaging Facebook ads strategy for [BUSINESS/PRODUCT]. Target audience: [DEMOGRAPHICS/INTERESTS]. Campaign objective: [OBJECTIVE]. Budget: [BUDGET]. Develop: 1) Audience targeting and custom audiences 2) Creative concepts and ad formats 3) Engaging ad copy variations 4) Campaign structure and optimization 5) Retargeting strategies 6) Performance tracking setup 7) Scaling recommendations 8) Community building through ads.",
      tags: ["facebook ads", "social media advertising", "audience engagement"],
      difficulty: "Intermediate",
      rating: 4.6,
      usage: 189
    },
    {
      id: 6,
      title: "YouTube Ads for Video Content Promotion",
      category: "marketing",
      description: "Leverage YouTube advertising to promote your video content effectively",
      prompt: "You are a YouTube advertising strategist. Help me create effective YouTube ads to promote my [VIDEO CONTENT TYPE] for [TARGET AUDIENCE]. Goals: [CAMPAIGN GOALS]. Budget: [BUDGET]. Provide: 1) Video ad format recommendations 2) Targeting strategy and audience selection 3) Compelling video ad scripts 4) Thumbnail and creative optimization 5) Campaign setup and bidding strategy 6) Analytics and tracking implementation 7) Optimization tactics for better performance 8) Scaling strategies for successful campaigns.",
      tags: ["youtube ads", "video marketing", "content promotion"],
      difficulty: "Intermediate",
      rating: 4.5,
      usage: 145
    },
    {
      id: 7,
      title: "General Marketing for Niche Reach",
      category: "marketing",
      description: "Develop targeted marketing strategies to effectively reach your specific niche",
      prompt: "Act as a niche marketing specialist. Help me develop a comprehensive marketing strategy for my [NICHE] business targeting [SPECIFIC AUDIENCE]. Current market position: [POSITION]. Unique value proposition: [UVP]. Create: 1) Niche market analysis and opportunities 2) Targeted messaging and positioning 3) Channel selection and optimization 4) Content marketing strategy 5) Community building tactics 6) Partnership and collaboration opportunities 7) Measurement and optimization framework 8) Growth tactics specific to the niche.",
      tags: ["niche marketing", "targeted marketing", "market positioning"],
      difficulty: "Intermediate",
      rating: 4.7,
      usage: 112
    },

    // Content Creation Templates
    {
      id: 8,
      title: "Content Calendar Creation for Consistency",
      category: "content",
      description: "Build a strategic content calendar that ensures consistent, engaging content",
      prompt: "You are a content strategy expert. Help me create a comprehensive content calendar for [PLATFORM/BUSINESS]. Target audience: [AUDIENCE]. Content goals: [GOALS]. Posting frequency: [FREQUENCY]. Develop: 1) Content pillar strategy and themes 2) Monthly content planning framework 3) Content types and format mix 4) Seasonal and trending topic integration 5) Content creation workflow and templates 6) Engagement and community interaction plan 7) Performance tracking and optimization 8) Content repurposing strategies.",
      tags: ["content calendar", "content strategy", "consistency planning"],
      difficulty: "Beginner",
      rating: 4.6,
      usage: 298
    },
    {
      id: 9,
      title: "Video Content Brainstorm for Lead Generation",
      category: "content",
      description: "Generate compelling video content ideas that attract and convert leads",
      prompt: "Act as a video marketing strategist. Help me brainstorm video content ideas for lead generation in the [INDUSTRY/NICHE]. Target audience: [AUDIENCE]. Business goals: [GOALS]. Platforms: [PLATFORMS]. Generate: 1) 20+ video content ideas with hooks 2) Video series concepts for audience retention 3) Educational content that showcases expertise 4) Behind-the-scenes content for trust building 5) Customer success stories and testimonials 6) FAQ and problem-solving videos 7) Call-to-action strategies for each video type 8) Content calendar integration tips.",
      tags: ["video content", "lead generation", "content brainstorming"],
      difficulty: "Intermediate",
      rating: 4.8,
      usage: 176
    },
    {
      id: 10,
      title: "Going Viral: Content Ideation",
      category: "content",
      description: "Create content with viral potential using proven viral marketing strategies",
      prompt: "You are a viral content strategist. Help me create content with viral potential for [PLATFORM] in the [NICHE/INDUSTRY]. Target audience: [AUDIENCE]. Brand voice: [VOICE]. Develop: 1) Viral content frameworks and formulas 2) Trending topic integration strategies 3) Emotional trigger optimization 4) Shareable content elements 5) Timing and posting optimization 6) Community engagement tactics 7) Hashtag and discovery strategies 8) Cross-platform amplification plan 9) Analytics to track viral metrics.",
      tags: ["viral content", "content strategy", "social media growth"],
      difficulty: "Advanced",
      rating: 4.4,
      usage: 223
    },

    // Social Media Templates
    {
      id: 11,
      title: "Building a Following from Scratch (Niche Focus)",
      category: "social",
      description: "Grow an engaged following in your specific niche from zero to hero",
      prompt: "Act as a social media growth expert specializing in [NICHE]. Help me build a following from scratch on [PLATFORM]. Target audience: [AUDIENCE]. Content focus: [CONTENT TYPE]. Goals: [FOLLOWER GOALS]. Create: 1) Profile optimization and branding strategy 2) Content pillar framework for the niche 3) Hashtag research and strategy 4) Engagement and community building tactics 5) Collaboration and networking opportunities 6) Growth hacking techniques specific to the niche 7) Analytics and tracking setup 8) Monetization preparation strategies.",
      tags: ["social media growth", "niche building", "follower acquisition"],
      difficulty: "Intermediate",
      rating: 4.7,
      usage: 187
    },
    {
      id: 12,
      title: "Social Media Engagement Boost for Community Building",
      category: "social",
      description: "Increase engagement and build a thriving community around your brand",
      prompt: "You are a community building specialist. Help me boost engagement and build a strong community for [BRAND/BUSINESS] on [PLATFORMS]. Current engagement rate: [CURRENT RATE]. Community size: [SIZE]. Goals: [ENGAGEMENT GOALS]. Develop: 1) Community engagement strategies and tactics 2) Interactive content formats and ideas 3) Community guidelines and moderation approach 4) User-generated content campaigns 5) Events and live interaction planning 6) Influencer and brand ambassador programs 7) Feedback and communication systems 8) Long-term community growth strategy.",
      tags: ["community building", "social engagement", "brand community"],
      difficulty: "Intermediate",
      rating: 4.8,
      usage: 156
    },
    {
      id: 13,
      title: "Creating and Building a YouTube Channel",
      category: "social",
      description: "Launch and grow a successful YouTube channel with strategic planning",
      prompt: "Act as a YouTube growth strategist. Help me create and build a successful YouTube channel for [NICHE/TOPIC]. Target audience: [AUDIENCE]. Content goals: [GOALS]. Upload schedule: [SCHEDULE]. Provide: 1) Channel setup and optimization strategy 2) Content planning and series development 3) Video SEO and discoverability tactics 4) Thumbnail and title optimization 5) Community engagement and retention strategies 6) Monetization roadmap and timeline 7) Analytics tracking and optimization 8) Collaboration and growth opportunities 9) Equipment and production recommendations.",
      tags: ["youtube channel", "video content", "channel growth"],
      difficulty: "Intermediate",
      rating: 4.9,
      usage: 234
    },
    {
      id: 14,
      title: "Developing an All-in-One Social Media Platform",
      category: "social",
      description: "Strategic planning for creating a comprehensive social media platform",
      prompt: "You are a social media platform development consultant. Help me plan and develop an all-in-one social media platform. Target users: [USER BASE]. Key features: [FEATURES]. Unique value proposition: [UVP]. Create: 1) Platform architecture and feature planning 2) User experience and interface design strategy 3) Community building and engagement features 4) Monetization models and revenue streams 5) Content moderation and safety measures 6) Technical requirements and development roadmap 7) Marketing and user acquisition strategy 8) Competitive analysis and differentiation 9) Scaling and growth planning.",
      tags: ["social platform", "app development", "platform strategy"],
      difficulty: "Advanced",
      rating: 4.5,
      usage: 89
    },

    // Sales & Leads Templates
    {
      id: 15,
      title: "Generating Leads for Business Growth",
      category: "sales",
      description: "Implement effective lead generation strategies across multiple channels",
      prompt: "Act as a lead generation specialist. Help me create a comprehensive lead generation strategy for [BUSINESS TYPE]. Target audience: [AUDIENCE]. Current lead sources: [SOURCES]. Monthly lead goal: [GOAL]. Develop: 1) Multi-channel lead generation strategy 2) Lead magnet creation and optimization 3) Landing page and conversion optimization 4) Email marketing automation sequences 5) Social media lead generation tactics 6) Content marketing for lead attraction 7) Lead scoring and qualification system 8) CRM setup and management 9) Performance tracking and optimization.",
      tags: ["lead generation", "sales strategy", "customer acquisition"],
      difficulty: "Intermediate",
      rating: 4.8,
      usage: 201
    },
    {
      id: 16,
      title: "Finding Quality Leads in Your Industry",
      category: "sales",
      description: "Discover and target high-quality leads using advanced research techniques",
      prompt: "You are a B2B lead research expert. Help me find and target quality leads for [BUSINESS/SERVICE] in the [INDUSTRY]. Ideal customer profile: [ICP]. Budget range: [BUDGET]. Decision makers: [ROLES]. Provide: 1) Lead research methodology and tools 2) Ideal customer profile refinement 3) Prospect identification strategies 4) Contact information gathering techniques 5) Lead qualification frameworks 6) Outreach sequences and templates 7) CRM organization and tracking 8) Follow-up and nurturing strategies 9) Conversion optimization tactics.",
      tags: ["lead research", "prospect identification", "B2B sales"],
      difficulty: "Advanced",
      rating: 4.7,
      usage: 167
    },
    {
      id: 17,
      title: "Building High-Converting Sales Funnels",
      category: "sales",
      description: "Design and optimize sales funnels that convert prospects into customers",
      prompt: "Act as a sales funnel optimization expert. Help me build a high-converting sales funnel for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Price point: [PRICE]. Current conversion rate: [RATE]. Create: 1) Funnel architecture and customer journey mapping 2) Awareness stage content and lead magnets 3) Consideration stage nurturing sequences 4) Decision stage conversion optimization 5) Retention and upselling strategies 6) Email automation and sequences 7) Landing page optimization 8) Analytics and tracking setup 9) A/B testing recommendations.",
      tags: ["sales funnels", "conversion optimization", "customer journey"],
      difficulty: "Advanced",
      rating: 4.9,
      usage: 189
    },
    {
      id: 18,
      title: "Affiliate Marketing Strategy Development",
      category: "sales",
      description: "Build a profitable affiliate marketing program or become a successful affiliate",
      prompt: "You are an affiliate marketing strategist. Help me [CREATE AN AFFILIATE PROGRAM/BECOME AN AFFILIATE] for [NICHE/PRODUCT]. Goals: [GOALS]. Budget: [BUDGET]. Experience level: [LEVEL]. Develop: 1) Affiliate program structure and commission rates 2) Affiliate recruitment and onboarding process 3) Marketing materials and creative assets 4) Tracking and attribution system setup 5) Performance monitoring and optimization 6) Compliance and legal considerations 7) Relationship management strategies 8) Scaling and growth tactics 9) Revenue optimization techniques.",
      tags: ["affiliate marketing", "partner programs", "revenue optimization"],
      difficulty: "Advanced",
      rating: 4.6,
      usage: 143
    },

    // Online Courses Templates
    {
      id: 19,
      title: "Online Course/Digital Product Launch Strategy",
      category: "courses",
      description: "Plan and execute a successful launch for your online course or digital product",
      prompt: "Act as a digital product launch strategist. Help me plan and execute a successful launch for my [COURSE/PRODUCT] about [TOPIC]. Target audience: [AUDIENCE]. Price point: [PRICE]. Launch timeline: [TIMELINE]. Create: 1) Pre-launch marketing and audience building 2) Course content structure and delivery method 3) Pricing strategy and offers 4) Launch sequence and timeline 5) Email marketing automation 6) Social media promotion strategy 7) Partnership and affiliate opportunities 8) Customer onboarding and support 9) Post-launch optimization and scaling.",
      tags: ["course launch", "digital products", "product marketing"],
      difficulty: "Advanced",
      rating: 4.8,
      usage: 178
    },
    {
      id: 20,
      title: "Creating and Marketing an Online Course",
      category: "courses",
      description: "Complete guide to creating, producing, and marketing your online course",
      prompt: "You are an online course creation and marketing expert. Help me create and market an online course on [SUBJECT]. Target students: [AUDIENCE]. Course format: [FORMAT]. Learning outcomes: [OUTCOMES]. Provide: 1) Course outline and curriculum development 2) Content creation and production strategy 3) Platform selection and setup 4) Pricing and packaging strategies 5) Marketing and promotion plan 6) Student engagement and retention tactics 7) Assessment and certification approach 8) Community building around the course 9) Scaling and additional revenue streams.",
      tags: ["online courses", "course creation", "educational marketing"],
      difficulty: "Intermediate",
      rating: 4.7,
      usage: 156
    },

    // E-commerce Templates
    {
      id: 21,
      title: "Monetization Strategy for Online Presence",
      category: "ecommerce",
      description: "Transform your online presence into multiple profitable revenue streams",
      prompt: "Act as a monetization strategist. Help me monetize my online presence in [NICHE/INDUSTRY]. Current audience: [AUDIENCE SIZE/DEMOGRAPHICS]. Platforms: [PLATFORMS]. Skills/Expertise: [EXPERTISE]. Create: 1) Revenue stream identification and prioritization 2) Product and service development strategy 3) Pricing and packaging optimization 4) Sales funnel and conversion optimization 5) Partnership and collaboration opportunities 6) Subscription and recurring revenue models 7) Digital product creation and marketing 8) Scaling and automation strategies 9) Financial planning and goal setting.",
      tags: ["monetization", "revenue streams", "online business"],
      difficulty: "Advanced",
      rating: 4.6,
      usage: 134
    },
    {
      id: 22,
      title: "Developing a Mobile App for a Specific Problem",
      category: "ecommerce",
      description: "Plan and develop a mobile app that solves a specific market problem",
      prompt: "You are a mobile app development strategist. Help me develop a mobile app to solve [SPECIFIC PROBLEM] for [TARGET USERS]. Market research: [RESEARCH]. Budget: [BUDGET]. Timeline: [TIMELINE]. Provide: 1) Market validation and user research strategy 2) App concept and feature planning 3) User experience and interface design approach 4) Technical requirements and development roadmap 5) Monetization model and revenue strategy 6) Marketing and user acquisition plan 7) Testing and feedback integration 8) Launch strategy and app store optimization 9) Post-launch growth and iteration plan.",
      tags: ["mobile app", "app development", "problem solving"],
      difficulty: "Advanced",
      rating: 4.5,
      usage: 98
    }
  ];

  const filteredTemplates = promptTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = async (template: any) => {
    try {
      await navigator.clipboard.writeText(template.prompt);
      toast({
        title: "Template copied!",
        description: "The prompt template has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Error copying template:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy template. Please try again.",
      });
    }
  };

  const TemplateCard = ({ template }: { template: any }) => {
    const category = templateCategories.find(cat => cat.id === template.category);
    const IconComponent = category?.icon || BookOpen;
    
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg h-full flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${category?.color}20` }}
              >
                <IconComponent 
                  className="h-5 w-5"
                  style={{ color: category?.color }}
                />
              </div>
              <Badge 
                variant="outline"
                className="text-xs"
                style={{ borderColor: category?.color }}
              >
                {template.difficulty}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{template.rating}</span>
            </div>
          </div>
          
          <CardTitle className="text-lg mb-2 line-clamp-2">{template.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {template.description}
          </CardDescription>
          
          <div className="flex items-center space-x-3 pt-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Zap className="h-4 w-4" />
              <span>{template.usage} uses</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="bg-gray-50 rounded-lg p-3 mb-4 flex-1">
            <p className="text-sm font-mono text-gray-700 line-clamp-4">
              {template.prompt}
            </p>
          </div>
          
          {template.tags && template.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex space-x-2 mt-auto">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => handleUseTemplate(template)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Use Template
            </Button>
            <Button size="sm" variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Prompt Lab
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover and use professional prompt templates for every business need
                </p>
              </div>
              
              <div className="relative max-w-md w-full md:w-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex h-auto p-1 bg-white/50 backdrop-blur-sm">
                {templateCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex items-center space-x-2 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {templateCategories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <Badge variant="secondary" className="hidden sm:flex">
                  {filteredTemplates.length} templates
                </Badge>
              </div>
              
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No templates found</h3>
                  <p className="text-gray-500">Try adjusting your search or browse different categories.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PromptLab;
