import React, { useState } from 'react';
import { generateFactoryResponse, translateToSinhala, draftBusinessEmail } from '../services/geminiService';
import { Message } from '../types';
import { Send, Languages, Mail, MessageSquare } from 'lucide-react';

const AITools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'chat' | 'translate' | 'email'>('chat');
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'model', text: 'ආයුබෝවන්! මම ඔබගේ කර්මාන්තශාලා AI සහායකයා. ඔබට උදව් කරන්නේ කෙසේද?', timestamp: Date.now() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Translate State
  const [translateInput, setTranslateInput] = useState('');
  const [translationResult, setTranslationResult] = useState('');

  // Email State
  const [emailDetails, setEmailDetails] = useState('');
  const [emailResult, setEmailResult] = useState('');

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg: Message = { role: 'user', text: chatInput, timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsLoading(true);

    const responseText = await generateFactoryResponse(chatInput);
    
    const botMsg: Message = { role: 'model', text: responseText, timestamp: Date.now() };
    setChatMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleTranslate = async () => {
    if (!translateInput.trim()) return;
    setIsLoading(true);
    const result = await translateToSinhala(translateInput);
    setTranslationResult(result);
    setIsLoading(false);
  };

  const handleEmailDraft = async () => {
    if (!emailDetails.trim()) return;
    setIsLoading(true);
    const result = await draftBusinessEmail(emailDetails);
    setEmailResult(result);
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-8 h-screen flex flex-col md:h-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-sinhala text-slate-800">AI සහායක මෙවලම්</h2>
        <p className="text-slate-600 font-sinhala">ඔබගේ කාර්යයන් පහසු කිරීමට AI භාවිතා කරන්න.</p>
      </div>

      {/* Tool Navigation */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTool('chat')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-sinhala transition-colors ${
            activeTool === 'chat' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>සාමාන්‍ය කතාබහ</span>
        </button>
        <button
          onClick={() => setActiveTool('translate')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-sinhala transition-colors ${
            activeTool === 'translate' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>පරිවර්තක (English to Sinhala)</span>
        </button>
        <button
          onClick={() => setActiveTool('email')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-sinhala transition-colors ${
            activeTool === 'email' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email ලිවීම</span>
        </button>
      </div>

      {/* Main Tool Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Chat Interface */}
        {activeTool === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-xl font-sinhala text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-teal-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-500 text-sm italic animate-pulse">
                    AI පිළිතුරක් සකසමින් පවතී...
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="මෙහි ඔබේ ප්‍රශ්නය ටයිප් කරන්න..."
                  className="flex-1 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-sinhala"
                />
                <button 
                  onClick={handleChatSend}
                  disabled={isLoading || !chatInput}
                  className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Translator Interface */}
        {activeTool === 'translate' && (
          <div className="flex flex-col h-full p-6 space-y-4">
             <div className="flex-1 space-y-2">
               <label className="block text-sm font-medium text-slate-700 font-sinhala">පරිවර්තනය කිරීමට අවශ්‍ය ඉංග්‍රීසි වාක්‍ය (English Text):</label>
               <textarea
                 value={translateInput}
                 onChange={(e) => setTranslateInput(e.target.value)}
                 className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-sans"
                 placeholder="Paste English email or document text here..."
               />
               <button
                onClick={handleTranslate}
                disabled={isLoading || !translateInput}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 font-sinhala"
               >
                 {isLoading ? 'පරිවර්තනය කරමින්...' : 'සිංහලට හරවන්න'}
               </button>
             </div>
             
             <div className="flex-1 border-t border-slate-100 pt-4">
               <label className="block text-sm font-medium text-slate-700 font-sinhala mb-2">ප්‍රතිඵලය (Sinhala):</label>
               <div className="w-full h-full min-h-[150px] p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-sinhala whitespace-pre-wrap">
                 {translationResult || <span className="text-slate-400 italic">ප්‍රතිඵලය මෙහි දිස්වනු ඇත...</span>}
               </div>
             </div>
          </div>
        )}

        {/* Email Drafter Interface */}
        {activeTool === 'email' && (
           <div className="flex flex-col h-full p-6 space-y-4">
           <div className="flex-1 space-y-2">
             <label className="block text-sm font-medium text-slate-700 font-sinhala">ලිපියට ඇතුළත් විය යුතු කරුණු (සිංහලෙන් හෝ ඉංග්‍රීසියෙන්):</label>
             <p className="text-xs text-slate-500">උදාහරණ: "සැපයුම්කරුට කියන්න ලබන සතියේ අමුද්‍රව්‍ය එවන්න ප්‍රමාද වෙන්න එපා කියලා. මිල ගණන් ගැනත් අහන්න."</p>
             <textarea
               value={emailDetails}
               onChange={(e) => setEmailDetails(e.target.value)}
               className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-sinhala"
               placeholder="කරුණු මෙහි ලියන්න..."
             />
             <button
              onClick={handleEmailDraft}
              disabled={isLoading || !emailDetails}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 font-sinhala"
             >
               {isLoading ? 'ලිපිය සකසමින්...' : 'ඉංග්‍රීසි ලිපිය සකසන්න'}
             </button>
           </div>
           
           <div className="flex-1 border-t border-slate-100 pt-4">
             <label className="block text-sm font-medium text-slate-700 font-sinhala mb-2">සැකසූ ලිපිය (Draft):</label>
             <div className="w-full h-full min-h-[200px] p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-mono text-sm whitespace-pre-wrap">
               {emailResult || <span className="text-slate-400 italic font-sinhala">සැකසූ ලිපිය මෙහි දිස්වනු ඇත...</span>}
             </div>
           </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default AITools;