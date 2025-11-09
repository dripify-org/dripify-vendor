'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Store, User, Building2, CreditCard, Package, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Profile', icon: User, description: 'Personal information' },
  { id: 2, name: 'Store', icon: Store, description: 'Store details' },
  { id: 3, name: 'Documents', icon: Building2, description: 'KYC verification' },
  { id: 4, name: 'Banking', icon: CreditCard, description: 'Payment setup' },
  { id: 5, name: 'Products', icon: Package, description: 'Initial inventory' }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const router = useRouter();

  const progress = (completedSteps.length / steps.length) * 100;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+91 98765 43210" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" placeholder="My Awesome Store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Input id="storeDescription" placeholder="Brief description of your store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Store Address</Label>
              <Input id="address" placeholder="123 Main Street, City, State" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Mumbai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" placeholder="400001" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Card</Label>
              <Input id="pan" type="file" accept=".jpg,.jpeg,.png,.pdf" />
              <p className="text-xs text-gray-500">Upload clear image of PAN card</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst">GST Certificate</Label>
              <Input id="gst" type="file" accept=".jpg,.jpeg,.png,.pdf" />
              <p className="text-xs text-gray-500">GST registration certificate</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">Shop License</Label>
              <Input id="license" type="file" accept=".jpg,.jpeg,.png,.pdf" />
              <p className="text-xs text-gray-500">Valid shop/trade license</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="State Bank of India" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" placeholder="123456789012" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input id="ifsc" placeholder="SBIN0001234" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountHolder">Account Holder Name</Label>
              <Input id="accountHolder" placeholder="John Doe" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Setup Complete!</h3>
            <p className="text-gray-600">
              Your vendor account is ready. You can start adding products and managing your store.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to VendorHub</h1>
          <p className="text-gray-600">Let's set up your vendor account in a few simple steps</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-900">Progress</span>
            <span className="text-sm text-gray-600">{completedSteps.length}/{steps.length} completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        isCompleted
                          ? 'bg-green-100 border-green-500 text-green-600'
                          : isCurrent
                          ? 'bg-blue-100 border-blue-500 text-blue-600'
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                          {step.name}
                        </h3>
                        {isCurrent && <Badge variant="secondary" className="text-xs">Current</Badge>}
                      </div>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Step {currentStep}: {steps[currentStep - 1]?.name}</CardTitle>
                <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
                
                <div className="flex justify-between pt-6 border-t mt-6">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip for now
                  </Button>
                  <Button onClick={handleNext}>
                    {currentStep === steps.length ? 'Get Started' : 'Next Step'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}