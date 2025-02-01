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

  useEffect(() => {
    const fetchAppliedOffers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/users/applied', {
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
            <div className={styles.cardGrid}>
              {appliedOffers.length > 0 ? (
                appliedOffers.map((offer) => (
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