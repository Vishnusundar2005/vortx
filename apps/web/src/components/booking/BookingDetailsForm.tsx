import React, { useState } from 'react';
import { Clock, Users, User, Mail, Phone, X, Briefcase } from 'lucide-react';

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  duration: number;
  peopleCount: number;
  purpose: string;
}

interface BookingDetailsFormProps {
  data: BookingFormData;
  onChange: (data: BookingFormData) => void;
}

export function BookingDetailsForm({ data, onChange }: BookingDetailsFormProps) {
  const [isCustomDuration, setIsCustomDuration] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'duration-select' && value === 'custom') {
      setIsCustomDuration(true);
      onChange({ ...data, duration: 2 }); // Default to 2 hours for custom
      return;
    }

    let finalValue: string | number = value;
    if (name === 'duration' || name === 'peopleCount') {
      finalValue = parseInt(value) || 0;
    }
    
    onChange({
      ...data,
      [name]: finalValue
    });
  };

  const inputWrapperClass = "relative group transition-all duration-300";
  const inputClass = "w-full bg-[#121212] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d946ef] focus:ring-1 focus:ring-[#d946ef] transition-all duration-300 hover:border-zinc-700 shadow-sm";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#d946ef] transition-colors duration-300 w-4 h-4";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className={inputWrapperClass}>
        <User className={iconClass} />
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          placeholder="First Name *"
          className={inputClass}
        />
      </div>
      
      <div className={inputWrapperClass}>
        <User className={iconClass} />
        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder="Last Name *"
          className={inputClass}
        />
      </div>
      
      <div className={inputWrapperClass}>
        <Phone className={iconClass} />
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Phone / WhatsApp *"
          className={inputClass}
        />
      </div>
      
      <div className={inputWrapperClass}>
        <Mail className={iconClass} />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email Address *"
          className={inputClass}
        />
      </div>
      
      <div className={inputWrapperClass}>
        <Clock className={iconClass} />
        {!isCustomDuration ? (
          <>
            <select
              name="duration-select"
              value={data.duration}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value={0} disabled>Select duration *</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
              <option value={4}>4 Hours</option>
              <option value={5}>5 Hours</option>
              <option value={6}>6 Hours</option>
              <option value={8}>8 Hours</option>
              <option value={10}>10 Hours</option>
              <option value={12}>12 Hours</option>
              <option value="custom" className="text-[#d946ef] font-semibold">Custom Time...</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-focus-within:text-[#d946ef] transition-colors">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </>
        ) : (
          <div className="relative">
            <input
              type="number"
              name="duration"
              value={data.duration || ''}
              onChange={handleChange}
              placeholder="Custom hours *"
              min="2"
              autoFocus
              className={`${inputClass} pr-12`}
            />
            <button 
              type="button"
              onClick={() => setIsCustomDuration(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
              title="Back to list"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
      
      <div className={inputWrapperClass}>
        <Users className={iconClass} />
        <input
          type="number"
          name="peopleCount"
          value={data.peopleCount || ''}
          onChange={handleChange}
          placeholder="Number of People *"
          min="1"
          className={inputClass}
        />
      </div>

      <div className={inputWrapperClass}>
        <Briefcase className={iconClass} />
        <select
          name="purpose"
          value={data.purpose}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="PODCAST_RECORDING">Podcast Recording</option>
          <option value="VIDEO_PODCAST">Video Podcast</option>
          <option value="PHOTOGRAPHY">Photography</option>
          <option value="VIDEOGRAPHY">Videography</option>
          <option value="MUSIC_VIDEO">Music Video</option>
          <option value="DANCE_VIDEO">Dance Video</option>
          <option value="LIVE_STREAMING">Live Streaming</option>
          <option value="COMMUNITY_EVENT">Community Event</option>
          <option value="CORPORATE_MEETING">Corporate Meeting</option>
          <option value="WORKSHOP">Workshop</option>
          <option value="OTHER">Other Purpose</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-focus-within:text-[#d946ef] transition-colors">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
