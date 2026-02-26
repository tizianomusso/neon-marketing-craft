import logoImage from '@/assets/logo-white.png';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="Innova Solutions Logo" 
        className="h-10 w-auto object-contain" style={{ minWidth: '160px' }}
      />
    </div>
  );
};

export default Logo;