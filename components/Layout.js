import Link from 'next/link'
import { useTheme } from '@mui/material'
import {
   NavInnerWrapper,
   NavWrapper,
   NavLogo,
   LayoutWrapper,
   NavLogoText,
   NavLogoSubText,
   Main,
} from './style'
import Copyright from '../src/Copyright'

const Navbar = ({ children }) => {
   const theme = useTheme()
   return (
      <LayoutWrapper>
         <NavWrapper>
            <NavInnerWrapper>
               <Link passHref href="/">
                  <NavLogo>
                     <NavLogoText style={{ color: theme.palette.primary }}>
                        JKT48
                     </NavLogoText>
                     <div>
                        <NavLogoSubText>Member</NavLogoSubText>
                        <NavLogoSubText>Sorter</NavLogoSubText>
                     </div>
                  </NavLogo>
               </Link>
            </NavInnerWrapper>
         </NavWrapper>
         <Main>
            {children}
            <footer style={{ position: 'absolute', bottom: 0, width: '100%', paddingBottom: '2rem' }}>
               <Copyright />
            </footer>
         </Main>
      </LayoutWrapper>
   )
}

export default Navbar
