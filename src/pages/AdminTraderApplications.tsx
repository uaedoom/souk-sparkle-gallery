
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type ApplicationStatus = 'pending' | 'approved' | 'rejected';

interface TraderApplication {
  id: string;
  business_name: string;
  business_description: string;
  contact_email: string;
  contact_phone: string;
  physical_location: string;
  product_category: string;
  specialty: string;
  website: string | null;
  years_experience: number;
  status: ApplicationStatus;
  created_at: string;
  user_id: string;
}

export default function AdminTraderApplications() {
  const [applications, setApplications] = useState<TraderApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        navigate("/auth");
        toast({
          title: "Authentication required",
          description: "You must be logged in to access this page",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('trader_applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching applications",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: ApplicationStatus) => {
    try {
      setProcessingId(id);
      
      const { error: updateError } = await supabase
        .from('trader_applications')
        .update({ status })
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      if (status === 'approved') {
        // Get the application data to create a trader
        const { data: applicationData } = await supabase
          .from('trader_applications')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (applicationData) {
          // Create a trader record
          const { error: traderError } = await supabase
            .from('traders')
            .insert({
              name: applicationData.business_name,
              description: applicationData.business_description,
              contact_email: applicationData.contact_email,
              contact_phone: applicationData.contact_phone,
              physical_location: applicationData.physical_location,
              specialty: applicationData.specialty,
              website: applicationData.website,
              user_id: applicationData.user_id
            });
          
          if (traderError) throw traderError;
        }
      }
      
      // Update the local state
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status } : app
      ));
      
      toast({
        title: `Application ${status}`,
        description: `The application has been ${status} successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating application",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Trader Applications</h1>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-10 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No trader applications found</p>
          </div>
        ) : (
          <div className="bg-card rounded-md shadow">
            <Table>
              <TableCaption>List of all trader applications</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.business_name}</TableCell>
                    <TableCell>{application.specialty}</TableCell>
                    <TableCell>{application.product_category}</TableCell>
                    <TableCell>{application.contact_email}</TableCell>
                    <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      {application.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            className="bg-green-100 hover:bg-green-200 text-green-800"
                            onClick={() => updateApplicationStatus(application.id, 'approved')}
                            disabled={processingId === application.id}
                          >
                            {processingId === application.id ? 
                              <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 
                              <CheckCircle className="h-4 w-4 mr-1" />} 
                            Approve
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="bg-red-100 hover:bg-red-200 text-red-800"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            disabled={processingId === application.id}
                          >
                            {processingId === application.id ? 
                              <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 
                              <XCircle className="h-4 w-4 mr-1" />} 
                            Reject
                          </Button>
                        </div>
                      )}
                      {application.status !== 'pending' && (
                        <span className="text-muted-foreground italic">Processed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Layout>
  );
}
