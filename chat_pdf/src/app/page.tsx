'use client'
import { Footer } from '@/app/components/footer'
import { Logo } from '@/app/components/logo'
import { Search } from '@/app/components/search'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import DocumentUploadMain from '@/app/components/mainUploadpdf'
import { usePathname, useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()
  const methods = useForm()

  const handleChatRedirect = (chatId: string) => {
    router.push(`/chat/${chatId}`)
  }

  return (
    <FormProvider {...methods}>
      <div
        className="absolute inset-0 min-h-[500px] flex items-center justify-center"
        style={{ backgroundColor: '#18181b' }}
      >
        <div className="relative flex flex-col gap-8 px-4 -mt-24">
          <Logo></Logo>
          <DocumentUploadMain
            onClickRedirect={handleChatRedirect}
          ></DocumentUploadMain>
          {/* <Search></Search> */}
          <Footer></Footer>
        </div>
      </div>
    </FormProvider>
  )
}
