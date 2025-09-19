import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, DollarSign, Target, Gift } from 'lucide-react';
import { ChallengeTemplate } from '@/types/template';
import { templateCategories } from '@/data/challengeTemplates';
import TemplateCard from './TemplateCard';

interface TemplateSelectorProps {
  onTemplateSelect: (template: ChallengeTemplate) => void;
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onTemplateSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = templateCategories.find(cat => cat.id === activeCategory);
  const filteredTemplates = selectedCategory?.templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.industry.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Choose a Challenge Template</CardTitle>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Category Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {templateCategories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={() => onTemplateSelect(template)}
              />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No templates found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateSelector;