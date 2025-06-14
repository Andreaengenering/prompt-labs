
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Lock, Unlock, Sparkles, Star, BookOpenCheck } from "lucide-react";
import { LessonCard } from "@/components/academy/LessonCard";

const lessons = {
  "tips": [
    {
      title: "Be Specific and Clear",
      description: "The more specific the prompt, the better the output. Avoid vague or open-ended requests.",
      free: true,
    },
    {
      title: "Set the Role",
      description: "Start prompts with a role, e.g., 'You are an expert copywriter...' to get more focused responses.",
      free: true,
    },
    {
      title: "Use Examples",
      description: "Provide a sample question and answer or structure for the AI to model in its reply.",
      free: true,
    },
  ],
  "best": [
    {
      title: "Iterate & Refine",
      description: "Refine prompts after each run. Ask follow-up questions or clarify details if the initial answer isn’t perfect.",
      free: true,
    },
    {
      title: "Explicit Formatting",
      description: "Request specific output formats, like bullet points, tables, or markdown for more readable responses.",
      free: true,
    },
  ],
  "prompting": [
    {
      title: "Prompt Chaining",
      description: "Break complex tasks into smaller prompts. Use outputs from one response as inputs for the next.",
      free: true,
    },
    {
      title: "Ask for Critique",
      description: "Ask AI to review or critique its answer to discover errors or improvements.",
      free: true,
    },
  ],
  "advanced": [
    {
      title: "Few-Shot Learning",
      description: "Show multiple Q&A pairs in your prompt to guide the AI’s style and logic (few-shot prompting).",
      free: false,
    },
    {
      title: "System Prompts",
      description: "Use system-level instructions to nudge the AI’s tone and domain expertise (when supported).",
      free: false,
    },
    {
      title: "Chaining with Context",
      description: "Pass along the conversation context in each prompt for continuity in long interactions.",
      free: false,
    },
  ],
};

const Academy = () => {
  const { subscriptionData } = useSubscription();
  const isPro =
    subscriptionData.subscribed &&
    ['premium', 'pro-plus', 'executive-pro'].includes(subscriptionData.subscription_tier);

  return (
    <div className="max-w-3xl mx-auto my-10 px-2">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6 text-red-500" />
            <CardTitle className="text-2xl">Prompt Labs Academy</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Elevate your prompt engineering skills! Start with the free lessons—unlock advanced modules by upgrading to <span className="text-red-600 font-semibold">Pro</span>.
          </p>
        </CardContent>
      </Card>
      <Tabs defaultValue="tips" className="w-full">
        <TabsList className="flex flex-wrap gap-2 bg-background border-b mb-6 rounded-none">
          <TabsTrigger value="tips"><Sparkles className="mr-1 h-4 w-4" />Tips & Tricks</TabsTrigger>
          <TabsTrigger value="best"><Star className="mr-1 h-4 w-4" />Best Practices</TabsTrigger>
          <TabsTrigger value="prompting"><Book className="mr-1 h-4 w-4" />Prompting 1.1</TabsTrigger>
          <TabsTrigger value="advanced"><Lock className="mr-1 h-4 w-4" />Advanced Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="tips">
          <div className="grid sm:grid-cols-2 gap-4">
            {lessons.tips.map((lesson) => (
              <LessonCard
                key={lesson.title}
                lesson={lesson}
                locked={false}
                upgradeLink={null}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="best">
          <div className="grid sm:grid-cols-2 gap-4">
            {lessons.best.map((lesson) => (
              <LessonCard
                key={lesson.title}
                lesson={lesson}
                locked={false}
                upgradeLink={null}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prompting">
          <div className="grid sm:grid-cols-2 gap-4">
            {lessons.prompting.map((lesson) => (
              <LessonCard
                key={lesson.title}
                lesson={lesson}
                locked={false}
                upgradeLink={null}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid sm:grid-cols-2 gap-4">
            {lessons.advanced.map((lesson) => (
              <LessonCard
                key={lesson.title}
                lesson={lesson}
                locked={!isPro}
                upgradeLink={!isPro ? "/dashboard" : null}
              />
            ))}
            {!isPro && (
              <div className="col-span-2 mt-6 text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <Lock className="text-red-500 h-6 w-6" />
                  <span className="font-semibold text-lg">Unlock Advanced Skills</span>
                </div>
                <p>
                  Upgrade to <span className="font-bold text-red-600">Pro</span> to access all lessons!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Academy;
