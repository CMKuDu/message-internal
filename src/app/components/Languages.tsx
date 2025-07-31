"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

export function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const locales = [
    { code: "vn", label: t("Header.Languages.VietNam") },
    { code: "en", label: t("Header.Languages.English") }
  ];

  const handleChangeLocale = (locale: string) => {
    router.push(pathname, { locale }); // ✅ Cách đúng với App Router
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t("Header.Languages.Languages")} className="hover:text-blue-500">
          <Languages size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('Header.Languages.Languages')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang.code}
            onClick={() => handleChangeLocale(lang.code)}
            className="font-bold"
          >
            {lang.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
