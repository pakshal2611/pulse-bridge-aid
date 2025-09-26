import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Mail, Lock, User, UserPlus, Building2, Droplets } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    hospitalName: "",
    bloodBankName: ""
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Role-specific validation
    if (role === 'hospital' && !formData.hospitalName) {
      toast.error("Please enter hospital name");
      return;
    }

    if (role === 'bloodbank' && !formData.bloodBankName) {
      toast.error("Please enter blood bank name");
      return;
    }

    if (role === 'donor' && !formData.name) {
      toast.error("Please enter your full name");
      return;
    }

    const success = signup({ ...formData, role });
    if (success) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } else {
      toast.error("Signup failed. Please try again.");
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'hospital': return <Building2 className="h-4 w-4" />;
      case 'bloodbank': return <Droplets className="h-4 w-4" />;
      case 'donor': return <Heart className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'hospital':
        return (
          <div className="space-y-2">
            <Label htmlFor="hospitalName">Hospital Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="hospitalName"
                type="text"
                placeholder="Enter hospital name"
                value={formData.hospitalName}
                onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        );
      
      case 'bloodbank':
        return (
          <div className="space-y-2">
            <Label htmlFor="bloodBankName">Blood Bank Name</Label>
            <div className="relative">
              <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="bloodBankName"
                type="text"
                placeholder="Enter blood bank name"
                value={formData.bloodBankName}
                onChange={(e) => handleInputChange('bloodBankName', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        );
      
      case 'donor':
        return (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LifeLink
            </h1>
          </div>
          <p className="text-muted-foreground">
            Join the mission to save lives
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Sign up to become part of LifeLink
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <div className="relative">
                  {getRoleIcon()}
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="bloodbank">Blood Bank</SelectItem>
                      <SelectItem value="donor">Donor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {renderRoleSpecificFields()}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;