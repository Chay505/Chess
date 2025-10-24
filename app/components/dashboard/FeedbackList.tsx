'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';

interface Feedback {
  id: string;
  content: string;
  createdAt: string;
}

export default function FeedbackList() {
  const { user } = useUser();
  const t = useTranslations('dashboard.feedback');
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFeedback();
    }
  }, [user]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/feedback');

      if (!res.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const data = await res.json();
      setFeedback(data.feedback || []);
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-base text-[#7F8C8D]">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-base text-red-600">{t('error')}</p>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="max-w-md">
          <svg
            className="mx-auto h-16 w-16 text-[#7F8C8D] mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p className="text-base sm:text-lg text-[#7F8C8D]">{t('emptyState')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-5"
        >
          <div className="text-sm font-semibold text-[#6B7280] mb-3">
            {new Date(item.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="prose prose-sm max-w-none text-[#374151] leading-relaxed">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
