/**
 * STUDENT DATA STORE - Pendidikan Islam PBD Progress Report
 * Truth Bank Compliant: All unverified items marked with `isToConfirm: true`.
 */

const studentData = {
  profile: {
    studentName: "Ahmad Ziyad bin Mohd Ridzuan",
    mykid: "160412-10-XXXX",
    mykidToConfirm: true,
    className: "Tahun 4 Ibnu Sina",
    schoolName: "SK Permata Perdana",
    schoolToConfirm: true,
    academicSession: "2026 / 2027",
    guruKelas: "Ustazah Siti Nurhaliza binti Ishak",
    guruKelasToConfirm: true,
    guruPendidikanIslam: "Ustaz Ahmad Fairuz bin Ramli",
    guruPIToConfirm: true,
    attendanceRate: "98%",
    totalDaysPresent: "112 / 114 Hari",
    lastUpdated: "15 Jun 2026",
    currentTerm: "Penggal 2",
    averageTP: "TP 5 (Sangat Baik)"
  },

  pbdDomains: [
    {
      id: "al-quran",
      domain: "Al-Quran & Hafazan",
      category: "Al-Quran",
      tp: 5,
      tpLabel: "Sangat Baik",
      tpClass: "tp5",
      icon: "book-open",
      descriptor: "Membaca surah Al-Fatihah, Al-Mulk (ayat 1-10) dan surah-surah lazim dengan tajwid yang betul, lancar serta mengamalkan adab pembacaan Al-Quran.",
      strengths: [
        "Membaca Al-Quran dengan makhraj huruf dan hukum Nun Sakinah yang tepat.",
        "Menghafaz surah al-Mulk (1-10) dan surah al-Naba' dengan baik.",
        "Sentiasa bersedia dan menunjukkan minat tinggi semasa waktu tasmik."
      ],
      homeGuidance: "Galakkan anak membaca Al-Quran bersama keluarga 10-15 minit selepas solat Maghrib bagi mengekalkan kelancaran tajwid.",
      evalDate: "12 Jun 2026"
    },
    {
      id: "akidah",
      domain: "Akidah & Asmaul Husna",
      category: "Akidah",
      tp: 5,
      tpLabel: "Sangat Baik",
      tpClass: "tp5",
      icon: "heart-handshake",
      descriptor: "Memahami dan meyakini Rukun Iman, sifat-sifat Allah SWT, dan nama-nama Allah (Asmaul Husna) serta menghubungkaitkannya dalam kehidupan harian.",
      strengths: [
        "Dapat menjelaskan pengertian Rukun Iman ke-4 (Iman kepada Rasul) dengan yakin.",
        "Mampu menghafaz dan menterjemahkan 10 nama Asmaul Husna pilihan.",
        "Mengamalkan ikrar bahawa Allah SWT Maha Melihat dalam perbuatan seharian."
      ],
      homeGuidance: "Bincang bersama anak contoh-contoh keagungan Allah SWT melalui perhadapan alam semula jadi.",
      evalDate: "10 Jun 2026"
    },
    {
      id: "ibadah",
      domain: "Ibadah & Praktikal Solat",
      category: "Ibadah",
      tp: 6,
      tpLabel: "Cemerlang",
      tpClass: "tp6",
      icon: "sparkles",
      descriptor: "Menguasai tata cara wuduk dan perlakuan solat fardu secara sempurna, menjadi pembimbing rakan sebaya (peer buddy) dalam amalan solat berjemaah.",
      strengths: [
        "Boleh mengetuai bacaan doa selepas wuduk dan bacaan dalam solat dengan sangat baik.",
        "Memahami rukun fikli dan kauli solat serta syarat sah solat.",
        "Sangat teratur dan menjaga ketertiban semasa simulasi wuduk di sekolah."
      ],
      homeGuidance: "Teruskan memberi kepercayaan kepada anak untuk menjadi muazin atau imam solat berjemaah di rumah.",
      evalDate: "14 Jun 2026"
    },
    {
      id: "sirah",
      domain: "Sirah Nabawiyah",
      category: "Sirah",
      tp: 4,
      tpLabel: "Baik",
      tpClass: "tp4",
      icon: "compass",
      descriptor: "Memahami kisah iktibar penentangan kafir Quraish dan sifat ikhlas serta sabar Nabi Muhammad SAW semasa menyampaikan dakwah.",
      strengths: [
        "Mampu menceritakan semula kronologi perisitiwa penting Sirah secara lisan.",
        "Mengambil pengajaran berharga daripada sifat kecekalan Rasulullah SAW."
      ],
      homeGuidance: "Sediakan buku cerita Sirah ringkas di rumah untuk menambah kosa kata dan urutan fakta sejarah Islam.",
      evalDate: "05 Jun 2026"
    },
    {
      id: "adab",
      domain: "Adab & Sahsiah Islamiah",
      category: "Adab",
      tp: 6,
      tpLabel: "Cemerlang",
      tpClass: "tp6",
      icon: "user-check",
      descriptor: "Mengamalkan adab terhadap ibu bapa, guru, rakan dan alam sekitar secara konsisten serta menjadi contoh sahsiah terpuji di dalam dan luar bilik darjah.",
      strengths: [
        "Sentiasa memberi salam dan bercakap dengan nada sopan kepada guru dan rakan.",
        "Aktif membantu menjaga kebersihan kelas dan susunan Al-Quran di surau sekolah.",
        "Menunjukkan rasa hormat tinggi dan cepat meminta maaf jika berlaku kesilapan."
      ],
      homeGuidance: "Puji amalan adab mulia anak di rumah untuk mengukuhkan motivasi sahsiah kendiri.",
      evalDate: "15 Jun 2026"
    },
    {
      id: "jawi",
      domain: "Tulisan & Kosa Kata Jawi",
      category: "Jawi",
      tp: 4,
      tpLabel: "Baik",
      tpClass: "tp4",
      icon: "pen-tool",
      descriptor: "Membaca dan menulis perkataan mengandungi suku kata terbuka, suku kata tertutup, dan kata pinjaman Bahasa Melayu/Arab dalam tulisan Jawi.",
      strengths: [
        "Boleh mengemas kini tulisan Jawi dengan huruf bersambung yang kemas.",
        "Mengenal pasti padanan huruf Rumi-Jawi dengan tepat."
      ],
      homeGuidance: "Berikan latihan imlak Jawi 5-10 minit seminggu bagi memantapkan ejaan kata pinjaman Bahasa Inggeris/Rumi.",
      evalDate: "08 Jun 2026"
    }
  ],

  termProgress: {
    term1: {
      title: "Penggal 1 (Mac - Mei 2026)",
      overallTP: "TP 4.5",
      summary: "Peringkat penyesuaian awal. Ziyad menunjukkan penguasaan kukuh dalam Al-Quran dan Adab.",
      scores: [
        { domain: "Al-Quran", tp: 4, percent: 75 },
        { domain: "Akidah", tp: 4, percent: 70 },
        { domain: "Ibadah", tp: 5, percent: 85 },
        { domain: "Sirah", tp: 4, percent: 68 },
        { domain: "Adab", tp: 5, percent: 88 },
        { domain: "Tulisan Jawi", tp: 3, percent: 60 }
      ],
      milestones: [
        "Melepasi Ujian Kelancaran Tasmik Al-Quran Tahap 1",
        "Menyelesaikan Projek Poster Adab Terhadap Ibu Bapa",
        "Kehadiran penuh 100% pada bulan April"
      ]
    },
    term2: {
      title: "Penggal 2 (Jun - Ogos 2026) - [Semasa]",
      overallTP: "TP 5.0",
      summary: "Peningkatan ketara dalam Praktikal Ibadah (TP6) dan Adab (TP6). Tulisan Jawi bertambah mantap.",
      scores: [
        { domain: "Al-Quran", tp: 5, percent: 88 },
        { domain: "Akidah", tp: 5, percent: 85 },
        { domain: "Ibadah", tp: 6, percent: 98 },
        { domain: "Sirah", tp: 4, percent: 72 },
        { domain: "Adab", tp: 6, percent: 96 },
        { domain: "Tulisan Jawi", tp: 4, percent: 75 }
      ],
      milestones: [
        "Dilantik sebagai pembimbing Praktikal Solat rakan kelas",
        "Anugerah Amalan Terpuji Sahsiah Pendidikan Islam Penggal 2",
        "Menyiapkan Carta Hafazan Surah al-Mulk (Ayat 1-10)"
      ]
    },
    term3: {
      title: "Penggal 3 (Sep - Nov 2026) - [Sasaran Mampu Capai]",
      overallTP: "SASARAN: TP 5.5",
      summary: "Sasaran penggal akhir fokus kepada pemantapan ejaan Jawi (TP5) dan kefahaman Sirah Nabawiyah.",
      scores: [
        { domain: "Al-Quran", tp: 5, percent: 90 },
        { domain: "Akidah", tp: 5, percent: 90 },
        { domain: "Ibadah", tp: 6, percent: 100 },
        { domain: "Sirah", tp: 5, percent: 82 },
        { domain: "Adab", tp: 6, percent: 98 },
        { domain: "Tulisan Jawi", tp: 5, percent: 85 }
      ],
      milestones: [
        "Sasaran Hafazan Surah al-Naba' lengkap 40 ayat",
        "Penguasaan Ejaan Jawi kata pinjaman tahap 100%",
        "Pentaksiran Akhir Tahun PBD Pendidikan Islam"
      ]
    }
  },

  teacherReport: {
    guruName: "Ustaz Ahmad Fairuz bin Ramli",
    guruTitle: "Guru Mata Pelajaran Pendidikan Islam",
    isToConfirm: true,
    quote: "Ahmad Ziyad merupakan seorang murid yang sangat bersopan santun, fokus di dalam kelas dan mempunyai kesungguhan tinggi dalam mempelajari Al-Quran serta amalan solat. Pencapaian PBD beliau amat membanggakan.",
    strengths: [
      "Kelancaran bacaan Al-Quran bertajwid dan hafazan surah lazim yang sangat konsisten.",
      "Sahsiah dan adab mulia yang terpuji terhadap guru serta kerap membantu rakan sebaya.",
      "Penguasaan praktikal solat dan wuduk secara sangat tertib dan yakin."
    ],
    improvements: [
      "Penguasaan ejaan perkataan Jawi bagi kata pinjaman Rumi/Bahasa Inggeris masih memerlukan sedikit perbaikan.",
      "Menguatkan daya ingatan bagi tarikh dan kronologi peristiwa dalam bahagian Sirah."
    ],
    homeActionPlan: "Ibu bapa disyorkan memberikan latihan ringkas imlak Jawi 10 minit seminggu dan bertanyakan soalan iktibar Sirah selepas pembacaan di rumah."
  },

  workGallery: [
    {
      id: "work-1",
      title: "Latihan Ejaan Tulisan Jawi",
      category: "Jawi",
      date: "12 Mei 2026",
      image: "assets/jawi_sample.png",
      description: "Lembaran kerja latihan menyambung huruf dan ejaan kata pinjaman Bahasa Melayu dalam tulisan Jawi.",
      teacherComment: "Tahniah Ziyad! Tulisan sangat kemas, bentuk sambungan huruf amat tepat."
    },
    {
      id: "work-2",
      title: "Carta Semakan Hafazan Surah",
      category: "Hafazan",
      date: "28 Mei 2026",
      image: "assets/hafazan_sample.png",
      description: "Carta rekod kemajuan hafazan surah-surah lazim Juz Amma dan surah al-Mulk dengan bintang penghargaan.",
      teacherComment: "Hafazan lancar tanpa ragu-ragu. Sebutan makhraj huruf sangat jelas!"
    },
    {
      id: "work-3",
      title: "Projek Scrapbook Adab Terhadap Ibu Bapa",
      category: "Adab",
      date: "04 Jun 2026",
      image: "assets/adab_sample.png",
      description: "Poster kreatif mengandungi senarai amalan adab, doa untuk ibu bapa, dan ilustrasi nilai murni.",
      teacherComment: "Projek yang sangat kreatif dan bermakna. Hasil kerja dianugerahkan Markah A!"
    },
    {
      id: "work-4",
      title: "Senarai Semak Praktikal Solat & Wuduk",
      category: "Ibadah",
      date: "14 Jun 2026",
      image: "assets/solat_sample.png",
      description: "Kad pentaksiran amali perlakuan solat fardu, syarat sah, dan bacaan doa selepas wuduk.",
      teacherComment: "Perlakuan solat sangat sempurna. Ziyad layak menjadi pembimbing rakan kelas."
    }
  ],

  faqs: [
    {
      question: "Apakah yang dimaksudkan dengan Tahap Penguasaan (TP1 hingga TP6) dalam PBD?",
      answer: "Tahap Penguasaan (TP) ialah skala penandaaras keberkesanan pembelajaran murid secara menyeluruh. TP1 bermaksud Tahu Asas, manakala TP6 merupakan Tahap Cemerlang di mana murid bukan sahaja menguasai ilmu tetapi mampu menjadi teladan dan membimbing rakan lain."
    },
    {
      question: "Bagaimanakah pentaksiran Pendidikan Islam dijalankan di sekolah?",
      answer: "Pentaksiran PBD dilaksanakan secara berterusan sepanjang sesi persekolahan melalui permerhatian sahsiah, amali (solat & wuduk), lisan (tasmik Al-Quran & hafazan), serta hasil kerja murid (latihan Jawi & projek adab)."
    },
    {
      question: "Mengapakah sesetengah maklumat dilabel dengan badge 'To confirm'?",
      answer: "Badge 'To confirm' digunakan sebagai langkah kawalan ketepatan data dan keselamatan privasi (Truth Bank Compliance). Maklumat seperti nama sekolah dan nama guru rasmi disedia untuk dikemas kini sebaik sahaja disahkan oleh pihak sekolah."
    },
    {
      question: "Bagaimanakah ibu bapa boleh membantu meningkatkan gred TP anak di rumah?",
      answer: "Ibu bapa boleh membantu dengan meluangkan masa 10 minit sehari untuk tasmik bacaan Al-Quran anak, mengamalkan solat berjemaah di rumah, dan menyemak latihan tulisan Jawi yang diberikan oleh guru."
    }
  ]
};
