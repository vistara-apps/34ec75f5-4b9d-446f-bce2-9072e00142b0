import { DrawDashboard } from '../components/DrawDashboard';
import { Header } from '../components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <DrawDashboard />
    </div>
  );
}
