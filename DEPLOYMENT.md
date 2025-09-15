# Deployment Guide for Coolify

This guide will help you deploy the Elan Recruitment Platform on Coolify.

## Prerequisites

- Coolify instance running
- PostgreSQL database (can be deployed on Coolify or external)
- Domain name (optional but recommended)

## Step 1: Prepare Your Repository

1. Ensure all files are committed to your Git repository
2. Push your code to a Git provider (GitHub, GitLab, etc.)

## Step 2: Database Setup

### Option A: Deploy PostgreSQL on Coolify

1. In Coolify dashboard, go to **Resources** → **Databases**
2. Click **+ New Database**
3. Select **PostgreSQL**
4. Configure:
   - **Name**: `elan-postgres`
   - **Database Name**: `elan`
   - **Username**: `postgres`
   - **Password**: Generate a secure password
5. Deploy the database
6. Note the connection details for later use

### Option B: Use External PostgreSQL

If you have an existing PostgreSQL instance, note down:
- Host
- Port (usually 5432)
- Database name
- Username
- Password

## Step 3: Deploy the Application

1. In Coolify dashboard, go to **Resources** → **Applications**
2. Click **+ New Application**
3. Select **Public Repository** or **Private Repository**
4. Enter your repository URL
5. Configure the application:
   - **Name**: `elan-recruitment-platform`
   - **Branch**: `main` (or your default branch)
   - **Build Pack**: `Docker`
   - **Port**: `3000`

## Step 4: Environment Variables

In the application settings, add the following environment variables:

### Required Variables
```
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=elan
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Generate NextAuth Secret
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 5: Domain Configuration (Optional)

1. In the application settings, go to **Domains**
2. Add your custom domain
3. Coolify will automatically handle SSL certificates

## Step 6: Deploy

1. Click **Deploy** to start the deployment
2. Monitor the build logs for any issues
3. Once deployed, the application will be available at your configured domain

## Step 7: Database Migration and Seeding

After the first successful deployment:

1. Go to the application's **Terminal** in Coolify
2. Run the following commands:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

## Troubleshooting

### Build Issues
- Check the build logs in Coolify
- Ensure all dependencies are in `package.json`
- Verify Dockerfile syntax

### Database Connection Issues
- Verify environment variables are correct
- Check if PostgreSQL service is running
- Ensure network connectivity between app and database

### Application Not Starting
- Check application logs in Coolify
- Verify port configuration (should be 3000)
- Ensure all required environment variables are set

## Monitoring and Maintenance

- Monitor application logs through Coolify dashboard
- Set up health checks if needed
- Regular database backups (Coolify can handle this automatically)
- Keep dependencies updated

## Scaling

Coolify supports horizontal scaling:
1. Go to application settings
2. Adjust the **Replicas** count
3. Redeploy the application

## Security Considerations

- Use strong passwords for database
- Keep NextAuth secret secure
- Enable HTTPS (Coolify handles this automatically)
- Regular security updates
- Consider using environment-specific secrets management

## Support

For issues specific to:
- **Coolify**: Check Coolify documentation
- **Application**: Check application logs and this repository's issues
- **Database**: Check PostgreSQL logs in Coolify