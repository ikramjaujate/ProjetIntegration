import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme'
import 'jest-styled-components';
import Input from '../Input.js' ;
Enzyme.configure({ adapter: new Adapter() })


describe('CameraInfo', () => {
    it('Vérifier le nom de la camera passé en paramètre. ', () => {
      const wrapper = shallow(<Input type="" name="" min="" max="" placeholder="" setFunc="" pattern="" title="coucou" step="" idName="coucou"/>)
      const paragraph = wrapper.find('input')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.text()).toEqual("coucou")
    })
})