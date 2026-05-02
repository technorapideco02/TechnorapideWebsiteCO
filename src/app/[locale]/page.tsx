import Hero from "../components/Hero";
import NewsSection from "../components/NewsSection";
import InsightsSection from "../components/InsightsSection";
import IndustrySection from "../components/IndustrySection";
import CustomerStories from "../components/CustomerStories";
import styles from "../page.module.css";

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

export default async function Home() {
  const [blogs, insights] = await Promise.all([getBlogs(), getInsights()]);

  return (
    <main className={styles.main}>
      <Hero />
      
      {/* Content that scrolls over the fixed hero */}
      <div className={styles.scrollContent}>
        
        <NewsSection blogs={blogs} />

        {/* Polished Capgemini-Inspired Editorial Section (Blue & White) */}
        <section className={styles.capAboutSection}>
          <div className={styles.capContainer}>
            <p className={styles.capMainSubtitle}>Research & Insights</p>
            
            {/* Block 1: Main Story (Wide) */}
            <div className={styles.capBlockWide}>
              <div className={styles.capImageWrapperWide}>
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Blue Glass Pattern" className={styles.capImage} />
              </div>
              <div className={styles.capTextBoxWide}>
                <p className={styles.capLabel}>OUR ORIGIN STORY</p>
                <h2 className={styles.capTitle}>From a Vision to a Global Enterprise Driven by Innovation</h2>
                <div className={styles.capDesc}>
                  TechnoRapide was founded in 2018 with a simple yet ambitious goal: to bridge the gap between high-level engineering and intuitive user experiences.
                </div>
                <p className={styles.capFooterLabel}>Technorapide</p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className={styles.capBottomRow}>
              
              {/* Block 2: Philosophy (Text Only - Blue/White) */}
              <div className={styles.capBlockSquareText}>
                <div>
                  <p className={styles.capLabel}>Our Core Philosophy</p>
                  <h3 className={styles.capTitleMedium}>World-Class Robust Web Architectures & Solutions. "Dream Big, Build Bigger."</h3>
                </div>
                <p className={styles.capFooterLabel}>Technorapide</p>
              </div>

              {/* Block 3: Stats (Abstract Image + Overlay) */}
              <div className={styles.capBlockSquareImage}>
                <div className={styles.capImageWrapperSquare}>
                  <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1200" alt="Light Burst Pattern" className={styles.capImage} />
                </div>
                <div className={styles.capTextBoxSquare}>
                  <p className={styles.capLabel}>Growth Metrics</p>
                  <h3 className={styles.capTitleMedium}>Transforming Digital Presence for Global Clients</h3>
                  <div className={styles.capStatsList}>
                    <div className={styles.capStatItem}><span>6+</span> Years</div>
                    <div className={styles.capStatItem}><span>250+</span> Projects</div>
                    <div className={styles.capStatItem}><span>50+</span> Clients</div>
                    <div className={styles.capStatItem}><span>30+</span> Developers</div>
                  </div>
                  <p className={styles.capFooterLabel}>Technorapide</p>
                </div>
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
      </div>
    </main>
  );
}
