import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './profile.module.css';
import Navbar from '../../components/navbar/navbar';
import { AuthContext } from '../../context/AuthContext';
import OpportunityModal from '../../components/home/OpportunityModal';

const Profile = () => {
  const { firstName } = useContext(AuthContext);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchAppliedOffers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://tech-interns.onrender.com/api/users/applied', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedOffers(response.data);
      } catch (error) {
        console.error('Error fetching applied offers:', error);
      }
    };

    fetchAppliedOffers();
  }, []);

  const handleCardClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOffers = appliedOffers
  .filter((offer) => {
    return (
      (searchQuery === ' ' ||
      offer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchQuery.toLowerCase())
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
  

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.grid}></div>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <h1 className={styles.headline}>Profile</h1>
            <p className={styles.subheadline}>Welcome, {firstName}</p>
          </div>
          <div className={styles.rightContent}>
            <h2 className={styles.sectionHeader}>Applied Offers</h2>
            <div className={styles.searchBar}>
              <input className={styles.searchInput}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
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
            <div className={styles.cardGrid}>
              {appliedOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <div key={offer._id} className={styles.opportunityCard} onClick={() => handleCardClick(offer)}>
                    <div className={styles.cardTop}>
                      <h3>{offer.role}</h3>
                      <span className={styles.tag}>{offer.type}</span>
                    </div>
                    <p>{offer.company}</p>
                    <p>{offer.location}</p>
                    <p>Applied on: {new Date(offer.appliedDate).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No offers applied yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedOffer && (
        <OpportunityModal internship={selectedOffer} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Profile;