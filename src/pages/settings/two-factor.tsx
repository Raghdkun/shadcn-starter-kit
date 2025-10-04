import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Shield, Smartphone } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Settings', href: '/settings' },
    { title: 'Two-Factor Authentication', href: '/settings/two-factor'},
];

export default function TwoFactorSettings() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Two-Factor Authentication
                            </CardTitle>
                            <CardDescription>
                                Secure your account with two-factor authentication using an authenticator app.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="two-factor-toggle">Enable Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Require a verification code from your authenticator app when signing in.
                                    </p>
                                </div>
                                <Switch
                                    id="two-factor-toggle"
                                    checked={twoFactorEnabled}
                                    onCheckedChange={setTwoFactorEnabled}
                                />
                            </div>

                            {twoFactorEnabled && (
                                <div className="space-y-4 border-t pt-4">
                                    <div className="space-y-2">
                                        <Label>Setup Instructions</Label>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <p>1. Download an authenticator app like Google Authenticator or Authy</p>
                                            <p>2. Scan the QR code below with your authenticator app</p>
                                            <p>3. Enter the verification code to complete setup</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center p-4 border rounded-lg bg-muted">
                                        <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                            <Smartphone className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="verification-code">Verification Code</Label>
                                        <Input
                                            id="verification-code"
                                            placeholder="Enter 6-digit code"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            {twoFactorEnabled ? (
                                <Button>Verify and Enable</Button>
                            ) : (
                                <Button variant="outline" disabled>
                                    Enable Two-Factor Authentication
                                </Button>
                            )}
                        </CardFooter>
                    </Card>

                    {twoFactorEnabled && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Recovery Codes</CardTitle>
                                <CardDescription>
                                    Save these recovery codes in a safe place. You can use them to access your account if you lose your authenticator device.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                                    <div className="p-2 bg-muted rounded">1234-5678</div>
                                    <div className="p-2 bg-muted rounded">9876-5432</div>
                                    <div className="p-2 bg-muted rounded">1111-2222</div>
                                    <div className="p-2 bg-muted rounded">3333-4444</div>
                                    <div className="p-2 bg-muted rounded">5555-6666</div>
                                    <div className="p-2 bg-muted rounded">7777-8888</div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Download Recovery Codes</Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}