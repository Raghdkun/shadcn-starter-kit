import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextLink } from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

interface ConfirmPasswordFormData {
    password: string;
}

interface FormErrors {
    password?: string;
}

export default function ConfirmPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState<ConfirmPasswordFormData>({
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    // Get the intended destination from location state
    const intendedUrl = location.state?.from || '/dashboard';

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // On successful password confirmation, redirect to intended destination
            navigate(intendedUrl);
        } catch (error) {
            console.error('Password confirmation failed:', error);
            setErrors({ password: 'The provided password is incorrect.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ password: value });
        
        // Clear error when user starts typing
        if (errors.password) {
            setErrors({});
        }
    };

    return (
        <AuthLayout
            title="Confirm your password"
            description="Please confirm your password before continuing"
        >
            <div className="space-y-4">
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                </div>

                <Alert>
                    <AlertDescription className="text-sm">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </AlertDescription>
                </Alert>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? 'border-destructive' : ''}
                            disabled={isLoading}
                            autoFocus
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password}</p>
                        )}
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Confirming...' : 'Confirm Password'}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <TextLink to="/auth/forgot-password">
                        Forgot your password?
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}