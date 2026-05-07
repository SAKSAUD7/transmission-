import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/images/hero.png";
import { products } from "@/lib/products";
import { useCreateContact } from "@workspace/api-client-react";

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    partNeeded: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedContact, setSubmittedContact] = useState("");

  const mutation = useCreateContact({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        setSubmittedContact(form.phone || form.email);
      },
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      data: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        message: form.partNeeded
          ? `Part needed: ${form.partNeeded}\n\n${form.message}`
          : form.message || undefined,
      },
    });
  }

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Hero */}
        <section className="relative h-[380px] w-full overflow-hidden flex items-center bg-gray-900">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Contact Us" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          </div>
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#0099cc] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-lg z-10">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-lg sm:text-xl">1385 688 3299</span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                Contact Us
              </h1>
              <p className="text-xl text-gray-200 font-medium">
                Get the lowest prices on used auto parts — we're here to help!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-[#EBF7FF]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Phone, title: "Call Us", lines: ["1385 688 3299", "Speak directly with a specialist"] },
                { icon: Mail, title: "Email Us", lines: ["info@autopartsforsale.com", "We reply within 24 hours"] },
                { icon: MapPin, title: "Nationwide Service", lines: ["Available in all 50 states", "Fast shipping anywhere"] },
                { icon: Clock, title: "Business Hours", lines: ["Mon–Fri: 8am–6pm", "Sat: 9am–4pm"] },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center border border-gray-100">
                  <div className="w-12 h-12 bg-[#0099cc]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0099cc]">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                  {card.lines.map((line, j) => (
                    <p
                      key={j}
                      className={j === 0 ? "text-[#0099cc] font-semibold text-sm" : "text-gray-500 text-xs mt-1"}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form + Direct Call */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Main Contact Form */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 border-l-4 border-[#0099cc] pl-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and one of our parts specialists will contact you shortly.
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you! One of our specialists will contact you shortly at{" "}
                      <strong>{submittedContact}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="cf-firstName">First Name *</Label>
                        <Input
                          id="cf-firstName"
                          required
                          value={form.firstName}
                          onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                          className="bg-gray-50 border-gray-200 h-11"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cf-lastName">Last Name *</Label>
                        <Input
                          id="cf-lastName"
                          required
                          value={form.lastName}
                          onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                          className="bg-gray-50 border-gray-200 h-11"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="cf-phone">Phone Number *</Label>
                        <Input
                          id="cf-phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="bg-gray-50 border-gray-200 h-11"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cf-email">Email Address *</Label>
                        <Input
                          id="cf-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="bg-gray-50 border-gray-200 h-11"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Part You're Looking For</Label>
                      <Select onValueChange={val => setForm(f => ({ ...f, partNeeded: val }))}>
                        <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Select a part category" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map(p => (
                            <SelectItem key={p.id} value={p.name}>
                              {p.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other / Not Listed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-message">Message</Label>
                      <Textarea
                        id="cf-message"
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="bg-gray-50 border-gray-200 resize-none"
                        placeholder="Tell us your vehicle make, model, year and the part you need..."
                      />
                    </div>
                    {mutation.isError && (
                      <p className="text-red-600 text-sm">
                        Something went wrong. Please call us directly at 1385 688 3299.
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full h-12 text-base font-bold bg-[#0099cc] hover:bg-[#007da6] text-white shadow-md"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Sidebar CTA */}
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-2xl p-8 text-center text-white">
                  <Phone className="h-12 w-12 text-[#0099cc] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Call Us Directly</h3>
                  <p className="text-gray-400 text-sm mb-5">
                    Skip the form and speak with a parts specialist right now.
                  </p>
                  <a
                    href="tel:13856883299"
                    className="inline-flex items-center justify-center gap-2 bg-[#0099cc] text-white px-6 py-3 rounded-full text-xl font-black hover:bg-[#007da6] transition-colors w-full"
                  >
                    1385 688 3299
                  </a>
                </div>

                <div className="bg-[#EBF7FF] rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Why Call Us?</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {[
                      "Instant price quotes",
                      "Check part availability in real-time",
                      "Expert advice from automotive specialists",
                      "Arrange same-day shipping",
                      "30-day warranty on every part",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#0099cc] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday – Friday</span>
                      <span className="font-semibold text-gray-900">8:00am – 6:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold text-gray-900">9:00am – 4:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold text-gray-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
