import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-surface-alt text-foreground pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight">AEROKODEX</span>
          </Link>
          <p className="text-secondary text-sm leading-relaxed">
            Leading the way in aerospace-grade material science and technical training.
            Providing high-performance solutions for global engineering challenges.
          </p>
          <div className="flex space-x-4">
            {['twitter', 'linkedin', 'facebook'].map((sh) => (
              <div key={sh} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <span className="sr-only">{sh}</span>
                <div className="w-4 h-4 rounded-sm bg-secondary/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-accent">Company</h4>
          <ul className="space-y-4 text-sm text-secondary">
            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-foreground transition-colors">Recent Projects</Link></li>
            <li><Link href="/workshops" className="hover:text-foreground transition-colors">Workshops</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-accent">Capabilities</h4>
          <ul className="space-y-4 text-sm text-secondary">
            <li><Link href="/products" className="hover:text-foreground transition-colors">Composite Materials</Link></li>
            <li><Link href="/products" className="hover:text-foreground transition-colors">CNC Fabrication</Link></li>
            <li><Link href="/workshops" className="hover:text-foreground transition-colors">Technical Training</Link></li>
            <li><Link href="/quote" className="hover:text-foreground transition-colors">Custom Quotes</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-accent">Headquarters</h4>
          <ul className="space-y-4 text-sm text-secondary">
            <li>Kushinagar, Uttar Pradesh, India</li>
            <li>research@aerokodex.com</li>
            <li>+91 (0) 512 000 000</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-secondary">
        <p>© 2026 AeroKodex Systems. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
