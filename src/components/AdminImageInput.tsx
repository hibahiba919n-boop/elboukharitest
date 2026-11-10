import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, RefreshCw } from 'lucide-react';

interface AdminImageInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export const AdminImageInput: React.FC<AdminImageInputProps> = ({
  id,
  value,
  onChange,
  label = "Image",
  required = false,
  placeholder = "https://images.unsplash.com/... ou sélectionner un fichier local"
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP, GIF, SVG).');
      return;
    }

    // Convert file to base64 DataURL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const isLocalFile = value && value.startsWith('data:image/');
  const isWebUrl = value && (value.startsWith('http://') || value.startsWith('https://'));

  return (
    <div className="space-y-2" id={id}>
      <div className="flex items-center justify-between">
        <label className="font-bold text-gray-700 dark:text-gray-300 text-xs flex items-center gap-1.5">
          <ImageIcon size={13} className="text-[#C89B3C]" />
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>

        {/* Input mode switcher */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#1E1E1E] p-1 rounded-xl text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-black text-[#C89B3C] shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Upload size={11} />
            <span>Depuis l'ordinateur</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'url'
                ? 'bg-white dark:bg-black text-[#C89B3C] shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon size={11} />
            <span>Coller un lien URL</span>
          </button>
        </div>
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileInput}
        className="hidden"
      />

      {/* Primary Input Container */}
      {activeTab === 'upload' ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-[#C89B3C] bg-[#C89B3C]/10'
              : 'border-gray-300 dark:border-[#333333] hover:border-[#C89B3C] bg-[#FDFBF7] dark:bg-black/50'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 text-[#C89B3C] flex items-center justify-center">
            <Upload size={18} />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Cliquez pour choisir une image sur votre machine
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              ou glissez-déposez le fichier ici (JPG, PNG, WebP)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-[#FDFBF7] dark:bg-black border border-gray-200 dark:border-[#222222] focus:border-[#C89B3C] focus:outline-none pl-9 pr-4 py-2.5 rounded-xl text-xs text-gray-900 dark:text-white font-mono"
            />
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
          </div>
          <p className="text-[10px] text-gray-400">
            Collez un lien d'image direct (ex: https://images.unsplash.com/...)
          </p>
        </div>
      )}

      {/* Image Preview & Status if image is selected */}
      {value ? (
        <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl p-2.5 flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-black shrink-0 border border-gray-200 dark:border-[#333333] relative group">
            <img
              src={value}
              alt="Aperçu"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200';
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                <Check size={10} /> Image chargée
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {isLocalFile ? 'Fichier Local' : isWebUrl ? 'Lien Web' : 'Personnalisée'}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-mono">
              {value.startsWith('data:') ? `Fichier importé (${value.substring(0, 32)}...)` : value}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Remplacer par un autre fichier"
              className="p-1.5 bg-gray-100 dark:bg-[#222222] hover:bg-[#C89B3C] hover:text-black text-gray-600 dark:text-gray-300 rounded-lg text-xs transition cursor-pointer"
            >
              <RefreshCw size={13} />
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              title="Supprimer l'image"
              className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg text-xs transition cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
