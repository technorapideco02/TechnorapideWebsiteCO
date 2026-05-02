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

const Navbar = () => {
  const pathname = usePathname() || '';
  const isHomePage = pathname === '/';
  const isNewsPage = pathname.startsWith('/news');
  const isInsightsPage = pathname.startsWith('/insights');
  const isServicePage = pathname.startsWith('/services');
  const isAnyDetailPage = isNewsPage || isInsightsPage || isServicePage;

  const [categories, setCategories] = useState<Category[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [activeServices, setActiveServices] = useState<Service[]>([]);
  const [contactNumber, setContactNumber] = useState<string>('');
  const [view, setView] = useState<'categories' | 'services'>('categories');
  const [loading, setLoading] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  
  const megaMenuRef = useRef<HTMLLIElement>(null);
  const servicesDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    fetchCategories();
    fetchAllServices();
    fetchContactNumber();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
        resetDropdown();
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Left Side: Branding and Menu Items */}
        <div className={styles.leftSide}>
          <Link href="/" className={styles.logo}>
            Technorapide
          </Link>

          <ul className={styles.navLinks}>
            {!isHomePage && (
              <li>
                <Link href="/" className={styles.homeLink}>
                  Home
                </Link>
              </li>
            )}

            {/* Interactive Mega Menu Dropdown */}
            <li className={styles.dropdown} ref={megaMenuRef}>
              <a href="#" onClick={toggleMegaMenu} className={`${isMegaMenuOpen ? styles.menuOpen : ''}`}>
                What We Do <span className={`${styles.arrow} ${isMegaMenuOpen ? styles.arrowUp : ''}`}></span>
              </a>
              
              <div className={`${styles.megaMenu} ${isMegaMenuOpen ? styles.megaMenuVisible : ''}`}>
                <div className={styles.megaMenuContent}>
                  {/* Left Section: Context */}
                  <div className={styles.megaMenuLeft}>
                    <h2 className={styles.megaMenuTitle}>Perpetually Adaptive Enterprise</h2>
                    <p className={styles.megaMenuDesc}>
                      At Technorapide, we don't just help businesses transform. We help them become perpetually adaptive enterprises, built to evolve continuously and confidently in a world of constant change.
                    </p>
                    <Link href="/services" className={styles.megaMenuAction} onClick={() => setIsMegaMenuOpen(false)}>
                      Adaptability starts here →
                    </Link>
                  </div>

                  {/* Right Section: Categories/Services */}
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
                              <Link href={`/services/${service._id}`} onClick={() => setIsMegaMenuOpen(false)}>
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
                  {/* Left Section: Context */}
                  <div className={styles.megaMenuLeft}>
                    <h2 className={styles.megaMenuTitle}>Comprehensive Digital Solutions</h2>
                    <p className={styles.megaMenuDesc}>
                      Explore our full suite of technical and strategic offerings. From AI-driven automation to robust enterprise architecture, we provide the tools your business needs to lead in the digital age.
                    </p>
                    <Link href="/services" className={styles.megaMenuAction} onClick={() => setIsServicesDropdownOpen(false)}>
                      View all offerings →
                    </Link>
                  </div>

                  {/* Right Section: All Services Grid */}
                  <div className={styles.megaMenuRight}>
                    <ul className={styles.megaMenuList} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                      {allServices.map((service) => (
                        <li key={service._id} className={styles.megaMenuItem}>
                          <Link href={`/services/${service._id}`} onClick={() => setIsServicesDropdownOpen(false)}>
                            {service.name}
                          </Link>
                          <span className={styles.itemArrow}>→</span>
                        </li>
                      ))}
                      {allServices.length === 0 && <li className={styles.loadingItem}>Loading services...</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="#">Our Career Option</a></li>
            <li>
              <Link href="/news" className={isNewsPage ? styles.active : ''}>
                News
              </Link>
            </li>
            <li>
              <Link href="/insights" className={isInsightsPage ? styles.active : ''}>
                Company Insights
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Contact Us | Phone | Language */}
        <div className={styles.rightSide}>
          <ContactOverlay />
          <a href={`tel:${contactNumber.replace(/\s+/g, '')}`} className={styles.phone}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {contactNumber || '+91 8918693332'}
          </a>
          <GoogleTranslate />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
