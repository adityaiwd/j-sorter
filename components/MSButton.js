import LoadingButton from '@mui/lab/LoadingButton';

const MSButton = ({ onClick, loading, disabled, children, ...rest }) => {
   return (
      <LoadingButton
         variant="contained"
         sx={{
            width: '100%',
            fontSize: '1.6rem',
            paddingY: '1.6rem',
            borderRadius: '3.6rem',
         }}
         loading={loading}
         onClick={onClick}
         disabled={disabled}
         {...rest}
      >
         {children}
      </LoadingButton>
   )
}

export default MSButton
