# Adam Suvi · Data Analyst portfolio

Source for [adamsportofolio.netlify.app](https://adamsportofolio.netlify.app), the portfolio of Adam Suvi, S.Si., C.DA.
The site is one page, bilingual (Indonesian by default, English on toggle), and its content follows the latest CV.

## How the page works

A single 3D stage sits fixed behind the whole page. Its model is a block of data: a slab carrying a grid of bars.
As you scroll, the model glides to a new pose for each section and reshapes its bars into a different dataset
(sales trend, Pareto, normal distribution, raw data). Dark sections are transparent, so the stage shows through;
light sections are frosted cream glass laid over it. The bars follow the cursor and ripple on a click.

| Section | Content |
|---|---|
| Hero | Name, role, one-paragraph summary |
| Profil | Summary that lights up word by word on scroll, portrait, key facts |
| Keahlian | All 15 tools with logos and the analysis methods, in one screen |
| Proyek | Four CV projects in an expandable list; a chart preview follows the cursor |
| Aplikasi | Real screenshots of SNE POS, KINETZ, and SNE Studio inside iPhone and MacBook frames |
| Dokumen | Embedded viewer for the portfolio deck, the SNE POS project deck, and reports |
| Pengalaman | Work history, leadership roles, other activities |
| Angka | Six figures from the CV |
| Kredensial | BNSP certificate (flips front/back), education, certifications, 19 course certificates |
| Kontak | Email, WhatsApp, LinkedIn, GitHub, Instagram |

## Stack

- Next.js 14 (App Router, static export) and React 18
- Three.js for the stage, with bloom post-processing (`app/lib/stage.js`)
- anime.js v4 for the bar morphing, scroll reveals, word-by-word headings, SVG chart drawing, counters (`app/lib/motion.js`)
- Lenis for smooth scrolling
- Tailwind CSS for the reset; the design itself is plain CSS in `app/globals.css`
- Fonts self-hosted through Fontsource: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono
- Deployed on Netlify (`netlify.toml`: `npm run build`, publish `out/`)

## Palette: Arang & Jingga

| Role | Hex |
|---|---|
| Charcoal background | `#0B0B0E` |
| Cream text and light sections | `#F2EEE4` |
| Orange accent | `#FF6B1A` |
| Steel blue, secondary mood | `#6C9BC9` |

They are CSS variables at the top of `app/globals.css`; the 3D colours are at the top of `app/lib/stage.js`.

## Editing content

| To change | Edit |
|---|---|
| Any text, in either language | `app/data/content.js` |
| Email, phone, social links, CV file, document links | `app/data/site.js` |
| Documents in the viewer | `viewerDocs` in `app/data/site.js` and `viewer.docs` in `app/data/content.js` |
| App showcase screens | Images in `public/apps/<app>/`, listed in `appShots` in `app/data/site.js`; labels and copy in `apps` in `app/data/content.js` |
| Tool logos | `public/logos/` and the `tools` map in `app/data/site.js` |
| Course certificates | `public/certificates/` (PDF, `thumbs/`, `full/`) and `courseCertificates` in `app/data/site.js` |
| Where the 3D model sits in each section | `POSES` in `app/lib/stage.js` |
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
│   ├── Shell.jsx         # 3D canvas, loader, custom cursor, smooth scroll, reveals
│   ├── Navbar.jsx, LanguageToggle.jsx, Footer.jsx
│   ├── Hero.jsx, Profile.jsx, Skills.jsx
│   ├── Projects.jsx, ProjectViz.jsx   # list + one SVG chart per project
│   ├── Apps.jsx, Devices.jsx          # app showcase in CSS-built iPhone and MacBook frames
│   ├── Viewer.jsx        # embedded documents
│   ├── Experience.jsx, Stats.jsx, Credentials.jsx, Contact.jsx
│   └── ui.jsx            # Words, Button, Magnetic, Label, ScrollText
├── context/LanguageContext.js
├── data/                 # content.js, site.js, brandPaths.js
├── lib/
│   ├── stage.js          # the Three.js stage
│   └── motion.js         # anime.js reveals, chart drawing, counters
├── layout.js, page.jsx, globals.css
public/                   # images, logos, certificates, CV
```

## About the app screenshots

The screens in the Aplikasi section were captured from the apps themselves, running locally on generated data.
Every figure, shop name, route, and log entry in them is simulated; none of it is real customer or personal data.

## Credits

- The interaction concept and several of its patterns (a persistent 3D stage that changes pose per section, glass sections
  over it, the trailing cursor, word-by-word text) are adapted from
  [computerman-site.vercel.app](https://computerman-site.vercel.app/). The 3D model, palette, and content are this project's own.
- Tool logos come from the Iconify `logos` and `vscode-icons` sets and Simple Icons. They are trademarks of their owners and
  are shown only to name the tools used.
