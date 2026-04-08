import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight">AEROKODEX</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Leading the way in aerospace-grade material science and technical training. 
            Providing high-performance solutions for global engineering challenges.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            {['twitter', 'linkedin', 'facebook'].map((sh) => (
              <div key={sh} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="sr-only">{sh}</span>
                <div className="w-4 h-4 rounded-sm bg-white/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-400">Company</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/projects" className="hover:text-white transition-colors">Recent Projects</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-400">Capabilities</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/products" className="hover:text-white transition-colors">Composite Materials</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">CNC Fabrication</Link></li>
            <li><Link href="/workshops" className="hover:text-white transition-colors">Technical Training</Link></li>
            <li><Link href="/quote" className="hover:text-white transition-colors">Custom Quotes</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-blue-400">Headquarters</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li>Kanpur, Uttar Pradesh, India</li>
            <li>research@aerokodex.com</li>
            <li>+91 (0) 512 000 000</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2026 AeroKodex Systems. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
