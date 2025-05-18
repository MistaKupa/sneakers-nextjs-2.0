import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoCogOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { TfiPackage } from "react-icons/tfi";
import UserDetails from "../../_account/accountSideBar/userDetails/UserDetails";

export default function AvatarMenuMobile({}) {
  return (
    <div className="h-full w-full flex flex-col items-center  bg-dark-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col items-start gap-10 p-10"
      >
        <Link href="">
          <UserDetails />
        </Link>

        <div className="flex flex-col gap-7 text-dark-400 ">
          <motion.div
            whileTap={{ scale: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: 3 }}
            className="min-w-44"
          >
            <Link
              className="flex gap-4 hover:text-newPrimary transition-all duration-200"
              href=""
            >
              <IoPersonOutline size={20} />
              <span>Account</span>
            </Link>
          </motion.div>

          <motion.div
            whileTap={{ scale: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: 3 }}
            className="min-w-44"
          >
            <Link
              className="flex gap-4 hover:text-newPrimary transition-all duration-200"
              href="/main/account/accountSettings"
            >
              <IoCogOutline size={20} />
              <span>Account settings</span>
            </Link>
          </motion.div>

          <motion.div
            whileTap={{ scale: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: 3 }}
            className="min-w-44"
          >
            <Link
              className="flex gap-4 hover:text-newPrimary transition-all duration-200"
              href="/main/account/myOrders"
            >
              <TfiPackage size={20} />
              <span>My orders</span>
            </Link>
          </motion.div>

          <motion.div
            whileTap={{ scale: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: 3 }}
            className="min-w-44"
          >
            <Link
              className="flex gap-4 hover:text-newPrimary transition-all duration-200"
              href="/logout"
            >
              <IoLogOutOutline size={20} />
              <span>Logout</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
