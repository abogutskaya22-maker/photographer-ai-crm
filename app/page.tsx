"use client";

import {
  BarChart3,
  Bell,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FolderOpen,
  Heart,
  Image as ImageIcon,
  Instagram,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Target,
  UserRound,
  Users,
  WandSparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Section = "dashboard" | "clients" | "calendar" | "shoots" | "content" | "finance" | "analytics";

type Client = {
  name: string;
  handle: string;
  type: string;
  date: string;
  price: string;
  status: "Нове звернення" | "Очікує передоплату" | "Заброньовано" | "Фото в роботі" | "Завершено";
};

const clients: Client[] = [
  { name: "Марія Коваль", handle: "@mari.koval", type: "Сімейна", date: "14 вересня", price: "4 500 ₴", status: "Заброньовано" },
  { name: "Анна + Максим", handle: "@ann.and.max", type: "Love story", date: "11 вересня", price: "3 500 ₴", status: "Фото в роботі" },
  { name: "Олена Романюк", handle: "@olenarom", type: "Індивідуальна", date: "18 вересня", price: "3 000 ₴", status: "Очікує передоплату" },
  { name: "Ірина Савчук", handle: "@irynasav", type: "Сімейна", date: "—", price: "—", status: "Нове звернення" },
  { name: "Катерина Лисенко", handle: "@katya.ly", type: "Контент", date: "6 вересня", price: "5 500 ₴", status: "Завершено" },
];

const nav = [
  { id: "dashboard" as Section, label: "Головна", icon: LayoutDashboard },
  { id: "clients" as Section, label: "Клієнти", icon: Users },
  { id: "calendar" as Section, label: "Календар", icon: CalendarDays },
  { id: "shoots" as Section, label: "Зйомки", icon: Camera },
  { id: "content" as Section, label: "Контент + AI", icon: WandSparkles },
  { id: "finance" as Section, label: "Фінанси", icon: CircleDollarSign },
  { id: "analytics" as Section, label: "Аналітика", icon: BarChart3 },
];

const statusClass: Record<Client["status"], string> = {
  "Нове звернення": "status new",
  "Очікує передоплату": "status waiting",
  "Заброньовано": "status booked",
  "Фото в роботі": "status work",
  "Завершено": "status done",
};

function StatCard({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: React.ElementType }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={19} /></div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Пʼятниця, 11 вересня</p>
          <h1>Доброго ранку, Настю 👋</h1>
          <p className="muted">У тебе сьогодні 1 зйомка і 5 важливих справ.</p>
        </div>
        <button className="primary"><Plus size={17} /> Додати клієнта</button>
      </div>

      <div className="stats-grid">
        <StatCard label="Заявки цього місяця" value="12" sub="+4 до серпня" icon={MessageCircle} />
        <StatCard label="Бронювання" value="5" sub="42% конверсія" icon={CalendarDays} />
        <StatCard label="Дохід у вересні" value="21 500 ₴" sub="5 оплачених зйомок" icon={CircleDollarSign} />
        <StatCard label="Контент на тиждень" value="6 / 9" sub="3 публікації лишилось" icon={Instagram} />
      </div>

      <div className="dashboard-grid">
        <section className="panel day-panel">
          <div className="panel-title">
            <div><span className="mini-icon"><Clock3 size={16} /></span><h2>Сьогодні</h2></div>
            <span className="soft-pill">5 справ</span>
          </div>
          <div className="agenda">
            <div className="agenda-item accent-item">
              <div className="time">16:00</div>
              <div className="agenda-copy"><strong>Love story — Анна + Максим</strong><span>Studio 12 · зал Loft</span></div>
              <button className="icon-button"><ChevronRight size={18} /></button>
            </div>
            <div className="agenda-item">
              <div className="task-check"><Check size={14} /></div>
              <div className="agenda-copy"><strong>Написати Ірині після запиту</strong><span>Звернулась через Instagram учора</span></div>
              <span className="urgent">до 12:00</span>
            </div>
            <div className="agenda-item">
              <div className="task-check"><ImageIcon size={14} /></div>
              <div className="agenda-copy"><strong>Фото Марії — дедлайн через 2 дні</strong><span>Сімейна зйомка · 84 фото</span></div>
              <span className="soft-pill">13 вер.</span>
            </div>
            <div className="agenda-item">
              <div className="task-check"><CircleDollarSign size={14} /></div>
              <div className="agenda-copy"><strong>Нагадати Олені про передоплату</strong><span>Бронювання на 18 вересня</span></div>
              <button className="text-action">Написати</button>
            </div>
          </div>
        </section>

        <section className="panel ai-card">
          <div className="ai-head">
            <div className="ai-orb"><Sparkles size={20} /></div>
            <div><p className="eyebrow">AI-помічник</p><h2>Я вже дещо підготував</h2></div>
          </div>
          <p className="ai-copy">У тебе є готові фото з трьох останніх зйомок. На їх основі я склав контент-план до неділі.</p>
          <div className="ai-suggestions">
            <div><Instagram size={17} /><span><strong>Instagram</strong>Карусель: «Як підготуватись до сімейної зйомки»</span></div>
            <div><Target size={17} /><span><strong>Reel</strong>Backstage + 3 підказки для позування</span></div>
            <div><MessageCircle size={17} /><span><strong>Stories</strong>5 сторіс із відгуком та CTA на вересень</span></div>
          </div>
          <button className="ai-button">Відкрити контент-план <ChevronRight size={16} /></button>
        </section>
      </div>

      <div className="dashboard-grid lower-grid">
        <section className="panel">
          <div className="panel-title"><div><span className="mini-icon"><Users size={16} /></span><h2>Потребують уваги</h2></div><button className="text-action">Усі клієнти</button></div>
          <div className="attention-list">
            {clients.slice(2, 5).map((client) => (
              <div className="client-row" key={client.handle}>
                <div className="avatar">{client.name[0]}</div>
                <div className="client-main"><strong>{client.name}</strong><span>{client.type} · {client.handle}</span></div>
                <span className={statusClass[client.status]}>{client.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel focus-card">
          <div className="panel-title"><div><span className="mini-icon"><Target size={16} /></span><h2>Фокус місяця</h2></div></div>
          <div className="goal-number"><strong>5 / 8</strong><span>бронювань</span></div>
          <div className="progress"><div style={{ width: "62.5%" }} /></div>
          <p>Ще <strong>3 бронювання</strong> — і ціль вересня виконана.</p>
          <div className="hint"><Sparkles size={16} /><span>AI радить просувати сімейні зйомки: вони дали 60% бронювань за останні 30 днів.</span></div>
        </section>
      </div>
    </>
  );
}

function Clients() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => clients.filter(c => `${c.name} ${c.handle} ${c.type}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">CRM</p><h1>Клієнти</h1><p className="muted">Уся історія взаємодії, бронювання і повторні продажі — в одному місці.</p></div><button className="primary"><Plus size={17}/> Новий клієнт</button></div>
      <div className="toolbar"><div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Пошук за імʼям, Instagram або типом зйомки" /></div><button className="secondary">Фільтри</button></div>
      <section className="panel table-panel">
        <div className="table-head"><span>Клієнт</span><span>Зйомка</span><span>Дата</span><span>Сума</span><span>Статус</span></div>
        {filtered.map(client => <div className="table-row" key={client.handle}><div className="client-cell"><div className="avatar">{client.name[0]}</div><div><strong>{client.name}</strong><span>{client.handle}</span></div></div><span>{client.type}</span><span>{client.date}</span><strong>{client.price}</strong><span className={statusClass[client.status]}>{client.status}</span></div>)}
      </section>
      <div className="mini-grid">
        <section className="panel small-card"><p className="eyebrow">Повторні продажі</p><h3>7 клієнтів давно не повертались</h3><p>AI може підготувати персональні повідомлення з осінньою пропозицією.</p><button className="ai-button">Підготувати повідомлення</button></section>
        <section className="panel small-card"><p className="eyebrow">Втрачений попит</p><h3>3 ліди зникли після ціни</h3><p>Запусти мʼякий follow-up через 2–3 дні замість того, щоб втрачати заявку.</p><button className="secondary">Переглянути</button></section>
      </div>
    </>
  );
}

function Calendar() {
  const days = ["Пн 7", "Вт 8", "Ср 9", "Чт 10", "Пт 11", "Сб 12", "Нд 13"];
  return <><div className="page-heading"><div><p className="eyebrow">Розклад</p><h1>Календар</h1><p className="muted">Зйомки, дедлайни віддачі фото та нагадування.</p></div><button className="primary"><Plus size={17}/> Додати подію</button></div>
  <section className="panel calendar-panel"><div className="calendar-week">{days.map((d,i)=><div className={i===4?"calendar-day today":"calendar-day"} key={d}><strong>{d}</strong><div className="day-space">{i===4&&<div className="event shoot"><small>16:00</small><b>Love story</b><span>Анна + Максим</span></div>}{i===6&&<div className="event deadline"><small>18:00</small><b>Дедлайн фото</b><span>Марія Коваль</span></div>}{i===2&&<div className="event content"><small>12:30</small><b>Instagram</b><span>Карусель</span></div>}</div></div>)}</div></section>
  <div className="mini-grid"><section className="panel small-card"><h3>Автоматичні нагадування</h3><p>За 24 години до зйомки клієнт отримує нагадування про час, локацію, образи та залишок оплати.</p><div className="toggle-row"><span>Нагадування увімкнені</span><span className="toggle on"></span></div></section><section className="panel small-card"><h3>Дедлайни фото</h3><p>CRM автоматично ставить дедлайн +10 днів після зйомки і попереджає за 3 та 1 день.</p><div className="toggle-row"><span>Контроль дедлайнів</span><span className="toggle on"></span></div></section></div></>;
}

function Shoots() {
  return <><div className="page-heading"><div><p className="eyebrow">Проєкти</p><h1>Зйомки</h1><p className="muted">Підготовка, файли, дедлайн і дозвіл на публікацію.</p></div><button className="primary"><Plus size={17}/> Нова зйомка</button></div>
  <div className="shoot-grid">{clients.filter(c=>c.date!=="—").slice(0,4).map((c,i)=><section className="shoot-card" key={c.handle}><div className={`shoot-cover cover-${i+1}`}><Camera size={25}/><span>{c.type}</span></div><div className="shoot-body"><div><strong>{c.name}</strong><span>{c.date}</span></div><div className="shoot-meta"><span><FolderOpen size={15}/> Google Drive</span><span><ImageIcon size={15}/> {62+i*11} фото</span></div><div className="permission"><span>Дозвіл на контент</span><b>{i===1?"Ні":"Так"}</b></div><button className="secondary full">Відкрити зйомку</button></div></section>)}</div></>;
}

function Content() {
  return <><div className="page-heading"><div><p className="eyebrow">Мій контент-менеджер</p><h1>Контент + AI</h1><p className="muted">AI перетворює готові зйомки на регулярний Instagram і TikTok без щоденного «що постити?».</p></div><button className="primary"><Sparkles size={17}/> Створити контент</button></div>
  <section className="panel content-ai-hero"><div><span className="ai-badge"><Sparkles size={15}/> AI Content Manager</span><h2>На цьому тижні є 3 вільні слоти для контенту</h2><p>Я переглянув доступні зйомки з дозволом на публікацію і підібрав контент під твою ціль — більше бронювань сімейних фотосесій.</p><div className="hero-actions"><button className="ai-button">Згенерувати тиждень</button><button className="secondary">Змінити ціль</button></div></div><div className="content-score"><span>Регулярність</span><strong>67%</strong><div className="progress"><div style={{width:"67%"}}/></div><small>6 з 9 запланованих виходів</small></div></section>
  <div className="content-columns"><div className="content-column"><div className="column-title"><span>Ідеї</span><b>3</b></div><ContentCard kind="REEL" title="3 підказки для позування" shoot="Love story · Анна + Максим"/><ContentCard kind="POST" title="Як обрати образ на сімейну зйомку" shoot="Сімейна · Марія"/></div><div className="content-column"><div className="column-title"><span>Чернетки</span><b>2</b></div><ContentCard kind="STORIES" title="Backstage + відгук" shoot="Контент-зйомка · Катерина"/><ContentCard kind="TIKTOK" title="До / після: магія світла" shoot="Індивідуальна · Олена"/></div><div className="content-column"><div className="column-title"><span>Заплановано</span><b>2</b></div><ContentCard kind="POST" title="5 причин не боятись фотосесії" shoot="Сьогодні · 18:30"/><ContentCard kind="REEL" title="Осінні локації міста" shoot="Неділя · 11:00"/></div></div>
  <div className="mini-grid"><section className="panel small-card"><h3>Сховище фото</h3><p>Підключення Google Drive / Dropbox. AI бачить лише папки, де є дозвіл на використання контенту.</p><button className="secondary">Підключити сховище</button></section><section className="panel small-card"><h3>Instagram + TikTok</h3><p>Планування публікацій, статуси, CTA та відстеження того, який контент приводить заявки.</p><button className="secondary">Підключити соцмережі</button></section></div></>;
}

function ContentCard({kind,title,shoot}:{kind:string;title:string;shoot:string}) { return <div className="content-card"><div className="content-thumb"><ImageIcon size={20}/></div><span className="format">{kind}</span><strong>{title}</strong><small>{shoot}</small><div className="content-actions"><button><Sparkles size={14}/> AI текст</button><button><ChevronRight size={15}/></button></div></div> }

function Finance() {
 return <><div className="page-heading"><div><p className="eyebrow">Гроші</p><h1>Фінанси</h1><p className="muted">Проста фінансова картина без бухгалтерського перевантаження.</p></div><button className="primary"><Plus size={17}/> Додати платіж</button></div><div className="stats-grid"><StatCard label="Дохід вересня" value="21 500 ₴" sub="+18% до серпня" icon={CircleDollarSign}/><StatCard label="Передоплати" value="6 500 ₴" sub="3 активні бронювання" icon={Check}/><StatCard label="Середній чек" value="4 300 ₴" sub="ціль: 5 000 ₴" icon={Target}/><StatCard label="Очікується" value="9 500 ₴" sub="до кінця місяця" icon={Clock3}/></div><div className="dashboard-grid"><section className="panel"><div className="panel-title"><div><h2>Останні платежі</h2></div></div>{clients.slice(0,4).map(c=><div className="payment-row" key={c.handle}><div className="avatar">{c.name[0]}</div><div><strong>{c.name}</strong><span>{c.type}</span></div><strong>{c.price}</strong></div>)}</section><section className="panel focus-card"><p className="eyebrow">План вересня</p><div className="goal-number"><strong>21 500 / 35 000 ₴</strong></div><div className="progress"><div style={{width:"61%"}}/></div><p>До цілі лишилось <strong>13 500 ₴</strong>.</p><div className="hint"><Sparkles size={16}/><span>Щоб виконати план із поточним середнім чеком, потрібно ще приблизно 3 бронювання.</span></div></section></div></>;
}

function Analytics() {
 return <><div className="page-heading"><div><p className="eyebrow">Зростання</p><h1>Аналітика</h1><p className="muted">Звідки приходять клієнти, що продається і де губляться заявки.</p></div></div><div className="stats-grid"><StatCard label="Конверсія в бронювання" value="42%" sub="5 з 12 заявок" icon={Target}/><StatCard label="Instagram" value="58%" sub="головне джерело" icon={Instagram}/><StatCard label="Рекомендації" value="33%" sub="4 заявки" icon={Heart}/><StatCard label="Втрачено після ціни" value="3" sub="25% звернень" icon={UserRound}/></div><div className="dashboard-grid"><section className="panel"><h2>Джерела заявок</h2><div className="bars"><Bar label="Instagram" value={58}/><Bar label="Рекомендації" value={33}/><Bar label="Інше" value={9}/></div></section><section className="panel"><h2>Попит за типом зйомки</h2><div className="bars"><Bar label="Сімейна" value={60}/><Bar label="Love story" value={25}/><Bar label="Індивідуальна" value={15}/></div></section></div><section className="panel insight-panel"><div className="ai-orb"><Sparkles size={20}/></div><div><p className="eyebrow">AI-висновок</p><h3>Найбільша точка росту зараз — не більше охоплень, а follow-up.</h3><p>3 з 12 лідів зникли після питання про ціну. Автоматичне мʼяке нагадування через 48 годин може повернути частину цих людей без додаткових витрат на рекламу.</p></div><button className="ai-button">Налаштувати follow-up</button></section></>;
}

function Bar({label,value}:{label:string;value:number}) { return <div className="bar-row"><div><span>{label}</span><b>{value}%</b></div><div className="bar-track"><div style={{width:`${value}%`}}/></div></div> }

export default function Home() {
  const [section, setSection] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = nav.find(n=>n.id===section)?.label;
  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen?"open":""}`}>
        <div className="brand"><div className="brand-mark"><Camera size={20}/></div><div><strong>FrameFlow</strong><span>photographer workspace</span></div></div>
        <button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={20}/></button>
        <nav>{nav.map(item => { const Icon=item.icon; return <button key={item.id} className={section===item.id?"nav-item active":"nav-item"} onClick={()=>{setSection(item.id);setMobileOpen(false)}}><Icon size={18}/><span>{item.label}</span>{item.id==="content"&&<em>AI</em>}</button>})}</nav>
        <div className="sidebar-bottom"><div className="storage-card"><FolderOpen size={17}/><div><strong>Сховище фото</strong><span>Google Drive не підключено</span></div><ChevronRight size={16}/></div><div className="profile"><div className="profile-avatar">Н</div><div><strong>Настя</strong><span>Фотограф</span></div><button>•••</button></div></div>
      </aside>
      {mobileOpen&&<div className="overlay" onClick={()=>setMobileOpen(false)}/>} 
      <div className="workspace">
        <header className="topbar"><button className="menu-button" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button><span className="top-title">{current}</span><div className="top-actions"><button className="icon-button"><Search size={18}/></button><button className="icon-button notification"><Bell size={18}/><i/></button><button className="quick-add"><Plus size={17}/> Швидка дія</button></div></header>
        <div className="page-content">
          {section==="dashboard"&&<Dashboard/>}
          {section==="clients"&&<Clients/>}
          {section==="calendar"&&<Calendar/>}
          {section==="shoots"&&<Shoots/>}
          {section==="content"&&<Content/>}
          {section==="finance"&&<Finance/>}
          {section==="analytics"&&<Analytics/>}
        </div>
      </div>
    </main>
  );
}
