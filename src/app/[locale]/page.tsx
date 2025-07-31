"use client";

import { useTranslations } from "next-intl";


export default function Home() {
  const t = useTranslations()
  return (
    <div>
      {t('Exemple.item_exemple')}
    </div>
  );
}
