import { useMediaQuery } from 'react-responsive'
import { DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW } from '../../constants'

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery(DESKTOP_VIEW)
  return isDesktop ? children : null
}

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery(TABLET_VIEW)
  return isTablet ? children : null
}

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery(MOBILE_VIEW)
  return isMobile ? children : null
}