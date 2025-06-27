import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Mail, User, CreditCard, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileInfoProps {
    user: {
        name: string;
        email: string;
        nim_nip?: string;
        email_verified_at?: string | null;
    };
    className?: string;
}

export function ProfileInfo({ user, className }: ProfileInfoProps) {
    const getInitials = useInitials();
    const initials = getInitials(user.name);
    const nimNip = (user as any).nim_nip;

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 pb-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-800 shadow-lg">
                        <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {user.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge 
                                variant={user.email_verified_at ? "default" : "secondary"}
                                className={cn(
                                    "text-xs",
                                    user.email_verified_at 
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                )}
                            >
                                {user.email_verified_at ? (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                )}
                                {user.email_verified_at ? "Verified" : "Unverified"}
                            </Badge>
                            {nimNip && (
                                <Badge variant="outline" className="text-xs">
                                    <CreditCard className="w-3 h-3 mr-1" />
                                    {nimNip}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20">
                            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Address</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20">
                            <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Full Name</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.name}</p>
                        </div>
                    </div>
                    
                    {nimNip && (
                        <>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20">
                                    <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">NIM/NIP</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{nimNip}</p>
                                </div>
                            </div>
                        </>
                    )}
                    
                    <Separator />
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20">
                            <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Member Since</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user.email_verified_at 
                                    ? new Date(user.email_verified_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'Recently joined'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 