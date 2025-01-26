import React, { useState } from 'react';
import styles from './companies.module.css';
import Navbar from '../../components/navbar/navbar';

const Companies = () => {
  const [filterBy, setFilterBy] = useState({
    industry: 'all',
    location: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const companies = [
    {
      id: 1,
      name: 'Infosys',
      logo: '/infosys-logo.svg',
      industry: 'Tech',
      location: 'Bangalore, India',
      internshipCount: 5,
    },
    {
      id: 2,
      name: 'Tata Consultancy Services (TCS)',
      logo: '/tcs-logo.svg',
      industry: 'Tech',
      location: 'Mumbai, India',
      internshipCount: 8,
    },
    {
      id: 3,
      name: 'Wipro',
      logo: '/wipro-logo.svg',
      industry: 'Tech',
      location: 'Bangalore, India',
      internshipCount: 6,
    },
    {
      id: 4,
      name: 'Flipkart',
      logo: '/flipkart-logo.svg',
      industry: 'E-commerce',
      location: 'Bangalore, India',
      internshipCount: 3,
    },
    {
      id: 5,
      name: 'Zomato',
      logo: '/zomato-logo.svg',
      industry: 'Food Delivery',
      location: 'Gurgaon, India',
      internshipCount: 4,
    },
    {
      id: 6,
      name: 'Ola',
      logo: '/ola-logo.svg',
      industry: 'Transportation',
      location: 'Bangalore, India',
      internshipCount: 2,
    },
    {
      id: 7,
      name: 'Byju’s',
      logo: '/byjus-logo.svg',
      industry: 'EdTech',
      location: 'Bangalore, India',
      internshipCount: 7,
    },
    {
      id: 8,
      name: 'Reliance Jio',
      logo: '/jio-logo.svg',
      industry: 'Telecom',
      location: 'Mumbai, India',
      internshipCount: 5,
    },
  ];

  // Filter and search logic
  const filteredCompanies = companies
    .filter((company) => {
      return (
        (filterBy.industry === 'all' || company.industry.toLowerCase() === filterBy.industry) &&
        (filterBy.location === 'all' || company.location.toLowerCase().includes(filterBy.location.toLowerCase())) &&
        (searchQuery === '' || company.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.grid}></div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>COMPANIES</h1>
          </div>

          <div className={styles.controls}>
            <div className={styles.filterGroup}>
              <label>FILTER BY:</label>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.industry}
                  onChange={(e) => setFilterBy({ ...filterBy, industry: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Industries</option>
                  <option value="tech">Tech</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="food delivery">Food Delivery</option>
                  <option value="transportation">Transportation</option>
                  <option value="edtech">EdTech</option>
                  <option value="telecom">Telecom</option>
                </select>
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={filterBy.location}
                  onChange={(e) => setFilterBy({ ...filterBy, location: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">All Locations</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="gurgaon">Gurgaon</option>
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
          </div>

          <div className={styles.cardGrid}>
            {filteredCompanies.map((company) => (
              <div key={company.id} className={styles.companyCard}>
                <div className={styles.cardTop}>
                  <img src={company.logo} alt={company.name} className={styles.companyLogo} />
                  <span className={styles.internshipCount}>{company.internshipCount} Opportunities</span>
                </div>
                <h3 className={styles.companyName}>{company.name}</h3> {/* Big company title */}
                <div className={styles.details}>
                  <span>{company.industry}</span>
                  <span>•</span>
                  <span>{company.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;