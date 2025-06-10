<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ $t('footer.about') }}</h1>
          <p class="hero-subtitle">
            {{ $t('about.heroSubtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Company Overview -->
    <section class="company-overview">
      <div class="container">
        <div class="section-content">
          <div class="text-content">
            <h2>{{ $t('about.companyOverview.title') }}</h2>
            <p>{{ $t('about.companyOverview.description') }}</p>
            <div class="stats">
              <div class="stat-item">
                <h3>{{ $t('about.stats.yearsExperience') }}</h3>
                <p>{{ $t('about.stats.yearsExperienceLabel') }}</p>
              </div>
              <div class="stat-item">
                <h3>{{ $t('about.stats.productsDelivered') }}</h3>
                <p>{{ $t('about.stats.productsDeliveredLabel') }}</p>
              </div>
              <div class="stat-item">
                <h3>{{ $t('about.stats.countriesServed') }}</h3>
                <p>{{ $t('about.stats.countriesServedLabel') }}</p>
              </div>
            </div>
          </div>
          <div class="image-content">
            <img src="/images/CompanyProfile_p1_img1.jpeg" alt="Company Overview" />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision">
      <div class="container">
        <div class="grid-2">
          <div class="mission">
            <div class="icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>{{ $t('about.mission.title') }}</h3>
            <p>{{ $t('about.mission.description') }}</p>
          </div>
          <div class="vision">
            <div class="icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>{{ $t('about.vision.title') }}</h3>
            <p>{{ $t('about.vision.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="our-values">
      <div class="container">
        <h2>{{ $t('about.values.title') }}</h2>
        <div class="values-grid">
          <div class="value-item" v-for="value in values" :key="value.key">
            <div class="value-icon">
              <component :is="value.icon" />
            </div>
            <h4>{{ $t(`about.values.${value.key}.title`) }}</h4>
            <p>{{ $t(`about.values.${value.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2>{{ $t('about.team.title') }}</h2>
        <p class="team-intro">{{ $t('about.team.description') }}</p>
        <div class="team-grid">
          <div class="team-member" v-for="member in teamMembers" :key="member.id">
            <div class="member-image">
              <img :src="member.image" :alt="member.name" />
            </div>
            <h4>{{ member.name }}</h4>
            <p class="position">{{ $t(`about.team.members.${member.key}.position`) }}</p>
            <p class="bio">{{ $t(`about.team.members.${member.key}.bio`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology & Innovation -->
    <section class="technology-section">
      <div class="container">
        <div class="section-content reverse">
          <div class="text-content">
            <h2>{{ $t('about.technology.title') }}</h2>
            <p>{{ $t('about.technology.description') }}</p>
            <ul class="tech-features">
              <li v-for="feature in techFeatures" :key="feature">
                {{ $t(`about.technology.features.${feature}`) }}
              </li>
            </ul>
          </div>
          <div class="image-content">
            <img src="/images/CompanyProfile_p9_img1.png" alt="Technology" />
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="contact-cta">
      <div class="container">
        <div class="cta-content">
          <h2>{{ $t('about.cta.title') }}</h2>
          <p>{{ $t('about.cta.description') }}</p>
          <router-link to="/contact" class="cta-button">
            {{ $t('footer.contactUs') }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Values data
const values = ref([
  { key: 'innovation', icon: 'InnovationIcon' },
  { key: 'quality', icon: 'QualityIcon' },
  { key: 'sustainability', icon: 'SustainabilityIcon' },
  { key: 'customerFocus', icon: 'CustomerIcon' }
])

// Team members data
const teamMembers = ref([
  {
    id: 1,
    key: 'ceo',
    name: 'John Smith',
    image: '/images/CompanyProfile_p5_img1.jpeg'
  },
  {
    id: 2,
    key: 'cto',
    name: 'Sarah Johnson',
    image: '/images/CompanyProfile_p5_img2.jpeg'
  },
  {
    id: 3,
    key: 'head_engineering',
    name: 'Michael Chen',
    image: '/images/CompanyProfile_p5_img3.png'
  },
  {
    id: 4,
    key: 'head_design',
    name: 'Emily Davis',
    image: '/images/CompanyProfile_p5_img4.png'
  }
])

// Technology features
const techFeatures = ref([
  'aiIntegration',
  'advancedSensors',
  'autonomousNavigation',
  'cloudConnectivity',
  'realTimeAnalytics'
])
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Section Styles */
section {
  padding: 80px 0;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.section-content.reverse {
  direction: rtl;
}

.section-content.reverse > * {
  direction: ltr;
}

.text-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.text-content p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 2rem;
}

.image-content img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-item p {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}

/* Mission & Vision */
.mission-vision {
  background-color: #f7fafc;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.mission, .vision {
  text-align: center;
  padding: 2rem;
}

.icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.mission h3, .vision h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}

/* Values */
.our-values h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #2d3748;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.value-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
}

.value-item h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.value-item p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

/* Team Section */
.team-section {
  background-color: #f7fafc;
}

.team-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
}

.team-intro {
  text-align: center;
  font-size: 1.125rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.team-member {
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-image {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #667eea;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.position {
  color: #667eea;
  font-weight: 500;
  margin-bottom: 1rem;
}

.bio {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

/* Technology Section */
.tech-features {
  list-style: none;
  padding: 0;
}

.tech-features li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  padding-left: 2rem;
}

.tech-features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.tech-features li:last-child {
  border-bottom: none;
}

/* Contact CTA */
.contact-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>