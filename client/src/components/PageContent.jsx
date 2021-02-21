import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const PageContent = ({ children }) => {
  return (
    <Box p={3}>
      {children}
    </Box>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
