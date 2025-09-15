import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "elan",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Create Drizzle instance
export const db = drizzle(pool, { schema })

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    console.log("Database connected successfully")
    client.release()
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// Close database connection
export async function closeConnection() {
  await pool.end()
}