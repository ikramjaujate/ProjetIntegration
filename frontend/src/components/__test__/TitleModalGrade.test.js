import React from 'react' ;
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' ;
import 'jest-styled-components';
import TitleModalGrade from '../TitleModalGrade.js' ;

Enzyme.configure({ adapter: new Adapter() }); //Configurer Enzyme pour react 16


describe('TitleModalGrade', () => {
    it('Vérifier le texte affiché dans le titre', () => {
      const wrapper = shallow(<TitleModalGrade text="Directeur" />);
      const paragraph = wrapper.find('h5');
      expect(paragraph).toHaveLength(1);
      expect(paragraph.text()).toEqual('Directeur');
    })
      
    it('Vérifier la couleur du fond du titre', () => {
      const wrapper = shallow(<TitleModalGrade bgColor="#086589"/>);
      const paragraph = wrapper.find('.modal-title');
      expect(paragraph.prop('style')).toHaveProperty("backgroundColor", "#086589");
    })

    it('Vérifier que le props bgColor a une valeur par défaut', () => {
      const wrapper = shallow(<TitleModalGrade/>);
      const paragraph = wrapper.find('.modal-title');
      expect(paragraph.prop('style')).toHaveProperty("backgroundColor", 'var(--text-loading)');
    })

    it('Vérifier que le props text a une valeur par défaut', () => {
      const wrapper = shallow(<TitleModalGrade/>);
      const paragraph = wrapper.find('h5');
      expect(paragraph.text()).toEqual('Chargement');
    })
})
  

  