"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState([])

  useEffect(() => {
    (async () => {
      setProviders(await getProviders())
    })();
  }, [])

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const dropdownAvatar = () => {
    return (
      <>
        <div className="flex">
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="Dropdown Menu"
            onClick={() => {
              setToggleDropdown((prev) => !prev)
            }
            }
          >
          </Image>
        </div>
        {toggleDropdown && (
          <div className="dropdown">
            <Link
              href="/profile"
              className="dropdown_link"
              onClick={() => { setToggleDropdown(false) }}
            >
              My Profile
            </Link>
            <Link
              href="/"
              className="black_btn"
              onClick={() => { setToggleDropdown(false); signOut(); }}
            >
              Sign Out
            </Link>
          </div>
        )}
      </>
    )
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={45}
          height={45}
          className="object-contain"
        />
        <p className="logo_text">
          UniCon
        </p>
      </Link>
      <div className="flex gap-2 sm:gap-6">
        {session?.user &&
          <>
            <Link className="black_btn" href="/group">
              Groups
            </Link>
            <Link className="orange_btn" href="/meet">
              Meets
            </Link>
          </>
        }
        <div className="flex relative">
          {
            session?.user
              ? dropdownAvatar()
              : providers && Object.values(providers).map(provider => {
                return (
                  <button className="black_btn flex gap-2"
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    <Image
                      src={`/assets/${provider.id}_logo.svg`}
                      alt={"logo of " + provider.name}
                      width={20}
                      height={20}
                    >
                    </Image>
                    <p>Sign In</p>
                  </button>
                )
              })
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav