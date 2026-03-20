'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Clock, TrendingUp, Target, Activity, Share2, ChevronRight,
  Users, Zap, Timer, MapPin, ArrowUpRight, ArrowDownRight, Minus,
  Download, RefreshCw, Menu, X, Trophy, AlertCircle, Repeat, CircleDot
} from 'lucide-react';
import { players as homePlayers, passes, matchEvents, xgData, matchInfo as initialMatchInfo } from '@/lib/mock-data';

// Away team players (mirrored positions for opponent)
const awayPlayers = [
  { id: 101, x: 92, y: 30, position: 'GK', name: 'P. Anderson', stamina: 88, sprints: 3, distance: 2.8, status: 'optimal' as const, rating: 6.9, trend: 'stable' as const, fatigue: 20, impact: 40, keyStat: '4 Saves', team: 'away' },
  { id: 102, x: 78, y: 48, position: 'LB', name: 'J. Murphy', stamina: 72, sprints: 16, distance: 7.9, status: 'optimal' as const, rating: 6.8, trend: 'stable' as const, fatigue: 48, impact: 62, keyStat: '8 Crosses', team: 'away' },
  { id: 103, x: 78, y: 12, position: 'RB', name: 'D. Chen', stamina: 80, sprints: 12, distance: 7.2, status: 'optimal' as const, rating: 7.1, trend: 'up' as const, fatigue: 35, impact: 68, keyStat: '4 Tackles Won', team: 'away' },
  { id: 104, x: 82, y: 36, position: 'CB', name: 'K. Brown', stamina: 89, sprints: 4, distance: 5.4, status: 'optimal' as const, rating: 7.4, trend: 'stable' as const, fatigue: 22, impact: 75, keyStat: '6 Clearances', team: 'away' },
  { id: 105, x: 82, y: 24, position: 'CB', name: 'M. Lee', stamina: 85, sprints: 6, distance: 5.8, status: 'optimal' as const, rating: 7.2, trend: 'stable' as const, fatigue: 28, impact: 72, keyStat: '5 Interceptions', team: 'away' },
  { id: 106, x: 65, y: 30, position: 'CDM', name: 'R. Garcia', stamina: 45, sprints: 28, distance: 8.8, status: 'warning' as const, rating: 7.6, trend: 'down' as const, fatigue: 78, impact: 72, keyStat: '88% Pass Accuracy', team: 'away' },
  { id: 107, x: 55, y: 45, position: 'LCM', name: 'T. Wilson', stamina: 78, sprints: 14, distance: 7.0, status: 'optimal' as const, rating: 7.0, trend: 'stable' as const, fatigue: 38, impact: 58, keyStat: '6 Ball Recoveries', team: 'away' },
  { id: 108, x: 55, y: 15, position: 'RCM', name: 'A. Davis', stamina: 70, sprints: 15, distance: 6.9, status: 'warning' as const, rating: 6.5, trend: 'down' as const, fatigue: 52, impact: 42, keyStat: '3 Key Passes', team: 'away' },
  { id: 109, x: 45, y: 30, position: 'CAM', name: 'L. Martinez', stamina: 68, sprints: 18, distance: 7.4, status: 'warning' as const, rating: 7.8, trend: 'up' as const, fatigue: 58, impact: 80, keyStat: '1 Goal, 2 Shots', team: 'away' },
  { id: 110, x: 25, y: 48, position: 'LW', name: 'C. Rodriguez', stamina: 50, sprints: 22, distance: 8.0, status: 'warning' as const, rating: 7.5, trend: 'stable' as const, fatigue: 70, impact: 78, keyStat: '3 Successful Dribbles', team: 'away' },
  { id: 111, x: 25, y: 12, position: 'RW', name: 'N. Taylor', stamina: 82, sprints: 11, distance: 6.5, status: 'optimal' as const, rating: 7.0, trend: 'stable' as const, fatigue: 30, impact: 65, keyStat: '2 Shots On Target', team: 'away' },
  { id: 112, x: 15, y: 30, position: 'ST', name: 'B. Thompson', stamina: 58, sprints: 19, distance: 7.1, status: 'warning' as const, rating: 7.9, trend: 'up' as const, fatigue: 62, impact: 85, keyStat: '1 Goal, 3 Shots', team: 'away' },
];

// Substitutes/Bench players
const homeSubstitutes = [
  { id: 13, name: 'M. Robinson', position: 'GK', stamina: 100, rating: 6.5, keyStat: 'Ready' },
  { id: 14, name: 'J. Clarke', position: 'CB', stamina: 100, rating: 7.0, keyStat: 'Fresh legs' },
  { id: 15, name: 'D. Evans', position: 'CM', stamina: 100, rating: 6.8, keyStat: 'Fresh legs' },
  { id: 16, name: 'R. Hughes', position: 'RW', stamina: 100, rating: 6.9, keyStat: 'Fresh legs' },
  { id: 17, name: 'A. Scott', position: 'ST', stamina: 100, rating: 7.1, keyStat: 'Fresh legs' },
];

const awaySubstitutes = [
  { id: 113, name: 'H. White', position: 'GK', stamina: 100, rating: 6.4, keyStat: 'Ready' },
  { id: 114, name: 'E. Green', position: 'CB', stamina: 100, rating: 6.7, keyStat: 'Fresh legs' },
  { id: 115, name: 'S. Adams', position: 'CM', stamina: 100, rating: 6.9, keyStat: 'Fresh legs' },
  { id: 116, name: 'P. Wright', position: 'LW', stamina: 100, rating: 6.6, keyStat: 'Fresh legs' },
  { id: 117, name: 'K. Miller', position: 'ST', stamina: 100, rating: 6.8, keyStat: 'Fresh legs' },
];

// Extended match events with more detail
const extendedMatchEvents = [
  { id: 1, minute: 62, type: 'chance' as const, team: 'home' as const, title: 'Big Chance - Hansen', description: 'Shot from close range saved by keeper', xg: 0.45, player: 'S. Hansen' },
  { id: 2, minute: 58, type: 'card' as const, team: 'home' as const, title: 'Yellow Card - Walsh', description: 'Tactical foul to stop counter', player: 'K. Walsh', cardType: 'yellow' },
  { id: 3, minute: 51, type: 'goal' as const, team: 'home' as const, title: 'GOAL - D. Martinez', description: 'Long range strike from edge of box', xg: 0.12, player: 'D. Martinez', assist: 'J. Rodriguez' },
  { id: 4, minute: 45, type: 'sub' as const, team: 'away' as const, title: 'Substitution - Calgary', description: '#14 Off • #22 On', playerIn: 'F. Nelson', playerOut: 'D. Chen' },
  { id: 5, minute: 34, type: 'goal' as const, team: 'away' as const, title: 'GOAL - Calgary', description: 'Counter attack finished at back post', xg: 0.68, player: 'B. Thompson', assist: 'L. Martinez' },
  { id: 6, minute: 18, type: 'goal' as const, team: 'home' as const, title: 'GOAL - Williams', description: 'Header from corner kick', xg: 0.38, player: 'C. Williams', assist: 'T. Smith' },
  { id: 7, minute: 12, type: 'card' as const, team: 'away' as const, title: 'Yellow Card - Garcia', description: 'Late challenge in midfield', player: 'R. Garcia', cardType: 'yellow' },
  { id: 8, minute: 3, type: 'chance' as const, team: 'home' as const, title: 'Chance - Hansen', description: 'Shot blocked in the box', xg: 0.22, player: 'S. Hansen' },
];

interface Player {
  id: number;
  x: number;
  y: number;
  position: string;
  name: string;
  stamina: number;
  sprints: number;
  distance: number;
  status: 'optimal' | 'warning' | 'critical';
  rating: number;
  trend: 'up' | 'down' | 'stable';
  fatigue: number;
  impact: number;
  keyStat: string;
  team?: 'home' | 'away';
}

// Skeleton loader component
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-100 rounded ${className}`} />
);

// Player card component for hover/click
const PlayerDetailCard = ({ player, onClose }: { player: Player; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 10 }}
    className="absolute z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-72"
    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="font-semibold text-gray-900">{player.name}</h4>
        <p className="text-xs text-gray-500">{player.position} • {player.team === 'away' ? 'Calgary' : 'U of S'}</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
    
    <div className="grid grid-cols-3 gap-3 mb-3">
      <div className="text-center p-2 bg-gray-50 rounded-lg">
        <div className="text-lg font-bold text-gray-900">{player.rating.toFixed(1)}</div>
        <div className="text-xs text-gray-500">Rating</div>
      </div>
      <div className="text-center p-2 bg-gray-50 rounded-lg">
        <div className="text-lg font-bold text-gray-900">{player.stamina}%</div>
        <div className="text-xs text-gray-500">Stamina</div>
      </div>
      <div className="text-center p-2 bg-gray-50 rounded-lg">
        <div className="text-lg font-bold text-gray-900">{player.distance.toFixed(1)}</div>
        <div className="text-xs text-gray-500">km</div>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Fatigue</span>
        <span className="text-gray-900">{player.fatigue}%</span>
      </div>
      <Progress value={player.fatigue} className="h-1.5" />
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Impact</span>
        <span className="text-gray-900">{player.impact}%</span>
      </div>
      <Progress value={player.impact} className="h-1.5" />

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-600">{player.keyStat}</span>
        <Badge variant="secondary" className="text-xs">
          {player.sprints} sprints
        </Badge>
      </div>
    </div>
  </motion.div>
);

export default function MinimalDashboard() {
  // Display toggles
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showPassing, setShowPassing] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  
  // Interactive states
  const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Live data simulation
  const [liveMatchInfo, setLiveMatchInfo] = useState(initialMatchInfo);
  const [livePlayers, setLivePlayers] = useState(homePlayers);
  const [liveAwayPlayers, setLiveAwayPlayers] = useState(awayPlayers);
  
  // Mobile nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Export modal
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Filtered players based on team selection
  const displayPlayers = selectedTeam === 'home' ? livePlayers : liveAwayPlayers;
  const displaySubstitutes = selectedTeam === 'home' ? homeSubstitutes : awaySubstitutes;
  const teamInfo = selectedTeam === 'home' 
    ? { name: 'U of S', short: 'US', color: '#333' }
    : { name: 'Calgary', short: 'CG', color: '#6b7280' };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Live stat updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update match time
      setLiveMatchInfo(prev => ({
        ...prev,
        second: prev.second >= 59 ? 0 : prev.second + 1,
        minute: prev.second >= 59 ? prev.minute + 1 : prev.minute,
      }));
      
      // Occasionally update player positions slightly and stamina
      if (Math.random() > 0.7) {
        setLivePlayers(prev => prev.map(p => ({
          ...p,
          x: p.x + (Math.random() - 0.5) * 0.5,
          y: p.y + (Math.random() - 0.5) * 0.5,
          stamina: Math.max(20, Math.min(100, p.stamina + (Math.random() - 0.55) * 2)),
          fatigue: Math.max(10, Math.min(95, p.fatigue + (Math.random() - 0.45) * 3)),
        })));
        setLiveAwayPlayers(prev => prev.map(p => ({
          ...p,
          x: p.x + (Math.random() - 0.5) * 0.5,
          y: p.y + (Math.random() - 0.5) * 0.5,
          stamina: Math.max(20, Math.min(100, p.stamina + (Math.random() - 0.55) * 2)),
          fatigue: Math.max(10, Math.min(95, p.fatigue + (Math.random() - 0.45) * 3)),
        })));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Quick stats
  const quickStats = [
    { label: 'Possession', home: 62, away: 38, icon: TrendingUp },
    { label: 'Shots', home: 12, away: 7, icon: Target },
    { label: 'Passes', home: 387, away: 245, icon: Repeat },
    { label: 'Distance', home: '98.4', away: '89.2', unit: 'km', icon: MapPin },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-3 h-3 text-emerald-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-400" />;
      default: return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return <CircleDot className="w-4 h-4 text-emerald-500" />;
      case 'card': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'sub': return <Repeat className="w-4 h-4 text-blue-500" />;
      case 'chance': return <Target className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const handleExport = useCallback(() => {
    const exportData = {
      match: liveMatchInfo,
      homePlayers: livePlayers,
      awayPlayers: liveAwayPlayers,
      events: extendedMatchEvents,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rtgs-match-${liveMatchInfo.homeTeam.name}-vs-${liveMatchInfo.awayTeam.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  }, [liveMatchInfo, livePlayers, liveAwayPlayers]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div 
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-gray-900">RTGS</span>
            <Badge variant="secondary" className="text-xs font-normal bg-emerald-50 text-emerald-700 border-emerald-100">
              Live
            </Badge>
          </div>
          
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
            <span>{liveMatchInfo.homeTeam.name} vs {liveMatchInfo.awayTeam.name}</span>
            <span className="font-mono text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
              {liveMatchInfo.minute}:{liveMatchInfo.second.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex gap-2 text-gray-600"
              onClick={() => setShowExportModal(true)}
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-2">
                <div className="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-1.5 rounded inline-block">
                  {liveMatchInfo.minute}:{liveMatchInfo.second.toString().padStart(2, '0')}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => setShowExportModal(true)}
                >
                  <Download className="w-4 h-4" />
                  Export Match Data
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <Skeleton className="h-20 w-full max-w-md mx-auto" />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-80" />
              <div className="space-y-6">
                <Skeleton className="h-40" />
                <Skeleton className="h-48" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Scoreboard */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-4 sm:p-8">
                  <div className="flex items-center justify-center gap-6 sm:gap-12">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTeam('home')}
                      className={`text-center transition-all ${
                        selectedTeam === 'home' ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                      }`}
                    >
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-2 transition-all ${
                        selectedTeam === 'home' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
                      }`}>
                        US
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">U of S</span>
                    </motion.button>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <motion.span 
                          key={liveMatchInfo.homeTeam.score}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          className="text-4xl sm:text-6xl font-light text-gray-900"
                        >
                          {liveMatchInfo.homeTeam.score}
                        </motion.span>
                        <span className="text-xl sm:text-3xl text-gray-300">-</span>
                        <motion.span 
                          key={liveMatchInfo.awayTeam.score}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          className="text-4xl sm:text-6xl font-light text-gray-900"
                        >
                          {liveMatchInfo.awayTeam.score}
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4 text-gray-500">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-mono text-sm sm:text-lg">
                          {liveMatchInfo.minute}:{liveMatchInfo.second.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTeam('away')}
                      className={`text-center transition-all ${
                        selectedTeam === 'away' ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                      }`}
                    >
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-2 transition-all ${
                        selectedTeam === 'away' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        CG
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">Calgary</span>
                    </motion.button>
                  </div>

                  {/* Momentum Bar */}
                  <div className="mt-4 sm:mt-8 max-w-sm sm:max-w-md mx-auto">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Possession</span>
                      <span>{liveMatchInfo.momentum}% - {100 - liveMatchInfo.momentum}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
                      <motion.div 
                        className="bg-gray-900 rounded-full"
                        initial={{ width: '50%' }}
                        animate={{ width: `${liveMatchInfo.momentum}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="bg-gray-300 flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats - Mobile Horizontal Scroll */}
            <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-2">
                {quickStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm border border-gray-100 w-24"
                  >
                    <stat.icon className="w-3.5 h-3.5 text-gray-400 mb-1" />
                    <div className="text-xs text-gray-500">{stat.label}</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-sm font-semibold text-gray-900">
                        {typeof stat.home === 'number' ? stat.home : stat.home}
                      </span>
                      <span className="text-xs text-gray-400">- {stat.away}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Pitch View */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-7"
              >
                <Card className="border-0 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-[#f8faf8] p-4 sm:p-8 aspect-[16/10] flex items-center justify-center relative">
                      <div className="relative w-full max-w-4xl aspect-[100/60] bg-[#4a7c59] rounded-lg shadow-sm">
                        {/* Pitch Markings */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                          <rect x="0" y="0" width="100" height="60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                          <line x1="50" y1="0" x2="50" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                          <circle cx="50" cy="30" r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                          <rect x="0" y="15" width="16" height="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                          <rect x="84" y="15" width="16" height="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                        </svg>

                        {/* Heatmap */}
                        <AnimatePresence>
                          {showHeatmap && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.4 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 pointer-events-none"
                            >
                              <div className="absolute top-[20%] left-[60%] w-24 sm:w-32 h-24 sm:h-32 bg-white/50 rounded-full blur-[30px] sm:blur-[40px]" />
                              <div className="absolute top-[50%] left-[35%] w-28 sm:w-40 h-28 sm:h-40 bg-white/30 rounded-full blur-[40px] sm:blur-[50px]" />
                              <div className="absolute bottom-[25%] right-[25%] w-20 sm:w-28 h-20 sm:h-28 bg-white/40 rounded-full blur-[25px] sm:blur-[35px]" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Passing Lines */}
                        <AnimatePresence>
                          {showPassing && (
                            <motion.svg 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 w-full h-full" 
                              viewBox="0 0 100 60" 
                              preserveAspectRatio="none"
                            >
                              {passes.map((pass, i) => {
                                const p1 = livePlayers.find(p => p.id === pass.from);
                                const p2 = livePlayers.find(p => p.id === pass.to);
                                if (!p1 || !p2) return null;
                                return (
                                  <motion.line
                                    key={i}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    x1={p1.x}
                                    y1={p1.y}
                                    x2={p2.x}
                                    y2={p2.y}
                                    stroke="rgba(255,255,255,0.5)"
                                    strokeWidth={pass.weight * 0.08}
                                    strokeDasharray="0.5, 0.5"
                                  />
                                );
                              })}
                            </motion.svg>
                          )}
                        </AnimatePresence>

                        {/* Players */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                          {displayPlayers.map((p, i) => (
                            <motion.g
                              key={p.id}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: 1, 
                                scale: selectedPlayer?.id === p.id ? 1.3 : hoveredPlayer?.id === p.id ? 1.15 : 1 
                              }}
                              transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
                              style={{ cursor: 'pointer' }}
                              onMouseEnter={() => setHoveredPlayer(p)}
                              onMouseLeave={() => setHoveredPlayer(null)}
                              onClick={() => setSelectedPlayer(selectedPlayer?.id === p.id ? null : p)}
                            >
                              <circle 
                                cx={p.x} 
                                cy={p.y} 
                                r={selectedPlayer?.id === p.id ? 2.3 : 1.8} 
                                fill="white" 
                                stroke={selectedTeam === 'home' ? '#333' : '#6b7280'} 
                                strokeWidth="0.2" 
                              />
                              {showLabels && (
                                <text 
                                  x={p.x} 
                                  y={p.y - 2.8} 
                                  textAnchor="middle" 
                                  fill="white" 
                                  fontSize="1.2" 
                                  fontWeight="600" 
                                  className="uppercase"
                                  style={{ textShadow: '0 0 2px rgba(0,0,0,0.5)' }}
                                >
                                  {p.position}
                                </text>
                              )}
                            </motion.g>
                          ))}
                        </svg>

                        {/* Player Detail Card */}
                        <AnimatePresence>
                          {selectedPlayer && (
                            <PlayerDetailCard 
                              player={selectedPlayer} 
                              onClose={() => setSelectedPlayer(null)} 
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="border-t border-gray-100 bg-white px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs font-normal">
                            {teamInfo.name}
                          </Badge>
                          <span>4-3-3 Shape</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                          <div className="flex items-center gap-2">
                            <Switch 
                              id="passing-min" 
                              checked={showPassing} 
                              onCheckedChange={setShowPassing} 
                              className="data-[state=checked]:bg-gray-900"
                            />
                            <Label htmlFor="passing-min" className="text-xs text-gray-500 cursor-pointer">
                              Passing
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch 
                              id="heatmap-min" 
                              checked={showHeatmap} 
                              onCheckedChange={setShowHeatmap}
                              className="data-[state=checked]:bg-gray-900"
                            />
                            <Label htmlFor="heatmap-min" className="text-xs text-gray-500 cursor-pointer">
                              Heatmap
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch 
                              id="labels-min" 
                              checked={showLabels} 
                              onCheckedChange={setShowLabels}
                              className="data-[state=checked]:bg-gray-900"
                            />
                            <Label htmlFor="labels-min" className="text-xs text-gray-500 cursor-pointer">
                              Labels
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Side Panels */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                {/* Quick Stats - Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="hidden sm:block"
                >
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Match Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {quickStats.map((stat, i) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <stat.icon className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">{stat.label}</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-lg font-semibold text-gray-900">
                                  {typeof stat.home === 'number' ? stat.home : stat.home}
                                </span>
                                <span className="text-sm text-gray-400">- {stat.away}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* xG Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-sm font-medium text-gray-900">xG Timeline</h3>
                        <Target className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="h-28 sm:h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={xgData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="minute" stroke="#9ca3af" fontSize={9} tickLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                              }} 
                            />
                            <Line type="monotone" dataKey="home" stroke="#111827" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="away" stroke="#d1d5db" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-0.5 bg-gray-900 rounded" /> U of S
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-0.5 bg-gray-300 rounded" /> Calgary
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Player Load */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-sm font-medium text-gray-900">Player Load</h3>
                        <Activity className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                        {displayPlayers.slice(0, 5).map((player, i) => (
                          <motion.div 
                            key={player.id} 
                            className="space-y-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                          >
                            <div className="flex justify-between items-center text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 font-mono w-4">{player.position}</span>
                                <span className="text-gray-700 truncate max-w-[100px] sm:max-w-none">{player.name}</span>
                                {getTrendIcon(player.trend)}
                              </div>
                              <span className="text-gray-400">{player.stamina.toFixed(0)}%</span>
                            </div>
                            <Progress 
                              value={player.stamina} 
                              className="h-1" 
                            />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Bottom Row: Events & Substitutes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Match Events Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900">Match Events</h3>
                      <Badge variant="secondary" className="text-xs">
                        {extendedMatchEvents.length} events
                      </Badge>
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
                      {extendedMatchEvents.map((event, i) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
                        >
                          <span className="text-xs font-mono text-gray-400 w-7 pt-0.5">
                            {event.minute}'
                          </span>
                          <div className="p-1.5 rounded-lg bg-gray-50">
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {event.title}
                              </span>
                              {event.xg && (
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  xG: {event.xg.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{event.description}</p>
                          </div>
                          <Badge 
                            variant={event.team === 'home' ? 'default' : 'secondary'}
                            className={`text-xs flex-shrink-0 ${
                              event.team === 'home' 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {event.team === 'home' ? 'US' : 'CG'}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Substitutes Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900">Substitutes</h3>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      {displaySubstitutes.map((sub, i) => (
                        <motion.div
                          key={sub.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.03 }}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                            {sub.position}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{sub.name}</div>
                            <div className="text-xs text-gray-500">{sub.keyStat}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {sub.rating.toFixed(1)}
                            </Badge>
                            <div className="w-12 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-emerald-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${sub.stamina}%` }}
                                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </main>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Download className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Export Match Data</h3>
                  <p className="text-sm text-gray-500">Download as JSON file</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <p>Includes:</p>
                <ul className="list-disc list-inside text-gray-500">
                  <li>Match info and score</li>
                  <li>Player positions and stats</li>
                  <li>Match events timeline</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gray-900 hover:bg-gray-800"
                  onClick={handleExport}
                >
                  Download
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span>RTGS Dashboard Prototype</span>
            <div className="flex items-center gap-4">
              <span>Minimal Design v2</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}