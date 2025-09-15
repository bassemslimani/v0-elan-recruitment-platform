import { config } from "dotenv"
import { resolve } from "path"

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") })

import { db } from '../lib/db'
import { users, companies, candidates, jobs, applications } from '../lib/schema'
import { hash } from 'bcryptjs'

async function seed() {
  console.log('🌱 Starting database seeding...')

  try {
    // Create sample users
    const hashedPassword = await hash('password123', 12)
    
    const sampleUsers = await db.insert(users).values([
      {
        email: 'admin@elan.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
      {
        email: 'company1@techcorp.com',
        password: hashedPassword,
        firstName: 'Tech',
        lastName: 'Corp',
        role: 'company',
      },
      {
        email: 'company2@innovatelabs.com',
        password: hashedPassword,
        firstName: 'Innovate',
        lastName: 'Labs',
        role: 'company',
      },
      {
        email: 'candidate1@email.com',
        password: hashedPassword,
        firstName: 'Ahmed',
        lastName: 'Benali',
        role: 'candidate',
      },
      {
        email: 'candidate2@email.com',
        password: hashedPassword,
        firstName: 'Fatima',
        lastName: 'Khelifi',
        role: 'candidate',
      },
    ]).returning()

    console.log('✅ Users created')

    // Create sample companies
    const sampleCompanies = await db.insert(companies).values([
      {
        userId: sampleUsers[1].id, // Tech Corp user
        name: 'TechCorp Algérie',
        description: 'Leading technology company in Algeria specializing in software development and digital transformation.',
        website: 'https://techcorp.dz',
        industry: 'Technology',
        size: '51-200',
        location: 'Alger, Algérie',
      },
      {
        userId: sampleUsers[2].id, // Innovate Labs user
        name: 'InnovateLabs',
        description: 'Innovation-driven company focused on product development and digital solutions.',
        website: 'https://innovatelabs.dz',
        industry: 'Technology',
        size: '11-50',
        location: 'Oran, Algérie',
      },
    ]).returning()

    console.log('✅ Companies created')

    // Create sample candidates
    const sampleCandidates = await db.insert(candidates).values([
      {
        userId: sampleUsers[3].id, // Ahmed
        title: 'Développeur Frontend Senior',
        bio: 'Développeur passionné avec 5 ans d\'expérience en React et TypeScript.',
        location: 'Alger, Algérie',
        phone: '+213 555 123 456',
        experience: 5,
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
        linkedIn: 'https://linkedin.com/in/ahmed-benali',
        github: 'https://github.com/ahmed-benali',
        expectedSalary: 180000,
        isAvailable: true,
      },
      {
        userId: sampleUsers[4].id, // Fatima
        title: 'UX/UI Designer',
        bio: 'Designer créative spécialisée dans l\'expérience utilisateur et l\'interface.',
        location: 'Constantine, Algérie',
        phone: '+213 555 789 012',
        experience: 3,
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
        linkedIn: 'https://linkedin.com/in/fatima-khelifi',
        portfolio: 'https://fatima-design.com',
        expectedSalary: 150000,
        isAvailable: true,
      },
    ]).returning()

    console.log('✅ Candidates created')

    // Create sample jobs
    const sampleJobs = await db.insert(jobs).values([
      {
        companyId: sampleCompanies[0].id, // TechCorp
        title: 'Développeur Frontend Senior',
        description: 'Nous recherchons un développeur frontend senior pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant les dernières technologies.',
        requirements: ['React', 'TypeScript', 'Next.js', '5+ années d\'expérience'],
        benefits: ['Assurance santé', 'Télétravail', 'Formation continue', 'Bonus performance'],
        location: 'Alger, Algérie',
        type: 'full-time',
        level: 'senior',
        salaryMin: 150000,
        salaryMax: 200000,
        skills: ['React', 'TypeScript', 'Next.js'],
        isActive: true,
        isRemote: false,
      },
      {
        companyId: sampleCompanies[1].id, // InnovateLabs
        title: 'Chef de Produit',
        description: 'Rejoignez notre équipe produit pour conduire l\'innovation et développer des solutions qui changent la donne.',
        requirements: ['Gestion de produit', 'Agile', 'Analytics', '3+ années d\'expérience'],
        benefits: ['Assurance santé', 'Horaires flexibles', 'Budget formation'],
        location: 'Oran, Algérie',
        type: 'full-time',
        level: 'mid',
        salaryMin: 180000,
        salaryMax: 250000,
        skills: ['Product Management', 'Agile', 'Analytics'],
        isActive: true,
        isRemote: false,
      },
      {
        companyId: sampleCompanies[0].id, // TechCorp
        title: 'Designer UX',
        description: 'Créez des expériences utilisateur exceptionnelles pour nos clients et produits.',
        requirements: ['Figma', 'Recherche utilisateur', 'Prototypage', '2+ années d\'expérience'],
        benefits: ['Télétravail', 'Horaires flexibles', 'Liberté créative'],
        location: 'Télétravail',
        type: 'contract',
        level: 'mid',
        salaryMin: 120000,
        salaryMax: 160000,
        skills: ['Figma', 'User Research', 'Prototyping'],
        isActive: true,
        isRemote: true,
      },
    ]).returning()

    console.log('✅ Jobs created')

    // Create sample applications
    await db.insert(applications).values([
      {
        jobId: sampleJobs[0].id, // Frontend job
        candidateId: sampleCandidates[0].id, // Ahmed
        status: 'pending',
        coverLetter: 'Je suis très intéressé par ce poste de développeur frontend senior. Mon expérience en React et TypeScript correspond parfaitement aux exigences.',
        matchScore: 92,
      },
      {
        jobId: sampleJobs[2].id, // UX Designer job
        candidateId: sampleCandidates[1].id, // Fatima
        status: 'reviewed',
        coverLetter: 'En tant que designer UX passionnée, je serais ravie de contribuer à vos projets créatifs.',
        matchScore: 88,
      },
    ])

    console.log('✅ Applications created')
    console.log('🎉 Database seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seed().then(() => {
  console.log('Seeding finished')
  process.exit(0)
})