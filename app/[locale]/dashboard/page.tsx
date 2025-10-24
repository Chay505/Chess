import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import DashboardHeader from '../../components/DashboardHeader';
import ResourcesList from '../../components/dashboard/ResourcesList';
import FeedbackList from '../../components/dashboard/FeedbackList';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const t = await getTranslations('dashboard');

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#2C3E50] mb-8">
          {t('welcome')}
        </h1>

        <div className="space-y-6 md:space-y-8">
          {/* Resources Section */}
          <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2C3E50] mb-6">
              {t('resources.heading')}
            </h2>
            <ResourcesList />
          </section>

          {/* Feedback Section */}
          <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2C3E50] mb-6">
              {t('feedback.heading')}
            </h2>
            <FeedbackList />
          </section>
        </div>
      </main>
    </div>
  );
}
