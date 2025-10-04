import { AppearanceDropdown } from '@/components/appearance-dropdown';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Appearance' },
];

export default function AppearanceSettings() {
    const [theme, setTheme] = useState('system');
    const [reducedMotion, setReducedMotion] = useState(false);
    const [compactMode, setCompactMode] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Appearance</h3>
                        <p className="text-sm text-muted-foreground">
                            Customize the appearance of the app. Automatically switch between day and night themes.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Theme</CardTitle>
                            <CardDescription>
                                Select the theme for the dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-8">
                                <div>
                                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                    <Label
                                        htmlFor="light"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                    >
                                        <Sun className="mb-3 h-6 w-6" />
                                        Light
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                    <Label
                                        htmlFor="dark"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                    >
                                        <Moon className="mb-3 h-6 w-6" />
                                        Dark
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                    <Label
                                        htmlFor="system"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                    >
                                        <Monitor className="mb-3 h-6 w-6" />
                                        System
                                    </Label>
                                </div>
                            </RadioGroup>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Theme Selector</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Quick theme switcher in the navigation
                                    </p>
                                </div>
                                <AppearanceDropdown />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Accessibility</CardTitle>
                            <CardDescription>
                                Configure accessibility and motion preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="reduced-motion">Reduce Motion</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Minimize animations and transitions for better accessibility.
                                    </p>
                                </div>
                                <Switch
                                    id="reduced-motion"
                                    checked={reducedMotion}
                                    onCheckedChange={setReducedMotion}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="compact-mode">Compact Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Reduce spacing and padding for a more compact interface.
                                    </p>
                                </div>
                                <Switch
                                    id="compact-mode"
                                    checked={compactMode}
                                    onCheckedChange={setCompactMode}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button>Save Preferences</Button>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}