// Paws & Claws Veterinary Clinic - Main Application Component
import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ChevronDown,
  Heart,
  Stethoscope,
  Home,
  Shield,
  Calendar,
  User,
  PawPrint,
  Menu,
  X,
  Check,
  ArrowRight,
  Star,
} from 'lucide-react';

// Content interface
interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    status: string;
    cta: string;
  };
  announcement: {
    text: string;
    active: boolean;
  };
  services: {
    consultation: {
      title: string;
      description: string;
      price: string;
      features: string[];
    };
    boarding: {
      title: string;
      description: string;
      price: string;
      features: string[];
    };
    vaccination: {
      title: string;
      description: string;
      price: string;
      features: string[];
    };
  };
  boarding: {
    slots: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    hours: {
      weekdays: string;
      saturday: string;
      sunday: string;
      emergency: string;
    };
  };
  gallery: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
}

function useContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/content/homepage.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load content');
        return res.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Content load error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { content, loading, error };
}

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Facility' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-slate-800 leading-tight">
                Paws & Claws
              </span>
              <span className="text-xs text-slate-500 leading-tight hidden sm:block">
                Veterinary Clinic & Boarding
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-slate-600 font-medium hover:text-teal-600 transition-colors"
              >
                {label}
              </a>
            ))}
            <a href="#contact" className="btn-primary">
              <Calendar className="w-4 h-4" />
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl animate-fade-in">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-700 font-medium py-2 hover:text-teal-600"
                >
                  {label}
                </a>
              ))}
              <a href="#contact" className="btn-primary text-center">
                <Calendar className="w-4 h-4" />
                Book Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Announcement Banner
function AnnouncementBanner({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-50"></div>
      <p className="relative font-medium text-sm md:text-base flex items-center justify-center gap-2">
        <Star className="w-4 h-4 flex-shrink-0" />
        <span>{text}</span>
      </p>
    </div>
  );
}

// Hero Section
function HeroSection({
  content,
}: {
  content: SiteContent;
}) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-slate-100/50 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-slow"></span>
              {content.hero.status}
            </div>

            <h1 className="section-heading mb-6 text-balance">
              {content.hero.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 text-balance">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-primary text-lg px-8 py-4">
                <Calendar className="w-5 h-5" />
                {content.hero.cta}
              </a>
              <a
                href="#services"
                className="btn-secondary text-lg px-8 py-4"
              >
                Our Services
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-teal-600" />
                </div>
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-teal-600" />
                </div>
                <span>100% Sterile Facility</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-teal-600" />
                </div>
                <span>5000+ Happy Pets</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in hidden lg:block">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10">
              <img
                src="https://images.pexels.com/photos/6234935/pexels-photo-6234935.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern veterinary clinic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Expert Vets
                  </p>
                  <p className="text-sm text-slate-500">
                    24/7 Emergency Care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex">
        <div className="w-8 h-12 rounded-full border-2 border-slate-300 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

// Service Card
function ServiceCard({
  icon: Icon,
  title,
  description,
  price,
  features,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  price: string;
  features: string[];
  index: number;
}) {
  return (
    <div
      className="card group hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6 md:p-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
          {title}
        </h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>

        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-teal-600 font-bold text-xl">{price}</span>
            <a
              href="#contact"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Services Section
function ServicesSection({
  content,
}: {
  content: SiteContent;
}) {
  const services = [
    {
      icon: Stethoscope,
      ...content.services.consultation,
    },
    {
      icon: Home,
      ...content.services.boarding,
    },
    {
      icon: Shield,
      ...content.services.vaccination,
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="section-heading mb-4">
            Comprehensive Pet Care Services
          </h2>
          <p className="section-subheading">
            From routine checkups to complex surgeries, we provide expert care
            with compassion at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        {/* Boarding Availability */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white shadow-lg border border-teal-200">
            <span className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></span>
            <p className="text-slate-700 font-medium">
              {content.boarding.slots}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection({
  images,
}: {
  images: SiteContent['gallery'];
}) {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
            Our Facility
          </span>
          <h2 className="section-heading mb-4">
            State-of-the-Art Veterinary Facility
          </h2>
          <p className="section-subheading">
            Tour our modern, sterile, and pet-friendly clinic designed for
            comfort and exceptional care.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square md:aspect-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-white font-medium text-sm md:text-base">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Form
function ContactForm() {
  const [formData, setFormData] = useState({
    ownerName: '',
    petType: '',
    service: '',
    preferredDate: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-teal-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600">
          We've received your inquiry and will contact you shortly to confirm
          your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Your Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            required
            value={formData.ownerName}
            onChange={(e) =>
              setFormData({ ...formData, ownerName: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Pet Type
        </label>
        <div className="relative">
          <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select
            required
            value={formData.petType}
            onChange={(e) =>
              setFormData({ ...formData, petType: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all appearance-none"
          >
            <option value="">Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Service Required
        </label>
        <div className="relative">
          <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select
            required
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all appearance-none"
          >
            <option value="">Select service</option>
            <option value="consultation">General Consultation</option>
            <option value="surgery">Surgery</option>
            <option value="vaccination">Vaccination</option>
            <option value="boarding">Boarding</option>
            <option value="daycare">Daycare</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Preferred Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) =>
              setFormData({ ...formData, preferredDate: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all resize-none"
          placeholder="Tell us about your pet's condition or special requirements..."
        />
      </div>

      <button type="submit" className="btn-primary w-full py-4 text-lg">
        <Calendar className="w-5 h-5" />
        Submit Inquiry
      </button>
    </form>
  );
}

// Contact Section
function ContactSection({
  content,
}: {
  content: SiteContent;
}) {
  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="section-heading mb-4">
            Book an Appointment
          </h2>
          <p className="section-subheading">
            Reach out to schedule a visit or inquire about our services. We're
            here to help you and your pet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Get in Touch
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Phone</p>
                    <a
                      href={`tel:${content.contact.phone}`}
                      className="text-lg font-semibold text-slate-800 hover:text-teal-600 transition-colors"
                    >
                      {content.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Email</p>
                    <a
                      href={`mailto:${content.contact.email}`}
                      className="text-lg font-semibold text-slate-800 hover:text-teal-600 transition-colors"
                    >
                      {content.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Address</p>
                    <p className="text-slate-800 font-medium">
                      {content.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Business Hours
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Monday - Friday</span>
                  <span className="font-semibold text-slate-800">
                    {content.contact.hours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Saturday</span>
                  <span className="font-semibold text-slate-800">
                    {content.contact.hours.saturday}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-semibold text-slate-800">
                    {content.contact.hours.sunday}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-3 text-teal-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  {content.contact.hours.emergency}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card aspect-video bg-slate-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">
                    Interactive Map
                  </p>
                  <p className="text-sm text-slate-400">
                    123 Jalan Pet Care, KL
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Request an Appointment
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-teal-400" />
              </div>
              <span className="font-display font-bold text-lg">
                Paws & Claws
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              Premium veterinary care and luxury pet boarding services with
              compassion and expertise.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Facility
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li>{content.contact.phone}</li>
              <li>{content.contact.email}</li>
              <li>{content.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Paws & Claws Veterinary Clinic &
            Boarding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// WhatsApp Button
function WhatsAppButton({ phone }: { phone: string }) {
  return (
    <a
      href={`https://wa.me/${phone.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}

// Main App
export default function App() {
  const { content, loading, error } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-teal-500 border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-slate-800 font-medium mb-2">Unable to load content</p>
          <p className="text-slate-500 text-sm">{error || 'Please refresh the page'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {content.announcement.active && (
        <AnnouncementBanner text={content.announcement.text} />
      )}
      <main>
        <HeroSection content={content} />
        <ServicesSection content={content} />
        <GallerySection images={content.gallery} />
        <ContactSection content={content} />
      </main>
      <Footer content={content} />
      <WhatsAppButton phone={content.contact.whatsapp} />
    </div>
  );
}
