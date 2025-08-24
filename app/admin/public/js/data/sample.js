export const users = [
    {
      id: 'U001',
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@example.com',
      registered: '2024-01-15',
      lastLogin: '2025-08-08'
    },
    {
      id: 'U002',
      name: 'Trần Thị Bích Ngọc',
      email: 'ngoc.bich@example.com',
      registered: '2024-03-22',
      lastLogin: '2025-08-09'
    },
    {
      id: 'U003',
      name: 'Lê Hoàng Minh',
      email: 'minh.le@example.com',
      registered: '2024-05-10',
      lastLogin: '2025-08-07'
    },
    {
      id: 'U004',
      name: 'Phạm Quốc Khánh',
      email: 'khanh.pham@example.com',
      registered: '2024-07-03',
      lastLogin: '2025-08-06'
    },
    {
      id: 'U005',
      name: 'Ngô Thanh Hằng',
      email: 'hang.ngo@example.com',
      registered: '2024-09-17',
      lastLogin: '2025-08-08'
    },
    {
      id: 'U006',
      name: 'David Smith',
      email: 'david.smith@example.com',
      registered: '2024-11-25',
      lastLogin: '2025-08-09'
    },
    {
      id: 'U007',
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      registered: '2024-12-02',
      lastLogin: '2025-08-05'
    },
    {
      id: 'U008',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      registered: '2025-01-12',
      lastLogin: '2025-08-10'
    },
    {
      id: 'U009',
      name: 'Olivia Garcia',
      email: 'olivia.garcia@example.com',
      registered: '2025-02-20',
      lastLogin: '2025-08-09'
    },
    {
      id: 'U010',
      name: 'Christopher Wilson',
      email: 'chris.wilson@example.com',
      registered: '2025-03-05',
      lastLogin: '2025-08-07'
    }
  ];  

export const participants = {
  players: [
    { id: '#ESF-P-2025-001', name: 'Faker', teamTag: 'T01', game: 'League of Legends', team: 'T1' },
    { id: '#ESF-P-2025-002', name: 'Chovy', teamTag: 'T02', game: 'League of Legends', team: 'Gen.G' },
    { id: '#ESF-P-2025-003', name: 'Caps', teamTag: 'T03', game: 'League of Legends', team: 'G2 Esports' },
    { id: '#ESF-P-2025-004', name: 'Ruler', teamTag: 'T04', game: 'League of Legends', team: 'JD Gaming' },
    { id: '#ESF-P-2025-005', name: 'Knight', teamTag: 'T05', game: 'League of Legends', team: 'Top Esports' },
    { id: '#ESF-P-2025-006', name: 'ShowMaker', teamTag: 'T06', game: 'League of Legends', team: 'Dplus KIA' },
    { id: '#ESF-P-2025-007', name: 'Uzi', teamTag: 'T07', game: 'League of Legends', team: 'Royal Never Give Up' },
    { id: '#ESF-P-2025-008', name: 'Perkz', teamTag: 'T08', game: 'League of Legends', team: 'Team Vitality' },
    { id: '#ESF-P-2025-009', name: 'Scout', teamTag: 'T09', game: 'League of Legends', team: 'EDward Gaming' },
    { id: '#ESF-P-2025-010', name: '369', teamTag: 'T10', game: 'League of Legends', team: 'Top Esports' },
    { id: '#ESF-P-2025-011', name: 'Meiko', teamTag: 'T11', game: 'League of Legends', team: 'EDward Gaming' },
    { id: '#ESF-P-2025-012', name: 'Keria', teamTag: 'T12', game: 'League of Legends', team: 'T1' },
  ],

  teams: [
    { id: '#ESF-T-2025-001', name: 'T1', teamTag: 'T01', game: 'League of Legends' },
    { id: '#ESF-T-2025-002', name: 'Gen.G', teamTag: 'T02', game: 'League of Legends' },
    { id: '#ESF-T-2025-003', name: 'G2 Esports', teamTag: 'T03', game: 'League of Legends' },
    { id: '#ESF-T-2025-004', name: 'JD Gaming', teamTag: 'T04', game: 'League of Legends' },
    { id: '#ESF-T-2025-005', name: 'Top Esports', teamTag: 'T05', game: 'League of Legends' },
    { id: '#ESF-T-2025-006', name: 'Dplus KIA', teamTag: 'T06', game: 'League of Legends' },
    { id: '#ESF-T-2025-007', name: 'Royal Never Give Up', teamTag: 'T07', game: 'League of Legends' },
    { id: '#ESF-T-2025-008', name: 'Team Vitality', teamTag: 'T08', game: 'League of Legends' },
    { id: '#ESF-T-2025-009', name: 'EDward Gaming', teamTag: 'T09', game: 'League of Legends' },
    { id: '#ESF-T-2025-010', name: 'Bilibili Gaming', teamTag: 'T10', game: 'League of Legends' },
    { id: '#ESF-T-2025-011', name: 'Fnatic', teamTag: 'T11', game: 'League of Legends' },
    { id: '#ESF-T-2025-012', name: 'Cloud9', teamTag: 'T12', game: 'League of Legends' },
  ]
};

export const tournaments = [
    {
      id: '#T-2025-001',
      game_name: 'Valorant Summer Cup',
      organizer: 'Riot Games',
      views: '5,302',
      registration: 'Jul 1 – Jul 15, 2025',
      start_end: 'Jul 20 – Jul 25, 2025',
      participants: 16,
      format: 'Group Stage + BO3',
      prize_pool: '$20,000',
      last_modified: 'Aug 1, 2025'
    },
    {
      id: '#T-2025-002',
      game_name: 'CS2 Global Clash',
      organizer: 'Valve Corp',
      views: '1,972',
      registration: 'Jul 5 – Jul 18, 2025',
      start_end: 'Jul 22 – Jul 29, 2025',
      participants: 12,
      format: 'Single Elimination',
      prize_pool: '$15,000',
      last_modified: 'Aug 2, 2025'
    },
    {
      id: '#T-2025-003',
      game_name: 'League of Champions',
      organizer: 'Riot Games',
      views: '9,000',
      registration: 'Jun 25 – Jul 10, 2025',
      start_end: 'Jul 15 – Jul 30, 2025',
      participants: 24,
      format: 'Group + Knockout',
      prize_pool: '$50,000',
      last_modified: 'Aug 3, 2025'
    },
    {
      id: '#T-2025-004',
      game_name: 'Dota 2 Battle Arena',
      organizer: 'Valve Corp',
      views: '3,186',
      registration: 'Jul 10 – Jul 18, 2025',
      start_end: 'Jul 22 – Jul 28, 2025',
      participants: 8,
      format: 'Double Elimination',
      prize_pool: '$10,000',
      last_modified: 'Aug 4, 2025'
    },
    {
      id: '#T-2025-005',
      game_name: 'Overwatch Open',
      organizer: 'Blizzard',
      views: '5,000',
      registration: 'Jul 1 – Jul 14, 2025',
      start_end: 'Jul 19 – Jul 25, 2025',
      participants: 20,
      format: 'Swiss Format',
      prize_pool: '$18,000',
      last_modified: 'Aug 4, 2025'
    }
];

export const games = [
  {
    id: 'G001',
    game_name: 'Apex Legends',
    players: '5.4K',
    views: '15,420',
    last_modified: 'June 22, 2025'
  },
  {
    id: 'G002',
    game_name: 'Counter-Strike 2',
    players: '12.5K',
    views: '0',
    last_modified: 'June 21, 2025'
  },
  {
    id: 'G003',
    game_name: 'Dota 2',
    players: '8.2K',
    views: '8,932',
    last_modified: 'June 20, 2025'
  },
  {
    id: 'G004',
    game_name: 'Fortnite',
    players: '4.3K',
    views: '12,105',
    last_modified: 'June 19, 2025'
  },
  {
    id: 'G005',
    game_name: 'League of Legends',
    players: '15.8K',
    views: '0',
    last_modified: 'June 18, 2025'
  },
  {
    id: 'G006',
    game_name: 'Overwatch 2',
    players: '6.8K',
    views: '9,876',
    last_modified: 'June 17, 2025'
  }
];

export const news = [
  {
    id: 'N001-001-001',
    title: 'World Championship 2024: Records Broken',
    description: 'The upcoming World Championship has shattered previous records.',
    views: '15,420',
    last_modified: 'June 22, 2025'
  },
  {
    id: 'N001-001-002',
    title: 'New Anti-Cheat System Deployed',
    description: 'Advanced AI-powered anti-cheat launched.',
    views: '0',
    last_modified: 'June 21, 2025'
  },
  {
    id: 'N001-001-003',
    title: 'Player Transfer Window Open',
    description: 'Team Phoenix secured the biggest transfer deal.',
    views: '8,932',
    last_modified: 'June 20, 2025'
  },
  {
    id: 'N001-001-004',
    title: 'Team Phoenix Dominates Regionals',
    description: 'Team Phoenix secured the championship title.',
    views: '12,105',
    last_modified: 'June 19, 2025'
  },
  {
    id: 'N001-001-005',
    title: 'Coaching Staff Changes Shake Up Teams',
    description: 'Major coaching shifts affect multiple teams.',
    views: '0',
    last_modified: 'June 18, 2025'
  },
  {
    id: 'N001-001-006',
    title: 'New Tournament Format Revealed',
    description: 'Team Phoenix secured the final announcement.',
    views: '8,676',
    last_modified: 'June 17, 2025'
  }
];

export const highlights = [
  {
    id: 'HL001-001-001',
    title: 'Team Alpha vs Team Beta - Match Highlights',
    duration: '8:45',
    views: '15,420',
    last_modified: 'June 22, 2025'
  },
  {
    id: 'HL001-001-002',
    title: 'Team Gamma vs Team Delta - Match Highlights',
    duration: '7:32',
    views: '0',
    last_modified: 'June 21, 2025'
  },
  {
    id: 'HL001-001-003',
    title: 'Team Echo vs Team Alpha - Match Highlights',
    duration: '9:15',
    views: '8,932',
    last_modified: 'June 20, 2025'
  },
  {
    id: 'HL001-001-004',
    title: 'Team Beta vs Team Gamma - Match Highlights',
    duration: '6:28',
    views: '12,105',
    last_modified: 'June 19, 2025'
  },
  {
    id: 'HL001-001-005',
    title: 'Team Delta vs Team Echo - Match Highlights',
    duration: '10:12',
    views: '0',
    last_modified: 'June 18, 2025'
  },
  {
    id: 'HL001-001-006',
    title: 'Team Alpha vs Team Gamma - Mini Highlights',
    duration: '8:55',
    views: '8,676',
    last_modified: 'June 17, 2025'
  }
];

export const rules = [
  {
    id: 'R001-001-001',
    title: 'Tournament Rules & Regulations',
    last_modified: 'June 22, 2025'
  },
  {
    id: 'R001-001-002',
    title: 'Tournament Rules & Regulations',
    last_modified: 'June 21, 2025'
  },
  {
    id: 'R001-001-003',
    title: 'Tournament Rules & Regulations',
    last_modified: 'June 20, 2025'
  },
  {
    id: 'R001-001-004',
    title: 'Tournament Rules & Regulations',
    last_modified: 'June 19, 2025'
  },
  {
    id: 'R001-001-005',
    title: 'Tournament Rules & Regulations',
    last_modified: 'June 18, 2025'
  },
  {
    id: 'R001-001-006',
    title: 'Tournament Rules & Regulations',
    last_modified: 'June 17, 2025'
  }
];

export const player_matches = [
  {
    id: "PM-001",
    players: [
      { name: "Faker", score: 3 },
      { name: "Chovy", score: 1 }
    ],
    date: "2024-05-18 18:00",
    viewers: 450000,
    status: "Completed",
    game: "League of Legends",
    tournament: "MSI 2024 - Semifinals",
    format: "BO5"
  },
  {
    id: "PM-002",
    players: [
      { name: "Ruler", score: 2 },
      { name: "Gumayusi", score: 3 }
    ],
    date: "2024-05-19 20:00",
    viewers: 500000,
    status: "Completed",
    game: "League of Legends",
    tournament: "MSI 2024 - Finals",
    format: "BO5"
  },
  {
    id: "PM-003",
    players: [
      { name: "Knight", score: 0 },
      { name: "Scout", score: 0 }
    ],
    date: "2024-06-10 15:00",
    viewers: 0,
    status: "Upcoming",
    game: "League of Legends",
    tournament: "LPL Summer Split 2024",
    format: "BO3"
  },
  {
    id: "PM-004",
    players: [
      { name: "Caps", score: 1 },
      { name: "Perkz", score: 2 }
    ],
    date: "2024-07-05 21:00",
    viewers: 120000,
    status: "Process",
    game: "League of Legends",
    tournament: "LEC Summer 2024",
    format: "BO5"
  }
];

export const team_matches = [
  {
    id: "TM-001",
    players: [
      { name: "T1", score: 3 },
      { name: "Gen.G", score: 2 }
    ],
    date: "2024-05-19 20:00",
    viewers: 800000,
    status: "Completed",
    game: "League of Legends",
    tournament: "MSI 2024 - Finals",
    format: "BO5"
  },
  {
    id: "TM-002",
    players: [
      { name: "JD Gaming", score: 2 },
      { name: "Bilibili Gaming", score: 3 }
    ],
    date: "2024-10-15 18:00",
    viewers: 950000,
    status: "Completed",
    game: "League of Legends",
    tournament: "Worlds 2024 - Semifinals",
    format: "BO5"
  },
  {
    id: "TM-003",
    players: [
      { name: "G2 Esports", score: 0 },
      { name: "T1", score: 0 }
    ],
    date: "2024-10-20 19:00",
    viewers: 0,
    status: "Upcoming",
    game: "League of Legends",
    tournament: "Worlds 2024 - Finals",
    format: "BO5"
  },
  {
    id: "TM-004",
    players: [
      { name: "Cloud9", score: 1 },
      { name: "Team Liquid", score: 2 }
    ],
    date: "2024-08-02 10:00",
    viewers: 300000,
    status: "Process",
    game: "League of Legends",
    tournament: "LCS Summer 2024",
    format: "BO5"
  }
];

export const team_registration_forms = [
  {
    id: "REG-2024-12-08-PHX",
    team_name: "Team Phoenix",
    tag: "PHX",
    status: "Pending",
    status_class: "pending",
    game: "League of Legends",
    tournament: "Winter Championship 2024",
    manager: { name: "John Smith", email: "john@teamphoenix.com", phone: "+1 (555) 123-4567" },
    submitted: "2024-12-08",
    members: [
      { name: "Alex Johnson",   handle: "PhoenixAlex#NA1" },
      { name: "Mike Chen",      handle: "MikeChen#NA1" },
      { name: "Sarah Williams", handle: "SarahW#NA1" },
      { name: "David Brown",    handle: "DavidB#NA1" },
      { name: "Lisa Garcia",    handle: "LisaG#NA1" }
    ]
  },
  {
    id: "REG-2024-12-07-TWF",
    team_name: "Thunder Wolves",
    tag: "TWF",
    status: "Pending",
    status_class: "pending",
    game: "Valorant",
    tournament: "Spring Invitational 2024",
    manager: { name: "Emma Davis", email: "emma@thunderwolves.com", phone: "+1 (555) 987-6543" },
    submitted: "2024-12-07",
    members: [
      { name: "Ryan Martinez",  handle: "RyanM#NA1" },
      { name: "Jessica Lee",    handle: "JessL#NA1" },
      { name: "Tom Wilson",     handle: "TomW#NA1" },
      { name: "Amy Taylor",     handle: "AmyT#NA1" },
      { name: "Chris Anderson", handle: "ChrisA#NA1" }
    ]
  },
  {
    id: "REG-2024-12-06-CKN",
    team_name: "Cyber Knights",
    tag: "CKN",
    status: "Approved",
    status_class: "approved",
    game: "Counter-Strike 2",
    tournament: "Pro League Season 3",
    manager: { name: "Robert Johnson", email: "robert@cyberknights.com", phone: "+1 (555) 456-7890" },
    submitted: "2024-12-06",
    members: [
      { name: "Kevin Park",     handle: "KevinP#NA1" },
      { name: "Maria Rodriguez",handle: "MariaR#NA1" },
      { name: "James Kim",      handle: "JamesK#NA1" },
      { name: "Anna Thompson",  handle: "AnnaT#NA1" },
      { name: "Daniel Lee",     handle: "DanielL#NA1" }
    ]
  },
  {
    id: "REG-2024-12-05-STR",
    team_name: "Storm Raiders",
    tag: "STR",
    status: "Rejected",
    status_class: "rejected",
    game: "League of Legends",
    tournament: "Winter Championship 2024",
    manager: { name: "Michael Zhang", email: "michael@stormraiders.com", phone: "+1 (555) 321-9876" },
    submitted: "2024-12-05",
    members: [
      { name: "Tyler Brooks",   handle: "TylerB#NA1" },
      { name: "Sophie Chen",    handle: "SophieC#NA1" },
      { name: "Marcus Johnson", handle: "MarcusJ#NA1" },
      { name: "Elena Rodriguez",handle: "ElenaR#NA1" },
      { name: "Jake Williams",  handle: "JakeW#NA1" }
    ]
  },
  {
    id: "REG-2024-11-20-DFR",
    team_name: "Dragon Force",
    tag: "DFR",
    status: "Pending",
    status_class: "pending",
    game: "Dota 2",
    tournament: "Autumn Clash 2024",
    manager: { name: "Victor Nguyen", email: "victor@dragonforce.gg", phone: "+84 90 123 4567" },
    submitted: "2024-11-20",
    members: [
      { name: "Nguyen Quang Huy", handle: "HuyNQ#VN1" },
      { name: "Tran Minh Khoa",   handle: "KhoaTM#VN1" },
      { name: "Le Tuan Anh",      handle: "TuanAnhL#VN1" },
      { name: "Pham Duc Thien",   handle: "ThienPD#VN1" },
      { name: "Vu Hoang Long",    handle: "LongVH#VN1" }
    ]
  },
  {
    id: "REG-2024-11-28-AFX",
    team_name: "Arctic Foxes",
    tag: "AFX",
    status: "Approved",
    status_class: "approved",
    game: "Valorant",
    tournament: "Southeast Showdown 2024",
    manager: { name: "Hannah Nguyen", email: "hannah@arcticfoxes.com", phone: "+1 (555) 765-4321" },
    submitted: "2024-11-28",
    members: [
      { name: "Oliver Hayes", handle: "OliverH#NA1" },
      { name: "Mia Nguyen",   handle: "MiaN#NA1" },
      { name: "Lucas Tran",   handle: "LucasT#NA1" },
      { name: "Ava Pham",     handle: "AvaP#NA1" },
      { name: "Ethan Vo",     handle: "EthanV#NA1" }
    ]
  },
  {
    id: "REG-2024-12-01-RRV",
    team_name: "Royal Ravens",
    tag: "RRV",
    status: "Pending",
    status_class: "pending",
    game: "Counter-Strike 2",
    tournament: "City Championship 2024",
    manager: { name: "Daniel Carter", email: "daniel@royalravens.org", phone: "+44 20 7946 1234" },
    submitted: "2024-12-01",
    members: [
      { name: "Harvey Cole",  handle: "HarveyC#EU1" },
      { name: "Noah Fisher",  handle: "NoahF#EU1" },
      { name: "Leo Wright",   handle: "LeoW#EU1" },
      { name: "Owen Baker",   handle: "OwenB#EU1" },
      { name: "Finn Cooper",  handle: "FinnC#EU1" }
    ]
  },
  {
    id: "REG-2024-12-03-NTN",
    team_name: "Neon Titans",
    tag: "NTN",
    status: "Approved",
    status_class: "approved",
    game: "League of Legends",
    tournament: "Summer Cup 2024",
    manager: { name: "Sarah Kim", email: "sarah@neontitans.com", phone: "+82 10-1234-5678" },
    submitted: "2024-12-03",
    members: [
      { name: "Minho Park",   handle: "MinhoP#KR1" },
      { name: "Jisoo Han",    handle: "JisooH#KR1" },
      { name: "Taeyang Choi", handle: "TaeyangC#KR1" },
      { name: "Hyun Lee",     handle: "HyunL#KR1" },
      { name: "Yuna Seo",     handle: "YunaS#KR1" }
    ]
  },
  {
    id: "REG-2024-11-30-VGE",
    team_name: "Vanguard Esports",
    tag: "VGE",
    status: "Rejected",
    status_class: "rejected",
    game: "Valorant",
    tournament: "Winter Invitational 2024",
    manager: { name: "Pavel Ivanov", email: "pavel@vanguard.gg", phone: "+7 999 123-45-67" },
    submitted: "2024-11-30",
    members: [
      { name: "Dmitry Morozov", handle: "DmitryM#RU1" },
      { name: "Sergey Petrov",  handle: "SergeyP#RU1" },
      { name: "Artem Sokolov",  handle: "ArtemS#RU1" },
      { name: "Ivan Kuznetsov", handle: "IvanK#RU1" },
      { name: "Nikita Smirnov", handle: "NikitaS#RU1" }
    ]
  },
  {
    id: "REG-2025-01-05-BLC",
    team_name: "Blue Comets",
    tag: "BLC",
    status: "Pending",
    status_class: "pending",
    game: "League of Legends",
    tournament: "Spring Split 2025",
    manager: { name: "Laura Park", email: "laura@bluecomets.com", phone: "+1 (555) 222-3344" },
    submitted: "2025-01-05",
    members: [
      { name: "Evan Brooks",   handle: "EvanB#NA1" },
      { name: "Noah Kim",      handle: "NoahK#NA1" },
      { name: "Mason Rivera",  handle: "MasonR#NA1" },
      { name: "Aiden Scott",   handle: "AidenS#NA1" },
      { name: "Caleb Diaz",    handle: "CalebD#NA1" }
    ]
  }
];

export const player_registration_forms = [
  {
    id: "REG-P-2024-12-08-001",
    player_name: "Alex Johnson",
    handle: "PhoenixAlex#NA1",
    status: "Pending",
    status_class: "pending",
    game: "League of Legends",
    tournament: "Winter Championship 2024",
    email: "alex.johnson@gmail.com",
    phone: "+1 (555) 123-4567",
    submitted: "2024-12-08"
  },
  {
    id: "REG-P-2024-12-07-002",
    player_name: "Mike Chen",
    handle: "MikeChen#NA1",
    status: "Pending",
    status_class: "pending",
    game: "Valorant",
    tournament: "Spring Invitational 2024",
    email: "mike.chen@gmail.com",
    phone: "+1 (555) 987-6543",
    submitted: "2024-12-07"
  },
  {
    id: "REG-P-2024-12-06-003",
    player_name: "Sarah Williams",
    handle: "SarahW#NA1",
    status: "Approved",
    status_class: "approved",
    game: "Counter-Strike 2",
    tournament: "Pro League Season 3",
    email: "sarah.williams@gmail.com",
    phone: "+1 (555) 456-7890",
    submitted: "2024-12-06"
  },
  {
    id: "REG-P-2024-12-05-004",
    player_name: "David Brown",
    handle: "DavidB#NA1",
    status: "Rejected",
    status_class: "rejected",
    game: "League of Legends",
    tournament: "Winter Championship 2024",
    email: "david.brown@gmail.com",
    phone: "+1 (555) 321-9876",
    submitted: "2024-12-05"
  },
  {
    id: "REG-P-2024-11-20-005",
    player_name: "Nguyen Quang Huy",
    handle: "HuyNQ#VN1",
    status: "Pending",
    status_class: "pending",
    game: "Dota 2",
    tournament: "Autumn Clash 2024",
    email: "huy.nguyen@gmail.com",
    phone: "+84 90 123 4567",
    submitted: "2024-11-20"
  },
  {
    id: "REG-P-2024-11-28-006",
    player_name: "Oliver Hayes",
    handle: "OliverH#NA1",
    status: "Approved",
    status_class: "approved",
    game: "Valorant",
    tournament: "Southeast Showdown 2024",
    email: "oliver.hayes@gmail.com",
    phone: "+1 (555) 765-4321",
    submitted: "2024-11-28"
  }
];

export const website_traffic_data = {
  daily: [
    { date: "2024-12-01", visitors: 1245 },
    { date: "2024-12-02", visitors: 1389 },
    { date: "2024-12-03", visitors: 1156 },
    { date: "2024-12-04", visitors: 1467 },
    { date: "2024-12-05", visitors: 1523 },
    { date: "2024-12-06", visitors: 1678 },
    { date: "2024-12-07", visitors: 1834 },
    { date: "2024-12-08", visitors: 1567 },
    { date: "2024-12-09", visitors: 1432 },
    { date: "2024-12-10", visitors: 1298 },
    { date: "2024-12-11", visitors: 1456 },
    { date: "2024-12-12", visitors: 1612 },
    { date: "2024-12-13", visitors: 1789 },
    { date: "2024-12-14", visitors: 1923 },
    { date: "2024-12-15", visitors: 1678 },
    { date: "2024-12-16", visitors: 1534 },
    { date: "2024-12-17", visitors: 1445 },
    { date: "2024-12-18", visitors: 1567 },
    { date: "2024-12-19", visitors: 1689 },
    { date: "2024-12-20", visitors: 1812 },
    { date: "2024-12-21", visitors: 1934 },
    { date: "2024-12-22", visitors: 2156 },
    { date: "2024-12-23", visitors: 2234 },
    { date: "2024-12-24", visitors: 1876 }
  ],
  monthly: [
    { month: "2024-01", visitors: 42567 },
    { month: "2024-02", visitors: 38923 },
    { month: "2024-03", visitors: 45234 },
    { month: "2024-04", visitors: 41876 },
    { month: "2024-05", visitors: 47123 },
    { month: "2024-06", visitors: 49567 },
    { month: "2024-07", visitors: 52341 },
    { month: "2024-08", visitors: 48976 },
    { month: "2024-09", visitors: 46789 },
    { month: "2024-10", visitors: 51234 },
    { month: "2024-11", visitors: 53678 },
    { month: "2024-12", visitors: 39876 }
  ]
};


