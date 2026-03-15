import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Background from '@/components/sections/Background'
import Work from '@/components/sections/Work'
import Thoughts from '@/components/sections/Thoughts'
import Credentials from '@/components/sections/Credentials'
import Links from '@/components/sections/Links'

export default function Home() {
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
