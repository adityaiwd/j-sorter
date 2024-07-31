import Link from 'next/link';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { NavInnerWrapper, NavWrapper, LayoutWrapper, Main, FooterDivider } from './style';
import Logo from './Logo';
import Copyright from '../src/Copyright';

const Navbar = ({ children }) => {
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
          <Typography
            variant="h6"
            color="primary"
            align="center"
            sx={{
              textTransform: 'uppercase',
              fontSize: '1.6rem',
              fontWeight: 700,
            }}
          >
            <MuiLink
              color="inherit"
              href="https://x.com/Liamelior/status/1793670840263078342"
              target="_blank"
              rel="noopener noreferrer"
              sx={{textDecoration: 'none'}}
            >
              #AurelliaNoHoshi
            </MuiLink>
          </Typography>
          <Copyright />
        </footer>
      </Main>
    </LayoutWrapper>
  );
};

export default Navbar;
