// src/app/services/page.jsx
import ServicesProjectsPage from '@/components/pages/ServicesProjectsPage';

export const metadata = {
  title: 'Project Management | Ploxi Sustainability Platform',
  description: 'Track and manage sustainability projects, timelines, milestones, and vendor engagements.',
};

export default function ServicesRoute() {
  return <ServicesProjectsPage />;
}
