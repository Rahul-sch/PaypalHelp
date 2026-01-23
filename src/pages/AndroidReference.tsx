import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lightbulb,
  Code,
  Search,
  Filter,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import {
  androidTopics,
  androidCategories,
  getTopicsByCategory,
  type AndroidCategory,
} from '../data/androidTopics';
import { useProgressStore } from '../stores';
import { cn } from '../utils/cn';

type ViewMode = 'browse' | 'flashcard';

const categoryIcons: Record<string, string> = {
  'Activity Lifecycle': '🔄',
  'Fragment Lifecycle': '📄',
  'MVVM Architecture': '🏗️',
  RecyclerView: '📜',
  Coroutines: '⚡',
  Security: '🔒',
};

export function AndroidReference() {
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [selectedCategory, setSelectedCategory] = useState<AndroidCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { reviewedTopics, markTopicReviewed } = useProgressStore();

  const filteredTopics = useMemo(() => {
    let topics = selectedCategory === 'all' ? androidTopics : getTopicsByCategory(selectedCategory as AndroidCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      topics = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.content.toLowerCase().includes(query) ||
          t.keyPoints.some((p) => p.toLowerCase().includes(query))
      );
    }

    return topics;
  }, [selectedCategory, searchQuery]);

  const reviewStats = useMemo(() => {
    const total = androidTopics.length;
    const reviewed = reviewedTopics.length;
    return {
      total,
      reviewed,
      percentage: total > 0 ? (reviewed / total) * 100 : 0,
    };
  }, [reviewedTopics]);

  const handleNext = () => {
    if (currentFlashcardIndex < filteredTopics.length - 1) {
      setCurrentFlashcardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkReviewed = () => {
    const topic = filteredTopics[currentFlashcardIndex];
    if (topic) {
      markTopicReviewed(topic.id);
    }
  };

  const currentTopic = filteredTopics[currentFlashcardIndex];
  const isCurrentReviewed = currentTopic ? reviewedTopics.includes(currentTopic.id) : false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Smartphone className="h-8 w-8 text-success" />
          Android Fundamentals
        </h1>
        <p className="text-muted-foreground">
          Quick reference for Android interview concepts
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Topics Reviewed</div>
          <div className="text-2xl font-bold text-foreground">
            {reviewStats.reviewed}/{reviewStats.total}
          </div>
          <Progress value={reviewStats.percentage} className="h-1.5 mt-2" />
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Categories</div>
          <div className="text-2xl font-bold text-foreground">{androidCategories.length}</div>
        </Card>
        <Card className="p-4 col-span-2">
          <div className="text-sm text-muted-foreground mb-2">Study Mode</div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'browse' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('browse')}
            >
              Browse
            </Button>
            <Button
              variant={viewMode === 'flashcard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setViewMode('flashcard');
                setCurrentFlashcardIndex(0);
                setIsFlipped(false);
              }}
            >
              Flashcards
            </Button>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as AndroidCategory | 'all')}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {androidCategories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryIcons[cat]} {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Flashcard View */}
      {viewMode === 'flashcard' && filteredTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Card {currentFlashcardIndex + 1} of {filteredTopics.length}
            </span>
            <Progress
              value={((currentFlashcardIndex + 1) / filteredTopics.length) * 100}
              className="w-32 h-2"
            />
          </div>

          {/* Flashcard */}
          <div
            className="relative h-[400px] cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentFlashcardIndex}-${isFlipped}`}
                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Card
                  className={cn(
                    'h-full p-6 flex flex-col',
                    isCurrentReviewed && 'border-success/30'
                  )}
                >
                  {!isFlipped ? (
                    // Front of card - Question/Title
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Badge className="mb-4">
                        {categoryIcons[currentTopic?.category]} {currentTopic?.category}
                      </Badge>
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        {currentTopic?.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {currentTopic?.content.slice(0, 150)}...
                      </p>
                      <p className="text-sm text-primary mt-8">
                        Click to flip
                      </p>
                    </div>
                  ) : (
                    // Back of card - Answer/Details
                    <div className="flex-1 overflow-y-auto">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        {currentTopic?.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {currentTopic?.content}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Lightbulb className="w-4 h-4 text-warning" />
                          Key Points
                        </div>
                        <ul className="space-y-1">
                          {currentTopic?.keyPoints.map((point, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {currentTopic?.codeExample && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                            <Code className="w-4 h-4 text-primary" />
                            Code Example
                          </div>
                          <pre className="p-3 rounded-lg bg-muted/50 text-xs overflow-x-auto">
                            <code>{currentTopic.codeExample}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentFlashcardIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              variant={isCurrentReviewed ? 'outline' : 'default'}
              onClick={handleMarkReviewed}
              className={cn(isCurrentReviewed && 'text-success border-success/30')}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {isCurrentReviewed ? 'Reviewed' : 'Mark as Reviewed'}
            </Button>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentFlashcardIndex === filteredTopics.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Browse View */}
      {viewMode === 'browse' && (
        <div className="space-y-6">
          {androidCategories.map((category) => {
            const categoryTopics = filteredTopics.filter((t) => t.category === category);
            if (categoryTopics.length === 0 && selectedCategory !== 'all') return null;
            if (categoryTopics.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span>{categoryIcons[category]}</span>
                  {category}
                  <Badge className="ml-2">{categoryTopics.length}</Badge>
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {categoryTopics.map((topic) => {
                    const isReviewed = reviewedTopics.includes(topic.id);
                    return (
                      <Card
                        key={topic.id}
                        className={cn(
                          'p-4 cursor-pointer hover:border-primary/30 transition-all',
                          isReviewed && 'border-success/30 bg-success/5'
                        )}
                        onClick={() => markTopicReviewed(topic.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-foreground">{topic.title}</h3>
                          {isReviewed && (
                            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {topic.content}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {topic.keyPoints.slice(0, 2).map((point, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                            >
                              {point.slice(0, 30)}...
                            </span>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No topics found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </div>
  );
}
