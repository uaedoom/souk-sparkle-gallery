
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

type AuthMode = "login" | "signup";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
        
        setMode("login");
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-stone-dark border border-gold/20 rounded-lg p-8">
            <h1 className="font-playfair text-3xl font-bold text-center mb-6">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === "signup" && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm text-luxury-light">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-light h-5 w-5" />
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 bg-stone border-gold/20 focus:border-gold"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm text-luxury-light">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-light h-5 w-5" />
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10 bg-stone border-gold/20 focus:border-gold"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-luxury-light">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-light h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-stone border-gold/20 focus:border-gold"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-luxury-light">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-light h-5 w-5" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-stone border-gold/20 focus:border-gold"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-light text-stone-dark py-6"
                disabled={loading}
              >
                {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-luxury-light">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                className="text-gold"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
