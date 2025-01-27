import React, { useState, useEffect } from 'react';
import styles from './opportunites.module.css';
import Navbar from '../../components/navbar/navbar';
import OpportunityModal from '../../components/home/OpportunityModal';
import axios from 'axios'; // Replace with your data fetching method (e.g., Firestore, axios)

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
  const [internships, setInternships] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state


    // Format date to 'DD-MM-YYYY'
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0'); // Ensures 2 digits
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
  
      return `${day}-${month}-${year}`;
    };
  // Fetch internships data
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // Replace this with your actual data fetching method (API, Firestore, etc.)
        const response = await axios.get('http://localhost:5000/api/offers'); // Example with axios
        console.log('Fetched internships:', response.data);
        if (Array.isArray(response.data)) {
          setInternships(response.data); // Ensure data is an array
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

  // Check if stipend is in the selected range
  const parseStipend = (stipend) => {
    return parseInt(stipend.replace(/[^0-9]/g, ''), 10);
  };

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

  // Filter internships based on selected filters
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

  // Handle card click to open the modal
  const handleCardClick = (internship) => {
    const formattedInternship = {
      ...internship,
      posted: formatDate(internship.posted),
      deadline: formatDate(internship.deadline),
    };
    setSelectedInternship(formattedInternship);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
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
              {/* Other filter dropdowns go here... */}
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
                <div className={styles.applyButton}>APPLY NOW →</div>
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
