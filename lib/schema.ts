import { pgTable, serial, varchar, text, timestamp, integer, boolean, jsonb, uuid, decimal } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table - for authentication and basic user info
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().default('candidate'), // 'candidate', 'company', 'admin'
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Companies table
export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  website: varchar('website', { length: 255 }),
  logo: varchar('logo', { length: 500 }),
  industry: varchar('industry', { length: 100 }),
  size: varchar('size', { length: 50 }), // '1-10', '11-50', '51-200', etc.
  location: varchar('location', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Candidates table
export const candidates = pgTable('candidates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }), // Professional title
  bio: text('bio'),
  avatar: varchar('avatar', { length: 500 }),
  location: varchar('location', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  experience: integer('experience'), // Years of experience
  skills: jsonb('skills'), // Array of skills
  resume: varchar('resume', { length: 500 }), // Resume file URL
  portfolio: varchar('portfolio', { length: 500 }),
  linkedIn: varchar('linkedin', { length: 255 }),
  github: varchar('github', { length: 255 }),
  expectedSalary: decimal('expected_salary', { precision: 10, scale: 2 }),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Jobs table
export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').references(() => companies.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  requirements: jsonb('requirements'), // Array of requirements
  benefits: jsonb('benefits'), // Array of benefits
  location: varchar('location', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'full-time', 'part-time', 'contract', 'internship'
  level: varchar('level', { length: 50 }), // 'entry', 'mid', 'senior', 'lead'
  salaryMin: decimal('salary_min', { precision: 10, scale: 2 }),
  salaryMax: decimal('salary_max', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 10 }).default('DA'),
  skills: jsonb('skills'), // Required skills
  isActive: boolean('is_active').default(true),
  isRemote: boolean('is_remote').default(false),
  applicationDeadline: timestamp('application_deadline'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Job Applications table
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobId: uuid('job_id').references(() => jobs.id).notNull(),
  candidateId: uuid('candidate_id').references(() => candidates.id).notNull(),
  status: varchar('status', { length: 50 }).default('pending'), // 'pending', 'reviewed', 'interview', 'rejected', 'accepted'
  coverLetter: text('cover_letter'),
  matchScore: integer('match_score'), // Algorithm-calculated match score
  appliedAt: timestamp('applied_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Define relations
export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.id],
    references: [companies.userId],
  }),
  candidate: one(candidates, {
    fields: [users.id],
    references: [candidates.userId],
  }),
}))

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
  jobs: many(jobs),
}))

export const candidatesRelations = relations(candidates, ({ one, many }) => ({
  user: one(users, {
    fields: [candidates.userId],
    references: [users.id],
  }),
  applications: many(applications),
}))

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  applications: many(applications),
}))

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  candidate: one(candidates, {
    fields: [applications.candidateId],
    references: [candidates.id],
  }),
}))

// Export types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Company = typeof companies.$inferSelect
export type NewCompany = typeof companies.$inferInsert
export type Candidate = typeof candidates.$inferSelect
export type NewCandidate = typeof candidates.$inferInsert
export type Job = typeof jobs.$inferSelect
export type NewJob = typeof jobs.$inferInsert
export type Application = typeof applications.$inferSelect
export type NewApplication = typeof applications.$inferInsert