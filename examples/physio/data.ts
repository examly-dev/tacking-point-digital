export const physioPath = '/preview/ridgeway-physio';

export function servicePath(slug: string) {
  return `${physioPath}/services/${slug}`;
}

export const GREEN = '#1A4D3E';
export const mark = 'font-[family-name:var(--rw-display)] font-bold tracking-[-0.03em]';
export const menu = 'font-[family-name:var(--rw-display)] font-medium tracking-[-0.01em]';
export const label = 'text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0B0B]/55';
export const rule = 'border-[#0B0B0B]/15';

export const slots = [
  { day: 'Tomorrow', time: '08:15', who: 'Sam' },
  { day: 'Tomorrow', time: '11:45', who: 'Priya' },
  { day: 'Thursday', time: '07:30', who: 'Tom' },
];

export const fees = [
  { item: 'Initial consultation', len: '45 min', price: 120 },
  { item: 'Standard follow-up', len: '30 min', price: 95 },
  { item: 'Extended follow-up', len: '45 min', price: 130 },
  { item: 'Clinical Pilates / exercise class', len: '60 min · small group', price: 35 },
];

export const people = [
  {
    id: 'sam',
    name: 'Sam Ridgeway',
    role: 'Principal physiotherapist',
    note: 'Musculoskeletal and spinal. Workers compensation and CTP claims.',
    photo: 'sam.jpg',
    pos: 'object-[72%_18%]',
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    role: 'Sports physiotherapist',
    note: 'Sports injuries, knees and shoulders, return to running.',
    photo: 'priya.jpg',
    pos: 'object-[38%_18%]',
  },
  {
    id: 'tom',
    name: 'Tom Alder',
    role: 'Physiotherapist',
    note: 'Post-surgical rehab and clinical exercise classes.',
    photo: 'tom.jpg',
    pos: 'object-[50%_45%]',
  },
] as const;

export type Service = {
  slug: string;
  h: string;
  p: string;
  appointment: string;
  duration: string;
  price: number;
  clinicians: (typeof people)[number]['id'][];
  typical: string[];
  body: string[];
};

export const services: Service[] = [
  {
    slug: 'musculoskeletal',
    h: 'Musculoskeletal physio',
    p: 'Joints, muscles and tendons. Assessment, hands-on treatment and a plan you can follow at home.',
    appointment: 'New patient',
    duration: '45 min',
    price: 120,
    clinicians: ['sam', 'priya', 'tom'],
    typical: ['Shoulder and rotator cuff', 'Knee and hip osteoarthritis', 'Tendinopathy', 'Workplace overuse'],
    body: [
      'The first appointment is 45 minutes: history, examination, and a working diagnosis. Treatment that day if it is indicated, then a written plan for the next two weeks.',
      'Follow-ups are 30 minutes unless we book an extended slot. We use HICAPS at the desk. Workers compensation and CTP files stay with the treating physio.',
    ],
  },
  {
    slug: 'sports-injuries',
    h: 'Sports injuries',
    p: 'Sprains, strains and return-to-play. Weekend sport as well as club and school athletes.',
    appointment: 'New patient',
    duration: '45 min',
    price: 120,
    clinicians: ['priya', 'sam'],
    typical: ['Ankle sprains', 'ACL and meniscus rehab', 'Shoulder instability', 'Return to running'],
    body: [
      'Assessment covers the injury, the sport, and when you need to be back. Imaging only if it changes the plan. Return-to-play is written, not guessed.',
      'Priya takes most of the sports load; Sam sees spines and more complex presentations. School and club letters are included when you need them.',
    ],
  },
  {
    slug: 'back-and-neck',
    h: 'Back and neck pain',
    p: 'Acute or long-standing. Hands-on work where it helps, then exercise so it stays better.',
    appointment: 'New patient',
    duration: '45 min',
    price: 120,
    clinicians: ['sam', 'tom'],
    typical: ['Acute lumbar sprain', 'Disc-related pain', 'Cervicogenic headache', 'Postural and desk-related neck pain'],
    body: [
      'We screen for anything that does not belong in a physio room, then treat what does. Manual therapy is used where it changes symptoms, not as a standing order.',
      'Most back and neck plans move into the gym at the back within a few visits. Sam holds the spinal caseload; Tom takes the exercise once you are stable.',
    ],
  },
  {
    slug: 'post-surgical',
    h: 'Post-surgical rehab',
    p: 'After knee, hip, shoulder or spinal surgery. We follow your surgeon’s protocol and keep them in the loop.',
    appointment: 'New patient',
    duration: '45 min',
    price: 120,
    clinicians: ['tom', 'sam'],
    typical: ['Knee replacement and ACL reconstruction', 'Hip replacement', 'Rotator cuff repair', 'Spinal decompression / fusion'],
    body: [
      'Bring the operation note and the surgeon’s protocol if you have them. We follow that protocol and write back at the usual milestones.',
      'Early sessions are 45 minutes. Later ones can drop to 30, or move into a supervised class. Tom runs most of this caseload.',
    ],
  },
  {
    slug: 'dry-needling',
    h: 'Dry needling',
    p: 'Used alongside manual therapy for tight muscle, not as a treatment on its own.',
    appointment: 'Follow-up',
    duration: '30 min',
    price: 95,
    clinicians: ['sam', 'priya'],
    typical: ['Myofascial trigger points', 'Calf and hamstring tightness', 'Trapezius and neck', 'Gluteal and hip'],
    body: [
      'Dry needling is booked as part of a normal physio appointment, not as a standalone service. Consent is taken each time. If you would rather not have it, we work without it.',
      'It is not a first-visit treatment. We use it when examination points to tight muscle that is limiting movement or pain.',
    ],
  },
  {
    slug: 'exercise-rehab',
    h: 'Exercise rehab and clinical Pilates',
    p: 'Supervised strength and mat work in the gym at the back. Small groups, or one-to-one if you need it.',
    appointment: 'Clinical Pilates',
    duration: '60 min · small group',
    price: 35,
    clinicians: ['tom'],
    typical: ['Post-physio strengthening', 'Clinical Pilates mat work', 'Return to gym after injury', 'One-to-one exercise sessions'],
    body: [
      'Classes are 60 minutes, six people, reformers and the floor. You need an assessment first so the exercises match the problem.',
      'One-to-one exercise is billed as a standard or extended follow-up. Tom runs the gym; Sam or Priya will hand you over with notes.',
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const nav = [
  { href: '#services', label: 'Services', path: `${physioPath}#services` },
  { href: '#book', label: 'Book', path: `${physioPath}#book` },
  { href: '#fees', label: 'Fees', path: `${physioPath}#fees` },
  { href: '#people', label: 'People', path: `${physioPath}#people` },
  { href: '#visit', label: 'Visit', path: `${physioPath}#visit` },
] as const;
