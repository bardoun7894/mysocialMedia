import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import DashboardLayout from '../organisms/DashboardLayout';
import StatsCard from '../molecules/StatsCard';
import ProgressRing from '../molecules/ProgressRing';
import AnalyticsChart from '../molecules/AnalyticsChart';
import Card from '../molecules/Card';
import Button from '../atoms/Button';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  // Sample data for demonstration
  const statsData = [
    {
      title: t('dashboard.stats.campaigns', 'Total Campaigns'),
      value: 24,
      change: { value: 12, type: 'increase' as const, period: t('dashboard.stats.thisMonth', 'this month') },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'primary' as const,
    },
    {
      title: t('dashboard.stats.posts', 'Total Posts'),
      value: 156,
      change: { value: 8, type: 'increase' as const, period: t('dashboard.stats.thisWeek', 'this week') },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'success' as const,
    },
    {
      title: t('dashboard.stats.engagement', 'Engagement Rate'),
      value: '4.8%',
      change: { value: 2, type: 'decrease' as const, period: t('dashboard.stats.thisWeek', 'this week') },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'warning' as const,
    },
    {
      title: t('dashboard.stats.reach', 'Total Reach'),
      value: '12.5K',
      change: { value: 18, type: 'increase' as const, period: t('dashboard.stats.thisMonth', 'this month') },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'secondary' as const,
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Posts',
        data: [12, 19, 23, 25, 32, 28],
        backgroundColor: '#7c3aed',
        borderColor: '#7c3aed',
      },
    ],
  };

  const doughnutData = {
    labels: [t('dashboard.platforms.facebook', 'Facebook'), t('dashboard.platforms.instagram', 'Instagram'), t('dashboard.platforms.twitter', 'Twitter')],
    datasets: [
      {
        label: 'Posts by Platform',
        data: [65, 25, 10],
        backgroundColor: ['#7c3aed', '#ec4899', '#3b82f6'],
      },
    ],
  };

  const recentCampaigns = [
    {
      id: '1',
      name: t('dashboard.campaigns.summerSale', 'Summer Sale Campaign'),
      status: t('dashboard.status.active', 'Active'),
      progress: 75,
    },
    {
      id: '2',
      name: t('dashboard.campaigns.productLaunch', 'Product Launch'),
      status: t('dashboard.status.planning', 'Planning'),
      progress: 25,
    },
    {
      id: '3',
      name: t('dashboard.campaigns.brandAwareness', 'Brand Awareness'),
      status: t('dashboard.status.completed', 'Completed'),
      progress: 100,
    },
  ];

  return (
    <DashboardLayout
      title={t('dashboard.title', 'Dashboard')}
      subtitle={t('dashboard.subtitle', 'Welcome to your social media management dashboard')}
      actions={
        <Button variant="primary" size="sm">
          {t('dashboard.newCampaign', 'New Campaign')}
        </Button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Analytics Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart
            title={t('dashboard.analytics.postsOverTime', 'Posts Over Time')}
            data={chartData}
            type="line"
            height={300}
          />
        </div>

        {/* Progress Rings */}
        <div className="space-y-6">
          <Card title={t('dashboard.campaignProgress', 'Campaign Progress')} padding="md">
            <div className="grid grid-cols-2 gap-4">
              {recentCampaigns.slice(0, 2).map((campaign) => (
                <ProgressRing
                  key={campaign.id}
                  progress={campaign.progress}
                  size={80}
                  strokeWidth={6}
                  color={campaign.progress === 100 ? 'success' : 'primary'}
                  label={campaign.name}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <Card title={t('dashboard.recentCampaigns', 'Recent Campaigns')}>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-500">{campaign.status}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{campaign.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="ghost" size="sm" fullWidth>
              {t('dashboard.viewAllCampaigns', 'View All Campaigns')}
            </Button>
          </div>
        </Card>

        {/* Posts by Platform */}
        <AnalyticsChart
          title={t('dashboard.postsByPlatform', 'Posts by Platform')}
          data={doughnutData}
          type="doughnut"
          height={250}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
