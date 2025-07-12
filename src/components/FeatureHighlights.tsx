
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign, Award, Sparkles, TrendingUp, Heart } from "lucide-react";

export const FeatureHighlights = () => {
  return (
    <section className="relative px-4 py-12 md:py-20 bg-gradient-to-b from-white/50 to-orange-50/30">
      {/* Background decorative elements - reduced on mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 border border-orange-200/50">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-orange-600" />
            <span className="text-xs md:text-sm font-medium text-orange-700">Smart Travel Technology</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4 md:mb-6">
            How WanderWise
            <span className="text-gradient block">Works</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-4">
            Our smart algorithm analyzes multiple factors to give you the most authentic 
            travel recommendations, helping you experience cities like a local.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card className="glass-card p-6 md:p-8 border-l-4 border-l-red-500 group hover:scale-105 transition-all duration-300 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
              <div className="relative mb-4 md:mb-0 md:mr-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-red-100 to-red-200 p-2 md:p-3 rounded-xl">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                </div>
              </div>
              <div>
                <Badge variant="destructive" className="mb-2">Overrated Detection</Badge>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-gray-900">Tourist Trap Detection</h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              We identify popular spots that might be overcrowded or not worth the hype by 
              analyzing review patterns, pricing, and tourist density with advanced AI.
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center text-xs md:text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-red-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 group-hover/item:bg-red-200 transition-colors">
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                </div>
                High tourist volume vs. local visits
              </div>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-red-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 group-hover/item:bg-red-200 transition-colors">
                  <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                </div>
                Price-to-quality ratio analysis
              </div>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-red-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 group-hover/item:bg-red-200 transition-colors">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                </div>
                Long wait times and crowding patterns
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 md:p-8 border-l-4 border-l-green-500 group hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
              <div className="relative mb-4 md:mb-0 md:mr-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-100 to-green-200 p-2 md:p-3 rounded-xl">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
              <div>
                <Badge className="bg-green-500 hover:bg-green-600 mb-2">Hidden Gems</Badge>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-gray-900">Authentic Discovery</h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              Uncover genuine local favorites that offer exceptional experiences without 
              the crowds, based on quality indicators and local preferences.
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center text-xs md:text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-green-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 group-hover/item:bg-green-200 transition-colors">
                  <Award className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                </div>
                High-quality ratings from locals
              </div>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-green-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 group-hover/item:bg-green-200 transition-colors">
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                </div>
                Strong repeat customer patterns
              </div>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground group/item hover:text-gray-900 transition-colors">
                <div className="bg-green-100 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3 group-hover/item:bg-green-200 transition-colors">
                  <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                </div>
                Excellent value for money
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="glass-card inline-block p-6 md:p-10 bg-gradient-to-r from-orange-50 to-red-50 border-gradient shadow-soft-hover hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-br from-orange-100 to-red-100 p-3 md:p-4 rounded-full">
                  <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-gradient" />
                </div>
              </div>
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 md:mb-4 text-gray-900">Ready to Explore?</h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
              Join thousands of travelers who've discovered authentic experiences with WanderWise's AI-powered recommendations
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
