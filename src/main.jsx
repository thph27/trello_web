import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Cau hinh Mui Dialog
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      confirmationButtonProps: {color: 'primary', variant: 'outlined'},
      cancellationButtonProps: {color: 'inherit'}
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position='bottom-left' theme='light'/>
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
