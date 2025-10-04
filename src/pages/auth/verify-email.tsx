import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { TextLink } from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail } from 'lucide-react';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isResent, setIsResent] = useState(false);

    const handleResendVerification = async () => {
        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsResent(true);
            
            // Reset the resent state after 5 seconds
            setTimeout(() => setIsResent(false), 5000);
        } catch (error) {
            console.error('Failed to resend verification email:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        // Simulate logout
        navigate('/auth/login');
    };

    return (
        <AuthLayout
            title="Verify your email address"
            description="We've sent a verification link to your email address"
        >
            <div className="space-y-4">
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                        Before proceeding, please check your email for a verification link.
                        If you didn't receive the email, we can send you another one.
                    </p>
                </div>

                {isResent && (
                    <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                            A new verification link has been sent to your email address.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-3">
                    <Button 
                        onClick={handleResendVerification}
                        className="w-full" 
                        disabled={isLoading}
                        variant="outline"
                    >
                        {isLoading ? 'Sending...' : 'Resend Verification Email'}
                    </Button>

                    <Button 
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full"
                    >
                        Use a different email address
                    </Button>
                </div>

                <div className="text-center text-sm">
                    Already verified?{' '}
                    <TextLink to="/auth/login">
                        Sign in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}