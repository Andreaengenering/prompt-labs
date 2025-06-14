
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PromptLabSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptLabSearchBar = ({ value, onChange }: PromptLabSearchBarProps) => (
  <div className="mb-8">
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search templates..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10 bg-card border-border focus:border-red-500"
      />
    </div>
  </div>
);

export default PromptLabSearchBar;
