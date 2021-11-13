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

    it('Vérifier la couleur du fond du component', () => {
      
      //const component = mount(<TitleModalGrade id="cc" bgColor="#086589" text="Directeur"></TitleModalGrade>)
      //console.log("paragraph : ", component);
      //expect(component).toHaveStyleRule('background-color', '#086589')

      const wrapper = shallow(<TitleModalGrade id="cc" bgColor="#086589" text="Directeur"></TitleModalGrade>)
      const paragraph = wrapper.find('h5')
      console.log("elem : ", paragraph)
      expect(wrapper).toHaveStyleRule('backgroundColor', '#086589')
      //const {getByTestId} = render(<TitleModalGrade id="cc" bgColor="#086589" text="Directeur"></TitleModalGrade>);
      //expect(getByTestId('cc')).toHaveStyle("backgroundColor : bleu")

      //const tree = renderer.create(<TitleModalGrade id="" bgColor="#086589" text="Directeur" />).toJSON()
      //console.log("tree : ", tree.children[0]);
      //expect(paragraph.text()).toHaveStyleRule('color', 'red')


      //const { container } = render(<TitleModalGrade id="" bgColor="#086589" text="Directeur"></TitleModalGrade>); 
      //expect(wrapper.firstChild).toHaveStyle(`background-color: "#086589"`); 
    })
  })
  

  