import Link from "next/link"

const Copyright = () => {

  return (
      <div className="pt-8 text-center">
          <p className="text-[#F3ECDC]">
              Site by{' '}
              <Link
                  href="https://mokamaleldin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 font-semibold"
              >
                  MOHAMED KAMALELDIN
              </Link>
          </p>
      </div>
  )
}
export default Copyright