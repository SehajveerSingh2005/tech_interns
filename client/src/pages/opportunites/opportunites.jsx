import React, { useState } from 'react';
import styles from './opportunites.module.css';
import Navbar from '../../components/navbar/navbar';
import OpportunityModal from '../../components/home/OpportunityModal';

const Opportunities = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState({
    department: 'all',
    location: 'all',
    type: 'all',
    stipendRange: 'all',
    duration: 'all',
  });
  const [selectedInternship, setSelectedInternship] = useState(null);

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
    {
      id: 6,
      role: 'BACKEND ENGINEERING INTERN',
      company: 'Netflix',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      posted: '10-12-2024',
      description: 'Build scalable backend systems for streaming services.',
      requirements: 'Experience with Node.js, Python, or Go. Knowledge of databases like MongoDB or PostgreSQL.',
      duration: '6 months',
      stipend: '₹60,000/month',
      deadline: '20-04-2025',
    },
    {
      id: 7,
      role: 'MARKETING INTERN',
      company: 'Tesla',
      department: 'Marketing',
      location: 'Delhi',
      type: 'Part-time',
      posted: '09-12-2024',
      description: 'Assist in creating and executing marketing campaigns for electric vehicles.',
      requirements: 'Strong communication skills. Familiarity with social media platforms.',
      duration: '3 months',
      stipend: '₹25,000/month',
      deadline: '18-04-2025',
    },
    {
      id: 8,
      role: 'CLOUD ENGINEERING INTERN',
      company: 'AWS',
      department: 'Engineering',
      location: 'Chennai',
      type: 'Full-time',
      posted: '08-12-2024',
      description: 'Work on cloud infrastructure and deployment pipelines.',
      requirements: 'Knowledge of AWS, Azure, or GCP. Familiarity with Docker and Kubernetes.',
      duration: '6 months',
      stipend: '₹65,000/month',
      deadline: '22-04-2025',
    },
    {
      id: 9,
      role: 'PRODUCT MANAGEMENT INTERN',
      company: 'Uber',
      department: 'Product',
      location: 'Gurgaon',
      type: 'Full-time',
      posted: '07-12-2024',
      description: 'Assist in defining product requirements and working with cross-functional teams.',
      requirements: 'Strong analytical skills. Familiarity with Agile methodologies.',
      duration: '6 months',
      stipend: '₹50,000/month',
      deadline: '25-04-2025',
    },
    {
      id: 10,
      role: 'CYBERSECURITY INTERN',
      company: 'IBM',
      department: 'Engineering',
      location: 'Kolkata',
      type: 'Full-time',
      posted: '06-12-2024',
      description: 'Work on identifying and mitigating security vulnerabilities.',
      requirements: 'Knowledge of cybersecurity tools and frameworks. Familiarity with penetration testing.',
      duration: '6 months',
      stipend: '₹55,000/month',
      deadline: '28-04-2025',
    },
  ];

  // function to parse stipend (e.g., "₹50,000/month" → 50000)
  const parseStipend = (stipend) => {
    return parseInt(stipend.replace(/[^0-9]/g, ''), 10);
  };

  // function to check stipend range
  const checkStipendRange = (stipend, range) => {
    const stipendValue = parseStipend(stipend);
    switch (range) {
      case '20k-50k':
        return stipendValue >= 20000 && stipendValue <= 50000;
      case '50k-80k':
        return stipendValue >= 50000 && stipendValue <= 80000;
      case '80k+':
        return stipendValue >= 80000;
      default:
        return true;
    }
  };

  // Filter and sort logic
  const filteredInternships = internships
    .filter((internship) => {
      return (
        (filterBy.department === 'all' || internship.department.toLowerCase() === filterBy.department) &&
        (filterBy.location === 'all' || internship.location.toLowerCase() === filterBy.location) &&
        (filterBy.type === 'all' || internship.type.toLowerCase() === filterBy.type) &&
        (filterBy.stipendRange === 'all' || checkStipendRange(internship.stipend, filterBy.stipendRange)) &&
        (filterBy.duration === 'all' || internship.duration === filterBy.duration)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.posted) - new Date(a.posted);
      } else if (sortBy === 'oldest') {
        return new Date(a.posted) - new Date(b.posted);
      } else if (sortBy === 'stipendHighToLow') {
        return parseStipend(b.stipend) - parseStipend(a.stipend);
      } else if (sortBy === 'stipendLowToHigh') {
        return parseStipend(a.stipend) - parseStipend(b.stipend);
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

  const handleCardClick = (internship) => {
    setSelectedInternship(internship);
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.grid}></div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>OPPORTUNITIES</h1>
          </div>

          <div className={styles.controls}>
            <div className={styles.filterGroup}>
              <label>FILTER BY:</label>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.department}
                  onChange={(e) => setFilterBy({ ...filterBy, department: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="product">Product</option>
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.location}
                  onChange={(e) => setFilterBy({ ...filterBy, location: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.type}
                  onChange={(e) => setFilterBy({ ...filterBy, type: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.stipendRange}
                  onChange={(e) => setFilterBy({ ...filterBy, stipendRange: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Stipends</option>
                  <option value="20k-50k">₹20,000–₹50,000</option>
                  <option value="50k-80k">₹50,000–₹80,000</option>
                  <option value="80k+">₹80,000+</option>
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.duration}
                  onChange={(e) => setFilterBy({ ...filterBy, duration: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Durations</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>SORT BY:</label>
              <div className={styles.selectWrapper}>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="stipendHighToLow">Stipend (High to Low)</option>
                  <option value="stipendLowToHigh">Stipend (Low to High)</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.listContainer}>
            {filteredInternships.map((internship) => (
              <div key={internship.id} className={styles.listItem} onClick={() => handleCardClick(internship)}>
                <div className={styles.listContent}>
                  <h2>{internship.role}</h2>
                  <div className={styles.details}>
                    <span>{internship.company}</span>
                    <span>•</span>
                    <span>{internship.department}</span>
                    <span>•</span>
                    <span>{internship.location}</span>
                    <span>•</span>
                    <span>{internship.type}</span>
                  </div>
                </div>
                <div className={styles.applyButton}>
                  APPLY NOW →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedInternship && (
        <OpportunityModal internship={selectedInternship} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Opportunities;