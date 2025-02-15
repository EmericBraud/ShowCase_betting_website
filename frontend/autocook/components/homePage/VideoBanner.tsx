export const VideoBanner = () => {
  return (
    <div className="w-full h-auto overflow-hidden cursor-pointer">
      <video className="w-full h-auto" autoPlay muted playsInline>
        <source src="/banner.webm" type="video/webm" />
        <source src="/banner.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
    </div>
  );
};
