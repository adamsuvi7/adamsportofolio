# Adam Suvi · Data Analyst portfolio

Source for [adamsportofolio.netlify.app](https://adamsportofolio.netlify.app), the portfolio of Adam Suvi, S.Si., C.DA.
The site is bilingual (Indonesian by default, English on toggle) and its content follows the latest CV.

## What is on the page

| Section | Content |
|---|---|
| Hero | Name, role, key figures from the CV, and an interactive 3D chart |
| Profil | Summary, portrait, location, education, certification, languages |
| Keahlian | Tools with their logos, grouped as in the CV, plus analysis methods |
| Proyek | Four CV projects, each with an animated chart, and an index of earlier work |
| Pengalaman | Work history, leadership roles, other activities |
| Kredensial | BNSP certificate (flips front/back), education, certifications, 19 course certificates |
| Kontak | Email, WhatsApp, LinkedIn, GitHub, Instagram |

## Stack

- Next.js 14 (App Router, static export) and React 18
- Three.js for the 3D bar field in the hero (`app/components/HeroScene.jsx`)
- anime.js v4 for all animation: the bar morphing, scroll reveals, SVG chart drawing, counters (`app/lib/motion.js`)
- Tailwind CSS
- Fonts are self-hosted through Fontsource: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono
- Deployed on Netlify (`netlify.toml`: `npm run build`, publish `out/`)

## Palette

| Name | Hex | Used for |
|---|---|---|
| Electric Lavender | `#9B6CFF` | Accent, highlights, data peaks |
| Deep Trust | `#14123A` | Text and dark sections |
| Frosted Periwinkle | `#C7CEFF` | Surfaces, borders, glass cards |
| Airy Calm | `#F3F5FF` | Page background |

The full scales are in `tailwind.config.js`.

## Editing content

| To change | Edit |
|---|---|
| Any text, in either language | `app/data/content.js` |
| Email, phone, social links, CV file, project links | `app/data/site.js` |
| Tool logos | `public/logos/` and the `tools` map in `app/data/site.js` |
| Course certificates | `public/certificates/` (PDF), `public/certificates/thumbs/` (preview), and `courseCertificates` in `app/data/site.js` |
| The CV behind the download button | `public/Adam_Suvi_CV_Data_Analyst.pdf` |

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. `npm run build` writes the static site to `out/`.

## Structure

```
app/
├── components/
│   ├── Hero.jsx          # name, figures, chart controls
│   ├── HeroScene.jsx     # Three.js bar field driven by anime.js
│   ├── About.jsx
│   ├── Skills.jsx        # tool cards with logos
│   ├── Projects.jsx
│   ├── ProjectViz.jsx    # one SVG chart per project
│   ├── Experience.jsx
│   ├── Credentials.jsx
│   ├── Contact.jsx
│   ├── Navbar.jsx, Footer.jsx, LanguageToggle.jsx, SectionHead.jsx
├── context/LanguageContext.js
├── data/                 # content.js, site.js, brandPaths.js
├── lib/motion.js         # scroll reveal, chart drawing, counters, tilt
├── layout.js, page.jsx, globals.css
public/                   # images, logos, certificates, CV
```

## Credits

Tool logos come from the Iconify `logos` and `vscode-icons` sets and Simple Icons. They are trademarks of their owners and are shown only to name the tools used.
