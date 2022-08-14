import { useTheme } from '@mui/material'
import { NavLogo, NavLogoText, NavLogoSubText } from './style'

const Logo = () => {
    const theme = useTheme()
   return (
      <NavLogo>
         <NavLogoText style={{ color: theme.palette.primary }}>
            JKT48
         </NavLogoText>
         <div>
            <NavLogoSubText>Member</NavLogoSubText>
            <NavLogoSubText>Sorter</NavLogoSubText>
         </div>
      </NavLogo>
   )
}

export default Logo
