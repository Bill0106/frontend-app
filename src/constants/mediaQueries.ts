const screenDesktop = 1200;
const screenLaptop = 992;
const screenTablet = 768;

const MEDIA_QUERIES = {
  DESKTOP: `${screenDesktop}px`,
  LAPTOP_MAX: `${screenDesktop - 1}px`,
  LAPTOP: `${screenLaptop}px`,
  TABLET_MAX: `${screenLaptop - 1}px`,
  TABLET: `${screenTablet}px`,
  MOBILE: `${screenTablet - 1}px`,
};

export default MEDIA_QUERIES;
