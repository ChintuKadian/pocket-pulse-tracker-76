import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Bell, Lock, Database, Palette } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://mail.google.com/", "_blank")}
            >
              Configure
            </Button>
          </div>
        </Card>

        {/* <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Change Password</Label>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            <div className="flex items-center justify-between">
              <Label>Two-Factor Auth</Label>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card> */}

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Export or backup your data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Export Data</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        const res = await fetch("http://100.27.190.37:5000/export-data");
                        const data = await res.json();
                        alert(data.message || "Export complete!");
                      } catch (err) {
                        alert("❌ Failed to export data");
                        console.error(err);
                      }
                    }}
                  >
                    Export
                  </Button>
              </div>
            <div className="flex items-center justify-between">
              <Label>Backup Settings</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://s3.console.aws.amazon.com/s3/home", "_blank")}
              >
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10 text-warning">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the app appearance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Theme</Label>
              <Button variant="outline" size="sm">Light</Button>
            </div>
            {/* <div className="flex items-center justify-between">
              <Label>Currency</Label>
              <Button variant="outline" size="sm">USD</Button>
            </div> */}
          </CardContent>
        </Card>
      </div>

      {/* <Card className="shadow-md">
        <CardHeader>
          <CardTitle>AWS Lambda Configuration</CardTitle>
          <CardDescription>Configure your AWS API endpoints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>API Base URL</Label>
            <Input placeholder="https://your-api-gateway-url.amazonaws.com" />
          </div>
          <div className="space-y-2">
            <Label>API Key (Optional)</Label>
            <Input type="password" placeholder="Your API key" />
          </div>
          <Button>Save Configuration</Button>
          <p className="text-sm text-muted-foreground">
            Configure your AWS Lambda endpoints for production use.
          </p>
        </CardContent>
      </Card> */}
    </div>
  );
}
