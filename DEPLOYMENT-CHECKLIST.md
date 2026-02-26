# 📋 Deployment Checklist — Virasat se Vikas tak

Use this checklist before deploying to production.

## 🔒 Security

- [ ] All API keys are in environment variables (not hardcoded)
- [ ] `.env.local` is in `.gitignore`
- [ ] Service role key is never exposed to client
- [ ] CORS is properly configured
- [ ] Input validation on all API routes
- [ ] SQL injection prevention (using Supabase parameterized queries)
- [ ] Rate limiting implemented on API routes
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Content Security Policy headers configured

## 🗄️ Database

- [ ] All tables created in Supabase
- [ ] Seed data loaded successfully
- [ ] Indexes created for performance
- [ ] Row Level Security (RLS) policies configured
- [ ] Database backups enabled
- [ ] Connection pooling configured
- [ ] Query performance tested

## 🧪 Testing

- [ ] All pages load without errors
- [ ] Advisory generation works for Lucknow + Wheat
- [ ] Feedback submission works
- [ ] Traditional knowledge submission works
- [ ] Admin verification works
- [ ] Dashboard displays correctly
- [ ] Hindi audio playback works
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] API endpoints return correct data

## ⚡ Performance

- [ ] Images optimized
- [ ] Bundle size checked (`npm run build`)
- [ ] Lighthouse score > 80
- [ ] Time to First Byte (TTFB) < 600ms
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] No console errors in production build

## 📱 Accessibility

- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Forms have proper labels
- [ ] Error messages are clear

## 🌐 SEO

- [ ] Page titles are descriptive
- [ ] Meta descriptions added
- [ ] Open Graph tags for social sharing
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Structured data added (optional)

## 🚀 Deployment

- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] Environment variables set in hosting platform
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Error monitoring setup (Sentry, LogRocket)
- [ ] Analytics configured (Google Analytics, Plausible)
- [ ] CDN configured for static assets

## 📊 Monitoring

- [ ] Uptime monitoring enabled
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Database query monitoring
- [ ] API response time tracking
- [ ] User behavior analytics

## 📝 Documentation

- [ ] README.md updated
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Setup instructions tested
- [ ] Deployment guide verified
- [ ] Contribution guidelines added

## 🔄 Post-Deployment

- [ ] Smoke test all critical features
- [ ] Check error logs
- [ ] Monitor database performance
- [ ] Test email notifications (if applicable)
- [ ] Verify webhook integrations (if applicable)
- [ ] Test payment processing (if applicable)
- [ ] Announce launch to stakeholders

## 🛠️ Maintenance Plan

- [ ] Regular database backups scheduled
- [ ] Dependency updates planned (monthly)
- [ ] Security patches process defined
- [ ] Support contact information published
- [ ] Bug reporting system in place
- [ ] Feature request process documented

## 📈 Growth Preparation

- [ ] Database scaling plan ready
- [ ] API rate limiting in place
- [ ] CDN configured for traffic spikes
- [ ] Monitoring alerts configured
- [ ] Disaster recovery plan documented
- [ ] Data export functionality available

---

## ✅ Pre-Launch Final Check

Before going live, verify:

1. **Test User Flow**:
   - Home → Advisory → Get recommendations → Provide feedback
   - Admin → Submit knowledge → Verify submission

2. **Data Integrity**:
   - Seed data loaded correctly
   - No duplicate entries
   - All foreign keys valid

3. **User Experience**:
   - No broken links
   - All buttons work
   - Forms validate properly
   - Error messages are helpful

4. **Performance**:
   - Page load < 3 seconds
   - API response < 500ms
   - No memory leaks

5. **Legal**:
   - Privacy policy published
   - Terms of service published
   - Cookie consent (if using analytics)
   - Data protection compliance

---

## 🚨 Emergency Contacts

Prepare a list of contacts for production issues:

- **Database Admin**: [name/email]
- **DevOps Lead**: [name/email]
- **Product Owner**: [name/email]
- **Hosting Support**: Vercel/Netlify support

---

## 📞 Rollback Plan

If something goes wrong:

1. Revert to previous deployment in Vercel
2. Check database for corrupted data
3. Restore database from backup if needed
4. Communicate status to users
5. Document incident for post-mortem

---

**Remember**: It's better to delay launch than to deploy a broken product!

Good luck with your launch! 🚀🌾
