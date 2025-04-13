
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const productCategories = [
  "Gold Jewelry",
  "Silver Jewelry",
  "Diamond Jewelry",
  "Gemstone Jewelry",
  "Watches",
  "Custom Designs",
  "Other"
];

const TraderApplication = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    specialty: "",
    years_experience: "",
    contact_email: user?.email || "",
    contact_phone: "",
    physical_location: "",
    product_category: "",
    business_description: "",
    website: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a trader application",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Cast supabase to any to bypass TypeScript errors with database tables
      const supabaseAny = supabase as any;
      
      const { error } = await supabaseAny
        .from('trader_applications')
        .insert({
          user_id: user.id,
          business_name: formData.business_name,
          specialty: formData.specialty,
          years_experience: parseInt(formData.years_experience) || 0,
          contact_email: formData.contact_email,
          contact_phone: formData.contact_phone,
          physical_location: formData.physical_location,
          product_category: formData.product_category,
          business_description: formData.business_description,
          website: formData.website || null,
          status: "pending"
        });
      
      if (error) throw error;
      
      toast({
        title: "Application Submitted",
        description: "Your trader application has been submitted successfully and is pending review.",
      });
      
      navigate("/traders");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 bg-stone-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair text-4xl text-center font-bold mb-6">
              Apply to Become a <span className="gold-gradient">Gold Souk Trader</span>
            </h1>
            <p className="text-luxury-light text-center text-lg mb-10">
              Join our exclusive marketplace and showcase your premium collections to customers worldwide.
            </p>
            
            <Card className="bg-stone border border-gold/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Trader Application</CardTitle>
                <CardDescription className="text-luxury-light">
                  Please complete the form below with your business details.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="business_name">Business Name *</Label>
                      <Input
                        id="business_name"
                        name="business_name"
                        placeholder="Your jewelry business name"
                        value={formData.business_name}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="specialty">Specialty *</Label>
                      <Input
                        id="specialty"
                        name="specialty"
                        placeholder="e.g., Gold & Traditional Jewelry"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="product_category">Primary Product Category *</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange("product_category", value)}
                        value={formData.product_category}
                        required
                      >
                        <SelectTrigger className="bg-stone-dark border-gold/20 focus:border-gold">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-dark border-gold/20">
                          {productCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="years_experience">Years of Experience *</Label>
                      <Input
                        id="years_experience"
                        name="years_experience"
                        type="number"
                        min="0"
                        placeholder="e.g., 5"
                        value={formData.years_experience}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="physical_location">Physical Store Location *</Label>
                      <Input
                        id="physical_location"
                        name="physical_location"
                        placeholder="e.g., Gold Souk, Shop #12, Deira"
                        value={formData.physical_location}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact_email">Contact Email *</Label>
                      <Input
                        id="contact_email"
                        name="contact_email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.contact_email}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact_phone">Contact Phone *</Label>
                      <Input
                        id="contact_phone"
                        name="contact_phone"
                        placeholder="e.g., +971 4 123 4567"
                        value={formData.contact_phone}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://yourbusiness.com"
                        value={formData.website}
                        onChange={handleChange}
                        className="bg-stone-dark border-gold/20 focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="business_description">Business Description *</Label>
                      <Textarea
                        id="business_description"
                        name="business_description"
                        placeholder="Tell us about your business, products, and what makes you unique..."
                        value={formData.business_description}
                        onChange={handleChange}
                        required
                        className="bg-stone-dark border-gold/20 focus:border-gold min-h-[120px]"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-stone-light hover:bg-stone-light/80 text-white w-full sm:w-auto"
                  onClick={() => navigate("/traders")}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-gold hover:bg-gold-light text-stone-dark w-full sm:w-auto"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TraderApplication;
