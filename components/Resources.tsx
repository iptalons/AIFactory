import React, { useState, useEffect } from 'react';
import { Youtube, Link as LinkIcon, Save } from 'lucide-react';

interface ResourceLinks {
  youtube1: string;
  youtube2: string;
  youtube3: string;
  link1: string;
  link2: string;
  link3: string;
}

const Resources: React.FC = () => {
  const [links, setLinks] = useState<ResourceLinks>({
    youtube1: '',
    youtube2: '',
    youtube3: '',
    link1: '',
    link2: '',
    link3: '',
  });

  // Load saved links from localStorage
  useEffect(() => {
    const savedLinks = localStorage.getItem('resourceLinks');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('resourceLinks', JSON.stringify(links));
    alert('Resources saved successfully!');
  };

  const handleChange = (field: keyof ResourceLinks, value: string) => {
    setLinks({ ...links, [field]: value });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-teal-300">Resources</h1>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Save</span>
        </button>
      </div>

      {/* YouTube Links Section */}
      <div className="bg-slate-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Youtube className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold text-white">YouTube Videos</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              YouTube Link 1
            </label>
            <input
              type="url"
              value={links.youtube1}
              onChange={(e) => handleChange('youtube1', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              YouTube Link 2
            </label>
            <input
              type="url"
              value={links.youtube2}
              onChange={(e) => handleChange('youtube2', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              YouTube Link 3
            </label>
            <input
              type="url"
              value={links.youtube3}
              onChange={(e) => handleChange('youtube3', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Other Links Section */}
      <div className="bg-slate-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <LinkIcon className="w-6 h-6 text-teal-400" />
          <h2 className="text-xl font-semibold text-white">Other Resources</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resource Link 1
            </label>
            <input
              type="url"
              value={links.link1}
              onChange={(e) => handleChange('link1', e.target.value)}
              placeholder="https://example.com/resource"
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resource Link 2
            </label>
            <input
              type="url"
              value={links.link2}
              onChange={(e) => handleChange('link2', e.target.value)}
              placeholder="https://example.com/resource"
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resource Link 3
            </label>
            <input
              type="url"
              value={links.link3}
              onChange={(e) => handleChange('link3', e.target.value)}
              placeholder="https://example.com/resource"
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Saved Links Display */}
      {(links.youtube1 || links.youtube2 || links.youtube3 || links.link1 || links.link2 || links.link3) && (
        <div className="bg-slate-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Saved Links</h2>
          <div className="space-y-2">
            {links.youtube1 && (
              <a
                href={links.youtube1}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors text-teal-300 hover:text-teal-200"
              >
                <div className="flex items-center space-x-2">
                  <Youtube className="w-4 h-4" />
                  <span className="text-sm">{links.youtube1}</span>
                </div>
              </a>
            )}
            {links.youtube2 && (
              <a
                href={links.youtube2}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors text-teal-300 hover:text-teal-200"
              >
                <div className="flex items-center space-x-2">
                  <Youtube className="w-4 h-4" />
                  <span className="text-sm">{links.youtube2}</span>
                </div>
              </a>
            )}
            {links.youtube3 && (
              <a
                href={links.youtube3}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors text-teal-300 hover:text-teal-200"
              >
                <div className="flex items-center space-x-2">
                  <Youtube className="w-4 h-4" />
                  <span className="text-sm">{links.youtube3}</span>
                </div>
              </a>
            )}
            {links.link1 && (
              <a
                href={links.link1}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors text-teal-300 hover:text-teal-200"
              >
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">{links.link1}</span>
                </div>
              </a>
            )}
            {links.link2 && (
              <a
                href={links.link2}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors text-teal-300 hover:text-teal-200"
              >
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">{links.link2}</span>
                </div>
              </a>
            )}
            {links.link3 && (
              <a
                href={links.link3}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors text-teal-300 hover:text-teal-200"
              >
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">{links.link3}</span>
                </div>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
