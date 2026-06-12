"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

type ContactMessage = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
};

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  session_type: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string | null;
  payment_status?: string | null;
  session_price?: number | null;
  slot_id?: string | null;
  created_at: string;
};

type BookingRequest = {
  id: string;
  booking_id: string;
  customer_email: string;
  request_type: string;
  message: string | null;
  admin_note: string | null;
  status: string;
  created_at: string;
};
type BookingSlot = {
  id: string;
  session_type: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  price: number;
  is_booked: boolean;
  created_at: string;
  bookings?: {
    id: string;
    full_name: string;
    email: string;
    payment_status: string | null;
    status: string | null;
  }[];
};

const serviceDefaults = {
  "Intro Session": { duration: 30, price: 25 },
  "1-to-1 Support": { duration: 50, price: 40 },
  "Group Session": { duration: 60, price: 15 },
};

export default function AdminPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [requestNotes, setRequestNotes] = useState<Record<string, string>>({});
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [requestFilter, setRequestFilter] = useState("all");
  const [slotFilter, setSlotFilter] = useState("all");
  const [deleteStartDate, setDeleteStartDate] = useState("");
  const [deleteEndDate, setDeleteEndDate] = useState("");

  const [slotSessionType, setSlotSessionType] = useState("Intro Session");
  const [slotStartDate, setSlotStartDate] = useState("");
  const [slotEndDate, setSlotEndDate] = useState("");
  const [slotStartTime, setSlotStartTime] = useState("09:00");
  const [slotEndTime, setSlotEndTime] = useState("12:00");
  const [slotDuration, setSlotDuration] = useState(30);
  const [slotBreak, setSlotBreak] = useState(0);
  const [slotPrice, setSlotPrice] = useState(25);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);

  const days = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ];

  async function loadData() {
    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Admin auth error:", userError.message);
      setLoading(false);
      router.push("/login");
      return;
    }

    const user = userData.user;

    if (!user || user.email !== "azizkhan69512@gmail.com") {
      await supabase.auth.signOut();
      setLoading(false);
      router.push("/login");
      return;
    }

    const { data: messagesData } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: requestsData, error: requestsError } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (requestsError) {
      console.error("Booking requests error:", requestsError.message);
    }

    const { data: slotsData } = await supabase
      .from("booking_slots")
      .select(`
        *,
        bookings (
          id,
          full_name,
          email,
          payment_status,
          status
        )
      `)
      .order("slot_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (messagesData) setMessages(messagesData);
    if (bookingsData) setBookings(bookingsData);
    if (requestsData) {
  setRequests(requestsData);

  const notes: Record<string, string> = {};
  requestsData.forEach((request) => {
    notes[request.id] = request.admin_note || "";
  });
  setRequestNotes(notes);
}
    if (slotsData) setSlots(slotsData);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleServiceChange(service: keyof typeof serviceDefaults) {
    setSlotSessionType(service);
    setSlotDuration(serviceDefaults[service].duration);
    setSlotPrice(serviceDefaults[service].price);
  }

  function timeToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function minutesToTime(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00`;
  }

  function formatDateForDB(date: Date) {
    return date.toISOString().split("T")[0];
  }

  function formatDisplayDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatDisplayTime(time: string) {
    return time.slice(0, 5);
  }

  function toggleDay(day: number) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function getBookingForRequest(bookingId: string) {
    return bookings.find((booking) => booking.id === bookingId);
  }

  function requestStatusStyle(status: string) {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "declined") return "bg-red-100 text-red-700";
    if (status === "completed") return "bg-blue-100 text-blue-700";

    return "bg-yellow-100 text-yellow-700";
  }

  async function updateRequestStatus(id: string, status: string) {
    const { error } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Could not update request: " + error.message);
      return;
    }

    loadData();
  }
  async function saveAdminNote(requestId: string) {
  const note = requestNotes[requestId] || "";

  const { error } = await supabase
    .from("booking_requests")
    .update({ admin_note: note })
    .eq("id", requestId);

  if (error) {
    alert("Could not save admin note: " + error.message);
    return;
  }

  alert("Admin note saved.");
  loadData();
}

  async function approveCancelRequest(request: BookingRequest) {
    const booking = getBookingForRequest(request.booking_id);

    const confirmApprove = confirm(
      "Approve this cancellation request? This will mark the booking as cancelled and free the slot."
    );

    if (!confirmApprove) return;

    if (booking) {
      await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", booking.id);

      if (booking.slot_id) {
        await supabase
          .from("booking_slots")
          .update({ is_booked: false })
          .eq("id", booking.slot_id);
      }
    }

    await supabase
      .from("booking_requests")
      .update({ status: "approved" })
      .eq("id", request.id);

    loadData();
  }

  async function generateSlots() {
    if (!slotStartDate || !slotEndDate) {
      alert("Please select both start date and end date.");
      return;
    }

    if (selectedDays.length === 0) {
      alert("Please select at least one available day.");
      return;
    }

    const start = new Date(slotStartDate);
    const end = new Date(slotEndDate);

    if (end < start) {
      alert("End date cannot be before start date.");
      return;
    }

    const generatedSlots: {
      session_type: string;
      slot_date: string;
      start_time: string;
      end_time: string;
      duration_minutes: number;
      price: number;
      is_booked: boolean;
    }[] = [];

    for (
      let current = new Date(start);
      current <= end;
      current.setDate(current.getDate() + 1)
    ) {
      if (!selectedDays.includes(current.getDay())) continue;

      let startMinutes = timeToMinutes(slotStartTime);
      const endMinutes = timeToMinutes(slotEndTime);

      while (startMinutes + slotDuration <= endMinutes) {
        const slotEnd = startMinutes + slotDuration;

        generatedSlots.push({
          session_type: slotSessionType,
          slot_date: formatDateForDB(current),
          start_time: minutesToTime(startMinutes),
          end_time: minutesToTime(slotEnd),
          duration_minutes: slotDuration,
          price: slotPrice,
          is_booked: false,
        });

        startMinutes = slotEnd + slotBreak;
      }
    }

    if (generatedSlots.length === 0) {
      alert("No slots could be generated. Check your date range, days and times.");
      return;
    }

    const { data: existingSlots, error: fetchError } = await supabase
      .from("booking_slots")
      .select("session_type, slot_date, start_time")
      .gte("slot_date", slotStartDate)
      .lte("slot_date", slotEndDate);

    if (fetchError) {
      alert("Could not check existing slots: " + fetchError.message);
      return;
    }

    const existingSlotKeys = new Set(
      (existingSlots || []).map(
        (slot) => `${slot.session_type}-${slot.slot_date}-${slot.start_time}`
      )
    );

    const newSlotsOnly = generatedSlots.filter(
      (slot) =>
        !existingSlotKeys.has(
          `${slot.session_type}-${slot.slot_date}-${slot.start_time}`
        )
    );

    if (newSlotsOnly.length === 0) {
      alert("No new slots were created because all of these slots already exist.");
      return;
    }

    const { error } = await supabase
      .from("booking_slots")
      .insert(newSlotsOnly);

    if (error) {
      alert("Error generating slots: " + error.message);
      return;
    }

    const skippedCount = generatedSlots.length - newSlotsOnly.length;

    alert(
      `${newSlotsOnly.length} new slots generated successfully.${
        skippedCount > 0 ? ` ${skippedCount} duplicate slots skipped.` : ""
      }`
    );

    loadData();
  }

  async function deleteSlot(id: string) {
    const confirmDelete = confirm("Delete this available slot?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("booking_slots").delete().eq("id", id);

    if (!error) loadData();
  }

  async function deleteAvailableSlotsByDateRange() {
    if (!deleteStartDate || !deleteEndDate) {
      alert("Please select both start date and end date.");
      return;
    }

    const confirmDelete = confirm(
      "Delete all available slots in this date range? Booked slots will not be deleted."
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("booking_slots")
      .delete()
      .eq("is_booked", false)
      .gte("slot_date", deleteStartDate)
      .lte("slot_date", deleteEndDate);

    if (error) {
      alert("Could not delete slots: " + error.message);
      return;
    }

    alert("Available slots deleted successfully.");
    setDeleteStartDate("");
    setDeleteEndDate("");
    loadData();
  }

  async function cancelBookingAndFreeSlot(slotId: string, bookingId?: string) {
    const confirmCancel = confirm(
      "Cancel this booking and make the slot available again?"
    );
    if (!confirmCancel) return;

    if (bookingId) {
      await supabase
        .from("bookings")
        .update({
          status: "cancelled",
        })
        .eq("id", bookingId);
    }

    const { error } = await supabase
      .from("booking_slots")
      .update({
        is_booked: false,
      })
      .eq("id", slotId);

    if (error) {
      alert("Could not free slot: " + error.message);
      return;
    }

    loadData();
  }

  async function updateBookingStatus(id: string, status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (!error) loadData();
  }

  async function deleteMessage(id: string) {
    const confirmDelete = confirm("Delete this contact message?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (!error) loadData();
  }

  async function deleteBooking(id: string, slotId?: string | null) {
    const confirmDelete = confirm("Delete this booking?");
    if (!confirmDelete) return;

    await supabase.from("bookings").delete().eq("id", id);

    if (slotId) {
      await supabase
        .from("booking_slots")
        .update({ is_booked: false })
        .eq("id", slotId);
    }

    loadData();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const filteredMessages = messages.filter((msg) => {
    const search = searchTerm.toLowerCase();

    return (
      msg.full_name.toLowerCase().includes(search) ||
      msg.email.toLowerCase().includes(search) ||
      msg.message.toLowerCase().includes(search)
    );
  });

  const filteredBookings = bookings.filter((booking) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      booking.full_name.toLowerCase().includes(search) ||
      booking.email.toLowerCase().includes(search) ||
      (booking.phone || "").toLowerCase().includes(search) ||
      (booking.session_type || "").toLowerCase().includes(search) ||
      (booking.preferred_date || "").toLowerCase().includes(search) ||
      (booking.message || "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      (booking.status || "new").toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredRequests = requests.filter((request) => {
    const booking = getBookingForRequest(request.booking_id);
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      request.customer_email.toLowerCase().includes(search) ||
      request.request_type.toLowerCase().includes(search) ||
      (request.message || "").toLowerCase().includes(search) ||
      (request.admin_note || "").toLowerCase().includes(search) ||
      (booking?.full_name || "").toLowerCase().includes(search) ||
      (booking?.session_type || "").toLowerCase().includes(search);

    const matchesFilter =
      requestFilter === "all" ||
      request.status === requestFilter ||
      request.request_type === requestFilter;

    return matchesSearch && matchesFilter;
  });

  const filteredSlots = slots.filter((slot) => {
    if (slotFilter === "available") return !slot.is_booked;
    if (slotFilter === "booked") return slot.is_booked;
    if (slotFilter === "Intro Session") return slot.session_type === "Intro Session";
    if (slotFilter === "1-to-1 Support") return slot.session_type === "1-to-1 Support";
    if (slotFilter === "Group Session") return slot.session_type === "Group Session";

    return true;
  });

  const availableSlots = slots.filter((slot) => !slot.is_booked).length;
  const bookedSlots = slots.filter((slot) => slot.is_booked).length;
  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  ).length;
  const totalRevenue = bookings
    .filter((booking) => booking.payment_status === "paid")
    .reduce((sum, booking) => sum + Number(booking.session_price || 0), 0);

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-20 text-[#2B2B2B]">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-5xl font-bold text-[#D65A7A]">
              Admin Dashboard
            </h1>
            <p className="mt-4 text-lg">
              Manage contact messages, bookings, customer requests and available appointment slots.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#2B2B2B] px-5 py-3 font-medium text-white"
          >
            Logout
          </button>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-6">
          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {messages.length}
            </p>
            <p className="font-semibold text-[#2D6A73]">Messages</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {bookings.length}
            </p>
            <p className="font-semibold text-[#2D6A73]">Bookings</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {pendingRequests}
            </p>
            <p className="font-semibold text-[#2D6A73]">Pending Requests</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              {availableSlots}
            </p>
            <p className="font-semibold text-[#2D6A73]">Available Slots</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">{bookedSlots}</p>
            <p className="font-semibold text-[#2D6A73]">Booked Slots</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-5 text-center shadow-md">
            <p className="text-3xl font-bold text-[#D65A7A]">
              £{totalRevenue}
            </p>
            <p className="font-semibold text-[#2D6A73]">Total Revenue</p>
          </div>
        </div>

        <section className="mb-10 rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
          <h2 className="mb-2 text-3xl font-bold text-[#2D6A73]">
            Customer Requests
          </h2>

          <p className="mb-5 text-sm text-gray-600">
            Review reschedule and cancellation requests from customer dashboards.
          </p>

          <div className="mb-5">
            <select
              value={requestFilter}
              onChange={(e) => setRequestFilter(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="completed">Completed</option>
              <option value="reschedule">Reschedule Requests</option>
              <option value="cancel">Cancel Requests</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredRequests.length === 0 && !loading && (
              <p>No customer requests found.</p>
            )}

            {filteredRequests.map((request) => {
              const booking = getBookingForRequest(request.booking_id);

              return (
                <div
                  key={request.id}
                  className="rounded-2xl bg-[#FAF7F2]/80 p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold capitalize text-[#D65A7A]">
                        {request.request_type} Request
                      </p>
                      <p className="text-sm">{request.customer_email}</p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${requestStatusStyle(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {booking && (
                    <div className="mb-3 rounded-xl bg-white/80 p-3 text-sm">
                      <p>
                        <strong>Customer:</strong> {booking.full_name}
                      </p>
                      <p>
                        <strong>Session:</strong> {booking.session_type}
                      </p>
                      {booking.preferred_date && (
                        <p>
                          <strong>Date:</strong>{" "}
                          {formatDisplayDate(booking.preferred_date)}
                        </p>
                      )}
                      <p>
                        <strong>Booking Status:</strong>{" "}
                        {booking.status || "new"}
                      </p>
                      <p>
                        <strong>Payment:</strong>{" "}
                        {booking.payment_status || "unpaid"}
                      </p>
                    </div>
                  )}

                  <p className="mb-3">{request.message || "No message added."}</p>
                  <label className="mt-4 block">
  <span className="mb-2 block text-sm font-bold text-[#2D6A73]">
    Admin Note
  </span>

  <textarea
    rows={3}
    value={requestNotes[request.id] || ""}
    onChange={(e) =>
      setRequestNotes((prev) => ({
        ...prev,
        [request.id]: e.target.value,
      }))
    }
    placeholder="Add internal admin note..."
    className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 text-sm outline-none focus:border-[#D65A7A]"
  />
</label>

<button
  onClick={() => saveAdminNote(request.id)}
  className="mt-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#2D6A73]"
>
  Save Note
</button>

                  <p className="text-xs text-gray-500">Request ID: {request.id}</p>

                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(request.created_at).toLocaleString()}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {request.request_type === "cancel" && (
                      <button
                        onClick={() => approveCancelRequest(request)}
                        className="rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-700"
                      >
                        Approve Cancel
                      </button>
                    )}

                    <button
                      onClick={() => updateRequestStatus(request.id, "approved")}
                      className="rounded-lg bg-[#2D6A73] px-3 py-2 text-sm text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateRequestStatus(request.id, "completed")}
                      className="rounded-lg bg-[#D65A7A] px-3 py-2 text-sm text-white"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => updateRequestStatus(request.id, "declined")}
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
          <h2 className="mb-2 text-3xl font-bold text-[#2D6A73]">
            Slot Manager
          </h2>

          <p className="mb-6 text-sm text-gray-600">
            Create appointment slots for a single day, week, month or custom date range.
            Customers will only see available slots.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                Service Type
              </span>
              <select
                value={slotSessionType}
                onChange={(e) =>
                  handleServiceChange(
                    e.target.value as keyof typeof serviceDefaults
                  )
                }
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              >
                <option>Intro Session</option>
                <option>1-to-1 Support</option>
                <option>Group Session</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                Start Date
              </span>
              <input
                type="date"
                value={slotStartDate}
                onChange={(e) => setSlotStartDate(e.target.value)}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                End Date
              </span>
              <input
                type="date"
                value={slotEndDate}
                onChange={(e) => setSlotEndDate(e.target.value)}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                Start Time
              </span>
              <input
                type="time"
                value={slotStartTime}
                onChange={(e) => setSlotStartTime(e.target.value)}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                End Time
              </span>
              <input
                type="time"
                value={slotEndTime}
                onChange={(e) => setSlotEndTime(e.target.value)}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                Session Duration (minutes)
              </span>
              <input
                type="number"
                value={slotDuration}
                onChange={(e) => setSlotDuration(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                Break Between Sessions (minutes)
              </span>
              <input
                type="number"
                value={slotBreak}
                onChange={(e) => setSlotBreak(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-[#2D6A73]">
                Price (£)
              </span>
              <input
                type="number"
                value={slotPrice}
                onChange={(e) => setSlotPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />
            </label>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 font-bold text-[#2D6A73]">
              Choose Available Days
            </h3>

            <div className="flex flex-wrap gap-3">
              {days.map((day) => (
                <button
                  type="button"
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold ${
                    selectedDays.includes(day.value)
                      ? "bg-[#2D6A73] text-white"
                      : "bg-white text-[#2D6A73]"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateSlots}
            className="mt-6 rounded-xl bg-[#D65A7A] px-6 py-3 font-bold text-white"
          >
            Generate Available Slots
          </button>
        </section>

        <section className="mb-10 rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
          <h2 className="mb-5 text-3xl font-bold text-[#2D6A73]">
            Generated Slots
          </h2>

          <div className="mb-6 rounded-2xl bg-[#FAF7F2]/80 p-4">
            <h3 className="mb-3 font-bold text-[#2D6A73]">
              Bulk Delete Available Slots
            </h3>

            <div className="grid gap-3 md:grid-cols-3">
              <input
                type="date"
                value={deleteStartDate}
                onChange={(e) => setDeleteStartDate(e.target.value)}
                className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />

              <input
                type="date"
                value={deleteEndDate}
                onChange={(e) => setDeleteEndDate(e.target.value)}
                className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
              />

              <button
                onClick={deleteAvailableSlotsByDateRange}
                className="rounded-xl bg-red-100 px-4 py-3 font-bold text-red-600"
              >
                Delete Available Slots
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              This only deletes available slots. Booked slots will stay safe.
            </p>
          </div>

          <div className="mb-5">
            <select
              value={slotFilter}
              onChange={(e) => setSlotFilter(e.target.value)}
              className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
            >
              <option value="all">All Slots</option>
              <option value="available">Available Slots</option>
              <option value="booked">Booked Slots</option>
              <option value="Intro Session">Intro Session</option>
              <option value="1-to-1 Support">1-to-1 Support</option>
              <option value="Group Session">Group Session</option>
            </select>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredSlots.length === 0 && !loading && (
              <p>No matching slots found.</p>
            )}

            {filteredSlots.map((slot) => {
              const booking = slot.bookings?.find(
                (item) => item.status !== "cancelled"
              );

              return (
                <div
                  key={slot.id}
                  className={`rounded-2xl p-4 shadow-sm ${
                    slot.is_booked
                      ? "bg-red-50 border border-red-100"
                      : "bg-[#FAF7F2]/80"
                  }`}
                >
                  <p className="font-bold text-[#D65A7A]">
                    {slot.session_type}
                  </p>

                  <p>
                    <strong>Date:</strong> {formatDisplayDate(slot.slot_date)}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {formatDisplayTime(slot.start_time)} -{" "}
                    {formatDisplayTime(slot.end_time)}
                  </p>

                  <p>
                    <strong>Duration:</strong> {slot.duration_minutes} minutes
                  </p>

                  <p>
                    <strong>Price:</strong> £{slot.price}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {slot.is_booked ? (
                      <span className="font-bold text-red-600">Booked</span>
                    ) : (
                      <span className="font-bold text-green-600">Available</span>
                    )}
                  </p>

                  {slot.is_booked && booking && (
                    <div className="mt-3 rounded-xl bg-white p-3">
                      <p className="font-bold text-[#2D6A73]">
                        Booked Customer
                      </p>

                      <p>
                        <strong>Name:</strong> {booking.full_name}
                      </p>

                      <p>
                        <strong>Email:</strong> {booking.email}
                      </p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {booking.payment_status || "unpaid"}
                      </p>

                      <p>
                        <strong>Booking:</strong> {booking.status || "new"}
                      </p>

                      <button
                        onClick={() =>
                          cancelBookingAndFreeSlot(slot.id, booking.id)
                        }
                        className="mt-3 rounded-lg bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-700"
                      >
                        Cancel Booking & Free Slot
                      </button>
                    </div>
                  )}

                  {!slot.is_booked && (
                    <button
                      onClick={() => deleteSlot(slot.id)}
                      className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      Delete Slot
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="mb-10 grid gap-4 rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md md:grid-cols-2">
          <input
            type="text"
            placeholder="Search by name, email, session, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#E8DDD3] bg-white/80 p-3 outline-none focus:border-[#D65A7A]"
          >
            <option value="all">All booking statuses</option>
            <option value="new">New</option>
            <option value="pending_payment">Pending Payment</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading && (
          <p className="font-semibold text-[#2D6A73]">Loading data...</p>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-5 text-3xl font-bold text-[#2D6A73]">
              Contact Messages
            </h2>

            <div className="space-y-4">
              {filteredMessages.length === 0 && !loading && (
                <p>No matching contact messages.</p>
              )}

              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-2xl bg-[#FAF7F2]/80 p-5 shadow-sm"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#D65A7A]">
                        {msg.full_name}
                      </p>
                      <p className="text-sm">{msg.email}</p>
                    </div>

                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="mt-3">{msg.message}</p>

                  <p className="mt-3 text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="mb-5 text-3xl font-bold text-[#2D6A73]">
              Bookings
            </h2>

            <div className="space-y-4">
              {filteredBookings.length === 0 && !loading && (
                <p>No matching bookings.</p>
              )}

              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl bg-[#FAF7F2]/80 p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-bold text-[#D65A7A]">
                      {booking.full_name}
                    </p>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2D6A73]">
                      {booking.status || "new"}
                    </span>
                  </div>

                  <p className="text-sm">{booking.email}</p>

                  {booking.phone && (
                    <p className="text-sm">Phone: {booking.phone}</p>
                  )}

                  <p className="mt-3">
                    <strong>Session:</strong> {booking.session_type}
                  </p>

                  {booking.preferred_date && (
                    <p>
                      <strong>Date:</strong>{" "}
                      {formatDisplayDate(booking.preferred_date)}
                    </p>
                  )}

                  <p>
                    <strong>Payment:</strong>{" "}
                    {booking.payment_status || "unpaid"}
                  </p>

                  {booking.session_price && (
                    <p>
                      <strong>Price:</strong> £{booking.session_price}
                    </p>
                  )}

                  {booking.message && <p className="mt-3">{booking.message}</p>}

                  <p className="mt-3 text-xs text-gray-500">
                    {new Date(booking.created_at).toLocaleString()}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "confirmed")
                      }
                      className="rounded-lg bg-[#2D6A73] px-3 py-2 text-sm text-white"
                    >
                      Confirmed
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "completed")
                      }
                      className="rounded-lg bg-[#D65A7A] px-3 py-2 text-sm text-white"
                    >
                      Completed
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "cancelled")
                      }
                      className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-700"
                    >
                      Cancelled
                    </button>

                    <button
                      onClick={() => deleteBooking(booking.id, booking.slot_id)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}