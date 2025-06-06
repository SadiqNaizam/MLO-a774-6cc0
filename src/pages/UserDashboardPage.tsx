import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
// Assuming a Sidebar component for dashboard navigation items
// For now, we use shadcn Tabs as main navigation within the content area
// If a dedicated Sidebar for dashboard nav is available, it would be imported here.

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Shadcn Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Briefcase, User, CreditCard, Settings, Edit3, PlusCircle } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be 10 digits").optional(),
  address: z.string().optional(),
});
type ProfileFormData = z.infer<typeof profileSchema>;

// Sample data
const sampleBookings = [
  { id: 'BK001', date: '2024-08-10', type: 'Flight', details: 'DEL to BOM, IndiGo 6E 204', status: 'Confirmed', amount: '₹7,500' },
  { id: 'BK002', date: '2024-07-20', type: 'Hotel', details: 'The Taj Palace, Mumbai - 2 Nights', status: 'Completed', amount: '₹25,000' },
  { id: 'BK003', date: '2024-09-05', type: 'Flight', details: 'MAA to BLR, Air India AI 501', status: 'Cancelled', amount: '₹4,200' },
];

const samplePaymentMethods = [
    { id: 'pm001', type: 'Credit Card', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 'pm002', type: 'UPI', details: 'user@bank', isDefault: false }
];


const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');
  const navigate = useNavigate();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Rohan Sharma", // Placeholder, fetch from user data
      email: "rohan.sharma@example.com",
      phone: "9876543210",
      address: "123 MG Road, Bangalore, India"
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile updated:', data);
    // API call to update profile
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-600">Manage your bookings, profile, and preferences.</p>
        </header>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-sky-100 p-1 rounded-lg">
            <TabsTrigger value="bookings" className="py-2.5 data-[state=active]:bg-sky-600 data-[state=active]:text-white flex items-center justify-center gap-2"><Briefcase className="h-5 w-5" />My Bookings</TabsTrigger>
            <TabsTrigger value="profile" className="py-2.5 data-[state=active]:bg-sky-600 data-[state=active]:text-white flex items-center justify-center gap-2"><User className="h-5 w-5" />Profile</TabsTrigger>
            <TabsTrigger value="payments" className="py-2.5 data-[state=active]:bg-sky-600 data-[state=active]:text-white flex items-center justify-center gap-2"><CreditCard className="h-5 w-5" />Payment Methods</TabsTrigger>
            <TabsTrigger value="settings" className="py-2.5 data-[state=active]:bg-sky-600 data-[state=active]:text-white flex items-center justify-center gap-2"><Settings className="h-5 w-5" />Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your past and upcoming trips.</CardDescription>
              </CardHeader>
              <CardContent>
                {sampleBookings.length > 0 ? (
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sampleBookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>{booking.type}</TableCell>
                            <TableCell>{booking.details}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                    'bg-red-100 text-red-700'
                                }`}>{booking.status}</span>
                            </TableCell>
                            <TableCell>{booking.amount}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                ) : (
                    <p className="text-gray-500">You have no bookings yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl><Input placeholder="Your address" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your saved payment options.</CardDescription>
                    </div>
                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {samplePaymentMethods.map(method => (
                        <Card key={method.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{method.type} {method.type === 'Credit Card' ? `ending in ${method.last4}` : `- ${method.details}`}</p>
                                {method.type === 'Credit Card' && <p className="text-sm text-gray-500">Expires {method.expiry}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                {method.isDefault && <Badge variant="secondary">Default</Badge>}
                                <Button variant="ghost" size="icon"><Edit3 className="h-4 w-4 text-gray-600" /></Button>
                            </div>
                        </Card>
                    ))}
                    {samplePaymentMethods.length === 0 && <p className="text-gray-500">No payment methods saved.</p>}
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your travel and notification preferences (UI Placeholder).</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Preferences settings coming soon...</p>
                {/* Example: Communication preferences, preferred airport, meal preferences etc. */}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;