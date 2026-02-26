import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quest-Log - RPG de Produtividade',
  description: 'Transforme suas tarefas diárias em XP e suba de nível!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}