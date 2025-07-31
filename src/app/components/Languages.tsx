"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useMemo } from "react";
export function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const locales = [
    { code: "vn", label: t("Header.Languages.VietNam") },
    { code: "en", label: t("Header.Languages.English") },
  ];
  const basePath = useMemo(() => {
    const parts = pathname.split("/");
    parts[1] = ""; // xoá locale hiện tại
    return parts.join("/") || "/";
  }, [pathname]);
  const handleChangeLocale = (locale: string) => {
    router.replace(basePath, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title={t("Header.Languages.Languages")}
          className="hover:text-blue-500"
        >
          <Languages size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {t("Header.Languages.Languages")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang.code}
            checked={lang.code === currentLocale}
            onCheckedChange={() => handleChangeLocale(lang.code)}
            className="font-bold"
          >
            {lang.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
