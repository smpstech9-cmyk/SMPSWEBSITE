"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { CMS_EventItem } from "@/lib/cms-store";

export default function OpsEventsPage() {
  const { content, updateSection } = useSiteContent();
  const [events, setEvents] = useState<CMS_EventItem[]>(content.events || []);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  useEffect(() => {
    if (content.events) {
      setEvents(content.events);
    }
  }, [content.events]);

  // New Event Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"symposia" | "workshops" | "hackathons" | "past">("workshops");
  const [newBadge, setNewBadge] = useState("Technical Workshop");
  const [newDate, setNewDate] = useState("15 January 2027");
  const [newTime, setNewTime] = useState("10:00 AM – 04:30 PM IST");
  const [newVenue, setNewVenue] = useState("VTU-VRIF Center, Nagarbhavi, Bengaluru");
  const [newSpeaker, setNewSpeaker] = useState("SMPS Engineering Team");
  const [newSpeakerRole, setNewSpeakerRole] = useState("Lead Systems Architect");
  const [newDescription, setNewDescription] = useState("");
  const [newCapacity, setNewCapacity] = useState("50 Engineers");
  const [newSeatsLeft, setNewSeatsLeft] = useState("15 Seats Remaining");
  const [newRegistrationOpen, setNewRegistrationOpen] = useState(true);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("events", events);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleEventChange = (id: string, field: keyof CMS_EventItem, value: any) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, [field]: value } : evt))
    );
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    updateSection("events", updated);
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvt: CMS_EventItem = {
      id: `evt-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      badge: newBadge.trim() || "Event",
      date: newDate.trim(),
      time: newTime.trim(),
      venue: newVenue.trim(),
      speaker: newSpeaker.trim(),
      speakerRole: newSpeakerRole.trim(),
      description: newDescription.trim() || "Technical session hosted at VTU-VRIF Center.",
      agenda: ["09:30 AM – Welcome & Laboratory Orientation", "11:00 AM – Hands-On Engineering Trial", "03:30 PM – Q&A with Senior Mentors"],
      capacity: newCapacity.trim() || "50 Attendees",
      seatsLeft: newSeatsLeft.trim() || "Open",
      registrationOpen: newRegistrationOpen,
      featured: false,
    };

    const updated = [newEvt, ...events];
    setEvents(updated);
    updateSection("events", updated);

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setIsAddingEvent(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/90 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">Events & Symposia Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Events & Symposia <span className="text-gradient-apple-blue">Manager</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live!</span>
            </div>
          )}
          <Link
            href="/events"
            target="_blank"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Page</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsAddingEvent(true)}
            className="px-4 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* CREATE NEW EVENT MODAL */}
      {isAddingEvent && (
        <form onSubmit={handleAddEventSubmit} className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#0071e3]/30 bg-white space-y-5">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <h3 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#0071e3]" />
              Schedule New Event or Workshop
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingEvent(false)}
              className="text-xs text-[#86868b] hover:text-[#1d1d1f]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Event Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Clean Energy Microgrid Masterclass 2027"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              >
                <option value="symposia">Academic Symposia</option>
                <option value="workshops">Hands-on Workshop</option>
                <option value="hackathons">Hackathon & Sprint</option>
                <option value="past">Past / Archived Session</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Badge</label>
              <input
                type="text"
                placeholder="e.g. Flagship Workshop"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Date</label>
              <input
                type="text"
                placeholder="e.g. 15 January 2027"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Time</label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM – 04:30 PM IST"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Venue / Room</label>
              <input
                type="text"
                placeholder="e.g. Main Auditorium & High-Voltage Bay, VTU-VRIF Center"
                value={newVenue}
                onChange={(e) => setNewVenue(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Key Speaker / Host</label>
              <input
                type="text"
                placeholder="e.g. Dr. Arvind R. Rao"
                value={newSpeaker}
                onChange={(e) => setNewSpeaker(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Speaker Designation</label>
              <input
                type="text"
                placeholder="e.g. Senior Power Systems Architect"
                value={newSpeakerRole}
                onChange={(e) => setNewSpeakerRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Summary Description</label>
              <textarea
                rows={3}
                placeholder="Detailed technical synopsis of the session..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="flex items-center gap-3 sm:col-span-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1d1d1f]">
                <input
                  type="checkbox"
                  checked={newRegistrationOpen}
                  onChange={(e) => setNewRegistrationOpen(e.target.checked)}
                  className="rounded text-[#0071e3] focus:ring-0"
                />
                <span>Open for Public Delegate Registration</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsAddingEvent(false)}
              className="px-5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-[#6e6e73]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#0071e3] text-white text-xs font-semibold shadow-sm hover:bg-[#0077ed]"
            >
              Add Event to Live Feed
            </button>
          </div>
        </form>
      )}

      {/* EXISTING EVENTS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
            Active Scheduled Events ({events.length})
          </span>
          <span className="text-xs text-[#86868b]">
            All changes update the public /events page in real-time
          </span>
        </div>

        {events.length === 0 ? (
          <div className="apple-card p-12 text-center rounded-[24px] border border-[#e5e5ea] bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">No Events in Database</h3>
            <p className="text-xs text-[#6e6e73] max-w-sm mx-auto">
              All events have been purged. Click &quot;+ Create New Event&quot; above whenever you are ready to publish an official symposium, workshop, or sprint.
            </p>
          </div>
        ) : (
          events.map((evt) => (
            <div
              key={evt.id}
              className="apple-card p-6 sm:p-7 rounded-[24px] border border-[#e5e5ea] bg-white space-y-4"
            >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.04]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-bold uppercase">
                  {evt.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#1d1d1f]">{evt.date}</span>
                {evt.registrationOpen ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] text-[10px] font-bold">
                    RSVP Open
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[#86868b] text-[10px] font-bold">
                    Closed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEventChange(evt.id, "registrationOpen", !evt.registrationOpen)}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold border border-[#e5e5ea] hover:bg-[#f5f5f7] transition"
                >
                  {evt.registrationOpen ? "Close Registration" : "Open Registration"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(evt.id)}
                  className="p-1.5 text-[#86868b] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#86868b] mb-1">Title</label>
                <input
                  type="text"
                  value={evt.title}
                  onChange={(e) => handleEventChange(evt.id, "title", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#86868b] mb-1">Time & Duration</label>
                <input
                  type="text"
                  value={evt.time}
                  onChange={(e) => handleEventChange(evt.id, "time", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#86868b] mb-1">Venue / Bay</label>
                <input
                  type="text"
                  value={evt.venue}
                  onChange={(e) => handleEventChange(evt.id, "venue", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#86868b] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={evt.description}
                  onChange={(e) => handleEventChange(evt.id, "description", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#6e6e73] focus:outline-none focus:border-[#0071e3]"
                />
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
