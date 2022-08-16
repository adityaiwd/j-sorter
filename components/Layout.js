import Link from 'next/link'
import { useTheme } from '@mui/material'
import { NavInnerWrapper, NavWrapper, LayoutWrapper, Main, FooterDivider } from './style'
import Logo from './Logo'
import Copyright from '../src/Copyright'

const Navbar = ({ children }) => {
   const theme = useTheme()
   return (
      <LayoutWrapper>
         <NavWrapper>
            <NavInnerWrapper>
               <Link passHref href="/">
                  <div style={{ cursor: 'pointer' }}>
                     <Logo />
                  </div>
               </Link>
            </NavInnerWrapper>
         </NavWrapper>
         <Main>
            {children}
            <FooterDivider />
            <footer
               style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  paddingBottom: '2rem',
               }}
            >
               <Copyright />
            </footer>
         </Main>
      </LayoutWrapper>
   )
}

export default Navbar
