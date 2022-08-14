import { Button } from '@mui/material'

const MSButton = ({ onClick, disabled, children, ...rest }) => {
   return (
      <Button
         variant="contained"
         sx={{
            width: '100%',
            fontSize: '1.6rem',
            paddingY: '1.6rem',
            borderRadius: '3.6rem',
         }}
         onClick={onClick}
         disabled={disabled}
         {...rest}
      >
         {children}
      </Button>
   )
}

export default MSButton
