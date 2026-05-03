'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import GoogleTranslate from './GoogleTranslate';
import ContactOverlay from './ContactOverlay';

interface Category {
  _id: string;
  name: string;
}

interface Service {
  _id: string;
  name: string;
  title: string;
}

interface Career {
  _id: string;
  title: string;
}

const Navbar = () => {
  const pathname = usePathname() || '';
  const isHomePage = pathname === '/';
  const isNewsPage = pathname.startsWith('/news');
  const isInsightsPage = pathname.startsWith('/insights');
  const isServicePage = pathname.startsWith('/services');
  const isCareerPage = pathname.startsWith('/career-options');
  const isNewsroomPage = isNewsPage || isInsightsPage;

  const [categories, setCategories] = useState<Category[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [activeServices, setActiveServices] = useState<Service[]>([]);
  const [contactNumber, setContactNumber] = useState<string>('');
  const [view, setView] = useState<'categories' | 'services'>('categories');
  const [newsroomView, setNewsroomView] = useState<'news' | 'insights'>('news');
  const [loading, setLoading] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isCareersDropdownOpen, setIsCareersDropdownOpen] = useState(false);
  const [isNewsroomDropdownOpen, setIsNewsroomDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const megaMenuRef = useRef<HTMLLIElement>(null);
  const servicesDropdownRef = useRef<HTMLLIElement>(null);
  const careersDropdownRef = useRef<HTMLLIElement>(null);
  const newsroomDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    fetchCategories();
    fetchAllServices();
    fetchCareers();
    fetchNewsAndInsights();
    fetchContactNumber();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
        resetDropdown();
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (careersDropdownRef.current && !careersDropdownRef.current.contains(event.target as Node)) {
        setIsCareersDropdownOpen(false);
      }
      if (newsroomDropdownRef.current && !newsroomDropdownRef.current.contains(event.target as Node)) {
        setIsNewsroomDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const fetchContactNumber = async () => {
    try {
      const res = await fetch('https://apifinal.technorapide.com/api/social-contacts');
      if (res.ok) {
        const data = await res.json();
        const contact = data.find((item: any) => item.type === 'contact');
        if (contact) setContactNumber(contact.link);
      }
    } catch (e) {
      console.error('Failed to fetch contact number', e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://apifinal.technorapide.com/api/service-categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (e) {
      console.error("Failed to fetch categories");
    }
  };

  const fetchAllServices = async () => {
    try {
      const res = await fetch('https://apifinal.technorapide.com/api/services/');
      if (res.ok) {
        const data = await res.json();
        setAllServices(data);
      }
    } catch (e) {
      console.error("Failed to fetch all services");
    }
  };

  const fetchCareers = async () => {
    try {
      const res = await fetch('https://apifinal.technorapide.com/api/careers');
      if (res.ok) {
        const data = await res.json();
        setCareers(data);
      }
    } catch (e) {
      console.error("Failed to fetch careers");
    }
  };

  const fetchNewsAndInsights = async () => {
    try {
      const [newsRes, insightsRes] = await Promise.all([
        fetch('https://apifinal.technorapide.com/api/blogs'),
        fetch('https://apifinal.technorapide.com/api/insights')
      ]);
      if (newsRes.ok) setBlogs(await newsRes.json());
      if (insightsRes.ok) setInsights(await insightsRes.json());
    } catch (e) {
      console.error("Failed to fetch news/insights");
    }
  };

  const handleCategoryClick = async (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch(`https://apifinal.technorapide.com/api/services/category/${categoryId}`);
      if (res.ok) {
        const data = await res.json();
        setActiveServices(data);
        setView('services');
      }
    } catch (e) {
      console.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const resetDropdown = () => {
    setView('categories');
    setActiveServices([]);
  };

  const toggleMegaMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMegaMenuOpen(!isMegaMenuOpen);
    if (isMegaMenuOpen) {
      resetDropdown();
    }
    setIsServicesDropdownOpen(false);
  };

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
    setIsMegaMenuOpen(false);
    setIsCareersDropdownOpen(false);
    setIsNewsroomDropdownOpen(false);
  };

  const toggleCareersDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCareersDropdownOpen(!isCareersDropdownOpen);
    setIsMegaMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsNewsroomDropdownOpen(false);
  };

  const toggleNewsroomDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNewsroomDropdownOpen(!isNewsroomDropdownOpen);
    setIsMegaMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsCareersDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Left Side: Branding and Menu Items */}
        <div className={styles.leftSide}>
          <Link href="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
            Technorapide
          </Link>

          <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksMobile : ''}`}>
            {!isHomePage && (
              <li>
                <Link href="/" className={styles.homeLink} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
            )}

            {/* Mobile Only: Phone Number at Top */}
            <li className={styles.mobilePhoneContainer}>
              <a href={`tel:${(contactNumber || '').replace(/\s+/g, '')}`} className={styles.mobilePhone}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {contactNumber || '+91 8918693332'}
              </a>
            </li>

            <li className={styles.dropdown} ref={megaMenuRef}>
              <a href="#" onClick={toggleMegaMenu} className={`${isMegaMenuOpen ? styles.menuOpen : ''}`}>
                What We Do <span className={`${styles.arrow} ${isMegaMenuOpen ? styles.arrowUp : ''}`}></span>
              </a>
              
              <div className={`${styles.megaMenu} ${isMegaMenuOpen ? styles.megaMenuVisible : ''}`}>
                <div className={styles.megaMenuContent}>
                  <div className={styles.megaMenuLeft}>
                    <h2 className={styles.megaMenuTitle}>Perpetually Adaptive Enterprise</h2>
                    <p className={styles.megaMenuDesc}>
                      Help businesses transform into adaptive enterprises.
                    </p>
                  </div>

                  <div className={styles.megaMenuRight}>
                    {loading ? (
                      <div className={styles.loadingItem}>Loading...</div>
                    ) : view === 'categories' ? (
                      <ul className={styles.megaMenuList}>
                        {categories.map((cat) => (
                          <li key={cat._id} onClick={(e) => handleCategoryClick(e, cat._id)} className={styles.megaMenuItem}>
                            <span>{cat.name}</span>
                            <span className={styles.itemArrow}>→</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <div className={styles.megaMenuBack} onClick={() => setView('categories')}>
                          ← Back to Categories
                        </div>
                        <ul className={styles.megaMenuList}>
                          {activeServices.map((service) => (
                            <li key={service._id} className={styles.megaMenuItem}>
                              <Link href={`/services/${service._id}`} onClick={() => {setIsMegaMenuOpen(false); setIsMobileMenuOpen(false);}}>
                                {service.name}
                              </Link>
                              <span className={styles.itemArrow}>→</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>

            <li className={styles.dropdown} ref={servicesDropdownRef}>
              <a href="#" onClick={toggleServicesDropdown} className={`${isServicePage ? styles.active : ''} ${isServicesDropdownOpen ? styles.menuOpen : ''}`}>
                Our Services <span className={`${styles.arrow} ${isServicesDropdownOpen ? styles.arrowUp : ''}`}></span>
              </a>
              
              <div className={`${styles.megaMenu} ${isServicesDropdownOpen ? styles.megaMenuVisible : ''}`}>
                <div className={styles.megaMenuContent}>
                  <div className={styles.megaMenuLeft}>
                    <h2 className={styles.megaMenuTitle}>Comprehensive Digital Solutions</h2>
                    <p className={styles.megaMenuDesc}>
                      Explore our full suite of technical and strategic offerings.
                    </p>
                  </div>

                  <div className={styles.megaMenuRight}>
                    <ul className={styles.megaMenuList} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                      {allServices.map((service) => (
                        <li key={service._id} className={styles.megaMenuItem}>
                          <Link href={`/services/${service._id}`} onClick={() => {setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false);}}>
                            {service.name}
                          </Link>
                          <span className={styles.itemArrow}>→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.dropdown} ref={careersDropdownRef}>
              <a href="#" onClick={toggleCareersDropdown} className={`${isCareerPage ? styles.active : ''} ${isCareersDropdownOpen ? styles.menuOpen : ''}`}>
                Our Career Option <span className={`${styles.arrow} ${isCareersDropdownOpen ? styles.arrowUp : ''}`}></span>
              </a>
              
              <div className={`${styles.megaMenu} ${isCareersDropdownOpen ? styles.megaMenuVisible : ''}`}>
                <div className={styles.megaMenuContent}>
                  <div className={styles.megaMenuLeft}>
                    <h2 className={styles.megaMenuTitle}>Build Your Future With Us</h2>
                    <p className={styles.megaMenuDesc}>
                      Join a team of innovators and creators shaping the digital landscape.
                    </p>
                    <Link href="/career-options" className={styles.megaMenuAction} onClick={() => {setIsCareersDropdownOpen(false); setIsMobileMenuOpen(false);}}>
                      See all opportunities →
                    </Link>
                  </div>

                  <div className={styles.megaMenuRight}>
                    <ul className={styles.megaMenuList} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                      {careers.map((career) => (
                        <li key={career._id} className={styles.megaMenuItem}>
                          <Link href={`/career-options/${career._id}`} onClick={() => {setIsCareersDropdownOpen(false); setIsMobileMenuOpen(false);}}>
                            {career.title}
                          </Link>
                          <span className={styles.itemArrow}>→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className={styles.dropdown} ref={newsroomDropdownRef}>
              <a href="#" onClick={toggleNewsroomDropdown} className={`${isNewsroomPage ? styles.active : ''} ${isNewsroomDropdownOpen ? styles.menuOpen : ''}`}>
                Company Newsroom <span className={`${styles.arrow} ${isNewsroomDropdownOpen ? styles.arrowUp : ''}`}></span>
              </a>
              
              <div className={`${styles.megaMenu} ${isNewsroomDropdownOpen ? styles.megaMenuVisible : ''}`}>
                <div className={styles.megaMenuContent}>
                  <div className={styles.megaMenuLeft}>
                    <div 
                      className={`${styles.tabBtn} ${newsroomView === 'news' ? styles.tabActive : ''}`}
                      onClick={() => setNewsroomView('news')}
                    >
                      News
                    </div>
                    <div 
                      className={`${styles.tabBtn} ${newsroomView === 'insights' ? styles.tabActive : ''}`}
                      onClick={() => setNewsroomView('insights')}
                    >
                      Company Insights
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                      <Link 
                        href={newsroomView === 'news' ? '/news' : '/insights'} 
                        className={styles.megaMenuAction}
                        onClick={() => {setIsNewsroomDropdownOpen(false); setIsMobileMenuOpen(false);}}
                      >
                        View All {newsroomView === 'news' ? 'News' : 'Insights'} →
                      </Link>
                    </div>
                  </div>

                  <div className={styles.megaMenuRight}>
                    <ul className={styles.megaMenuList}>
                      {(newsroomView === 'news' ? blogs : insights).slice(0, 5).map((item) => (
                        <li key={item._id} className={styles.megaMenuItem}>
                          <Link 
                            href={newsroomView === 'news' ? `/news/${item._id}` : `/insights/${item._id}`} 
                            onClick={() => {setIsNewsroomDropdownOpen(false); setIsMobileMenuOpen(false);}}
                          >
                            {item.title}
                          </Link>
                          <span className={styles.itemArrow}>→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>

        <div className={styles.rightSide}>
          <ContactOverlay />
          <a href={`tel:${contactNumber.replace(/\s+/g, '')}`} className={styles.phone}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {contactNumber || '+91 8918693332'}
          </a>
          <GoogleTranslate id="google_translate_desktop" />
        </div>

        <div className={styles.navbarControls}>
          <div className={styles.mobileNavbarTranslate}>
            <GoogleTranslate id="google_translate_mobile_navbar" iconOnly={true} />
          </div>

          <button className={styles.hamburger} onClick={toggleMobileMenu} aria-label="Toggle Menu">
            <div className={`${styles.bar} ${isMobileMenuOpen ? styles.bar1Open : ''}`}></div>
            <div className={`${styles.bar} ${isMobileMenuOpen ? styles.bar2Open : ''}`}></div>
            <div className={`${styles.bar} ${isMobileMenuOpen ? styles.bar3Open : ''}`}></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
