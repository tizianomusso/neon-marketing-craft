import logoImage from '@/assets/logo.png';

const Logo = () => {
  return (
    <img 
      src={logoImage} 
      alt="Innova Solutions Logo" 
      className="h-10 object-contain"
    />
  );
};

export default Logo;