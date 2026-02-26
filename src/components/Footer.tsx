import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const footerLinks = {
  servicios: [
    { name: 'Sistema de Adquisición', href: '#servicios' },
    { name: 'Assets de Conversión', href: '#servicios' },
    { name: 'Operaciones Inteligentes', href: '#servicios' },
    { name: 'Data & Analytics', href: '#servicios' },
  ],
  empresa: [
    { name: 'Proceso', href: '#proceso' },
    { name: 'Casos de éxito', href: '#portfolio' },
    { name: 'Contacto', href: '#contacto' },
  ],
  legal: [
    { name: 'Privacidad', href: '#' },
    { name: 'Términos', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm max-w-sm">
              Growth partners para negocios ambiciosos.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a href="mailto:hola@innovasolutions.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                hola@innovasolutions.com
              </a>
              <a href="tel:+5491130701907" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +54 911 30701907
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Buenos Aires, Argentina
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 InnovaSolutions. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Growth partners para negocios ambiciosos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
