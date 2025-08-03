"use client"
import {
  Bell,
  MessageSquare,
  Search,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./Languages"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { Button } from "@/components/ui/button"

export default function Header() {
  const t = useTranslations();
  const [showNotification, setShowNotification] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notificationRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  useEffect(() => {
    setMounted(true)

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (notificationRef.current && !notificationRef.current.contains(target))
        setShowNotification(false)
      if (messageRef.current && !messageRef.current.contains(target))
        setShowMessages(false)
      if (profileRef.current && !profileRef.current.contains(target))
        setShowProfile(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Xác định theme hiện tại
  const currentTheme = theme === "system" ? systemTheme : theme

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  // Hiển thị skeleton với theme neutral trong khi chờ theme load
  if (!mounted) {
    return (
      <header className="w-full bg-white dark:bg-black shadow-md px-6 py-3 flex items-center justify-between z-50 relative border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 w-1/2">
          <div className="w-[50px] h-[60px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          <div className="relative flex-1">
            <div className="w-full h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full"></div>
        </div>
      </header>
    )
  }

  return (
    <header className={`w-full shadow-md px-6 py-3 flex items-center justify-between z-50 relative border-b transition-colors duration-300`}>

      {/* Logo + search */}
      <div className="flex items-center gap-4 w-1/2">
        <Link href="/" className="text-xl font-bold hover:text-blue-500 transition-colors">
          <Image
            src="/assets/images/logo/LogoTron.png"
            alt="Logo"
            width={50}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Thanh tìm kiếm */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={t('Header.Search')}
            className={`w-full border ${currentTheme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-300 text-black placeholder-gray-400'
              } rounded-full py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md`}
          />
          <Search className={`absolute top-2.5 left-3 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            } pointer-events-none`} size={20} />
        </div>
      </div>

      {/* Icon actions */}
      <div className="flex items-center gap-4">
        {/* Translate */}
        <LanguageSwitcher />

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotification(!showNotification)}
            className={`p-2 hover:text-blue-500 rounded-lg relative transition-all duration-200 ${currentTheme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            title={`${t('Header.Notification.Notification')}`}
          >
            <Bell size={22} />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span>
          </button>
          {showNotification && (
            <div className={`absolute right-0 mt-2 w-72 ${currentTheme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-black'
              } border shadow-xl rounded-lg p-4 z-50 animate-in slide-in-from-top-2 duration-200`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm"> {t('Header.Notification.Notification')}</h3>
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">{t('Header.Notification.See_all')}</span>
              </div>
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                } text-center py-4`}>Chưa có thông báo nào.</p>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative" ref={messageRef}>
          <button
            onClick={() => setShowMessages(!showMessages)}
            className={`p-2 hover:text-blue-500 rounded-lg relative transition-all duration-200 ${currentTheme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            title={`${t('Header.Message.Message')}`}
          >
            <MessageSquare size={22} />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              5
            </span>
          </button>
          {showMessages && (
            <div className={`absolute right-0 mt-2 w-72 ${currentTheme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-black'
              } border shadow-xl rounded-lg p-4 z-50 animate-in slide-in-from-top-2 duration-200`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{t('Header.Message.Message')}</h3>
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">{t('Header.Message.See_all')}</span>
              </div>
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                } text-center py-4`}>Chưa có tin nhắn mới.</p>
            </div>
          )}
        </div>

        {/* Theme switch */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 hover:text-yellow-600 hover:bg-gray-100'`}
          title={`${currentTheme === "dark" ? t('Header.Mode.Light_Mode') : t('Header.Mode.Dark_Mode')}`}
        >
          {currentTheme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          {accessToken ? (
            <p className="text-red-500 text-sm">Đã đăng nhập</p>
          ) : (
            <div className="flex gap-1">
              <Button className="hover:bg-black">Đăng nhập</Button>
              <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                Đăng ký
              </Button>
            </div>


          )}

          {showProfile && (
            <div className={`absolute right-0 mt-2 w-52 ${currentTheme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-black'
              } border shadow-xl rounded-lg p-2 z-50 animate-in slide-in-from-top-2 duration-200`}>
              <div className={`px-3 py-2 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                } mb-1`}>
                <p className="font-medium text-sm">{t('Header.Profile.Account')}</p>
                <p className={`text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>user@example.com</p>
              </div>

              <Link
                href="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm ${currentTheme === 'dark'
                  ? 'hover:bg-gray-800'
                  : 'hover:bg-gray-100'
                  }`}
                onClick={() => setShowProfile(false)}
              >
                <User size={16} /> {t('Header.Profile.Profile_Page')}
              </Link>

              <button
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-colors duration-200 text-sm ${currentTheme === 'dark'
                  ? 'hover:bg-gray-800 text-red-400'
                  : 'hover:bg-gray-100 text-red-600'
                  }`}
                onClick={() => {
                  setShowProfile(false)
                  // Handle logout logic here
                }}
              >
                <LogOut size={16} /> {t('Header.Profile.Logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}