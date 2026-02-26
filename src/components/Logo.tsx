import logoImage from '@/assets/logo-white.png';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="Innova Solutions Logo" 
        className="w-10 h-10 object-contain"
      />
    </div>
  );
};

export default Logo;