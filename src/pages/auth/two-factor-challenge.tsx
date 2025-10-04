import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextLink } from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Key } from 'lucide-react';

interface TwoFactorFormData {
    code: string;
    recovery_code: string;
}

interface FormErrors {
    code?: string;
    recovery_code?: string;
}

export default function TwoFactorChallenge() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TwoFactorFormData>({
        code: '',
        recovery_code: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [useRecoveryCode, setUseRecoveryCode] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (useRecoveryCode) {
            if (!formData.recovery_code) {
                newErrors.recovery_code = 'Recovery code is required';
            }
        } else {
            if (!formData.code) {
                newErrors.code = 'Authentication code is required';
            } else if (formData.code.length !== 6) {
                newErrors.code = 'Authentication code must be 6 digits';
            }
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
            
            // On successful verification, redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Two-factor authentication failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof TwoFactorFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const toggleRecoveryMode = () => {
        setUseRecoveryCode(!useRecoveryCode);
        setFormData({ code: '', recovery_code: '' });
        setErrors({});
    };

    return (
        <AuthLayout
            title="Two-Factor Authentication"
            description={
                useRecoveryCode 
                    ? "Enter one of your recovery codes to continue"
                    : "Enter the authentication code from your authenticator app"
            }
        >
            <div className="space-y-4">
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                        {useRecoveryCode ? (
                            <Key className="h-6 w-6 text-primary" />
                        ) : (
                            <Shield className="h-6 w-6 text-primary" />
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {useRecoveryCode ? (
                        <div className="space-y-2">
                            <Label htmlFor="recovery_code">Recovery Code</Label>
                            <Input
                                id="recovery_code"
                                type="text"
                                placeholder="Enter recovery code"
                                value={formData.recovery_code}
                                onChange={handleInputChange('recovery_code')}
                                className={errors.recovery_code ? 'border-destructive' : ''}
                                disabled={isLoading}
                                autoComplete="one-time-code"
                            />
                            {errors.recovery_code && (
                                <p className="text-sm text-destructive">{errors.recovery_code}</p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="code">Authentication Code</Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="000000"
                                value={formData.code}
                                onChange={handleInputChange('code')}
                                className={errors.code ? 'border-destructive' : ''}
                                disabled={isLoading}
                                maxLength={6}
                                autoComplete="one-time-code"
                            />
                            {errors.code && (
                                <p className="text-sm text-destructive">{errors.code}</p>
                            )}
                        </div>
                    )}

                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </Button>
                </form>

                <div className="text-center">
                    <Button
                        variant="link"
                        onClick={toggleRecoveryMode}
                        className="text-sm"
                    >
                        {useRecoveryCode 
                            ? "Use authenticator app instead"
                            : "Use a recovery code instead"
                        }
                    </Button>
                </div>

                {!useRecoveryCode && (
                    <Alert>
                        <AlertDescription className="text-sm">
                            Open your two-factor authenticator app and enter the six-digit code.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="text-center text-sm">
                    <TextLink to="/auth/login">
                        Back to sign in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}