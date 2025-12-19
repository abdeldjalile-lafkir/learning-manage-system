## Project Overview

Build a **Private Tutoring & Support Lessons Management System** with a modern, scalable architecture supporting multiple roles and bilingual functionality.

## Tech Stack

- **Database**: PostgreSQL
- **Frontend & Backend**: Next.js (full-stack)
- **UI Library**: shadcn/ui with modern, responsive design
  https:21st.dev + reactbits for more
- **Styling**: Tailwind CSS
- **Languages**: Arabic + English (RTL support for Arabic)
- **Theme**: Dark + Light mode
- **Sticky Floating Headet**
- **Landind page** : hero + CTA + trustedby + features + howitwork + plans + whatourcustumersay + faq + feedback form + footer

## User Roles & Permissions

### Admin Role (Full System Control)

- User management (create, edit, delete teachers and students)
- Course and subject management
- System-wide settings and configurations
- Financial reports and payment tracking
- Analytics dashboard with insights
- Backup and data export functionality
- Notification management system
- Access logs and audit trails

### Teacher Role

**Course & Content Management**:

- Create and manage course groups/classes
- Upload lesson materials (PDFs, documents, presentations)
- Upload video lessons with progress tracking
- Upload supplementary attachments and resources
- Organize content by modules/chapters

**Student Management**:

- Accept/reject student enrollment requests
- Cancel student subscriptions from sessions
- View student profiles and progress
- Track student attendance

**Scheduling**:

- Schedule live meeting sessions (with date, time, duration)
- Reschedule or cancel sessions
- Set recurring session patterns

**Communication**:

- Send notifications to students (individual or group)
- Announce session updates
- Receive payment notifications with receipts from students

**Payment Tracking**:

- View payment status per student
- Mark payments as received
- Generate payment reports for their courses[2][3]

### Student Role

**Enrollment**:

- Browse available courses with detailed descriptions
- Explore courses page with filters (subject, level, teacher, price)
- Request enrollment in courses/sessions
- View enrollment status (pending, approved, rejected)

**Payment**:

- Complete payment outside the application
- Upload payment receipt
- Send payment notification to teacher with proof
- View payment history

**Learning**:

- Access enrolled courses dashboard
- Watch video lessons with progress tracking
- Download lesson materials and attachments
- Track personal progress and completion percentage
- View upcoming scheduled sessions

**Communication**:

- Receive notifications about sessions, announcements
- View session calendar
- Access teacher contact information[4][3]

## Core Features to Include

### Authentication & Security

- Secure login/registration for all roles
- Email verification
- Password reset functionality
- Role-based access control (RBAC)
- Session management and timeout
- Two-factor authentication (optional)
- NextAuth with clerk

### Dashboard (Role-Specific)

- **Admin**: System statistics, user analytics, revenue reports
- **Teacher**: Active courses, upcoming sessions, pending enrollments, recent payments
- **Student**: Enrolled courses, progress overview, upcoming sessions, notifications

### Course Management

- Course categories and tags
- Course difficulty levels
- Prerequisites system
- Course capacity limits
- Course status (active, archived, draft)
- Featured courses section

### Notification System

- In-app notifications
- Email notifications (require)
- whatsapp notifications (require)
- Notification preferences per user
- Mark as read/unread functionality

### Calendar & Scheduling

- Integrated calendar view
- Session reminders
- Time zone support
- iCal export functionality

### Reports & Analytics

- Student progress reports
- Teacher performance metrics
- Course completion rates
- Payment analytics
- Attendance tracking[1][3]

### Search & Filtering

- Search courses by name, teacher, subject
- Filter by price range, level, category
- Sort by popularity, newest, rating

## Database Schema Considerations

**Key Tables**:

- users (with role field)
- courses
- lessons
- video_lessons
- attachments
- enrollments
- sessions
- payments
- notifications
- progress_tracking
- categories
- groups

## Architecture Best Practices

### Scalability

- Modular folder structure with feature-based organization
- Separate API routes for each domain (users, courses, payments)
- Database indexing on frequently queried fields
- Pagination for large data sets
- Lazy loading for videos and content
- CDN integration for media files

### Code Organization

```
/app
  /(auth) - Authentication pages
  /(admin) - Admin dashboard & pages
  /(teacher) - Teacher dashboard & pages
  /(student) - Student dashboard & pages
  /api - API routes
/components
  /ui - shadcn components
  /shared - Reusable components
  /admin, /teacher, /student - Role-specific components
/lib
  /db - Database utilities
  /auth - Authentication logic
  /utils - Helper functions
/hooks - Custom React hooks
/actions - server actions
/providers - theme, language and others
/types - TypeScript types
/public - Static assets
```

### Additional required Features

- API versioning for backward compatibility
- Webhook support for integrations
- Export data functionality (CSV, PDF)
- Video conferencing integration (Zoom, Google Meet)
- AI-powered recommendations
- Gamification elements (badges, achievements)
- Discussion forums per course
- Certificate generation upon completion

## Additional Features to Consider

### Student Features

- Wishlist for courses
- Course reviews and ratings
- Progress certificates
- Study reminders
- Note-taking within lessons
- Bookmark favorite lessons

### Teacher Features

- Bulk actions for student management
- Template messages for notifications
- Performance analytics per course
- Student engagement metrics
- Waiting list management[2]

### System Features

- Multi-language content support English+ Arabic
- File size limits and validation with zod
- Video player with speed control and subtitles
- Automated backup system
- Activity logs
- Terms of service and privacy policy pages
- FAQ and help center

---

This organized specification ensures your application is scalable, maintainable, and ready for continuous feature additions
