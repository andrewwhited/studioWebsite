import Hero from '@/components/ux/sections/Hero'
import About from '@/components/ux/sections/About'
import Work from '@/components/ux/sections/Work'
import Thoughts from '@/components/ux/sections/Thoughts'
import Credentials from '@/components/ux/sections/Credentials'
import Links from '@/components/ux/sections/Links'

export default function UxHome() {
  return (
    <main>
      <Hero />
      <About />
      <Credentials />
      <Work />
      <Thoughts />
      <Links />
    </main>
  )
}
