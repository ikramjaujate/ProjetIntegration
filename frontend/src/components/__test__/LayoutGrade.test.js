import React from 'react' ;
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' ;
import 'jest-styled-components';
import LayoutGrade from '../LayoutGrade.js' ;
import renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });


describe('LayoutGrade', () => {
    it('Snapshot - renders correctement', () => {
      const snapshot = renderer.create(<LayoutGrade name = "Directeur" color = "#00000" members="directeur" allowed_camera={1} refused_camera ={1}/>).toJSON();
      expect(snapshot).toMatchSnapshot();
    })
    it('Vérifier le texte affiché dans le premier titre (directeur)', () => {
      const wrapper = shallow(<LayoutGrade name = "Directeur" color = "" members="" allowed_camera="" refused_camera ="" />);
      const paragraph = wrapper.find('div.name-grade');
      expect(paragraph.text()).toEqual('Directeur');
    })
    it('Vérifier le texte affiché dans le deuxième titre (Personnel)', () => {
        const wrapper = shallow(<LayoutGrade name = "Personnel" color = "" members="" allowed_camera="" refused_camera ="" />);
        const paragraph = wrapper.find('div.name-grade');
        expect(paragraph.text()).toEqual('Personnel');
      })
    it('Vérifier le texte affiché dans le troisieme titre (beneficaire)', () => {
        const wrapper = shallow(<LayoutGrade name = "Personnel" color = "" members="" allowed_camera="" refused_camera ="" />);
        const paragraph = wrapper.find('div.name-grade');
        expect(paragraph.text()).toEqual('Personnel');
      })

    it('Vérifier la couleur du fond du logo du directeur', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "#e37352" members="" allowed_camera="" refused_camera =""/>);
        const paragraph = wrapper.find('div.bg-person');
        expect(paragraph.prop('style')).toHaveProperty("backgroundColor", "#e37352");
      }) 
      it('Vérifier la couleur du fond du logo du personnel', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "#7B6CAF" members="" allowed_camera="" refused_camera =""/>);
        const paragraph = wrapper.find('div.bg-person');
        expect(paragraph.prop('style')).toHaveProperty("backgroundColor", "#7B6CAF");
      }) 
      it('Vérifier la couleur du fond du logo du beneficaire', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "#cdc7af" members="" allowed_camera="" refused_camera =""/>);
        const paragraph = wrapper.find('div.bg-person');
        expect(paragraph.prop('style')).toHaveProperty("backgroundColor", "#cdc7af");
      }) 

})