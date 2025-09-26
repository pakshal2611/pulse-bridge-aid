import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { aiMatchingAPI } from '@/services/api';
import { 
  Brain, 
  Search, 
  Users, 
  MapPin, 
  Clock,
  Zap,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface MatchResult {
  donorId: number;
  compatibility: number;
  distance: number;
  availability: string;
}

interface MatchingCriteria {
  bloodType: string;
  organType: string;
  location: string;
  urgency: string;
  maxDistance: string;
}

export default function AIMatching() {
  const [matchingResults, setMatchingResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [criteria, setCriteria] = useState<MatchingCriteria>({
    bloodType: '',
    organType: '',
    location: '',
    urgency: '',
    maxDistance: '',
  });

  const handleFindMatches = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await aiMatchingAPI.findMatches(criteria);
      setMatchingResults(results);
      toast({
        title: "AI Matching Complete",
        description: `Found ${results.totalMatches} potential matches`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find matches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Brain className="h-8 w-8 text-primary" />
            <span>AI Matching</span>
          </h1>
          <p className="text-muted-foreground">Intelligent donor-recipient matching system</p>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">98.5%</div>
            <p className="text-sm text-muted-foreground">Match Accuracy</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">1,247</div>
            <p className="text-sm text-muted-foreground">Successful Matches</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">15 min</div>
            <p className="text-sm text-muted-foreground">Avg Match Time</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">3,450</div>
            <p className="text-sm text-muted-foreground">Active Donors</p>
          </CardContent>
        </Card>
      </div>

      {/* Matching Criteria */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Matching Criteria</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFindMatches} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={criteria.bloodType} onValueChange={(value) => setCriteria({...criteria, bloodType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="organType">Organ Type (Optional)</Label>
                <Select value={criteria.organType} onValueChange={(value) => setCriteria({...criteria, organType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organ type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kidney">Kidney</SelectItem>
                    <SelectItem value="liver">Liver</SelectItem>
                    <SelectItem value="heart">Heart</SelectItem>
                    <SelectItem value="lung">Lung</SelectItem>
                    <SelectItem value="cornea">Cornea</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={criteria.urgency} onValueChange={(value) => setCriteria({...criteria, urgency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={criteria.location}
                  onChange={(e) => setCriteria({...criteria, location: e.target.value})}
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <Label htmlFor="maxDistance">Max Distance (miles)</Label>
                <Input
                  id="maxDistance"
                  type="number"
                  value={criteria.maxDistance}
                  onChange={(e) => setCriteria({...criteria, maxDistance: e.target.value})}
                  placeholder="50"
                />
              </div>
            </div>

            <Button type="submit" className="btn-medical w-full" disabled={loading}>
              <Brain className="h-4 w-4 mr-2" />
              {loading ? 'AI Processing...' : 'Find Matches'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Matching Results */}
      {matchingResults && (
        <div className="space-y-6">
          {/* Best Match Highlight */}
          {matchingResults.bestMatch && (
            <Card className="card-medical border-primary/50 bg-gradient-to-r from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Best Match Found</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">Donor ID: #{matchingResults.bestMatch.donorId}</p>
                    <p className="text-sm text-muted-foreground">Highest compatibility score</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {matchingResults.bestMatch.compatibility}%
                    </div>
                    <p className="text-sm text-muted-foreground">Compatibility</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Matches */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle>All Matches ({matchingResults.totalMatches})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchingResults.matches.map((match: MatchResult, index: number) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Donor #{match.donorId}</p>
                          <p className="text-sm text-muted-foreground">Available: {match.availability}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getCompatibilityColor(match.compatibility)}`}>
                          {match.compatibility}%
                        </div>
                        <p className="text-xs text-muted-foreground">Match Score</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compatibility</span>
                          <span>{match.compatibility}%</span>
                        </div>
                        <Progress value={match.compatibility} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{match.distance} miles away</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{match.availability}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="btn-medical flex-1">
                        Contact Donor
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Results Message */}
      {!matchingResults && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Enter matching criteria above to find compatible donors using our AI system.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}