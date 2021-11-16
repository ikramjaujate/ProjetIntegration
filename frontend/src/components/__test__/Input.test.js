import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme'
import 'jest-styled-components';
import Input from '../Input.js' ;
Enzyme.configure({ adapter: new Adapter() })
import renderer from 'react-test-renderer';
    

describe('CameraInfo', () => {

  it('Snapshot - renders correctement', () => {
    const snapshot = renderer.create(<Input type="text" name="camera" min={1} max={2} placeholder="text" setFunc="" pattern="text" title="text" step="text" idName="text"/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  })

  it('Vérifier le caractère required du input. ', () => {
    const wrapper = shallow(<Input required type="" name="" min="" max="" placeholder="" setFunc="" pattern="" title="" step="" idName=""/>)
    const paragraph = wrapper.find('input')
    expect(paragraph).toHaveLength(1)
    expect(paragraph.at(0).props().required).toEqual(true);
  })
  it('Vérifier le type du input. ', () => {
      const wrapper = shallow(<Input required type="text" name="" min="" max="" placeholder="" setFunc="" pattern="" title="" step="" idName=""/>)
      const paragraph = wrapper.find('input')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.at(0).props().type).toEqual("text");
    })
    it('Vérifier le name du input. ', () => {
      const wrapper = shallow(<Input required type="" name="client" min="" max="" placeholder="" setFunc="" pattern="" title="" step="" idName=""/>)
      const paragraph = wrapper.find('input')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.at(0).props().name).toEqual("client");
    })
    it('Vérifier le placeholder du input. ', () => {
      const wrapper = shallow(<Input required type="" name="" min="" max="" placeholder="text" setFunc="" pattern="" title="" step="" idName=""/>)
      const paragraph = wrapper.find('input')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.at(0).props().placeholder).toEqual("text");
    })
    it('Vérifier le placeholder par default du input. ', () => {
      const wrapper = shallow(<Input />)
      const paragraph = wrapper.find('input')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.at(0).props().placeholder).toEqual("texte");
    })
    it('Vérifier le text par default du input. ', () => {
      const wrapper = shallow(<Input />)
      const paragraph = wrapper.find('input')
      expect(paragraph).toHaveLength(1)
      expect(paragraph.at(0).props().type).toEqual("text");
    })
})