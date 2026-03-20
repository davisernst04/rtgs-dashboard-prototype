import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Layout, Sparkles, ArrowRight } from 'lucide-react';

const variations = [
  {
    title: 'Minimal / Clean',
    description: 'Light mode design with lots of white space. Focus on clarity and readability with a simplified navigation.',
    href: '/minimal',
    icon: Layout,
    gradient: 'from-gray-100 to-gray-200',
    textColor: 'text-gray-900',
    badge: 'Light Mode',
  },
  {
    title: 'Data-Dense / Professional',
    description: 'Dark mode dashboard with maximum information density. Grid-based layout with widgets and panels for professional analysis.',
    href: '/dense',
    icon: Activity,
    gradient: 'from-gray-900 to-gray-800',
    textColor: 'text-white',
    badge: 'Dark Mode',
  },
  {
    title: 'Modern / Bold',
    description: 'Experimental design with gradients, glassmorphism, and floating navigation. A unique visual identity.',
    href: '/bold',
    icon: Sparkles,
    gradient: 'from-purple-900 to-slate-900',
    textColor: 'text-white',
    badge: 'Experimental',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-gray-900">RTGS Dashboard Prototypes</span>
          </div>
          <Badge variant="secondary" className="text-xs">Design Exploration</Badge>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            RTGS Dashboard Design Variations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three distinct design directions for the Real-Time Game Strategy dashboard.
            Each variation explores different visual approaches while maintaining core functionality.
          </p>
        </div>

        {/* Variation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {variations.map((variation) => {
            const Icon = variation.icon;
            return (
              <Link key={variation.href} href={variation.href} className="group">
                <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${variation.gradient}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${variation.textColor}`} />
                      </div>
                      <Badge variant="outline" className={`text-xs border-current ${variation.textColor} border-opacity-30`}>
                        {variation.badge}
                      </Badge>
                    </div>
                    
                    <h2 className={`text-2xl font-bold mb-3 ${variation.textColor}`}>
                      {variation.title}
                    </h2>
                    <p className={`text-sm opacity-70 mb-6 ${variation.textColor}`}>
                      {variation.description}
                    </p>
                    
                    <div className={`flex items-center gap-2 text-sm font-medium ${variation.textColor} opacity-70 group-hover:opacity-100 transition-opacity`}>
                      <span>View Variation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 p-8 bg-white rounded-2xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About These Prototypes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Shared Components</h3>
              <p>All three variations use the same underlying components: pitch view, match control, player load tracking, and xG charts. This demonstrates how the same functionality can be presented in vastly different ways.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Design Goals</h3>
              <p>Each variation explores a different design philosophy: minimal focuses on clarity, dense prioritizes information, and bold pushes visual boundaries. The goal is to find the right balance for the target users.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tech Stack</h3>
              <p>Built with Next.js 16, Shadcn UI, Tailwind CSS, Lucide icons, and Recharts. All components are fully functional with consistent mock data across variations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>RTGS Dashboard Prototype • Design Exploration</span>
            <span>Original: /projects/rtgs_dashboard</span>
          </div>
        </div>
      </footer>
    </main>
  );
}