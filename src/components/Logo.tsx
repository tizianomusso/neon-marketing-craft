import logoImage from '@/assets/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage} 
        alt="Innova Solutions Logo" 
        className="w-10 h-10 object-contain"
      />
      <span className="font-heading font-bold text-xl text-foreground">
        Innova<span className="gradient-text">Solutions</span>
      </span>
    </div>
  );
};

export default Logo;