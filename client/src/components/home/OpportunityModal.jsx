import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
import { AuthContext } from '../../context/AuthContext';
import styles from './OpportunityModal.module.css';

const OpportunityModal = ({ internship, onClose }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_BASE_URL}/api/users/applied`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Applied response:', response.data);
        const appliedOffers = response.data.map(offer => offer._id);
        setApplied(appliedOffers.includes(internship._id));
      } catch (error) {
        console.error('Error checking if applied:', error);
      }
    };

    if (isLoggedIn) {
      checkIfApplied();
    }
  }, [isLoggedIn, internship._id]);

  const handleApply = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

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
      setApplied(true);
    } catch (error) {
      if (error.response?.status === 400) {
        alert('You have already applied for this internship');
      } else {
        alert('Error applying for internship. Please try again.');
      }
      console.error('Application error:', error);
    }

  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensures 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
        <p className={styles.postedDate}>Posted on: {formatDate(internship.posted)}</p>
        <div className={styles.modalSection}>
          <h3>Description</h3>
          <p>{internship.description}</p>
        </div>
        <div className={styles.modalSection}>
          <h3>Requirements</h3>
          <p>{internship.requirements}</p>
        </div>
        <div className={styles.modalSection}>
          <h3>Duration</h3>
          <p>{internship.duration}</p>
        </div>
        <div className={styles.modalSection}>
          <h3>Stipend</h3>
          <p>{internship.stipend}</p>
        </div>
        <div className={styles.modalSection}>
          <h3>Application Deadline</h3>
          <p>{formatDate(internship.deadline)}</p>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.closeButton} onClick={onClose}>
            CLOSE
          </button>
          {isLoggedIn ? (
            applied ? (
              <button className={`${styles.applyButton} ${styles.appliedButton}`} disabled>
                APPLIED
              </button>
            ) : (
              <button className={styles.applyButton} onClick={handleApply}>
                APPLY NOW →
              </button>
            )
          ) : (
            <button className={styles.applyButton} onClick={() => navigate('/login')}>
              APPLY NOW →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;