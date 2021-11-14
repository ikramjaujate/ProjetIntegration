import React from 'react' ;
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' ;
import 'jest-styled-components';
import ActionsCameras from '../ActionsCameras.js' ;


Enzyme.configure({ adapter: new Adapter() });


describe('ActionCameras', () => {
    it('Vérifier le texte affiché dans le titre', () => {
      const wrapper = shallow(<ActionsCameras name_camera="ZoneSud" id_camera="" notification="" changeAction="" changeNotification="" allowed="" currentIdGrade="" />);
      const paragraph = wrapper.find('div.name-camera-grade');
      //expect(paragraph).toHaveLength(1);
      expect(paragraph.text()).toEqual('ZoneSud');
    })

    it("Vérifier que le switch représentant l'action de la caméra est activé", () => {
      const wrapper = shallow(<ActionsCameras name_camera="" id_camera="" notification="" changeAction="" changeNotification="" allowed={true} currentIdGrade="" />);
      const paragraph = wrapper.find('input.form-check-input');
      expect(paragraph.at(0).props().defaultChecked).toEqual(true);
    })

    it("Vérifier que le switch représentant l'action de la caméra est désactivé", () => {
      const wrapper = shallow(<ActionsCameras name_camera="" id_camera="" notification="" changeAction="" changeNotification="" allowed={false} currentIdGrade="" />);
      const paragraph = wrapper.find('input.form-check-input');
      expect(paragraph.at(0).props().defaultChecked).toEqual();
    })

    
    it("Vérifier la classe du switch représentant l'action de la caméra", () => {
      const wrapper = shallow(<ActionsCameras name_camera="" id_camera="2" notification="" changeAction="" changeNotification="" allowed="" currentIdGrade="1" />);
      const paragraph = wrapper.find('input.form-check-input');
      //expect(paragraph.at(0).props().className).toHaveClass("form-check-input input-switch action-1-2");
      expect(paragraph.hasClass('action-1-2')).toEqual(true) ;
    })

    it("Vérifier l'id de la notification", () => {
      const wrapper = shallow(<ActionsCameras name_camera="" id_camera="2" notification="" changeAction="" changeNotification="" allowed="" currentIdGrade="1" />);
      const paragraph = wrapper.find('i.bi');
      expect(paragraph.at(0).props().id).toEqual("notification-1-2") ;
    })

    //<i type="button" id={`notification-${currentIdGrade}-${id_camera}`} className={`bi bi-bell-slash-fill`} onClick={() => changeNotification(id_camera, notification)}></i>
    //document.getElementById("notification-" + currentIdGrade + "-" + idCamera).className = notification ? "bi bi-bell-fill" : "bi bi-bell-slash-fill" ;
    // it("Vérifier qqch", () => {
    //   const wrapper = shallow(<ActionsCameras name_camera="" id_camera="2" notification="" changeAction="" changeNotification="changeNotification" allowed="true" currentIdGrade="1" />);
    //   const paragraph = wrapper.find('i.bi');
    //   expect(paragraph.at(0).props().id).toEqual("notification-1-2") ;
    // })
})
  

  