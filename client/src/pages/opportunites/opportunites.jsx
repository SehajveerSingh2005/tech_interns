import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './opportunites.module.css';
import Navbar from '../../components/navbar/navbar';
import OpportunityModal from '../../components/home/OpportunityModal';
import { AuthContext } from '../../context/AuthContext';


const Opportunities = () => {
  const { isLoggedIn } = useContext(AuthContext); // user should be accessible to identify the applicant
  
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState({
    department: 'all',
    location: 'all',
    type: 'all',
    stipendRange: 'all',
    duration: 'all',
  });
  const [searchQuery, setSearchQuery] = useState(''); //search query
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [internships, setInternships] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state


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
        const response = await axios.get('http://localhost:5000/api/offers'); 
        if (Array.isArray(response.data)) {
          setInternships(response.data); 
        } else {
          console.error('Fetched data is not an array!');
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchInternships();
  }, []); // Empty dependency array means this effect runs once when the component mounts

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            {/* Filters and Sorting controls */}
            <div className={styles.filterGroup}>
              <label>FILTER BY:</label>
              {/* Filter dropdowns */}
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
                 value={filterBy.type}
                 onChange={(e) => setFilterBy({...filterBy, type: e.target.value})}
                 className={styles.select}
                >
                  <option value='all'>All Types</option>
                  <option value='full-time'>Full-time</option>
                  <option value='part-time'>Part-time</option>
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <select
                value={filterBy.duration}
                onChange={(e) => setFilterBy({...filterBy, duration: e.target.value})}
                className={styles.select}
                >
                  <option value='all'>All Durations</option>
                  <option value='3 months'>3 months</option>
                  <option value='6 months'>6 months</option>
                </select>
              </div>
            </div>

            <div className={styles.searchGroup}>
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
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
            {internships.map((internship) => (
              <div key={internship._id} className={styles.listItem} onClick={() => handleCardClick(internship)}>
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
                {isLoggedIn ? (
                  <button 
                    className={styles.applyButton}
                    onClick={async (e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      try {
                        const token = localStorage.getItem('authToken');
                        await axios.post(
                          `http://localhost:5000/api/users/apply/${internship._id}`, // Updated endpoint
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        alert('Successfully applied for the internship!');
                      } catch (error) {
                        if (error.response?.status === 400) {
                          alert('You have already applied for this internship');
                        } else {
                          alert('Error applying for internship. Please try again.');
                        }
                      }
                    }}
                  >
                    APPLY NOW →
                  </button>
                ) : (
                  <Link to='/login' className={styles.applyButton}>APPLY NOW →</Link>
                )}
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
