export const HeroImage: React.FC = () => {
  return (
    <div
      style={{
        aspectRatio: '16 / 9',
        width: '100%',
      }}
    >
      <img
        alt="Cyber TOON"
        src="/assets/hero.webp"
        style={{
          aspectRatio: '16 / 9',
          display: 'inline-block',
          width: '100%',
        }}
      />
    </div>
  );
};
