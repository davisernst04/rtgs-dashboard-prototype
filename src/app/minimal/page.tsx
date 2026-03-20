'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, TrendingUp, Target, Activity, Map as MapIcon, Share2, ChevronRight } from 'lucide-react';
import { players, passes, matchEvents, xgData, matchInfo } from '@/lib/mock-data';

export default function MinimalDashboard() {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showPassing, setShowPassing] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-900">RTGS Dashboard</span>
            <Badge variant="secondary" className="text-xs font-normal">Live</Badge>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>U of S vs Calgary</span>
            <span className="font-mono text-gray-900">{matchInfo.minute}:{matchInfo.second.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Scoreboard */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-900 mb-2">
                  US
                </div>
                <span className="text-sm text-gray-500">U of S</span>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-light text-gray-900">{matchInfo.homeTeam.score}</span>
                  <span className="text-3xl text-gray-300">-</span>
                  <span className="text-6xl font-light text-gray-900">{matchInfo.awayTeam.score}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-lg">{matchInfo.minute}:{matchInfo.second.toString().padStart(2, '0')}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500 mb-2">
                  CG
                </div>
                <span className="text-sm text-gray-500">Calgary</span>
              </div>
            </div>

            {/* Momentum Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Possession</span>
                <span>{matchInfo.momentum}% - {100 - matchInfo.momentum}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div className="bg-gray-900 rounded-full" style={{ width: `${matchInfo.momentum}%` }} />
                <div className="bg-gray-300 flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pitch View */}
          <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-[#f8faf8] p-8 aspect-[16/10] flex items-center justify-center relative">
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
                  {showHeatmap && (
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                      <div className="absolute top-[20%] left-[60%] w-32 h-32 bg-white/50 rounded-full blur-[40px]" />
                      <div className="absolute top-[50%] left-[35%] w-40 h-40 bg-white/30 rounded-full blur-[50px]" />
                    </div>
                  )}

                  {/* Passing Lines */}
                  {showPassing && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      {passes.map((pass, i) => {
                        const p1 = players.find(p => p.id === pass.from);
                        const p2 = players.find(p => p.id === pass.to);
                        if (!p1 || !p2) return null;
                        return (
                          <line
                            key={i}
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
                    </svg>
                  )}

                  {/* Players */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                    {players.map(p => (
                      <g key={p.id}>
                        <circle cx={p.x} cy={p.y} r="1.8" fill="white" stroke="#333" strokeWidth="0.15" />
                        <text x={p.x} y={p.y - 2.8} textAnchor="middle" fill="white" fontSize="1.4" fontWeight="600" className="uppercase">
                          {p.position}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Controls */}
              <div className="border-t border-gray-100 bg-white px-6 py-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">U of S • 4-3-3 Shape</span>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="passing-min" checked={showPassing} onCheckedChange={setShowPassing} />
                    <Label htmlFor="passing-min" className="text-xs text-gray-500 cursor-pointer">Passing</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="heatmap-min" checked={showHeatmap} onCheckedChange={setShowHeatmap} />
                    <Label htmlFor="heatmap-min" className="text-xs text-gray-500 cursor-pointer">Heatmap</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* xG Chart */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">xG Timeline</h3>
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={xgData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="minute" stroke="#9ca3af" fontSize={10} />
                      <YAxis stroke="#9ca3af" fontSize={10} />
                      <Tooltip />
                      <Line type="monotone" dataKey="home" stroke="#111827" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="away" stroke="#d1d5db" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-gray-900" /> U of S</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-gray-300" /> Calgary</span>
                </div>
              </CardContent>
            </Card>

            {/* Player Load */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Player Load</h3>
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {players.slice(0, 5).map(player => (
                    <div key={player.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-700">{player.name}</span>
                        <span className="text-gray-400">{player.stamina}%</span>
                      </div>
                      <Progress value={player.stamina} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Events */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Events</h3>
            <div className="space-y-3">
              {matchEvents.slice(0, 4).map((event, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                  <span className="text-xs font-mono text-gray-400 w-8">{event.minute}'</span>
                  <Badge variant={event.type === 'goal' ? 'default' : 'secondary'} className="text-xs">
                    {event.type}
                  </Badge>
                  <span className="text-sm text-gray-700">{event.title}</span>
                  {event.xg && <span className="text-xs text-gray-400">xG: {event.xg}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}