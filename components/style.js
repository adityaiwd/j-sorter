import styled from '@emotion/styled'

export const NavWrapper = styled.div`
   position: fixed;
   min-width: 100vw;
   background: rgba(255, 255, 255, 0.7);
   width: 100%;
   box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
   padding: 1.8rem 0;
   z-index: 10;
`

export const NavInnerWrapper = styled.div`
   width: 80%;
   margin: 0 auto;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const NavLogo = styled.div`
   display: flex;
   align-items: center;
`

export const NavLogoText = styled.div`
   margin-right: 0.4rem;
   font-size: 3.2rem;
   font-weight: 700;
   text-transform: uppercase;
   transition: all 0.2s;
   color: #f64740;
`

export const NavLogoSubText = styled.div`
   font-size: 1.4rem;
   line-height: 1.1;
   font-weight: 700;
   text-transform: uppercase;
   transition: all 0.2s;
   color: #f64740;
`

export const LayoutWrapper = styled.div`
   background-color: #fdecef;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   align-items: center;
`
export const Main = styled.main`
   position: relative;
   background-color: #fdecef;
   margin: 0 auto;
   width: 100%;
   min-height: 100vh;
   padding-top: 12rem;
`

export const FooterDivider = styled.div`
   width: 100%;
   height: 7rem;
`
