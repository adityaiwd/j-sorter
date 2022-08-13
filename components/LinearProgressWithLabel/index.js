import * as React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const LinearProgressWithLabel = ({ value, ...rest }) => {
   return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" sx={{borderRadius: 5, height: 10}} value={value} {...rest} />
         </Box>
         <Box sx={{ minWidth: 35 }}>
            <Typography variant="h5" color="text.secondary">{`${Math.round(
               value
            )}%`}</Typography>
         </Box>
      </Box>
   )
}

LinearProgressWithLabel.propTypes = {
   /**
    * The value of the progress indicator for the determinate and buffer variants.
    * Value between 0 and 100.
    */
   value: PropTypes.number.isRequired,
}

export default LinearProgressWithLabel
