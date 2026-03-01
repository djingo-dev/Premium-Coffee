import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, Menu, X, MapPin, Instagram, Facebook, Twitter, ArrowRight, Star, Coffee, Leaf } from 'lucide-react';
import { cn } from './utils';

// --- Types ---
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Emerald Frappuccino",
    description: "Our signature blend with premium matcha and white chocolate.",
    price: "$6.50",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    rating: 4.9
  },
  {
    id: 2,
    name: "Gold Leaf Latte",
    description: "Rich espresso topped with velvety milk and edible gold flakes.",
    price: "$7.20",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    rating: 4.8
  },
  {
    id: 3,
    name: "Midnight Mocha",
    description: "Dark chocolate infused with our deepest roast beans.",
    price: "$5.90",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    rating: 4.7
  },
  {
    id: 4,
    name: "Velvet Vanilla",
    description: "Smooth vanilla bean syrup with a hint of caramel.",
    price: "$6.10",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600",
    rating: 4.9
  }
];

const BRANCHES = [
  { name: "Downtown Sanctuary", address: "123 Emerald Ave, NY", lat: 40.7128, lng: -74.0060 },
  { name: "The Garden Hub", address: "45 Forest Blvd, LA", lat: 34.0522, lng: -118.2437 },
  { name: "Harbor View", address: "88 Coastal Rd, SF", lat: 37.7749, lng: -122.4194 }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass-dark py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-emerald-starbucks rounded-full flex items-center justify-center">
            <Coffee className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">EMERALD <span className="text-emerald-starbucks">BREW</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {['Menu', 'Branches', 'About', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-semibold hover:text-emerald-starbucks transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-starbucks hover:bg-emerald-starbucks/80 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all"
          >
            <ShoppingBag size={18} />
            Order Now
          </motion.button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden absolute top-full left-0 w-full glass-dark border-t border-white/10 p-6 flex flex-col gap-4"
        >
          {['Menu', 'Branches', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-deep/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-starbucks/20 rounded-full blur-[120px]" />
      </div>

      {/* Floating Coffee Beans */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{ 
            y: i % 2 === 0 ? y1 : y2, 
            rotate: i * 45,
            left: `${(i * 12.5) + (Math.random() * 5)}%`,
            top: `${Math.random() * 80}%`,
          }}
          className="absolute z-10 opacity-40 pointer-events-none"
        >
          <div className="w-4 h-6 bg-[#3d2b1f] rounded-full shadow-2xl" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-emerald-starbucks font-bold tracking-widest text-sm mb-4 uppercase"
          >
            Experience the Extraordinary
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-6">
            Where Every <br />
            <span className="text-emerald-starbucks italic">Cup</span> Tells a Story.
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
            Indulge in the perfect blend of premium beans and artisanal craftsmanship. 
            Our emerald-inspired sanctuary awaits your arrival.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-starbucks hover:bg-emerald-starbucks/80 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all group">
              Explore Menu
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full font-bold transition-all">
              Find a Branch
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-emerald-starbucks/20 rounded-full blur-[80px] scale-75" />
          <motion.div 
            style={{ rotate }}
            className="relative z-10 animate-float"
          >
            <img 
              src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800" 
              alt="Floating Frappuccino" 
              className="w-full max-w-md h-auto rounded-3xl shadow-[0_20px_50px_rgba(0,112,74,0.3)] border border-white/10"
              referrerPolicy="no-referrer"
            />
            {/* Floating Badges */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-8 top-1/4 glass p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center">
                <Star className="text-white w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Rating</p>
                <p className="text-lg font-bold">4.9/5.0</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductSlider = () => {
  return (
    <section id="menu" className="py-24 bg-black/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-emerald-starbucks font-bold tracking-widest text-sm mb-4 uppercase">Our Signature Selection</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold">Popular Products</h3>
          </div>
          <p className="text-gray-400 max-w-md">
            Handcrafted beverages designed to elevate your coffee experience to new heights of luxury.
          </p>
        </div>
      </div>

      <div className="relative px-6">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -800 }}
          className="flex gap-8 cursor-grab active:cursor-grabbing"
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] group relative glass p-6 rounded-[2rem] transition-all duration-500 hover:bg-white/[0.08]"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={14} className="text-gold-accent fill-current" />
                  <span className="text-xs font-bold">{product.rating}</span>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">{product.name}</h4>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-starbucks">{product.price}</span>
                <button className="w-12 h-12 bg-white/10 hover:bg-emerald-starbucks text-white rounded-full flex items-center justify-center transition-colors group-hover:rotate-12">
                  <ShoppingBag size={20} />
                </button>
              </div>
            </motion.div>
          ))}
          {/* Duplicate for infinite feel or just extra space */}
          <div className="min-w-[100px] h-full" />
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 flex items-center gap-4">
        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-starbucks w-1/3"
            animate={{ x: ["0%", "200%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Swipe to explore</span>
      </div>
    </section>
  );
};

const Branches = () => {
  return (
    <section id="branches" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-emerald-starbucks font-bold tracking-widest text-sm mb-4 uppercase">Visit Our Sanctuaries</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8">Our Branches</h3>
            <div className="space-y-8">
              {BRANCHES.map((branch, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-emerald-starbucks transition-colors">
                    <MapPin className="text-emerald-starbucks group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{branch.name}</h4>
                    <p className="text-gray-400">{branch.address}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="mt-12 text-emerald-starbucks font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Locations <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-starbucks/10 rounded-[3rem] blur-3xl scale-90" />
            <div className="relative glass p-4 rounded-[3rem] overflow-hidden aspect-square md:aspect-auto md:h-[500px]">
              {/* Minimalist Map Placeholder */}
              <div className="w-full h-full bg-[#121212] rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                {BRANCHES.map((branch, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${30 + i * 20}%`
                    }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-emerald-starbucks rounded-full animate-ping absolute inset-0" />
                      <div className="w-4 h-4 bg-emerald-starbucks rounded-full relative z-10 border-2 border-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-starbucks/10 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-emerald-starbucks font-bold tracking-widest text-sm mb-4 uppercase">Get in Touch</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">Let's Brew Something <br /> <span className="text-emerald-starbucks italic">Special</span> Together.</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Have questions about our blends or want to host an event? Our team is here to help you experience the best of Emerald Brew.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-emerald-starbucks">
                <Coffee size={18} />
              </div>
              <span>hello@emeraldbrew.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-emerald-starbucks">
                <MapPin size={18} />
              </div>
              <span>Emerald Plaza, Level 42, NY</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass p-8 md:p-12 rounded-[3rem]"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">First Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-emerald-starbucks transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Last Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-emerald-starbucks transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-emerald-starbucks transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-emerald-starbucks transition-colors resize-none"></textarea>
            </div>
            <button className="w-full bg-emerald-starbucks hover:bg-emerald-starbucks/80 text-white py-4 rounded-full font-bold transition-all shadow-lg shadow-emerald-starbucks/20">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-emerald-starbucks rounded-full flex items-center justify-center">
                <Coffee className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">EMERALD <span className="text-emerald-starbucks">BREW</span></span>
            </div>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              Crafting moments of emerald luxury, one cup at a time. Join our community of coffee enthusiasts and experience the extraordinary.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-emerald-starbucks hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-8">Quick Links</h5>
            <ul className="space-y-4 text-gray-400">
              {['Our Menu', 'Locations', 'About Us', 'Careers', 'Sustainability'].map(item => (
                <li key={item}><a href="#" className="hover:text-emerald-starbucks transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-8">Newsletter</h5>
            <p className="text-gray-400 mb-6 text-sm">Subscribe to receive updates on new blends and exclusive offers.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:border-emerald-starbucks transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-emerald-starbucks text-white px-6 rounded-full font-bold text-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© 2024 Emerald Brew Coffee Co. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-coffee-dark selection:bg-emerald-starbucks selection:text-white">
      {/* Floating Coffee Beans Global */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-100px", "100px"],
              opacity: [0, 0.2, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
          >
            <div className="w-3 h-5 bg-[#3d2b1f] rounded-full blur-[1px]" />
          </motion.div>
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-150px", "150px"],
              opacity: [0, 0.15, 0],
              rotate: [0, -360]
            }}
            transition={{ 
              duration: 15 + Math.random() * 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
          >
            <Leaf className="text-emerald-starbucks/30 w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <Navbar />
      <main>
        <Hero />
        <ProductSlider />
        
        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: "Ethically Sourced", desc: "We partner directly with farmers to ensure the highest quality and fair trade." },
              { icon: Coffee, title: "Artisanal Roast", desc: "Small-batch roasting techniques to unlock the unique profile of every bean." },
              { icon: Star, title: "Premium Quality", desc: "Only the top 1% of Arabica beans make it into our signature emerald blends." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 glass rounded-[2.5rem]"
              >
                <div className="w-16 h-16 bg-emerald-starbucks/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-emerald-starbucks w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Branches />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
