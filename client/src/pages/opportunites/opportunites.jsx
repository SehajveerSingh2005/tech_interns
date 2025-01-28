import React, { useState, useEffect } from 'react';
import styles from './opportunites.module.css';
import Navbar from '../../components/navbar/navbar';
import OpportunityModal from '../../components/home/OpportunityModal';
import axios from 'axios';

const Opportunities = () => {
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

  function parseDuration(durationStr) {

    const match = durationStr.match(/(\d+)\s*(\w+)/);
    if (!match) return null; 

    const value = parseInt(match[1], 10); 
    const unit = match[2].toLowerCase();

    // Convert the value to days
    switch (unit) {
        case 'month':
        case 'months':
            return value * 30; 
        case 'week':
        case 'weeks':
            return value * 7; 
        case 'day':
        case 'days':
            return value;
        case 'year':
        case 'years':
            return value * 365;
        default:
            throw new Error(`Unknown duration unit: ${unit}`);
    }
}


  const checkDuration = (duration, range) =>{
    const ParsedDurationValue = parseDuration(duration);
    switch(range){
      case '3 months':
        return ParsedDurationValue <= 90;
      case '6 months':
        return ParsedDurationValue <= 180;
      default:
        return true;
    }
  }

  // Filter internships based on selected filters
  const filteredInternships = internships
    .filter((internship) => {
      return (
        (filterBy.department === 'all' || internship.department.toLowerCase() === filterBy.department) &&
        (filterBy.location === 'all' || internship.location.toLowerCase() === filterBy.location) &&
        (filterBy.type === 'all' || internship.type.toLowerCase() === filterBy.type) &&
        (filterBy.stipendRange === 'all' || checkStipendRange(internship.stipend, filterBy.stipendRange)) &&
        (filterBy.duration === 'all' || checkDuration(internship.duration,filterBy.duration)) &&
        (searchQuery === '' || internship.role.toLowerCase().includes(searchQuery.toLowerCase()))
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
            +</div>

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
