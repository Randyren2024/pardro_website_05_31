<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-section">
        <h3>{{ t('footer.company') }}</h3>
        <ul>
          <li><a href="#">{{ t('footer.about') }}</a></li>
          <li><a href="#">{{ t('footer.blog') }}</a></li>
          <li><a href="#">{{ t('footer.press') }}</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>{{ t('footer.support') }}</h3>
        <ul>
          <li><a href="#">{{ t('footer.contactUs') }}</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>{{ t('footer.legal') }}</h3>
        <ul>
          <li><a href="#">{{ t('footer.terms') }}</a></li>
          <li><a href="#">{{ t('footer.privacy') }}</a></li>
        </ul>
      </div>
      
      <div class="footer-section newsletter">
        <h3>Newsletter</h3>
        <p>Subscribe to receive updates on new products and special promotions.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container">
        <p>{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: var(--primary-dark);
  color: white;
  padding-top: 48px;
  margin-top: 48px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  padding-bottom: 48px;
}

.footer-section {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 16px;
    color: white;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 8px;
      
      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color 0.2s;
        
        &:hover {
          color: white;
        }
      }
    }
  }
  
  &.newsletter {
    p {
      margin-bottom: 16px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .newsletter-form {
      display: flex;
      
      input {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 4px 0 0 4px;
        outline: none;
      }
      
      button {
        background-color: var(--accent-color);
        color: white;
        border: none;
        border-radius: 0 4px 4px 0;
        padding: 0 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: color.adjust(#FF5964, $lightness: -10%);
        }
      }
    }
  }
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 16px 0;
  text-align: center;
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-section.newsletter .newsletter-form {
    flex-direction: column;
    
    input {
      border-radius: 4px;
      margin-bottom: 8px;
    }
    
    button {
      border-radius: 4px;
      padding: 12px;
    }
  }
}
</style>