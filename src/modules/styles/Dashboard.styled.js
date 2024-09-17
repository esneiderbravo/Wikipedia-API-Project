import { Box, styled } from '@mui/material';
import Button from '@mui/material/Button';

export const CustomBox = styled(Box)`
  padding: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 100%; /* Full width on desktop */
  width: 100%; /* Ensure it takes up 100% width */

  @media (max-width: 1500px) {
    padding: 10px;
    max-width: 100%;
    min-width: auto;
  }

  @media (max-width: 600px) {
    padding: 8px; /* Smaller padding for mobile */
    width: 100%;
    min-width: 100%; /* Ensure full width for mobile screens */
  }
`;

export const CustomButton = styled(Button)`
  background-color: #00669b;
  color: #fff;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  },
  borderradius: 8px;
  padding: 15px;
`;
