"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useLanguage } from "../context/LanguageContext";
import { reducedMotion } from "../lib/motion";
import { appShots } from "../data/site";
import { Laptop, Phone } from "./Devices";
import { Label, Words } from "./ui";

const PHONE_MS = 3400;

export default function Apps() {
    const { t } = useLanguage();
    const a = t.apps;
    const [active, setActive] = useState(0);
    const [phone, setPhone] = useState(0);
    const [laptop, setLaptop] = useState(0);
    const [auto, setAuto] = useState(true);
    const [inView, setInView] = useState(false);
    const stage = useRef(null);
    const devices = useRef(null);

    const app = a.items[active];
    const shots = appShots[app.key];

    const pickApp = (i) => {
        setActive(i);
        setPhone(0);
        setLaptop(0);
        setAuto(true);
    };

    // Other sections can open a specific app: window.dispatchEvent(new CustomEvent("apps:open", { detail: "kinetz" }))
    useEffect(() => {
        const open = (e) => {
            const i = a.items.findIndex((item) => item.key === e.detail);
            if (i > -1) pickApp(i);
        };
        window.addEventListener("apps:open", open);
        return () => window.removeEventListener("apps:open", open);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Screens advance on their own while the section is on screen, until the visitor picks one.
    useEffect(() => {
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
        io.observe(stage.current);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        if (!auto || !inView || reducedMotion()) return;
        let tick = 0;
        const id = window.setInterval(() => {
            tick++;
            setPhone((p) => (p + 1) % shots.phone.length);
            if (tick % 2 === 0) setLaptop((l) => (l + 1) % shots.laptop.length);
        }, PHONE_MS);
        return () => window.clearInterval(id);
    }, [auto, inView, shots]);

    // Switching apps: the devices swing in.
    useEffect(() => {
        const root = devices.current;
        if (!root || reducedMotion()) return;
        animate(root.querySelector(".laptop"), { opacity: [0, 1], y: [36, 0], rotateY: [-10, 0], duration: 900, ease: "outExpo" });
        animate(root.querySelector(".phone"), { opacity: [0, 1], y: [70, 0], rotateZ: [-7, 0], duration: 1000, delay: 120, ease: "outExpo" });
    }, [active]);

    // The pair tilts a little toward the pointer.
    const tilt = (e) => {
        if (e.pointerType === "touch" || reducedMotion()) return;
        const r = stage.current.getBoundingClientRect();
        devices.current.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 9}deg`);
        devices.current.style.setProperty("--rx", `${(0.5 - (e.clientY - r.top) / r.height) * 7}deg`);
    };
    const untilt = () => {
        devices.current.style.setProperty("--ry", "0deg");
        devices.current.style.setProperty("--rx", "0deg");
    };

    const openDeck = () => window.dispatchEvent(new CustomEvent("viewer:open", { detail: "pos" }));

    return (
        <section id="proyek" className="dark apps" data-scene="apps">
            <div className="container">
                <Label>{a.title}</Label>
                <div className="split-head">
                    <h2 className="h2" data-words>
                        <Words text={a.heading} />
                    </h2>
                    <p className="muted" data-reveal="up">
                        {a.note}
                    </p>
                </div>

                <div className="apps-tabs" role="tablist" aria-label={a.title} data-reveal="up">
                    {a.items.map((item, i) => (
                        <button key={item.key} type="button" role="tab" aria-selected={active === i} className="apps-tab" onClick={() => pickApp(i)}>
                            <small>0{i + 1}</small>
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="apps-grid" role="tabpanel">
                    <div className="apps-copy" data-reveal="up">
                        <h3>{app.name}</h3>
                        <p className="apps-tagline">{app.tagline}</p>
                        <dl className="apps-facts">
                            {app.facts.map(([value, label]) => (
                                <div key={label} className="glass">
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                </div>
                            ))}
                        </dl>
                        <ul className="apps-points">
                            {app.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                        {app.note && <p className="apps-note">{app.note}</p>}
                        <p className="apps-stack mono">{app.stack}</p>
                        {app.key === "pos" && (
                            <p>
                                <a className="text-link" href="#dokumen" onClick={openDeck}>
                                    {a.deck} ↓
                                </a>
                            </p>
                        )}
                    </div>

                    <div className="apps-stage" ref={stage} onPointerMove={tilt} onPointerLeave={untilt} data-reveal="scale">
                        <div className="apps-devices" ref={devices}>
                            <Laptop src={`/apps/${app.key}/laptop-${shots.laptop[laptop]}.webp`} alt={`${app.name}: ${app.laptop[laptop]}`} />
                            <Phone src={`/apps/${app.key}/phone-${shots.phone[phone]}.webp`} alt={`${app.name}: ${app.phone[phone]}`} bar={shots.bar} dark={shots.dark} />
                        </div>
                        <div className="apps-picks">
                            <div>
                                <span>{a.phoneLabel}</span>
                                {app.phone.map((label, i) => (
                                    <button key={label} type="button" className="chip" aria-pressed={phone === i} onClick={() => (setAuto(false), setPhone(i))}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <span>{a.laptopLabel}</span>
                                {app.laptop.map((label, i) => (
                                    <button key={label} type="button" className="chip" aria-pressed={laptop === i} onClick={() => (setAuto(false), setLaptop(i))}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* The one CV project that is analysis rather than an app */}
                <div className="apps-analytics glass spot" data-reveal="up">
                    <p className="label">{a.analyticsTitle}</p>
                    <div>
                        <h3>
                            {a.analytics.name} <small>{a.analytics.period}</small>
                        </h3>
                        <p>{a.analytics.text}</p>
                    </div>
                    <a className="text-link" href="#dokumen" onClick={() => window.dispatchEvent(new CustomEvent("viewer:open", { detail: "superstore" }))}>
                        {a.analytics.link} ↓
                    </a>
                </div>
            </div>
        </section>
    );
}
