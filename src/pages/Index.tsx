import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CatalogSection from '@/components/CatalogSection';
import GallerySection from '@/components/GallerySection';
import CalculatorSection from '@/components/CalculatorSection';
import ReviewsSection from '@/components/ReviewsSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="grain">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CatalogSection />
      <GallerySection />
      <CalculatorSection />
      <ReviewsSection />
      <ArticlesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
