// Language-independent facts: contact details, links, tool logos, certificate files.
// Contact details: edit them here and they update everywhere. Email is the address Adam chose
// for the site; the rest follows the latest CV.

export const site = {
    name: "Adam Suvi",
    url: "https://adamsportofolio.netlify.app",
    email: "adamsuvi7@gmail.com",
    phoneDisplay: "+62 821-7162-5816",
    whatsapp: "https://wa.me/6282171625816",
    linkedin: "https://linkedin.com/in/adam-suvi",
    linkedinLabel: "linkedin.com/in/adam-suvi",
    github: "https://github.com/adamsuvi7",
    githubLabel: "github.com/adamsuvi7",
    instagram: "https://instagram.com/adam_suvi",
    instagramLabel: "@adam_suvi",
    cv: "/Adam_Suvi_CV_Data_Analyst.pdf",
};

// Every tool here appears in the CV. `logo` points at /public/logos/<name>.svg.
export const tools = {
    sql: { name: "SQL", logo: "sql" },
    bigquery: { name: "Google BigQuery", short: "BigQuery", logo: "bigquery" },
    python: { name: "Python", logo: "python" },
    pandas: { name: "Pandas", logo: "pandas" },
    numpy: { name: "NumPy", logo: "numpy" },
    matplotlib: { name: "Matplotlib", logo: "matplotlib" },
    seaborn: { name: "Seaborn", logo: "seaborn" },
    r: { name: "R", logo: "r" },
    powerbi: { name: "Power BI", logo: "powerbi" },
    tableau: { name: "Tableau", logo: "tableau" },
    lookerstudio: { name: "Looker Studio", logo: "lookerstudio" },
    excel: { name: "Microsoft Excel", short: "Excel", logo: "excel" },
    powerpoint: { name: "PowerPoint", logo: "powerpoint" },
    git: { name: "Git", logo: "git" },
    github: { name: "GitHub", logo: "github" },
};

export const links = {
    superstore: "https://drive.google.com/file/d/1Cm_-bsMYUczeW80qkhNNgX2xxKJhqsP9/view?usp=sharing",
    dkiReport: "https://drive.google.com/file/d/1Lz0gB_dI838XXy2kTRsmHHXItyzEbhOi/view?usp=sharing",
    salesEda: "https://docs.google.com/presentation/d/1OhkWJtOviRRaek3CUG8PeWmw73GwBmWE/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
    ethereum: "https://docs.google.com/presentation/d/10yzplBokg8Egs4yhYrM-CcIheQgH2lmv/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
    businessMapping: "https://docs.google.com/spreadsheets/d/1yutTtek2XKtyA8UvRoHOnVKXrh9VTgNN/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
    deck: "https://drive.google.com/file/d/1j3Fh-_j168q1GVOYvQ6VWE5KWZJxDWsN/view",
    certGoogle: "https://drive.google.com/file/d/14tTx-6vFko1_ytB_pHZlpKBJkUkJfFts/view?usp=sharing",
    certMeta: "https://drive.google.com/file/d/1mnwMZgoMKqZDESQxj8YW4E1PtdI131LA/view?usp=sharing",
    certBnsp: "https://drive.google.com/file/d/1I3eoumEZpdAZxgMhvDbDA8x8VzNAA9PO/view?usp=sharing",
};

// Embeddable versions of the documents, for the on-page viewer.
export const viewerDocs = {
    deck: { embed: "https://drive.google.com/file/d/1j3Fh-_j168q1GVOYvQ6VWE5KWZJxDWsN/preview", href: links.deck },
    // Shown as page images (works on phones, where a PDF cannot be embedded); `href` is the PDF itself.
    pos: { pages: 24, dir: "/docs/sne-pos", href: "/docs/SNE-POS-Portofolio-Adam-Suvi.pdf" },
    superstore: { embed: "https://drive.google.com/file/d/1Cm_-bsMYUczeW80qkhNNgX2xxKJhqsP9/preview", href: links.superstore },
    dki: { embed: "https://drive.google.com/file/d/1Lz0gB_dI838XXy2kTRsmHHXItyzEbhOi/preview", href: links.dkiReport },
    eda: { embed: "https://docs.google.com/presentation/d/1OhkWJtOviRRaek3CUG8PeWmw73GwBmWE/preview", href: links.salesEda },
    ethereum: { embed: "https://docs.google.com/presentation/d/10yzplBokg8Egs4yhYrM-CcIheQgH2lmv/preview", href: links.ethereum },
    mapping: { embed: "https://docs.google.com/spreadsheets/d/1yutTtek2XKtyA8UvRoHOnVKXrh9VTgNN/preview", href: links.businessMapping },
};

// The 19 course certificates in /public/certificates, titled from the PDFs themselves.
export const courseCertificates = [
    { file: "Coursera Q4PJK8GK4Y0B.pdf", thumb: "coursera-q4pjk8gk4y0b", title: "Google Data Analytics Professional Certificate", by: "Google", featured: true },
    { file: "Coursera X88K1F494A87.pdf", thumb: "coursera-x88k1f494a87", title: "Meta Data Analyst Professional Certificate", by: "Meta", featured: true },
    { file: "SERTIFIKAT COURSERA GOOGLE.pdf", thumb: "sertifikat-coursera-google", title: "Foundations: Data, Data, Everywhere", by: "Google" },
    { file: "GOOGLE- DATA DRIVEN.pdf", thumb: "google-data-driven", title: "Ask Questions to Make Data-Driven Decisions", by: "Google" },
    { file: "Coursera 677FP4197JD1.pdf", thumb: "coursera-677fp4197jd1", title: "Prepare Data for Exploration", by: "Google" },
    { file: "Coursera B6X8ZEXQ39SV.pdf", thumb: "coursera-b6x8zexq39sv", title: "Process Data from Dirty to Clean", by: "Google" },
    { file: "Coursera KR4G69WZTYUC.pdf", thumb: "coursera-kr4g69wztyuc", title: "Analyze Data to Answer Questions", by: "Google" },
    { file: "Coursera GCZN5DKUT9NP.pdf", thumb: "coursera-gczn5dkut9np", title: "Share Data Through the Art of Visualization", by: "Google" },
    { file: "Coursera HY2BP9S3I96P.pdf", thumb: "coursera-hy2bp9s3i96p", title: "Data Analysis with R Programming", by: "Google" },
    { file: "Coursera BC16M9BJS8Y2.pdf", thumb: "coursera-bc16m9bjs8y2", title: "Google Data Analytics Capstone: Complete a Case Study", by: "Google" },
    { file: "Coursera 4H7XIYGCL5U9.pdf", thumb: "coursera-4h7xiygcl5u9", title: "Accelerate Your Job Search with AI", by: "Google" },
    { file: "META CERTIFICATE.pdf", thumb: "meta-certificate", title: "Introduction to Data Analytics", by: "Meta" },
    { file: "Coursera SXWIYT0PW7AB.pdf", thumb: "coursera-sxwiyt0pw7ab", title: "Data Analysis with Spreadsheets and SQL", by: "Meta" },
    { file: "Coursera F0HU5TFM1C57.pdf", thumb: "coursera-f0hu5tfm1c57", title: "Python Data Analytics", by: "Meta" },
    { file: "Coursera PVUV5YU90F8U.pdf", thumb: "coursera-pvuv5yu90f8u", title: "Statistics Foundations", by: "Meta" },
    { file: "Coursera TK9DF11ZVPI9.pdf", thumb: "coursera-tk9df11zvpi9", title: "Introduction to Data Management", by: "Meta" },
    { file: "MICROSOFT CERTIFICATE.pdf", thumb: "microsoft-certificate", title: "Preparing Data for Analysis with Microsoft Excel", by: "Microsoft" },
    { file: "Coursera Q1NJ7YDEFRHI.pdf", thumb: "coursera-q1nj7ydefrhi", title: "Harnessing the Power of Data with Power BI", by: "Microsoft" },
    { file: "SERTIFIKAT COURSSERA DATA ANLYST.pdf", thumb: "sertifikat-courssera-data-anlyst", title: "Introduction to Data Analytics", by: "IBM" },
];

// Screens for the app showcase. File names under /public/apps/<key>/; labels live in content.js, in the same order.
// `bar` is the colour of the app's top edge, used for the phone's status bar.
export const appShots = {
    pos: { bar: "#ffffff", dark: false, phone: ["beranda", "kasir", "stok", "kas", "kota", "transaksi"], laptop: ["beranda", "kota", "stok", "laporan"] },
    kinetz: { bar: "#0f1110", dark: true, phone: ["history", "home", "home2", "diet", "studio"], laptop: ["home", "studio", "ride"] },
    dex: { bar: "#0f141b", dark: true, phone: ["dashboard", "dashboard-2", "meteora", "trade", "trade-2"], laptop: ["dashboard", "dashboard-2", "meteora", "trade"] },
    studio: { bar: "#ffffff", dark: false, phone: ["kanvas", "teks", "foto", "template"], laptop: ["editor", "template2"] },
};

// Activity gallery. To add a photo: put it in /public/img/galeri/<album>/ and add a line here.
// `album` must be one of the keys in `experience.albums` (content.js). `caption` is shown in the enlarged view.
export const gallery = [
    { album: "bem", src: "/img/org-bem.webp", w: 1000, h: 666, caption: "Pengurus BEM FMIPA Universitas Andalas" },
    { album: "himatika", src: "/img/org-himatika.webp", w: 1000, h: 666, caption: "Tim Pengembangan SDM HIMATIKA" },
    { album: "lkmmtd", src: "/img/org-lkmmtd.webp", w: 1000, h: 515, caption: "Peserta LKMMTD di ruang kuliah" },
    { album: "kkn", src: "/img/org-kkn.webp", w: 1000, h: 750, caption: "Tim KKN-PPM Universitas Andalas 2024" },
    { album: "genre", src: "/img/org-genre.webp", w: 1000, h: 666, caption: "Malam penobatan Duta Genre Kota Bukittinggi" },
    { album: "genre", src: "/img/duta-genre.webp", w: 890, h: 606, caption: "Juara 2 Duta Genre Kota Bukittinggi" },
];
