import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";

const queryclient=new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
    <App />
    <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
)
