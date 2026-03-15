import Image from "next/image";
import {
  IoCloudyOutline,
  IoGridOutline,
  IoLeafOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";
import AboutBannerSection from "./aboutBannerSection/AboutBannerSection";
import AboutAboutSection from "./aboutAboutSection/AboutAboutSection";
import AboutFeaturesSection from "./aboutFeaturesSection/AboutFeaturesSection";
import AboutTeamSection from "./aboutTeamSection/AboutTeamSection";

export default function About() {
  return (
    <>
      <AboutBannerSection />
      <AboutAboutSection />
      <AboutFeaturesSection />
      <AboutTeamSection />
    </>
  );
}
