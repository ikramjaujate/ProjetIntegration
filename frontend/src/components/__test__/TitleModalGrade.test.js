import React from 'react' ;
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' ;
import 'jest-styled-components';
import TitleModalGrade from '../TitleModalGrade.js' ;
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() }); //Configurer Enzyme pour react 16


describe('TitleModalGrade', () => {
    it('Snapshot - renders correctement', () => {
      const snapshot = renderer.create(<TitleModalGrade text="Test" bgColor="#000000"/>).toJSON();
      expect(snapshot).toMatchSnapshot();
    });

    it('Vérifier le texte affiché dans le titre', () => {
      const wrapper = shallow(<TitleModalGrade text="Directeur" />);
      const title = wrapper.find('h5');
      expect(title).toHaveLength(1);
      expect(title.text()).toEqual('Directeur');
    })
      
    it('Vérifier la couleur du fond du titre', () => {
      const wrapper = shallow(<TitleModalGrade bgColor="#086589"/>);
      const modalTitle = wrapper.find('.modal-title');
      expect(modalTitle.prop('style')).toHaveProperty("backgroundColor", "#086589");
    })

    it('Vérifier que le props bgColor a une valeur par défaut', () => {
      const wrapper = shallow(<TitleModalGrade/>);
      const modalTitle = wrapper.find('.modal-title');
      expect(modalTitle.prop('style')).toHaveProperty("backgroundColor", 'var(--text-loading)');
    })

    it('Vérifier que le props text a une valeur par défaut', () => {
      const wrapper = shallow(<TitleModalGrade/>);
      const title = wrapper.find('h5');
      expect(title.text()).toEqual('Chargement');
    })
})
  

  