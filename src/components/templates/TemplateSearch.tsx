
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TemplateSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const TemplateSearch = ({ searchTerm, onSearchChange }: TemplateSearchProps) => {
  return (
    <div className="relative max-w-md w-full md:w-auto">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search templates..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
