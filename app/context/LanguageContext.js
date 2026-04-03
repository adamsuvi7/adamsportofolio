"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            projects: "Projects",
            certificates: "Certificates",
            contact: "Contact",
        },
        hero: {
            greeting: "Hello, I'm",
            role: "Data Enthusiast & Data Analyst",
            quote: "\"Every dataset is a story waiting to be told. I simplify complexity and turn numbers into clear, strategic, and impactful insights.\"",
            cta_portfolio: "View Portfolio",
            cta_cv: "Download CV",
            cta_contact: "Contact Me",
        },
        about: {
            title: "About Me",
            heading: "Transforming Data into Strategic Decisions",
            description: "I am Adam Suvi, a Data Enthusiast with a background in Mathematics and experience in data analysis, business intelligence, and visualization. I have expertise in SQL, Python, Power BI, Tableau, and Excel. I focus on transforming data into insights that help decision-making. Currently, I continue to develop my skills through training and freelance projects.",
            location: "Location",
            experience: "Experience",
            exp_text: "Fresh Graduate",
            role_badge: "Adam Suvi, S.Si",
            focus_badge: "Data Analyst",
            education: {
                title: "Education",
                university: "Universitas Andalas - Padang, Indonesia",
                degree: "Bachelor of Mathematics and Data Science",
                thesis: "Thesis: Multipartite Ramsey Numbers for the Combination of Graph 2K2 and Cycle Graph.",
                coursework: "Relevant Courseworks: Data Analysis, Artificial Intelligence, Algorithm & Programming, Statistical Quality Control, Time Series Analysis, Mathematical Statistics."
            },
        },
        skills: {
            section_title: "Expertise",
            heading: "Skills & Training",
            technical: "Technical Skills",
            soft: "Soft Skills",
            courses: "Courses & Training",
            soft_skills: {
                analytical: "Analytical Thinking",
                problem_solving: "Problem Solving",
                communication: "Communication",
                time_mgmt: "Time Management",
                detail: "Attention to Detail",
                collaboration: "Team Collaboration",
            }
        },
        featured_project: {
            section_title: "Presentation",
            heading: "Featured Portfolio",
            description: "Explore my comprehensive data analyst portfolio, showcasing projects and analytical capabilities.",
        },
        organization: {
            section_title: "Leadership",
            heading: "Organization Experience",
            roles: [
                {
                    role: "Acting Governor & Head of Kastrat Division",
                    org: "BEM FMIPA UNAND",
                    image: "/images/organizations/lkmmtd.jpg",
                    details: [
                        "Led over 80 members across 4 departments, efficiently coordinating more than 15 faculty-level initiatives.",
                        "Strengthened collaboration between student organizations and the faculty, increasing program participation by 40%.",
                        "Proposed 3 policy recommendations that were adopted into the faculty's operational plan."
                    ]
                },
                {
                    role: "Head of Event",
                    org: "LKMMTD",
                    image: "/images/organizations/himatika.jpg",
                    details: [
                        "Led over 80 committee members in a leadership training attended by more than 400 participants.",
                        "Implemented a digital evaluation system, increasing participant participation by 30% and reducing feedback delay by 50%.",
                        "Managed budget and logistics, ensuring all activities were completed on schedule and within planned resources."
                    ]
                },
                {
                    role: "1st Runner-Up, Genre Ambassador",
                    org: "Genre Forum – Bukittinggi",
                    image: "/images/organizations/genre.jpg",
                    details: [
                        "Represented youth in city-scale education and advocacy campaigns under the government agency DP3APPKB.",
                        "Organized over 10 public talks on youth development and family planning, attended by more than 500 young participants."
                    ]
                },
                {
                    role: "PSDM Coordinator",
                    org: "HIMATIKA UNAND",
                    image: "/images/organizations/bem.jpg",
                    details: [
                        "Managed 5 soft skill and career development programs for Himatika students.",
                        "Developed training modules and a mentoring system for over 60 new members.",
                        "Played an active role in recruitment and member development to ensure organizational readiness and achievement."
                    ]
                },
                {
                    role: "KKN Team Leader",
                    org: "KKN UNAND",
                    image: "/images/organizations/kkn.jpg",
                    details: [
                        "Led a team of 27 members from various departments in implementing a 40-day community service program.",
                        "Initiated 10 educational and social activities, including teaching, socialization, and community activities.",
                        "Acted as an intermediary between students and village officials to maintain good working relationships."
                    ]
                }
            ]
        },
        achievement: {
            section_title: "Recognition",
            heading: "Achievements",
            title: "1st Runner-Up Genre Ambassador Bukittinggi",
            image: "/images/achievements/duta_genre.jpg",
            description: "\"Successfully won 2nd Place (1st Runner Up) for the Generation Planning Ambassador of Bukittinggi City, an event for youth education and empowerment regarding future planning, health, advocacy, and character development.\""
        },
        projects: {
            section_title: "Portfolio",
            heading: "Featured Projects",
            view_details: "View Details",
            items: [
                {
                    title: "Sales Transaction EDA",
                    description: "Exploratory Data Analysis on 10,000+ sales records to identify trends, customer segmentation, and revenue drivers.",
                    tools: ["Python", "Pandas", "SQL"],
                    link: "https://docs.google.com/presentation/d/1OhkWJtOviRRaek3CUG8PeWmw73GwBmWE/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
                    icon: "BarChart2"
                },
                {
                    title: "Ethereum Price Prediction (ANN)",
                    description: "Application of Artificial Neural Network (ANN) to predict Ethereum prices based on historical data, analyzing trends and model accuracy.",
                    tools: ["Python", "ANN", "TensorFlow"],
                    link: "https://docs.google.com/presentation/d/10yzplBokg8Egs4yhYrM-CcIheQgH2lmv/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
                    icon: "BarChart2"
                },
                {
                    title: "Business Mapping",
                    description: "Business data mapping and visualization using Excel and Canva to ensure clarity and strategic insight.",
                    tools: ["Excel", "Canva"],
                    link: "https://docs.google.com/spreadsheets/d/1yutTtek2XKtyA8UvRoHOnVKXrh9VTgNN/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
                    icon: "Database"
                },
                {
                    title: "DKI Jakarta Sales Report",
                    description: "Comprehensive sales report for DKI Jakarta using Power BI, Power Query, and Pivot Table.",
                    tools: ["Power BI", "Power Query", "Pivot Table"],
                    link: "https://drive.google.com/file/d/1Lz0gB_dI838XXy2kTRsmHHXItyzEbhOi/view?usp=sharing",
                    icon: "FileText"
                }
            ]
        },
        certificates: {
            section_title: "Credentials",
            heading: "Certificates",
            all_certs: "All Certificates",
            items: [
                {
                    title: "Google Data Analytics",
                    description: "Comprehensive curriculum covering data cleaning, analysis, visualization, and R programming.",
                    issuer: "Coursera",
                    date: "2025",
                    link: "https://drive.google.com/file/d/14tTx-6vFko1_ytB_pHZlpKBJkUkJfFts/view?usp=sharing",
                    logo: "/images/logos/google.png"
                },
                {
                    title: "Bootcamp Data Analyst",
                    description: "Intensive training in SQL, Python, and business intelligence tools with real-world projects.",
                    issuer: "Harisenin.com",
                    date: "2025",
                    logo: "/images/logos/harisenin.png"
                },
                {
                    title: "Meta Data Analyst",
                    description: "Professional certificate covering data analysis, Python, SQL, and Tableau.",
                    issuer: "Coursera",
                    date: "2025",
                    link: "https://drive.google.com/file/d/1mnwMZgoMKqZDESQxj8YW4E1PtdI131LA/view?usp=sharing",
                    logo: "/images/logos/meta.png"
                },
                {
                    title: "Syntaxnesia Training Centre",
                    description: "Professional certification from Syntaxnesia Training Centre for Data Analyst profession, recognized by BNSP.",
                    issuer: "Syntaxnesia",
                    date: "2025",
                    link: "https://drive.google.com/file/d/1I3eoumEZpdAZxgMhvDbDA8x8VzNAA9PO/view?usp=sharing",
                    logo: "/images/logos/syntaxnesia.png"
                }
            ],
            all_list: [
                "Coursera 4H7XIYGCL5U9.pdf", "Coursera 677FP4197JD1.pdf", "Coursera B6X8ZEXQ39SV.pdf",
                "Coursera BC16M9BJS8Y2.pdf", "Coursera F0HU5TFM1C57.pdf", "Coursera GCZN5DKUT9NP.pdf",
                "Coursera HY2BP9S3I96P.pdf", "Coursera KR4G69WZTYUC.pdf", "Coursera PVUV5YU90F8U.pdf",
                "Coursera Q1NJ7YDEFRHI.pdf", "Coursera Q4PJK8GK4Y0B.pdf", "Coursera SXWIYT0PW7AB.pdf",
                "Coursera TK9DF11ZVPI9.pdf", "Coursera X88K1F494A87.pdf", "GOOGLE- DATA DRIVEN.pdf",
                "META CERTIFICATE.pdf", "MICROSOFT CERTIFICATE.pdf", "SERTIFIKAT COURSERA GOOGLE.pdf",
                "SERTIFIKAT COURSSERA DATA ANLYST.pdf"
            ]
        },
        contact: {
            section_title: "Get in Touch",
            heading: "Contact Me",
            connect_title: "Let's Connect",
            connect_desc: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
            form: {
                name: "Name",
                email: "Email",
                message: "Message",
                placeholder_name: "Your Name",
                placeholder_email: "your@email.com",
                placeholder_msg: "How can I help you?",
                send: "Send Message"
            }
        },
        footer: {
            rights: "All rights reserved."
        }
    },
    id: {
        nav: {
            home: "Beranda",
            about: "Tentang",
            projects: "Proyek",
            certificates: "Sertifikat",
            contact: "Kontak",
        },
        hero: {
            greeting: "Halo, Saya",
            role: "Data Enthusiast & Data Analyst",
            quote: "\"Setiap dataset adalah sebuah cerita yang menunggu untuk diceritakan. Saya menyederhanakan kompleksitas dan mengubah angka menjadi wawasan yang jelas, strategis, dan berdampak.\"",
            cta_portfolio: "Lihat Portofolio",
            cta_cv: "Unduh CV",
            cta_contact: "Hubungi Saya",
        },
        about: {
            title: "Tentang Saya",
            heading: "Mengubah Data Menjadi Keputusan Strategis",
            description: "Saya Adam Suvi, seorang Data Enthusiast dengan latar belakang Matematika dan pengalaman dalam analisis data, business intelligence, dan visualisasi. Saya memiliki keahlian dalam SQL, Python, Power BI, Tableau, dan Excel. Saya fokus pada transformasi data menjadi insight yang membantu pengambilan keputusan. Saat ini saya terus mengembangkan kemampuan melalui pelatihan dan proyek freelance.",
            location: "Lokasi",
            experience: "Pengalaman",
            exp_text: "Fresh Graduate",
            role_badge: "Adam Suvi, S.Si",
            focus_badge: "Data Analyst",
            education: {
                title: "Pendidikan",
                university: "Universitas Andalas - Padang, Indonesia",
                degree: "Sarjana Matematika dan Sains Data",
                thesis: "Skripsi: Bilangan Ramsey Multipartit untuk Kombinasi Graf 2K2 dan Graf Siklus.",
                coursework: "Mata Kuliah Relevan: Analisis Data, Kecerdasan Buatan, Algoritma & Pemrograman, Pengendalian Kualitas Statistik, Analisis Runtun Waktu, Statistika Matematika."
            },
        },
        skills: {
            section_title: "Keahlian",
            heading: "Skill & Pelatihan",
            technical: "Hard Skill",
            soft: "Soft Skill",
            courses: "Kursus & Pelatihan",
            soft_skills: {
                analytical: "Berpikir Analitis",
                problem_solving: "Pemecahan Masalah",
                communication: "Komunikasi",
                time_mgmt: "Manajemen Waktu",
                detail: "Ketelitian",
                collaboration: "Kerjasama Tim",
            }
        },
        featured_project: {
            section_title: "Presentasi",
            heading: "Portofolio Unggulan",
            description: "Jelajahi portofolio data analyst saya secara lengkap, menampilkan proyek dan kemampuan analisis.",
        },
        organization: {
            section_title: "Kepemimpinan",
            heading: "Pengalaman Organisasi",
            roles: [
                {
                    role: "PLT Gubernur & Kepala Divisi Kastrat",
                    org: "BEM FMIPA UNAND",
                    image: "/images/organizations/lkmmtd.jpg",
                    details: [
                        "Memimpin lebih dari 80 anggota di 4 departemen, mengoordinasikan lebih dari 15 inisiatif tingkat fakultas dengan efisien.",
                        "Menguatkan kolaborasi antara organisasi mahasiswa dan fakultas, meningkatkan partisipasi program sebesar 40%.",
                        "Mengajukan 3 rekomendasi kebijakan yang diadopsi ke dalam rencana operasional fakultas."
                    ]
                },
                {
                    role: "Head of Event",
                    org: "LKMMTD",
                    image: "/images/organizations/himatika.jpg",
                    details: [
                        "Memimpin lebih dari 80 anggota komite dalam pelatihan kepemimpinan yang diikuti oleh lebih dari 400 peserta.",
                        "Mengimplementasikan sistem evaluasi digital, meningkatkan partisipasi peserta sebesar 30% dan mengurangi keterlambatan umpan balik sebesar 50%.",
                        "Mengelola anggaran dan logistik, memastikan semua kegiatan selesai sesuai jadwal dan sumber daya yang direncanakan."
                    ]
                },
                {
                    role: "1st Runner-Up, Duta Genre Kota Bukittinggi",
                    org: "Forum Genre – Bukittinggi",
                    image: "/images/organizations/genre.jpg",
                    details: [
                        "Mewakili pemuda dalam kampanye pendidikan dan advokasi skala kota di bawah naungan lembaga pemerintah DP3APPKB.",
                        "Menyelenggarakan lebih dari 10 ceramah publik tentang pengembangan pemuda dan perencanaan keluarga, yang diikuti oleh lebih dari 500 peserta muda."
                    ]
                },
                {
                    role: "Koordinator PSDM",
                    org: "HIMATIKA UNAND",
                    image: "/images/organizations/bem.jpg",
                    details: [
                        "Mengelola 5 program pengembangan soft skill dan karier bagi mahasiswa Himatika.",
                        "Menyusun modul pelatihan serta sistem mentoring bagi lebih dari 60 anggota baru.",
                        "Berperan aktif dalam rekrutmen dan pembinaan anggota agar lebih siap berorganisasi dan berprestasi."
                    ]
                },
                {
                    role: "Ketua Kuliah Kerja Nyata",
                    org: "KKN UNAND",
                    image: "/images/organizations/kkn.jpg",
                    details: [
                        "Memimpin tim beranggotakan 27 mahasiswa dari berbagai jurusan dalam melaksanakan program pengabdian masyarakat selama 40 hari.",
                        "Menginisiasi 10 kegiatan pendidikan dan sosial, termasuk pengajaran, sosialisasi, dan kegiatan kemasyarakatan.",
                        "Bertindak sebagai perantara antara mahasiswa dan perangkat desa untuk menjaga hubungan kerja yang baik."
                    ]
                }
            ]
        },
        achievement: {
            section_title: "Penghargaan",
            heading: "Prestasi",
            title: "Juara 2 Duta Genre Kota Bukittinggi",
            image: "/images/achievements/duta_genre.jpg",
            description: "\"Berhasil meraih Juara 2 (1st Runner Up) Duta Generasi Berencana Kota Bukittinggi, ajang edukasi dan pemberdayaan remaja terkait perencanaan masa depan, kesehatan, advokasi, dan pengembangan karakter.\""
        },
        projects: {
            section_title: "Portofolio",
            heading: "Proyek Unggulan",
            view_details: "Lihat Detail",
            items: [
                {
                    title: "Sales Transaction EDA",
                    description: "Exploratory Data Analysis pada 10.000+ data penjualan untuk mengidentifikasi tren, segmentasi pelanggan, dan pendorong pendapatan.",
                    tools: ["Python", "Pandas", "SQL"],
                    link: "https://docs.google.com/presentation/d/1OhkWJtOviRRaek3CUG8PeWmw73GwBmWE/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
                    icon: "BarChart2"
                },
                {
                    title: "Prediksi Harga Ethereum (ANN)",
                    description: "Penerapan Artificial Neural Network (ANN) dalam Prediksi Harga Ethereum Berbasis Data Historis untuk analisis tren dan peramalan akurat.",
                    tools: ["Python", "ANN", "TensorFlow"],
                    link: "https://docs.google.com/presentation/d/10yzplBokg8Egs4yhYrM-CcIheQgH2lmv/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
                    icon: "BarChart2"
                },
                {
                    title: "Mapping Bisnis",
                    description: "Pemetaan dan visualisasi data bisnis menggunakan Excel dan Canva untuk memastikan kejelasan dan wawasan strategis.",
                    tools: ["Excel", "Canva"],
                    link: "https://docs.google.com/spreadsheets/d/1yutTtek2XKtyA8UvRoHOnVKXrh9VTgNN/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
                    icon: "Database"
                },
                {
                    title: "DKI Jakarta Sales Report",
                    description: "Laporan penjualan komprehensif wilayah DKI Jakarta menggunakan Power BI, Power Query, dan Pivot Table.",
                    tools: ["Power BI", "Power Query", "Pivot Table"],
                    link: "https://drive.google.com/file/d/1Lz0gB_dI838XXy2kTRsmHHXItyzEbhOi/view?usp=sharing",
                    icon: "FileText"
                }
            ]
        },
        certificates: {
            section_title: "Kredensial",
            heading: "Sertifikat",
            all_certs: "Semua Sertifikat",
            items: [
                {
                    title: "Google Data Analytics",
                    description: "Kurikulum komprehensif mencakup pembersihan data, analisis, visualisasi, dan pemrograman R.",
                    issuer: "Coursera",
                    date: "2025",
                    link: "https://drive.google.com/file/d/14tTx-6vFko1_ytB_pHZlpKBJkUkJfFts/view?usp=sharing",
                    logo: "/images/logos/google.png"
                },
                {
                    title: "Bootcamp Data Analyst",
                    description: "Pelatihan intensif SQL, Python, dan alat business intelligence dengan proyek dunia nyata.",
                    issuer: "Harisenin.com",
                    date: "2025",
                    logo: "/images/logos/harisenin.png"
                },
                {
                    title: "Meta Data Analyst",
                    description: "Sertifikasi profesional mencakup analisis data, Python, SQL, dan Tableau.",
                    issuer: "Coursera",
                    date: "2025",
                    link: "https://drive.google.com/file/d/1mnwMZgoMKqZDESQxj8YW4E1PtdI131LA/view?usp=sharing",
                    logo: "/images/logos/meta.png"
                },
                {
                    title: "Syntaxnesia Training Centre",
                    description: "Sertifikasi profesional dari Syntaxnesia Training Centre untuk profesi Data Analyst yang diakui oleh BNSP.",
                    issuer: "Syntaxnesia",
                    date: "2025",
                    link: "https://drive.google.com/file/d/1I3eoumEZpdAZxgMhvDbDA8x8VzNAA9PO/view?usp=sharing",
                    logo: "/images/logos/syntaxnesia.png"
                }
            ],
            all_list: [
                "Coursera 4H7XIYGCL5U9.pdf", "Coursera 677FP4197JD1.pdf", "Coursera B6X8ZEXQ39SV.pdf",
                "Coursera BC16M9BJS8Y2.pdf", "Coursera F0HU5TFM1C57.pdf", "Coursera GCZN5DKUT9NP.pdf",
                "Coursera HY2BP9S3I96P.pdf", "Coursera KR4G69WZTYUC.pdf", "Coursera PVUV5YU90F8U.pdf",
                "Coursera Q1NJ7YDEFRHI.pdf", "Coursera Q4PJK8GK4Y0B.pdf", "Coursera SXWIYT0PW7AB.pdf",
                "Coursera TK9DF11ZVPI9.pdf", "Coursera X88K1F494A87.pdf", "GOOGLE- DATA DRIVEN.pdf",
                "META CERTIFICATE.pdf", "MICROSOFT CERTIFICATE.pdf", "SERTIFIKAT COURSERA GOOGLE.pdf",
                "SERTIFIKAT COURSSERA DATA ANLYST.pdf"
            ]
        },
        contact: {
            section_title: "Hubungi Saya",
            heading: "Kontak",
            connect_title: "Mari Terhubung",
            connect_desc: "Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.",
            form: {
                name: "Nama",
                email: "Email",
                message: "Pesan",
                placeholder_name: "Nama Anda",
                placeholder_email: "email@anda.com",
                placeholder_msg: "Apa yang bisa saya bantu?",
                send: "Kirim Pesan"
            }
        },
        footer: {
            rights: "Hak cipta dilindungi."
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('id'); // Default to Indonesian

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
