import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextLink } from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ResetPasswordFormData {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    password_confirmation?: string;
    token?: string;
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        email: searchParams.get('email') || '',
        password: '',
        password_confirmation: '',
        token: searchParams.get('token') || '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [tokenError, setTokenError] = useState(false);

    useEffect(() => {
        // Check if token is present
        if (!formData.token) {
            setTokenError(true);
        }
    }, [formData.token]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Password confirmation is required';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (!formData.token) {
            newErrors.token = 'Reset token is required';
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
            
            // On successful password reset, redirect to login
            navigate('/auth/login', { 
                state: { message: 'Password reset successfully. Please sign in with your new password.' }
            });
        } catch (error) {
            console.error('Password reset failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof ResetPasswordFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    if (tokenError) {
        return (
            <AuthLayout
                title="Invalid Reset Link"
                description="The password reset link is invalid or has expired"
            >
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        This password reset link is invalid or has expired. 
                        Please request a new password reset link.
                    </AlertDescription>
                </Alert>

                <div className="text-center text-sm">
                    <TextLink to="/auth/forgot-password">
                        Request new reset link
                    </TextLink>
                </div>

                <div className="text-center text-sm">
                    Remember your password?{' '}
                    <TextLink to="/auth/login">
                        Back to sign in
                    </TextLink>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Reset your password"
            description="Enter your new password below"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        className={errors.password ? 'border-destructive' : ''}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Confirm New Password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={formData.password_confirmation}
                        onChange={handleInputChange('password_confirmation')}
                        className={errors.password_confirmation ? 'border-destructive' : ''}
                        disabled={isLoading}
                    />
                    {errors.password_confirmation && (
                        <p className="text-sm text-destructive">{errors.password_confirmation}</p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Resetting password...' : 'Reset Password'}
                </Button>
            </form>

            <div className="text-center text-sm">
                Remember your password?{' '}
                <TextLink to="/auth/login">
                    Back to sign in
                </TextLink>
            </div>
        </AuthLayout>
    );
}