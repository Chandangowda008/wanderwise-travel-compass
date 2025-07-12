
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building2, Sparkles, Globe, Shield, Eye, EyeOff, Mail, Lock, ArrowRight, Users, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [agencyPassword, setAgencyPassword] = useState("");
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showAgencyPassword, setShowAgencyPassword] = useState(false);
  const [showAgencyLogin, setShowAgencyLogin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User login attempt:", userEmail);
    
    // Simple validation for demo
    if (userEmail && userPassword) {
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to WanderWise",
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
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md md:max-w-lg animate-fade-in-up">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30"></div>
                <div className="relative bg-white rounded-xl p-3 shadow-soft">
                  <MapPin className="h-8 w-8 md:h-10 md:w-10 text-gradient" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient">WanderWise</h1>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <Sparkles className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-muted-foreground">AI Travel Companion</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">Welcome Back</h2>
              <p className="text-base md:text-lg text-muted-foreground">Sign in to discover amazing travel experiences</p>
            </div>
          </div>

          {/* Main User Login Card */}
          <Card className="glass-card border-gradient shadow-soft-hover mb-6">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-gradient" />
                </div>
              </div>
              <CardTitle className="text-xl md:text-2xl font-display">Traveler Login</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Access personalized recommendations and plan your perfect trip
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="user-email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-orange-500" />
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="relative bg-white/90 backdrop-blur-sm border-orange-200/50 focus:border-orange-300 transition-colors text-base pl-4 pr-4 py-3"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="user-password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-orange-500" />
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-orange-200/50 focus-within:border-orange-300 rounded-lg transition-colors">
                      <Input
                        id="user-password"
                        type={showUserPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-4 pr-12 py-3"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                        className="absolute right-2 p-1 hover:bg-orange-50"
                      >
                        {showUserPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-orange-300 text-orange-600 focus:ring-orange-500" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
                    Forgot password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-bg hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 shadow-soft-hover text-base group"
                >
                  <Globe className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Sign In & Explore
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Sign up for free
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Agency Login Section */}
          <div className="text-center">
            <Separator className="my-6" />
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Crown className="h-4 w-4" />
                <span>Are you a travel agency?</span>
              </div>
              
              {!showAgencyLogin ? (
                <Button
                  variant="outline"
                  onClick={() => setShowAgencyLogin(true)}
                  className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 transition-all duration-300"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Agency Login
                </Button>
              ) : (
                <Card className="glass-card border-blue-200/50 shadow-soft">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-2 rounded-lg">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-display">Agency Portal</CardTitle>
                    <CardDescription className="text-sm">
                      Manage and host travel experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAgencyLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="agency-email" className="text-xs font-medium">Agency Email</Label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur-md opacity-20"></div>
                          <Input
                            id="agency-email"
                            type="email"
                            placeholder="Enter agency email"
                            value={agencyEmail}
                            onChange={(e) => setAgencyEmail(e.target.value)}
                            className="relative bg-white/90 backdrop-blur-sm border-blue-200/50 focus:border-blue-300 transition-colors text-sm"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="agency-password" className="text-xs font-medium">Password</Label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur-md opacity-20"></div>
                          <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-blue-200/50 focus-within:border-blue-300 rounded-lg transition-colors">
                            <Input
                              id="agency-password"
                              type={showAgencyPassword ? "text" : "password"}
                              placeholder="Enter password"
                              value={agencyPassword}
                              onChange={(e) => setAgencyPassword(e.target.value)}
                              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm pl-3 pr-10 py-2"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowAgencyPassword(!showAgencyPassword)}
                              className="absolute right-1 p-1 hover:bg-blue-50"
                            >
                              {showAgencyPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-white font-medium py-2 text-sm shadow-soft-hover"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Agency Sign In
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAgencyLogin(false)}
                          className="px-3 py-2 text-sm border-gray-200 hover:bg-gray-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
