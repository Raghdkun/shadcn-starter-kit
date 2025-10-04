import { useState } from 'react';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextLink } from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface ForgotPasswordFormData {
    email: string;
}

interface FormErrors {
    email?: string;
}

export default function ForgotPassword() {
    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
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
            
            setIsSuccess(true);
        } catch (error) {
            console.error('Password reset request failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ email: value });
        
        // Clear error when user starts typing
        if (errors.email) {
            setErrors({});
        }
    };

    if (isSuccess) {
        return (
            <AuthLayout
                title="Check your email"
                description="We've sent a password reset link to your email address"
            >
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                        If an account with that email exists, we've sent you a password reset link.
                        Please check your email and follow the instructions to reset your password.
                    </AlertDescription>
                </Alert>

                <div className="text-center text-sm">
                    Didn't receive the email?{' '}
                    <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => setIsSuccess(false)}
                    >
                        Try again
                    </Button>
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
            title="Forgot your password?"
            description="Enter your email address and we'll send you a link to reset your password"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
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