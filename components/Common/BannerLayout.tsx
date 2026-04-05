interface BannerLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const BannerLayout = ({ children, backgroundImage }: BannerLayoutProps) => {
  return (
    <div
      className="relative backdrop-blur-sm w-full h-52 sm:h-80 bg-fixed z-10"
      style={{
        background: `url(${backgroundImage || "/images/background.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full bg-linear-to-t from-MidNightBlack">
        <div className="bg-Black/5 backdrop-blur-sm w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default BannerLayout;
