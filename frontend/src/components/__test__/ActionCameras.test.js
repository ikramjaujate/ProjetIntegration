import React from 'react' ;
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' ;
import 'jest-styled-components';
import ActionsCameras from '../ActionsCameras.js' ;
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });



describe('ActionCameras', () => {
    it('Snapshot - renders correctement', () => {
      const snapshot = renderer.create(<ActionsCameras allowed={false} id_camera="1" currentIdGrade="1"/>).toJSON();
      expect(snapshot).toMatchSnapshot();
    });

    it('Vérifier le texte affiché dans le titre', () => {
      const wrapper = shallow(<ActionsCameras name_camera="ZoneSud" />);
      const nameCamera = wrapper.find('.name-camera-grade');
      //expect(paragraph).toHaveLength(1);
      expect(nameCamera.text()).toEqual('ZoneSud');
    })

    it("Vérifier que le switch représentant l'action de la caméra est activé", () => {
      const wrapper = shallow(<ActionsCameras allowed={true} />);
      const check = wrapper.find('.form-check-input');
      expect(check.at(0).props().defaultChecked).toEqual(true);
    })

    it("Vérifier que le switch représentant l'action de la caméra est désactivé", () => {
      const wrapper = shallow(<ActionsCameras allowed={false} />);
      const check = wrapper.find('.form-check-input');
      expect(check.at(0).props().defaultChecked).toEqual();
    })

    it("Vérifier la classe du switch représentant l'action de la caméra", () => {
      const wrapper = shallow(<ActionsCameras id_camera="2" currentIdGrade="1" />);
      const check = wrapper.find('.form-check-input');
      expect(check.hasClass('action-1-2')).toEqual(true) ;
    })

    it("Vérifier l'id de la notification", () => {
      const wrapper = shallow(<ActionsCameras id_camera="2" currentIdGrade="1" />);
      const notification = wrapper.find('.bi');
      expect(notification.at(0).props().id).toEqual("notification-1-2") ;
    })


    it('Vérifier le texte affiché dans le titre a une valeur par défaut', () => {
      const wrapper = shallow(<ActionsCameras />);
      const nameCamera = wrapper.find('.name-camera-grade');
      expect(nameCamera.text()).toEqual('Chargement');
    })

    it("Vérifier la valeur par défaut du switch représentant l'action de la caméra", () => {
      const wrapper = shallow(<ActionsCameras />);
      const check = wrapper.find('.form-check-input');
      expect(check.at(0).props().defaultChecked).toEqual();
    })

    it("Vérifier la classe par défaut  du switch représentant l'action de la caméra", () => {
      const wrapper = shallow(<ActionsCameras />);
      const check = wrapper.find('.form-check-input');
      expect(check.hasClass('action-0-0')).toEqual(true) ;
    })

    it("Vérifier l'id par défaut de la notification", () => {
      const wrapper = shallow(<ActionsCameras />);
      const notification = wrapper.find('.bi');
      expect(notification.at(0).props().id).toEqual("notification-0-0") ;
    })

    it("Vérifie qu'il y a bien un fonction par défaut pour le changeAction", () => {
       const wrapper = shallow(<ActionsCameras />);
       const fctCheck = wrapper.find('.form-check-input');
       fctCheck.simulate('change') ;
    });

    it("Vérifie qu'il y a bien un fonction par défaut pour le changeNotification", () => {
      const wrapper = shallow(<ActionsCameras />);
      const fctNotification = wrapper.find('.bi-bell-slash-fill');
      fctNotification.simulate('click') ;
   });
    // it('`button` should be disabled', () => {
    //   const wrapper = shallow(<ActionsCameras name_camera="" id_camera="" notification="" changeAction="" changeNotification="" allowed={false} currentIdGrade="" />);
    //   const fctCheck = wrapper.find('.form-check-input');
    //   console.log("avant : ", fctCheck.at(0).props())
    //   fctCheck.simulate('change') ;
    //   console.log("apres : ",fctCheck.at(0).props().checked )
    //   expect(fctCheck.at(0).props().ischecked).toEqual(true);
    // });
})
  

  