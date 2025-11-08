import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { uploadReceipt } from '@/lib/mockApi';
import { useToast } from '@/hooks/use-toast';

interface ReceiptUploadProps {
  onUploadSuccess: () => void;
}

export const ReceiptUpload = ({ onUploadSuccess }: ReceiptUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      // Use a default userId - in production this would come from auth
      const userId = 'user123';
      await uploadReceipt(
        file,
        userId,
        amount ? parseFloat(amount) : undefined,
        category || undefined
      );
      
      toast({
        title: 'Success',
        description: 'Receipt uploaded successfully',
      });
      
      setFile(null);
      setAmount('');
      setCategory('');
      setOpen(false);
      onUploadSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload receipt',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Receipt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
          <DialogDescription>
            Upload a receipt image or PDF file with optional transaction details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Receipt File *</Label>
            <Input
              id="file"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              required
            />
            {file && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {file.name}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="amount">Amount (optional)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category (optional)</Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Groceries, Transportation"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? 'Uploading...' : 'Upload Receipt'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
