'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';
import { Clock, TrendingUp, Target, Activity, Map as MapIcon, Share2, Zap, Users, Shield, AlertCircle, Trophy, PlayCircle } from 'lucide-react';
import { players, passes, matchEvents, xgData, matchInfo } from '@/lib/mock-data';

export default function DenseDashboard() {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showPassing, setShowPassing] = useState(false);

  const getStatusColor = (status: 'optimal' | 'warning' | 'critical') => {
    switch (status) {
      case 'optimal': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-emerald-400" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      case 'stable': return <div className="w-3 h-0.5 bg-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Dense Header */}
      <header className="border-b border-gray-800 bg-[#0a0a0b]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-100">RTGS COMMAND CENTER</span>
            </div>
            <nav className="flex items-center gap-1">
              {['Overview', 'Squad', 'Tactics', 'Analytics'].map((item, i) => (
                <button key={item} className={`px-3 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-[10px] border-emerald-600/50 text-emerald-400">LIVE</Badge>
            <span className="font-mono text-sm text-gray-100">{matchInfo.minute}:{matchInfo.second.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      <main className="p-3">
        {/* Compact Scoreboard */}
        <Card className="border-gray-800 bg-gray-900/50 mb-3">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-100 text-gray-900 flex items-center justify-center text-xs font-bold">US</div>
                  <span className="text-lg font-bold text-white">{matchInfo.homeTeam.score}</span>
                </div>
                <span className="text-gray-600">-</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-white">{matchInfo.awayTeam.score}</span>
                  <div className="w-8 h-8 rounded bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold">CG</div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {/* Momentum */}
                <div className="w-32">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>Home</span>
                    <span>Away</span>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500" style={{ width: `${matchInfo.momentum}%` }} />
                    <div className="bg-gray-700 flex-1" />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">1.84</div>
                    <div className="text-[9px] text-gray-500">xG</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">8.4s</div>
                    <div className="text-[9px] text-gray-500">Regain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">62%</div>
                    <div className="text-[9px] text-gray-500">Possession</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid - Dense Layout */}
        <div className="grid grid-cols-12 gap-3">
          {/* Left Column - Pitch */}
          <div className="col-span-8">
            <Card className="border-gray-800 bg-gray-900/30 h-[400px]">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 bg-[#051a10] p-4 flex items-center justify-center relative">
                  <div className="relative w-full max-w-3xl aspect-[100/60] bg-[#0a2818] rounded border border-emerald-900/50">
                    {/* Pitch Markings */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      <rect x="0" y="0" width="100" height="60" fill="none" stroke="#10b981" strokeWidth="0.15" opacity="0.3" />
                      <line x1="50" y1="0" x2="50" y2="60" stroke="#10b981" strokeWidth="0.15" opacity="0.3" />
                      <circle cx="50" cy="30" r="8" fill="none" stroke="#10b981" strokeWidth="0.15" opacity="0.3" />
                      <rect x="0" y="15" width="16" height="30" fill="none" stroke="#10b981" strokeWidth="0.15" opacity="0.3" />
                      <rect x="84" y="15" width="16" height="30" fill="none" stroke="#10b981" strokeWidth="0.15" opacity="0.3" />
                    </svg>

                    {/* Heatmap */}
                    {showHeatmap && (
                      <div className="absolute inset-0 pointer-events-none opacity-50">
                        <div className="absolute top-[20%] left-[60%] w-24 h-24 bg-emerald-500/40 rounded-full blur-[30px]" />
                        <div className="absolute top-[50%] left-[35%] w-32 h-32 bg-emerald-600/30 rounded-full blur-[40px]" />
                      </div>
                    )}

                    {/* Passing */}
                    {showPassing && (
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                        {passes.map((pass, i) => {
                          const p1 = players.find(p => p.id === pass.from);
                          const p2 = players.find(p => p.id === pass.to);
                          if (!p1 || !p2) return null;
                          return (
                            <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#10b981" strokeWidth={pass.weight * 0.06} strokeDasharray="0.3, 0.3" opacity="0.5" />
                          );
                        })}
                      </svg>
                    )}

                    {/* Players */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      {players.map(p => (
                        <g key={p.id}>
                          <circle cx={p.x} cy={p.y} r="1.2" fill="#10b981" stroke="#000" strokeWidth="0.1" />
                          <text x={p.x} y={p.y - 2} textAnchor="middle" fill="#fff" fontSize="1.1" fontWeight="600" opacity="0.9">{p.position}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Controls */}
                <div className="h-10 border-t border-gray-800 bg-[#080809] px-4 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">U of S • 4-3-3</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch id="passing-dense" checked={showPassing} onCheckedChange={setShowPassing} className="h-4 w-6 data-[state=checked]:bg-emerald-600" />
                      <Label htmlFor="passing-dense" className="text-[10px] text-gray-400 cursor-pointer">Passing</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="heatmap-dense" checked={showHeatmap} onCheckedChange={setShowHeatmap} className="h-4 w-6 data-[state=checked]:bg-emerald-600" />
                      <Label htmlFor="heatmap-dense" className="text-[10px] text-gray-400 cursor-pointer">Heatmap</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Row - Charts */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* xG Chart */}
              <Card className="border-gray-800 bg-gray-900/30">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                    <Target className="w-3 h-3" /> xG Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={xgData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="minute" stroke="#6b7280" fontSize={9} />
                        <YAxis stroke="#6b7280" fontSize={9} />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px' }} />
                        <Line type="monotone" dataKey="home" stroke="#10b981" strokeWidth={1.5} dot={false} />
                        <Line type="monotone" dataKey="away" stroke="#ef4444" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Team Stats */}
              <Card className="border-gray-800 bg-gray-900/30">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Team Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {[
                      { label: 'Shots', home: 14, away: 8 },
                      { label: 'Passes', home: 342, away: 218 },
                      { label: 'Tackles', home: 18, away: 22 },
                    ].map(stat => (
                      <div key={stat.label} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 w-16">{stat.label}</span>
                        <span className="text-[10px] text-gray-300 w-8 text-right">{stat.home}</span>
                        <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden flex">
                          <div className="bg-emerald-500" style={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 w-8">{stat.away}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Player Data */}
          <div className="col-span-4 space-y-3">
            {/* Player Performance Matrix */}
            <Card className="border-gray-800 bg-gray-900/30">
              <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Performance Matrix
                </CardTitle>
                <Badge variant="outline" className="text-[9px] border-gray-700 text-gray-400">LIVE</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[200px]">
                  <div className="divide-y divide-gray-800">
                    {players.slice(0, 6).map(player => (
                      <div key={player.id} className="p-2 hover:bg-gray-800/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 w-4">{player.id}</span>
                            <span className="text-xs font-medium text-gray-200">{player.name}</span>
                            <Badge variant="secondary" className="text-[8px] h-3 px-1 bg-gray-800">{player.position}</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-white">{player.rating}</span>
                            {getTrendIcon(player.trend)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                              <span>Fatigue</span>
                              <span>{player.fatigue}%</span>
                            </div>
                            <Progress value={player.fatigue} className="h-0.5 bg-gray-800" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
                              <span>Impact</span>
                              <span>{player.impact}%</span>
                            </div>
                            <Progress value={player.impact} className="h-0.5 bg-gray-800" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Player Load */}
            <Card className="border-gray-800 bg-gray-900/30">
              <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Player Load
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {players.slice(0, 6).map(player => (
                    <div key={player.id} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-4">{player.id}</span>
                      <span className="text-[10px] text-gray-300 w-20 truncate">{player.position}</span>
                      <Progress value={player.stamina} className="h-1 flex-1" />
                      <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(player.status)}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Match Events */}
            <Card className="border-gray-800 bg-gray-900/30">
              <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[120px]">
                  <div className="p-2 space-y-1">
                    {matchEvents.map((event, i) => (
                      <div key={i} className="flex items-center gap-2 p-1 rounded hover:bg-gray-800/30 transition-colors">
                        <span className="text-[9px] text-gray-500 w-6">{event.minute}'</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${event.type === 'goal' ? 'bg-emerald-500/20' : 'bg-gray-800'}`}>
                          {event.type === 'goal' && <Trophy className="w-2 h-2 text-emerald-400" />}
                          {event.type === 'card' && <div className="w-1.5 h-2 bg-amber-500 rounded-sm" />}
                          {event.type === 'sub' && <PlayCircle className="w-2 h-2 text-gray-400" />}
                          {event.type === 'chance' && <AlertCircle className="w-2 h-2 text-amber-400" />}
                        </div>
                        <span className="text-[10px] text-gray-300 truncate flex-1">{event.title}</span>
                        {event.xg && <span className="text-[8px] text-gray-500">xG: {event.xg}</span>}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}