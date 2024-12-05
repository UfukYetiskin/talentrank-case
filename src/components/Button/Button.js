import React from 'react'
import { Button } from '@mui/material'

function ButtonUI({ handleClick, type, text, style, color }) {
  return (
    <Button
      type={type}
      onClick={handleClick}
      color={color}
    >
      {text}
    </Button>
  )
}

export default ButtonUI