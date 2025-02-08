import { basePath } from "@/next.config";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SidebarWidget = ({ imgPath, pageType }: { imgPath: string; pageType: string }) => {
  const socialLinks = [
    { href: "https://instagram.com/dialogika.co", icon: faInstagram, width: 20 },
    { href: "https://twitter.com/dialogika_co", icon: faTwitter, width: 20 },
    { href: "https://facebook.com/dialogika.co", icon: faFacebookF, width: 12 },
    { href: "https://youtube.com/@dialogika_co", icon: faYoutube, width: 20 },
  ];

  return (
    <div className="widget sidebar-widget-profile ">
      <div className="tgAbout-me swiper-slider">
        <div className="tgAbout-thumb">
          <img
            src={`${basePath}/assets/img/${imgPath}`}
            className="img-thumbnail"
            alt="Dialogika"
          />
        </div>
        <div className="tgAbout-info">
          <p className="intro">
            {pageType == "index" ? "Welcome to " : "Penulis "}
            <b>{pageType == "index" ? "Dialogika Blog" : `Author Name`}</b>
          </p>

          <span className="designation">
            {pageType == "index" ? "Unleash Your Potential" : "Content Writer - Dialogika"}
          </span>
        </div>
        <div className="tgAbout-social">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}>
              <FontAwesomeIcon
                icon={item.icon}
                style={{ width: item.width }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarWidget;
