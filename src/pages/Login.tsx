
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, Sparkles, Globe, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [agencyPassword, setAgencyPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User login attempt:", userEmail);
    
    // Simple validation for demo
    if (userEmail && userPassword) {
      toast({
        title: "Login Successful",
        description: "Welcome to WanderWise!",
      });
      navigate("/home");
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  const handleAgencyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Agency login attempt:", agencyEmail);
    
    // Simple validation for demo
    if (agencyEmail && agencyPassword) {
      toast({
        title: "Agency Login Successful",
        description: "Welcome to your agency dashboard!",
      });
      navigate("/agency-dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10"></div>
      
      {/* Floating background elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30"></div>
                <div className="relative bg-white rounded-xl p-3 shadow-soft">
                  <MapPin className="h-10 w-10 text-gradient" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold text-gradient">WanderWise</h1>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <Sparkles className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-muted-foreground">AI Travel Companion</span>
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">Sign in to discover amazing travel experiences</p>
          </div>

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-effect p-1">
              <TabsTrigger value="user" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300">
                <Globe className="h-4 w-4" />
                User Login
              </TabsTrigger>
              <TabsTrigger value="agency" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300">
                <Building2 className="h-4 w-4" />
                Agency Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="mt-6">
              <Card className="glass-card border-gradient shadow-soft-hover">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-xl">
                      <Globe className="h-6 w-6 text-gradient" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-display">User Login</CardTitle>
                  <CardDescription className="text-base">
                    Sign in to explore restaurants and plan your trips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUserLogin} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="user-email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur-md opacity-20"></div>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="Enter your email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="relative bg-white/90 backdrop-blur-sm border-orange-200/50 focus:border-orange-300 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="user-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur-md opacity-20"></div>
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="Enter your password"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          className="relative bg-white/90 backdrop-blur-sm border-orange-200/50 focus:border-orange-300 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full gradient-bg hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 shadow-soft-hover">
                      <Globe className="h-4 w-4 mr-2" />
                      Sign In as User
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agency" className="mt-6">
              <Card className="glass-card border-gradient shadow-soft-hover">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-xl">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-display">Agency Login</CardTitle>
                  <CardDescription className="text-base">
                    Sign in to manage and host travel experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAgencyLogin} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="agency-email" className="text-sm font-medium">Agency Email</Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur-md opacity-20"></div>
                        <Input
                          id="agency-email"
                          type="email"
                          placeholder="Enter your agency email"
                          value={agencyEmail}
                          onChange={(e) => setAgencyEmail(e.target.value)}
                          className="relative bg-white/90 backdrop-blur-sm border-blue-200/50 focus:border-blue-300 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="agency-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur-md opacity-20"></div>
                        <Input
                          id="agency-password"
                          type="password"
                          placeholder="Enter your password"
                          value={agencyPassword}
                          onChange={(e) => setAgencyPassword(e.target.value)}
                          className="relative bg-white/90 backdrop-blur-sm border-blue-200/50 focus:border-blue-300 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-white font-semibold py-3 shadow-soft-hover">
                      <Shield className="h-4 w-4 mr-2" />
                      Sign In as Agency
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
