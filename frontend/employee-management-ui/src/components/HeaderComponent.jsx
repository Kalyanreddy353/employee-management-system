import React from 'react';

function HeaderComponent() {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <a
                        href="/employees"
                        className="navbar-brand fw-bold"
                    >
                        Employee Management System
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponent;