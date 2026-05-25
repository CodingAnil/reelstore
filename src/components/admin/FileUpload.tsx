'use client';

import React, { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (url: string, metadata?: any) => void;
  accept: string;
  type: 'image' | 'video';
  placeholder?: string;
  hint?: string;
}

export default function FileUpload({
  label,
  value,
  onChange,
  accept,
  type,
  placeholder = 'Select file...',
  hint,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.metadata.url, data.metadata);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Something went wrong during upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-fg-muted text-[10px] font-700 uppercase tracking-wider mb-1">
        {label}
      </label>
      
      <div className="relative group">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="input-dark w-full rounded-xl pl-4 pr-10 py-3 text-fg text-sm truncate"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-dim hover:text-red-400 transition-colors"
              >
                <Icon name="XMarkIcon" size={14} />
              </button>
            )}
          </div>
          
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary/20 border border-primary/30 rounded-xl text-accent text-sm font-700 hover:bg-primary/40 transition-all disabled:opacity-50 min-w-[100px]"
          >
            {uploading ? (
              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            ) : (
              <>
                <Icon name="CloudArrowUpIcon" size={16} />
                <span>Upload</span>
              </>
            )}
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-400 text-[10px] font-600 mt-1">{error}</p>}
      {hint && !error && <p className="text-fg-dim text-[10px] mt-1">{hint}</p>}

      {/* Preview */}
      {value && !uploading && (
        <div className="mt-3 relative rounded-xl overflow-hidden border border-accent/10 bg-black/40">
          {type === 'image' ? (
            <div className="aspect-video relative w-full h-32 sm:h-40">
              <AppImage src={value} alt="Preview" fill className="object-contain" />
            </div>
          ) : (
            <video
              src={value}
              controls
              className="w-full h-32 sm:h-40 rounded-xl bg-black"
            />
          )}
        </div>
      )}
    </div>
  );
}
