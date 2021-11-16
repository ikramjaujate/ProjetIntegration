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
    it('Vérifier le texte affiché dans le premier titre', () => {
      const wrapper = shallow(<LayoutGrade name = "Directeur" color = "" members="" allowed_camera="" refused_camera ="" />);
      const paragraph = wrapper.find('div.name-grade');
      expect(paragraph.text()).toEqual('Directeur');
    })
    it('Vérifier la couleur du fond du logo du directeur', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "#e37352" members="" allowed_camera="" refused_camera =""/>);
        const paragraph = wrapper.find('div.bg-person');
        expect(paragraph.prop('style')).toHaveProperty("backgroundColor", "#e37352");
      }) 
    it('Vérifier l"écriture du mot membre si il y en a plusieurs', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "" members="2" allowed_camera="" refused_camera =""/>)
        const paragraph = wrapper.find('div.informations').at(2);
        expect(paragraph.text()).toEqual('2 membres')
      })
    it('Vérifier si le nombre de caméra autorisées est bien renvoyé', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "" members="" allowed_camera="10" refused_camera =""/>)
        const paragraph = wrapper.find('div.informations').at(0);
        expect(paragraph.text()).toEqual('10 ')
      })
    it('Vérifier si le nombre de caméra non-autorisées est bien renvoyé', () => {
        const wrapper = shallow(<LayoutGrade name = "" color = "" members="" allowed_camera="" refused_camera ="0"/>)
        const paragraph = wrapper.find('div.informations').at(1);
        expect(paragraph.text()).toEqual('0 ')
      }) 

})