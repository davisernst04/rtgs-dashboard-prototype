'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, TrendingUp, Target, Activity, Zap, Users, Sparkles, ChevronRight, CircleDot, Flame } from 'lucide-react';
import { players, passes, matchEvents, xgData, matchInfo } from '@/lib/mock-data';

export default function BoldDashboard() {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showPassing, setShowPassing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">RTGS</span>
          </div>
          <div className="flex items-center gap-1">
            {['Dashboard', 'Squad', 'Analytics'].map((item, i) => (
              <button key={item} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${i === 0 ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full px-4 py-1.5 border border-white/10">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="text-sm font-mono text-white">{matchInfo.minute}:{matchInfo.second.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 px-6 pb-12 max-w-7xl mx-auto">
        {/* Hero Scoreboard */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-16">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-2xl font-black text-white mb-3 shadow-lg shadow-cyan-500/30">
                  US
                </div>
                <span className="text-sm font-medium text-white/70">U of S</span>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-8xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
                    {matchInfo.homeTeam.score}
                  </span>
                  <div className="flex flex-col items-center gap-2">
                    <Badge className="bg-white/10 border-white/20 text-white text-xs">LIVE</Badge>
                    <span className="text-white/30 text-2xl">:</span>
                  </div>
                  <span className="text-8xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
                    {matchInfo.awayTeam.score}
                  </span>
                </div>
                <div className="text-white/50 text-sm">Second Half • Match Day</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-2xl font-black text-gray-400 mb-3 border border-white/10">
                  CG
                </div>
                <span className="text-sm font-medium text-white/70">Calgary</span>
              </div>
            </div>

            {/* Momentum Wave */}
            <div className="mt-8">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-xs text-cyan-400 font-medium">Home Dominance</span>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full" style={{ width: `${matchInfo.momentum}%` }} />
                </div>
                <span className="text-xs text-fuchsia-400 font-medium">Away Threat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Pitch View */}
          <div className="col-span-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 bg-gradient-to-b from-emerald-900/50 to-emerald-950/80">
                <div className="relative w-full aspect-[16/10] flex items-center justify-center">
                  <div className="relative w-full max-w-4xl aspect-[100/60] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                       style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' }}>
                    {/* Pitch Markings */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="100" height="60" fill="none" stroke="url(#lineGradient)" strokeWidth="0.15" />
                      <line x1="50" y1="0" x2="50" y2="60" stroke="url(#lineGradient)" strokeWidth="0.15" />
                      <circle cx="50" cy="30" r="8" fill="none" stroke="url(#lineGradient)" strokeWidth="0.15" />
                      <rect x="0" y="15" width="16" height="30" fill="none" stroke="url(#lineGradient)" strokeWidth="0.15" />
                      <rect x="84" y="15" width="16" height="30" fill="none" stroke="url(#lineGradient)" strokeWidth="0.15" />
                    </svg>

                    {/* Heatmap */}
                    {showHeatmap && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[20%] left-[60%] w-36 h-36 bg-cyan-400/30 rounded-full blur-[50px]" />
                        <div className="absolute top-[50%] left-[35%] w-44 h-44 bg-fuchsia-500/20 rounded-full blur-[60px]" />
                      </div>
                    )}

                    {/* Passing */}
                    {showPassing && (
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="passGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#c026d3" />
                          </linearGradient>
                        </defs>
                        {passes.map((pass, i) => {
                          const p1 = players.find(p => p.id === pass.from);
                          const p2 = players.find(p => p.id === pass.to);
                          if (!p1 || !p2) return null;
                          return (
                            <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="url(#passGradient)" strokeWidth={pass.weight * 0.08} strokeDasharray="0.5, 0.5" opacity="0.6" />
                          );
                        })}
                      </svg>
                    )}

                    {/* Players */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      {players.map((p, i) => (
                        <g key={p.id}>
                          <defs>
                            <linearGradient id={`playerGrad${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#22d3ee" />
                              <stop offset="100%" stopColor="#c026d3" />
                            </linearGradient>
                          </defs>
                          <circle cx={p.x} cy={p.y} r="2" fill={`url(#playerGrad${p.id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.15" />
                          <text x={p.x} y={p.y - 3} textAnchor="middle" fill="white" fontSize="1.3" fontWeight="700" className="drop-shadow-lg">{p.position}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CircleDot className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white/60">U of S • 4-3-3 Shape</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="passing-bold" checked={showPassing} onCheckedChange={setShowPassing} className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-fuchsia-500" />
                    <Label htmlFor="passing-bold" className="text-xs text-white/60 cursor-pointer">Passing</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="heatmap-bold" checked={showHeatmap} onCheckedChange={setShowHeatmap} className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-fuchsia-500" />
                    <Label htmlFor="heatmap-bold" className="text-xs text-white/60 cursor-pointer">Heatmap</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Team xG', value: '1.84', icon: Target, color: 'from-cyan-400 to-cyan-600' },
                { label: 'Regain', value: '8.4s', icon: Flame, color: 'from-fuchsia-400 to-fuchsia-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* xG Chart */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">xG Timeline</h3>
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
              </div>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={xgData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                    <XAxis dataKey="minute" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="home" stroke="url(#homeGradient)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="away" stroke="rgba(255,255,255,0.3)" strokeWidth={2} dot={false} />
                    <defs>
                      <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#c026d3" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Player Performance */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" /> Performance
                  </h3>
                  <Badge className="bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white/70 text-[10px]">LIVE</Badge>
                </div>
              </div>
              <ScrollArea className="h-[180px]">
                <div className="p-2">
                  {players.slice(0, 6).map(player => (
                    <div key={player.id} className="p-3 rounded-xl hover:bg-white/5 transition-colors mb-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 flex items-center justify-center text-[10px] font-bold text-white">
                            {player.id}
                          </div>
                          <span className="text-xs font-medium text-white">{player.name}</span>
                        </div>
                        <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                          {player.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={player.stamina} className="h-1 flex-1 bg-white/10" />
                        <span className="text-[10px] text-white/40">{player.stamina}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Recent Events */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-fuchsia-400" /> Recent Events
                </h3>
              </div>
              <ScrollArea className="h-[140px]">
                <div className="p-2 space-y-1">
                  {matchEvents.slice(0, 4).map((event, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white/5 flex items-center gap-3">
                      <div className="text-[10px] text-white/40 font-mono w-6">{event.minute}'</div>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${event.type === 'goal' ? 'bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30' : 'bg-white/5'}`}>
                        {event.type === 'goal' && <span className="text-[10px]">⚽</span>}
                        {event.type === 'card' && <div className="w-1.5 h-2 bg-amber-400 rounded-sm" />}
                        {event.type === 'chance' && <Zap className="w-3 h-3 text-amber-400" />}
                      </div>
                      <span className="text-xs text-white/70 flex-1 truncate">{event.title}</span>
                      {event.xg && <span className="text-[10px] text-white/30">xG: {event.xg}</span>}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}