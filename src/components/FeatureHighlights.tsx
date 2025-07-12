
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign, Award, Sparkles, TrendingUp, Heart } from "lucide-react";

export const FeatureHighlights = () => {
  return (
    <section className="relative px-4 py-20 bg-gradient-to-b from-white/50 to-orange-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl floating-animation" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-6 border border-orange-200/50">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Smart Travel Technology</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            How WanderWise
            <span className="text-gradient block">Works</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our smart algorithm analyzes multiple factors to give you the most authentic 
            travel recommendations, helping you experience cities like a local.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card p-8 border-l-4 border-l-red-500 group hover:scale-105 transition-all duration-300 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div>
                <Badge variant="destructive" className="mb-2">Overrated Detection</Badge>
                <h3 className="font-display font-semibold text-2xl text-gray-900">Tourist Trap Detection</h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We identify popular spots that might be overcrowded or not worth the hype by 
              analyzing review patterns, pricing, and tourist density with advanced AI.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-red-100 p-2 rounded-lg mr-3 group-hover/item:bg-red-200 transition-colors">
                  <Users className="h-4 w-4 text-red-600" />
                </div>
                High tourist volume vs. local visits
              </div>
              <div className="flex items-center text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-red-100 p-2 rounded-lg mr-3 group-hover/item:bg-red-200 transition-colors">
                  <DollarSign className="h-4 w-4 text-red-600" />
                </div>
                Price-to-quality ratio analysis
              </div>
              <div className="flex items-center text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-red-100 p-2 rounded-lg mr-3 group-hover/item:bg-red-200 transition-colors">
                  <Clock className="h-4 w-4 text-red-600" />
                </div>
                Long wait times and crowding patterns
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8 border-l-4 border-l-green-500 group hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <Badge className="bg-green-500 hover:bg-green-600 mb-2">Hidden Gems</Badge>
                <h3 className="font-display font-semibold text-2xl text-gray-900">Authentic Discovery</h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Uncover genuine local favorites that offer exceptional experiences without 
              the crowds, based on quality indicators and local preferences.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover/item:bg-green-200 transition-colors">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                High-quality ratings from locals
              </div>
              <div className="flex items-center text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover/item:bg-green-200 transition-colors">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                Strong repeat customer patterns
              </div>
              <div className="flex items-center text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover/item:bg-green-200 transition-colors">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                Excellent value for money
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="glass-card inline-block p-10 bg-gradient-to-r from-orange-50 to-red-50 border-gradient shadow-soft-hover hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-gradient" />
                </div>
              </div>
            </div>
            <h3 className="font-display font-bold text-3xl mb-4 text-gray-900">Ready to Explore?</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Join thousands of travelers who've discovered authentic experiences with WanderWise's AI-powered recommendations
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
