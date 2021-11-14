/* Dependencies */
import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' 
import 'jest-styled-components'



// import render from 'react-test-render'

// import { render, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import renderer  from "react-test-renderer";


/* Components */
// import Paragraph from './'
import TitleModalGrade from '../TitleModalGrade.js' ;

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })


describe('TitleModalGrade', () => {
    it('Vérifier le texte affiché', () => {
      const wrapper = shallow(<TitleModalGrade id="" bgColor="" text="Directeur"></TitleModalGrade>)
      const paragraph = wrapper.find('h5')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.text()).toEqual('Directeur')
    })
})