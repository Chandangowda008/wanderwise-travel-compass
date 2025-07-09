
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2 } from "lucide-react";
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
      navigate("/");
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">WanderWise</h1>
          </div>
          <p className="text-gray-600">Sign in to discover amazing travel experiences</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              User Login
            </TabsTrigger>
            <TabsTrigger value="agency" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Agency Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle>User Login</CardTitle>
                <CardDescription>
                  Sign in to explore restaurants and plan your trips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="Enter your email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="Enter your password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as User
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agency">
            <Card>
              <CardHeader>
                <CardTitle>Agency Login</CardTitle>
                <CardDescription>
                  Sign in to manage and host travel experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAgencyLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency-email">Agency Email</Label>
                    <Input
                      id="agency-email"
                      type="email"
                      placeholder="Enter your agency email"
                      value={agencyEmail}
                      onChange={(e) => setAgencyEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-password">Password</Label>
                    <Input
                      id="agency-password"
                      type="password"
                      placeholder="Enter your password"
                      value={agencyPassword}
                      onChange={(e) => setAgencyPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as Agency
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
