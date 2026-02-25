// src/app/corporate/rfp/page.jsx
import RFPPage from '@/components/pages/RFPPage';

export const metadata = {
    title: 'Request for Proposal | Ploxi Earth',
    description: 'Create and manage RFPs for sustainability solutions. Invite vendors, attach compliance requirements, and track proposals.',
};

export default function RFPRoute() {
    return <RFPPage />;
}
