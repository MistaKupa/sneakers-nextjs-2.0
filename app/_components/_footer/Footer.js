import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="relative w-full bg-dark-500 py-16 z-10">
      <div className="max-w-[1440px] grid grid-cols-3 text-dark-100 mx-auto p-5">
        <div className="flex flex-col gap-5">
          <h5 className="uppercase font-bold">Site</h5>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/main/site/collections">Collections</Link>
            </li>
            <li>
              <Link href="/main/site/men">Men</Link>
            </li>
            <li>
              <Link href="/main/site/women">Women</Link>
            </li>
            <li>
              <Link href="/main/site/about">About</Link>
            </li>
            <li>
              <Link href="/main/site/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="uppercase font-bold">Socials</h5>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/">
                <IoLogoInstagram size={25} />
              </Link>
            </li>
            <li>
              <Link href="/">
                <IoLogoGithub size={25} />
              </Link>
            </li>
            <li>
              <Link href="/">
                <IoLogoLinkedin size={25} />
              </Link>
            </li>
            <li>
              <Link href="/">
                <IoLogoTwitter size={25} />
              </Link>
            </li>
            <li>
              <Link href="/">
                <IoLogoFacebook size={25} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p>© 2025 Kubis Jakub</p>
          <p>Built with Next.js, Supabase & Vercel.</p>
          <p>
            Inspired by Frontend Mentor E-commerce product page challenge + Wix.
          </p>
          <p>
            Sneaker product images © Adidas & © Nike (for educational use only)
          </p>
        </div>
      </div>
    </footer>
  );
}
