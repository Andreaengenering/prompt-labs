
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function SidebarNewPromptButton() {
  return (
    <div className="mt-6">
      <Link to="/prompt-lab">
        <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Prompt
        </Button>
      </Link>
    </div>
  );
}
