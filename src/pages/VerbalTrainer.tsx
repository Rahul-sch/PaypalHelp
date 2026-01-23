import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Clock,
  Mic,
  MicOff,
  Volume2,
  CheckCircle,
  HelpCircle,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { cn } from '../utils/cn';
import {
  umpireScripts,
  complexityTemplates,
  mockInterviewQuestions,
  type UMPIREScript,
  type ComplexityTemplate,
  type MockInterviewQuestion,
} from '../data/verbalScripts';

export function VerbalTrainer() {
  const [activeTab, setActiveTab] = useState('umpire');
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['understand']);
  const [practicedPhrases, setPracticedPhrases] = useState<Set<string>>(new Set());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const [selectedQuestion, setSelectedQuestion] = useState<MockInterviewQuestion | null>(null);

  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
  };

  const markAsPracticed = (phraseId: string) => {
    setPracticedPhrases((prev) => new Set(prev).add(phraseId));
  };

  // Voice recognition setup
  const startListening = useCallback(() => {
    if (!speechSupported) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + ' ');
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);

    // Store recognition instance for later stopping
    (window as any).__recognition = recognition;
  }, [speechSupported]);

  const stopListening = useCallback(() => {
    if ((window as any).__recognition) {
      (window as any).__recognition.stop();
      setIsListening(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ((window as any).__recognition) {
        (window as any).__recognition.stop();
      }
    };
  }, []);

  const phaseIcons: Record<string, React.ReactNode> = {
    understand: <HelpCircle className="w-5 h-5" />,
    match: <Sparkles className="w-5 h-5" />,
    plan: <Lightbulb className="w-5 h-5" />,
    implement: <MessageSquare className="w-5 h-5" />,
    review: <CheckCircle className="w-5 h-5" />,
    evaluate: <Clock className="w-5 h-5" />,
  };

  const phaseColors: Record<string, string> = {
    understand: 'text-blue-400 bg-blue-500/10',
    match: 'text-purple-400 bg-purple-500/10',
    plan: 'text-yellow-400 bg-yellow-500/10',
    implement: 'text-green-400 bg-green-500/10',
    review: 'text-orange-400 bg-orange-500/10',
    evaluate: 'text-cyan-400 bg-cyan-500/10',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-accent" />
          Verbal Walkthrough Trainer
        </h1>
        <p className="text-muted-foreground">
          Practice explaining problems out loud with the UMPIRE framework
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="umpire">UMPIRE Framework</TabsTrigger>
          <TabsTrigger value="complexity">Complexity Scripts</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral Prep</TabsTrigger>
        </TabsList>

        {/* UMPIRE Framework Tab */}
        <TabsContent value="umpire">
          <div className="space-y-4">
            {/* Voice Practice Section */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Voice Practice Mode</h3>
                  </div>
                  {speechSupported ? (
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2',
                        isListening
                          ? 'bg-error/20 text-error hover:bg-error/30'
                          : 'bg-primary/20 text-primary hover:bg-primary/30'
                      )}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          Start Recording
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Voice not supported in this browser
                    </div>
                  )}
                </div>
                {transcript && (
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your transcript:</p>
                    <p className="text-foreground">{transcript}</p>
                    <button
                      onClick={() => setTranscript('')}
                      className="text-xs text-muted-foreground hover:text-foreground mt-2"
                    >
                      Clear transcript
                    </button>
                  </div>
                )}
                {!transcript && (
                  <p className="text-sm text-muted-foreground">
                    Practice explaining your solution out loud. Click a script below, then record yourself saying it naturally.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* UMPIRE Phases */}
            <div className="space-y-3">
              {umpireScripts.map((script: UMPIREScript, index: number) => (
                <UMPIREPhaseCard
                  key={script.phase}
                  script={script}
                  index={index}
                  isExpanded={expandedPhases.includes(script.phase)}
                  onToggle={() => togglePhase(script.phase)}
                  icon={phaseIcons[script.phase]}
                  colorClass={phaseColors[script.phase]}
                  practicedPhrases={practicedPhrases}
                  onMarkPracticed={markAsPracticed}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Complexity Scripts Tab */}
        <TabsContent value="complexity">
          <div className="space-y-4">
            <Card className="p-4 bg-warning/5 border-warning/30">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Complexity Discussion Tips</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Always explain WHY the complexity is what it is. Don't just state "O(n)" - explain which operations contribute to it.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complexityTemplates.map((template: ComplexityTemplate, index: number) => (
                <ComplexityCard key={template.id} template={template} index={index} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Behavioral Prep Tab */}
        <TabsContent value="behavioral">
          <div className="space-y-4">
            <Card className="p-4 bg-accent/5 border-accent/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">PayPal Interview Prep</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Prepare for behavioral questions. Remember: be authentic, use specific examples, and connect your experience to PayPal's mission.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              {mockInterviewQuestions.map((question: MockInterviewQuestion, index: number) => (
                <BehavioralCard
                  key={question.id}
                  question={question}
                  index={index}
                  isSelected={selectedQuestion?.id === question.id}
                  onSelect={() => setSelectedQuestion(selectedQuestion?.id === question.id ? null : question)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// UMPIRE Phase Card Component
interface UMPIREPhaseCardProps {
  script: UMPIREScript;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  colorClass: string;
  practicedPhrases: Set<string>;
  onMarkPracticed: (id: string) => void;
}

function UMPIREPhaseCard({
  script,
  index,
  isExpanded,
  onToggle,
  icon,
  colorClass,
  practicedPhrases,
  onMarkPracticed,
}: UMPIREPhaseCardProps) {
  const practicedCount = script.scripts.filter((_, i) => practicedPhrases.has(`${script.phase}-${i}`)).length;
  const progress = (practicedCount / script.scripts.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div className={cn('p-2 rounded-lg', colorClass)}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase">
                {script.phase.charAt(0).toUpperCase()}
              </span>
              <h3 className="font-semibold text-foreground">{script.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{script.description}</p>
            {practicedCount > 0 && (
              <Progress value={progress} className="h-1 mt-2 w-32" />
            )}
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border"
            >
              <div className="p-4 space-y-4">
                {/* Sample Scripts */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    What to Say
                  </h4>
                  <div className="space-y-2">
                    {script.scripts.map((phrase, i) => {
                      const phraseId = `${script.phase}-${i}`;
                      const isPracticed = practicedPhrases.has(phraseId);
                      return (
                        <div
                          key={i}
                          className={cn(
                            'p-3 rounded-lg border transition-all cursor-pointer',
                            isPracticed
                              ? 'bg-success/10 border-success/30'
                              : 'bg-muted/30 border-border hover:border-primary/50'
                          )}
                          onClick={() => onMarkPracticed(phraseId)}
                        >
                          <div className="flex items-start gap-2">
                            <div className={cn(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0',
                              isPracticed ? 'border-success bg-success' : 'border-muted-foreground'
                            )}>
                              {isPracticed && <CheckCircle className="w-3 h-3 text-success-foreground" />}
                            </div>
                            <p className="text-sm text-foreground italic">"{phrase}"</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {script.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

// Complexity Card Component
interface ComplexityCardProps {
  template: ComplexityTemplate;
  index: number;
}

function ComplexityCard({ template, index }: ComplexityCardProps) {
  const complexityColors: Record<string, string> = {
    'o1': 'text-green-400 bg-green-500/10 border-green-500/30',
    'ologn': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    'on': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    'onlogn': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    'on2': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    'o2n': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    'on!': 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={cn('p-4 border', complexityColors[template.id])}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">{template.title}</h3>
          <span className="font-mono text-lg font-bold">{template.complexity}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{template.explanation}</p>
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Examples</h4>
          <ul className="space-y-1">
            {template.examples.map((example, i) => (
              <li key={i} className="text-sm text-foreground flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {example}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

// Behavioral Card Component
interface BehavioralCardProps {
  question: MockInterviewQuestion;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function BehavioralCard({ question, index, isSelected, onSelect }: BehavioralCardProps) {
  const categoryColors: Record<string, string> = {
    behavioral: 'bg-purple-500/20 text-purple-400',
    technical: 'bg-blue-500/20 text-blue-400',
    system: 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={cn('overflow-hidden transition-all', isSelected && 'ring-2 ring-primary')}>
        <button
          onClick={onSelect}
          className="w-full p-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-start gap-3">
            <span className={cn('px-2 py-1 rounded text-xs font-medium', categoryColors[question.category])}>
              {question.category}
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{question.question}</h3>
            </div>
            {isSelected ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border"
            >
              <div className="p-4 space-y-4">
                {/* Tips */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    Tips for Answering
                  </h4>
                  <ul className="space-y-2">
                    {question.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Follow-ups */}
                {question.followUps && question.followUps.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      Common Follow-ups
                    </h4>
                    <ul className="space-y-2">
                      {question.followUps.map((followUp, i) => (
                        <li key={i} className="text-sm text-muted-foreground italic">
                          "{followUp}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
