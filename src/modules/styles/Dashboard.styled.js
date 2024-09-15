import { Box, styled } from '@mui/material';

export const CustomBox = styled(Box)`
  padding: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  min-width: auto;

  @media (max-width: 768px) {
    padding: 10px;
    min-width: auto;
  }
`;
