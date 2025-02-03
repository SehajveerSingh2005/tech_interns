import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
import styles from './opportunites.module.css';
import Navbar from '../../components/navbar/navbar';
import OpportunityModal from '../../components/home/OpportunityModal';
import { AuthContext } from '../../context/AuthContext';

const Opportunities = () => {
  const { isLoggedIn } = useContext(AuthContext);
  
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
  const [appliedOffers, setAppliedOffers] = useState([]); // Track applied offers
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
        const response = await axios.get(`${API_BASE_URL}/api/offers`); 
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

  // Filter and search logic
  const filteredInternships = internships
    .filter((internship) => {
      return (
        (filterBy.department === 'all' || internship.department.toLowerCase() === filterBy.department) &&
        (filterBy.location === 'all' || internship.location.toLowerCase().includes(filterBy.location.toLowerCase())) &&
        (filterBy.type === 'all' || internship.type.toLowerCase() === filterBy.type) &&
        (filterBy.duration === 'all' || internship.duration.toLowerCase() === filterBy.duration) &&
        (searchQuery === '' || 
          internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.department.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.posted) - new Date(a.posted);
      } else if (sortBy === 'oldest') {
        return new Date(a.posted) - new Date(b.posted);
      } else if (sortBy === 'stipendHighToLow') {
        return parseInt(b.stipend.replace(/\D/g, '')) - parseInt(a.stipend.replace(/\D/g, ''));
      } else if (sortBy === 'stipendLowToHigh') {
        return parseInt(a.stipend.replace(/\D/g, '')) - parseInt(b.stipend.replace(/\D/g, ''));
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

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
                  placeholder="Search opportunites..."
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
            {filteredInternships.map((internship) => (
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
                  appliedOffers.includes(internship._id) ? (
                    <button className={`${styles.applyButton} ${styles.appliedButton}`} disabled>
                      APPLIED
                    </button>
                  ) : (
                    <button 
                      className={styles.applyButton}
                      onClick={async (e) => {
                        e.stopPropagation(); // Prevent modal from opening
                        try {
                          const token = localStorage.getItem('authToken');
                          await axios.post(
                            `${API_BASE_URL}/api/users/apply/${internship._id}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          alert('Successfully applied for the internship!');
                          setAppliedOffers([...appliedOffers, internship._id]);
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
                  )
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