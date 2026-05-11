import Hero from "./components/Hero";
import NewsSection from "./components/NewsSection";
import InsightsSection from "./components/InsightsSection";
import IndustrySection from "./components/IndustrySection";
import CustomerStories from "./components/CustomerStories";

import Counter from "./components/Counter";
import styles from "./page.module.css";

async function getBlogs() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/blogs', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getInsights() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/insights', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getResearchImage() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/image-assets/type/research1', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0]?.imageLinks?.[0] || null;
  } catch (e) {
    return null;
  }
}

async function getResearchImage2() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/image-assets/type/research2', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0]?.imageLinks?.[0] || null;
  } catch (e) {
    return null;
  }
}

async function getResearchMobileImage() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/image-assets/type/researchmobile', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0]?.imageLinks?.[0] || null;
  } catch (e) {
    return null;
  }
}

export default async function Home() {
  const [blogs, insights, researchImage1, researchImage2, researchMobileImage] = await Promise.all([
    getBlogs(), 
    getInsights(),
    getResearchImage(),
    getResearchImage2(),
    getResearchMobileImage()
  ]);

  return (
    <main className={styles.main}>
      <Hero />
      
      {/* Content that scrolls over the fixed hero */}
      <div className={styles.scrollContent}>
        
        {/* SEO Keywords Section */}
        <section className={styles.seoKeywordsSection} id="best-web-dev-company">
          <div className={styles.capContainer}>
            <div className={styles.seoGrid}>
              <div className={styles.seoContent}>
                <h2 className={styles.seoTitle}>
                  Best Website Development Company in Barasat & Kolkata
                </h2>
                <p className={styles.seoDescription}>
                  Technorapide is recognized as the <strong>Best Website Development Company in Barasat</strong> and the <strong>Best Website Development Company in Kolkata</strong>. We specialize in delivering high-performance, SEO-optimized, and visually stunning websites that help businesses dominate the digital landscape across India.
                </p>
                <div className={styles.seoHighlights}>
                  <div className={styles.seoItem}>
                    <h3>Best Web Dev Company in Barasat</h3>
                    <p>Tailored solutions for local businesses in Barasat to grow online.</p>
                  </div>
                  <div className={styles.seoItem}>
                    <h3>Best Web Dev Company in Kolkata</h3>
                    <p>Innovative digital strategies for enterprises in the City of Joy.</p>
                  </div>
                  <div className={styles.seoItem}>
                    <h3>Best Website Development Company in India</h3>
                    <p>World-class engineering serving clients globally from India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsSection blogs={blogs} />

        {/* Polished Capgemini-Inspired Editorial Section (Blue & White) */}
        <section className={styles.capAboutSection}>
          <div className={styles.capContainer}>
            <p className={styles.capMainSubtitle}>Research & Insights</p>
            
            {/* Block 1: Main Story (Wide with Overlap) */}
            <div className={styles.capBlockOverlapTop}>
              <div className={styles.capImageWrapperWide}>
                <img 
                  src={researchImage1 || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"} 
                  alt="Research Visual" 
                  className={styles.capImage} 
                />
              </div>
              <div className={styles.capTextBoxOverlap}>
                <p className={styles.capLabel}>OUR ORIGIN STORY</p>
                <h2 className={styles.capTitle}>From a Vision to a Global Enterprise Driven by Innovation</h2>
                <div className={styles.capDesc}>
                  TechnoRapide was founded in 2018 with a simple yet ambitious goal: to bridge the gap between high-level engineering and intuitive user experiences.
                </div>
                <p className={styles.capFooterLabel}>Technorapide</p>
              </div>
            </div>

            {/* Bottom Row: 3 cards with overlapping image on right */}
            <div className={styles.capBlockOverlapBottom}>
              
              {/* Mobile-Only Image for Philosophy Block */}
              <div className={styles.capImageWrapperMobile}>
                <img 
                  src={researchMobileImage || "https://images.unsplash.com/photo-1550745113-f85264388795?auto=format&fit=crop&q=80&w=800"} 
                  alt="Mobile Research Visual" 
                  className={styles.capImage} 
                />
              </div>

              {/* Block 2: Philosophy (Square Text - Blue) */}
              <div className={styles.capBlockSquareText}>
                <div>
                  <p className={styles.capLabel}>Our Core Philosophy</p>
                  <h3 className={styles.capTitleMedium}>World-Class Robust Web Architectures & Solutions. "Dream Big, Build Bigger."</h3>
                </div>
                <p className={styles.capFooterLabel}>Technorapide</p>
              </div>

              {/* Block 3: Stats (Square Text - Dark) */}
              <div className={styles.capBlockSquareTextCenter}>
                <div className={styles.capFullWidth}>
                  <p className={styles.capLabel}>Growth Metrics</p>
                  <div className={styles.capStatsList}>
                    <Counter end={6} suffix="+" label="Years of Excellence" />
                    <Counter end={300} suffix="+" label="Successful Projects" />
                    <Counter end={200} suffix="+" label="Global Clients" />
                    <Counter end={35} suffix="+" label="Tech Experts" />
                  </div>
                </div>
                <p className={styles.capFooterLabel}>Technorapide</p>
              </div>

              {/* Block 4: Image (Behind Stats) */}
              <div className={styles.capImageWrapperOverlap}>
                <img 
                  src={researchImage2 || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} 
                  alt="Growth Visual" 
                  className={styles.capImage} 
                />
              </div>

            </div>
          </div>
        </section>

        {/* Insights Section: Horizontal cards now BELOW Research & Insights */}
        <InsightsSection insights={insights} />

        {/* Industries We Serve (White BG Section) */}
        <IndustrySection />

        {/* Customer Stories (Black BG Section) */}
        <CustomerStories />

        {/* Google Business Verification Badge */}

      </div>
    </main>
  );
}
