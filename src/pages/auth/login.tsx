import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TextLink } from '@/components/text-link';

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

interface FormErrors {
    email?: string;
    password?: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

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
            
            // On successful login, redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof LoginFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = field === 'remember' ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <AuthLayout
            title="Sign in to your account"
            description="Enter your email below to sign in to your account"
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
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <TextLink 
                            to="/auth/forgot-password" 
                            variant="muted"
                            className="text-sm"
                        >
                            Forgot your password?
                        </TextLink>
                    </div>
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

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={formData.remember}
                        onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, remember: !!checked }))
                        }
                        disabled={isLoading}
                    />
                    <Label 
                        htmlFor="remember" 
                        className="text-sm font-normal cursor-pointer"
                    >
                        Remember me
                    </Label>
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <div className="text-center text-sm">
                Don't have an account?{' '}
                <TextLink to="/auth/register">
                    Sign up
                </TextLink>
            </div>
        </AuthLayout>
    );
}