"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CalendarDays, Camera, ChevronRight, Clock3, Plus, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type Client = { id: string; name: string; instagram_handle: string | null; phone: string | null };
type Shoot = {
  id: string;
  client_id: string | null;
  shoot_type: string | null;
  status: string;
  shoot_at: string | null;
  location: string | null;
  studio: string | null;
  price: number;
  deposit: number;
  deposit_paid: boolean;
  photo_due_at: string | null;
  created_at?: string;
};

const statusLabel: Record<string, string> = {
  lead: "Лід",
  planning: "Планування",
  waiting_deposit: "Очікує передоплату",
  booked: "Заброньовано",
  completed: "Зйомка проведена",
  editing: "Фото в роботі",
  delivered: "Фото віддано",
  cancelled: "Скасовано",
};

const money = (value: number) => `${Number(value || 0).toLocaleString("uk-UA")} ₴`;
const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("uk-UA", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value)) : "Дата не вказана";

export default function ClientBookingHistory() {
  const [session, setSession] = useState<Session | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [shootType, setShootType] = useState("Індивідуальна");
  const [shootAt, setShootAt] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [depositPaid, setDepositPaid] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  async function load() {
    if (!session) return;
    const [clientResult, shootResult] = await Promise.all([
      supabase.from("clients").select("id,name,instagram_handle,phone").order("name"),
      supabase.from("shoots").select("id,client_id,shoot_type,status,shoot_at,location,studio,price,deposit,deposit_paid,photo_due_at,created_at").order("shoot_at", { ascending: false, nullsFirst: false }),
    ]);
    const nextClients = (clientResult.data as Client[]) || [];
    setClients(nextClients);
    setShoots((shootResult.data as Shoot[]) || []);
    if (!selectedClientId && nextClients[0]) setSelectedClientId(nextClients[0].id);
  }

  useEffect(() => { if (session) load(); }, [session]);
  useEffect(() => { if (open && session) load(); }, [open]);

  const selectedClient = clients.find(c => c.id === selectedClientId) || null;
  const history = useMemo(() => shoots.filter(s => s.client_id === selectedClientId), [shoots, selectedClientId]);

  async function createShoot(e: FormEvent) {
    e.preventDefault();
    if (!session || !selectedClientId) return;
    setBusy(true);
    setError("");
    const numericDeposit = Number(deposit || 0);
    const { error: insertError } = await supabase.from("shoots").insert({
      user_id: session.user.id,
      client_id: selectedClientId,
      shoot_type: shootType,
      status: depositPaid || numericDeposit === 0 ? "booked" : "waiting_deposit",
      shoot_at: shootAt ? new Date(shootAt).toISOString() : null,
      location: place || null,
      price: Number(price || 0),
      deposit: numericDeposit,
      deposit_paid: depositPaid,
      content_consent: false,
    });
    setBusy(false);
    if (insertError) { setError(insertError.message); return; }
    setShootAt(""); setPlace(""); setPrice(""); setDeposit(""); setDepositPaid(false);
    setCreateOpen(false);
    await load();
  }

  if (!session) return null;

  return <>
    <button className="booking-history-fab" onClick={() => setOpen(v => !v)}>
      <CalendarDays size={18} />
      <span>Історія записів</span>
    </button>

    {open && <aside className="booking-history-panel">
      <div className="booking-history-head">
        <div><p className="eyebrow">Клієнти · зйомки</p><h2>Історія записів</h2></div>
        <button className="icon-button" onClick={() => setOpen(false)}><X size={18} /></button>
      </div>

      <label className="booking-client-select">Клієнт
        <select value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)}>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>

      {selectedClient ? <div className="booking-client-summary">
        <div className="avatar">{selectedClient.name[0]}</div>
        <div><strong>{selectedClient.name}</strong><span>{selectedClient.instagram_handle || selectedClient.phone || "Без контакту"}</span></div>
        <button className="primary compact" onClick={() => setCreateOpen(true)}><Plus size={15}/> Новий запис</button>
      </div> : <div className="empty-state">Спочатку додай клієнта.</div>}

      <div className="booking-history-list">
        {history.length ? history.map(s => <article className="booking-history-card" key={s.id}>
          <div className="booking-history-icon"><Camera size={17}/></div>
          <div className="booking-history-main">
            <div className="booking-history-title"><strong>{s.shoot_type || "Зйомка"}</strong><span className={`booking-status ${s.status}`}>{statusLabel[s.status] || s.status}</span></div>
            <span><Clock3 size={13}/> {formatDate(s.shoot_at)}</span>
            <span>{s.studio || s.location || "Локація не вказана"}</span>
            <div className="booking-history-money"><b>{money(s.price)}</b><span>передоплата {money(s.deposit)} {s.deposit_paid ? "✓" : ""}</span></div>
          </div>
          <ChevronRight size={17} />
        </article>) : selectedClient && <div className="empty-state">У цього клієнта ще немає записів. Натисни «Новий запис».</div>}
      </div>
    </aside>}

    {createOpen && <div className="crm-modal-backdrop" onMouseDown={() => setCreateOpen(false)}>
      <form className="crm-modal" onSubmit={createShoot} onMouseDown={e => e.stopPropagation()}>
        <div className="crm-modal-head"><div><p className="eyebrow">Новий запис</p><h2>{selectedClient?.name}</h2></div><button type="button" className="icon-button" onClick={() => setCreateOpen(false)}><X size={18}/></button></div>
        <div className="form-grid">
          <label>Тип зйомки<select value={shootType} onChange={e => setShootType(e.target.value)}><option>Індивідуальна</option><option>Love story</option><option>Сімейна</option><option>Вагітність</option><option>Дитяча</option><option>Контент</option><option>Інша</option></select></label>
          <label>Дата й час<input type="datetime-local" required value={shootAt} onChange={e => setShootAt(e.target.value)}/></label>
          <label className="full">Студія / локація<input value={place} onChange={e => setPlace(e.target.value)} placeholder="Studio 12 · Loft / парк / адреса"/></label>
          <label>Вартість<input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} placeholder="3000"/></label>
          <label>Передоплата<input type="number" min="0" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="1000"/></label>
          <label className="check-label full"><input type="checkbox" checked={depositPaid} onChange={e => setDepositPaid(e.target.checked)}/> Передоплату вже отримано</label>
        </div>
        {error && <div className="auth-message">{error}</div>}
        <div className="modal-actions"><button type="button" className="secondary" onClick={() => setCreateOpen(false)}>Скасувати</button><button className="primary" disabled={busy}>{busy ? "Зберігаю…" : "Створити запис"}</button></div>
      </form>
    </div>}
  </>;
}
