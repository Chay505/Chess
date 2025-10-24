'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { ArrowDownTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  filename: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
}

export default function ResourcesList() {
  const { user } = useUser();
  const t = useTranslations('dashboard.resources');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchResources();
    }
  }, [user]);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources');

      if (!res.ok) {
        console.error('Failed to fetch resources:', res.status, res.statusText);
        setResources([]);
        return;
      }

      const data = await res.json();
      setResources(data.resources || []);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string, filename: string) => {
    try {
      setDownloadingId(id);
      const res = await fetch(`/api/resources/${id}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert(t('downloadError'));
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert(t('downloadError'));
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-[#7F8C8D]">{t('loading')}</div>;
  }

  if (resources.length === 0) {
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-base sm:text-lg text-[#7F8C8D]">{t('emptyState')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:shadow-md transition"
        >
          <div className="flex items-center space-x-4">
            <DocumentIcon className="w-8 h-8 text-[#16A085]" />
            <div>
              <div className="font-semibold text-[#2C3E50]">
                {resource.filename}
              </div>
              <div className="text-sm text-[#7F8C8D]">
                {(resource.fileSize / 1024 / 1024).toFixed(2)} MB • {new Date(resource.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleDownload(resource.id, resource.filename)}
            disabled={downloadingId === resource.id}
            className="flex items-center space-x-2 bg-[#16A085] text-white px-4 py-2 rounded-lg hover:bg-[#148F77] transition disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>{downloadingId === resource.id ? t('downloading') : t('download')}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
