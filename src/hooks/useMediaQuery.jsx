import { useEffect, useState } from 'react'

export const useResponsive = breakpoint => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleMediaQueryChange = event => {
      setIsMobile(event.matches)
    }

    const mediaQuery = window.matchMedia(breakpoint)

    handleMediaQueryChange(mediaQuery)

    mediaQuery.addListener(handleMediaQueryChange)

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  }, [breakpoint])

  return isMobile
}
