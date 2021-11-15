import React from 'react' ;
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16' ;
import 'jest-enzyme' ;
import 'jest-styled-components';
import ElementNavBar from '../ElementNavBar.js' ;
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() }); 


describe('ElementNavBar', () => {
    it('Snapshot - renders correctement', () => {
        const paragraph = renderer.create(<ElementNavBar href="test_href" text="test_text" dataIcon="test_data-icon" className="test_classname" viewBox="0 0 0 0" d="M10 10"/>).toJSON();
        expect(paragraph).toMatchSnapshot();
    });

    it("Vérifier le lien vers lequel pointe l'élément", () => {
      const wrapper = shallow(<ElementNavBar href="https://www.test.com/" />);
      const paragraph = wrapper.find('a');
      //expect(paragraph).toHaveLength(1);
      expect(paragraph.at(0).props().href).toEqual('https://www.test.com/');
    })

    it('Vérifier le texte affiché', () => {
        const wrapper = shallow(<ElementNavBar text="Home" />);
        const paragraph = wrapper.find('span');
        expect(paragraph.text()).toEqual('Home');
    })

    it('Vérifier le data-icon du svg', () => {
        const wrapper = shallow(<ElementNavBar dataIcon="image" />);
        const paragraph = wrapper.find('svg');
        expect(paragraph.at(0).props()['data-icon']).toEqual('image');
    })

    it('Vérifier le classname du svg', () => {
        const wrapper = shallow(<ElementNavBar className="test" />);
        const paragraph = wrapper.find('svg');
        expect(paragraph.hasClass('test')).toEqual(true) ;
    })

    it('Vérifier le viewBox du svg', () => {
        const wrapper = shallow(<ElementNavBar viewBox="0 0 640 512" />);
        const paragraph = wrapper.find('svg');
        expect(paragraph.at(0).props().viewBox).toEqual('0 0 640 512');
    })

    it('Vérifier le d du svg', () => {
        let dPath = "M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z";
        const wrapper = shallow(<ElementNavBar d={dPath} />);
        const paragraph = wrapper.find('path');
        expect(paragraph.at(0).props().d).toEqual(dPath);
    })


    it("Vérifier la valeur par défaut du lien vers lequel pointe l'élément", () => {
        const wrapper = shallow(<ElementNavBar />);
        const paragraph = wrapper.find('a');
        expect(paragraph.at(0).props().href).toEqual('home');
    })

    it('Vérifier la valeur par défaut du texte affiché', () => {
        const wrapper = shallow(<ElementNavBar />);
        const paragraph = wrapper.find('span');
        expect(paragraph.text()).toEqual('Accueil');
    })

    it('Vérifier la valeur par défaut du data-icon du svg', () => {
        const wrapper = shallow(<ElementNavBar />);
        const paragraph = wrapper.find('svg');
        expect(paragraph.at(0).props()['data-icon']).toEqual('house');
    })

    it('Vérifier la valeur par défaut du classname du svg', () => {
        const wrapper = shallow(<ElementNavBar />);
        const paragraph = wrapper.find('svg');
        expect(paragraph.hasClass('fa-house')).toEqual(true) ;
    })

    it('Vérifier la valeur par défaut du viewBox du svg', () => {
        const wrapper = shallow(<ElementNavBar />);
        const paragraph = wrapper.find('svg');
        expect(paragraph.at(0).props().viewBox).toEqual('0 0 576 512');
    })

    it('Vérifier la valeur par défaut du d du svg', () => {
        let dPath = "M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z";
        const wrapper = shallow(<ElementNavBar />);
        const paragraph = wrapper.find('path');
        expect(paragraph.at(0).props().d).toEqual(dPath);
    })
})
  

  