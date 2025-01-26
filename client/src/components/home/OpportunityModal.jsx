import React from 'react';
import styles from './OpportunityModal.module.css';

const OpportunityModal = ({ internship, onClose }) => {
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
        <p className={styles.postedDate}>Posted on: {internship.posted}</p>
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
          <p>{internship.deadline}</p>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.closeButton} onClick={onClose}>
            CLOSE
          </button>
          <button
            className={styles.applyButton}
            onClick={() => alert(`Applying for ${internship.role}`)}
          >
            APPLY NOW →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;