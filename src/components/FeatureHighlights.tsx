
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign, Award } from "lucide-react";

export const FeatureHighlights = () => {
  return (
    <section className="px-4 py-16 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            How WanderWise Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our smart algorithm analyzes multiple factors to give you the most authentic 
            travel recommendations, helping you experience cities like a local.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-l-4 border-l-red-500">
            <div className="flex items-center mb-4">
              <Badge variant="destructive" className="mr-3">Overrated</Badge>
              <h3 className="font-display font-semibold text-2xl">Tourist Trap Detection</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              We identify popular spots that might be overcrowded or not worth the hype by 
              analyzing review patterns, pricing, and tourist density.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                High tourist volume vs. local visits
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Price-to-quality ratio analysis
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                Long wait times and crowding patterns
              </div>
            </div>
          </Card>

          <Card className="p-8 border-l-4 border-l-green-500">
            <div className="flex items-center mb-4">
              <Badge className="bg-green-500 hover:bg-green-600 mr-3">Hidden Gems</Badge>
              <h3 className="font-display font-semibold text-2xl">Authentic Discovery</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Uncover genuine local favorites that offer exceptional experiences without 
              the crowds, based on quality indicators and local preferences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="h-4 w-4 mr-2" />
                High-quality ratings from locals
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                Strong repeat customer patterns
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Excellent value for money
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary/10 to-orange-100">
            <h3 className="font-display font-bold text-2xl mb-4">Ready to Explore?</h3>
            <p className="text-muted-foreground max-w-md">
              Join thousands of travelers who've discovered authentic experiences with WanderWise
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
