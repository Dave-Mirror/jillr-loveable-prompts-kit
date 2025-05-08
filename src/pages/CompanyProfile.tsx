
import React from 'react';
import PageContainer from '@/components/navigation/PageContainer';
import CompanyProfileComponent from '@/components/company/CompanyProfile';

const CompanyProfile = () => {
  return (
    <PageContainer previousPage="/explore" nextPage="/wallet">
      <CompanyProfileComponent />
    </PageContainer>
  );
};

export default CompanyProfile;
