"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { gallery } from "../data/site";

/*
  Activity photos, laid out like a photo app on a MacBook: albums in a sidebar,
  a thumbnail grid, and an enlarged view with previous / next. Photos and albums
  come from `gallery` in data/site.js, so adding one is a single line there.
*/
export default function Gallery({ album: wanted }) {
    const { t } = useLanguage();
    const x = t.experience;
    const [album, setAlbum] = useState("all");
    const [open, setOpen] = useState(-1);

    // Activity cards elsewhere can ask for an album to be shown.
    useEffect(() => {
        if (wanted) setAlbum(wanted.key);
    }, [wanted]);

    const albums = useMemo(() => Object.entries(x.albums).map(([key, name]) => ({ key, name, count: gallery.filter((p) => p.album === key).length })), [x.albums]);
    const photos = useMemo(() => (album === "all" ? gallery : gallery.filter((p) => p.album === album)), [album]);
    const current = photos[open];

    const step = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length]);

    useEffect(() => {
        if (open < 0) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(-1);
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, step]);

    const albumName = album === "all" ? x.allPhotos : x.albums[album];

    return (
        <div className="gallery-wrap" data-reveal="up">
            <div className="laptop gallery-laptop">
                <div className="laptop-lid">
                    <i className="laptop-notch" aria-hidden="true" />
                    <div className="laptop-screen gallery-screen">
                        <div className="gal-app">
                            <div className="gal-bar">
                                <span className="gal-lights" aria-hidden="true">
                                    <i />
                                    <i />
                                    <i />
                                </span>
                                <b>{x.galleryTitle}</b>
                                <span className="gal-count">
                                    {photos.length} {x.photos}
                                </span>
                            </div>
                            <div className="gal-body">
                                <nav className="gal-side" aria-label={x.albumsLabel}>
                                    <p>{x.albumsLabel}</p>
                                    <button type="button" aria-pressed={album === "all"} onClick={() => (setAlbum("all"), setOpen(-1))}>
                                        <Images size={14} aria-hidden="true" />
                                        <span>{x.allPhotos}</span>
                                        <small>{gallery.length}</small>
                                    </button>
                                    {albums.map((a) => (
                                        <button key={a.key} type="button" aria-pressed={album === a.key} onClick={() => (setAlbum(a.key), setOpen(-1))}>
                                            <i className="gal-dot" aria-hidden="true" />
                                            <span>{a.name}</span>
                                            <small>{a.count}</small>
                                        </button>
                                    ))}
                                </nav>
                                <div className="gal-main" data-lenis-prevent>
                                    <h4>{albumName}</h4>
                                    <ul className="gal-grid">
                                        {photos.map((p, i) => (
                                            <li key={p.src}>
                                                <button type="button" onClick={() => setOpen(i)} data-cursor={t.ui.view} aria-label={p.caption}>
                                                    <img src={p.src} alt="" width={p.w} height={p.h} loading="lazy" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="gal-hint">{x.galleryIntro}</p>
                                </div>
                                {current && (
                                    <div className="gal-view" role="dialog" aria-modal="true" aria-label={current.caption}>
                                        <button type="button" className="gal-close" onClick={() => setOpen(-1)} aria-label={x.closePhoto} autoFocus>
                                            <X size={16} />
                                        </button>
                                        <figure>
                                            <img key={current.src} src={current.src} alt={current.caption} width={current.w} height={current.h} />
                                            <figcaption>
                                                <b>{current.caption}</b>
                                                <span>
                                                    {x.albums[current.album]} · {open + 1} / {photos.length}
                                                </span>
                                            </figcaption>
                                        </figure>
                                        {photos.length > 1 && (
                                            <>
                                                <button type="button" className="gal-nav gal-prev" onClick={() => step(-1)} aria-label={x.prev}>
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button type="button" className="gal-nav gal-next" onClick={() => step(1)} aria-label={x.next}>
                                                    <ChevronRight size={20} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="laptop-base" aria-hidden="true">
                    <i />
                </div>
            </div>
        </div>
    );
}
