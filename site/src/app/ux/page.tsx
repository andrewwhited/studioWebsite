import Hero from '@/components/ux/sections/Hero'
import About from '@/components/ux/sections/About'
import Background from '@/components/ux/sections/Background'
import Work from '@/components/ux/sections/Work'
import Thoughts from '@/components/ux/sections/Thoughts'
import Credentials from '@/components/ux/sections/Credentials'
import Links from '@/components/ux/sections/Links'

export default function UxHome() {
  return (
    <main>
      <Hero />
      <About />
      <Background />
      <Work />
      <Thoughts />
      <Credentials />
      <Links />
    </main>
  )
}
