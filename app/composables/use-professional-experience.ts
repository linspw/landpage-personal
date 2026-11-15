export interface ExperienceItem {
  icon: string
  date: string
  title: string
  company: string
  image: string
  companyMark?: string
  location: string
  text: string
  skills: string[]
  isCurrentJob?: boolean
  workMode?: 'remote' | 'onsite' | 'hybrid'
}

export const useProfessionalExperience = () => {
  const { t } = useI18n({ useScope: 'global' })

  return computed<ExperienceItem[]>(() => [
    {
      icon: 'fas fa-rocket',
      date: t('professionalExperience.item6.date'),
      title: t('professionalExperience.item6.title'),
      company: 'Qeevo Group',
      image: '/images/companies/qeevo.png',
      companyMark: '/images/companies/qeevo-mark.svg',
      location: t('professionalExperience.item6.location'),
      text: t('professionalExperience.item6.text'),
      isCurrentJob: true,
      workMode: 'onsite' as const,
      skills: ['Vue.js', 'Nuxt', 'TypeScript', 'Design System'],
    },
    {
      icon: 'fas fa-crown',
      date: t('professionalExperience.item5b.date'),
      title: t('professionalExperience.item5b.title'),
      company: 'Shipeezi',
      image: '/images/companies/shipeezi.png',
      location: t('professionalExperience.item5b.location'),
      text: t('professionalExperience.item5b.text'),
      workMode: 'remote' as const,
      skills: [
        'React',
        'React Native',
        'TypeScript',
        'NestJS',
        'Leadership',
        'Project Management',
      ],
    },
    {
      icon: 'fas fa-code',
      date: t('professionalExperience.item5.date'),
      title: t('professionalExperience.item5.title'),
      company: 'Shipeezi',
      image: '/images/companies/shipeezi.png',
      location: t('professionalExperience.item5.location'),
      text: t('professionalExperience.item5.text'),
      workMode: 'remote' as const,
      skills: [
        'React',
        'React Native',
        'TypeScript',
        'NestJS',
        'MySQL',
        'AWS S3',
        'Node.js',
      ],
    },
    {
      icon: 'fas fa-bus',
      date: t('professionalExperience.item1.date'),
      title: t('professionalExperience.item1.title'),
      company: 'Buser Brasil',
      image: '/images/companies/buser.svg',
      location: t('professionalExperience.item1.location'),
      text: t('professionalExperience.item1.text'),
      workMode: 'remote' as const,
      skills: ['Vue.js', 'Nuxt', 'Django', 'Python', 'AWS S3', 'Node.js'],
    },
    {
      icon: 'fas fa-laptop-code',
      date: t('professionalExperience.item2.date'),
      title: t('professionalExperience.item2.title'),
      company: 'Quero Educação',
      image: '/images/companies/quero_educacao.svg',
      location: t('professionalExperience.item2.location'),
      text: t('professionalExperience.item2.text'),
      workMode: 'remote' as const,
      skills: ['Vue.js', 'React', 'Phoenix', 'Elixir', 'Rails', 'Ruby'],
    },
    {
      icon: 'fas fa-seedling',
      date: t('professionalExperience.item3.date'),
      title: t('professionalExperience.item3.title'),
      company: 'Quero Educação',
      image: '/images/companies/quero_educacao.svg',
      location: t('professionalExperience.item3.location'),
      text: t('professionalExperience.item3.text'),
      workMode: 'remote' as const,
      skills: ['Vue.js', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      icon: 'fas fa-cogs',
      date: t('professionalExperience.item4.date'),
      title: t('professionalExperience.item4.title'),
      company: 'Quero Educação',
      image: '/images/companies/quero_educacao.svg',
      location: t('professionalExperience.item4.location'),
      text: t('professionalExperience.item4.text'),
      workMode: 'onsite' as const,
      skills: ['Site Operations', 'Web Platform'],
    },
  ])
}
