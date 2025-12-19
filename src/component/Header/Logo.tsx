import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
      <Link href={"/"} className="flex items-center space-x-3">
          <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
          />
          <span className="text-[#F3ECDC] text-xl font-bold tracking-wider">
              unihome
          </span>
      </Link>
  )
}
export default Logo