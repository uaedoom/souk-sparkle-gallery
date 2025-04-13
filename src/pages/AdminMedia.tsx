
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Download, Trash2, FolderOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploaded_at: string;
}

export default function AdminMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'hero-banner.jpg',
      url: '/placeholder.svg',
      type: 'image',
      size: '2.4 MB',
      uploaded_at: '2023-08-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'product-showcase.jpg',
      url: '/placeholder.svg',
      type: 'image',
      size: '1.8 MB',
      uploaded_at: '2023-09-22T14:45:00Z'
    },
    {
      id: '3',
      name: 'catalog.pdf',
      url: '#',
      type: 'document',
      size: '4.2 MB',
      uploaded_at: '2023-07-10T09:15:00Z'
    },
    {
      id: '4',
      name: 'crafting-process.mp4',
      url: '#',
      type: 'video',
      size: '28.5 MB',
      uploaded_at: '2023-10-05T11:20:00Z'
    },
    {
      id: '5',
      name: 'logo.png',
      url: '/placeholder.svg',
      type: 'image',
      size: '0.5 MB',
      uploaded_at: '2023-06-18T16:30:00Z'
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Upload feature",
      description: "This would open a file upload dialog in a real application.",
    });
  };
  
  const handleDelete = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
    toast({
      title: "Media deleted",
      description: "The selected media file has been removed.",
    });
  };

  const filteredItems = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getFilteredItemsByType = (type: 'image' | 'video' | 'document') => {
    return filteredItems.filter(item => item.type === type);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Images & Media</h1>
        
        <Button className="bg-gold hover:bg-gold-light text-stone-dark" onClick={handleUpload}>
          <Plus className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search media files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-10 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No media files found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <MediaCard key={item.id} item={item} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="images" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getFilteredItemsByType('image').map((item) => (
              <MediaCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getFilteredItemsByType('video').map((item) => (
              <MediaCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getFilteredItemsByType('document').map((item) => (
              <MediaCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MediaCardProps {
  item: MediaItem;
  onDelete: (id: string) => void;
}

function MediaCard({ item, onDelete }: MediaCardProps) {
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "Download initiated",
      description: `Downloading ${item.name}`,
    });
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-muted flex items-center justify-center">
        {item.type === 'image' ? (
          <img 
            src={item.url} 
            alt={item.name} 
            className="object-cover w-full h-full"
          />
        ) : item.type === 'video' ? (
          <div className="flex flex-col items-center justify-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
            <span className="mt-2 text-xs text-muted-foreground">Video File</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
            <span className="mt-2 text-xs text-muted-foreground">Document</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="truncate pr-2">
            <h3 className="font-medium truncate">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.size}</p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
