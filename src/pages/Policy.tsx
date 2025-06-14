
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookText } from "lucide-react";

const policies = [
  {
    title: "Privacy Policy",
    url: "https://docs.google.com/document/d/1t0dp8xYMYBbzrBRJYIU1tRRhtYKNRksAUTEw_hJJE64/edit?usp=sharing",
  },
  {
    title: "Terms & Conditions",
    url: "https://docs.google.com/document/d/1f6HHm7cUm5vcLMrCIpaPB4jyjNip-VdC3GNPAnaUB-U/edit?usp=sharing",
  },
  {
    title: "DMCA Policy",
    url: "https://docs.google.com/document/d/17VnVNCyF7e1PLLYIXnCZ_1RqXjg6tHApGt68lBJcM_A/edit?usp=sharing",
  },
  {
    title: "AI Ethics Guidelines",
    url: "https://docs.google.com/document/d/1plAZctVlztkl8LfoysBxPtlLX1kDoynUzyGj0hewsAI/edit?usp=sharing",
  },
];

function PolicyPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-lg w-full mx-auto mt-20">
        <CardHeader className="flex flex-col items-center">
          <BookText className="h-10 w-10 text-red-500 mb-2" />
          <CardTitle className="text-2xl">Legal & Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {policies.map((p) => (
              <li key={p.title}>
                <a
                  href={p.url}
                  className="font-medium text-red-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default PolicyPage;
