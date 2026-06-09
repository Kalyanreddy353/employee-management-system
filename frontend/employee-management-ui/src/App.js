import './App.css';
import EmployeeListComponent from './components/EmployeeListComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>

            <HeaderComponent />

            <div className="container">
                <Routes>

                    <Route
                        path="/employees"
                        element={<EmployeeListComponent />}
                    />

                    <Route
                        path="/add-employee"
                        element={<AddEmployeeComponent />}
                    />

                    <Route
                        path="/update-employee/:id"
                        element={<AddEmployeeComponent />}
                    />

                    <Route
                        path="/"
                        element={<EmployeeListComponent />}
                    />

                </Routes>
            </div>

            <FooterComponent />

        </BrowserRouter>
    );
}

export default App;