import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
  }
  .gradeCard {
    background-color: ${({ theme }) => theme.carteGrade}!important;
  }
  `

  //    transition: background 0.50s linear;
