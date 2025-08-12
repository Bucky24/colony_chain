import App from './App';
import { DataProvider } from './contexts/DataContext';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
    <DataProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DataProvider>
);
