import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';
import Navbar from '../../components/navbar/navbar';

const Home = () => {
  // Reuse the internships data from the Opportunities component
  const internships = [
    {
      id: 1,
      role: 'SOFTWARE ENGINEERING INTERN',
      company: 'Microsoft',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
      posted: '15-12-2024',
      description: 'Work on cutting-edge software projects and collaborate with a global team.',
      requirements: 'Proficiency in Python, Java, or C++. Familiarity with cloud platforms.',
      duration: '6 months',
      stipend: '₹50,000/month',
      deadline: '15-04-2025',
    },
    {
      id: 2,
      role: 'UI/UX DESIGN INTERN',
      company: 'Google',
      department: 'Design',
      location: 'Remote',
      type: 'Part-time',
      posted: '14-12-2024',
      description: 'Design intuitive user interfaces for web and mobile applications.',
      requirements: 'Experience with Figma or Sketch. Understanding of user-centered design.',
      duration: '3 months',
      stipend: '₹30,000/month',
      deadline: '10-04-2025',
    },
    {
      id: 3,
      role: 'DATA SCIENCE INTERN',
      company: 'Amazon',
      department: 'Engineering',
      location: 'Hyderabad',
      type: 'Full-time',
      posted: '13-12-2024',
      description: 'Analyze large datasets and build predictive models using machine learning.',
      requirements: 'Knowledge of Python, SQL, and machine learning frameworks.',
      duration: '6 months',
      stipend: '₹55,000/month',
      deadline: '12-04-2025',
    },
    {
      id: 4,
      role: 'FRONTEND ENGINEERING INTERN',
      company: 'Flightnet',
      department: 'Engineering',
      location: 'Mumbai',
      type: 'Full-time',
      posted: '12-12-2024',
      description: 'Develop responsive and user-friendly web interfaces.',
      requirements: 'Proficiency in HTML, CSS, JavaScript, and React.',
      duration: '6 months',
      stipend: '₹45,000/month',
      deadline: '08-04-2025',
    },
    {
      id: 5,
      role: 'PRODUCT DESIGN INTERN',
      company: 'Adobe',
      department: 'Design',
      location: 'Pune',
      type: 'Full-time',
      posted: '11-12-2024',
      description: 'Collaborate on designing innovative digital products.',
      requirements: 'Experience with design tools like Adobe XD or Figma.',
      duration: '6 months',
      stipend: '₹40,000/month',
      deadline: '05-04-2025',
    },
  ];

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
                <div key={internship.id} className={styles.opportunityCard}>
                  <div className={styles.cardTop}>
                    <img
                      src={`/${internship.company.toLowerCase()}-logo.svg`}
                      alt={internship.company}
                    />
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
    </>
  );
};

export default Home;