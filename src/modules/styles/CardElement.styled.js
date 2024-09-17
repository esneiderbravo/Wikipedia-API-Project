import { styled } from '@mui/material';
import Card from '@mui/material/Card';

export const CustomImage = styled('img')`
  width: 150px;
  height: 120px;
  border-radius: 8px;
`;

export const CustomCard = styled(Card)`
  min-width: 250px;
  max-width: 250px;
  min-height: 400px;
  max-height: 400px;
  background-color: #f6f5f2;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
