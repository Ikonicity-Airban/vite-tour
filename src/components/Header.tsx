import NavbarComponent from "./Navbar";

const topBarLinks = [
  {
    id: 1,
    icon: "fab fa-facebook-f",
    link: "https://m.facebook.com",
  },
  {
    id: 2,
    icon: "fab fa-linkedin-in",
    link: "https://linkedin.com/in/ikonicityairban",
  },
  {
    id: 3,
    icon: "fab fa-instagram",
    link: "https://instagram.com",
  },
  {
    id: 4,
    icon: "fab fa-twitter",
    link: "https://twitter.com",
  },
  {
    id: 5,
    icon: "fab fa-youtube",
    link: "https://youtube.com",
  },
];

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Tour sites",
    link: "/tours",
  },
  {
    title: "Packages and Services",
    link: "/services",
  },
  {
    title: "About Us",
    link: "/about",
  },
];

function Header() {
  return (
    <header className="flex flex-col top-0 w-full text-base z-50 dark:text-white">
      <div className="hidden md:flex w-full p-4 z-20">
        <div className="flex w-full md:container max-w-screen-desktop mx-auto justify-between p-4 pb-10">
          <div className="text-center text-lg-left mb-2 mb-lg-0">
            <div className="inline-flex items-center">
              <p>
                <i className="fa fa-envelope mr-2"></i>info@estb.com
              </p>
              <p className="text-body px-3">|</p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+234 0816 986 2852
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="flex align-items-center gap-2">
              {topBarLinks.map(({ link, icon, id }) => (
                <a
                  href={link}
                  target="_blank"
                  key={id}
                  className="p-2 icon-button hover:text-white dark:hover:text-slate-800 hover:bg-primary transition-all rounded"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NavbarComponent links={navLinks} />
    </header>
  );
}

export default Header;
