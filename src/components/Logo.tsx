import logoImage from '@/assets/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage} 
        alt="Innova Solutions Logo" 
        className="w-10 h-10 object-contain"
      />
      <span className="font-heading font-bold text-xl">
        <span className="text-white">Innova</span><span className="text-cyan-400">Solutions</span>
      </span>
    </div>
  );
};

export default Logo;