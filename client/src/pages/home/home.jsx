import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
import { Link } from 'react-router-dom';
import styles from './home.module.css';
import Navbar from '../../components/navbar/navbar';
import OpportunityModal from '../../components/home/OpportunityModal';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [internships, setInternships] = useState([]); // Initialize as an empty array
  const [appliedOffers, setAppliedOffers] = useState([]); // Track applied offers

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensures 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/offers`); 
        if (Array.isArray(response.data)) {
          setInternships(response.data); 
        } else {
          console.error('Fetched data is not an array!');
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    const fetchAppliedOffers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_BASE_URL}/api/users/applied`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedOffers(response.data.map(offer => offer._id));
      } catch (error) {
        console.error('Error fetching applied offers:', error);
      }
    };

    fetchInternships();
    if (isLoggedIn) {
      fetchAppliedOffers();
    }
  }, [isLoggedIn]); // Fetch applied offers if user is logged in

  // Handle card click to open the modal
  const handleCardClick = (internship) => {
    const formattedInternship = {
      ...internship,
      posted: formatDate(internship.posted),
      deadline: formatDate(internship.deadline),
    };
    setSelectedInternship(formattedInternship);
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  // Select the first 4 internships as featured opportunities
  const featuredOpportunities = internships.slice(0, 4);

  return (
    <>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.grid}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.leftSection}>
              <h1 className={styles.headline}>
                The space for future tech talents_
              </h1>
              <p className={styles.subheadline}>
                A minimalist platform connecting ambitious tech interns with forward-thinking companies. No noise, just opportunities.
              </p>
            </div>

            <div className={styles.rightSection}>
              <Link to='/opportunities' className={styles.exploreCard}>
                <div className={styles.cardContent}>
                  <span>Explore Opportunities</span>
                  <span className={styles.cardArrow}>→</span>
                </div>
              </Link>

              <div className={styles.statsPreview}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>ACTIVE ROLES</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>COMPANIES</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <h2>Featured Opportunities</h2>
              <p>Discover top internships from leading tech companies</p>
            </div>

            <div className={styles.cardGrid}>
              {featuredOpportunities.map((internship) => (
                <div key={internship._id} className={styles.opportunityCard} onClick={() => handleCardClick(internship)}>
                  <div className={styles.cardTop}>
                    <span>{internship.company}</span>
                    <span className={styles.tag}>{internship.department}</span>
                  </div>
                  <h3>{internship.role}</h3>
                  <p>
                    {internship.company} • {internship.location}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.showMoreContainer}>
              <Link to="/opportunities" className={styles.showMoreButton}>
                Show More Opportunities
                <span className={styles.buttonArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {selectedInternship && (
        <OpportunityModal internship={selectedInternship} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Home;