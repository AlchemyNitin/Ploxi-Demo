// src/app/corporate/layout.jsx
// Provides the dark-green gradient background for all /corporate/* routes.
// The corporate landing page (page.jsx) and DashboardContent override with
// their own min-h-screen elements; the sub-pages use this as their canvas.
export default function CorporateLayout({ children }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1a3c2d 0%, #0f4c35 30%, #1a5c3d 60%, #154a30 100%)',
            }}
        >
            {children}
        </div>
    );
}
