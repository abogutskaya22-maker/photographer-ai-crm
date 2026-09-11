"use client";

import { useMemo, useState } from "react";
import { ChevronRight, MessageCircle, PawPrint, Sparkles, Target, WandSparkles, X } from "lucide-react";

type Mode = "today" | "money" | "content" | "leads";

const modeContent: Record<Mode, { title: string; text: string; action: string; note: string }> = {
  today: {
    title: "Що важливо сьогодні",
    text: "Олю, на сьогодні бачу 3 речі: зйомка о 16:00, follow-up Ірині та нагадування Олені про передоплату.",
    action: "Показати пріоритети",
    note: "Я б почав із Ірини — вона ще теплий лід 🐾",
  },
  money: {
    title: "Знайди гроші",
    text: "Є 3 ліди, які зникли після ціни, і 7 клієнтів, які давно не повертались. Тут є шанс на повторні бронювання без реклами.",
    action: "Підготувати follow-up",
    note: "Можу скласти мʼякі повідомлення без навʼязливості.",
  },
  content: {
    title: "Зроби контент",
    text: "З останніх зйомок можна зібрати Reel, карусель і 5 Stories. Я б сьогодні виклав backstage з love story.",
    action: "Зібрати контент-план",
    note: "Не чіпаю фото без дозволу на публікацію — коти теж поважають приватність 😼",
  },
  leads: {
    title: "Розбери ліди",
    text: "Найслабше місце зараз — заявки після питання про ціну. 3 з 12 лідів не отримали другого дотику.",
    action: "Розкласти по діях",
    note: "Можу показати, кому написати сьогодні, а кого краще не чіпати.",
  },
};

export default function MurketologWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("today");
  const [toast, setToast] = useState<string | null>(null);
  const active = useMemo(() => modeContent[mode], [mode]);

  const act = () => {
    setToast("Готово. Я підготував чернетку — далі потрібне підтвердження Олі 🐾");
    window.setTimeout(() => setToast(null), 3200);
  };

  return (
    <>
      {open && (
        <aside className="murketolog-panel" aria-label="Муркетолог">
          <div className="murketolog-head">
            <div className="murketolog-avatar"><PawPrint size={20} /></div>
            <div>
              <strong>Муркетолог 🐾</strong>
              <span>особистий помічник Олі</span>
            </div>
            <button className="murketolog-close" onClick={() => setOpen(false)} aria-label="Закрити"><X size={18} /></button>
          </div>

          <div className="murketolog-greeting">
            <span>мяу, я тут</span>
            <p>Слідкую, щоб не губились клієнти, дедлайни, гроші й контент. Сам нічого назовні не відправляю без твого підтвердження.</p>
          </div>

          <div className="murketolog-modes">
            <button className={mode === "today" ? "active" : ""} onClick={() => setMode("today")}><Sparkles size={15} /> Сьогодні</button>
            <button className={mode === "money" ? "active" : ""} onClick={() => setMode("money")}><Target size={15} /> Гроші</button>
            <button className={mode === "content" ? "active" : ""} onClick={() => setMode("content")}><WandSparkles size={15} /> Контент</button>
            <button className={mode === "leads" ? "active" : ""} onClick={() => setMode("leads")}><MessageCircle size={15} /> Ліди</button>
          </div>

          <div className="murketolog-card">
            <div className="murketolog-card-title"><span>Порада</span><PawPrint size={16} /></div>
            <h3>{active.title}</h3>
            <p>{active.text}</p>
            <div className="murketolog-note">{active.note}</div>
            <button className="murketolog-action" onClick={act}>{active.action}<ChevronRight size={16} /></button>
          </div>

          <div className="murketolog-mini-list">
            <div><b>2</b><span>клієнти потребують відповіді</span></div>
            <div><b>1</b><span>дедлайн фото близько</span></div>
            <div><b>3</b><span>ідеї для контенту готові</span></div>
          </div>

          {toast && <div className="murketolog-toast">{toast}</div>}
        </aside>
      )}

      <button className={`murketolog-fab ${open ? "open" : ""}`} onClick={() => setOpen(v => !v)} aria-label="Відкрити Муркетолога">
        <PawPrint size={22} />
        {!open && <span>Муркетолог</span>}
      </button>
    </>
  );
}
