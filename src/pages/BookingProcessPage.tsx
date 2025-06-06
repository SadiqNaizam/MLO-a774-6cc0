import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import MultiStepBookingProgressIndicator from '@/components/MultiStepBookingProgressIndicator';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertTriangle, BaggageClaim, CreditCard, UserPlus, CheckCircle, IndianRupee } from 'lucide-react';
import { Toaster, toast } from 'sonner'; // For toast notifications


const passengerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
});

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number (must be 16 digits)"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3}$/, "Invalid CVV (must be 3 digits)"),
  cardHolderName: z.string().min(2, "Cardholder name is required"),
});

const bookingFormSchema = z.object({
  passengers: z.array(passengerSchema).min(1, "At least one passenger is required"),
  payment: paymentSchema,
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to terms and conditions"),
  // Add-ons could be here too
  extraBaggage: z.string().optional(),
  travelInsurance: z.boolean().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

const bookingSteps = [
  { id: 'passenger', name: 'Passenger Details', icon: UserPlus },
  { id: 'addons', name: 'Add-ons', icon: BaggageClaim },
  { id: 'payment', name: 'Payment', icon: CreditCard },
  { id: 'confirmation', name: 'Confirmation', icon: CheckCircle },
];

const BookingProcessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itemDetails = location.state?.itemDetails; // Flight/Hotel details passed from ItemDetailPage

  console.log('BookingProcessPage loaded. Item details:', itemDetails);

  const [currentStepId, setCurrentStepId] = useState(bookingSteps[0].id);
  const { control, handleSubmit, register, formState: { errors, isValid }, getValues, trigger } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: {
      passengers: [{ title: '', firstName: '', lastName: '', email: '', phone: '' }],
      agreeToTerms: false,
      extraBaggage: '0kg',
      travelInsurance: false,
    },
  });
  
  const currentStepIndex = bookingSteps.findIndex(s => s.id === currentStepId);

  const handleNextStep = async () => {
    let stepIsValid = false;
    if (currentStepId === 'passenger') {
      stepIsValid = await trigger("passengers");
    } else if (currentStepId === 'addons') {
      stepIsValid = true; // Add-ons are optional, or add validation if needed
    } else if (currentStepId === 'payment') {
      stepIsValid = await trigger("payment");
      if (stepIsValid) stepIsValid = await trigger("agreeToTerms");
    }
    
    if (stepIsValid && currentStepIndex < bookingSteps.length - 1) {
      setCurrentStepId(bookingSteps[currentStepIndex + 1].id);
    } else if (currentStepId === 'confirmation') {
        // This case should not be reached by "Next" button, but handle it
        console.log("Already on confirmation.");
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepId(bookingSteps[currentStepIndex - 1].id);
    }
  };

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking submitted:', data);
    toast.success('Booking Confirmed!', {
        description: `Your flight for ${itemDetails?.origin?.city} to ${itemDetails?.destination?.city} is confirmed. Booking ID: TEMP12345`,
        duration: 5000,
    });
    setCurrentStepId('confirmation'); // Move to confirmation view
    // In a real app, API call to backend for booking
  };
  
  if (!itemDetails) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavigationMenu />
            <div className="container mx-auto px-4 py-12 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h1 className="text-2xl font-semibold">Booking Error</h1>
                <p className="text-gray-600 mt-2">No item details found to proceed with booking. Please select an item first.</p>
                <Button onClick={() => navigate('/search-results')} className="mt-6">Back to Search</Button>
            </div>
            <Footer />
        </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <Toaster richColors position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardHeader className="bg-gray-50 p-6">
            <CardTitle className="text-2xl md:text-3xl text-sky-700">Complete Your Booking</CardTitle>
            <CardDescription>Follow the steps below to finalize your reservation for {itemDetails.airline} {itemDetails.flightNumber}.</CardDescription>
            <div className="mt-6">
              <MultiStepBookingProgressIndicator steps={bookingSteps} currentStepId={currentStepId} />
            </div>
          </CardHeader>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="p-6 md:p-8">
              {currentStepId === 'passenger' && (
                <section>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Passenger Information</h3>
                  {/* For simplicity, handling one passenger. Extend for multiple. */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label htmlFor="passengers.0.title">Title</Label>
                            <Controller
                                name="passengers.0.title"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select title" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mr">Mr.</SelectItem>
                                            <SelectItem value="Ms">Ms.</SelectItem>
                                            <SelectItem value="Mrs">Mrs.</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.passengers?.[0]?.title && <p className="text-red-500 text-xs mt-1">{errors.passengers[0].title.message}</p>}
                        </div>
                        <Input type="hidden" {...register(`passengers.0.title`)} /> {/* Controller handles select better */}
                        <div className="md:col-span-1">
                            <Label htmlFor="passengers.0.firstName">First Name</Label>
                            <Input id="passengers.0.firstName" {...register('passengers.0.firstName')} placeholder="e.g., Rohan" />
                            {errors.passengers?.[0]?.firstName && <p className="text-red-500 text-xs mt-1">{errors.passengers[0].firstName.message}</p>}
                        </div>
                        <div className="md:col-span-1">
                            <Label htmlFor="passengers.0.lastName">Last Name</Label>
                            <Input id="passengers.0.lastName" {...register('passengers.0.lastName')} placeholder="e.g., Sharma" />
                            {errors.passengers?.[0]?.lastName && <p className="text-red-500 text-xs mt-1">{errors.passengers[0].lastName.message}</p>}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="passengers.0.email">Email Address</Label>
                            <Input id="passengers.0.email" type="email" {...register('passengers.0.email')} placeholder="e.g., rohan.sharma@example.com" />
                            {errors.passengers?.[0]?.email && <p className="text-red-500 text-xs mt-1">{errors.passengers[0].email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="passengers.0.phone">Phone Number</Label>
                            <Input id="passengers.0.phone" type="tel" {...register('passengers.0.phone')} placeholder="e.g., 9876543210" />
                            {errors.passengers?.[0]?.phone && <p className="text-red-500 text-xs mt-1">{errors.passengers[0].phone.message}</p>}
                        </div>
                    </div>
                  </div>
                </section>
              )}

              {currentStepId === 'addons' && (
                <section>
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Optional Add-ons</h3>
                  <div className="space-y-6">
                    <div>
                        <Label htmlFor="extraBaggage" className="text-base font-medium">Extra Baggage</Label>
                        <Controller
                            name="extraBaggage"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-2">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="0kg" id="bag0" /><Label htmlFor="bag0">No extra baggage</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="5kg" id="bag5" /><Label htmlFor="bag5">5 kg (+ <IndianRupee className="inline h-4 w-4"/>1500)</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="10kg" id="bag10" /><Label htmlFor="bag10">10 kg (+ <IndianRupee className="inline h-4 w-4"/>2500)</Label></div>
                                </RadioGroup>
                            )}
                        />
                    </div>
                     <div className="flex items-center space-x-2">
                        <Controller
                            name="travelInsurance"
                            control={control}
                            render={({ field }) => (
                                <Checkbox id="travelInsurance" checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                        <Label htmlFor="travelInsurance" className="text-base font-medium">Travel Insurance (+ <IndianRupee className="inline h-4 w-4"/>499 per passenger)</Label>
                    </div>
                  </div>
                </section>
              )}

              {currentStepId === 'payment' && (
                <section>
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Payment Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="md:col-span-2">
                            <Label htmlFor="payment.cardHolderName">Cardholder Name</Label>
                            <Input id="payment.cardHolderName" {...register('payment.cardHolderName')} placeholder="Name as on card" />
                            {errors.payment?.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.payment.cardHolderName.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="payment.cardNumber">Card Number</Label>
                            <Input id="payment.cardNumber" {...register('payment.cardNumber')} placeholder="0000 0000 0000 0000" />
                            {errors.payment?.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.payment.cardNumber.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="payment.expiryDate">Expiry Date</Label>
                            <Input id="payment.expiryDate" {...register('payment.expiryDate')} placeholder="MM/YY" />
                            {errors.payment?.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.payment.expiryDate.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="payment.cvv">CVV</Label>
                            <Input id="payment.cvv" {...register('payment.cvv')} placeholder="123" />
                            {errors.payment?.cvv && <p className="text-red-500 text-xs mt-1">{errors.payment.cvv.message}</p>}
                        </div>
                    </div>
                    <div className="mt-6 flex items-center space-x-2">
                        <Controller
                            name="agreeToTerms"
                            control={control}
                            render={({ field }) => (
                                <Checkbox id="agreeToTerms" checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm">
                            I agree to the <a href="/terms" target="_blank" className="text-sky-600 hover:underline">terms and conditions</a> and <a href="/privacy" target="_blank" className="text-sky-600 hover:underline">privacy policy</a>.
                        </Label>
                    </div>
                     {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms.message}</p>}
                </section>
              )}

              {currentStepId === 'confirmation' && (
                <section className="text-center py-10">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-2">Thank you for booking with TravelCo.</p>
                    <p className="text-gray-600 mb-6">Your booking ID is <span className="font-semibold text-sky-700">TEMP12345</span>. A confirmation email has been sent to you.</p>
                    <p className="text-lg font-medium">Flight: {itemDetails.airline} {itemDetails.flightNumber}</p>
                    <p className="text-md">From: {itemDetails.origin.city} To: {itemDetails.destination.city}</p>
                    <div className="mt-8 space-x-4">
                        <Button variant="outline" onClick={() => navigate('/dashboard')}>View in Dashboard</Button>
                        <Button onClick={() => navigate('/')}>Back to Home</Button>
                    </div>
                </section>
              )}
            </CardContent>

            {currentStepId !== 'confirmation' && (
                <CardFooter className="p-6 md:p-8 border-t flex justify-between">
                <Button type="button" variant="outline" onClick={handlePreviousStep} disabled={currentStepIndex === 0}>
                    Previous
                </Button>
                {currentStepId === 'payment' ? (
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!isValid}>
                    Confirm & Pay
                    </Button>
                ) : (
                    <Button type="button" onClick={handleNextStep}>
                    Next Step
                    </Button>
                )}
                </CardFooter>
            )}
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default BookingProcessPage;