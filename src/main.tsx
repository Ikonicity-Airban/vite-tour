import './index.css';

import { AppProvider } from './api/contexts/context.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

// import * as serviceWorker from "./service-worker.ts";




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    </React.StrictMode>
);

// serviceWorker.register();
