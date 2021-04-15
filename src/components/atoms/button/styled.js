import styled from 'styled-components'
import colors from '../../../assets/colors'

export const Container = styled.button`
  align-items: center;
  background-color: transparent;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  color: ${colors.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  justify-content: center;
  line-height: 10px;
  font-family: 'Poppins', sans-serif;
  min-width: 140px;
  margin: 10px 0;
  padding: 10px 20px;

  &:hover {
    background: ${colors.primary};
    color: ${colors.white};
    cursor: pointer;
  }

  .MuiCircularProgress-root {
    color: ${colors.white};
    margin-left: 10px;
  }
`